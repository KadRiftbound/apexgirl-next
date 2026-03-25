import type { Metadata } from "next";
import ArtistsClient from "./ArtistsClient";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Team Builder — Base de données 117+ personnages", description: "Construisez l'équipe parfaite avec notre Team Builder pour TopGirl/ApexGirl. Stats, compétences, tier, genre, spécialité et guides recommandés pour chaque personnage.", keywords: "TopGirl Team Builder, build équipe TopGirl, personnages ApexGirl, stats personnages" },
  en: { title: "TopGirl Team Builder — Complete database of 117+ characters", description: "Build the perfect team with our Team Builder for TopGirl/ApexGirl. Stats, skills, tier, genre, specialty and recommended guides for each character.", keywords: "TopGirl Team Builder, team building TopGirl, ApexGirl characters, character stats" },
  de: { title: "TopGirl Team Builder — Komplette Datenbank mit 117+ Charakteren", description: "Baue das perfekte Team mit unserem Team Builder für TopGirl/ApexGirl. Stats, Fähigkeiten, Tier, Genre, Spezialität und empfohlene Leitfäden für jeden Charakter.", keywords: "TopGirl Team Builder, Team-Aufbau TopGirl, ApexGirl Charaktere" },
  it: { title: "TopGirl Team Builder — Database completo di 117+ personaggi", description: "Costruisci il team perfetto con il nostro Team Builder per TopGirl/ApexGirl. Statistiche, abilità, tier, genere e specialità per ogni personaggio.", keywords: "TopGirl Team Builder, costruzione team TopGirl, personaggi ApexGirl" },
  es: { title: "TopGirl Team Builder — Base de datos de 117+ personajes", description: "Construye el equipo perfecto con nuestro Team Builder para TopGirl/ApexGirl. Estadísticas, habilidades, tier, género y especialidad.", keywords: "TopGirl Team Builder, construcción de equipo TopGirl, personajes ApexGirl" },
  pt: { title: "TopGirl Team Builder — Banco de dados de 117+ personagens", description: "Construa o time perfeito com nosso Team Builder para TopGirl/ApexGirl. Estatísticas, habilidades, tier, gênero e especialidade.", keywords: "TopGirl Team Builder, construção de time TopGirl, personagens ApexGirl" },
  pl: { title: "TopGirl Team Builder — Baza danych 117+ postaci", description: "Zbuduj idealną drużynę dzięki naszemu Team Builder dla TopGirl/ApexGirl. Statystyki, umiejętności, tier, gatunek i specjalność.", keywords: "TopGirl Team Builder, budowa drużyny TopGirl, postacie ApexGirl" },
  id: { title: "TopGirl Team Builder — Database lengkap 117+ karakter", description: "Bangun tim sempurna dengan Team Builder kami untuk TopGirl/ApexGirl. Statistik, skill, tier, genre dan spesialitas untuk setiap karakter.", keywords: "TopGirl Team Builder, pembangunan tim TopGirl, karakter ApexGirl" },
  ru: { title: "TopGirl Team Builder — База данных 117+ персонажей", description: "Создайте идеальную команду с помощью нашего Team Builder для TopGirl/ApexGirl. Статистика, навыки, тир, жанр и специализация каждого персонажа.", keywords: "TopGirl Team Builder, создание команды TopGirl, персонажи ApexGirl" },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  const canonical = `${BASE_URL}/${lang}/teambuilder/`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(", "),
    alternates: {
      canonical,
      languages: { fr: `${BASE_URL}/fr/teambuilder/`, en: `${BASE_URL}/en/teambuilder/`, de: `${BASE_URL}/de/teambuilder/`, it: `${BASE_URL}/it/teambuilder/`, es: `${BASE_URL}/es/teambuilder/`, pt: `${BASE_URL}/pt/teambuilder/`, pl: `${BASE_URL}/pl/teambuilder/`, id: `${BASE_URL}/id/teambuilder/`, ru: `${BASE_URL}/ru/teambuilder/`, "x-default": `${BASE_URL}/en/teambuilder/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function ArtistsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ArtistsClient lang={lang} />;
}
