import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { BackgroundManager } from "@/components/BackgroundManager";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/react";
import { MobileNav } from "@/components/MobileNav";
import { NavVoteWidget } from "@/components/NavVoteWidget";
import { HeaderNav } from "@/components/HeaderNav";
import { getUiStrings } from "@/lib/i18n/ui";

const localeNames: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  de: "de-DE",
  it: "it-IT",
  es: "es-ES",
  pt: "pt-BR",
  pl: "pl-PL",
  id: "id-ID",
  ru: "ru-RU",
};

const metadataByLang: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl - Guide et Outils", description: "Le fansite officiel de TopGirl/ApexGirl avec guides, outils et codes promo", keywords: "TopGirl, ApexGirl, guide, tips, codes promo" },
  en: { title: "TopGirl - Guides & Tools", description: "The official TopGirl/ApexGirl fansite with guides, tools and promo codes", keywords: "TopGirl, ApexGirl, guide, tips, promo codes" },
  de: { title: "TopGirl - Guides & Werkzeuge", description: "Die offizielle TopGirl/ApexGirl Fanseite mit Guides, Werkzeugen und Promo-Codes", keywords: "TopGirl, ApexGirl, guide, tips, promo codes" },
  it: { title: "TopGirl - Guide e Strumenti", description: "Il fansite ufficiale di TopGirl/ApexGirl con guide, strumenti e codici promozionali", keywords: "TopGirl, ApexGirl, guida, tips, codici promozionali" },
  es: { title: "TopGirl - Guías y Herramientas", description: "El fansite oficial de TopGirl/ApexGirl con guías, herramientas y códigos promocionales", keywords: "TopGirl, ApexGirl, guía, tips, códigos promocionales" },
  pt: { title: "TopGirl - Guias e Ferramentas", description: "O fansite oficial da TopGirl/ApexGirl com guias, ferramentas e códigos promocionais", keywords: "TopGirl, ApexGirl, guia, tips, códigos promocionais" },
  pl: { title: "TopGirl - Poradniki i Narzędzia", description: "Nieoficjalny serwis TopGirl/ApexGirl z poradnikami, narzędziami i kodami promocyjnymi", keywords: "TopGirl, ApexGirl, poradnik, tips, kody promocyjne" },
  id: { title: "TopGirl - Panduan dan Alat", description: "Fansite resmi TopGirl/ApexGirl dengan panduan, alat, dan kode promo", keywords: "TopGirl, ApexGirl, panduan, tips, kode promo" },
  ru: { title: "TopGirl - Руководства и Инструменты", description: "Неофициальный фан-сайт TopGirl/ApexGirl с руководствами, инструментами и промокодами", keywords: "TopGirl, ApexGirl, руководство, tips, промокоды" },
};

