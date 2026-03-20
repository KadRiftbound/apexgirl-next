import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import artistsData from '@/lib/data/artists.json';
import ArtistDetailClient from './ArtistDetailClient';

const BASE_URL = 'https://apexgirlguide.com';

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

type ArtistData = {
  name: string; rank: string; position: string; genre: string;
  specialty?: string; calculatedTier?: string; description?: string;
  thoughts?: string; image?: string;
};

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

const descByLang: Record<string, (a: ArtistData) => string> = {
  fr: a => a.description || `${a.name} est une artiste ${a.rank} ${a.genre} (${a.position}) dans TopGirl/ApexGirl. Spécialité : ${a.specialty || 'N/A'}. Tier : ${a.calculatedTier || 'N/A'}.`,
  en: a => a.description || `${a.name} is a ${a.rank} ${a.genre} ${a.position} in TopGirl/ApexGirl. Specialty: ${a.specialty || 'N/A'}. Tier: ${a.calculatedTier || 'N/A'}.`,
  de: a => a.description || `${a.name} ist eine ${a.rank} ${a.genre} ${a.position} in TopGirl/ApexGirl. Spezialität: ${a.specialty || 'N/A'}. Tier: ${a.calculatedTier || 'N/A'}.`,
  it: a => a.description || `${a.name} è una artista ${a.rank} ${a.genre} (${a.position}) in TopGirl/ApexGirl. Specialità: ${a.specialty || 'N/A'}. Tier: ${a.calculatedTier || 'N/A'}.`,
  es: a => a.description || `${a.name} es una artista ${a.rank} ${a.genre} (${a.position}) en TopGirl/ApexGirl. Especialidad: ${a.specialty || 'N/A'}. Tier: ${a.calculatedTier || 'N/A'}.`,
  pt: a => a.description || `${a.name} é uma artista ${a.rank} ${a.genre} (${a.position}) no TopGirl/ApexGirl. Especialidade: ${a.specialty || 'N/A'}. Tier: ${a.calculatedTier || 'N/A'}.`,
  pl: a => a.description || `${a.name} jest artystką ${a.rank} ${a.genre} (${a.position}) w TopGirl/ApexGirl. Specjalność: ${a.specialty || 'N/A'}. Tier: ${a.calculatedTier || 'N/A'}.`,
  id: a => a.description || `${a.name} adalah artis ${a.rank} ${a.genre} (${a.position}) di TopGirl/ApexGirl. Spesialitas: ${a.specialty || 'N/A'}. Tier: ${a.calculatedTier || 'N/A'}.`,
  ru: a => a.description || `${a.name} — артист ${a.rank} ${a.genre} (${a.position}) в TopGirl/ApexGirl. Специализация: ${a.specialty || 'N/A'}. Тир: ${a.calculatedTier || 'N/A'}.`,
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
  const description = (descByLang[lang] || descByLang.en)(artist);
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
        de: `${BASE_URL}/de/artist/${slug}/`,
        it: `${BASE_URL}/it/artist/${slug}/`,
        es: `${BASE_URL}/es/artist/${slug}/`,
        pt: `${BASE_URL}/pt/artist/${slug}/`,
        pl: `${BASE_URL}/pl/artist/${slug}/`,
        id: `${BASE_URL}/id/artist/${slug}/`,
        ru: `${BASE_URL}/ru/artist/${slug}/`,
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

  return <ArtistDetailClient lang={lang} slug={slug} />;
}
