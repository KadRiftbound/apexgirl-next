import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import artistsData from '@/lib/data/artists.json';
import ArtistDetailClient from './ArtistDetailClient';
import { Breadcrumb } from '@/components/Breadcrumb';
import { artistDescription } from '@/lib/seo/artistSeo';

const BASE_URL = 'https://apexgirlguide.com';

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

type ArtistData = {
  name: string; rank: string; position: string; genre: string; group?: string; season?: string;
  skills?: string[]; singStat?: number; danceStat?: number;
  specialty?: string; calculatedTier?: string; description?: string;
  thoughts?: string; image?: string;
};

const LANGS = ['fr', 'en', 'id'] as const;

// Every artist page is prerendered for every language.
export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    (artistsData as ArtistData[]).map((a) => ({ lang, slug: slugify(a.name) }))
  );
}

const titleByLang: Record<string, (a: ArtistData) => string> = {
  fr: a => `${a.name} — Guide TopGirl | ${a.rank} ${a.genre}`,
  en: a => `${a.name} — TopGirl Artist Guide | ${a.rank} ${a.genre}`,
  de: a => `${a.name} — TopGirl Künstler-Guide | ${a.rank} ${a.genre}`,
  it: a => `${a.name} — Guida TopGirl | ${a.rank} ${a.genre}`,
  es: a => `${a.name} — Guía TopGirl | ${a.rank} ${a.genre}`,
  pt: a => `${a.name} — Guia TopGirl | ${a.rank} ${a.genre}`,
  pl: a => `${a.name} — Poradnik TopGirl | ${a.rank} ${a.genre}`,
  id: a => `${a.name} — Panduan TopGirl | ${a.rank} ${a.genre}`,
  ru: a => `${a.name} — Гайд TopGirl | ${a.rank} ${a.genre}`,
};

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; slug: string }> }
): Promise<Metadata> {
  const { lang, slug } = await params;
  const artist = (artistsData as ArtistData[]).find(a => slugify(a.name) === slug);

  if (!artist) {
    return {
      title: 'Artist not found | TopGirl Guide',
      robots: { index: false, follow: false },
    };
  }

  const title = (titleByLang[lang] || titleByLang.en)(artist);
  const description = artistDescription(artist, lang);
  const canonicalUrl = `${BASE_URL}/${lang}/artist/${slug}/`;
  const ogImage = artist.image
    ? `${BASE_URL}/assets/images/artists/${artist.image}`
    : `${BASE_URL}/assets/og-image.png`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${BASE_URL}/fr/artist/${slug}/`,
        en: `${BASE_URL}/en/artist/${slug}/`,
        id: `${BASE_URL}/id/artist/${slug}/`,
        'x-default': `${BASE_URL}/en/artist/${slug}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'TopGirl Guide',
      images: [{ url: ogImage, width: 1200, height: 630, alt: artist.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArtistDetailPage(
  { params }: { params: Promise<{ lang: string; slug: string }> }
) {
  const { lang, slug } = await params;
  const artist = (artistsData as ArtistData[]).find(a => slugify(a.name) === slug);

  if (!artist) notFound();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Artists', href: '/teambuilder/' },
    { label: artist.name, href: `/artist/${slug}/` },
  ];

  return (
    <>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumb items={breadcrumbItems} lang={lang} />
      </div>
      <ArtistDetailClient lang={lang} slug={slug} />
    </>
  );
}
