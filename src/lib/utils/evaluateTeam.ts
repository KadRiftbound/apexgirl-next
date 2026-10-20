import type { Artist } from "@/lib/types/artist";
import artistsData from "@/lib/data/artists.json";
import { calculateTeamStats, type TeamStats } from "./calculateTeamStats";

/**
 * Team evaluator for the Team Builder.
 *
 * 1. Genre synergy: 3 artists of the same genre = +5%, 4 = +10%, 5 = +25%.
 * 2. Power: the team's combined skill % converted to points (same weights as the
 *    tier list for damage/defense), then rated in three contexts:
 *      - general: raw fighting value (player damage dominates)
 *      - solo:    general + fan capacity (troop size for solo marches)
 *      - rally:   general + rally capacity (troop size for group rallies)
 *    The rating (0–100) is the best of the three, relative to the best possible
 *    team in that context, on a square-root scale so mid teams are not crushed.
 *    A very specialised team is therefore rated on what it is built for.
 * 3. Specialty: which context the team is built for, plus its strong/weak axes.
 */

export const SYNERGY_BONUS: Record<number, number> = { 3: 0.05, 4: 0.1, 5: 0.25 };

export type TeamContext = "general" | "solo" | "rally";
export type TeamAxis = "solo" | "rally" | "dps" | "tank";
export type TeamGrade = "S+" | "S" | "A" | "B" | "C" | "D" | "-";
export type TeamSynergy = { genre: string; count: number; bonus: number };

export type TeamEvaluation = {
  size: number;
  stats: TeamStats;
  synergy: TeamSynergy | null;
  /** The next synergy step reachable by adding/swapping one artist of `genre`. */
  nextSynergy: TeamSynergy | null;
  /** Points per context, synergy applied. */
  scores: Record<TeamContext, number>;
  /** Rating 0–100 per context. */
  ratings: Record<TeamContext, number>;
  /** Context the team is best at (what it is built for). */
  context: TeamContext;
  /** Best rating, 0–100. */
  rating: number;
  /** Points in the best context. */
  score: number;
  grade: TeamGrade;
  /** 0–100 per axis, relative to a full team specialised in that axis. */
  profile: Record<TeamAxis, number>;
  strengths: TeamAxis[];
  weaknesses: TeamAxis[];
};

// Points per %. Damage/defense weights mirror scripts/compute-tiers.js.
const W = {
  playerDmg: 100,
  skillDmg: 10,
  basicAtk: 4,
  skillResist: 400 / 12,
  attackResist: 10,
  fanBase: 3,
  rallyBase: 3,
  /** extra value of fan capacity when fighting solo */
  fanSolo: 80,
  /** extra value of rally capacity when rallying */
  rallyRally: 120,
};

// Per-artist reference for a "fully specialised" artist (×5 for a team), for the profile axes.
const REF = { solo: 12 * 5, rally: 10 * 5, dps: 1000 * 5, tank: 520 * 5 };

const clamp = (v: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));

function contextScores(s: TeamStats): Record<TeamContext, number> {
  const general =
    s.playerDamage * W.playerDmg +
    (s.skillDamage - s.playerDamage) * W.skillDmg +
    (s.basicAttackPercent - s.playerDamage) * W.basicAtk +
    s.skillResist * W.skillResist +
    s.attackResist * W.attackResist +
    s.fanCapacity * W.fanBase +
    s.rallyCapacity * W.rallyBase;
  return {
    general,
    solo: general + s.fanCapacity * W.fanSolo,
    rally: general + s.rallyCapacity * W.rallyRally,
  };
}

