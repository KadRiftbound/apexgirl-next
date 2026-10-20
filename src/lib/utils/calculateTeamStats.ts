import type { Artist } from "@/lib/types/artist";

export type TeamStats = {
  skillDamage: number;
  skillDamageRaw: number;
  basicAttackPercent: number;
  /** "Damage to player" %: already included in skillDamage and basicAttackPercent. */
  playerDamage: number;
  attackResist: number;
  skillResist: number;
  passive: number;
  fanCapacity: number;
  rallyCapacity: number;
  genreCounts: Record<string, number>;
};

/**
 * Calculates combined stats for a team of artists.
 */
export function calculateTeamStats(team: Artist[]): TeamStats {
  let skillDamage = 0,
    skillDamageRaw = 0,
    basicAttackPercent = 0,
    playerDamage = 0,
    attackResist = 0,
    skillResist = 0,
    passive = 0,
    fanCapacity = 0,
    rallyCapacity = 0;

  team.forEach((artist) => {
    passive += 200;

    [
      ...(artist.skillCategories?.dps || []),
      ...(artist.skillCategories?.offensive || []),
    ].forEach((skill) => {
      const lower = skill.toLowerCase();
      const match = skill.match(/(\d+)\s*Damage/);
      if (match && !lower.includes("%")) skillDamageRaw += parseInt(match[1]);

      const pctMatch = skill.match(/(\d+)%/);
      if (pctMatch) {
        const val = parseInt(pctMatch[1]);
        if (lower.includes("damage to player") || lower.includes("player damage")) {
          playerDamage += val;
          skillDamage += val;
          basicAttackPercent += val;
        } else if (
          lower.includes("skill damage") &&
          !lower.includes("reduction") &&
          !lower.includes("taken")
        ) {
          skillDamage += val;
        } else if (
          (lower.includes("basic attack") || lower.includes("normal attack")) &&
          !lower.includes("taken")
        ) {
          basicAttackPercent += val;
        }
      }
    });

    (artist.skillCategories?.defense || []).forEach((skill) => {
      const match = skill.match(/(\d+)%/);
      if (match) {
        const val = parseInt(match[1]);
        const lower = skill.toLowerCase();
        if (lower.includes("skill damage reduction")) skillResist += val;
        else if (lower.includes("damage reduction")) attackResist += val;
      }
    });

    (artist.skillCategories?.hp || []).forEach((skill) => {
      const match = skill.match(/(\d+)%/);
      if (match) {
        const val = parseInt(match[1]);
        const lower = skill.toLowerCase();
        if (lower.includes("fan capacity") && lower.includes("rally")) rallyCapacity += val;
        else if (lower.includes("fan capacity")) fanCapacity += val;
      }
    });
  });

  const genreCounts: Record<string, number> = {};
  team.forEach((artist) => {
    const g = artist.genre || "Unknown";
    genreCounts[g] = (genreCounts[g] || 0) + 1;
  });

  return {
    skillDamage,
    skillDamageRaw,
    basicAttackPercent,
    playerDamage,
    attackResist,
    skillResist,
    passive,
    fanCapacity,
    rallyCapacity,
    genreCounts,
  };
}
