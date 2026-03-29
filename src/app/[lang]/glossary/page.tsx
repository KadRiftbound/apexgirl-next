import type { Metadata } from "next";
import GlossaryClient from "./GlossaryClient";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "Glossaire Top Girl — Termes et définitions du jeu", description: "Glossaire complet de Top Girl : définitions de tous les termes de jeu, mécanismes, événements, ressources et systèmes. Parfait pour les débutants.", keywords: "glossaire Top Girl, termes Top Girl, définitions ApexGirl, lexique Top Girl" },
  en: { title: "Top Girl Glossary — Game terms and definitions", description: "Complete Top Girl glossary: all game terms, mechanisms, events, resources and systems defined. Perfect for beginners.", keywords: "Top Girl glossary, Top Girl terms, ApexGirl definitions, game terminology" },
  de: { title: "Top Girl Glossar — Begriffe und Definitionen", description: "Vollständiges Top Girl Glossar: Alle Spielbegriffe, Mechanismen, Events, Ressourcen und Systeme erklärt. Perfekt für Anfänger.", keywords: "Top Girl Glossar, Top Girl Begriffe, ApexGirl Definitionen, Spielbegriffe" },
  it: { title: "Glossario Top Girl — Termini e definizioni di gioco", description: "Glossario completo di Top Girl: tutti i termini di gioco, meccanismi, eventi, risorse e sistemi definiti. Perfetto per principianti.", keywords: "glossario Top Girl, termini Top Girl, definizioni ApexGirl, terminologia di gioco" },
  es: { title: "Glosario Top Girl — Términos y definiciones del juego", description: "Glosario completo de Top Girl: todos los términos del juego, mecanismos, eventos, recursos y sistemas definidos. Perfecto para principiantes.", keywords: "glosario Top Girl, términos Top Girl, definiciones ApexGirl, terminología del juego" },
  pt: { title: "Glossário Top Girl — Termos e definições do jogo", description: "Glossário completo do Top Girl: todos os termos do jogo, mecanismos, eventos, recursos e sistemas definidos. Perfeito para iniciantes.", keywords: "glossário Top Girl, termos Top Girl, definições ApexGirl, terminologia do jogo" },
  pl: { title: "Słownik Top Girl — Terminy i definicje gry", description: "Kompletny słownik Top Girl: wszystkie terminy gry, mechanizmy, wydarzenia, zasoby i systemy zdefiniowane. Idealny dla początkujących.", keywords: "słownik Top Girl, terminy Top Girl, definicje ApexGirl, terminologia gry" },
  id: { title: "Glosarium Top Girl — Istilah dan definisi permainan", description: "Glosarium lengkap Top Girl: semua istilah permainan, mekanisme, acara, sumber daya dan sistem didefinisikan. Sempurna untuk pemula.", keywords: "glosarium Top Girl, istilah Top Girl, definisi ApexGirl, terminologi permainan" },
  ru: { title: "Глоссарий Top Girl — Термины и определения игры", description: "Полный глоссарий Top Girl: все игровые термины, механизмы, события, ресурсы и системы. Идеально для новичков.", keywords: "глоссарий Top Girl, термины Top Girl, определения ApexGirl, игровая терминология" },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  const canonical = `${BASE_URL}/${lang}/glossary/`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(", "),
    alternates: {
      canonical,
      languages: {
        fr: `${BASE_URL}/fr/glossary/`,
        en: `${BASE_URL}/en/glossary/`,
        de: `${BASE_URL}/de/glossary/`,
        it: `${BASE_URL}/it/glossary/`,
        es: `${BASE_URL}/es/glossary/`,
        pt: `${BASE_URL}/pt/glossary/`,
        pl: `${BASE_URL}/pl/glossary/`,
        id: `${BASE_URL}/id/glossary/`,
        ru: `${BASE_URL}/ru/glossary/`,
        "x-default": `${BASE_URL}/en/glossary/`,
      },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function GlossaryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <GlossaryClient lang={lang} />;
}
