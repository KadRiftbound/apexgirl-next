import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getGuideMeta, getGuideTitle, getGuideDescription, getGuideCategory } from './guide-meta';
import GuideDetailClient from './GuideDetailClient';
import { Breadcrumb } from '@/components/Breadcrumb';

const BASE_URL = 'https://apexgirlguide.com';

const titleTemplates: Record<string, (title: string, cat: string) => string> = {
  fr: (title, cat) => `${title} — TopGirl Guide | ${cat}`,
  en: (title, cat) => `${title} — TopGirl Guide | ${cat}`,
  de: (title, cat) => `${title} — TopGirl Guide | ${cat}`,
  it: (title, cat) => `${title} — Guida TopGirl | ${cat}`,
  es: (title, cat) => `${title} — Guía TopGirl | ${cat}`,
  pt: (title, cat) => `${title} — Guia TopGirl | ${cat}`,
  pl: (title, cat) => `${title} — Poradnik TopGirl | ${cat}`,
  id: (title, cat) => `${title} — Panduan TopGirl | ${cat}`,
  ru: (title, cat) => `${title} — Гайд TopGirl | ${cat}`,
};

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; slug: string }> }
): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = getGuideMeta(slug);

  if (!guide) {
    return {
      title: 'Guide not found | TopGirl Guide',
      robots: { index: false, follow: false },
    };
  }

  const title = getGuideTitle(guide, lang);
  const description = getGuideDescription(guide, lang);
  const category = getGuideCategory(guide, lang);
  const pageTitle = (titleTemplates[lang] || titleTemplates.en)(title, category);
  const canonicalUrl = `${BASE_URL}/${lang}/guides/${slug}/`;
  const ogImage = guide.thumbnail
    ? `${BASE_URL}${guide.thumbnail}`
    : `${BASE_URL}/${lang}/opengraph-image`;

  const keywordsBySlug: Record<string, Record<string, string[]>> = {
    'event-adventure-abroad-tokyo': {
      fr: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Adventure Abroad Tokyo', 'Top Girl aventure Tokyo', 'guide Tokyo Top Girl', 'événement Tokyo Top Girl'],
      en: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Adventure Abroad Tokyo', 'Top Girl Tokyo adventure', 'Tokyo event Top Girl', 'Top Girl guide Tokyo'],
      de: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Adventure Abroad Tokyo', 'Top Girl Tokio Abenteuer', 'Tokio Event Top Girl'],
      it: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Adventure Abroad Tokyo'],
      es: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Adventure Abroad Tokyo'],
      pt: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Adventure Abroad Tokyo'],
      pl: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Adventure Abroad Tokyo'],
      id: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Adventure Abroad Tokyo'],
      ru: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Adventure Abroad Tokyo'],
    },
    'event-ancient-rome': {
      fr: ['Top Girl Roma', 'Apex Girl Roma', 'Adventure Abroad Roma', 'Rome antique Top Girl', 'Top Girl Rome', 'événement Roma Top Girl'],
      en: ['Top Girl Roma', 'Apex Girl Roma', 'Adventure Abroad Roma', 'Ancient Rome Top Girl', 'Rome event Top Girl'],
      de: ['Top Girl Roma', 'Apex Girl Roma', 'Adventure Abroad Roma', 'Antikes Rom Top Girl', 'Rom Event Top Girl'],
      it: ['Top Girl Roma', 'Apex Girl Roma', 'Adventure Abroad Roma'],
      es: ['Top Girl Roma', 'Apex Girl Roma', 'Adventure Abroad Roma'],
      pt: ['Top Girl Roma', 'Apex Girl Roma', 'Adventure Abroad Roma'],
      pl: ['Top Girl Roma', 'Apex Girl Roma', 'Adventure Abroad Roma'],
      id: ['Top Girl Roma', 'Apex Girl Roma', 'Adventure Abroad Roma'],
      ru: ['Top Girl Roma', 'Apex Girl Roma', 'Adventure Abroad Roma'],
    },
    'event-metro-subway': {
      fr: ['Top Girl Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro', 'Top Girl métro', 'événement Metro Top Girl'],
      en: ['Top Girl Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro', 'Tokyo Metro Top Girl'],
      de: ['Top Girl Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro', 'Tokio Metro Top Girl'],
      it: ['Top Girl Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
      es: ['Top Girl Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
      pt: ['Top Girl Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
      pl: ['Top Girl Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
      id: ['Top Girl Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
      ru: ['Top Girl Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
    },
  };

  const keywords = keywordsBySlug[slug]?.[lang] || keywordsBySlug[slug]?.['en'] || [];

  return {
    title: pageTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${BASE_URL}/fr/guides/${slug}/`,
        en: `${BASE_URL}/en/guides/${slug}/`,
        de: `${BASE_URL}/de/guides/${slug}/`,
        it: `${BASE_URL}/it/guides/${slug}/`,
        es: `${BASE_URL}/es/guides/${slug}/`,
        pt: `${BASE_URL}/pt/guides/${slug}/`,
        pl: `${BASE_URL}/pl/guides/${slug}/`,
        id: `${BASE_URL}/id/guides/${slug}/`,
        ru: `${BASE_URL}/ru/guides/${slug}/`,
        'x-default': `${BASE_URL}/en/guides/${slug}/`,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: 'TopGirl Guide',
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function GuideDetailPage(
  { params }: { params: Promise<{ lang: string; slug: string }> }
) {
  const { lang, slug } = await params;
  const guide = getGuideMeta(slug);

  if (!guide) {
    notFound();
  }

  const guideTitle = getGuideTitle(guide, lang);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: guideTitle, href: `/guides/${slug}/` },
  ];

  // Article JSON-LD schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guideTitle,
    "description": getGuideDescription(guide, lang),
    "url": `${BASE_URL}/${lang}/guides/${slug}/`,
    "datePublished": "2025-01-01",
    "dateModified": "2026-03-19",
    "inLanguage": lang,
    "author": {
      "@type": "Organization",
      "name": "TopGirl Guide",
      "url": BASE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "TopGirl Guide",
      "url": BASE_URL,
    },
    "image": guide.thumbnail
      ? `${BASE_URL}${guide.thumbnail}`
      : `${BASE_URL}/${lang}/opengraph-image`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumb items={breadcrumbItems} lang={lang} />
      </div>
      <GuideDetailClient lang={lang} slug={slug} />
    </>
  );
}
