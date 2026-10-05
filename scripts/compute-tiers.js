#!/usr/bin/env node
/**
 * Recompute `calculatedTier` for every artist from their skills.
 *
 *   node scripts/compute-tiers.js          # dry run: prints scores and the before/after diff
 *   node scripts/compute-tiers.js --write  # also writes calculatedTier + tierScore into artists.json
 *
 * Principle: the tier depends only on the skills (type and % value). Two artists
 * with the same skills always land in the same tier. Stats only order artists
 * inside a tier (tieBreak), they never move an artist across tiers.
 *
 * Each skill is first normalized by the highest value of its type seen in the data
 * (80% basic attack and 32% player damage both count as 1.0), then multiplied by
 * the type weight below, from the maintainer's ranking of skill power:
 *   damage to player > skill damage reduction > skill damage > basic attack > basic attack reduction
 *   rally cap / fan cap are situational (low weight)
 *   everything else (dps line, gold, drive speed, WBG, PVE dps) is dead weight (0)
 * A maxed skill of a given type is worth weight x 100 points.
 */
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "src", "lib", "data", "artists.json");
const WRITE = process.argv.includes("--write");

// [regex, type weight, label]
const SKILL_WEIGHTS = [
  [/damage to player|player damage/i, 5, "player dmg"],
  [/skill damage (taken|reduction)|↓.*skill damage/i, 4, "skill dmg reduction"],
  [/↑\s*\S+\s*skill damage|^\S+\s*skill damage$/i, 3, "skill dmg"],
  [/basic attack damage dealt|normal attack|basic attack damage$|increase normal attack/i, 2, "basic atk"],
  [/basic attack damage taken|basic damage reduction|↓.*damage taken|^\S+ damage reduction$/i, 1.5, "basic atk reduction"],
  [/rally fan|rally fans/i, 1.5, "rally cap"],
  [/fan cap|fans cap/i, 1.5, "fan cap"],
];

// Tier boundaries on the skill score. Fixed numbers so identical skills always share a tier.
// Tuned on the SSR distribution: see the histogram printed in dry run.
const TIER_THRESHOLDS = [
  ["S+", 700],
  ["S", 550],
  ["A", 400],
  ["B", 250],
  ["C", 120],
  ["D", 0],
];

function parseSkill(raw) {
  const text = String(raw).replace(/\s+/g, " ").trim();
  const pct = text.match(/(\d+(?:[.,]\d+)?)\s*%/);
  if (!pct) return null; // "10 sec/1800 damage" and other non-% lines are dead weight
  const value = parseFloat(pct[1].replace(",", "."));
  for (const [re, weight, label] of SKILL_WEIGHTS) {
    if (re.test(text)) return { label, value, weight };
  }
  return { label: "dead", value, weight: 0 };
}

// Highest value seen per skill type: the normalization base.
const TYPE_MAX = {};
function learnTypeMax(artists) {
  for (const a of artists) for (const s of a.skills || []) {
    const p = parseSkill(s);
    if (p && p.weight) TYPE_MAX[p.label] = Math.max(TYPE_MAX[p.label] || 0, p.value);
  }
}

function scoreArtist(artist) {
  const parts = (artist.skills || []).map(parseSkill).filter(Boolean);
  for (const p of parts) p.points = p.weight ? (p.value / TYPE_MAX[p.label]) * p.weight * 100 : 0;
  const score = parts.reduce((sum, p) => sum + p.points, 0);
  return { score: Math.round(score), parts };
}

function tierFor(score) {
  for (const [tier, min] of TIER_THRESHOLDS) if (score >= min) return tier;
  return "D";
}

const artists = JSON.parse(fs.readFileSync(DATA, "utf8"));
learnTypeMax(artists);
console.log("Normalization base (max % per skill type):", TYPE_MAX);
console.log("");
const rows = artists.map((a) => {
  const { score, parts } = scoreArtist(a);
  const stats = (a.singStat || 0) + (a.danceStat || 0);
  return { a, score, parts, stats, oldTier: a.calculatedTier, newTier: tierFor(score) };
});

// Histogram of SSR scores, to tune thresholds.
const ssr = rows.filter((r) => r.a.rank === "SSR").sort((p, q) => q.score - p.score);
console.log("SSR score distribution (score: names)");
const byScore = {};
for (const r of ssr) (byScore[r.score] = byScore[r.score] || []).push(r.a.name);
for (const [s, names] of Object.entries(byScore).sort((p, q) => q[0] - p[0])) {
  console.log(`  ${String(s).padStart(6)}  ${tierFor(+s).padEnd(2)}  ${names.join(", ")}`);
}

console.log("\nTier changes:");
let changes = 0;
for (const r of rows) {
  if (r.oldTier !== r.newTier) {
    changes++;
    const detail = r.parts.filter((p) => p.weight).map((p) => `${p.value}% ${p.label}`).join(" + ") || "no scored skill";
    console.log(`  ${r.a.name.padEnd(12)} ${r.a.rank.padEnd(8)} ${String(r.oldTier).padEnd(3)} -> ${r.newTier.padEnd(3)} score ${String(r.score).padStart(5)}  (${detail})`);
  }
}
console.log(`\n${changes} artists change tier out of ${rows.length}.`);

const deadPct = [...new Set(rows.flatMap((r) => r.a.skills.filter((s) => /\d%/.test(s) && parseSkill(s).weight === 0)))];
if (deadPct.length) console.log("\nSkills with a % but weighted 0 (check they are really dead):\n  " + deadPct.join("\n  "));

if (WRITE) {
  for (const r of rows) {
    r.a.calculatedTier = r.newTier;
    r.a.tierScore = r.score;
  }
  fs.writeFileSync(DATA, JSON.stringify(artists, null, 2) + "\n");
  console.log(`\nWritten to ${path.relative(process.cwd(), DATA)}`);
} else {
  console.log("\nDry run. Add --write to update artists.json.");
}
