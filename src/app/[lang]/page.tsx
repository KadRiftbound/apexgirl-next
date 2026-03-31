import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Guide — Guides, Outils & Tier List", description: "Le fansite non-officiel de TopGirl/ApexGirl/Idol Company. Guides de jeu, outils, tier list, codes promo et base de données de 117+ artistes.", keywords: "TopGirl guide, ApexGirl guide, Idol Company guide, tier list, codes promo, artistes TopGirl" },
  en: { title: "TopGirl Guide — Guides, Tools & Tier List", description: "The unofficial TopGirl/ApexGirl/Idol Company fansite. Game guides, tools, tier list, promo codes and database of 117+ artists.", keywords: "TopGirl guide, ApexGirl guide, Idol Company guide, tier list, promo codes, TopGirl artists" },
  de: { title: "TopGirl Guide — Leitfäden, Werkzeuge & Tier List", description: "Die inoffizielle TopGirl/ApexGirl/Idol Company Fanseite. Spiel-Leitfäden, Werkzeuge, Tier List, Promo-Codes und Datenbank mit 117+ Künstlerinnen.", keywords: "TopGirl Leitfaden, ApexGirl Leitfaden, Idol Company Leitfaden, Tier List, Promo-Codes, TopGirl Künstlerinnen" },
  it: { title: "TopGirl Guide — Guide, Strumenti & Tier List", description: "Il fansite non ufficiale di TopGirl/ApexGirl/Idol Company. Guide di gioco, strumenti, tier list, codici promo e database di 117+ artisti.", keywords: "TopGirl guida, ApexGirl guida, Idol Company guida, tier list, codici promo, artisti TopGirl" },
  es: { title: "TopGirl Guide — Guías, Herramientas & Tier List", description: "El fansite no oficial de TopGirl/ApexGirl/Idol Company. Guías de juego, herramientas, tier list, códigos promo y base de datos de 117+ artistas.", keywords: "TopGirl guía, ApexGirl guía, Idol Company guía, tier list, códigos promo, artistas TopGirl" },
  pt: { title: "TopGirl Guide — Guias, Ferramentas & Tier List", description: "O fansite não oficial de TopGirl/ApexGirl/Idol Company. Guias de jogo, ferramentas, tier list, códigos promo e banco de dados de 117+ artistas.", keywords: "TopGirl guia, ApexGirl guia, Idol Company guia, tier list, códigos promo, artistas TopGirl" },
  pl: { title: "TopGirl Guide — Poradniki, Narzędzia & Tier List", description: "Nieoficjalny fansite TopGirl/ApexGirl/Idol Company. Poradniki, narzędzia, tier list, kody promo i baza danych 117+ artystów.", keywords: "TopGirl poradnik, ApexGirl poradnik, Idol Company poradnik, tier list, kody promo, artyści TopGirl" },
  id: { title: "TopGirl Guide — Panduan, Alat & Tier List", description: "Fansite tidak resmi TopGirl/ApexGirl/Idol Company. Panduan game, alat, tier list, kode promo dan basis data 117+ artis.", keywords: "TopGirl panduan, ApexGirl panduan, Idol Company panduan, tier list, kode promo, artis TopGirl" },
  ru: { title: "TopGirl Guide — Руководства, Инструменты & Tier List", description: "Неофициальный фан-сайт TopGirl/ApexGirl/Idol Company. Руководства, инструменты, tier list, промокоды и база данных 117+ артистов.", keywords: "TopGirl гайд, ApexGirl гайд, Idol Company гайд, tier list, промокоды, артисты TopGirl" },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  const canonical = `${BASE_URL}/${lang}/`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(", "),
    alternates: {
      canonical,
      languages: { fr: `${BASE_URL}/fr/`, en: `${BASE_URL}/en/`, de: `${BASE_URL}/de/`, it: `${BASE_URL}/it/`, es: `${BASE_URL}/es/`, pt: `${BASE_URL}/pt/`, pl: `${BASE_URL}/pl/`, id: `${BASE_URL}/id/`, ru: `${BASE_URL}/ru/`, "x-default": `${BASE_URL}/en/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <HomeClient lang={lang} />;
}
