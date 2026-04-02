import type { Metadata } from "next";
import TierlistClient from "./TierlistClient";
import { Breadcrumb } from "@/components/Breadcrumb";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Tier List 2026 — Meilleurs Artistes Classés (S+ à D)", description: "Classement ultime des meilleurs artistes TopGirl/ApexGirl/Idol Company. Tiers S+, S, A, B, C, D. Découvrez qui vote ! Updated April 2026.", keywords: "TopGirl tier list, meilleurs artistes TopGirl, classement ApexGirl, Idol Company tier list, vote artiste, Genevieve tier, Isadora tier" },
  en: { title: "TopGirl Tier List 2026 — Best Artists Ranked (S+ to D)", description: "Ultimate TopGirl/ApexGirl/Idol Company tier list. See who ranks S+, S, A, B, C, D. Community-driven rankings with weekly updates. Updated April 2026.", keywords: "TopGirl tier list, best TopGirl artists, ApexGirl ranking, Idol Company tier list, artist vote, Genevieve tier, Isadora tier" },
  de: { title: "TopGirl Tier List 2026 — Beste Künstlerinnen im Ranking (S+ bis D)", description: "Ultimative TopGirl/ApexGirl/Idol Company Tier List. Wer steht bei S+, S, A, B, C, D? Community-basiertes Ranking mit wöchentlichen Updates. Stand April 2026.", keywords: "TopGirl tier list, beste TopGirl Künstlerinnen, ApexGirl Ranking, Idol Company tier list" },
  it: { title: "TopGirl Tier List 2026 — Migliori Artisti Classificati (S+ fino a D)", description: "Tier list definitiva di TopGirl/ApexGirl/Idol Company. Scopri chi è classificato S+, S, A, B, C, D. Classifiche community-driven con aggiornamenti settimanali. Aggiornato Aprile 2026.", keywords: "TopGirl tier list, migliori artisti TopGirl, classifica ApexGirl, Idol Company tier list" },
  es: { title: "TopGirl Tier List 2026 — Mejores Artistas Clasificados (S+ a D)", description: "Lista de niveles definitiva de TopGirl/ApexGirl/Idol Company. Descubre quién está en S+, S, A, B, C, D. Clasificaciones de la comunidad con actualizaciones semanales. Actualizado Abril 2026.", keywords: "TopGirl tier list, mejores artistas TopGirl, clasificación ApexGirl, Idol Company tier list" },
  pt: { title: "TopGirl Tier List 2026 — Melhores Artistas Classificados (S+ a D)", description: "Lista de níveis definitiva de TopGirl/ApexGirl/Idol Company. Veja quem está classificado S+, S, A, B, C, D. Rankings da comunidade com atualizações semanais. Atualizado Abril 2026.", keywords: "TopGirl tier list, melhores artistas TopGirl, ranking ApexGirl, Idol Company tier list" },
  pl: { title: "TopGirl Tier List 2026 — Najlepsi Artyści w Rankingu (S+ do D)", description: "Ostateczna lista tier TopGirl/ApexGirl/Idol Company. Zobacz kto jest w S+, S, A, B, C, D. Rankingi społecznościowe z cotygodniowymi aktualizacjami. Zaktualizowano Kwiecień 2026.", keywords: "TopGirl tier list, najlepsi artyści TopGirl, ranking ApexGirl, Idol Company tier list" },
  id: { title: "TopGirl Tier List 2026 — Artis Terbaik di Ranking (S+ hingga D)", description: "Tier list终极 TopGirl/ApexGirl/Idol Company. Lihat siapa yang masuk S+, S, A, B, C, D. Peringkat komunitas dengan pembaruan mingguan. Diperbarui April 2026.", keywords: "TopGirl tier list, artis terbaik TopGirl, ranking ApexGirl, Idol Company tier list" },
  ru: { title: "TopGirl Tier List 2026 — Лучшие Артисты в Рейтинге (S+ до D)", description: "Итоговый тир-лист TopGirl/ApexGirl/Idol Company. Узнайте, кто в S+, S, A, B, C, D. Рейтинги сообщества с еженедельными обновлениями. Обновлено Апрель 2026.", keywords: "TopGirl tier list, лучшие артисты TopGirl, рейтинг ApexGirl, Idol Company tier list" },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tier List', href: '/tierlist/' }]} lang={lang} />
      </div>
      <TierlistClient lang={lang} />
    </>
  );
}
