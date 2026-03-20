import type { Metadata } from "next";
import ArtistsClient from "./ArtistsClient";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Artistes — Base de données 117+ artistes", description: "Base de données complète des 117+ artistes de TopGirl/ApexGirl. Stats, compétences, tier, genre, spécialité et guides recommandés pour chaque artiste.", keywords: "TopGirl artistes, artistes ApexGirl, stats artistes TopGirl, tier artistes" },
  en: { title: "TopGirl Artists — Complete database of 117+ artists", description: "Complete database of 117+ TopGirl/ApexGirl artists. Stats, skills, tier, genre, specialty and recommended guides for each artist.", keywords: "TopGirl artists, ApexGirl artists, TopGirl artist stats, artist tier list" },
  de: { title: "TopGirl Künstlerinnen — Komplette Datenbank mit 117+ Künstlerinnen", description: "Komplette Datenbank mit 117+ TopGirl/ApexGirl Künstlerinnen. Stats, Fähigkeiten, Tier, Genre, Spezialität und empfohlene Leitfäden für jede Künstlerin.", keywords: "TopGirl Künstlerinnen, ApexGirl Künstlerinnen, TopGirl Künstlerinnen Stats" },
  it: { title: "TopGirl Artisti — Database completo di 117+ artisti", description: "Database completo di 117+ artisti in TopGirl/ApexGirl. Statistiche, abilità, tier, genere e specialità per ogni artista.", keywords: "TopGirl artisti, artisti ApexGirl, statistiche artisti TopGirl" },
  es: { title: "TopGirl Artistas — Base de datos de 117+ artistas", description: "Base de datos completa de 117+ artistas de TopGirl/ApexGirl. Estadísticas, habilidades, tier, género y especialidad.", keywords: "TopGirl artistas, artistas ApexGirl, estadísticas artistas TopGirl" },
  pt: { title: "TopGirl Artistas — Banco de dados de 117+ artistas", description: "Banco de dados completo de 117+ artistas de TopGirl/ApexGirl. Estatísticas, habilidades, tier, gênero e especialidade.", keywords: "TopGirl artistas, artistas ApexGirl, estatísticas artistas TopGirl" },
  pl: { title: "TopGirl Artyści — Baza danych 117+ artystów", description: "Kompletna baza danych 117+ artystów TopGirl/ApexGirl. Statystyki, umiejętności, tier, gatunek i specjalność.", keywords: "TopGirl artyści, artyści ApexGirl, statystyki artystów TopGirl" },
  id: { title: "TopGirl Artis — Database lengkap 117+ artis", description: "Database lengkap 117+ artis TopGirl/ApexGirl. Statistik, skill, tier, genre dan spesialitas untuk setiap artis.", keywords: "TopGirl artis, artis ApexGirl, statistik artis TopGirl" },
  ru: { title: "TopGirl Артисты — База данных 117+ артистов", description: "Полная база данных 117+ артистов TopGirl/ApexGirl. Статистика, навыки, тир, жанр и специализация каждого артиста.", keywords: "TopGirl артисты, артисты ApexGirl, статистика артистов TopGirl" },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  const canonical = `${BASE_URL}/${lang}/artists/`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(", "),
    alternates: {
      canonical,
      languages: { fr: `${BASE_URL}/fr/artists/`, en: `${BASE_URL}/en/artists/`, de: `${BASE_URL}/de/artists/`, it: `${BASE_URL}/it/artists/`, es: `${BASE_URL}/es/artists/`, pt: `${BASE_URL}/pt/artists/`, pl: `${BASE_URL}/pl/artists/`, id: `${BASE_URL}/id/artists/`, ru: `${BASE_URL}/ru/artists/`, "x-default": `${BASE_URL}/en/artists/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function ArtistsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ArtistsClient lang={lang} />;
}
