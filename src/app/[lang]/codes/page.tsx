import type { Metadata } from "next";
import { activeCodes } from "@/lib/data/codes";
import CodesClient from "./CodesClient";
import { Breadcrumb } from "@/components/Breadcrumb";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "Codes Promo TopGirl 2026 — Codes actifs gratuits", description: "Tous les codes promo TopGirl/ApexGirl/Idol Company actifs en 2026. Mises à jour quotidiennes. Obtenez des récompenses gratuites avec les derniers codes.", keywords: "codes promo TopGirl, codes TopGirl 2026, ApexGirl codes gratuits, Idol Company codes promo, redeem codes" },
  en: { title: "TopGirl Promo Codes 2026 — Active Free Codes", description: "All active TopGirl/ApexGirl/Idol Company promo codes in 2026. Daily updates. Get free rewards with the latest codes.", keywords: "TopGirl promo codes, TopGirl codes 2026, ApexGirl free codes, Idol Company promo codes, redeem codes" },
  de: { title: "TopGirl Promo-Codes 2026 — Aktive Kostenlose Codes", description: "Alle aktiven TopGirl/ApexGirl/Idol Company Promo-Codes in 2026. Tägliche Updates. Erhalte kostenlose Belohnungen mit den neuesten Codes.", keywords: "TopGirl Promo-Codes, TopGirl Codes 2026, ApexGirl kostenlose Codes, Idol Company Promo-Codes" },
  it: { title: "Codici Promo TopGirl 2026 — Codici Attivi Gratuiti", description: "Tutti i codici promo TopGirl/ApexGirl/Idol Company attivi nel 2026. Aggiornamenti giornalieri. Ottieni ricompense gratuite.", keywords: "codici promo TopGirl, codici TopGirl 2026, ApexGirl codici gratis, Idol Company codici promo" },
  es: { title: "Códigos Promo TopGirl 2026 — Códigos Activos Gratis", description: "Todos los códigos promo TopGirl/ApexGirl/Idol Company activos en 2026. Actualizaciones diarias. Obtén recompensas gratis.", keywords: "códigos promo TopGirl, códigos TopGirl 2026, ApexGirl códigos gratis, Idol Company códigos promo" },
  pt: { title: "Códigos Promo TopGirl 2026 — Códigos Ativos Grátis", description: "Todos os códigos promo TopGirl/ApexGirl/Idol Company ativos em 2026. Atualizações diárias. Obtenha recompensas grátis.", keywords: "códigos promo TopGirl, códigos TopGirl 2026, ApexGirl códigos grátis, Idol Company códigos promo" },
  pl: { title: "Kody Promo TopGirl 2026 — Aktywne Darmowe Kody", description: "Wszystkie aktywne kody promo TopGirl/ApexGirl/Idol Company w 2026. Codzienne aktualizacje. Zdobądź darmowe nagrody.", keywords: "kody promo TopGirl, kody TopGirl 2026, ApexGirl darmowe kody, Idol Company kody promo" },
  id: { title: "Kode Promo TopGirl 2026 — Kode Aktif Gratis", description: "Semua kode promo TopGirl/ApexGirl/Idol Company yang aktif di 2026. Pembaruan harian. Dapatkan reward gratis.", keywords: "kode promo TopGirl, kode TopGirl 2026, ApexGirl kode gratis, Idol Company kode promo" },
  ru: { title: "Промокоды TopGirl 2026 — Актуальные Бесплатные Коды", description: "Все актуальные промокоды TopGirl/ApexGirl/Idol Company в 2026. Ежедневные обновления. Получите бесплатные награды.", keywords: "промокоды TopGirl, коды TopGirl 2026, ApexGirl бесплатные коды, Idol Company промокоды" },
};

const faqTemplates: Record<string, { q: string; a: string }> = {
  fr: { q: "Quelle est la récompense du code {code} ?", a: "Le code {code} donne : {rewards}." },
  en: { q: "What is the reward for code {code}?", a: "The code {code} gives: {rewards}." },
  de: { q: "Was ist die Belohnung für den Code {code}?", a: "Der Code {code} gibt: {rewards}." },
  it: { q: "Qual è la ricompensa del codice {code}?", a: "Il codice {code} dà: {rewards}." },
  es: { q: "¿Cuál es la recompensa del código {code}?", a: "El código {code} otorga: {rewards}." },
  pt: { q: "Qual é a recompensa do código {code}?", a: "O código {code} dá: {rewards}." },
  pl: { q: "Jaka jest nagroda za kod {code}?", a: "Kod {code} daje: {rewards}." },
  id: { q: "Apa hadiah untuk kode {code}?", a: "Kode {code} memberikan: {rewards}." },
  ru: { q: "Какова награда за код {code}?", a: "Код {code} даёт: {rewards}." },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  const canonical = `${BASE_URL}/${lang}/codes/`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(", "),
    alternates: {
      canonical,
      languages: { fr: `${BASE_URL}/fr/codes/`, en: `${BASE_URL}/en/codes/`, de: `${BASE_URL}/de/codes/`, it: `${BASE_URL}/it/codes/`, es: `${BASE_URL}/es/codes/`, pt: `${BASE_URL}/pt/codes/`, pl: `${BASE_URL}/pl/codes/`, id: `${BASE_URL}/id/codes/`, ru: `${BASE_URL}/ru/codes/`, "x-default": `${BASE_URL}/en/codes/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function CodesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const tmpl = faqTemplates[lang] || faqTemplates.en;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": activeCodes.map((code: { code: string; rewards: string }) => ({
      "@type": "Question",
      "name": tmpl.q.replace("{code}", code.code),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": tmpl.a.replace("{code}", code.code).replace("{rewards}", code.rewards),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Codes', href: '/codes/' }]} lang={lang} />
      </div>
      <CodesClient lang={lang} />
    </>
  );
}
