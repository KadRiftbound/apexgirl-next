// Pre-generate small artist thumbnails so pages never need Vercel Image Optimization.
// Output: public/assets/images/artists/thumb/<name>.webp (320px wide).
// Run after adding new artist images: node scripts/make-thumbs.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = "public/assets/images/artists";
const OUT = path.join(SRC, "thumb");
const WIDTH = 320;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  let n = 0, bytes = 0;
  for (const f of fs.readdirSync(SRC)) {
    if (!/\.(webp|jpe?g|png)$/i.test(f)) continue;
    const out = path.join(OUT, f.replace(/\.(jpe?g|png)$/i, ".webp"));
    const info = await sharp(path.join(SRC, f))
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out);
    n++; bytes += info.size;
  }
  console.log(`${n} thumbnails, ${(bytes / 1024).toFixed(0)} KB total`);
})();
