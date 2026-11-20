// Static image loader: no Vercel Image Optimization (it was exhausting the plan quota).
// Artist portraits use a pre-generated 320px thumbnail (scripts/make-thumbs.js) for small
// renders and the 800px original for large ones. Everything else is served as-is.
const ARTISTS = "/assets/images/artists/";

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (src.startsWith(ARTISTS) && !src.startsWith(ARTISTS + "thumb/") && width <= 400) {
    return ARTISTS + "thumb/" + src.slice(ARTISTS.length);
  }
  return src;
}
