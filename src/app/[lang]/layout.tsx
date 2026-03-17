import Link from "next/link";
import type { Metadata } from "next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { BackgroundManager } from "@/components/BackgroundManager";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/react";
import { MobileNav } from "@/components/MobileNav";

const localeNames: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
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
  it: { title: "TopGirl - Guide e Strumenti", description: "Il fansite ufficiale di TopGirl/ApexGirl con guide, strumenti e codici promozionali", keywords: "TopGirl, ApexGirl, guida, tips, codici promozionali" },
  es: { title: "TopGirl - Guías y Herramientas", description: "El fansite oficial de TopGirl/ApexGirl con guías, herramientas y códigos promocionales", keywords: "TopGirl, ApexGirl, guía, tips, códigos promocionales" },
  pt: { title: "TopGirl - Guias e Ferramentas", description: "O fansite oficial da TopGirl/ApexGirl com guias, ferramentas e códigos promocionais", keywords: "TopGirl, ApexGirl, guia, tips, códigos promocionais" },
  pl: { title: "TopGirl - Poradniki i Narzędzia", description: "Nieoficjalny serwis TopGirl/ApexGirl z poradnikami, narzędziami i kodami promocyjnymi", keywords: "TopGirl, ApexGirl, poradnik, tips, kody promocyjne" },
  id: { title: "TopGirl - Panduan dan Alat", description: "Fansite resmi TopGirl/ApexGirl dengan panduan, alat, dan kode promo", keywords: "TopGirl, ApexGirl, panduan, tips, kode promo" },
  ru: { title: "TopGirl - Руководства и Инструменты", description: "Неофициальный фан-сайт TopGirl/ApexGirl с руководствами, инструментами и промокодами", keywords: "TopGirl, ApexGirl, руководство, tips, промокоды" },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const meta = metadataByLang[lang] || metadataByLang.fr;
  
  const alternates: Metadata['alternates'] = {
    languages: {
      fr: "https://apexgirlguide.com/fr",
      en: "https://apexgirlguide.com/en",
      it: "https://apexgirlguide.com/it",
      es: "https://apexgirlguide.com/es",
      pt: "https://apexgirlguide.com/pt",
      pl: "https://apexgirlguide.com/pl",
      id: "https://apexgirlguide.com/id",
      ru: "https://apexgirlguide.com/ru",
      "x-default": "https://apexgirlguide.com/fr",
    },
  };

   return {
     title: meta.title,
     description: meta.description,
     keywords: meta.keywords.split(", "),
     alternates,
     openGraph: {
       title: meta.title,
       description: meta.description,
       url: `https://apexgirlguide.com/${lang}`,
       siteName: "TopGirl",
       locale: localeNames[lang] || "fr-FR",
       type: "website",
     },
     twitter: {
       card: "summary_large_image",
       title: meta.title,
       description: meta.description,
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
    { href: `/${lang}/codes/`, label: lang === "fr" ? "Codes" : lang === "en" ? "Codes" : getNavLabel(lang, "codes") },
    { href: `/${lang}/artists/`, label: lang === "fr" ? "Artistes" : lang === "en" ? "Artists" : getNavLabel(lang, "database") },
    { href: `/${lang}/tierlist/`, label: lang === "fr" ? "Tier List" : "Tier List" },
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
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "TopGirl",
            "url": `https://apexgirlguide.com/${lang}`,
            "description": metadataByLang[lang]?.description || metadataByLang.fr.description,
            "inLanguage": localeNames[lang] || "fr-FR",
            "potentialAction": {
              "@type": "ReadAction",
              "target": `https://apexgirlguide.com/${lang}/guides`
            }
          })
        }}
      />
      <BackgroundManager />
      <a href="#main-content" className="skip-link">
        {lang === "fr" ? "Aller au contenu principal" : "Skip to main content"}
      </a>
      <header className="header" role="banner">
        <div className="header-inner">
          <Link href={`/${lang}/`} className="logo" aria-label="TopGirl - Home">
            <img src="/assets/logo.png" alt="TopGirl" />
            <span>{lang === "fr" ? "Top Girl Guide" : lang === "en" ? "Top Girl Guide" : getNavLabel(lang, "home")}</span>
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
              { lang === "fr" ? "Le fansite non-officiel de TopGirl/ApexGirl par A3Games." : lang === "en" ? "The unofficial fansite for TopGirl/ApexGirl by A3Games." : getFooterText(lang, "title") }
            </p>
            <p className="text-sm text-muted">
              {lang === "fr" ? "Fansite dédié aux joueurs avec guides, outils et codes promo." : lang === "en" ? "Fansite dedicated to players with guides, tools and promo codes." : getFooterText(lang, "subtitle")}
            </p>
          </div>
          <div>
            <h4>{lang === "fr" ? "Navigation" : "Navigation"}</h4>
            <Link href={`/${lang}/`}>{lang === "fr" ? "Accueil" : "Home"}</Link>
            <Link href={`/${lang}/codes/`}>{lang === "fr" ? "Codes" : "Codes"}</Link>
            <Link href={`/${lang}/artists/`}>{lang === "fr" ? "Artistes" : "Artists"}</Link>
            <Link href={`/${lang}/tools/`}>{lang === "fr" ? "Outils" : "Tools"}</Link>
            <Link href={`/${lang}/tierlist/`}>{lang === "fr" ? "Tier List" : lang === "en" ? "Tier List" : getNavLabel(lang, "tierList")}</Link>
          </div>
          <div>
            <h4>{lang === "fr" ? "Ressources" : "Resources"}</h4>
            <Link href={`/${lang}/guides/`}>{lang === "fr" ? "Guides" : "Guides"}</Link>
          </div>
          <div>
            <h4>{lang === "fr" ? "Légal" : "Legal"}</h4>
            <Link href={`/${lang}/mentions-legales`}>{lang === "fr" ? "Mentions Légales" : "Legal Notice"}</Link>
            <Link href={`/${lang}/confidentialite`}>{lang === "fr" ? "Confidentialité" : "Privacy Policy"}</Link>
            <Link href={`/${lang}/cookie-settings`}>{lang === "fr" ? "Cookies" : "Cookies"}</Link>
            <Link href={`/${lang}/contact`}>{lang === "fr" ? "Contact" : lang === "en" ? "Contact" : getFooterText(lang, "contact")}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          {lang === "fr" ? "© 2026 TopGirl Fansite. Tous droits réservés. Ce site est un fansite non officiel." : "© 2026 TopGirl Fansite. All rights reserved. This is an unofficial fansite."}
        </div>
      </footer>
    </>
  );
}

