// Per-artist analysis computed from the data file at build time: where she ranks, what each
// skill is worth compared with the rest of the roster, and the best team built around her.
// Everything here is derived from artists.json with the same rules as the tier list and the
// Team Builder, so each artist page carries content of its own.

import artistsData from "@/lib/data/artists.json";
import type { Artist } from "@/lib/types/artist";
import { evaluateTeam, type TeamContext, type TeamGrade } from "@/lib/utils/evaluateTeam";
import { parseSkill, type SkillKind } from "@/lib/utils/skillSummary";

const ALL = artistsData as Artist[];
const score = (a: Artist) => a.tierScore || 0;

export type SkillInsight = {
  kind: SkillKind;
  value: string;
  /** 1 = highest value among the artists that have this kind of skill. */
  rank: number;
  holders: number;
  /** Other skills of this kind with exactly the same value. */
  ties: number;
  max: string;
};

export type TeamInsight = {
  members: Artist[];
  grade: TeamGrade;
  points: number;
  context: TeamContext;
  synergy: { genre: string; count: number; bonus: number } | null;
};

export type ArtistInsights = {
  genreRank: number;
  genreCount: number;
  overallRank: number;
  overallCount: number;
  skills: SkillInsight[];
  bestTeam: TeamInsight;
  /** Best team made only of her own genre (full synergy); null when it is the same as bestTeam or the genre is too small. */
  genreTeam: TeamInsight | null;
};

// kind -> every numeric value on the roster, highest first.
const valuesByKind: Partial<Record<SkillKind, number[]>> = {};
for (const a of ALL) {
  for (const raw of a.skills || []) {
    const p = parseSkill(raw);
    if (!p || p.kind === "other") continue;
    (valuesByKind[p.kind] ||= []).push(parseFloat(p.value));
  }
}
for (const k of Object.keys(valuesByKind) as SkillKind[]) valuesByKind[k]!.sort((x, y) => y - x);

function rate(team: Artist[]) {
  const ev = evaluateTeam(team);
  return { ev, key: ev.rating * 1e6 + ev.score };
}

/** Best 4 teammates for `a` from `pool`: a few seeded line-ups, then one-swap hill climbing. */
function bestTeamFor(a: Artist, pool: Artist[]): TeamInsight {
  const others = pool.filter((x) => x.id !== a.id).sort((x, y) => score(y) - score(x));
  const genres = [...new Set(others.map((x) => x.genre))];
  const seeds: Artist[][] = [[a, ...others.slice(0, 4)]];
  for (const g of genres) {
    const same = others.filter((x) => x.genre === g);
    const rest = others.filter((x) => x.genre !== g);
    if (same.length >= 4) seeds.push([a, ...same.slice(0, 4)]);
    if (same.length >= 3 && rest.length) seeds.push([a, ...same.slice(0, 3), rest[0]]);
  }
  let best = seeds[0];
  let bestRate = rate(best);
  for (const s of seeds.slice(1)) {
    const r = rate(s);
    if (r.key > bestRate.key) { best = s; bestRate = r; }
  }
  // Swap candidates: the strongest artists overall plus everyone sharing a genre with the team.
  const shortlist = others.filter((x, i) => i < 30 || x.genre === a.genre);
  for (let round = 0; round < 3; round++) {
    let improved = false;
    for (let slot = 1; slot < 5; slot++) {
      for (const c of shortlist) {
        if (best.some((m) => m.id === c.id)) continue;
        const trial = best.slice();
        trial[slot] = c;
        const r = rate(trial);
        if (r.key > bestRate.key) { best = trial; bestRate = r; improved = true; }
      }
    }
    if (!improved) break;
  }
  const { ev } = bestRate;
  return {
    members: best,
    grade: ev.grade,
    points: Math.round(ev.score),
    context: ev.context,
    synergy: ev.synergy,
  };
}

const cache = new Map<number, ArtistInsights>();

export function getArtistInsights(a: Artist): ArtistInsights {
  const hit = cache.get(a.id);
  if (hit) return hit;

  const sameGenre = ALL.filter((x) => x.genre === a.genre);
  const skills: SkillInsight[] = [];
  for (const raw of a.skills || []) {
    const p = parseSkill(raw);
    if (!p) continue;
    const values = p.kind === "other" ? [] : valuesByKind[p.kind] || [];
    const v = parseFloat(p.value);
    skills.push({
      kind: p.kind,
      value: p.value,
      rank: values.length ? values.filter((x) => x > v).length + 1 : 0,
      holders: values.length,
      ties: values.filter((x) => x === v).length - 1,
      max: values.length ? `${values[0]}${p.value.endsWith("%") ? "%" : ""}` : "",
    });
  }

  const bestTeam = bestTeamFor(a, ALL);
  const ids = (t: TeamInsight) => t.members.map((m) => m.id).sort().join();
  const genreTeam = sameGenre.length >= 5 ? bestTeamFor(a, sameGenre) : null;

  const out: ArtistInsights = {
    genreRank: sameGenre.filter((x) => score(x) > score(a)).length + 1,
    genreCount: sameGenre.length,
    overallRank: ALL.filter((x) => score(x) > score(a)).length + 1,
    overallCount: ALL.length,
    skills,
    bestTeam,
    genreTeam: genreTeam && ids(genreTeam) !== ids(bestTeam) ? genreTeam : null,
  };
  cache.set(a.id, out);
  return out;
}

