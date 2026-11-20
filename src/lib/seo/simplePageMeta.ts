import type { Metadata } from "next";

const BASE_URL = "https://apexgirlguide.com";
const LANGS = ["fr", "en", "id"] as const;
type Lang = (typeof LANGS)[number];

type PageKey = "contact" | "legal" | "privacy";

// Slug of each page per language (legal pages have a French-specific URL).
const slugs: Record<PageKey, Record<Lang, string>> = {
  contact: { fr: "contact", en: "contact", id: "contact" },
  legal: { fr: "mentions-legales", en: "legal-notice", id: "legal-notice" },
  privacy: { fr: "confidentialite", en: "privacy-policy", id: "privacy-policy" },
};

const texts: Record<PageKey, Record<Lang, { title: string; description: string }>> = {
  contact: {
    fr: { title: "Contact — TopGirl Guide", description: "Contactez l'équipe de TopGirl Guide : question, correction d'un guide, suggestion ou partenariat. Réponse sous 48 heures." },
    en: { title: "Contact — TopGirl Guide", description: "Contact the TopGirl Guide team: questions, guide corrections, suggestions or partnerships. We usually reply within 48 hours." },
    id: { title: "Kontak — TopGirl Guide", description: "Hubungi tim TopGirl Guide: pertanyaan, koreksi panduan, saran, atau kerja sama. Biasanya dibalas dalam 48 jam." },
  },
  legal: {
    fr: { title: "Mentions légales — TopGirl Guide", description: "Mentions légales de TopGirl Guide, fansite non officiel de TopGirl / ApexGirl : éditeur, hébergeur et propriété intellectuelle." },
    en: { title: "Legal Notice — TopGirl Guide", description: "Legal notice for TopGirl Guide, an unofficial TopGirl / ApexGirl fansite: publisher, hosting provider and intellectual property." },
    id: { title: "Informasi Hukum — TopGirl Guide", description: "Informasi hukum TopGirl Guide, fansite tidak resmi TopGirl / ApexGirl: penerbit, penyedia hosting, dan hak kekayaan intelektual." },
  },
  privacy: {
    fr: { title: "Politique de confidentialité — TopGirl Guide", description: "Politique de confidentialité de TopGirl Guide : données collectées, cookies, publicité et vos droits." },
    en: { title: "Privacy Policy — TopGirl Guide", description: "TopGirl Guide privacy policy: data we collect, cookies, advertising and your rights." },
    id: { title: "Kebijakan Privasi — TopGirl Guide", description: "Kebijakan privasi TopGirl Guide: data yang dikumpulkan, cookie, iklan, dan hak Anda." },
  },
};

/** Own title, description, canonical and hreflang for pages that otherwise inherit the home page's. */
export function simplePageMeta(page: PageKey, lang: string): Metadata {
  const l = (LANGS as readonly string[]).includes(lang) ? (lang as Lang) : "en";
  const url = (x: Lang) => `${BASE_URL}/${x}/${slugs[page][x]}/`;
  const t = texts[page][l];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: url(l),
      languages: { fr: url("fr"), en: url("en"), id: url("id"), "x-default": url("en") },
    },
    openGraph: { title: t.title, description: t.description, url: url(l), siteName: "TopGirl Guide", type: "website" },
  };
}
