import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Guide 2026 — Guides, Tier List & Outils gratuits", description: "Le guide #1 non officiel de TopGirl/ApexGirl/Idol Company. Tier list, 117+ artistes avec stats, codes promo et outils gratuits. Mis à jour en avril 2026.", keywords: "TopGirl guide, ApexGirl guide, Idol Company guide, tier list, codes promo, artistes TopGirl, guide Top Girl" },
  en: { title: "TopGirl Guide 2026 — Best Tier List, Guides & Free Tools", description: "The #1 unofficial TopGirl/ApexGirl/Idol Company guide. Tier list, 117+ artists with stats, promo codes & free tools. Updated April 2026.", keywords: "TopGirl guide, ApexGirl guide, Idol Company guide, tier list, promo codes, TopGirl artists, Top Girl game guide" },
  de: { title: "TopGirl Guide 2026 — Beste Tier List, Guides & Kostenlose Tools", description: "Der beste inoffizielle TopGirl/ApexGirl/Idol Company Guide. Tier List, 117+ Künstlerinnen mit Stats, Promo-Codes & kostenlose Tools. Stand April 2026.", keywords: "TopGirl Leitfaden, ApexGirl Leitfaden, Idol Company Leitfaden, Tier List, Promo-Codes, TopGirl Künstlerinnen" },
  it: { title: "TopGirl Guide 2026 — Migliore Tier List, Guide & Strumenti Gratuiti", description: "La migliore guida non ufficiale di TopGirl/ApexGirl/Idol Company. Tier list, 117+ artisti con stats, codici promo e strumenti gratuiti. Aggiornato Aprile 2026.", keywords: "TopGirl guida, ApexGirl guida, Idol Company guida, tier list, codici promo, artisti TopGirl" },
  es: { title: "TopGirl Guide 2026 — Mejor Tier List, Guías y Herramientas Gratis", description: "La mejor guía no oficial de TopGirl/ApexGirl/Idol Company. Tier list, 117+ artistas con stats, códigos promo y herramientas gratis. Actualizado Abril 2026.", keywords: "TopGirl guía, ApexGirl guía, Idol Company guía, tier list, códigos promo, artistas TopGirl" },
  pt: { title: "TopGirl Guide 2026 — Melhor Tier List, Guias e Ferramentas Grátis", description: "O melhor guia não oficial de TopGirl/ApexGirl/Idol Company. Tier list, 117+ artistas com stats, códigos promo e ferramentas grátis. Atualizado Abril 2026.", keywords: "TopGirl guia, ApexGirl guia, Idol Company guia, tier list, códigos promo, artistas TopGirl" },
  pl: { title: "TopGirl Guide 2026 — Najlepsza Tier List, Poradniki i Darmowe Narzędzia", description: "Najlepszy nieoficjalny przewodnik TopGirl/ApexGirl/Idol Company. Tier list, 117+ artystów ze statystykami, kody promo i darmowe narzędzia. Zaktualizowano Kwiecień 2026.", keywords: "TopGirl poradnik, ApexGirl poradnik, Idol Company poradnik, tier list, kody promo, artyści TopGirl" },
  id: { title: "TopGirl Guide 2026 — Tier List Terbaik, Panduan & Alat Gratis", description: "Panduan tidak resmi terbaik untuk TopGirl/ApexGirl/Idol Company. Tier list, 117+ artis dengan stats, kode promo & alat gratis. Diperbarui April 2026.", keywords: "TopGirl panduan, ApexGirl panduan, Idol Company panduan, tier list, kode promo, artis TopGirl" },
  ru: { title: "TopGirl Guide 2026 — Лучший Tier List, Гайды и Бесплатные Инструменты", description: "Лучший неофициальный гайд по TopGirl/ApexGirl/Idol Company. Tier list, 117+ артистов со статами, промокоды и бесплатные инструменты. Обновлено Апрель 2026.", keywords: "TopGirl гайд, ApexGirl гайд, Idol Company гайд, tier list, промокоды, артисты TopGirl" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is TopGirl Guide an official website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, apexgirlguide.com is an unofficial fansite. TopGirl, ApexGirl, and Idol Company are the same game made by A3Games."
      }
    },
    {
      "@type": "Question",
      "name": "What information can I find on this site?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide complete guides, tier lists, team builder tools, promo codes, and a database of 117+ artists with stats and skills."
      }
    },
    {
      "@type": "Question",
      "name": "Are the promo codes still working?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All promo codes on our site are currently expired but kept for reference. We update them as soon as new codes become available."
      }
    },
    {
      "@type": "Question",
      "name": "How often is the tier list updated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The tier list is community-driven and updated weekly based on player votes and feedback from the Top Girl competitive scene."
      }
    },
    {
      "@type": "Question",
      "name": "Which artists are in the S+ tier?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Based on current community rankings, Genevieve, Isadora, and Alexandra are consistently rated as S+ tier for their exceptional stats and skills."
      }
    }
  ]
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient lang={lang} />
    </>
  );
}
