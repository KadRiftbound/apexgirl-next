// Short, translated labels for an artist's skills, for compact cards (tier list, home).
// Mirrors the skill types used by scripts/compute-tiers.js.

export type SkillKind = "pd" | "sdr" | "sd" | "ba" | "bar" | "fan" | "rally" | "dps" | "other";

export type SkillChip = { kind: SkillKind; text: string };

const TYPES: [SkillKind, RegExp][] = [
  ["pd", /damage to player|player damage/i],
  ["sdr", /skill damage (taken|reduction)|↓.*skill damage/i],
  ["sd", /skill damage/i],
  ["ba", /basic attack damage dealt|normal attack|basic attack damage$|increase normal attack/i],
  ["bar", /basic attack damage taken|basic damage reduction|↓.*damage taken|^\S+ damage reduction$/i],
  // Rally fan capacity (group rallies) is not the same skill as fan capacity (solo marches).
  ["rally", /rally/i],
  ["fan", /fans? cap|fan capacity/i],
];

const LABELS: Record<string, Record<SkillKind, string>> = {
  fr: { pd: "Dmg joueur", sdr: "Réd. skill", sd: "Dmg skill", ba: "Attaque", bar: "Réd. attaque", fan: "Fans", rally: "Fans rally", dps: "DPS", other: "Hors combat" },
  en: { pd: "Player dmg", sdr: "Skill dmg red.", sd: "Skill dmg", ba: "Basic atk", bar: "Basic dmg red.", fan: "Fan cap", rally: "Rally cap", dps: "DPS", other: "Non-combat" },
  id: { pd: "Dmg pemain", sdr: "Red. skill", sd: "Dmg skill", ba: "Serangan", bar: "Red. serangan", fan: "Fan", rally: "Fan rally", dps: "DPS", other: "Non-tempur" },
};

function parse(raw: string): { kind: SkillKind; value: string } | null {
  const text = String(raw).replace(/["\s]+/g, " ").trim();
  const pct = text.match(/(\d+(?:[.,]\d+)?)\s*%/);
  if (pct) {
    const kind = TYPES.find(([, re]) => re.test(text))?.[0] ?? "other";
    return { kind, value: `${pct[1]}%` };
  }
  const dps = text.match(/(\d+)\s*dps\b/i);
  if (dps) return { kind: "dps", value: dps[1] };
  return null;
}

export function skillChips(skills: string[] | undefined, lang: string): SkillChip[] {
  const labels = LABELS[lang] || LABELS.en;
  const parsed = (skills || []).map(parse).filter((p): p is { kind: SkillKind; value: string } => p !== null);
  const chips: SkillChip[] = [];
  for (let i = 0; i < parsed.length; i++) {
    const p = parsed[i];
    const twin = parsed[i + 1];
    if (twin && twin.kind === p.kind && twin.value === p.value) {
      chips.push({ kind: p.kind, text: `${p.value} ${labels[p.kind]} ×2` });
      i++;
    } else {
      chips.push({ kind: p.kind, text: p.kind === "other" ? labels.other : `${p.value} ${labels[p.kind]}` });
    }
  }
  return chips;
}
