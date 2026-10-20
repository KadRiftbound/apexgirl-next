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
 * 4. Pure tanks (only damage reduction skills, e.g. Paisley) are capped at A: they protect
 *    the team but add no damage.
 * 5. Season: each season raises the artists' base stats, so support points are multiplied by
 *    1 + 3% per season (Tokyo 1 = 1 ... Rome 5 = 15). Artists without a season (Original,
 *    Universal URs, events, auctions) cannot get an assistant, so they take a -10% malus.
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
  ["rally fan cap", /rally/i, 50 / 16, true],
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

// Seasons in release order: Tokyo 1, Bali 1, Rome 1, Tokyo 2, ... Rome 5 -> 1..15.
const SEASON_CITIES = ["tokyo", "bali", "rom"];
const SEASON_STEP = 0.03;
const NO_SEASON_FACTOR = 0.9;

function seasonIndex(artist) {
  for (const field of [artist.season, artist.event]) {
    const m = String(field || "").toLowerCase().match(/(tokyo|bali|rom)a?e?\s*(\d+)/);
    if (m) return (Number(m[2]) - 1) * 3 + SEASON_CITIES.indexOf(m[1]) + 1;
  }
  return 0;
}

function seasonFactor(artist) {
  const idx = seasonIndex(artist);
  return idx ? 1 + idx * SEASON_STEP : NO_SEASON_FACTOR;
}

const DEFENSIVE = new Set(["skill dmg reduction", "basic atk reduction"]);

function scoreArtist(artist) {
  const parts = (artist.skills || []).map(parseSkill).filter(Boolean);
  const playerDamage = parts.filter((p) => p.label === "player dmg").reduce((t, p) => t + p.value, 0);
  const season = seasonFactor(artist);
  const support = Math.round(parts.reduce((t, p) => t + p.points, 0) * season);
  const useful = parts.filter((p) => p.useful).length;
  const situational = parts.filter((p) => p.situational).length;
  const pureTank = useful > 0 && parts.filter((p) => p.useful).every((p) => DEFENSIVE.has(p.label));
  return { playerDamage, support, useful, situational, pureTank, season, parts, score: Math.round(playerDamage * 100 * season + support) };
}

const TIERS = ["S+", "S", "A", "B", "C", "D"];

function tierFor({ playerDamage, support, useful, situational, pureTank }) {
  let tier;
  if (playerDamage >= 24) tier = "S+";
  else if (playerDamage > 0 || support >= 500) tier = "S";
  else if (support >= 350) tier = "A";
  else if (support >= 250) tier = "B";
  else if (support >= 120) tier = "C";
  else tier = "D";
  if (pureTank && TIERS.indexOf(tier) < TIERS.indexOf("A")) return { tier: "A", capped: "tank" };
  const cap = useful >= 2 ? "S+" : useful + situational >= 2 ? "A" : "B";
  if (TIERS.indexOf(tier) < TIERS.indexOf(cap)) return { tier: cap, capped: true };
  return { tier, capped: false };
}

// Capped artists sit at the bottom of their tier: their score is the tier's entry threshold.
// Pure tanks keep their score, just below the S threshold, so they lead tier A.
const CAPPED_SCORE = { A: 350, B: 250 };
const TANK_MAX_SCORE = 499;

const artists = JSON.parse(fs.readFileSync(DATA, "utf8"));
const rows = artists.map((a) => {
  const r = scoreArtist(a);
  const { tier, capped } = tierFor(r);
  const score = capped === "tank" ? Math.min(r.score, TANK_MAX_SCORE) : capped ? CAPPED_SCORE[tier] : r.score;
  return { a, ...r, score, oldTier: a.calculatedTier, newTier: tier };
});

for (const tier of TIERS) {
  const list = rows.filter((r) => r.newTier === tier).sort((p, q) => q.score - p.score);
  console.log(`\n${tier} (${list.length})`);
  for (const r of list) {
    const detail = r.parts.map((p) => `${p.value}${p.unit} ${p.label}`).join(" + ") || "no scored skill";
    const moved = r.oldTier !== r.newTier ? `  (was ${r.oldTier})` : "";
    console.log(`  ${r.a.name.padEnd(12)} ${r.a.rank.padEnd(8)} ${String(r.score).padStart(5)}  ×${r.season.toFixed(2)}  ${detail}${moved}`);
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