// ───────────────────────── text ─────────────────────────

type L = "fr" | "en" | "id";
const lang3 = (lang: string): L => (lang === "fr" || lang === "id" ? lang : "en");

function ordinal(n: number, l: L): string {
  if (l === "fr") return n === 1 ? "1re" : `${n}e`;
  if (l === "id") return `ke-${n}`;
  const s = n % 100;
  if (s >= 11 && s <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10] || "th"}`;
}

export const insightLabels: Record<L, {
  analysis: string; teamTitle: (n: string) => string; genreTitle: (g: string) => string;
  open: string; points: string;
}> = {
  fr: { analysis: "Analyse", teamTitle: (n) => `Meilleure équipe avec ${n}`, genreTitle: (g) => `Équipe 100 % ${g}`, open: "Ouvrir dans le Team Builder", points: "pts" },
  en: { analysis: "Analysis", teamTitle: (n) => `Best team with ${n}`, genreTitle: (g) => `Full ${g} team`, open: "Open in the Team Builder", points: "pts" },
  id: { analysis: "Analisis", teamTitle: (n) => `Tim terbaik dengan ${n}`, genreTitle: (g) => `Tim full ${g}`, open: "Buka di Team Builder", points: "poin" },
};

const skillNames: Record<L, Record<SkillKind, string>> = {
  fr: { pd: "Dégâts au joueur", sdr: "Réduction des dégâts de skill", sd: "Dégâts de skill", ba: "Attaque de base", bar: "Réduction des dégâts d'attaque", fan: "Capacité de fans", rally: "Capacité de rally", dps: "DPS fixe", other: "Sort hors combat" },
  en: { pd: "Damage to player", sdr: "Skill damage reduction", sd: "Skill damage", ba: "Basic attack damage", bar: "Basic attack damage reduction", fan: "Fan capacity", rally: "Rally capacity", dps: "Fixed DPS", other: "Non-combat skill" },
  id: { pd: "Damage ke pemain", sdr: "Pengurangan skill damage", sd: "Skill damage", ba: "Damage serangan dasar", bar: "Pengurangan damage serangan dasar", fan: "Kapasitas fans", rally: "Kapasitas rally", dps: "DPS tetap", other: "Skill non-tempur" },
};

const skillWhat: Record<L, Record<SkillKind, string>> = {
  fr: {
    pd: "augmente les dégâts infligés aux autres joueurs. C'est le sort le plus fort en PvP : il suffit à placer une artiste en haut de la tier list.",
    sdr: "réduit les dégâts des sorts adverses. C'est le meilleur sort défensif du jeu.",
    sd: "augmente les dégâts des sorts de toute l'équipe.",
    ba: "augmente les dégâts des attaques normales.",
    bar: "réduit les dégâts des attaques normales subies.",
    fan: "augmente le nombre de fans emmenés en marche solo.",
    rally: "augmente la taille des rassemblements que vous lancez.",
    dps: "inflige des dégâts fixes chaque seconde. Utile en début de partie, vite dépassé ensuite.",
    other: "(or, vitesse, gardes de bâtiment, PvE) ne sert pas en combat entre joueurs : il ne compte pas dans la note d'équipe.",
  },
  en: {
    pd: "raises the damage dealt to other players. It is the strongest PvP skill: on its own it puts an artist at the top of the tier list.",
    sdr: "cuts the damage taken from enemy skills. It is the best defensive skill in the game.",
    sd: "raises the damage of the whole team's skills.",
    ba: "raises the damage of normal attacks.",
    bar: "cuts the damage taken from normal attacks.",
    fan: "raises the number of fans you bring on a solo march.",
    rally: "raises the size of the rallies you launch.",
    dps: "deals fixed damage every second. Useful early on, quickly outscaled later.",
    other: "(gold, speed, building guards, PvE) does nothing in player fights: it does not count in the team grade.",
  },
  id: {
    pd: "menaikkan damage ke pemain lain. Ini skill PvP terkuat: sendirian saja sudah menempatkan artis di puncak tier list.",
    sdr: "mengurangi damage dari skill lawan. Ini skill bertahan terbaik di game.",
    sd: "menaikkan damage skill seluruh tim.",
    ba: "menaikkan damage serangan biasa.",
    bar: "mengurangi damage serangan biasa yang diterima.",
    fan: "menambah jumlah fans yang dibawa saat march solo.",
    rally: "menambah ukuran rally yang kamu buka.",
    dps: "memberi damage tetap tiap detik. Berguna di awal, cepat tertinggal setelahnya.",
    other: "(gold, kecepatan, penjaga bangunan, PvE) tidak berguna di pertarungan antar pemain: tidak dihitung dalam nilai tim.",
  },
};

/** One sentence per skill: what it does, and how her value compares with the roster. */
export function skillSentence(s: SkillInsight, lang: string): { title: string; body: string } {
  const l = lang3(lang);
  const name = skillNames[l][s.kind];
  const title = s.kind === "other" ? name : `${name} ${s.value}`;
  let cmp = "";
  if (s.holders > 1 && s.rank) {
    const top = s.rank === 1;
    if (l === "fr") cmp = top
      ? (s.ties ? ` Sa valeur est au maximum du jeu pour ce type de sort, à égalité avec ${s.ties} autre${s.ties > 1 ? "s" : ""}.` : ` Sa valeur est la plus haute du jeu parmi les ${s.holders} sorts de ce type.`)
      : ` Sa valeur est la ${ordinal(s.rank, l)} sur ${s.holders} sorts de ce type (maximum ${s.max}).`;
    else if (l === "id") cmp = top
      ? (s.ties ? ` Nilainya sudah maksimum di game untuk skill sejenis, sama dengan ${s.ties} skill lain.` : ` Nilainya tertinggi di game dari ${s.holders} skill sejenis.`)
      : ` Nilainya peringkat ${ordinal(s.rank, l)} dari ${s.holders} skill sejenis (maksimum ${s.max}).`;
    else cmp = top
      ? (s.ties ? ` Her value is the maximum in the game for this type of skill, tied with ${s.ties} other${s.ties > 1 ? "s" : ""}.` : ` Her value is the highest in the game among the ${s.holders} skills of this type.`)
      : ` Her value ranks ${ordinal(s.rank, l)} of ${s.holders} skills of this type (maximum ${s.max}).`;
  }
  const what = skillWhat[l][s.kind];
  const lead = l === "fr" ? "Ce sort " : l === "id" ? "Skill ini " : "This skill ";
  return { title, body: lead + what + cmp };
}

/** Where she stands in her genre and overall. */
export function rankSentence(a: Artist, i: ArtistInsights, lang: string): string {
  const l = lang3(lang);
  if (l === "fr") return `${a.name} est ${ordinal(i.genreRank, l)} sur ${i.genreCount} artistes ${a.genre} et ${ordinal(i.overallRank, l)} sur ${i.overallCount} au classement général, d'après la puissance de ses sorts.`;
  if (l === "id") return `${a.name} berada di peringkat ${ordinal(i.genreRank, l)} dari ${i.genreCount} artis ${a.genre} dan ${ordinal(i.overallRank, l)} dari ${i.overallCount} secara keseluruhan, berdasarkan kekuatan skill-nya.`;
  return `${a.name} ranks ${ordinal(i.genreRank, l)} of ${i.genreCount} ${a.genre} artists and ${ordinal(i.overallRank, l)} of ${i.overallCount} overall, based on the power of her skills.`;
}

