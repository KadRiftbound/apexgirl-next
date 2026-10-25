import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";
import { Poppins, Outfit } from "next/font/google";
import "../globals.css";
import { BackgroundManager } from "@/components/BackgroundManager";
import { Analytics } from "@vercel/analytics/react";
import { MobileNav } from "@/components/MobileNav";
import { NavVoteWidget } from "@/components/NavVoteWidget";
import { HeaderNav } from "@/components/HeaderNav";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SidebarToggle } from "@/components/SidebarToggle";
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
  fr: { title: "TopGirl - Guide et Outils", description: "Le fansite non officiel de TopGirl/ApexGirl/Idol Company avec guides, outils et codes promo", keywords: "TopGirl, ApexGirl, Idol Company, guide, tips, codes promo" },
  en: { title: "TopGirl - Guides & Tools", description: "The unofficial TopGirl/ApexGirl/Idol Company fansite with guides, tools and promo codes", keywords: "TopGirl, ApexGirl, Idol Company, guide, tips, promo codes" },
  de: { title: "TopGirl - Guides & Werkzeuge", description: "Die inoffizielle TopGirl/ApexGirl/Idol Company Fanseite mit Guides, Werkzeugen und Promo-Codes", keywords: "TopGirl, ApexGirl, Idol Company, guide, tips, promo codes" },
  it: { title: "TopGirl - Guide e Strumenti", description: "Il fansite non ufficiale di TopGirl/ApexGirl/Idol Company con guide, strumenti e codici promozionali", keywords: "TopGirl, ApexGirl, Idol Company, guida, tips, codici promozionali" },
  es: { title: "TopGirl - Guías y Herramientas", description: "El fansite no oficial de TopGirl/ApexGirl/Idol Company con guías, herramientas y códigos promocionales", keywords: "TopGirl, ApexGirl, Idol Company, guía, tips, códigos promocionales" },
  pt: { title: "TopGirl - Guias e Ferramentas", description: "O fansite não oficial da TopGirl/ApexGirl/Idol Company com guias, ferramentas e códigos promocionais", keywords: "TopGirl, ApexGirl, Idol Company, guia, tips, códigos promocionais" },
  pl: { title: "TopGirl - Poradniki i Narzędzia", description: "Nieoficjalny serwis TopGirl/ApexGirl/Idol Company z poradnikami, narzędziami i kodami promocyjnymi", keywords: "TopGirl, ApexGirl, Idol Company, poradnik, tips, kody promocyjne" },
  id: { title: "TopGirl - Panduan dan Alat", description: "Fansite tidak resmi TopGirl/ApexGirl/Idol Company dengan panduan, alat, dan kode promo", keywords: "TopGirl, ApexGirl, Idol Company, panduan, tips, kode promo" },
  ru: { title: "TopGirl - Руководства и Инструменты", description: "Неофициальный фан-сайт TopGirl/ApexGirl/Idol Company с руководствами, инструментами и промокодами", keywords: "TopGirl, ApexGirl, Idol Company, руководство, tips, промокоды" },
};

