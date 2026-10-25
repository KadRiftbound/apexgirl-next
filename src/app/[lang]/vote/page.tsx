import type { Metadata } from "next";
import VoteClient from "./VoteClient";
import { Breadcrumb } from "@/components/Breadcrumb";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string; eyebrow: string; h1: string; sub: string }> = {
  fr: { title: "Vote TopGirl — Votre artiste préférée de la semaine", description: "Votez chaque jour pour votre artiste TopGirl/ApexGirl préférée. Podium et classement complet de la communauté, remis à zéro chaque semaine.", keywords: "TopGirl vote, artiste préférée TopGirl, classement communauté ApexGirl, Idol Company vote", eyebrow: "Communauté", h1: "Votez pour votre artiste préférée", sub: "Un vote par jour. Le podium de la semaine est affiché partout sur le site." },
  en: { title: "TopGirl Vote — Your favorite artist of the week", description: "Vote every day for your favorite TopGirl/ApexGirl artist. Community podium and full ranking, reset every week.", keywords: "TopGirl vote, favorite TopGirl artist, ApexGirl community ranking, Idol Company vote", eyebrow: "Community", h1: "Vote for your favorite artist", sub: "One vote a day. The podium of the week is shown across the site." },
  id: { title: "Vote TopGirl — Artis favoritmu minggu ini", description: "Pilih setiap hari artis TopGirl/ApexGirl favoritmu. Podium dan peringkat lengkap komunitas, diatur ulang setiap minggu.", keywords: "TopGirl vote, artis favorit TopGirl, peringkat komunitas ApexGirl, Idol Company vote", eyebrow: "Komunitas", h1: "Pilih artis favoritmu", sub: "Satu suara per hari. Podium minggu ini ditampilkan di seluruh situs." },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  const canonical = `${BASE_URL}/${lang}/vote/`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(", "),
    alternates: {
      canonical,
      languages: { fr: `${BASE_URL}/fr/vote/`, en: `${BASE_URL}/en/vote/`, id: `${BASE_URL}/id/vote/`, "x-default": `${BASE_URL}/en/vote/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function VotePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  return (
    <div className="page page-narrow" style={{ paddingTop: 8 }}>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Vote", href: "/vote/" }]} lang={lang} />
      <header className="page-head">
        <span className="eyebrow">{m.eyebrow}</span>
        <h1 className="page-head-title">{m.h1}</h1>
      </header>
      <VoteClient lang={lang} />
    </div>
  );
}
