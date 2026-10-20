#!/usr/bin/env node
/**
 * Recompute `calculatedTier` for every artist from their skills.
 *
 *   node scripts/compute-tiers.js          # dry run: prints scores and the before/after diff
 *   node scripts/compute-tiers.js --write  # also writes calculatedTier + tierScore into artists.json
 *
 * Principle: the tier depends only on the skills (type and % value). Two artists
 * with the same skills always land in the same tier.
 *
 * Rules, from the maintainer's ranking of skill power:
 * 1. Damage to player is by far the best skill and drives the tier on its own:
 *    >= 24% total -> S+, any lower amount -> S.
 * 2. The other skills give "support points", used for artists without damage to player
 *    (S >= 500, A >= 350, B >= 250, C >= 120, else D) and to order artists inside a tier:
 *      skill damage reduction > skill damage > basic attack > basic attack reduction > fan cap > fixed dps
 *    Fixed dps is decent but situational: low value, and it only counts as a second skill up to A.
 *    Gold, drive speed, world building guard damage, PVE damage lines are dead weight (0).
 * 3. An artist needs two useful skills to reach A or above, otherwise she is capped at B.
 *    With fixed dps as her second skill she is capped at A.
 */
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "src", "lib", "data", "artists.json");
const WRITE = process.argv.includes("--write");

// [label, regex, points per unit, counts as a useful skill]. Order matters: first match wins.
// Reference values: 12% skill damage reduction = 400, 20% skill damage = 200, 50% basic attack = 200,
// 12% basic attack reduction = 120, 16% fan cap = 50, 240 fixed dps = 100.
const PCT_TYPES = [
  ["player dmg", /damage to player|player damage/i, 0, true],
  ["skill dmg reduction", /skill damage (taken|reduction)|↓.*skill damage/i, 400 / 12, true],
  ["skill dmg", /skill damage/i, 10, true],
  ["basic atk", /basic attack damage dealt|normal attack|basic attack damage$|increase normal attack/i, 4, true],
  ["basic atk reduction", /basic attack damage taken|basic damage reduction|↓.*damage taken|^\S+ damage reduction$/i, 10, true],
  ["fan cap", /fans? cap|fan capacity/i, 50 / 16, true],
];
const DPS_POINTS = 100 / 240;

function parseSkill(raw) {
  const text = String(raw).replace(/["\s]+/g, " ").trim();
  const pct = text.match(/(\d+(?:[.,]\d+)?)\s*%/);
  if (pct) {
    const value = parseFloat(pct[1].replace(",", "."));
    for (const [label, re, perUnit, useful] of PCT_TYPES) {
      if (re.test(text)) return { label, value, unit: "%", points: value * perUnit, useful };
    }
    return { label: "dead", value, unit: "%", points: 0, useful: false };
  }
  const dps = text.match(/(\d+)\s*dps\b/i);
  if (dps) return { label: "fixed dps", value: +dps[1], unit: "", points: +dps[1] * DPS_POINTS, useful: false, situational: true };
  return null; // "10 sec/1800 damage" and other flat lines
}

function scoreArtist(artist) {
  const parts = (artist.skills || []).map(parseSkill).filter(Boolean);
  const playerDamage = parts.filter((p) => p.label === "player dmg").reduce((t, p) => t + p.value, 0);
  const support = Math.round(parts.reduce((t, p) => t + p.points, 0));
  const useful = parts.filter((p) => p.useful).length;
  const situational = parts.filter((p) => p.situational).length;
  return { playerDamage, support, useful, situational, parts, score: Math.round(playerDamage * 100 + support) };
}

const TIERS = ["S+", "S", "A", "B", "C", "D"];

function tierFor({ playerDamage, support, useful, situational }) {
  let tier;
  if (playerDamage >= 24) tier = "S+";
  else if (playerDamage > 0 || support >= 500) tier = "S";
  else if (support >= 350) tier = "A";
  else if (support >= 250) tier = "B";
  else if (support >= 120) tier = "C";
  else tier = "D";
  const cap = useful >= 2 ? "S+" : useful + situational >= 2 ? "A" : "B";
  if (TIERS.indexOf(tier) < TIERS.indexOf(cap)) return { tier: cap, capped: true };
  return { tier, capped: false };
}

// Capped artists sit at the bottom of their tier: their score is the tier's entry threshold.
const CAPPED_SCORE = { A: 350, B: 250 };

const artists = JSON.parse(fs.readFileSync(DATA, "utf8"));
const rows = artists.map((a) => {
  const r = scoreArtist(a);
  const { tier, capped } = tierFor(r);
  return { a, ...r, score: capped ? CAPPED_SCORE[tier] : r.score, oldTier: a.calculatedTier, newTier: tier };
});

for (const tier of TIERS) {
  const list = rows.filter((r) => r.newTier === tier).sort((p, q) => q.score - p.score);
  console.log(`\n${tier} (${list.length})`);
  for (const r of list) {
    const detail = r.parts.map((p) => `${p.value}${p.unit} ${p.label}`).join(" + ") || "no scored skill";
    const moved = r.oldTier !== r.newTier ? `  (was ${r.oldTier})` : "";
    console.log(`  ${r.a.name.padEnd(12)} ${r.a.rank.padEnd(8)} ${String(r.score).padStart(5)}  ${detail}${moved}`);
  }
}
console.log(`\n${rows.filter((r) => r.oldTier !== r.newTier).length} artists change tier out of ${rows.length}.`);

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
