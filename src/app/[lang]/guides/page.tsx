import type { Metadata } from "next";
import GuidesListClient from "./GuidesListClient";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Guides — Tous les guides de jeu", description: "Tous les guides TopGirl/ApexGirl : équipement, construction d'équipe, événements et plus. Guides pour débutants et joueurs avancés.", keywords: "TopGirl guides, guides ApexGirl, guide équipement TopGirl, guide débutant TopGirl" },
  en: { title: "TopGirl Guides — All game guides", description: "All TopGirl/ApexGirl guides: equipment, team building, events and more. Beginner and advanced player guides.", keywords: "TopGirl guides, ApexGirl guides, TopGirl equipment guide, TopGirl beginner guide" },
  de: { title: "TopGirl Leitfäden — Alle Spiel-Leitfäden", description: "Alle TopGirl/ApexGirl Leitfäden: Ausrüstung, Teambuilding, Events und mehr. Anfänger- und Fortgeschrittenen-Leitfäden.", keywords: "TopGirl Leitfäden, ApexGirl Leitfäden, TopGirl Ausrüstungs-Leitfaden" },
  it: { title: "TopGirl Guide — Tutte le guide di gioco", description: "Tutte le guide TopGirl/ApexGirl: equipaggiamento, costruzione team, eventi e altro. Guide per principianti e giocatori avanzati.", keywords: "TopGirl guide, guide ApexGirl, guida equipaggiamento TopGirl" },
  es: { title: "TopGirl Guías — Todas las guías del juego", description: "Todas las guías TopGirl/ApexGirl: equipamiento, construcción de equipo, eventos y más. Guías para principiantes y jugadores avanzados.", keywords: "TopGirl guías, guías ApexGirl, guía equipamiento TopGirl" },
  pt: { title: "TopGirl Guias — Todos os guias do jogo", description: "Todos os guias TopGirl/ApexGirl: equipamento, construção de equipe, eventos e mais. Guias para iniciantes e jogadores avançados.", keywords: "TopGirl guias, guias ApexGirl, guia equipamento TopGirl" },
  pl: { title: "TopGirl Poradniki — Wszystkie poradniki gry", description: "Wszystkie poradniki TopGirl/ApexGirl: wyposażenie, budowanie drużyny, wydarzenia i więcej. Poradniki dla początkujących i zaawansowanych.", keywords: "TopGirl poradniki, poradniki ApexGirl, poradnik wyposażenia TopGirl" },
  id: { title: "TopGirl Panduan — Semua panduan game", description: "Semua panduan TopGirl/ApexGirl: peralatan, membangun tim, acara dan lainnya. Panduan untuk pemula dan pemain lanjutan.", keywords: "TopGirl panduan, panduan ApexGirl, panduan peralatan TopGirl" },
  ru: { title: "TopGirl Руководства — Все гайды по игре", description: "Все руководства TopGirl/ApexGirl: снаряжение, построение команды, события и многое другое. Гайды для новичков и продвинутых игроков.", keywords: "TopGirl гайды, гайды ApexGirl, гайд по снаряжению TopGirl" },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  const canonical = `${BASE_URL}/${lang}/guides/`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(", "),
    alternates: {
      canonical,
      languages: { fr: `${BASE_URL}/fr/guides/`, en: `${BASE_URL}/en/guides/`, de: `${BASE_URL}/de/guides/`, it: `${BASE_URL}/it/guides/`, es: `${BASE_URL}/es/guides/`, pt: `${BASE_URL}/pt/guides/`, pl: `${BASE_URL}/pl/guides/`, id: `${BASE_URL}/id/guides/`, ru: `${BASE_URL}/ru/guides/`, "x-default": `${BASE_URL}/en/guides/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function GuidesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <GuidesListClient lang={lang} />;
}