function getFooterText(lang: string, key: string): string {
  const translations: Record<string, Record<string, string>> = {
    it: { home: "Home", codes: "Codici", artists: "Artisti", tools: "Strumenti", tierList: "Tier List", events: "Eventi", guides: "Guide", legal: "Legale", legalNotice: "Note Legali", privacy: "Privacy", cookies: "Cookies", contact: "Contatto", title: "Il fansite non ufficiale di TopGirl/ApexGirl.", subtitle: "Fansite dedicato ai giocatori con guide, strumenti e codici promo.", copyright: "© 2026 TopGirl Fansite. Tutti i diritti riservati. Questo è un fansite non ufficiale." },
    es: { home: "Inicio", codes: "Códigos", artists: "Artistas", tools: "Herramientas", tierList: "Tier List", events: "Eventos", guides: "Guías", legal: "Legal", legalNotice: "Aviso Legal", privacy: "Privacidad", cookies: "Cookies", contact: "Contacto", title: "El fansite no oficial de TopGirl/ApexGirl.", subtitle: "Fansite dedicado a jugadores con guías, herramientas y códigos promo.", copyright: "© 2026 TopGirl Fansite. Todos los derechos reservados. Este es un fansite no oficial." },
    pt: { home: "Início", codes: "Códigos", artists: "Artistas", tools: "Ferramentas", tierList: "Tier List", events: "Eventos", guides: "Guias", legal: "Legal", legalNotice: "Aviso Legal", privacy: "Privacidade", cookies: "Cookies", contact: "Contato", title: "O fansite não oficial da TopGirl/ApexGirl.", subtitle: "Fansite dedicado a jogadores com guias, ferramentas e códigos promo.", copyright: "© 2026 TopGirl Fansite. Todos os direitos reservados. Este é um fansite não oficial." },
    pl: { home: "Strona", codes: "Kody", artists: "Artyści", tools: "Narzędzia", tierList: "Tier List", events: "Wydarzenia", guides: "Poradniki", legal: "Prawne", legalNotice: "Nota Prawna", privacy: "Prywatność", cookies: "Cookies", contact: "Kontakt", title: "Nieoficjalny serwis TopGirl/ApexGirl.", subtitle: "Serwis dla graczy z poradnikami, narzędziami i kodami promocyjnymi.", copyright: "© 2026 TopGirl Fansite. Wszelkie prawa zastrzeżone. To jest nieoficjalny serwis." },
    id: { home: "Beranda", codes: "Kode", artists: "Artis", tools: "Alat", tierList: "Tier List", events: "Acara", guides: "Panduan", legal: "Hukum", legalNotice: "Ketentuan", privacy: "Privasi", cookies: "Cookies", contact: "Kontak", title: "Fansite resmi TopGirl/ApexGirl.", subtitle: "Fansite untuk pemain dengan panduan, alat, dan kode promo.", copyright: "© 2026 TopGirl Fansite. Semua hak dilindungi. Ini adalah fansite tidak resmi." },
    ru: { home: "Главная", codes: "Коды", artists: "Артисты", tools: "Инструменты", tierList: "Tier List", events: "События", guides: "Гайды", legal: "Право", legalNotice: "Юридическая Информация", privacy: "Конфиденциальность", cookies: "Cookies", contact: "Контакт", title: "Неофициальный фан-сайт TopGirl/ApexGirl.", subtitle: "Фан-сайт для игроков с гайдами, инструментами и промокодами.", copyright: "© 2026 TopGirl Fansite. Все права защищены. Это неофициальный фан-сайт." },
  };
  return translations[lang]?.[key] || translations.fr?.[key] || key;
}

function getNavLabel(lang: string, key: string): string {
  const translations: Record<string, Record<string, string>> = {
    it: { home: "Home", database: "Artisti", events: "Eventi", tools: "Strumenti", codes: "Codici", tierList: "Tier List", guides: "Guide" },
    es: { home: "Inicio", database: "Artistas", events: "Eventos", tools: "Herramientas", codes: "Códigos", tierList: "Tier List", guides: "Guías" },
    pt: { home: "Início", database: "Artistas", events: "Eventos", tools: "Ferramentas", codes: "Códigos", tierList: "Tier List", guides: "Guias" },
    pl: { home: "Strona", database: "Artyści", events: "Wydarzenia", tools: "Narzędzia", codes: "Kody", tierList: "Tier List", guides: "Poradniki" },
    id: { home: "Beranda", database: "Artis", events: "Acara", tools: "Alat", codes: "Kode", tierList: "Tier List", guides: "Panduan" },
    ru: { home: "Главная", database: "Артисты", events: "События", tools: "Инструменты", codes: "Коды", tierList: "Tier List", guides: "Гайды" },
  };
  return translations[lang]?.[key] || key;
}
