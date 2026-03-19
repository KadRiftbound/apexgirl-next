import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getGuideMeta, getGuideTitle, getGuideDescription, getGuideCategory } from './guide-meta';
import GuideDetailClient from './GuideDetailClient';

const BASE_URL = 'https://apexgirlguide.com';

const titleTemplates: Record<string, (title: string, cat: string) => string> = {
  fr: (title, cat) => `${title} — TopGirl Guide | ${cat}`,
  en: (title, cat) => `${title} — TopGirl Guide | ${cat}`,
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

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${BASE_URL}/fr/guides/${slug}/`,
        en: `${BASE_URL}/en/guides/${slug}/`,
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

  // Article JSON-LD schema
  const articleSchema = guide ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": getGuideTitle(guide, lang),
    "description": getGuideDescription(guide, lang),
    "url": `${BASE_URL}/${lang}/guides/${slug}/`,
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": lang,
    "publisher": {
      "@type": "Organization",
      "name": "TopGirl Guide",
      "url": BASE_URL,
    },
    ...(guide.thumbnail && {
      "image": `${BASE_URL}${guide.thumbnail}`,
    }),
  } : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <GuideDetailClient lang={lang} slug={slug} />
    </>
  );
}
