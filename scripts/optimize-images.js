// Convert public/assets/images/{artists,bgs,guides} to WebP, resized, and delete originals.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const JOBS = [
  { dir: "public/assets/images/artists", maxWidth: 800, quality: 80 },
  { dir: "public/assets/images/guides", maxWidth: 1200, quality: 80 },
  { dir: "public/assets/images/bgs", maxWidth: 1920, quality: 78 },
];

(async () => {
  let before = 0, after = 0;
  const dims = {};
  for (const job of JOBS) {
    for (const f of fs.readdirSync(job.dir)) {
      if (!/\.(jpe?g|png)$/i.test(f)) continue;
      const src = path.join(job.dir, f);
      const out = path.join(job.dir, f.replace(/\.(jpe?g|png)$/i, ".webp"));
      before += fs.statSync(src).size;
      const info = await sharp(src)
        .rotate()
        .resize({ width: job.maxWidth, withoutEnlargement: true })
        .webp({ quality: job.quality })
        .toFile(out);
      after += info.size;
      dims[path.relative("public", out).split(path.sep).join("/")] = [info.width, info.height];
      fs.unlinkSync(src);
    }
  }
  fs.writeFileSync("scripts/image-dims.json", JSON.stringify(dims, null, 1));
  console.log(`before ${(before / 1e6).toFixed(1)} MB -> after ${(after / 1e6).toFixed(1)} MB`);
})();
