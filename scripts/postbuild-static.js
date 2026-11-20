// After the static export: give the share images a .png name so any static host serves them as images.
const fs = require("fs");
for (const lang of ["fr", "en", "id"]) {
  const src = `out/${lang}/opengraph-image`;
  if (fs.existsSync(src)) fs.copyFileSync(src, `${src}.png`);
  else { console.error(`missing ${src}`); process.exit(1); }
}
console.log("share images copied to opengraph-image.png");
