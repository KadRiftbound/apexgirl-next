"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useMemo, useEffect, useRef, Fragment, type ReactNode, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import artistsData from "@/lib/data/artists.json";
import { slugify } from "@/lib/utils/slugify";
import { evaluateTeam, type TeamEvaluation } from "@/lib/utils/evaluateTeam";
import { skillChips } from "@/lib/utils/skillSummary";
import type { Artist } from "@/lib/types/artist";
import { SupportCard } from "@/components/SupportCard";
import { GenreIcon, GenreBar, genreColors as genreSolid } from "@/components/GenreIcon";
import { getArtistContent, type ArtistContent } from "@/lib/i18n/artists";
import "./teambuilder.css";

const isUR = (rank: string) => rank.startsWith("UR");

// Numbers (scores, %, grades) use Inter with tabular figures: Poppins digits are too round at heavy weights.
const numFont = Inter({ subsets: ["latin"], weight: ["500", "600", "700", "800"], display: "swap", variable: "--font-num" });

const genreColors: Record<string, string> = {
  "Pop":     "rgba(236, 72, 153, 0.55)",
  "Rock":    "rgba(239, 68, 68, 0.55)",
  "EDM":     "rgba(139, 92, 246, 0.55)",
  "Hip Hop": "rgba(245, 158, 11, 0.55)",
  "R&B":     "rgba(6, 182, 212, 0.55)",
};

const tierBadgeColors: Record<string, string> = {
  "S+": "#d4a017", S: "#eab308", A: "#22c55e", B: "#3b82f6", C: "#f59e0b", D: "#64748b", "-": "#475569",
};


// French values from artists.json (used internally)
const SPECIALTY_VALUES = ['Augmentation dommage', 'Dommage réduction', 'Vitesse de conduite', 'HQ Defense', 'Mixte', 'Rassemblement', 'Solo car', 'Économie'] as const;
const SPECIALTY_KEYS = ['damage_boost', 'damage_reduction', 'driving_speed', 'hq_defense', 'mixed', 'gathering', 'solo_car', 'economy'] as const;
const SPECIALTY_FR_TO_KEY: Record<string, string> = {
  'Augmentation dommage': 'damage_boost',
  'Dommage réduction': 'damage_reduction',
  'Vitesse de conduite': 'driving_speed',
  'HQ Defense': 'hq_defense',
  'HQ defense': 'hq_defense',
  'Mixte': 'mixed',
  'Rassemblement': 'gathering',
  'Solo car': 'solo_car',
  'Économie': 'economy',
};
const SPECIALTY_LABELS_BY_LANG: Record<string, Record<string, string>> = {
  fr: { damage_boost: 'Augmentation dommage', damage_reduction: 'Dommage réduction', driving_speed: 'Vitesse de conduite', hq_defense: 'HQ Defense', mixed: 'Mixte', gathering: 'Rassemblement', solo_car: 'Solo car', economy: 'Économie' },
  en: { damage_boost: 'Damage Boost', damage_reduction: 'Damage Reduction', driving_speed: 'Driving Speed', hq_defense: 'HQ Defense', mixed: 'Mixed', gathering: 'Gathering', solo_car: 'Solo Car', economy: 'Economy' },
  it: { damage_boost: 'Boost Danno', damage_reduction: 'Riduzione Danno', driving_speed: 'Velocità Guida', hq_defense: 'HQ Difesa', mixed: 'Misto', gathering: 'Raccolta', solo_car: 'Auto Solitaria', economy: 'Economia' },
  es: { damage_boost: 'Aumento de Daño', damage_reduction: 'Reducción de Daño', driving_speed: 'Velocidad de Conducción', hq_defense: 'HQ Defensa', mixed: 'Mixto', gathering: 'Reunión', solo_car: 'Coche Solitario', economy: 'Economía' },
  pt: { damage_boost: 'Aumento de Dano', damage_reduction: 'Redução de Dano', driving_speed: 'Velocidade de Condução', hq_defense: 'HQ Defesa', mixed: 'Misto', gathering: 'Reunião', solo_car: 'Carro Solo', economy: 'Economia' },
  pl: { damage_boost: 'Zwiększenie Obrażeń', damage_reduction: 'Redukcja Obrażeń', driving_speed: 'Prędkość Prowadzenia', hq_defense: 'HQ Obrona', mixed: 'Mieszany', gathering: 'Zbieranie', solo_car: 'Samochód Solo', economy: 'Ekonomia' },
  id: { damage_boost: 'Peningkat Kerusakan', damage_reduction: 'Pengurangan Kerusakan', driving_speed: 'Kecepatan Mengemudi', hq_defense: 'HQ Pertahanan', mixed: 'Campuran', gathering: 'Pengumpulan', solo_car: 'Mobil Solo', economy: 'Ekonomi' },
  ru: { damage_boost: 'Увеличение урона', damage_reduction: 'Уменьшение урона', driving_speed: 'Скорость вождения', hq_defense: 'HQ Защита', mixed: 'Смешанный', gathering: 'Сбор', solo_car: 'Соло Машина', economy: 'Экономика' },
  de: { damage_boost: 'Schadensboost', damage_reduction: 'Schadensreduzierung', driving_speed: 'Fahrgeschwindigkeit', hq_defense: 'HQ Verteidigung', mixed: 'Gemischt', gathering: 'Sammeln', solo_car: 'Solo Auto', economy: 'Wirtschaft' },
};
const specialtyLabel = (spec: string | undefined, lang: string): string => {
  if (!spec) return "";
  const key = SPECIALTY_FR_TO_KEY[spec];
  if (!key) return spec;
  return SPECIALTY_LABELS_BY_LANG[lang]?.[key] || SPECIALTY_LABELS_BY_LANG.en[key] || spec;
};