/** Best possible score per context with the current roster (top 5, or top 5 of one genre with +25%). */
export const BEST_SCORES: Record<TeamContext, number> = (() => {
  const all = (artistsData as Artist[]).filter((a) => a.rank !== "R" && a.rank !== "SR");
  const per = all.map((a) => ({ genre: a.genre, c: contextScores(calculateTeamStats([a])) }));
  const genres = Array.from(new Set(all.map((a) => a.genre)));
  const best = { general: 1, solo: 1, rally: 1 } as Record<TeamContext, number>;
  for (const k of Object.keys(best) as TeamContext[]) {
    const top5 = (list: typeof per) =>
      [...list].sort((p, q) => q.c[k] - p.c[k]).slice(0, 5).reduce((t, p) => t + p.c[k], 0);
    best[k] = Math.max(top5(per), ...genres.map((g) => top5(per.filter((p) => p.genre === g)) * 1.25), 1);
  }
  return best;
})();

export function gradeFromRating(rating: number): TeamGrade {
  if (rating >= 90) return "S+";
  if (rating >= 75) return "S";
  if (rating >= 55) return "A";
  if (rating >= 38) return "B";
  if (rating >= 22) return "C";
  return "D";
}

export function evaluateTeam(team: Artist[]): TeamEvaluation {
  const stats = calculateTeamStats(team);
  const size = team.length;

  // --- 1. synergy -----------------------------------------------------------
  let top: { genre: string; count: number } | null = null;
  for (const [genre, count] of Object.entries(stats.genreCounts)) {
    if (!top || count > top.count) top = { genre, count };
  }
  const synergy: TeamSynergy | null =
    top && SYNERGY_BONUS[top.count] ? { ...top, bonus: SYNERGY_BONUS[top.count] } : null;
  const nextSynergy: TeamSynergy | null =
    top && top.count >= 2 && top.count < 5
      ? { genre: top.genre, count: top.count + 1, bonus: SYNERGY_BONUS[top.count + 1] }
      : null;

  // --- 2. power per context ------------------------------------------------
  const mult = 1 + (synergy?.bonus ?? 0);
  const raw = contextScores(stats);
  const scores = {
    general: Math.round(raw.general * mult),
    solo: Math.round(raw.solo * mult),
    rally: Math.round(raw.rally * mult),
  };
  const ratings = {} as Record<TeamContext, number>;
  for (const k of Object.keys(scores) as TeamContext[]) {
    ratings[k] = size ? Math.round(clamp(Math.sqrt(scores[k] / BEST_SCORES[k]) * 100)) : 0;
  }
  // Best context. A team is only called solo/rally when it clearly gains from it (≥ 5 points).
  const MARGIN = 5;
  let context: TeamContext = "general";
  if (ratings.solo >= ratings.general + MARGIN && ratings.solo >= ratings.rally) context = "solo";
  else if (ratings.rally >= ratings.general + MARGIN && ratings.rally > ratings.solo) context = "rally";
  const rating = ratings[context];
  const score = scores[context];
  const grade: TeamGrade = size ? gradeFromRating(rating) : "-";

  // --- 3. profile, strengths, weaknesses -----------------------------------
  const tankPts = stats.skillResist * W.skillResist + stats.attackResist * W.attackResist;
  const dpsPts = raw.general - tankPts - stats.fanCapacity * W.fanBase - stats.rallyCapacity * W.rallyBase;
  const profile: Record<TeamAxis, number> = {
    solo: Math.round(clamp((stats.fanCapacity / REF.solo) * 100)),
    rally: Math.round(clamp((stats.rallyCapacity / REF.rally) * 100)),
    dps: Math.round(clamp((dpsPts / REF.dps) * 100)),
    tank: Math.round(clamp((tankPts / REF.tank) * 100)),
  };
  const axes = (Object.entries(profile) as [TeamAxis, number][]).sort((a, b) => b[1] - a[1]);
  const strengths = size ? axes.filter(([, v]) => v >= 40).slice(0, 2).map(([k]) => k) : [];
  const weaknesses = size ? axes.filter(([, v]) => v < 15).reverse().slice(0, 2).map(([k]) => k) : [];

  return { size, stats, synergy, nextSynergy, scores, ratings, context, rating, score, grade, profile, strengths, weaknesses };
}
