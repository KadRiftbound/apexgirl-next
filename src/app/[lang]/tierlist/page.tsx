import type { Metadata } from "next";
import TierlistClient from "./TierlistClient";
import { Breadcrumb } from "@/components/Breadcrumb";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Tier List — Classement des artistes (S+ a D)", description: "Tier list TopGirl/ApexGirl/Idol Company basee sur votes, synergies et retours de jeu. Classements S+ a D avec contexte d'utilisation.", keywords: "TopGirl tier list, meilleurs artistes TopGirl, classement ApexGirl, Idol Company tier list, vote artiste, Genevieve tier, Isadora tier" },
  en: { title: "TopGirl Tier List — Artist Rankings (S+ to D)", description: "TopGirl/ApexGirl/Idol Company tier list based on votes, synergy, and gameplay feedback. S+ to D rankings with usage context.", keywords: "TopGirl tier list, best TopGirl artists, ApexGirl ranking, Idol Company tier list, artist vote, Genevieve tier, Isadora tier" },
  de: { title: "TopGirl Tier List — Künstlerinnen Ranking (S+ bis D)", description: "TopGirl/ApexGirl/Idol Company Tier List auf Basis von Stimmen, Synergien und Gameplay-Feedback.", keywords: "TopGirl tier list, beste TopGirl Künstlerinnen, ApexGirl Ranking, Idol Company tier list" },
  it: { title: "TopGirl Tier List — Classifica artisti (S+ a D)", description: "Tier list TopGirl/ApexGirl/Idol Company basata su voti, sinergie e feedback di gioco.", keywords: "TopGirl tier list, migliori artisti TopGirl, classifica ApexGirl, Idol Company tier list" },
  es: { title: "TopGirl Tier List — Ranking de artistas (S+ a D)", description: "Tier list de TopGirl/ApexGirl/Idol Company basada en votos, sinergias y feedback de juego.", keywords: "TopGirl tier list, mejores artistas TopGirl, clasificación ApexGirl, Idol Company tier list" },
  pt: { title: "TopGirl Tier List — Ranking de artistas (S+ a D)", description: "Tier list TopGirl/ApexGirl/Idol Company com base em votos, sinergias e feedback de gameplay.", keywords: "TopGirl tier list, melhores artistas TopGirl, ranking ApexGirl, Idol Company tier list" },
  pl: { title: "TopGirl Tier List — Ranking artystow (S+ do D)", description: "Tier list TopGirl/ApexGirl/Idol Company oparta na glosach, synergii i feedbacku z gry.", keywords: "TopGirl tier list, najlepsi artyści TopGirl, ranking ApexGirl, Idol Company tier list" },
  id: { title: "TopGirl Tier List — Ranking artis (S+ sampai D)", description: "Tier list TopGirl/ApexGirl/Idol Company berdasarkan vote, sinergi, dan feedback gameplay.", keywords: "TopGirl tier list, artis terbaik TopGirl, ranking ApexGirl, Idol Company tier list" },
  ru: { title: "TopGirl Tier List — Рейтинг артистов (S+ до D)", description: "Тир-лист TopGirl/ApexGirl/Idol Company на основе голосов, синергий и игрового фидбека.", keywords: "TopGirl tier list, лучшие артисты TopGirl, рейтинг ApexGirl, Idol Company tier list" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is the best artist in TopGirl?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Genevieve, Isadora, and Alexandra are consistently rated as S+ tier. Genevieve excels in Sing stats, Isadora in Defense, and Alexandra in Economy. The best artist depends on your team composition."
      }
    },
    {
      "@type": "Question",
      "name": "How is the tier list calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our tier list is community-driven based on player votes and feedback. We also consider competitive data from events like Ultimate CEO, City Supremacy, and Tokyo rankings."
      }
    },
    {
      "@type": "Question",
      "name": "How often is the tier list updated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The tier list is updated weekly based on new artist releases, game updates, and community feedback. Major changes are reflected within 48 hours of a game update."
      }
    },
    {
      "@type": "Question",
      "name": "What do the tiers mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "S+ tier = Best performers, must-have. S tier = Excellent, highly recommended. A tier = Good, solid choice. B tier = Average, situational. C tier = Below average. D tier = Not recommended."
      }
    }
  ]
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
      languages: { fr: `${BASE_URL}/fr/tierlist/`, en: `${BASE_URL}/en/tierlist/`, id: `${BASE_URL}/id/tierlist/`, "x-default": `${BASE_URL}/en/tierlist/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function TierlistPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="page" style={{ paddingTop: 8, paddingBottom: 0 }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tier List', href: '/tierlist/' }]} lang={lang} />
      </div>
      <TierlistClient lang={lang} />
      <div className="page page-narrow" style={{ paddingTop: 0 }}>
        <div className="info-panel">
          <div className="info-panel-title">
            {lang === 'fr' ? 'Méthodologie du classement' : 'Ranking methodology'}
          </div>
          <div className="info-panel-body">
            {lang === 'fr'
              ? "Le classement repose uniquement sur les compétences des artistes. Les dégâts au joueur passent avant tout, puis la réduction de dégâts de skill, les dégâts de skill, l'attaque de base, la réduction d'attaque et la capacité de fans. Il faut deux compétences utiles en combat pour atteindre le tier A, et une artiste purement défensive (double résistance) plafonne en A. Les artistes des saisons récentes ont de meilleures stats de base (+3 % par saison) ; celles sans saison (Original, UR universelles, événements) ne peuvent pas avoir d'assistante et prennent un malus de 10 %. Les votes de la communauté sont affichés à part, dans l'onglet Vote."
              : "The ranking is based only on the artists' skills. Damage to player comes first, then skill damage reduction, skill damage, basic attack, basic attack reduction and fan capacity. An artist needs two useful combat skills to reach tier A, and a purely defensive artist (double resistance) is capped at A. Artists from recent seasons have higher base stats (+3% per season); artists without a season (Original, universal URs, events) cannot get an assistant and take a 10% malus. Community votes are shown separately, in the Vote tab."}
          </div>
        </div>
      </div>
    </>
  );
}
