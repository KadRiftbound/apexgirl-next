import { MetadataRoute } from 'next';

const BASE_URL = 'https://apexgirlguide.com';
const LANGUAGES = ['fr', 'en', 'it', 'es', 'pt', 'pl', 'id', 'ru'];

const GUIDES = [
  'equipment', 'team-builder', 'recommended-teams', 'leveling-ssr', 'blueprints',
  'hq-upgrade', 'vehicle-system', 'gold-equipment', 'purple-equipment',
  'event-ancient-rome', 'event-radio-battle', 'event-grammy', 'event-ultimate-ceo',
  'event-echo-death-match', 'event-chamber-territory', 'event-cleanup-party',
  'event-metro-subway', 'event-vs-group', 'event-fishing',
  'world-building', 'vip-level', 'ceo-coins', 'alliance-management', 'peak-level', 'group-shop'
];

const PAGES = [
  '', 'artists', 'tierlist', 'events', 'guides', 'tools', 'codes',
  'contact', 'privacy-policy', 'legal-notice', 'confidentialite', 'cookie-settings'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0];
  
  const urls: MetadataRoute.Sitemap = [];

  for (const lang of LANGUAGES) {
    for (const page of PAGES) {
      const path = page === '' ? `/${lang}/` : `/${lang}/${page}/`;
      const isHome = page === '';
      
      urls.push({
        url: `${BASE_URL}${path}`,
        lastModified: today,
        changeFrequency: isHome ? 'daily' : page === 'tierlist' ? 'daily' : 'weekly',
        priority: isHome ? 1.0 : page === 'artists' || page === 'events' || page === 'guides' ? 0.9 : 0.8,
      });
    }

    for (const guide of GUIDES) {
      urls.push({
        url: `${BASE_URL}/${lang}/guides/${guide}/`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return urls;
}
