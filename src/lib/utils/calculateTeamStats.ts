import type { Artist } from "@/lib/types/artist";

export type TeamStats = {
  skillDamage: number;
  skillDamageRaw: number;
  basicAttackPercent: number;
  attackResist: number;
  skillResist: number;
  passive: number;
  fanCapacity: number;
  rallyCapacity: number;
  genreCounts: Record<string, number>;
};

/**
 * Calculates combined stats for a team of artists.
 * Replaces the three duplicate useMemo blocks in artists/page.tsx.
 */
export function calculateTeamStats(team: Artist[]): TeamStats {
  let skillDamage = 0,
    skillDamageRaw = 0,
    basicAttackPercent = 0,
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
      const match = skill.match(/(\d+)\s*Damage/);
      if (match && !skill.toLowerCase().includes("%"))
        skillDamageRaw += parseInt(match[1]);

      const pctMatch = skill.match(/(\d+)%/);
      if (pctMatch) {
        const val = parseInt(pctMatch[1]);
        if (
          skill.toLowerCase().includes("damage to player") ||
          skill.toLowerCase().includes("player damage")
        ) {
          skillDamage += val;
          basicAttackPercent += val;
        } else if (
          skill.toLowerCase().includes("skill damage") &&
          !skill.toLowerCase().includes("reduction") &&
          !skill.toLowerCase().includes("taken")
        ) {
          skillDamage += val;
        } else if (
          skill.toLowerCase().includes("basic attack") &&
          !skill.toLowerCase().includes("taken")
        ) {
          basicAttackPercent += val;
        }
      }
    });

    [...(artist.skillCategories?.defense || [])].forEach((skill) => {
      const match = skill.match(/(\d+)%/);
      if (match) {
        const val = parseInt(match[1]);
        if (skill.toLowerCase().includes("skill damage reduction"))
          skillResist += val;
        else if (skill.toLowerCase().includes("damage reduction"))
          attackResist += val;
      }
    });

    [...(artist.skillCategories?.hp || [])].forEach((skill) => {
      const match = skill.match(/(\d+)%/);
      if (match) {
        const val = parseInt(match[1]);
        if (
          skill.toLowerCase().includes("fan capacity") &&
          skill.toLowerCase().includes("rally")
        )
          rallyCapacity += val;
        else if (skill.toLowerCase().includes("fan capacity"))
          fanCapacity += val;
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
    attackResist,
    skillResist,
    passive,
    fanCapacity,
    rallyCapacity,
    genreCounts,
  };
}
