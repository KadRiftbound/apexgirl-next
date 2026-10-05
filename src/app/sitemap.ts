import { MetadataRoute } from 'next';
import guidesData from '@/lib/data/guides.json';

const BASE_URL = 'https://apexgirlguide.com';
const LANGUAGES = ['fr', 'en', 'id'] as const;

import artistsData from '@/lib/data/artists.json';
const slugifyArtist = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
// Artist slugs derived from the data so new artists are never missing.
const ARTIST_SLUGS = (artistsData as { name: string }[]).map((a) => slugifyArtist(a.name));

// Pages shared by all languages
const COMMON_PAGES = [
  '',
  'teambuilder',
  'tierlist',
  'guides',
  'tools',
  'codes',
  'contact',
  'cookie-settings',
  'about',
  'methodology',
  'editorial-policy',
  'corrections',
  'advertising-disclosure',
  'glossary',
];

// Legal pages differ by language
const LEGAL_PAGES_FR  = ['mentions-legales', 'confidentialite'];
const LEGAL_PAGES_OTHER = ['legal-notice', 'privacy-policy'];

type GuideSlug = {
  fr?: string;
  en?: string;
  it?: string;
  es?: string;
  pt?: string;
  pl?: string;
  id?: string;
  ru?: string;
  de?: string;
};

type Guide = {
  id: string;
  slugs?: GuideSlug;
};

const guides = guidesData as Guide[];

function getGuideSlug(guide: Guide, lang: string): string {
  const slug = guide.slugs as Record<string, string | undefined>;
  return slug?.[lang] || guide.id;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0];
  const urls: MetadataRoute.Sitemap = [];

  for (const lang of LANGUAGES) {
    // Common pages (same URL structure across languages - add hreflang alternates)
    for (const page of COMMON_PAGES) {
      const path = page === '' ? `/${lang}/` : `/${lang}/${page}/`;
      const isHome = page === '';
      urls.push({
        url: `${BASE_URL}${path}`,
        lastModified: today,
        changeFrequency: isHome ? 'daily' : page === 'tierlist' || page === 'codes' ? 'daily' : 'weekly',
        priority: isHome ? 1.0 : ['teambuilder', 'guides', 'tierlist'].includes(page) ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LANGUAGES.map((l) => {
              const langPath = page === '' ? `/${l}/` : `/${l}/${page}/`;
              return [l, `${BASE_URL}${langPath}`];
            })
          ),
        },
      });
    }

    // Legal pages (language-specific - no alternates since paths differ)
    const legalPages = lang === 'fr' ? LEGAL_PAGES_FR : LEGAL_PAGES_OTHER;
    for (const page of legalPages) {
      urls.push({
        url: `${BASE_URL}/${lang}/${page}/`,
        lastModified: today,
        changeFrequency: 'yearly',
        priority: 0.2,
      });
    }

    // Guide pages (language-specific slugs)
    for (const guide of guides) {
      const langSlug = getGuideSlug(guide, lang);
      urls.push({
        url: `${BASE_URL}/${lang}/guides/${langSlug}/`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LANGUAGES.map((l) => [l, `${BASE_URL}/${l}/guides/${getGuideSlug(guide, l)}/`])
          ),
        },
      });
    }

    // Individual artist pages (same slug across languages - add hreflang alternates)
    for (const slug of ARTIST_SLUGS) {
      urls.push({
        url: `${BASE_URL}/${lang}/artist/${slug}/`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            LANGUAGES.map((l) => [l, `${BASE_URL}/${l}/artist/${slug}/`])
          ),
        },
      });
    }
  }

  return urls;
}
