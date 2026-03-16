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

const pageTitles: Record<string, Record<string, { title: string; description: string; keywords: string }>> = {
  fr: {
    "/fr": { title: "TopGirl - Guide et Outils", description: "Le fansite officiel de TopGirl/ApexGirl avec guides, outils et codes promo", keywords: "TopGirl, ApexGirl, guide, tips, codes promo" },
    "/fr/codes": { title: "Codes Promo - TopGirl", description: "Tous les codes promo disponibles pour TopGirl/ApexGirl. Utilisez nos codes pour obtenir des gemmes et des récompenses gratuites.", keywords: "codes promo, TopGirl, ApexGirl, gemmes, gratuit" },
    "/fr/artists": { title: "Artistes - TopGirl", description: "Découvrez toutes les artistes de TopGirl/ApexGirl avec leurs statistiques et compétences.", keywords: "TopGirl, ApexGirl, artistes, personnages, database" },
    "/fr/tierlist": { title: "Tier List - TopGirl", description: "La tier list complète des meilleures artistes de TopGirl/ApexGirl.", keywords: "tier list, TopGirl, ApexGirl, meilleures artistes" },
    "/fr/guides": { title: "Guides - TopGirl", description: "Tous nos guides pour TopGirl/ApexGirl. Apprenez à jouer et à optimiser vos équipes.", keywords: "guides, TopGirl, ApexGirl, tips, tutoriels" },
    "/fr/tools": { title: "Outils - TopGirl", description: "Outils et calculateurs pour TopGirl/ApexGirl.", keywords: "outils, TopGirl, ApexGirl, calculateur" },
    "/fr/contact": { title: "Contact - TopGirl", description: "Contactez-nous pour toute question sur TopGirl/ApexGirl.", keywords: "contact, TopGirl, ApexGirl" },
    "/fr/mentions-legales": { title: "Mentions Légales - TopGirl", description: "Mentions légales du fansite TopGirl/ApexGirl.", keywords: "mentions légales, TopGirl" },
    "/fr/confidentialite": { title: "Confidentialité - TopGirl", description: "Politique de confidentialité du fansite TopGirl/ApexGirl.", keywords: "confidentialité, privacy, TopGirl" },
    "/fr/cookie-settings": { title: "Paramètres Cookies - TopGirl", description: "Gérez vos préférences de cookies sur TopGirl.", keywords: "cookies, TopGirl" },
  },
  en: {
    "/en": { title: "TopGirl - Guides & Tools", description: "The official TopGirl/ApexGirl fansite with guides, tools and promo codes", keywords: "TopGirl, ApexGirl, guide, tips, promo codes" },
    "/en/codes": { title: "Promo Codes - TopGirl", description: "All available promo codes for TopGirl/ApexGirl. Use our codes to get free gems and rewards.", keywords: "promo codes, TopGirl, ApexGirl, gems, free" },
    "/en/artists": { title: "Artists - TopGirl", description: "Discover all artists in TopGirl/ApexGirl with their stats and skills.", keywords: "TopGirl, ApexGirl, artists, characters, database" },
    "/en/tierlist": { title: "Tier List - TopGirl", description: "Complete tier list of the best artists in TopGirl/ApexGirl.", keywords: "tier list, TopGirl, ApexGirl, best artists" },
    "/en/guides": { title: "Guides - TopGirl", description: "All our guides for TopGirl/ApexGirl. Learn how to play and optimize your teams.", keywords: "guides, TopGirl, ApexGirl, tips, tutorials" },
    "/en/tools": { title: "Tools - TopGirl", description: "Tools and calculators for TopGirl/ApexGirl.", keywords: "tools, TopGirl, ApexGirl, calculator" },
    "/en/contact": { title: "Contact - TopGirl", description: "Contact us for any question about TopGirl/ApexGirl.", keywords: "contact, TopGirl, ApexGirl" },
    "/en/mentions-legales": { title: "Legal Notice - TopGirl", description: "Legal notice for the TopGirl/ApexGirl fansite.", keywords: "legal notice, TopGirl" },
    "/en/confidentialite": { title: "Privacy Policy - TopGirl", description: "Privacy policy for the TopGirl/ApexGirl fansite.", keywords: "privacy, policy, TopGirl" },
    "/en/cookie-settings": { title: "Cookie Settings - TopGirl", description: "Manage your cookie preferences on TopGirl.", keywords: "cookies, TopGirl" },
  },
  it: {
    "/it": { title: "TopGirl - Guide e Strumenti", description: "Il fansite ufficiale di TopGirl/ApexGirl con guide, strumenti e codici promozionali", keywords: "TopGirl, ApexGirl, guida, tips, codici promozionali" },
    "/it/codes": { title: "Codici Promo - TopGirl", description: "Tutti i codici promozionali disponibili per TopGirl/ApexGirl.", keywords: "codici promo, TopGirl, ApexGirl, gemme, gratis" },
    "/it/artists": { title: "Artisti - TopGirl", description: "Scopri tutti gli artisti di TopGirl/ApexGirl con statistiche e abilità.", keywords: "TopGirl, ApexGirl, artisti, personaggi" },
    "/it/tierlist": { title: "Tier List - TopGirl", description: "Tier list completa dei migliori artisti di TopGirl/ApexGirl.", keywords: "tier list, TopGirl, ApexGirl" },
    "/it/guides": { title: "Guide - TopGirl", description: "Tutte le nostre guide per TopGirl/ApexGirl.", keywords: "guide, TopGirl, ApexGirl, tips" },
    "/it/tools": { title: "Strumenti - TopGirl", description: "Strumenti e calcolatori per TopGirl/ApexGirl.", keywords: "strumenti, TopGirl, ApexGirl" },
    "/it/contact": { title: "Contatto - TopGirl", description: "Contattaci per qualsiasi domanda su TopGirl/ApexGirl.", keywords: "contatto, TopGirl, ApexGirl" },
    "/it/mentions-legales": { title: "Note Legali - TopGirl", description: "Note legali del fansite TopGirl/ApexGirl.", keywords: "note legali, TopGirl" },
    "/it/confidentialite": { title: "Privacy - TopGirl", description: "Politica di privacy del fansite TopGirl/ApexGirl.", keywords: "privacy, TopGirl" },
    "/it/cookie-settings": { title: "Impostazioni Cookie - TopGirl", description: "Gestisci le tue preferenze sui cookie.", keywords: "cookies, TopGirl" },
  },
  es: {
    "/es": { title: "TopGirl - Guías y Herramientas", description: "El fansite oficial de TopGirl/ApexGirl con guías, herramientas y códigos promocionales", keywords: "TopGirl, ApexGirl, guía, tips, códigos promocionales" },
    "/es/codes": { title: "Códigos Promo - TopGirl", description: "Todos los códigos promocionales disponibles para TopGirl/ApexGirl.", keywords: "códigos promo, TopGirl, ApexGirl, gemas, gratis" },
    "/es/artists": { title: "Artistas - TopGirl", description: "Descubre todos los artistas de TopGirl/ApexGirl con sus estadísticas.", keywords: "TopGirl, ApexGirl, artistas, personajes" },
    "/es/tierlist": { title: "Tier List - TopGirl", description: "Tier list completa de los mejores artistas de TopGirl/ApexGirl.", keywords: "tier list, TopGirl, ApexGirl" },
    "/es/guides": { title: "Guías - TopGirl", description: "Todas nuestras guías para TopGirl/ApexGirl.", keywords: "guías, TopGirl, ApexGirl, tips" },
    "/es/tools": { title: "Herramientas - TopGirl", description: "Herramientas y calculadoras para TopGirl/ApexGirl.", keywords: "herramientas, TopGirl, ApexGirl" },
    "/es/contact": { title: "Contacto - TopGirl", description: "Contáctanos para cualquier pregunta sobre TopGirl/ApexGirl.", keywords: "contacto, TopGirl, ApexGirl" },
    "/es/mentions-legales": { title: "Aviso Legal - TopGirl", description: "Aviso legal del fansite TopGirl/ApexGirl.", keywords: "aviso legal, TopGirl" },
    "/es/confidentialite": { title: "Privacidad - TopGirl", description: "Política de privacidad del fansite TopGirl/ApexGirl.", keywords: "privacidad, TopGirl" },
    "/es/cookie-settings": { title: "Configuración de Cookies - TopGirl", description: "Gestiona tus preferencias de cookies.", keywords: "cookies, TopGirl" },
  },
  pt: {
    "/pt": { title: "TopGirl - Guias e Ferramentas", description: "O fansite oficial da TopGirl/ApexGirl com guias, ferramentas e códigos promocionais", keywords: "TopGirl, ApexGirl, guia, tips, códigos promocionais" },
    "/pt/codes": { title: "Códigos Promo - TopGirl", description: "Todos os códigos promocionais disponíveis para TopGirl/ApexGirl.", keywords: "códigos promo, TopGirl, ApexGirl, gemas, gratis" },
    "/pt/artists": { title: "Artistas - TopGirl", description: "Descubra todos os artistas de TopGirl/ApexGirl com suas estatísticas.", keywords: "TopGirl, ApexGirl, artistas, personagens" },
    "/pt/tierlist": { title: "Tier List - TopGirl", description: "Tier list completa das melhores artistas de TopGirl/ApexGirl.", keywords: "tier list, TopGirl, ApexGirl" },
    "/pt/guides": { title: "Guias - TopGirl", description: "Todos os nossos guias para TopGirl/ApexGirl.", keywords: "guias, TopGirl, ApexGirl, tips" },
    "/pt/tools": { title: "Ferramentas - TopGirl", description: "Ferramentas e calculadoras para TopGirl/ApexGirl.", keywords: "ferramentas, TopGirl, ApexGirl" },
    "/pt/contact": { title: "Contato - TopGirl", description: "Entre em contato conosco para qualquer dúvida sobre TopGirl/ApexGirl.", keywords: "contato, TopGirl, ApexGirl" },
    "/pt/mentions-legales": { title: "Aviso Legal - TopGirl", description: "Aviso legal do fansite TopGirl/ApexGirl.", keywords: "aviso legal, TopGirl" },
    "/pt/confidentialite": { title: "Privacidade - TopGirl", description: "Política de privacidade do fansite TopGirl/ApexGirl.", keywords: "privacidade, TopGirl" },
    "/pt/cookie-settings": { title: "Configurações de Cookies - TopGirl", description: "Gerencie suas preferências de cookies.", keywords: "cookies, TopGirl" },
  },
  pl: {
    "/pl": { title: "TopGirl - Poradniki i Narzędzia", description: "Nieoficjalny serwis TopGirl/ApexGirl z poradnikami, narzędziami i kodami promocyjnymi", keywords: "TopGirl, ApexGirl, poradnik, tips, kody promocyjne" },
    "/pl/codes": { title: "Kody Promo - TopGirl", description: "Wszystkie dostępne kody promocyjne dla TopGirl/ApexGirl.", keywords: "kody promo, TopGirl, ApexGirl, klejnoty, darmowe" },
    "/pl/artists": { title: "Artyści - TopGirl", description: "Odkryj wszystkich artystów w TopGirl/ApexGirl z ich statystykami.", keywords: "TopGirl, ApexGirl, artyści, postacie" },
    "/pl/tierlist": { title: "Tier List - TopGirl", description: "Kompletna tier list najlepszych artystów w TopGirl/ApexGirl.", keywords: "tier list, TopGirl, ApexGirl" },
    "/pl/guides": { title: "Poradniki - TopGirl", description: "Wszystkie nasze poradniki dla TopGirl/ApexGirl.", keywords: "poradniki, TopGirl, ApexGirl, tips" },
    "/pl/tools": { title: "Narzędzia - TopGirl", description: "Narzędzia i kalkulatory dla TopGirl/ApexGirl.", keywords: "narzędzia, TopGirl, ApexGirl" },
    "/pl/contact": { title: "Kontakt - TopGirl", description: "Skontaktuj się z nami w przypadku pytań o TopGirl/ApexGirl.", keywords: "kontakt, TopGirl, ApexGirl" },
    "/pl/mentions-legales": { title: "Nota Prawna - TopGirl", description: "Nota prawna serwisu TopGirl/ApexGirl.", keywords: "nota prawna, TopGirl" },
    "/pl/confidentialite": { title: "Prywatność - TopGirl", description: "Polityka prywatności serwisu TopGirl/ApexGirl.", keywords: "prywatność, TopGirl" },
    "/pl/cookie-settings": { title: "Ustawienia Cookies - TopGirl", description: "Zarządzaj preferencjami plików cookies.", keywords: "cookies, TopGirl" },
  },
  id: {
    "/id": { title: "TopGirl - Panduan dan Alat", description: "Fansite resmi TopGirl/ApexGirl dengan panduan, alat, dan kode promo", keywords: "TopGirl, ApexGirl, panduan, tips, kode promo" },
    "/id/codes": { title: "Kode Promo - TopGirl", description: "Semua kode promo yang tersedia untuk TopGirl/ApexGirl.", keywords: "kode promo, TopGirl, ApexGirl, gems, gratis" },
    "/id/artists": { title: "Artis - TopGirl", description: "Temukan semua artis di TopGirl/ApexGirl dengan statistik mereka.", keywords: "TopGirl, ApexGirl, artis, karakter" },
    "/id/tierlist": { title: "Tier List - TopGirl", description: "Tier list lengkap artis terbaik di TopGirl/ApexGirl.", keywords: "tier list, TopGirl, ApexGirl" },
    "/id/guides": { title: "Panduan - TopGirl", description: "Semua panduan kami untuk TopGirl/ApexGirl.", keywords: "panduan, TopGirl, ApexGirl, tips" },
    "/id/tools": { title: "Alat - TopGirl", description: "Alat dan kalkulator untuk TopGirl/ApexGirl.", keywords: "alat, TopGirl, ApexGirl" },
    "/id/contact": { title: "Kontak - TopGirl", description: "Hubungi kami untuk pertanyaan tentang TopGirl/ApexGirl.", keywords: "kontak, TopGirl, ApexGirl" },
    "/id/mentions-legales": { title: "Ketentuan - TopGirl", description: "Ketentuan fansite TopGirl/ApexGirl.", keywords: "ketentuan, TopGirl" },
    "/id/confidentialite": { title: "Privasi - TopGirl", description: "Kebijakan privasi fansite TopGirl/ApexGirl.", keywords: "privasi, TopGirl" },
    "/id/cookie-settings": { title: "Pengaturan Cookie - TopGirl", description: "Kelola preferensi cookie Anda.", keywords: "cookies, TopGirl" },
  },
  ru: {
    "/ru": { title: "TopGirl - Руководства и Инструменты", description: "Неофициальный фан-сайт TopGirl/ApexGirl с руководствами, инструментами и промокодами", keywords: "TopGirl, ApexGirl, руководство, tips, промокоды" },
    "/ru/codes": { title: "Промокоды - TopGirl", description: "Все доступные промокоды для TopGirl/ApexGirl.", keywords: "промокоды, TopGirl, ApexGirl, гемы, бесплатно" },
    "/ru/artists": { title: "Артисты - TopGirl", description: "Откройте всех артистов TopGirl/ApexGirl с их статистикой.", keywords: "TopGirl, ApexGirl, артисты, персонажи" },
    "/ru/tierlist": { title: "Tier List - TopGirl", description: "Полный список лучших артистов TopGirl/ApexGirl.", keywords: "tier list, TopGirl, ApexGirl" },
    "/ru/guides": { title: "Гайды - TopGirl", description: "Все наши гайды для TopGirl/ApexGirl.", keywords: "гайды, TopGirl, ApexGirl, tips" },
    "/ru/tools": { title: "Инструменты - TopGirl", description: "Инструменты и калькуляторы для TopGirl/ApexGirl.", keywords: "инструменты, TopGirl, ApexGirl" },
    "/ru/contact": { title: "Контакт - TopGirl", description: "Свяжитесь с нами по любым вопросам о TopGirl/ApexGirl.", keywords: "контакт, TopGirl, ApexGirl" },
    "/ru/mentions-legales": { title: "Юридическая Информация - TopGirl", description: "Юридическая информация фан-сайта TopGirl/ApexGirl.", keywords: "юридическая информация, TopGirl" },
    "/ru/confidentialite": { title: "Конфиденциальность - TopGirl", description: "Политика конфиденциальности фан-сайта TopGirl/ApexGirl.", keywords: "конфиденциальность, TopGirl" },
    "/ru/cookie-settings": { title: "Настройки Cookies - TopGirl", description: "Управление настройками файлов cookie.", keywords: "cookies, TopGirl" },
  },
};

const defaultMeta: Record<string, { title: string; description: string; keywords: string }> = {
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
  const path = `/${lang}`;
  const meta = pageTitles[lang]?.[path] || defaultMeta[lang] || defaultMeta.fr;
  
  const hreflangLangs = ['fr', 'en', 'it', 'es', 'pt', 'pl', 'id', 'ru'];
  const languages: Record<string, string> = {};
  hreflangLangs.forEach((l) => {
    languages[l] = `https://www.apexgirlguide.com/${l}`;
  });
  languages['x-default'] = 'https://www.apexgirlguide.com/fr';
  
  const alternates: Metadata['alternates'] = {
    languages,
    canonical: `https://www.apexgirlguide.com/${lang}`,
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.split(", "),
    alternates,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.apexgirlguide.com/${lang}`,
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
            "url": `https://www.apexgirlguide.com/${lang}`,
            "description": defaultMeta[lang]?.description || defaultMeta.fr.description,
            "inLanguage": localeNames[lang] || "fr-FR",
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
