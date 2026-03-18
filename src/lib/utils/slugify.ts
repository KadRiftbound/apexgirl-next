/**
 * Converts an artist name to a URL-safe slug.
 * Shared utility — replaces the duplicated inline function in
 * artists/page.tsx, tierlist/page.tsx, and MobileArtistsPage.tsx.
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
