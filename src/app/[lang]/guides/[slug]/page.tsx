import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getGuideMeta, getGuideTitle, getGuideDescription, getGuideCategory, getGuideSlug, getAllGuideSlugs } from './guide-meta';
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

const faqTemplates: Record<string, { q: string; a: string }[]> = {
  en: [
    { q: "What is the best strategy for this guide?", a: "This guide provides step-by-step instructions and proven strategies to help you succeed in Top Girl/Apex Girl." },
    { q: "Is this guide updated for 2026?", a: "Yes, this guide is regularly updated to reflect the latest game mechanics and events." },
    { q: "Can beginners follow this guide?", a: "Yes, our guides are designed for all skill levels from beginners to advanced players." },
    { q: "Does this work in Idol Company too?", a: "Yes, Top Girl, Apex Girl, and Idol Company are the same game with different regional names." },
  ],
  fr: [
    { q: "Quelle est la meilleure stratégie pour ce guide ?", a: "Ce guide fournit des instructions étape par étape et des stratégies éprouvées pour vous aider à réussir dans Top Girl/Apex Girl." },
    { q: "Ce guide est-il mis à jour pour 2026 ?", a: "Oui, ce guide est régulièrement mis à jour pour refléter les derniers mécanismes et événements du jeu." },
    { q: "Les débutants peuvent-ils suivre ce guide ?", a: "Oui, nos guides sont conçus pour tous les niveaux de compétence." },
    { q: "Cela fonctionne aussi dans Idol Company ?", a: "Oui, Top Girl, Apex Girl et Idol Company sont le même jeu avec des noms régionaux différents." },
  ],
};

const articleAuthor = {
  "@type": "Person",
  "name": "ApexGirl Guide Team",
  "url": BASE_URL,
  "sameAs": [
    "https://twitter.com/ApexGirlGuide"
  ]
};

