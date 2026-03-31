import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";
import { Breadcrumb } from "@/components/Breadcrumb";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Outils — Calculateur, Team Builder & Plus", description: "Outils gratuits pour TopGirl/ApexGirl/Idol Company : calculateur de stats Chant/Danse/Management, team builder, optimiseur d'équipement.", keywords: "TopGirl outils, calculateur TopGirl, team builder ApexGirl, Idol Company outils, stats TopGirl" },
  en: { title: "TopGirl Tools — Calculator, Team Builder & More", description: "Free tools for TopGirl/ApexGirl/Idol Company: Sing/Dance/Management stats calculator, team builder, equipment optimizer.", keywords: "TopGirl tools, TopGirl calculator, ApexGirl team builder, Idol Company tools, TopGirl stats" },
  de: { title: "TopGirl Werkzeuge — Rechner, Team-Builder & Mehr", description: "Kostenlose Werkzeuge für TopGirl/ApexGirl/Idol Company: Gesang/Tanz/Management Stats-Rechner, Team-Builder, Ausrüstungs-Optimierer.", keywords: "TopGirl Werkzeuge, TopGirl Rechner, ApexGirl Team-Builder, Idol Company Werkzeuge" },
  it: { title: "TopGirl Strumenti — Calcolatore, Team Builder e altro", description: "Strumenti gratuiti per TopGirl/ApexGirl/Idol Company: calcolatore di statistiche Canto/Danza/Management, team builder.", keywords: "TopGirl strumenti, calcolatore TopGirl, team builder ApexGirl, Idol Company strumenti" },
  es: { title: "TopGirl Herramientas — Calculadora, Team Builder y más", description: "Herramientas gratuitas para TopGirl/ApexGirl/Idol Company: calculadora de stats Canto/Baile/Management, team builder.", keywords: "TopGirl herramientas, calculadora TopGirl, team builder ApexGirl, Idol Company herramientas" },
  pt: { title: "TopGirl Ferramentas — Calculadora, Team Builder e mais", description: "Ferramentas gratuitas para TopGirl/ApexGirl/Idol Company: calculadora de stats Canto/Dança/Management, team builder.", keywords: "TopGirl ferramentas, calculadora TopGirl, team builder ApexGirl, Idol Company ferramentas" },
  pl: { title: "TopGirl Narzędzia — Kalkulator, Team Builder i więcej", description: "Darmowe narzędzia dla TopGirl/ApexGirl/Idol Company: kalkulator statystyk Śpiew/Taniec/Management, team builder.", keywords: "TopGirl narzędzia, kalkulator TopGirl, team builder ApexGirl, Idol Company narzędzia" },
  id: { title: "TopGirl Alat — Kalkulator, Team Builder & Lainnya", description: "Alat gratis untuk TopGirl/ApexGirl/Idol Company: kalkulator stat Nyanyi/Tari/Management, team builder.", keywords: "TopGirl alat, kalkulator TopGirl, team builder ApexGirl, Idol Company alat" },
  ru: { title: "TopGirl Инструменты — Калькулятор, Team Builder и другое", description: "Бесплатные инструменты для TopGirl/ApexGirl/Idol Company: калькулятор статов Пения/Танцев/Management, team builder.", keywords: "TopGirl инструменты, калькулятор TopGirl, team builder ApexGirl, Idol Company инструменты" },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  const canonical = `${BASE_URL}/${lang}/tools/`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(", "),
    alternates: {
      canonical,
      languages: { fr: `${BASE_URL}/fr/tools/`, en: `${BASE_URL}/en/tools/`, de: `${BASE_URL}/de/tools/`, it: `${BASE_URL}/it/tools/`, es: `${BASE_URL}/es/tools/`, pt: `${BASE_URL}/pt/tools/`, pl: `${BASE_URL}/pl/tools/`, id: `${BASE_URL}/id/tools/`, ru: `${BASE_URL}/ru/tools/`, "x-default": `${BASE_URL}/en/tools/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function ToolsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools/' }]} lang={lang} />
      </div>
      <ToolsClient lang={lang} />
    </>
  );
}