/* Small monochrome stroke icons (lucide-style paths), so the sticky bar does not depend on emoji rendering. */
const ICON_PATHS: Record<string, ReactNode> = {
  save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8" /><path d="M7 3v5h8" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
  trash: <><path d="M3 6h18" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></>,
  zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  sword: <><path d="M14.5 17.5L3 6V3h3l11.5 11.5" /><path d="M13 19l6-6" /><path d="M16 16l4 4" /><path d="M19 21l2-2" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  sparkle: <path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9z" />,
  music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  users: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0" /><circle cx="17" cy="9" r="3" /><path d="M22 20a5 5 0 0 0-6-4.9" /></>,
  scale: <><path d="M12 3v18" /><path d="M5 7h14" /><path d="M3 15l2-8 2 8a3 3 0 0 1-4 0z" /><path d="M17 15l2-8 2 8a3 3 0 0 1-4 0z" /><path d="M8 21h8" /></>,
  trophy: <><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M17 5h3a2 2 0 0 1-2 4" /><path d="M7 5H4a2 2 0 0 0 2 4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  check: <path d="M20 6L9 17l-5-5" />,
  pencil: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  x: <path d="M18 6L6 18M6 6l12 12" />,
  reset: <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></>,
};
function Icon({ name, size = 14, className, style }: { name: string; size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg
      className={`tb-ico${className ? ` ${className}` : ""}`}
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden style={style}
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

const STAT_ROWS: { key: keyof Omit<TeamEvaluation["stats"], "genreCounts">; icon: string; label: string; color: string; suffix?: string }[] = [
  { key: "skillDamageRaw", icon: "zap", label: "DMG Factor", color: "#ff8c42" },
  { key: "skillDamage", icon: "sword", label: "Skill DMG", color: "#ff6b6b", suffix: "%" },
  { key: "basicAttackPercent", icon: "target", label: "Basic ATK", color: "#4ecdc4", suffix: "%" },
  { key: "attackResist", icon: "shield", label: "Resistance", color: "#95e1d3", suffix: "%" },
  { key: "skillResist", icon: "sparkle", label: "S. Resist", color: "#a29bfe", suffix: "%" },
  { key: "fanCapacity", icon: "music", label: "Fan Cap", color: "#ffd700", suffix: "%" },
  { key: "rallyCapacity", icon: "users", label: "Rally Cap", color: "#00ff88", suffix: "%" },
];

const TB_COPY: Record<string, Record<string, string>> = {
  fr: { skillDamageRaw: "Facteur de dégâts", skillDamage: "Dégâts de skill", basicAttackPercent: "Attaque de base", attackResist: "Résistance attaque", skillResist: "Résistance skill", fanCapacity: "Capacité de fans", rallyCapacity: "Capacité de rally", score: "Note", builtFor: "Taillée pour", strong: "Forte en", weak: "Faible en", hint: "Composez une deuxième équipe pour la comparer à la première.", secTeams: "Vos équipes", secFilters: "Filtres", secArtists: "Artistes", addingTo: "Ajout dans", none: "Aucune équipe sauvegardée." },
  en: { skillDamageRaw: "Damage factor", skillDamage: "Skill damage", basicAttackPercent: "Basic attack", attackResist: "Attack resistance", skillResist: "Skill resistance", fanCapacity: "Fan capacity", rallyCapacity: "Rally capacity", score: "Grade", builtFor: "Built for", strong: "Strong in", weak: "Weak in", hint: "Build a second team to compare it with the first one.", secTeams: "Your teams", secFilters: "Filters", secArtists: "Artists", addingTo: "Adding to", none: "No saved team." },
  id: { skillDamageRaw: "Faktor damage", skillDamage: "Skill damage", basicAttackPercent: "Basic attack", attackResist: "Resistensi serangan", skillResist: "Resistensi skill", fanCapacity: "Kapasitas fans", rallyCapacity: "Kapasitas rally", score: "Nilai", builtFor: "Dibuat untuk", strong: "Kuat di", weak: "Lemah di", hint: "Susun tim kedua untuk membandingkannya dengan yang pertama.", secTeams: "Tim kamu", secFilters: "Filter", secArtists: "Artis", addingTo: "Menambah ke", none: "Belum ada tim tersimpan." },
};

const TB_SHORT: Record<string, Record<string, string>> = {
  fr: { skillDamageRaw: "Facteur dégâts", skillDamage: "Dégâts skill", basicAttackPercent: "Attaque base", attackResist: "Résist. attaque", skillResist: "Résist. skill", fanCapacity: "Cap. fans", rallyCapacity: "Cap. rally" },
  en: { skillDamageRaw: "Dmg factor", skillDamage: "Skill dmg", basicAttackPercent: "Basic atk", attackResist: "Atk resist.", skillResist: "Skill resist.", fanCapacity: "Fan cap.", rallyCapacity: "Rally cap." },
  id: { skillDamageRaw: "Faktor dmg", skillDamage: "Skill dmg", basicAttackPercent: "Basic atk", attackResist: "Resist. atk", skillResist: "Resist. skill", fanCapacity: "Kap. fans", rallyCapacity: "Kap. rally" },
};

const fmt = (n: number) => n.toLocaleString("fr-FR").replace(/ /g, " ");

const copyToClipboard = async (text: string): Promise<boolean> => {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch { return false; }
};

type SavedTeam = { id: string; name: string; ids: number[]; createdAt: number };
const newSavedTeam = (n: 1 | 2, name: string, ids: number[]): SavedTeam => {
  const now = Date.now();
  return { id: `${now}-${n}`, name, ids, createdAt: now };
};

// SR and R artists are not worth a team slot: the builder only lists UR and SSR.
const POOL: Artist[] = (artistsData as Artist[]).filter((a) => a.rank !== "R" && a.rank !== "SR");

const idsToArtists = (ids: number[]): Artist[] =>
  ids.map((id) => (artistsData as Artist[]).find((a) => a.id === id)).filter(Boolean).slice(0, 5) as Artist[];

const readLS = (key: string, fallback: string): string => {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
};

/** Team from ?t1= / ?t2= in the URL takes priority over localStorage. Browser only. */
const loadInitialTeam = (n: 1 | 2): Artist[] => {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get(`t${n}`);
    if (fromUrl) {
      const ids = fromUrl.split(',').map((x) => parseInt(x, 10)).filter((x) => !Number.isNaN(x));
      if (ids.length) return idsToArtists(ids);
    }
    const saved = localStorage.getItem(`team${n}`);
    if (saved) return idsToArtists(JSON.parse(saved));
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') console.warn(`Team ${n} load failed`, e);
  }
  return [];
};

/** Removes the one-shot query params (?add=, ?t1=, ?t2=) once they have been applied. */
const cleanUrl = (keys: string[]) => {
  try {
    const url = new URL(window.location.href);
    keys.forEach((k) => url.searchParams.delete(k));
    window.history.replaceState(window.history.state, "", url.pathname + (url.search || "") + url.hash);
  } catch {}
};

// Saison max — ordre chronologique
const SEASON_ORDER: Record<string, number> = {
  "Original": 0,
  "Tokyo 1": 1,
  "Événement": 1.5,
  "Bali 1": 2,
  "Rome 1": 3, "Roma 1": 3,
  "Tokyo 2": 4,
  "Bali 2": 5,
  "Rome 2": 6, "Roma 2": 6,
  "Tokyo 3": 7,
  "Bali 3": 8,
  "Rome 3": 9, "Roma 3": 9,
  "Tokyo 4": 10,
  "Bali 4": 11,
  "Rome 4": 12, "Roma 4": 12,
  "Tokyo 5": 13,
  "Bali 5": 14,
  "Rome 5": 15, "Roma 5": 15,
};
const SEASON_LABELS: string[] = [
  "Original", "Tokyo 1", "Événement",
  "Bali 1", "Rome 1",
  "Tokyo 2", "Bali 2", "Rome 2",
  "Tokyo 3", "Bali 3", "Rome 3",
  "Tokyo 4", "Bali 4", "Rome 4",
  "Tokyo 5", "Bali 5", "Rome 5",
];
const getArtistSeasonOrder = (artist: Artist): number => {
  const ev = artist.event;
  if (!ev) return SEASON_ORDER["Événement"];
  return SEASON_ORDER[ev] ?? SEASON_ORDER["Événement"];
};

const rankOrder: Record<string, number> = { UR: 1, "UR Roma": 1, "UR Bali": 1, SSR: 2 };
const tierOrder: Record<string, number> = { "S+": 0, S: 1, A: 2, B: 3, C: 4, D: 5 };


/* ------------------------------------------------------------------ */
/* Team card                                                            */
/* ------------------------------------------------------------------ */
type TeamCardProps = {
  n: 1 | 2;
  team: Artist[];
  name: string;
  ev: TeamEvaluation;
  t: ArtistContent;
  active: boolean;
  onActivate: () => void;
  onSave: () => void;
  onShare: () => void;
  onClear: () => void;
  onRemove: (id: number) => void;
};

/** The team is named when it is saved and renamed from "My teams": no name field here, the faces get the room. */
function TeamCard({ n, team, name, ev, t, active, onActivate, onSave, onShare, onClear, onRemove }: TeamCardProps) {
  const gradeColor = tierBadgeColors[ev.grade] || tierBadgeColors["-"];
  const genres = Object.entries(ev.stats.genreCounts).sort((a, b) => b[1] - a[1]);
  const label = name || (n === 1 ? t.team1Label : t.team2Label);
  return (
    <div className={`tb-card tb-team tb-team-${n}${active ? " active" : ""}`} style={{ ["--grade" as string]: gradeColor }}>
      <div className="tb-team-head">
        <button type="button" className="tb-team-label" onClick={onActivate} title={t.activeTeamHint}><i aria-hidden="true" />{label}</button>
        {active && <span className="tb-team-active-tag">{t.activeTeamShort || "Active"}</span>}
        <span className="tb-score" title={t.evalPower}>
          <b>{fmt(ev.score)}</b> pts
          {ev.synergy && <span className="tb-bonus">+{Math.round(ev.synergy.bonus * 100)}%</span>}
        </span>
        <div className="tb-grade" title={t.evalRatingHint}>
          <span>{ev.grade}</span>
          <small>{ev.size ? `${ev.rating}/100` : "—"}</small>
        </div>
      </div>

      <div className="tb-slots">
        {[0, 1, 2, 3, 4].map((i) => {
          const a = team[i];
          return (
            <div
              key={i}
              onClick={() => (a ? onRemove(a.id) : onActivate())}
              className={`tb-slot${a ? " filled" : ""}${a && isUR(a.rank) ? " ur" : ""}`}
              title={a ? `${a.name} · ${t.clickToRemove}` : t.activeTeamHint}
            >
              {a ? (
                <>
                  {a.image
                    ? <Image src={`/assets/images/artists/${a.image}`} alt={a.name} fill sizes="140px" style={{ objectFit: "cover", objectPosition: "center 12%" }} />
                    : <span style={{ fontWeight: 800, fontSize: "1rem" }}>{a.name.charAt(0)}</span>}
                  <span className="tb-slot-name">{a.name}</span>
                </>
              ) : <span className="tb-slot-plus">+</span>}
            </div>
          );
        })}
      </div>

      <div className="tb-bar"><i style={{ width: `${ev.rating}%` }} /></div>
      <div className="tb-team-foot">
      <div className="tb-chips">
        {genres.length === 0 && <span className="tb-chip empty">{t.emptyTeam}</span>}
        {genres.map(([genre, count]) => {
          const syn = ev.synergy?.genre === genre;
          return (
            <span
              key={genre}
              className={`tb-chip${syn ? " synergy" : ""}`}
              style={{ ["--chip" as string]: genreColors[genre] || "rgba(139,92,246,0.55)" }}
              title={syn ? `${t.evalSynergy} +${Math.round(ev.synergy!.bonus * 100)}%` : undefined}
            >
              <GenreIcon genre={genre} size={14} style={{ color: genreSolid[genre] || "#fff" }} />{genre} <span className="tb-num">×{count}</span>{syn && <span className="tb-num"> · +{Math.round(ev.synergy!.bonus * 100)}%</span>}
            </span>
          );
        })}
      </div>
        <div className="tb-team-actions">
          <button onClick={onSave} className="tb-icon-btn" title={t.saveTeam} aria-label={t.saveTeam}><Icon name="save" size={14} /></button>
          <button onClick={onShare} className="tb-icon-btn" title={t.shareTeam} aria-label={t.shareTeam}><Icon name="link" size={14} /></button>
          <button onClick={onClear} className="tb-icon-btn danger" title={t.clearTeam} aria-label={t.clearTeam}><Icon name="trash" size={14} /></button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Comparison table (single, shared between both teams)                */
/* ------------------------------------------------------------------ */
function CompareTable({ e1, e2, t, lang, name1, name2, collapsed, onToggle }: { e1: TeamEvaluation; e2: TeamEvaluation; t: ArtistContent; lang: string; name1: string; name2: string; collapsed: boolean; onToggle: () => void }) {
  const L = TB_COPY[lang] || TB_COPY.en;
  const S = TB_SHORT[lang] || TB_SHORT.en;
  const cls = (a: number, b: number) => (a > b ? "win" : a < b ? "lose" : "tie");
  const both = e1.size > 0 && e2.size > 0;
  return (
    <div className={`tb-compare${collapsed ? " collapsed" : ""}`}>
      <button type="button" className="tb-compare-title" onClick={onToggle} aria-expanded={!collapsed}>
        <Icon name="scale" size={14} /> {t.compareTitle}
        <Icon name="chevron" size={13} className={`tb-compare-toggle${collapsed ? "" : " open"}`} />
      </button>
      <div className="tb-compare-body">
        {!both ? (
          <p className="tb-compare-hint">{L.hint}</p>
        ) : (
          <div className="tb-cmp">
            <div className="tb-cmp-head">
              <span className="t1"><i aria-hidden="true" />{name1}</span>
              <span />
              <span className="t2"><i aria-hidden="true" />{name2}</span>
            </div>
            <div className="tb-cmp-rows">
              {STAT_ROWS.map(({ key, suffix = "" }) => {
                const v1 = e1.stats[key] as number;
                const v2 = e2.stats[key] as number;
                const d = v1 - v2;
                const delta = (sign: number) => d === 0 ? <em className="none" /> : (
                  <em className={sign > 0 ? "up" : "down"}>{sign > 0 ? "+" : "−"}{fmt(Math.abs(d))}{suffix}</em>
                );
                return (
                  <div key={key} className="tb-cmp-row">
                    <span className={`tb-cmp-v l t1 ${cls(v1, v2)}`}>
                      <b>{fmt(v1)}{suffix}</b>
                      {delta(d)}
                    </span>
                    <span className="tb-cmp-lbl"><span className="lbl-long">{L[key]}</span><span className="lbl-short">{S[key]}</span></span>
                    <span className={`tb-cmp-v r t2 ${cls(v2, v1)}`}>
                      {delta(-d)}
                      <b>{fmt(v2)}{suffix}</b>
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="tb-cmp-row score">
              <span className={`tb-cmp-v l t1 ${cls(e1.rating, e2.rating)}`}>
                <b>{e1.rating}/100</b><span className="tb-cmp-grade" style={{ background: tierBadgeColors[e1.grade] }}>{e1.grade}</span>
              </span>
              <span className="tb-cmp-lbl strong">{L.score}</span>
              <span className={`tb-cmp-v r t2 ${cls(e2.rating, e1.rating)}`}>
                <span className="tb-cmp-grade" style={{ background: tierBadgeColors[e2.grade] }}>{e2.grade}</span><b>{e2.rating}/100</b>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function ArtistsClient({ lang }: { lang: string }) {
  const router = useRouter();
  // The grid is server-rendered with empty teams; teams, names and saves come from the URL /
  // localStorage once mounted (see the hydration effect below), so the HTML matches on both sides.
  const [team1, setTeam1] = useState<Artist[]>([]);
  const [team2, setTeam2] = useState<Artist[]>([]);
  const [team1Name, setTeam1Name] = useState<string>("");
  const [team2Name, setTeam2Name] = useState<string>("");
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1);
  const [compareCollapsed, setCompareCollapsed] = useState(true);
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [hydrated, setHydrated] = useState(false);
  // Mobile: the team bar switches to a compact strip once the grid is being scrolled.
  const [compact, setCompact] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [filterMaxSeason, setFilterMaxSeason] = useState("");
  const [hideUR, setHideUR] = useState<boolean>(true);
  const t = getArtistContent(lang);

  // Hydration: restore state from the URL and localStorage, then apply a one-shot ?add=ID
  // (deep link from the tier list / artist pages: "Add to my team").
  useEffect(() => {
    let t1 = loadInitialTeam(1);
    const t2 = loadInitialTeam(2);
    const raw = readLS('savedTeams', '[]');
    let saved: SavedTeam[] = [];
    try { const arr = JSON.parse(raw); saved = Array.isArray(arr) ? arr : []; } catch {}
    let addedName: string | null = null;
    try {
      const params = new URLSearchParams(window.location.search);
      const addId = parseInt(params.get('add') || '', 10);
      if (!Number.isNaN(addId)) {
        const artist = (artistsData as Artist[]).find((a) => a.id === addId);
        if (artist && !t1.some((a) => a.id === addId)) {
          if (t1.length >= 5) t1 = [...t1.slice(1), artist];
          else t1 = [...t1, artist];
          addedName = artist.name;
        }
      }
      if (params.has('add') || params.has('t1') || params.has('t2')) cleanUrl(['add', 't1', 't2']);
    } catch {}
    setTeam1(t1);
    setTeam2(t2);
    setTeam1Name(readLS('team1Name', ''));
    setTeam2Name(readLS('team2Name', ''));
    setSavedTeams(saved);
    setHideUR(readLS('tbHideUR2', '1') === '1');
    setHydrated(true);
    if (addedName) showToast(`${addedName} → ${t.team1Label} (${t1.length}/5)`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mobile bottom tray: shown once the workbench has scrolled out of view.
  const workbenchRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = workbenchRef.current;
      const limit = el ? el.offsetTop + el.offsetHeight - 60 : 260;
      setCompact(window.scrollY > limit);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Persist teams (only after hydration, so the server's empty state never overwrites a save)
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem('team1', JSON.stringify(team1.map((a) => a.id))); } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.warn('Team 1 save failed', e);
    }
  }, [team1, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem('team2', JSON.stringify(team2.map((a) => a.id))); } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.warn('Team 2 save failed', e);
    }
  }, [team2, hydrated]);
  useEffect(() => { if (hydrated) try { localStorage.setItem('team1Name', team1Name); } catch {} }, [team1Name, hydrated]);
  useEffect(() => { if (hydrated) try { localStorage.setItem('team2Name', team2Name); } catch {} }, [team2Name, hydrated]);
  useEffect(() => { if (hydrated) try { localStorage.setItem('savedTeams', JSON.stringify(savedTeams)); } catch {} }, [savedTeams, hydrated]);
  useEffect(() => { if (hydrated) try { localStorage.setItem('tbHideUR2', hideUR ? '1' : '0'); } catch {} }, [hideUR, hydrated]);

  const saveTeam = (n: 1 | 2) => {
    const team = n === 1 ? team1 : team2;
    if (team.length === 0) { showToast(t.emptyTeam); return; }
    const rawName = (n === 1 ? team1Name : team2Name).trim();
    const name = rawName || `${n === 1 ? t.team1Label : t.team2Label} · ${new Date().toLocaleDateString()}`;
    const entry = newSavedTeam(n, name, team.map((a) => a.id));
    setSavedTeams((prev) => [entry, ...prev].slice(0, 30));
    (n === 1 ? setTeam1Name : setTeam2Name)(name);
    showToast(`${t.teamSaved} : ${name}`);
  };

  const loadSaved = (saved: SavedTeam, n: 1 | 2) => {
    const team = idsToArtists(saved.ids);
    if (n === 1) { setTeam1(team); setTeam1Name(saved.name); } else { setTeam2(team); setTeam2Name(saved.name); }
    setActiveTeam(n);
  };

  const deleteSaved = (id: string) => setSavedTeams((prev) => prev.filter((s) => s.id !== id));

  const [editingId, setEditingId] = useState<string | null>(null);
  const renameSaved = (saved: SavedTeam, raw: string) => {
    setEditingId(null);
    const name = raw.trim().slice(0, 24);
    if (!name || name === saved.name) return;
    setSavedTeams((prev) => prev.map((s) => (s.id === saved.id ? { ...s, name } : s)));
    // A team currently loaded from this save follows the new name.
    if (team1Name === saved.name) setTeam1Name(name);
    if (team2Name === saved.name) setTeam2Name(name);
  };

  const shareTeams = async () => {
    const parts: string[] = [];
    if (team1.length) parts.push('t1=' + team1.map((a) => a.id).join(','));
    if (team2.length) parts.push('t2=' + team2.map((a) => a.id).join(','));
    if (!parts.length) { showToast(t.emptyTeam); return; }
    const url = `${window.location.origin}/${lang}/teambuilder/?${parts.join('&')}`;
    if (await copyToClipboard(url)) showToast(t.linkCopied);
    else showToast(url);
  };

  const team1Eval = useMemo(() => evaluateTeam(team1), [team1]);
  const team2Eval = useMemo(() => evaluateTeam(team2), [team2]);

  const inTeam1 = (id: number) => team1.some((a) => a.id === id);
  const inTeam2 = (id: number) => team2.some((a) => a.id === id);
  const addToTeam1 = (artist: Artist) => { if (team1.length < 5 && !inTeam1(artist.id)) setTeam1([...team1, artist]); };
  const addToTeam2 = (artist: Artist) => { if (team2.length < 5 && !inTeam2(artist.id)) setTeam2([...team2, artist]); };
  const removeFromTeam1 = (id: number) => setTeam1(team1.filter((a) => a.id !== id));
  const removeFromTeam2 = (id: number) => setTeam2(team2.filter((a) => a.id !== id));
  /** Card click: add to the active team; if already there, remove it from that team. */
  const toggleInActive = (artist: Artist) => {
    const [team, inTeam, add, remove] = activeTeam === 1
      ? [team1, inTeam1, addToTeam1, removeFromTeam1]
      : [team2, inTeam2, addToTeam2, removeFromTeam2];
    const label = activeTeam === 1 ? t.team1Label : t.team2Label;
    if (inTeam(artist.id)) { remove(artist.id); showToast(`${artist.name} ✕ ${label} (${team.length - 1}/5)`); }
    else if (team.length >= 5) showToast(`${label} : 5/5`);
    else { add(artist); showToast(`${artist.name} → ${label} (${team.length + 1}/5)`); }
  };

  const filteredArtists = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const maxOrder = filterMaxSeason ? (SEASON_ORDER[filterMaxSeason] ?? 9999) : 9999;
    return POOL.filter((artist) => {
      if (hideUR && isUR(artist.rank)) return false;
      if (filterGenre && artist.genre !== filterGenre) return false;
      if (filterSpecialty && artist.specialty !== filterSpecialty) return false;
      if (filterMaxSeason !== "" && getArtistSeasonOrder(artist) > maxOrder) return false;
      if (!q) return true;
      const hay = [
        artist.name,
        artist.genre,
        artist.rank,
        artist.position,
        artist.specialty,
        specialtyLabel(artist.specialty, lang),
        artist.calculatedTier,
        ...(artist.skills || []),
        ...skillChips(artist.skills, lang).map((c) => c.text),
      ].filter(Boolean).join(" ").toLowerCase();
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [searchQuery, filterGenre, filterSpecialty, filterMaxSeason, hideUR, lang]);

  const sortedArtists = useMemo(
    () => [...filteredArtists].sort((a, b) =>
      (rankOrder[a.rank] || 99) - (rankOrder[b.rank] || 99) ||
      (tierOrder[a.calculatedTier || ""] ?? 9) - (tierOrder[b.calculatedTier || ""] ?? 9) ||
      a.name.localeCompare(b.name)),
    [filteredArtists],
  );

  const activeFilters = [searchQuery.trim(), filterGenre, filterSpecialty, filterMaxSeason, hideUR ? "ur" : ""].filter(Boolean).length;
  const resetFilters = () => { setSearchQuery(""); setFilterGenre(""); setFilterSpecialty(""); setFilterMaxSeason(""); setHideUR(false); };

  const L = TB_COPY[lang] || TB_COPY.en;
  const openProfile = (a: Artist) => router.push(`/${lang}/artist/${slugify(a.name)}/`);
  const teamTabLabel = (n: 1 | 2) => {
    const name = (n === 1 ? team1Name : team2Name).trim() || (n === 1 ? t.team1Label : t.team2Label);
    const team = n === 1 ? team1 : team2;
    return `${name} (${team.length}/5)`;
  };

  return (
    <>
      {toast && <div className="tb-toast" role="status">{toast}</div>}
      <div className={`tb-page ${numFont.variable}`}>
        {/* Sticky workbench: team 1 | comparison | team 2 (tabs on mobile), then the filter bar */}
        <div ref={workbenchRef} className={`tb-sticky${compact ? " compact" : ""}`}>
          <div className="tb-panel">
            <div className="tb-teams">
            <div className="tb-tabs" role="tablist">
              {([1, 2] as const).map((n) => (
                <button
                  key={n}
                  role="tab"
                  aria-selected={activeTeam === n}
                  className={`tb-tab${activeTeam === n ? ` on on${n}` : ""}`}
                  onClick={() => setActiveTeam(n)}
                >
                  <span className="tb-tab-grade" style={{ background: tierBadgeColors[(n === 1 ? team1Eval : team2Eval).grade] }}>{(n === 1 ? team1Eval : team2Eval).grade}</span>
                  {teamTabLabel(n)}
                </button>
              ))}
            </div>

            <TeamCard
              n={1} team={team1} name={team1Name} ev={team1Eval} t={t}
              active={activeTeam === 1} onActivate={() => setActiveTeam(1)}
              onSave={() => saveTeam(1)} onShare={shareTeams}
              onClear={() => setTeam1([])} onRemove={removeFromTeam1}
            />

            <TeamCard
              n={2} team={team2} name={team2Name} ev={team2Eval} t={t}
              active={activeTeam === 2} onActivate={() => setActiveTeam(2)}
              onSave={() => saveTeam(2)} onShare={shareTeams}
              onClear={() => setTeam2([])} onRemove={removeFromTeam2}
            />
            <CompareTable
              e1={team1Eval} e2={team2Eval} t={t} lang={lang}
              name1={team1Name.trim() || t.team1Label} name2={team2Name.trim() || t.team2Label}
              collapsed={compareCollapsed}
              onToggle={() => setCompareCollapsed((v) => !v)}
            />
            </div>

          </div>

          <div className="tb-filters">
            <div className="tb-filters-main">
              <label htmlFor="artist-search" className="tb-search">
                <Icon name="search" size={15} />
                <span className="sr-only">{t.search}</span>
                <input id="artist-search" type="search" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                {searchQuery && (
                  <button type="button" className="tb-search-clear" onClick={() => setSearchQuery("")} title={t.clearSearch} aria-label={t.clearSearch}>
                    <Icon name="x" size={12} />
                  </button>
                )}
              </label>
              <label className={`tb-toggle${hideUR ? " on" : ""}`}>
                <input type="checkbox" checked={hideUR} onChange={(e) => setHideUR(e.target.checked)} />
                <span className="tb-toggle-box" aria-hidden><Icon name="check" size={11} /></span>
                {t.hideUR}
              </label>
            </div>
            <GenreBar value={filterGenre} onChange={setFilterGenre} allLabel={t.all} className="tb-gbar" />
            <div className="tb-filters-selects">
              <label htmlFor="filter-specialty" className="sr-only">{t.allSpecialties}</label>
              <select id="filter-specialty" className={filterSpecialty ? "on" : ""} value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)}>
                <option value="">{t.allSpecialties}</option>
                {SPECIALTY_KEYS.map((key) => {
                  const frValue = SPECIALTY_VALUES[SPECIALTY_KEYS.indexOf(key)];
                  const label = SPECIALTY_LABELS_BY_LANG[lang]?.[key] || SPECIALTY_LABELS_BY_LANG.en[key] || frValue;
                  return <option key={key} value={frValue}>{label}</option>;
                })}
              </select>
              <label htmlFor="filter-season" className="sr-only">{t.allSeasons}</label>
              <select id="filter-season" className={filterMaxSeason ? "on" : ""} value={filterMaxSeason} onChange={(e) => setFilterMaxSeason(e.target.value)}>
                <option value="">{t.allSeasons}</option>
                {SEASON_LABELS.map((s) => (<option key={s} value={s}>{`${t.maxSeason} : ${s}`}</option>))}
              </select>
            </div>
            <div className="tb-filters-end">
              <span className="tb-filters-count" title={t.foundArtists}>{filteredArtists.length}</span>
              <button type="button" className="tb-reset" onClick={resetFilters} disabled={activeFilters === 0} title={t.resetFilters} aria-label={t.resetFilters}>
                <Icon name="reset" size={13} />
                {activeFilters > 0 && <b>{activeFilters}</b>}
              </button>
            </div>
          </div>
        </div>

        {/* Mini team bar: fixed at the top once the workbench has scrolled away (both teams on wide screens) */}
        <div className={`tb-tray${compact ? " show" : ""}`} aria-hidden={!compact}>
          {([1, 2] as const).map((n) => {
            const team = n === 1 ? team1 : team2;
            const ev = n === 1 ? team1Eval : team2Eval;
            const remove = n === 1 ? removeFromTeam1 : removeFromTeam2;
            return (
              <div key={n} className={`tb-tray-team t${n}${activeTeam === n ? " on" : ""}`} onClick={() => setActiveTeam(n)} role="button" tabIndex={0} title={t.activeTeamHint}>
                <span className="tb-tray-num">{n}</span>
                <span className="tb-tray-slots">
                  {[0, 1, 2, 3, 4].map((i) => {
                    const a = team[i];
                    return (
                      <span
                        key={i}
                        className={`tb-tray-slot${a ? " filled" : ""}`}
                        onClick={(e) => { if (a) { e.stopPropagation(); remove(a.id); } }}
                        title={a ? `${a.name} · ${t.clickToRemove}` : undefined}
                      >
                        {a?.image ? <Image src={`/assets/images/artists/${a.image}`} alt={a.name} fill sizes="48px" style={{ objectFit: "cover", objectPosition: "center 12%" }} /> : a ? a.name.charAt(0) : "+"}
                      </span>
                    );
                  })}
                </span>
                <span className="tb-tray-grade" style={{ background: tierBadgeColors[ev.grade] || tierBadgeColors["-"] }}>{ev.grade}</span>
                <span className="tb-tray-pts"><b>{fmt(ev.score)}</b> pts</span>
              </div>
            );
          })}
          <button type="button" className="tb-tray-swap" onClick={() => setActiveTeam(activeTeam === 1 ? 2 : 1)} aria-label={t.team2Label}>⇄</button>
          <button type="button" className="tb-tray-up" onClick={() => workbenchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })} aria-label="Top">▲</button>
        </div>

        {/* Saved teams + grid */}
        <div className="tb-bottom">
          {savedTeams.length > 0 && <div className="tb-saved">
            <span className="tb-saved-title"><Icon name="folder" size={13} /> {t.myTeams}</span>
            {savedTeams.map((s) => (
              <div key={s.id} className="tb-saved-chip">
                <span className="tb-saved-avatars">
                  {s.ids.slice(0, 5).map((id) => {
                    const a = (artistsData as Artist[]).find((x) => x.id === id);
                    if (!a) return null;
                    return a.image
                      ? <Image key={id} src={`/assets/images/artists/${a.image}`} alt={a.name} width={22} height={28} style={{ objectFit: "cover", borderRadius: 3 }} />
                      : <span key={id} className="tb-saved-avatar-letter">{a.name.charAt(0)}</span>;
                  })}
                </span>
                {editingId === s.id ? (
                  <input
                    className="tb-saved-input"
                    defaultValue={s.name}
                    maxLength={24}
                    autoFocus
                    aria-label={t.teamNamePlaceholder}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => renameSaved(s, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                      if (e.key === "Escape") setEditingId(null);
                    }}
                  />
                ) : (
                  <button type="button" className="tb-saved-name" title={t.renameTeam} onClick={() => setEditingId(s.id)}>
                    {s.name}<Icon name="pencil" size={10} />
                  </button>
                )}
                <button className="tb-saved-btn b1" onClick={() => loadSaved(s, 1)} title={`${t.loadInto} 1`}>→1</button>
                <button className="tb-saved-btn b2" onClick={() => loadSaved(s, 2)} title={`${t.loadInto} 2`}>→2</button>
                <button className="tb-saved-btn del" onClick={() => deleteSaved(s.id)} title={t.deleteSaved}>✕</button>
              </div>
            ))}
          </div>}
          {savedTeams.length > 0 && <SupportCard lang={lang} compact />}
          <div className="tb-grid-panel">
          <div className="tb-grid-head">
            <h2 className="tb-sec">{L.secArtists} <span>{filteredArtists.length}</span></h2>
            <button type="button" className={`tb-active-chip t${activeTeam}`} onClick={() => setActiveTeam(activeTeam === 1 ? 2 : 1)} title={t.activeTeamHint}>
              <i aria-hidden="true" />{L.addingTo} {teamTabLabel(activeTeam)} ⇄
            </button>
          </div>

          {sortedArtists.length === 0 && <div className="tb-saved-empty" style={{ padding: 20, textAlign: "center" }}>{t.noResults}</div>}
          <div className="tb-grid">
            {sortedArtists.map((artist) => {
              const inT1 = inTeam1(artist.id);
              const inT2 = inTeam2(artist.id);
              const ur = isUR(artist.rank);
              const chips = skillChips(artist.skills, lang).slice(0, 3);
              return (
                <Fragment key={artist.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleInActive(artist)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleInActive(artist); } }}
                  className={`tb-art${ur ? " ur" : ""}${inT1 ? " in1" : ""}${inT2 ? " in2" : ""}`}
                  title={`${artist.name} · ${specialtyLabel(artist.specialty, lang)}`}
                >
                  <div className="tb-art-img">
                    {artist.image ? (
                      <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} fill sizes="(max-width: 900px) 33vw, 150px" style={{ objectFit: "cover" }} />
                    ) : (
                      <div className="tb-art-placeholder"><span>{artist.name.charAt(0)}</span></div>
                    )}
                    {artist.calculatedTier && (
                      <span className="tb-art-tier" style={{ background: tierBadgeColors[artist.calculatedTier] || "#64748b" }}>{artist.calculatedTier}</span>
                    )}
                    <span
                      role="link"
                      className="tb-art-info"
                      title={t.viewProfileTitle}
                      onClick={(e) => { e.stopPropagation(); openProfile(artist); }}
                    >i</span>
                    <span className="tb-art-name"><GenreIcon genre={artist.genre} size={13} style={{ color: genreSolid[artist.genre] || "#fff", marginRight: 5 }} />{artist.name}</span>
                    {(inT1 || inT2) && (
                      <span className="tb-art-inteam">
                        {inT1 && <span className="t1">1</span>}
                        {inT2 && <span className="t2">2</span>}
                      </span>
                    )}
                    <span className="tb-art-hover">
                      <span
                        role="button"
                        className={`tb-art-add t1${inT1 || team1.length >= 5 ? " off" : ""}`}
                        title={t.addTeam1}
                        onClick={(e) => { e.stopPropagation(); if (!inT1) addToTeam1(artist); }}
                      >+1</span>
                      <span
                        role="button"
                        className={`tb-art-add t2${inT2 || team2.length >= 5 ? " off" : ""}`}
                        title={t.addTeam2}
                        onClick={(e) => { e.stopPropagation(); if (!inT2) addToTeam2(artist); }}
                      >+2</span>
                    </span>
                  </div>
                  <div className="tb-art-skills">
                    {chips.length === 0
                      ? <span className="tb-skill other">—</span>
                      : chips.map((c, i) => <span key={i} className={`tb-skill ${c.kind}`} title={artist.skills?.[i]}>{c.text}</span>)}
                  </div>
                </div>
                </Fragment>
              );
            })}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
