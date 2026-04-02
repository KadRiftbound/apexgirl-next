import { MetadataRoute } from 'next';

const BASE_URL = 'https://apexgirlguide.com';
const LANGUAGES = ['fr', 'en', 'de', 'it', 'es', 'pt', 'pl', 'id', 'ru'];

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

// All guide slugs (from guides.json)
const GUIDES = [
  'ancient-rome-event',
  'guide-des-batiments-de-la-ville',
  'guide-des-achats-integres',
  'guide-du-chamber-territory',
  'guide-city-supremacy',
  'guide-du-systeme-de-collection',
  'guide-echo-death-match',
  'guide-de-l-equipe-edm',
  'comprendre-la-structure-du-jeu-top-girl',
  'type-classique-early-game-debutant',
  'guide-fishing-event',
  'guide-grammy-award',
  'guide-du-group-shop',
  'type-special',
  'guide-construction-d-equipe-debut-de-jeu',
  'guide-construction-d-equipe-fin-de-jeu',
  'guide-des-equipements',
  'guide-de-planification-long-terme',
  'guide-peak',
  'metro-guide',
  'guide-muse-event',
  'guide-du-systeme-de-tier',
  'guide-radio-battle',
  'guide-de-l-equipe-rnb',
  'ce-guide-n-inclus-pas-les-artistes-apres-roma-3',
  'type-classique-mid-game-avance',
  'guide-des-attaques-et-des-rassemblements',
  'guide-tokyo',
  'guide-ultimate-ceo',
  'ultimate-group-guide',
  'guide-group-battle',
  'guide-du-systeme-vip',
  'roulette-event-guide',
  'tips-and-tricks-guide',
  'how-to-unlock-all-artists',
];

// Pages shared by all languages
const COMMON_PAGES = ['', 'teambuilder', 'tierlist', 'guides', 'tools', 'codes', 'contact', 'cookie-settings'];

// Legal pages differ by language
const LEGAL_PAGES_FR  = ['mentions-legales', 'confidentialite'];
const LEGAL_PAGES_OTHER = ['legal-notice', 'privacy-policy'];

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

    // Guide pages (same slug across languages - add hreflang alternates)
    for (const guide of GUIDES) {
      urls.push({
        url: `${BASE_URL}/${lang}/guides/${guide}/`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LANGUAGES.map((l) => [l, `${BASE_URL}/${l}/guides/${guide}/`])
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
