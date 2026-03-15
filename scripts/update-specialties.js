const fs = require('fs');
const path = require('path');

const artistsPath = path.join(__dirname, '../src/lib/data/artists.json');
const artists = JSON.parse(fs.readFileSync(artistsPath, 'utf8'));

function hasSkill(skills, patterns) {
  return skills.some(s => patterns.some(p => s.toLowerCase().includes(p.toLowerCase())));
}

let changes = 0;

for (const artist of artists) {
  const skills = artist.skills || [];
  const oldSpecialty = artist.specialty || '';
  let newSpecialty = oldSpecialty;

  const hasRallyFanCap = hasSkill(skills, ['rally fan cap', 'rassemblement capacity']);
  const hasFanCap = hasSkill(skills, ['fan cap']);
  const hasSkillReduction = hasSkill(skills, ['skill damage taken', 'skill damage reduction']);
  const hasBasicReduction = hasSkill(skills, ['basic attack damage taken', 'basic damage reduction']);
  const hasSkillDamage = hasSkill(skills, ['skill damage', 'skill %']);
  const hasBasicDamage = hasSkill(skills, ['basic attack damage dealt', 'basic attack damage']);
  const hasPlayerDamage = hasSkill(skills, ['player damage', 'damage to player']);

  const hasAnyDamage = hasSkillDamage || hasBasicDamage || hasPlayerDamage;
  const hasAnyReduction = hasSkillReduction || hasBasicReduction;
  const hasDriveSpeed = hasSkill(skills, ['drive speed', 'drive speed increase']);

  if (hasDriveSpeed) {
    newSpecialty = 'Vitesse de conduite';
  } else if (hasRallyFanCap) {
    newSpecialty = 'Rassemblement';
  } else if (hasFanCap && !hasRallyFanCap) {
    newSpecialty = 'Solo car';
  } else if (hasSkillReduction && hasBasicReduction) {
    newSpecialty = 'Dommage réduction';
  } else if (hasAnyReduction && hasAnyDamage) {
    newSpecialty = 'Mixte';
  } else if (hasAnyDamage) {
    newSpecialty = 'Augmentation dommage';
  }

  if (newSpecialty !== oldSpecialty) {
    console.log(`${artist.name}: "${oldSpecialty}" → "${newSpecialty}"`);
    console.log(`  Skills: ${skills.join(', ')}`);
    artist.specialty = newSpecialty;
    changes++;
  }
}

fs.writeFileSync(artistsPath, JSON.stringify(artists, null, 2), 'utf8');
console.log(`\n✓ Done! ${changes} artist(s) updated.`);
