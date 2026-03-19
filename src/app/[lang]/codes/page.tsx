import type { Metadata } from "next";
import CodesClient from "./CodesClient";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "Codes Promo TopGirl 2026 — Codes actifs gratuits", description: "Tous les codes promo TopGirl/ApexGirl actifs en 2026. Mises à jour quotidiennes. Obtenez des récompenses gratuites avec les derniers codes.", keywords: "codes promo TopGirl, codes TopGirl 2026, ApexGirl codes gratuits, redeem codes" },
  en: { title: "TopGirl Promo Codes 2026 — Active Free Codes", description: "All active TopGirl/ApexGirl promo codes in 2026. Daily updates. Get free rewards with the latest codes.", keywords: "TopGirl promo codes, TopGirl codes 2026, ApexGirl free codes, redeem codes" },
  it: { title: "Codici Promo TopGirl 2026 — Codici Attivi Gratuiti", description: "Tutti i codici promo TopGirl/ApexGirl attivi nel 2026. Aggiornamenti giornalieri. Ottieni ricompense gratuite.", keywords: "codici promo TopGirl, codici TopGirl 2026, ApexGirl codici gratis" },
  es: { title: "Códigos Promo TopGirl 2026 — Códigos Activos Gratis", description: "Todos los códigos promo TopGirl/ApexGirl activos en 2026. Actualizaciones diarias. Obtén recompensas gratis.", keywords: "códigos promo TopGirl, códigos TopGirl 2026, ApexGirl códigos gratis" },
  pt: { title: "Códigos Promo TopGirl 2026 — Códigos Ativos Grátis", description: "Todos os códigos promo TopGirl/ApexGirl ativos em 2026. Atualizações diárias. Obtenha recompensas grátis.", keywords: "códigos promo TopGirl, códigos TopGirl 2026, ApexGirl códigos grátis" },
  pl: { title: "Kody Promo TopGirl 2026 — Aktywne Darmowe Kody", description: "Wszystkie aktywne kody promo TopGirl/ApexGirl w 2026. Codzienne aktualizacje. Zdobądź darmowe nagrody.", keywords: "kody promo TopGirl, kody TopGirl 2026, ApexGirl darmowe kody" },
  id: { title: "Kode Promo TopGirl 2026 — Kode Aktif Gratis", description: "Semua kode promo TopGirl/ApexGirl yang aktif di 2026. Pembaruan harian. Dapatkan reward gratis.", keywords: "kode promo TopGirl, kode TopGirl 2026, ApexGirl kode gratis" },
  ru: { title: "Промокоды TopGirl 2026 — Актуальные Бесплатные Коды", description: "Все актуальные промокоды TopGirl/ApexGirl в 2026. Ежедневные обновления. Получите бесплатные награды.", keywords: "промокоды TopGirl, коды TopGirl 2026, ApexGirl бесплатные коды" },
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
      languages: { fr: `${BASE_URL}/fr/codes/`, en: `${BASE_URL}/en/codes/`, it: `${BASE_URL}/it/codes/`, es: `${BASE_URL}/es/codes/`, pt: `${BASE_URL}/pt/codes/`, pl: `${BASE_URL}/pl/codes/`, id: `${BASE_URL}/id/codes/`, ru: `${BASE_URL}/ru/codes/`, "x-default": `${BASE_URL}/en/codes/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function CodesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <CodesClient lang={lang} />;
}
