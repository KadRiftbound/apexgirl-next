import type { Metadata } from "next";
import TierlistClient from "./TierlistClient";
import { Breadcrumb } from "@/components/Breadcrumb";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Tier List 2026 — Meilleurs artistes classés", description: "Classement et votes des meilleurs artistes de TopGirl/ApexGirl. Tiers S+, S, A, B, C, D. Votez pour votre artiste préféré.", keywords: "TopGirl tier list, meilleurs artistes TopGirl, classement ApexGirl, vote artiste" },
  en: { title: "TopGirl Tier List 2026 — Best artists ranked", description: "Rankings and votes for the best TopGirl/ApexGirl artists. S+, S, A, B, C, D tiers. Vote for your favorite artist.", keywords: "TopGirl tier list, best TopGirl artists, ApexGirl ranking, artist vote" },
  de: { title: "TopGirl Tier List 2026 — Beste Künstlerinnen im Ranking", description: "Rankings und Abstimmungen für die besten TopGirl/ApexGirl Künstlerinnen. S+, S, A, B, C, D Tiers. Stimme für deine Lieblingskünstlerin ab.", keywords: "TopGirl tier list, beste TopGirl Künstlerinnen, ApexGirl Ranking" },
  it: { title: "TopGirl Tier List 2026 — Migliori artisti classificati", description: "Classifiche e voti per i migliori artisti in TopGirl/ApexGirl. Livelli S+, S, A, B, C, D.", keywords: "TopGirl tier list, migliori artisti TopGirl, classifica ApexGirl" },
  es: { title: "TopGirl Tier List 2026 — Mejores artistas clasificados", description: "Rankings y votos para los mejores artistas de TopGirl/ApexGirl. Niveles S+, S, A, B, C, D.", keywords: "TopGirl tier list, mejores artistas TopGirl, clasificación ApexGirl" },
  pt: { title: "TopGirl Tier List 2026 — Melhores artistas classificados", description: "Rankings e votos para os melhores artistas de TopGirl/ApexGirl. Tiers S+, S, A, B, C, D.", keywords: "TopGirl tier list, melhores artistas TopGirl, ranking ApexGirl" },
  pl: { title: "TopGirl Tier List 2026 — Najlepsi artyści w rankingu", description: "Rankingi i głosowania na najlepszych artystów TopGirl/ApexGirl. Tiery S+, S, A, B, C, D.", keywords: "TopGirl tier list, najlepsi artyści TopGirl, ranking ApexGirl" },
  id: { title: "TopGirl Tier List 2026 — Artis terbaik dalam ranking", description: "Peringkat dan voting untuk artis terbaik TopGirl/ApexGirl. Tier S+, S, A, B, C, D.", keywords: "TopGirl tier list, artis terbaik TopGirl, ranking ApexGirl" },
  ru: { title: "TopGirl Tier List 2026 — Лучшие артисты в рейтинге", description: "Рейтинги и голосования за лучших артистов TopGirl/ApexGirl. Тиры S+, S, A, B, C, D.", keywords: "TopGirl tier list, лучшие артисты TopGirl, рейтинг ApexGirl" },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  const canonical = `${BASE_URL}/${lang}/tierlist/`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(", "),
    alternates: {
      canonical,
      languages: { fr: `${BASE_URL}/fr/tierlist/`, en: `${BASE_URL}/en/tierlist/`, de: `${BASE_URL}/de/tierlist/`, it: `${BASE_URL}/it/tierlist/`, es: `${BASE_URL}/es/tierlist/`, pt: `${BASE_URL}/pt/tierlist/`, pl: `${BASE_URL}/pl/tierlist/`, id: `${BASE_URL}/id/tierlist/`, ru: `${BASE_URL}/ru/tierlist/`, "x-default": `${BASE_URL}/en/tierlist/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function TierlistPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tier List', href: '/tierlist/' }]} lang={lang} />
      </div>
      <TierlistClient lang={lang} />
    </>
  );
}