const today = new Date().toISOString().split('T')[0];

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
  const langSlug = getGuideSlug(guide, lang);
  const canonicalUrl = `${BASE_URL}/${lang}/guides/${langSlug}/`;
  const ogImage = guide.thumbnail
    ? `${BASE_URL}${guide.thumbnail}`
    : `${BASE_URL}/${lang}/opengraph-image`;

  const keywordsBySlug: Record<string, Record<string, string[]>> = {
    'event-adventure-abroad-tokyo': {
      fr: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Idol Company Tokyo', 'Adventure Abroad Tokyo', 'Top Girl aventure Tokyo', 'guide Tokyo Top Girl', 'événement Tokyo Top Girl'],
      en: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Idol Company Tokyo', 'Adventure Abroad Tokyo', 'Top Girl Tokyo adventure', 'Tokyo event Top Girl', 'Top Girl guide Tokyo'],
      de: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Idol Company Tokyo', 'Adventure Abroad Tokyo', 'Top Girl Tokio Abenteuer', 'Tokio Event Top Girl'],
      it: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Idol Company Tokyo', 'Adventure Abroad Tokyo'],
      es: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Idol Company Tokyo', 'Adventure Abroad Tokyo'],
      pt: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Idol Company Tokyo', 'Adventure Abroad Tokyo'],
      pl: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Idol Company Tokyo', 'Adventure Abroad Tokyo'],
      id: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Idol Company Tokyo', 'Adventure Abroad Tokyo'],
      ru: ['Top Girl Tokyo', 'Apex Girl Tokyo', 'Idol Company Tokyo', 'Adventure Abroad Tokyo'],
    },
    'event-ancient-rome': {
      fr: ['Top Girl Roma', 'Apex Girl Roma', 'Idol Company Roma', 'Adventure Abroad Roma', 'Rome antique Top Girl', 'Top Girl Rome', 'événement Roma Top Girl'],
      en: ['Top Girl Roma', 'Apex Girl Roma', 'Idol Company Roma', 'Adventure Abroad Roma', 'Ancient Rome Top Girl', 'Rome event Top Girl'],
      de: ['Top Girl Roma', 'Apex Girl Roma', 'Idol Company Roma', 'Adventure Abroad Roma', 'Antikes Rom Top Girl', 'Rom Event Top Girl'],
      it: ['Top Girl Roma', 'Apex Girl Roma', 'Idol Company Roma', 'Adventure Abroad Roma'],
      es: ['Top Girl Roma', 'Apex Girl Roma', 'Idol Company Roma', 'Adventure Abroad Roma'],
      pt: ['Top Girl Roma', 'Apex Girl Roma', 'Idol Company Roma', 'Adventure Abroad Roma'],
      pl: ['Top Girl Roma', 'Apex Girl Roma', 'Idol Company Roma', 'Adventure Abroad Roma'],
      id: ['Top Girl Roma', 'Apex Girl Roma', 'Idol Company Roma', 'Adventure Abroad Roma'],
      ru: ['Top Girl Roma', 'Apex Girl Roma', 'Idol Company Roma', 'Adventure Abroad Roma'],
    },
    'event-metro-subway': {
      fr: ['Top Girl Metro', 'Apex Girl Metro', 'Idol Company Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro', 'Top Girl métro', 'événement Metro Top Girl'],
      en: ['Top Girl Metro', 'Apex Girl Metro', 'Idol Company Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro', 'Tokyo Metro Top Girl'],
      de: ['Top Girl Metro', 'Apex Girl Metro', 'Idol Company Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro', 'Tokio Metro Top Girl'],
      it: ['Top Girl Metro', 'Apex Girl Metro', 'Idol Company Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
      es: ['Top Girl Metro', 'Apex Girl Metro', 'Idol Company Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
      pt: ['Top Girl Metro', 'Apex Girl Metro', 'Idol Company Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
      pl: ['Top Girl Metro', 'Apex Girl Metro', 'Idol Company Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
      id: ['Top Girl Metro', 'Apex Girl Metro', 'Idol Company Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
      ru: ['Top Girl Metro', 'Apex Girl Metro', 'Idol Company Metro', 'Metro Subway Top Girl', 'Adventure Abroad Metro'],
    },
  };

  const keywords = keywordsBySlug[slug]?.[lang] || keywordsBySlug[slug]?.['en'] || [];

  return {
    title: pageTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        (['fr', 'en', 'de', 'it', 'es', 'pt', 'pl', 'id', 'ru'] as const).map(
          (l) => [l, `${BASE_URL}/${l}/guides/${getGuideSlug(guide, l)}/`]
        )
      ),
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: 'TopGirl Guide',
      type: 'article',
      publishedTime: '2025-01-01T00:00:00Z',
      modifiedTime: today + 'T00:00:00Z',
      authors: ['ApexGirl Guide Team'],
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
  const langSlug = getGuideSlug(guide, lang);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides/' },
    { label: guideTitle, href: `/guides/${langSlug}/` },
  ];

  // Article JSON-LD schema with E-E-A-T signals
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guideTitle,
    "description": getGuideDescription(guide, lang),
    "url": `${BASE_URL}/${lang}/guides/${langSlug}/`,
    "datePublished": "2025-01-01",
    "dateModified": today,
    "inLanguage": lang,
    "author": articleAuthor,
    "publisher": {
      "@type": "Organization",
      "name": "TopGirl Guide",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/assets/logo.png`
      }
    },
    "image": guide.thumbnail
      ? `${BASE_URL}${guide.thumbnail}`
      : `${BASE_URL}/${lang}/opengraph-image`,
  };

  // FAQ schema for rich snippets
  const faqs = faqTemplates[lang] || faqTemplates['en'] || faqTemplates['fr'];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumb items={breadcrumbItems} lang={lang} />
      </div>
      <GuideDetailClient lang={lang} slug={langSlug} guideId={guide.id} />
    </>
  );
}