const BASE_URL = "https://apexgirlguide.com";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const meta = metadataByLang[lang] || metadataByLang.en;

  return {
    metadataBase: new URL(BASE_URL),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.split(", "),
    authors: [{ name: "TopGirl Guide" }],
    creator: "TopGirl Guide",
    publisher: "TopGirl Guide",
    alternates: {
      canonical: `${BASE_URL}/${lang}/`,
      languages: {
        fr: `${BASE_URL}/fr/`,
        en: `${BASE_URL}/en/`,
        id: `${BASE_URL}/id/`,
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
          url: `${BASE_URL}/${lang}/opengraph-image/`,
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
      images: [`${BASE_URL}/${lang}/opengraph-image/`],
    },
    icons: {
      icon: [
        { url: "/icon.png", sizes: "192x192", type: "image/png" },
        { url: "/assets/logositenew.png", sizes: "512x512", type: "image/png" },
      ],
      apple: { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      shortcut: ["/icon.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  return [
    { lang: "fr" }, { lang: "en" }, { lang: "id" }
  ];
}

const SUPPORTED_LANGS = ["fr", "en", "id"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang)) notFound();

  const ui = getUiStrings(lang);
  const groupLabels = lang === "fr" ? { tools: "Outils", content: "Contenu" } : lang === "id" ? { tools: "Alat", content: "Konten" } : { tools: "Tools", content: "Content" };
  const navItems = [
    { key: "home", href: `/${lang}/`, label: ui.nav.home, group: "" },
    { key: "teambuilder", href: `/${lang}/teambuilder/`, label: ui.nav.teambuilder, group: groupLabels.tools },
    { key: "tierlist", href: `/${lang}/tierlist/`, label: ui.nav.tierList, group: groupLabels.tools },
    { key: "vote", href: `/${lang}/vote/`, label: ui.nav.vote, group: groupLabels.tools },
    { key: "guides", href: `/${lang}/guides/`, label: ui.nav.guides, group: groupLabels.content },
    { key: "codes", href: `/${lang}/codes/`, label: ui.nav.codes, group: groupLabels.content },
  ];

  return (
    <html lang={lang} suppressHydrationWarning className={`${poppins.variable} ${outfit.variable}`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5737915177617454" />
        {/* Restore the collapsed sidebar before first paint (desktop only) */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('sidebar')==='collapsed')document.documentElement.dataset.sidebar='collapsed'}catch(e){}",
          }}
        />
      </head>
      <body>
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "TopGirl Guide",
            "alternateName": "Top Girl Guide",
            "url": "https://apexgirlguide.com/",
            "description": metadataByLang[lang]?.description || metadataByLang.en.description,
            "inLanguage": localeNames[lang] || "en-US",
            "sameAs": ["https://play.google.com/store/apps/details?id=com.a3.topgirl"],
          })
        }}
      />
      <BackgroundManager />
      <a href="#main-content" className="skip-link">
        {ui.skip}
      </a>
      <aside className="sidebar" role="banner">
        <SidebarToggle labelCollapse={lang === "fr" ? "Réduire le menu" : lang === "id" ? "Perkecil menu" : "Collapse menu"} labelExpand={lang === "fr" ? "Agrandir le menu" : lang === "id" ? "Perbesar menu" : "Expand menu"} />
        <Link href={`/${lang}/`} className="logo" aria-label="TopGirl - Home">
          <Image src="/assets/logositenew.png" alt="" width={36} height={36} priority />
          <span>TopGirl<em>Guide</em></span>
        </Link>
        <HeaderNav lang={lang} items={navItems} />
        <div className="sidebar-foot">
          <NavVoteWidget lang={lang} />
          <LanguageSelector currentLang={lang} />
        </div>
      </aside>
      <MobileNav />
      <main id="main-content" className="main-content" role="main" tabIndex={-1}>
        {children}
      </main>
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

          </div>
          <div>
            <h4>{ui.footer.navigation}</h4>
            <Link href={`/${lang}/`}>{ui.nav.home}</Link>
            <Link href={`/${lang}/teambuilder/`}>{ui.nav.teambuilder}</Link>
            <Link href={`/${lang}/tierlist/`}>{ui.nav.tierList}</Link>
            <Link href={`/${lang}/vote/`}>{ui.nav.vote}</Link>
            <Link href={`/${lang}/codes/`}>{ui.nav.codes}</Link>
          </div>
          <div>
            <h4>{ui.footer.resources}</h4>
            <Link href={`/${lang}/guides/`}>{ui.nav.guides}</Link>
            <Link href={`/${lang}/methodology/`}>{lang === "fr" ? "Methodologie" : "Methodology"}</Link>
            <Link href={`/${lang}/editorial-policy/`}>{lang === "fr" ? "Politique editoriale" : "Editorial Policy"}</Link>
            <Link href={`/${lang}/about/`}>{lang === "fr" ? "A propos" : "About"}</Link>
            <a href="https://buy.stripe.com/aFa4gygO6cqW6kTbqRenS00" target="_blank" rel="noopener noreferrer">{ui.footer.support}</a>
          </div>
          <div>
            <h4>{ui.footer.legal}</h4>
            <Link href={lang === 'fr' ? `/${lang}/mentions-legales/` : `/${lang}/legal-notice/`}>{ui.footer.legalNotice}</Link>
            <Link href={lang === 'fr' ? `/${lang}/confidentialite/` : `/${lang}/privacy-policy/`}>{ui.footer.privacy}</Link>
            <Link href={`/${lang}/cookie-settings/`}>{ui.footer.cookies}</Link>
            <Link href={`/${lang}/contact/`}>{ui.footer.contact}</Link>
            <Link href={`/${lang}/corrections/`}>{lang === "fr" ? "Corrections" : "Corrections"}</Link>
            <Link href={`/${lang}/advertising-disclosure/`}>{lang === "fr" ? "Transparence pub" : "Ad Disclosure"}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          {ui.footer.copyright}
          <div className="footer-lang"><LanguageSelector currentLang={lang} /></div>
        </div>
      </footer>
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Y082CPMLKJ"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', {
                ad_storage: 'granted',
                analytics_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
              });
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500,
                region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH']
              });
              gtag('config', 'G-Y082CPMLKJ');
            `,
          }}
        />
        <Script
          id="adsense"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5737915177617454"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
