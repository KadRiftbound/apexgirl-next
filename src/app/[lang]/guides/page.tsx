import type { Metadata } from "next";
import GuidesListClient, { type GuideListItem } from "./GuidesListClient";
import guidesData from "@/lib/data/guides.json";

// Strip every content/tips/rewards field and other languages: the list only needs metadata.
const LANG_SUFFIX = /_(fr|en|it|es|pt|pl|id|ru|de)$/;
const HEAVY_PREFIX = /^(content|tips|rewards|summaryBox|callouts)/;
function toListItem(guide: Record<string, unknown>, lang: string): GuideListItem {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(guide)) {
    if (HEAVY_PREFIX.test(key)) continue;
    const m = key.match(LANG_SUFFIX);
    if (m && m[1] !== lang) continue;
    out[key] = value;
  }
  return out as unknown as GuideListItem;
}

const BASE_URL = "https://apexgirlguide.com";

function guideTitle(guide: any, lang: string): string {
  if (lang === "fr") return guide.title;
  const key = `title_${lang}`;
  return guide[key] || guide.title_en || guide.title;
}

function guideSlug(guide: any, lang: string): string {
  const fallbacks: Record<string, string> = { fr: guide.slugs?.fr, en: guide.slugs?.en };
  return guide.slugs?.[lang] || fallbacks[lang] || guide.slugs?.en || guide.id;
}

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Guides — Tous les guides de jeu", description: "Tous les guides TopGirl/ApexGirl/Idol Company : équipement, construction d'équipe, événements et plus. Guides pour débutants et joueurs avancés.", keywords: "TopGirl guides, guides ApexGirl, Idol Company guides, guide équipement TopGirl, guide débutant TopGirl" },
  en: { title: "TopGirl Guides — All game guides", description: "All TopGirl/ApexGirl/Idol Company guides: equipment, team building, events and more. Beginner and advanced player guides.", keywords: "TopGirl guides, ApexGirl guides, Idol Company guides, TopGirl equipment guide, TopGirl beginner guide" },
  de: { title: "TopGirl Leitfäden — Alle Spiel-Leitfäden", description: "Alle TopGirl/ApexGirl/Idol Company Leitfäden: Ausrüstung, Teambuilding, Events und mehr. Anfänger- und Fortgeschrittenen-Leitfäden.", keywords: "TopGirl Leitfäden, ApexGirl Leitfäden, Idol Company Leitfäden, TopGirl Ausrüstungs-Leitfaden" },
  it: { title: "TopGirl Guide — Tutte le guide di gioco", description: "Tutte le guide TopGirl/ApexGirl/Idol Company: equipaggiamento, costruzione team, eventi e altro. Guide per principianti e giocatori avanzati.", keywords: "TopGirl guide, guide ApexGirl, Idol Company guide, guida equipaggiamento TopGirl" },
  es: { title: "TopGirl Guías — Todas las guías del juego", description: "Todas las guías TopGirl/ApexGirl/Idol Company: equipamiento, construcción de equipo, eventos y más. Guías para principiantes y jugadores avanzados.", keywords: "TopGirl guías, guías ApexGirl, Idol Company guías, guía equipamiento TopGirl" },
  pt: { title: "TopGirl Guias — Todos os guias do jogo", description: "Todos os guias TopGirl/ApexGirl/Idol Company: equipamento, construção de equipe, eventos e mais. Guias para iniciantes e jogadores avançados.", keywords: "TopGirl guias, guias ApexGirl, Idol Company guias, guia equipamento TopGirl" },
  pl: { title: "TopGirl Poradniki — Wszystkie poradniki gry", description: "Wszystkie poradniki TopGirl/ApexGirl/Idol Company: wyposażenie, budowanie drużyny, wydarzenia i więcej. Poradniki dla początkujących i zaawansowanych.", keywords: "TopGirl poradniki, poradniki ApexGirl, Idol Company poradniki, poradnik wyposażenia TopGirl" },
  id: { title: "TopGirl Panduan — Semua panduan game", description: "Semua panduan TopGirl/ApexGirl/Idol Company: peralatan, membangun tim, acara dan lainnya. Panduan untuk pemula dan pemain lanjutan.", keywords: "TopGirl panduan, panduan ApexGirl, Idol Company panduan, panduan peralatan TopGirl" },
  ru: { title: "TopGirl Руководства — Все гайды по игре", description: "Все руководства TopGirl/ApexGirl/Idol Company: снаряжение, построение команды, события и многое другое. Гайды для новичков и продвинутых игроков.", keywords: "TopGirl гайды, гайды ApexGirl, Idol Company гайды, гайд по снаряжению TopGirl" },
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
      languages: { fr: `${BASE_URL}/fr/guides/`, en: `${BASE_URL}/en/guides/`, id: `${BASE_URL}/id/guides/`, "x-default": `${BASE_URL}/en/guides/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function GuidesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": (guidesData as any[]).map((guide, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${BASE_URL}/${lang}/guides/${guideSlug(guide, lang)}/`,
      "name": guideTitle(guide, lang),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <GuidesListClient lang={lang} guides={(guidesData as unknown as Record<string, unknown>[]).map((g) => toListItem(g, lang))} />
    </>
  );
}