const BASE_URL = "https://apexgirlguide.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const meta = metadataByLang[lang] || metadataByLang.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.split(", "),
    alternates: {
      canonical: `${BASE_URL}/${lang}/`,
      languages: {
        fr: `${BASE_URL}/fr/`,
        en: `${BASE_URL}/en/`,
        de: `${BASE_URL}/de/`,
        it: `${BASE_URL}/it/`,
        es: `${BASE_URL}/es/`,
        pt: `${BASE_URL}/pt/`,
        pl: `${BASE_URL}/pl/`,
        id: `${BASE_URL}/id/`,
        ru: `${BASE_URL}/ru/`,
        "x-default": `${BASE_URL}/en/`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${lang}/`,
      siteName: "TopGirl Guide",
      locale: localeNames[lang] || "en-US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/${lang}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "TopGirl Guide — Fansite guides, tools & tier list",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/${lang}/opengraph-image`],
    },
    icons: {
      icon: [
        { url: "/assets/favicon.png", sizes: "48x48" },
        { url: "/assets/favicon.png", sizes: "96x96" },
        { url: "/assets/favicon.png", sizes: "192x192" },
        { url: "/assets/favicon.png", sizes: "512x512" },
      ],
      apple: { url: "/assets/favicon.png" },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  return [
    { lang: "fr" }, { lang: "en" }, { lang: "de" },
    { lang: "it" }, { lang: "es" },
    { lang: "pt" }, { lang: "pl" },
    { lang: "id" }, { lang: "ru" }
  ];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  const ui = getUiStrings(lang);
  const navItems = [
    { href: `/${lang}/codes/`, label: ui.nav.codes },
    { href: `/${lang}/teambuilder/`, label: ui.nav.teambuilder },
    { href: `/${lang}/tierlist/`, label: ui.nav.tierList },
    { href: `/${lang}/guides/`, label: ui.nav.guides },
    { href: `/${lang}/tools/`, label: ui.nav.tools, cta: true },
  ];

  const languages = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "de", label: "DE" },
    { code: "it", label: "IT" },
    { code: "es", label: "ES" },
    { code: "pt", label: "PT" },
    { code: "pl", label: "PL" },
    { code: "id", label: "ID" },
    { code: "ru", label: "RU" },
  ];

  return (
    <>
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "TopGirl Guide",
            "url": "https://apexgirlguide.com/",
            "description": metadataByLang[lang]?.description || metadataByLang.en.description,
            "inLanguage": localeNames[lang] || "en-US",
          })
        }}
      />
      <BackgroundManager />
      <a href="#main-content" className="skip-link">
        {ui.skip}
      </a>
      <header className="header" role="banner">
        <div className="header-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Link href={`/${lang}/`} className="logo" aria-label="TopGirl - Home">
              <Image src="/assets/logo.png" alt="TopGirl" width={36} height={36} priority />
              <span>{ui.header.logoTitle}</span>
            </Link>
            <NavVoteWidget lang={lang} />
          </div>
          <HeaderNav lang={lang} items={navItems} />
        </div>
      </header>
      <MobileNav />
      <main id="main-content" className="main-content" role="main" tabIndex={-1}>
        {children}
      </main>
      <CookieConsent />
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div>
            <h4 style={{ background: "linear-gradient(135deg, var(--primary), #ff80ab)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TopGirl</h4>
            <p className="text-sm text-muted" style={{ marginBottom: "16px" }}>
              {ui.footer.title}
            </p>
            <p className="text-sm text-muted">
              {ui.footer.subtitle}
            </p>
            <a
              href="https://buy.stripe.com/aFa4gygO6cqW6kTbqRenS00"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-support"
              style={{
                display: "inline-block",
                marginTop: "16px",
                padding: "10px 24px",
                border: "2px solid #ffd700",
                borderRadius: "8px",
                color: "#ffd700",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                transition: "all 0.2s ease",
              }}
            >
              {ui.footer.support}
            </a>
          </div>
          <div>
            <h4>{ui.footer.navigation}</h4>
            <Link href={`/${lang}/`}>{ui.nav.home}</Link>
            <Link href={`/${lang}/codes/`}>{ui.nav.codes}</Link>
            <Link href={`/${lang}/teambuilder/`}>{ui.nav.teambuilder}</Link>
            <Link href={`/${lang}/tools/`}>{ui.nav.tools}</Link>
            <Link href={`/${lang}/tierlist/`}>{ui.nav.tierList}</Link>
          </div>
          <div>
            <h4>{ui.footer.resources}</h4>
            <Link href={`/${lang}/guides/`}>{ui.nav.guides}</Link>
          </div>
          <div>
            <h4>{ui.footer.legal}</h4>
            <Link href={lang === 'fr' ? `/${lang}/mentions-legales` : `/${lang}/legal-notice`}>{ui.footer.legalNotice}</Link>
            <Link href={lang === 'fr' ? `/${lang}/confidentialite` : `/${lang}/privacy-policy`}>{ui.footer.privacy}</Link>
            <Link href={`/${lang}/cookie-settings`}>{ui.footer.cookies}</Link>
            <Link href={`/${lang}/contact`}>{ui.footer.contact}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          {ui.footer.copyright}
        </div>
      </footer>
    </>
  );
}
