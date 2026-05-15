import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Guide — Guides, Tier List et Outils", description: "Fansite non officiel TopGirl/ApexGirl/Idol Company avec guides pratiques, tier list communautaire, artistes et outils de progression.", keywords: "TopGirl guide, ApexGirl guide, Idol Company guide, tier list, codes promo, artistes TopGirl, guide Top Girl" },
  en: { title: "TopGirl Guide — Guides, Tier List and Tools", description: "Unofficial TopGirl/ApexGirl/Idol Company fansite with practical guides, community tier list, artist data, and progression tools.", keywords: "TopGirl guide, ApexGirl guide, Idol Company guide, tier list, promo codes, TopGirl artists, Top Girl game guide" },
  de: { title: "TopGirl Guide — Leitfaden, Tier List und Tools", description: "Inoffizielle TopGirl/ApexGirl/Idol Company Fanseite mit praxisnahen Guides, Community Tier List und hilfreichen Tools.", keywords: "TopGirl Leitfaden, ApexGirl Leitfaden, Idol Company Leitfaden, Tier List, Promo-Codes, TopGirl Künstlerinnen" },
  it: { title: "TopGirl Guide — Guide, Tier List e Strumenti", description: "Fansite non ufficiale TopGirl/ApexGirl/Idol Company con guide pratiche, tier list della community, artisti e strumenti utili.", keywords: "TopGirl guida, ApexGirl guida, Idol Company guida, tier list, codici promo, artisti TopGirl" },
  es: { title: "TopGirl Guide — Guías, Tier List y Herramientas", description: "Fansite no oficial de TopGirl/ApexGirl/Idol Company con guías prácticas, tier list comunitaria, artistas y herramientas.", keywords: "TopGirl guía, ApexGirl guía, Idol Company guía, tier list, códigos promo, artistas TopGirl" },
  pt: { title: "TopGirl Guide — Guias, Tier List e Ferramentas", description: "Fansite não oficial TopGirl/ApexGirl/Idol Company com guias práticos, tier list da comunidade, artistas e ferramentas.", keywords: "TopGirl guia, ApexGirl guia, Idol Company guia, tier list, códigos promo, artistas TopGirl" },
  pl: { title: "TopGirl Guide — Poradniki, Tier List i Narzędzia", description: "Nieoficjalny serwis TopGirl/ApexGirl/Idol Company z praktycznymi poradnikami, tier listą społeczności i narzędziami.", keywords: "TopGirl poradnik, ApexGirl poradnik, Idol Company poradnik, tier list, kody promo, artyści TopGirl" },
  id: { title: "TopGirl Guide — Panduan, Tier List, dan Alat", description: "Fansite tidak resmi TopGirl/ApexGirl/Idol Company dengan panduan praktis, tier list komunitas, data artis, dan alat.", keywords: "TopGirl panduan, ApexGirl panduan, Idol Company panduan, tier list, kode promo, artis TopGirl" },
  ru: { title: "TopGirl Guide — Гайды, Tier List и Инструменты", description: "Неофициальный сайт по TopGirl/ApexGirl/Idol Company с практическими гайдами, tier list сообщества и инструментами.", keywords: "TopGirl гайд, ApexGirl гайд, Idol Company гайд, tier list, промокоды, артисты TopGirl" },
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
      "name": "How often is the tier list reviewed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The tier list is community-driven and reviewed regularly after major events, season shifts, and gameplay updates."
      }
    },
    {
      "@type": "Question",
      "name": "Do you explain ranking changes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Important ranking changes are explained directly on tier-related pages with context about mode, synergy, and resource cost." 
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
