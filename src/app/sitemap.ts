import { MetadataRoute } from 'next';

const BASE_URL = 'https://apexgirlguide.com';
const LANGUAGES = ['fr', 'en', 'it', 'es', 'pt', 'pl', 'id', 'ru'];

// All artist slugs (117 artists)
const ARTIST_SLUGS = [
  "alexandra","genevieve","isadora","josephine","marguerite","ayuni","bunga","putri",
  "alice","antonia","anya","ariadne","audrey","aurelia","aurora","avery","aya","ayaka",
  "brooklyn","calliope","chizuru","cindy","claire","claudius","cornelia","daphne","dewi",
  "eirene","eri","everly","flora","haruki","hestia","hikari","isla","julia","kasha",
  "kelly","kesnia","kokoro","leilani","lestari","margot","marina","megan","melissa",
  "mio","miyuki","moana","nastassja","ningsih","noora","nova","octavia","paisley",
  "ratih","riku","rin","rosemary","ruby","sari","savannah","sienna","skylar","sora",
  "talia","valentina","vivienne","xenia","yumeno","yuuko","zendayah","bella","caroline",
  "longkui","monica","abigail","angelina","aria","chloe","eleanor","ella","emily",
  "evelyn","grace","hailey","hazel","lily","luna","madison","natalie","penelope",
  "samantha","sarah","scarlett","stella","victoria","violet","charlotte","harper",
  "olivia","isabella","ava","emma","sophia","mia","annabelle","nike","lysistrata",
  "selene","sloane","kendell","valerie","anastasia","beatrice","elizabeth","gabriella",
];

// All guide slugs
const GUIDES = [
  'structure-du-jeu',
  'equipment', 'construction-equipe-debut', 'construction-equipe-fin',
  'team-builder', 'recommended-teams', 'leveling-ssr', 'blueprints',
  'hq-upgrade', 'vehicle-system', 'gold-equipment', 'purple-equipment',
  'event-ancient-rome', 'event-radio-battle', 'event-grammy', 'event-ultimate-ceo',
  'event-echo-death-match', 'event-chamber-territory', 'event-cleanup-party',
  'event-metro-subway', 'event-muse', 'event-vs-group', 'event-fishing',
  'world-building', 'vip-level', 'ceo-coins', 'alliance-management',
  'peak-level', 'group-shop',
];

// Pages shared by all languages
const COMMON_PAGES = ['', 'artists', 'tierlist', 'guides', 'tools', 'codes', 'contact', 'cookie-settings'];

// Legal pages differ by language
const LEGAL_PAGES_FR  = ['mentions-legales', 'confidentialite'];
const LEGAL_PAGES_OTHER = ['legal-notice', 'privacy-policy'];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0];
  const urls: MetadataRoute.Sitemap = [];

  for (const lang of LANGUAGES) {
    // Common pages
    for (const page of COMMON_PAGES) {
      const path = page === '' ? `/${lang}/` : `/${lang}/${page}/`;
      const isHome = page === '';
      urls.push({
        url: `${BASE_URL}${path}`,
        lastModified: today,
        changeFrequency: isHome ? 'daily' : page === 'tierlist' || page === 'codes' ? 'daily' : 'weekly',
        priority: isHome ? 1.0 : ['artists', 'guides', 'tierlist'].includes(page) ? 0.9 : 0.8,
      });
    }

    // Legal pages (language-specific)
    const legalPages = lang === 'fr' ? LEGAL_PAGES_FR : LEGAL_PAGES_OTHER;
    for (const page of legalPages) {
      urls.push({
        url: `${BASE_URL}/${lang}/${page}/`,
        lastModified: today,
        changeFrequency: 'yearly',
        priority: 0.2,
      });
    }

    // Guide pages
    for (const guide of GUIDES) {
      urls.push({
        url: `${BASE_URL}/${lang}/guides/${guide}/`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    // Individual artist pages
    for (const slug of ARTIST_SLUGS) {
      urls.push({
        url: `${BASE_URL}/${lang}/artist/${slug}/`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return urls;
}
