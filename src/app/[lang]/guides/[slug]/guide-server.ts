// Server-only helpers: build the minimal payload a guide page needs.
import fs from "fs";
import path from "path";
import guidesData from "@/lib/data/guides.json";
import artistsData from "@/lib/data/artists.json";
import { slugify } from "@/lib/utils/slugify";

const LANG_SUFFIX = /_(fr|en|it|es|pt|pl|id|ru|de)$/;

const glossaryFileMap: Record<string, string> = {
  fr: "glossaire.txt",
  en: "glossary.txt",
  it: "glossario.txt",
  es: "glosario.txt",
  pt: "glossario_pt.txt",
  pl: "glosariusz.txt",
  id: "glosarium.txt",
  ru: "glossariy.txt",
  de: "glossar.txt",
};

/** Keep base keys plus the `_lang` variants; drop every other language. */
export function pruneToLang<T extends Record<string, unknown>>(obj: T, lang: string): T {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const m = key.match(LANG_SUFFIX);
    if (!m || m[1] === lang) out[key] = value;
  }
  return out as T;
}

const LITE_KEYS = ["id", "slugs", "title", "icon", "color", "description"];

export function toGuideLite(guide: Record<string, unknown>, lang: string) {
  const out: Record<string, unknown> = {};
  for (const key of LITE_KEYS) if (key in guide) out[key] = guide[key];
  if (`title_${lang}` in guide) out[`title_${lang}`] = guide[`title_${lang}`];
  if (`description_${lang}` in guide) out[`description_${lang}`] = guide[`description_${lang}`];
  return out;
}

export function readGlossary(lang: string): string {
  const candidates = [glossaryFileMap[lang], "glossary.txt"].filter(Boolean) as string[];
  for (const file of candidates) {
    try {
      return fs.readFileSync(path.join(process.cwd(), "public", file), "utf8");
    } catch {
      /* try next */
    }
  }
  return "";
}

const artistsByName = new Map(
  (artistsData as { name: string }[]).map((a) => [slugify(a.name), a.name])
);

export function buildGuidePayload(guideId: string, lang: string) {
  const all = guidesData as unknown as Record<string, unknown>[];
  const full = all.find((g) => g.id === guideId);
  if (!full) return null;

  const relatedIds = (full.relatedGuides as string[] | undefined) || [];
  const relatedGuides = relatedIds
    .map((id) => all.find((g) => g.id === id))
    .filter(Boolean)
    .map((g) => toGuideLite(g as Record<string, unknown>, lang));

  const otherGuides = all
    .filter((g) => g.id !== guideId)
    .slice(0, 5)
    .map((g) => toGuideLite(g, lang));

  const relatedArtists = ((full.relatedArtists as string[] | undefined) || []).map((slug) => ({
    slug,
    name: artistsByName.get(slug) || slug,
  }));

  return {
    guide: pruneToLang(full, lang),
    relatedGuides,
    otherGuides,
    relatedArtists,
    glossaryText: readGlossary(lang),
  };
}