const contextNames: Record<L, Record<TeamContext, string>> = {
  fr: { general: "polyvalente", solo: "taillée pour le solo", rally: "taillée pour le rally" },
  en: { general: "an all-round team", solo: "built for solo marches", rally: "built for rallies" },
  id: { general: "tim serbaguna", solo: "dibuat untuk march solo", rally: "dibuat untuk rally" },
};

/** One sentence describing a computed team. */
export function teamSentence(a: Artist, t: TeamInsight, lang: string): string {
  const l = lang3(lang);
  const mates = t.members.filter((m) => m.id !== a.id).map((m) => m.name);
  const list = l === "fr"
    ? `${mates.slice(0, -1).join(", ")} et ${mates[mates.length - 1]}`
    : l === "id"
      ? `${mates.slice(0, -1).join(", ")}, dan ${mates[mates.length - 1]}`
      : `${mates.slice(0, -1).join(", ")} and ${mates[mates.length - 1]}`;
  const pts = t.points.toLocaleString(l === "fr" ? "fr-FR" : l === "id" ? "id-ID" : "en-US");
  const pct = t.synergy ? Math.round(t.synergy.bonus * 100) : 0;
  if (l === "fr") {
    const syn = t.synergy ? ` La synergie ${t.synergy.genre} ×${t.synergy.count} ajoute +${pct} % de puissance.` : " Elle ne déclenche aucune synergie de genre.";
    return `Avec ${list}, l'équipe obtient la note ${t.grade} (${pts} pts) et est ${contextNames.fr[t.context]}.${syn}`;
  }
  if (l === "id") {
    const syn = t.synergy ? ` Sinergi ${t.synergy.genre} ×${t.synergy.count} menambah +${pct}% kekuatan.` : " Tim ini tidak memicu sinergi genre.";
    return `Bersama ${list}, tim mendapat nilai ${t.grade} (${pts} poin), ${contextNames.id[t.context]}.${syn}`;
  }
  const syn = t.synergy ? ` The ${t.synergy.genre} ×${t.synergy.count} synergy adds +${pct}% power.` : " It triggers no genre synergy.";
  return `With ${list}, the team is graded ${t.grade} (${pts} pts) and is ${contextNames.en[t.context]}.${syn}`;
}
