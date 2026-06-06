const fs = require("fs");
const artists = JSON.parse(fs.readFileSync("src/lib/data/artists.json", "utf8"));

const posRole = {
  Center: "lead d'équipe",
  Vocalist: "DPS vocal",
  Dancer: "DPS danse",
  Singer: "rôle spécial",
  Visual: "rôle polyvalent",
};

function analyze(x) {
  const sing = x.singStat || 0;
  const dance = x.danceStat || 0;
  const total = sing + dance;
  const isOffensive = sing > dance;
  const isDefensive = dance > sing;
  const isBalanced = total > 0 && Math.abs(sing - dance) < 3000;

  let t = [];

  if (x.rank === "UR") t.push("UR spéciale.");
  else t.push("SSR.");

  // Stat analysis
  if (total === 0) {
    t.push("Stats de base faibles.");
  } else if (isOffensive) {
    t.push(`Stat Sing (${sing}) > Dance (${dance}) → profil offensif.`);
  } else if (isDefensive) {
    t.push(`Stat Dance (${dance}) > Sing (${sing}) → profil défensif.`);
  } else if (isBalanced) {
    t.push(`Stats équilibrées (${sing}/${dance}).`);
  }

  // Specialty analysis
  const spec = x.specialty || "";
  if (spec === "Augmentation dommage") {
    t.push("Spécialité dégâts offensifs : boost skill + attaque de base.");
  } else if (spec === "Dommage réduction") {
    t.push("Spécialité défensive : réduit les dégâts subis.");
  } else if (spec === "Solo car") {
    t.push("Spécialité solo : augmente la capacité de troupe (fan cap).");
  } else if (spec === "Mixte") {
    t.push("Spécialité mixte : un sort offensif + un sort défensif.");
  } else if (spec === "Rassemblement") {
    t.push("Spécialité rassemblement : boost la capacité de rally.");
  } else if (spec === "Économie") {
    t.push("Spécialité économie : farm d'or et ressources.");
  } else if (spec === "HQ defense") {
    t.push("Spécialité défense de QG : protection de base.");
  } else if (spec === "Vitesse de conduite") {
    t.push("Spécialité vitesse : déplacement plus rapide.");
  }

  // Skills summary
  if (x.skills && x.skills.length) {
    t.push("Compétences : " + x.skills.join(", ") + ".");
  }

  // Tier context
  if (x.calculatedTier) {
    t.push("Classement communauté : Tier " + x.calculatedTier + ".");
  }

  // Position role + genre
  const pos = posRole[x.position] || x.position;
  t.push("Position " + pos + ", genre " + (x.genre || "N/A") + ".");

  // Rank-specific advice
  if (x.rank === "UR") {
    const isStarter =
      x.id <= 9 || [114, 115, 116, 117].includes(x.id);
    if (isStarter) {
      t.push(
        "UR serveur de départ : ne peut pas être améliorée directement, liée à une SSR de votre choix."
      );
    } else {
      t.push(
        "UR Abroad : liée à une SSR de la même région. Ne peut pas être améliorée directement."
      );
    }
  } else if (x.rank === "SSR") {
    const tier = x.calculatedTier || "";
    if (tier === "S" || tier === "S+") {
      t.push("Priorité d'investissement haute.");
    } else if (tier === "A") {
      t.push("Bon investissement polyvalent.");
    } else if (tier === "B" || tier === "C") {
      t.push("Utilisation situationnelle.");
    } else if (tier === "D") {
      t.push("Faible priorité.");
    }
  }

  return t.join(" ");
}

let count = 0;
const updated = artists.map((x) => {
  if (x.rank === "UR" || x.rank === "SSR") {
    x.thoughts = analyze(x);
    count++;
  }
  return x;
});

fs.writeFileSync("src/lib/data/artists.json", JSON.stringify(updated, null, 2), "utf8");
console.log("Generated thoughts for", count, "artists");

// Show samples
const samples = updated
  .filter((x) => x.thoughts)
  .sort(() => Math.random() - 0.5)
  .slice(0, 5);
samples.forEach((x) =>
  console.log("\n--- " + x.name + " (" + x.rank + ", " + x.position + ", " + x.specialty + ", Tier " + x.calculatedTier + ") ---\n" + x.thoughts)
);
