// Text generated for every artist page (meta description + intro paragraph) from the data file,
// so that each of the 126 pages carries its own description instead of a generic one.

export type ArtistSeoInput = {
  name: string;
  rank: string;
  genre: string;
  position: string;
  group?: string;
  season?: string;
  skills?: string[];
  calculatedTier?: string;
  specialty?: string;
  singStat?: number;
  danceStat?: number;
};

const specialtyLabels: Record<string, Record<string, string>> = {
  "Augmentation dommage": { fr: "augmentation des dégâts", en: "damage boost", id: "peningkatan damage" },
  "Dommage réduction": { fr: "réduction des dégâts", en: "damage reduction", id: "pengurangan damage" },
  "Solo car": { fr: "voiture solo", en: "solo car", id: "mobil solo" },
  "Mixte": { fr: "profil mixte", en: "mixed profile", id: "profil campuran" },
  "HQ defense": { fr: "défense du QG", en: "HQ defense", id: "pertahanan HQ" },
  "HQ Defense": { fr: "défense du QG", en: "HQ defense", id: "pertahanan HQ" },
  "Rassemblement": { fr: "rassemblement", en: "rally", id: "rally" },
  "Vitesse de conduite": { fr: "vitesse de conduite", en: "driving speed", id: "kecepatan mengemudi" },
  "Économie": { fr: "économie", en: "economy", id: "ekonomi" },
};

const tierWords: Record<string, Record<string, string>> = {
  "S+": { fr: "incontournable", en: "a must-have", id: "wajib dimiliki" },
  S: { fr: "excellente", en: "excellent", id: "sangat bagus" },
  A: { fr: "solide", en: "a solid pick", id: "pilihan solid" },
  B: { fr: "correcte", en: "average", id: "rata-rata" },
  C: { fr: "situationnelle", en: "situational", id: "situasional" },
  D: { fr: "peu recommandée", en: "not recommended", id: "tidak direkomendasikan" },
};

function cleanSkill(s: string) {
  return s.replace(/↑/g, "+").replace(/↓/g, "-").replace(/\s+/g, " ").trim();
}

export function specialtyLabel(specialty: string | undefined, lang: string): string {
  if (!specialty) return "";
  const l = specialtyLabels[specialty];
  return l ? l[lang] || l.en : specialty;
}

/** ~150-char meta description: who she is, how she ranks, what she does. */
export function artistDescription(a: ArtistSeoInput, lang: string): string {
  const tier = a.calculatedTier || "";
  const tw = tierWords[tier]?.[lang] || tierWords[tier]?.en || "";
  const spec = specialtyLabel(a.specialty, lang);
  const skill = a.skills?.[0] ? cleanSkill(a.skills[0]) : "";

  if (lang === "fr") {
    const parts = [`${a.name}, artiste ${a.rank} ${a.genre} (${a.position}) dans TopGirl / Apex Girl.`];
    if (tier) parts.push(`Tier ${tier}${tw ? ` : ${tw}` : ""}.`);
    if (spec) parts.push(`Spécialité ${spec}${skill ? `, ${skill}` : ""}.`);
    parts.push("Stats, compétences et équipes conseillées.");
    return fit(parts);
  }
  if (lang === "id") {
    const parts = [`${a.name}, artis ${a.rank} ${a.genre} (${a.position}) di TopGirl / Apex Girl.`];
    if (tier) parts.push(`Tier ${tier}${tw ? ` (${tw})` : ""}.`);
    if (spec) parts.push(`Spesialisasi ${spec}${skill ? `, ${skill}` : ""}.`);
    parts.push("Stat, skill, dan tim yang disarankan.");
    return fit(parts);
  }
  const parts = [`${a.name} is a ${a.rank} ${a.genre} ${a.position} in TopGirl / Apex Girl.`];
  if (tier) parts.push(`Tier ${tier}${tw ? ` (${tw})` : ""}.`);
  if (spec) parts.push(`Specialty: ${spec}${skill ? `, ${skill}` : ""}.`);
  parts.push("Stats, skills and recommended teams.");
  return fit(parts);
}

function fit(parts: string[]): string {
  const full = parts.join(" ");
  if (full.length <= 160 || parts.length < 3) return full;
  return parts.slice(0, -1).join(" ");
}

/** Two or three sentences shown at the top of the page: unique on-page text for every artist. */
export function artistIntro(a: ArtistSeoInput, lang: string): string {
  const tier = a.calculatedTier || "";
  const tw = tierWords[tier]?.[lang] || tierWords[tier]?.en || "";
  const spec = specialtyLabel(a.specialty, lang);
  const skills = (a.skills || []).map(cleanSkill);
  const sing = a.singStat || 0;
  const dance = a.danceStat || 0;
  const profile = sing && dance ? (sing > dance ? "sing" : dance > sing ? "dance" : "balanced") : "";
  const group = a.group && a.group !== "No Group" && a.group !== "None" ? a.group : "";
  const season = a.season && a.season !== "Universal" ? a.season : "";

  if (lang === "fr") {
    const s: string[] = [];
    s.push(`${a.name} est une artiste ${a.rank} de genre ${a.genre}, en position ${a.position}${group ? ` au sein de ${group}` : ""}${season ? ` (saison ${season})` : ""}.`);
    if (tier) s.push(`Notre tier list la classe en Tier ${tier}, ${tw}${spec ? ` avec une spécialité ${spec}` : ""}.`);
    if (profile === "sing") s.push("Sa stat Chant dépasse sa stat Danse : un profil offensif.");
    else if (profile === "dance") s.push("Sa stat Danse dépasse sa stat Chant : un profil plutôt défensif.");
    else if (profile === "balanced") s.push("Ses stats Chant et Danse sont équilibrées.");
    if (skills.length) s.push(`Compétences : ${skills.join(" ; ")}.`);
    return s.join(" ");
  }
  if (lang === "id") {
    const s: string[] = [];
    s.push(`${a.name} adalah artis ${a.rank} bergenre ${a.genre} dengan posisi ${a.position}${group ? ` dari ${group}` : ""}${season ? ` (musim ${season})` : ""}.`);
    if (tier) s.push(`Tier list kami menempatkannya di Tier ${tier}, ${tw}${spec ? ` dengan spesialisasi ${spec}` : ""}.`);
    if (profile === "sing") s.push("Stat Sing-nya lebih tinggi dari Dance: profil ofensif.");
    else if (profile === "dance") s.push("Stat Dance-nya lebih tinggi dari Sing: profil lebih defensif.");
    else if (profile === "balanced") s.push("Stat Sing dan Dance-nya seimbang.");
    if (skills.length) s.push(`Skill: ${skills.join("; ")}.`);
    return s.join(" ");
  }
  const s: string[] = [];
  s.push(`${a.name} is a ${a.rank} ${a.genre} artist playing ${a.position}${group ? ` for ${group}` : ""}${season ? ` (${a.season} season)` : ""}.`);
  if (tier) s.push(`Our tier list ranks her Tier ${tier}, ${tw}${spec ? `, with a ${spec} specialty` : ""}.`);
  if (profile === "sing") s.push("Her Sing stat is higher than her Dance stat: an offensive profile.");
  else if (profile === "dance") s.push("Her Dance stat is higher than her Sing stat: a more defensive profile.");
  else if (profile === "balanced") s.push("Her Sing and Dance stats are balanced.");
  if (skills.length) s.push(`Skills: ${skills.join("; ")}.`);
  return s.join(" ");
}
