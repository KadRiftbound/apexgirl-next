import Link from "next/link";
import type { Metadata } from "next";
import { LanguageSelector } from "@/components/LanguageSelector";

export const metadata: Metadata = {
  title: "TopGirl - Guide et Outils",
  description: "Le fansite officiel de TopGirl/ApexGirl avec guides, outils et codes promo",
  keywords: ["TopGirl", "ApexGirl", "guide", "tips", "codes promo"],
};

export async function generateStaticParams() {
  return [
    { lang: "fr" }, { lang: "en" },
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
  
  const navItems = [
    { href: `/${lang}/`, label: lang === "fr" ? "Accueil" : lang === "en" ? "Home" : getNavLabel(lang, "home") },
    { href: `/${lang}/database/`, label: lang === "fr" ? "Artistes" : lang === "en" ? "Artists" : getNavLabel(lang, "database") },
    { href: `/${lang}/tierlist/`, label: lang === "fr" ? "Tier List" : "Tier List" },
    { href: `/${lang}/events/`, label: lang === "fr" ? "Événements" : lang === "en" ? "Events" : getNavLabel(lang, "events") },
    { href: `/${lang}/guides/`, label: lang === "fr" ? "Guides" : "Guides" },
    { href: `/${lang}/tools/`, label: lang === "fr" ? "Outils" : lang === "en" ? "Tools" : getNavLabel(lang, "tools"), cta: true },
  ];

  const languages = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "it", label: "IT" },
    { code: "es", label: "ES" },
    { code: "pt", label: "PT" },
    { code: "pl", label: "PL" },
    { code: "id", label: "ID" },
    { code: "ru", label: "RU" },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        {lang === "fr" ? "Aller au contenu principal" : "Skip to main content"}
      </a>
      <header className="header" role="banner">
        <div className="header-inner">
          <Link href={`/${lang}/`} className="logo" aria-label="TopGirl - Home">
            <img src="/assets/images/logo.png" alt="TopGirl" />
            <span>TopGirl</span>
          </Link>
          <nav className="nav" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={item.cta ? "nav-cta" : ""}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSelector currentLang={lang} />
          </nav>
        </div>
      </header>
      <main id="main-content" className="main-content" role="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div>
            <h4 style={{ background: "linear-gradient(135deg, var(--primary), #ff80ab)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TopGirl</h4>
            <p className="text-sm text-muted" style={{ marginBottom: "16px" }}>
              {lang === "fr" ? "Le fansite non-officiel de TopGirl/ApexGirl par A3Games." : lang === "en" ? "The unofficial fansite for TopGirl/ApexGirl by A3Games." : getFooterText(lang, "title")}
            </p>
            <p className="text-sm text-muted">
              {lang === "fr" ? "Fansite dédié aux joueurs avec guides, outils et codes promo." : lang === "en" ? "Fansite dedicated to players with guides, tools and promo codes." : getFooterText(lang, "subtitle")}
            </p>
          </div>
          <div>
            <h4>{lang === "fr" ? "Navigation" : "Navigation"}</h4>
            <Link href={`/${lang}/`}>{lang === "fr" ? "Accueil" : "Home"}</Link>
            <Link href={`/${lang}/database/`}>{lang === "fr" ? "Artistes" : "Artists"}</Link>
            <Link href={`/${lang}/guides/`}>Guides</Link>
            <Link href={`/${lang}/tools/`}>{lang === "fr" ? "Outils" : "Tools"}</Link>
            <Link href={`/${lang}/tierlist/`}>Tier List</Link>
          </div>
          <div>
            <h4>{lang === "fr" ? "Ressources" : "Resources"}</h4>
            <Link href={`/${lang}/events/`}>{lang === "fr" ? "Événements" : "Events"}</Link>
            <a href="#">{lang === "fr" ? "Codes Promo" : "Promo Codes"}</a>
            <a href="#">{lang === "fr" ? "Actualités" : "News"}</a>
          </div>
          <div>
            <h4>{lang === "fr" ? "Légal" : "Legal"}</h4>
            <a href="#">{lang === "fr" ? "Mentions Légales" : "Terms of Service"}</a>
            <a href="#">{lang === "fr" ? "Confidentialité" : "Privacy Policy"}</a>
            <a href="#">{lang === "fr" ? "Contact" : "Contact"}</a>
          </div>
        </div>
        <div className="footer-bottom">
          {lang === "fr" ? "© 2026 TopGirl Fansite. Tous droits réservés. Ce site est un fansite non officiel." : "© 2026 TopGirl Fansite. All rights reserved. This is an unofficial fansite."}
        </div>
      </footer>
    </>
  );
}

function getNavLabel(lang: string, key: string): string {
  const translations: Record<string, Record<string, string>> = {
    it: { home: "Home", database: "Artisti", events: "Eventi", tools: "Strumenti" },
    es: { home: "Inicio", database: "Artistas", events: "Eventos", tools: "Herramientas" },
    pt: { home: "Início", database: "Artistas", events: "Eventos", tools: "Ferramentas" },
    pl: { home: "Strona", database: "Artyści", events: "Wydarzenia", tools: "Narzędzia" },
    id: { home: "Beranda", database: "Artis", events: "Acara", tools: "Alat" },
    ru: { home: "Главная", database: "Артисты", events: "События", tools: "Инструменты" },
  };
  return translations[lang]?.[key] || key;
}

function getFooterText(lang: string, key: string): string {
  const translations: Record<string, Record<string, string>> = {
    it: { title: "Il fansite non ufficiale di TopGirl/ApexGirl di A3Games.", subtitle: "Fansite dedicato ai giocatori con guide, strumenti e codici promozionali." },
    es: { title: "El fansite no oficial de TopGirl/ApexGirl por A3Games.", subtitle: "Fansite dedicado a jugadores con guías, herramientas y códigos promocionales." },
    pt: { title: "O fansite não oficial da TopGirl/ApexGirl pela A3Games.", subtitle: "Fansite dedicado a jogadores com guias, ferramentas e códigos promocionais." },
    pl: { title: "Nieoficjalny serwis fanowski TopGirl/ApexGirl stworzony przez A3Games.", subtitle: "Serwis dla graczy z przewodnikami, narzędziami i kodami promocyjnymi." },
    id: { title: "Fansite tidak resmi untuk TopGirl/ApexGirl oleh A3Games.", subtitle: "Fansite untuk pemain dengan panduan, alat, dan kode promo." },
    ru: { title: "Неофициальный фан-сайт TopGirl/ApexGirl от A3Games.", subtitle: "Фан-сайт для игроков с гайдами, инструментами и промокодами." },
  };
  return translations[lang]?.[key] || "";
}
