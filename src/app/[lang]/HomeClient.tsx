"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";

import { AdBanner } from "@/components/AdSense";
import artistsData from "@/lib/data/artists.json";
import { activeCodes } from "@/lib/data/codes";

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

// SSR artists for hero mosaic — list built at module load (stable), pick happens client-side
const ALL_SSR_IMAGES: string[] = (artistsData as Array<{ rank: string; image?: string }>)
  .filter((a) => a.rank === "SSR" && a.image)
  .map((a) => a.image as string);

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatExpiry(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const localeMap: Record<string, string> = {
    fr: "fr-FR", en: "en-GB", it: "it-IT", es: "es-ES",
    pt: "pt-BR", pl: "pl-PL", id: "id-ID", ru: "ru-RU", de: "de-DE",
  };
  return date.toLocaleDateString(localeMap[lang] || "en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const translations: Record<string, any> = {
  fr: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Dernière mise à jour",
    subtitle: "Le guide complet pour <strong>TopGirl / ApexGirl</strong> — artistes, tier lists, outils et codes promo",
    discoverArtists: "Voir les Artistes",
    seeTools: "Outils",
    tierListVotes: "Tier List",
    promoCodes: "Codes Promo Actifs",
    promoSubtitle: "Entrez-les dans le jeu : Profil → Réglages → Code cadeau",
    copy: "Copier",
    copied: "Copié !",
    seeAllCodes: "Voir tous les codes →",
    expiresOn: "Expire le",
    whatWeOffer: "Tout ce dont vous avez besoin",
    artistsOnGame: "Artistes SSR du jeu",
    seeAllArtists: "Voir tous les artistes →",
    sections: [
      {
        emoji: "🎤",
        title: "Artistes",
        desc: "112+ fiches complètes",
        detail: "Stats, skills, tier et conseils pour chaque artiste du jeu",
        href: "artists",
        color: "#ff4d8d",
      },
      {
        emoji: "🏆",
        title: "Tier List",
        desc: "Classement communautaire",
        detail: "Votez et découvrez les artistes les plus puissants cette semaine",
        href: "tierlist",
        color: "#ffd700",
      },
      {
        emoji: "🛠️",
        title: "Outils",
        desc: "Team builder & calculateurs",
        detail: "Construisez votre équipe idéale et simulez vos compositions",
        href: "tools",
        color: "#60a5fa",
      },
      {
        emoji: "📖",
        title: "Guides",
        desc: "Stratégies & tutoriels",
        detail: "De débutant à expert : tout ce qu'il faut savoir pour progresser",
        href: "guides",
        color: "#4ade80",
      },
    ],
    statArtists: "artistes",
    statGuides:  "guides",
    statTools:   "outils",
    new: "Nouveau",
  },
  en: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Last updated",
    subtitle: "The complete guide for <strong>TopGirl / ApexGirl</strong> — artists, tier lists, tools and promo codes",
    discoverArtists: "Browse Artists",
    seeTools: "Tools",
    tierListVotes: "Tier List",
    promoCodes: "Active Promo Codes",
    promoSubtitle: "Enter in game: Profile → Settings → Gift Code",
    copy: "Copy",
    copied: "Copied!",
    seeAllCodes: "See all codes →",
    expiresOn: "Expires",
    whatWeOffer: "Everything you need",
    artistsOnGame: "SSR Artists in the game",
    seeAllArtists: "See all artists →",
    sections: [
      {
        emoji: "🎤",
        title: "Artists",
        desc: "112+ full profiles",
        detail: "Stats, skills, tier and tips for every artist in the game",
        href: "artists",
        color: "#ff4d8d",
      },
      {
        emoji: "🏆",
        title: "Tier List",
        desc: "Community ranking",
        detail: "Vote and discover the most powerful artists this week",
        href: "tierlist",
        color: "#ffd700",
      },
      {
        emoji: "🛠️",
        title: "Tools",
        desc: "Team builder & calculators",
        detail: "Build your ideal team and simulate your compositions",
        href: "tools",
        color: "#60a5fa",
      },
      {
        emoji: "📖",
        title: "Guides",
        desc: "Strategies & tutorials",
        detail: "From beginner to expert: everything you need to know to improve",
        href: "guides",
        color: "#4ade80",
      },
    ],
    statArtists: "artists",
    statGuides:  "guides",
    statTools:   "tools",
    new: "New",
  },
  it: {
    homeTitle: "TOPGIRL GUIDE",
    subtitle: "La guida completa per <strong>TopGirl / ApexGirl</strong> — artisti, tier list, strumenti e codici promo",
    discoverArtists: "Scopri Artisti",
    seeTools: "Strumenti",
    tierListVotes: "Tier List",
    promoCodes: "Codici Promo Attivi",
    promoSubtitle: "Inserisci nel gioco: Profilo → Impostazioni → Codice Regalo",
    copy: "Copia",
    copied: "Copiato!",
    seeAllCodes: "Vedi tutti i codici →",
    expiresOn: "Scade il",
    whatWeOffer: "Tutto quello che ti serve",
    artistsOnGame: "Artisti SSR del gioco",
    seeAllArtists: "Vedi tutti gli artisti →",
    sections: [
      { emoji: "🎤", title: "Artisti", desc: "112+ schede complete", detail: "Stats, skill, tier e consigli per ogni artista", href: "artists", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Classifica community", detail: "Vota e scopri gli artisti più potenti della settimana", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Strumenti", desc: "Team builder & calcolatori", detail: "Costruisci il tuo team ideale e simula composizioni", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Guide", desc: "Strategie & tutorial", detail: "Da principiante a esperto: tutto per migliorare", href: "guides", color: "#4ade80" },
    ],
    statArtists: "artisti", statGuides: "guide", statTools: "strumenti", new: "Nuovo",
  },
  es: {
    homeTitle: "TOPGIRL GUIDE",
    subtitle: "La guía completa para <strong>TopGirl / ApexGirl</strong> — artistas, tier lists, herramientas y códigos promo",
    discoverArtists: "Ver Artistas",
    seeTools: "Herramientas",
    tierListVotes: "Tier List",
    promoCodes: "Códigos Promo Activos",
    promoSubtitle: "Ingrésalos en el juego: Perfil → Ajustes → Código de regalo",
    copy: "Copiar",
    copied: "¡Copiado!",
    seeAllCodes: "Ver todos los códigos →",
    expiresOn: "Expira el",
    whatWeOffer: "Todo lo que necesitas",
    artistsOnGame: "Artistas SSR del juego",
    seeAllArtists: "Ver todos los artistas →",
    sections: [
      { emoji: "🎤", title: "Artistas", desc: "112+ fichas completas", detail: "Stats, habilidades, tier y consejos para cada artista", href: "artists", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Ranking comunidad", detail: "Vota y descubre los artistas más poderosos esta semana", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Herramientas", desc: "Team builder & calculadoras", detail: "Construye tu equipo ideal y simula composiciones", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Guías", desc: "Estrategias & tutoriales", detail: "De principiante a experto: todo para mejorar", href: "guides", color: "#4ade80" },
    ],
    statArtists: "artistas", statGuides: "guías", statTools: "herramientas", new: "Nuevo",
  },
  pt: {
    homeTitle: "TOPGIRL GUIDE",
    subtitle: "O guia completo para <strong>TopGirl / ApexGirl</strong> — artistas, tier lists, ferramentas e códigos promo",
    discoverArtists: "Ver Artistas",
    seeTools: "Ferramentas",
    tierListVotes: "Tier List",
    promoCodes: "Códigos Promo Ativos",
    promoSubtitle: "Insira no jogo: Perfil → Configurações → Código de presente",
    copy: "Copiar",
    copied: "Copiado!",
    seeAllCodes: "Ver todos os códigos →",
    expiresOn: "Expira em",
    whatWeOffer: "Tudo que você precisa",
    artistsOnGame: "Artistas SSR do jogo",
    seeAllArtists: "Ver todos os artistas →",
    sections: [
      { emoji: "🎤", title: "Artistas", desc: "112+ perfis completos", detail: "Stats, skills, tier e dicas para cada artista", href: "artists", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Ranking da comunidade", detail: "Vote e descubra os artistas mais poderosos desta semana", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Ferramentas", desc: "Team builder & calculadoras", detail: "Monte seu time ideal e simule composições", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Guias", desc: "Estratégias & tutoriais", detail: "Do iniciante ao expert: tudo para evoluir", href: "guides", color: "#4ade80" },
    ],
    statArtists: "artistas", statGuides: "guias", statTools: "ferramentas", new: "Novo",
  },
  pl: {
    homeTitle: "TOPGIRL GUIDE",
    subtitle: "Kompletny przewodnik po <strong>TopGirl / ApexGirl</strong> — artyści, tier listy, narzędzia i kody promo",
    discoverArtists: "Przeglądaj Artystów",
    seeTools: "Narzędzia",
    tierListVotes: "Tier List",
    promoCodes: "Aktywne Kody Promo",
    promoSubtitle: "Wpisz w grze: Profil → Ustawienia → Kod upominkowy",
    copy: "Kopiuj",
    copied: "Skopiowano!",
    seeAllCodes: "Zobacz wszystkie kody →",
    expiresOn: "Wygasa",
    whatWeOffer: "Wszystko czego potrzebujesz",
    artistsOnGame: "Artystki SSR w grze",
    seeAllArtists: "Zobacz wszystkich artystów →",
    sections: [
      { emoji: "🎤", title: "Artyści", desc: "112+ pełnych profili", detail: "Statystyki, umiejętności, tier i porady dla każdego artysty", href: "artists", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Ranking społeczności", detail: "Głosuj i odkryj najpotężniejszych artystów tego tygodnia", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Narzędzia", desc: "Team builder i kalkulatory", detail: "Zbuduj idealny zespół i symuluj kompozycje", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Poradniki", desc: "Strategie i samouczki", detail: "Od początkującego do eksperta: wszystko by się rozwijać", href: "guides", color: "#4ade80" },
    ],
    statArtists: "artystów", statGuides: "poradników", statTools: "narzędzi", new: "Nowy",
  },
  id: {
    homeTitle: "TOPGIRL GUIDE",
    subtitle: "Panduan lengkap untuk <strong>TopGirl / ApexGirl</strong> — artis, tier list, alat dan kode promo",
    discoverArtists: "Lihat Artis",
    seeTools: "Alat",
    tierListVotes: "Tier List",
    promoCodes: "Kode Promo Aktif",
    promoSubtitle: "Masukkan di game: Profil → Pengaturan → Kode Hadiah",
    copy: "Salin",
    copied: "Disalin!",
    seeAllCodes: "Lihat semua kode →",
    expiresOn: "Kedaluwarsa",
    whatWeOffer: "Semua yang kamu butuhkan",
    artistsOnGame: "Artis SSR dalam game",
    seeAllArtists: "Lihat semua artis →",
    sections: [
      { emoji: "🎤", title: "Artis", desc: "112+ profil lengkap", detail: "Stats, skill, tier dan tips untuk setiap artis", href: "artists", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Ranking komunitas", detail: "Pilih dan temukan artis terkuat minggu ini", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Alat", desc: "Team builder & kalkulator", detail: "Bangun tim ideal dan simulasikan komposisi", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Panduan", desc: "Strategi & tutorial", detail: "Dari pemula hingga ahli: semua untuk berkembang", href: "guides", color: "#4ade80" },
    ],
    statArtists: "artis", statGuides: "panduan", statTools: "alat", new: "Baru",
  },
  ru: {
    homeTitle: "TOPGIRL GUIDE",
    subtitle: "Полный гайд по <strong>TopGirl / ApexGirl</strong> — артисты, тир-листы, инструменты и промокоды",
    discoverArtists: "Артисты",
    seeTools: "Инструменты",
    tierListVotes: "Тир-лист",
    promoCodes: "Активные Промокоды",
    promoSubtitle: "Введите в игре: Профиль → Настройки → Подарочный код",
    copy: "Копировать",
    copied: "Скопировано!",
    seeAllCodes: "Все коды →",
    expiresOn: "Истекает",
    whatWeOffer: "Всё что нужно",
    artistsOnGame: "Артисты SSR в игре",
    seeAllArtists: "Все артисты →",
    sections: [
      { emoji: "🎤", title: "Артисты", desc: "112+ полных профилей", detail: "Статы, умения, тир и советы для каждого артиста", href: "artists", color: "#ff4d8d" },
      { emoji: "🏆", title: "Тир-лист", desc: "Рейтинг сообщества", detail: "Голосуйте и узнайте сильнейших артистов недели", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Инструменты", desc: "Team builder и калькуляторы", detail: "Стройте идеальную команду и симулируйте составы", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Гайды", desc: "Стратегии и туториалы", detail: "От новичка до эксперта: всё для прогресса", href: "guides", color: "#4ade80" },
    ],
    statArtists: "артистов", statGuides: "гайдов", statTools: "инструментов", new: "Новый",
  },
  de: {
    homeTitle: "TOPGIRL GUIDE",
    subtitle: "Der vollständige Leitfaden für <strong>TopGirl / ApexGirl</strong> — Künstlerinnen, Tier-Listen, Werkzeuge und Promo-Codes",
    discoverArtists: "Künstlerinnen entdecken",
    seeTools: "Werkzeuge",
    tierListVotes: "Tier Liste",
    promoCodes: "Aktive Promo-Codes",
    promoSubtitle: "Im Spiel eingeben: Profil → Einstellungen → Geschenkcode",
    copy: "Kopieren",
    copied: "Kopiert!",
    seeAllCodes: "Alle Codes anzeigen →",
    expiresOn: "Läuft ab",
    whatWeOffer: "Alles was du brauchst",
    artistsOnGame: "SSR-Künstlerinnen im Spiel",
    seeAllArtists: "Alle Künstlerinnen anzeigen →",
    sections: [
      { emoji: "🎤", title: "Künstlerinnen", desc: "112+ vollständige Profile", detail: "Stats, Fähigkeiten, Tier und Tipps für jede Künstlerin im Spiel", href: "artists", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier Liste", desc: "Community-Ranking", detail: "Abstimmen und entdecke die stärksten Künstlerinnen dieser Woche", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Werkzeuge", desc: "Team-Builder & Rechner", detail: "Baue dein ideales Team und simuliere Zusammenstellungen", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Leitfäden", desc: "Strategien & Tutorials", detail: "Vom Anfänger zum Experten: alles was du zum Verbessern brauchst", href: "guides", color: "#4ade80" },
    ],
    statArtists: "Künstlerinnen", statGuides: "Leitfäden", statTools: "Werkzeuge", new: "Neu",
  },
};

// Mosaic positions: [top%, left%, width%, rotation]
// Fan layout — 13 cards in a horizontal arc, smaller and evenly spaced
// Computed once (no randomness) — safe for SSR/hydration
const MOSAIC_POSITIONS: number[][] = (() => {
  const n = 13;
  const cardW = 11;     // % width — légèrement plus grand
  const step  = 7;      // % horizontal step (chevauchement minimal)
  const startLeft = 0;
  const arcTop  = 3;    // point le plus haut (carte centrale)
  const arcDrop = 30;   // descente des cartes en bord (%)
  return Array.from({ length: n }, (_, i) => {
    const tVal = (i - (n - 1) / 2) / ((n - 1) / 2); // -1 à +1
    const top  = arcTop + arcDrop * tVal * tVal;
    const left = startLeft + i * step;
    const rot  = tVal * 28;
    return [Math.round(top), Math.round(left), cardW, Math.round(rot)];
  });
})();

export default function HomeClient({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  // Hero artists: picked client-side only to avoid SSR/hydration mismatch
  const [heroArtists] = useState<string[]>(() => pickRandom(ALL_SSR_IMAGES, 13));

  const [copiedCode, setCopiedCode] = useState("");

  // SSR artists only — shuffled on mount, 12 shown
  const featuredArtists = useMemo(() => {
    const ssrOnly = (artistsData as Array<{ id: number; name: string; image?: string; rank: string }>)
      .filter((a) => a.image && a.rank === "SSR");
    return shuffleArray(ssrOnly).slice(0, 12);
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  // Styles inline boutons — immune aux overrides Tailwind/globals
  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 800,
    borderRadius: "14px",
    textDecoration: "none",
    color: "#fff",
    transition: "transform 0.2s, box-shadow 0.2s",
    padding: "13px 22px",
    fontSize: "1.05rem",
  };
  const btnBaseDesktop: React.CSSProperties = {
    ...btnBase,
    padding: "20px 44px",
    fontSize: "2rem",
    borderRadius: "16px",
  };
  const btnArtists:        React.CSSProperties = { ...btnBase,        background: "linear-gradient(135deg,#ff2d78,#ff80ab)", boxShadow: "0 4px 20px rgba(255,45,120,0.45)" };
  const btnTier:           React.CSSProperties = { ...btnBase,        background: "linear-gradient(135deg,#f59e0b,#ffd700)", boxShadow: "0 4px 20px rgba(245,158,11,0.45)" };
  const btnTools:          React.CSSProperties = { ...btnBase,        background: "linear-gradient(135deg,#3b82f6,#06b6d4)", boxShadow: "0 4px 20px rgba(59,130,246,0.45)"  };
  const btnArtistsDesktop: React.CSSProperties = { ...btnBaseDesktop, background: "linear-gradient(135deg,#ff2d78,#ff80ab)", boxShadow: "0 6px 32px rgba(255,45,120,0.50)" };
  const btnTierDesktop:    React.CSSProperties = { ...btnBaseDesktop, background: "linear-gradient(135deg,#f59e0b,#ffd700)", boxShadow: "0 6px 32px rgba(245,158,11,0.45)" };
  const btnToolsDesktop:   React.CSSProperties = { ...btnBaseDesktop, background: "linear-gradient(135deg,#3b82f6,#06b6d4)", boxShadow: "0 6px 32px rgba(59,130,246,0.45)"  };

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      {/* Éventail d'artistes — desktop: section séparée / mobile: avec contenu dedans */}
      <section className="hero-section">
        <div className="hero-mosaic" aria-hidden="true">
          {heroArtists.map((img, i) => {
            const [top, left, w, rot] = MOSAIC_POSITIONS[i] || [50, 50, 14, 0];
            return (
              <div
                key={img}
                className="mosaic-card"
                style={{ top: `${top}%`, left: `${left}%`, width: `${w}%`, transform: `rotate(${rot}deg)` }}
              >
                <Image
                  src={`/assets/images/artists/${img}`}
                  alt=""
                  width={160}
                  height={200}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  priority={i < 6}
                />
              </div>
            );
          })}
        </div>
        <div className="hero-overlay" />
      </section>

      {/* Sur desktop le contenu s'affiche sous l'éventail */}
      <div className="hero-content hero-content-desktop">
        <div className="hero-badge">TopGirl / ApexGirl</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
            {t.lastUpdated}: April 2026
          </span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 500 }}>
            Updated weekly
          </span>
        </div>
        <h1 className="hero-title">{t.homeTitle}</h1>
        <p className="hero-subtitle" dangerouslySetInnerHTML={{ __html: t.subtitle }} />
        <div className="hero-stats">
          <span><strong>112+</strong> {t.statArtists}</span>
          <span className="stat-dot">·</span>
          <span><strong>50+</strong> {t.statGuides}</span>
          <span className="stat-dot">·</span>
          <span><strong>5+</strong> {t.statTools}</span>
        </div>
        <div className="hero-ctas">
          <Link href={`/${lang}/teambuilder/`} style={btnArtistsDesktop}>🎤 {t.discoverArtists}</Link>
          <Link href={`/${lang}/tierlist/`} style={btnTierDesktop}   >🏆 {t.tierListVotes}</Link>
          <Link href={`/${lang}/tools/`}   style={btnToolsDesktop}   >🛠️ {t.seeTools}</Link>
        </div>
      </div>

      {/* Mobile hero content — stacked below the mosaic */}
      <div className="hero-content-mobile">
        <div className="hero-badge">TopGirl / ApexGirl</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
            {t.lastUpdated}: April 2026
          </span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 500 }}>
            Updated weekly
          </span>
        </div>
        <h1 className="hero-title">{t.homeTitle}</h1>
        <p className="hero-subtitle" dangerouslySetInnerHTML={{ __html: t.subtitle }} />
        <div className="hero-stats">
          <span><strong>112+</strong> {t.statArtists}</span>
          <span className="stat-dot">·</span>
          <span><strong>50+</strong> {t.statGuides}</span>
          <span className="stat-dot">·</span>
          <span><strong>5+</strong> {t.statTools}</span>
        </div>
        <div className="hero-ctas">
          <Link href={`/${lang}/teambuilder/`} style={btnArtists}  >🎤 {t.discoverArtists}</Link>
          <Link href={`/${lang}/tierlist/`} style={btnTier}    >🏆 {t.tierListVotes}</Link>
          <Link href={`/${lang}/tools/`}   style={btnTools}    >🛠️ {t.seeTools}</Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TL;DR — Quick answers in 10 seconds
      ═══════════════════════════════════════════ */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))',
          borderRadius: '20px',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          padding: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
              Quick Answers — Get what you need fast
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                🏆 Best Artists Tier List
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                S+ Tier: Genevieve, Isadora, Alexandra<br/>
                Check our community tier list for weekly updated rankings.
              </p>
              <Link href={`/${lang}/tierlist/`} style={{ color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                View Tier List →
              </Link>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                🎤 Best SSR Artists
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                Top picks: Genevieve (Sing), Isadora (Defense), Alexandra (Economy).
                Full list of 112+ artists with stats.
              </p>
              <Link href={`/${lang}/teambuilder/`} style={{ color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                Browse Artists →
              </Link>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                💰 Free Promo Codes
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                All codes are expired but kept for reference.
                Enter in game: Profile → Settings → Gift Code
              </p>
              <Link href={`/${lang}/codes/`} style={{ color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                View Codes →
              </Link>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                📖 Beginner Guide
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                Learn game structure, team building basics, and key strategies.
                Start here if you're new!
              </p>
              <Link href={`/${lang}/guides/`} style={{ color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                View Guides →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTIONS — ce qu'on propose (premier contenu vu)
      ═══════════════════════════════════════════ */}
      <section className="offer-section">
        <div className="offer-inner">
          <h2 className="offer-title">{t.whatWeOffer}</h2>
          <div className="offer-grid">
            {t.sections.map((s: any, i: number) => (
              <Link key={i} href={`/${lang}/${s.href}/`} className="offer-card">
                <div className="offer-card-icon" style={{ color: s.color, background: `${s.color}18`, borderColor: `${s.color}33` }}>
                  {s.emoji}
                </div>
                <div className="offer-card-body">
                  <div className="offer-card-title">{s.title}</div>
                  <div className="offer-card-desc">{s.desc}</div>
                  <div className="offer-card-detail">{s.detail}</div>
                </div>
                <div className="offer-card-arrow" style={{ color: s.color }}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ARTIST STRIP — SSR uniquement, aléatoire
      ═══════════════════════════════════════════ */}
      <section className="artist-strip-section">
        <div className="artist-strip-inner">
          <div className="strip-header">
            <h2 className="strip-title">🎤 {t.artistsOnGame}</h2>
            <Link href={`/${lang}/teambuilder/`} className="strip-see-all">{t.seeAllArtists}</Link>
          </div>
          <div className="artist-strip">
            {featuredArtists.map((artist: any) => (
              <Link key={artist.id} href={`/${lang}/artist/${slugify(artist.name)}/`} className="artist-card">
                <div className="artist-card-img">
                   <Image
                     src={`/assets/images/artists/${artist.image}`}
                     alt={artist.name}
                     fill
                     sizes="100px"
                     style={{ objectFit: "cover" }}
                   />
                </div>
                <span className="artist-card-name">{artist.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CODES PROMO
      ═══════════════════════════════════════════ */}
      <div className="home-container">
        <section className="section-codes">
          <div className="codes-header">
            <div>
              <h2 className="codes-title">🎁 {t.promoCodes}</h2>
              <p className="codes-subtitle">{t.promoSubtitle}</p>
            </div>
            <Link href={`/${lang}/codes/`} className="codes-see-all">{t.seeAllCodes}</Link>
          </div>
          <div className="codes-list">
            {activeCodes.map(c => (
              <div key={c.code} className="code-row">
                <div className="code-info">
                  <div className="code-top-line">
                    <span className="code-value">{c.code}</span>
                    {c.rarity === "new" && <span className="code-new">{t.new}</span>}
                  </div>
                  <div className="code-meta">
                    <span className="code-rewards">{c.rewards}</span>
                    <span className="code-expires">{t.expiresOn} {formatExpiry(c.expires, lang)}</span>
                  </div>
                </div>
                <button
                  className={`code-copy-btn ${copiedCode === c.code ? "copied" : ""}`}
                  onClick={() => copyCode(c.code)}
                  aria-label={`${copiedCode === c.code ? t.copied : t.copy} ${c.code}`}
                >
                  {copiedCode === c.code ? t.copied : t.copy}
                </button>
              </div>
            ))}
          </div>
        </section>

        <AdBanner />
      </div>

      <style jsx>{`

        /* ── HERO ─────────────────────────────────── */
        .hero-section {
          position: relative;
          min-height: 0;
          height: 30vw;
          overflow: hidden;
        }
        .hero-mosaic {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .mosaic-card {
          position: absolute;
          aspect-ratio: 4/5;
          border-radius: 10px;
          overflow: hidden;
          opacity: 0.97;
          border: 1px solid rgba(255,255,255,0.25);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg,
            rgba(10,10,18,0.08) 0%,
            rgba(10,10,18,0.00) 100%
          );
        }

        /* Contenu partagé badge/titre/sous-titre/stats/boutons */
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
          width: 100%;
        }

        /* Desktop : contenu sous l'éventail, collé */
        .hero-content-desktop {
          display: flex;
          padding: 0 24px 52px;
          margin-top: -3.5vw;
        }
        .hero-content-mobile {
          display: none;
        }

        .hero-badge {
          display: inline-block;
          padding: 6px 18px;
          background: rgba(255,77,141,0.40);
          border: 1px solid rgba(255,77,141,0.75);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 18px;
        }
        .hero-title {
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.05;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #fff 0%, #ff80ab 45%, #c084fc 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: clamp(1.05rem, 2.2vw, 1.25rem);
          color: rgba(255,255,255,0.90);
          margin-bottom: 22px;
          line-height: 1.65;
          max-width: 580px;
        }
        .hero-subtitle :global(strong) {
          color: #ff80ab;
          font-weight: 700;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.92rem;
          color: rgba(255,255,255,0.65);
          margin-bottom: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hero-stats strong { color: rgba(255,255,255,0.95); }
        .stat-dot { opacity: 0.35; }
        .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }

        /* ── OFFER SECTION ────────────────────────── */
        .offer-section {
          background: rgba(20,20,36,0.96);
          border-top: 1px solid rgba(255,255,255,0.09);
          border-bottom: 1px solid rgba(255,255,255,0.09);
          padding: 52px 20px;
        }
        .offer-inner {
          max-width: 900px;
          margin: 0 auto;
        }
        .offer-title {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-align: center;
          margin-bottom: 32px;
        }
        .offer-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .offer-card {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 26px 22px;
          background: rgba(30,30,48,0.85);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 18px;
          text-decoration: none;
          transition: border-color 0.2s, transform 0.2s, background 0.2s;
        }
        .offer-card:hover {
          background: rgba(38,38,60,0.98);
          transform: translateY(-3px);
        }
        .offer-card-icon {
          font-size: 2.2rem;
          width: 58px;
          height: 58px;
          border-radius: 14px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .offer-card-body { flex: 1; min-width: 0; }
        .offer-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 4px;
        }
        .offer-card-desc {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          margin-bottom: 6px;
        }
        .offer-card-detail {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.45;
        }
        .offer-card-arrow {
          font-size: 1.3rem;
          font-weight: 700;
          flex-shrink: 0;
          align-self: center;
          opacity: 0.5;
          transition: transform 0.2s, opacity 0.2s;
        }
        .offer-card:hover .offer-card-arrow {
          transform: translateX(4px);
          opacity: 1;
        }
        .offer-card:hover .offer-card-icon {
          border-color: currentColor;
        }

        /* ── ARTIST STRIP ─────────────────────────── */
        .artist-strip-section {
          padding: 40px 0 36px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .artist-strip-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .strip-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .strip-title {
          font-size: 1rem;
          font-weight: 700;
          color: rgba(255,255,255,0.8);
        }
        .strip-see-all {
          font-size: 0.82rem;
          color: #ff4d8d;
          text-decoration: none;
          font-weight: 600;
          padding: 6px 14px;
          border: 1px solid rgba(255,77,141,0.3);
          border-radius: 8px;
          transition: background 0.2s;
        }
        .strip-see-all:hover { background: rgba(255,77,141,0.1); color: #ff80ab; }
        .artist-strip {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 6px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .artist-strip::-webkit-scrollbar { display: none; }
        .artist-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .artist-card:hover { transform: translateY(-4px); }
        .artist-card-img {
          width: 100px;
          height: 128px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          border: 2px solid rgba(192,132,252,0.25);
          background: rgba(255,255,255,0.04);
          transition: border-color 0.2s;
        }
        .artist-card:hover .artist-card-img {
          border-color: rgba(192,132,252,0.6);
        }
        .artist-card-name {
          font-size: 0.74rem;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          text-align: center;
          max-width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── LAYOUT ───────────────────────────────── */
        .home-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }

        /* ── CODES ────────────────────────────────── */
        .section-codes {
          background: rgba(22,22,31,0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }
        .codes-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 18px;
          gap: 12px;
        }
        .codes-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }
        .codes-subtitle {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }
        .codes-see-all {
          font-size: 0.78rem;
          color: #ff4d8d;
          text-decoration: none;
          white-space: nowrap;
          font-weight: 600;
          padding: 6px 12px;
          border: 1px solid rgba(255,77,141,0.3);
          border-radius: 8px;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .codes-see-all:hover { background: rgba(255,77,141,0.1); color: #ff80ab; }
        .codes-list { display: flex; flex-direction: column; gap: 8px; }
        .code-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
        }
        .code-info { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .code-top-line { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .code-value {
          font-family: monospace;
          font-size: 0.95rem;
          font-weight: 700;
          color: #ff80ab;
          letter-spacing: 0.03em;
        }
        .code-new {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #22c55e;
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.3);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .code-meta { display: flex; flex-direction: column; gap: 1px; }
        .code-rewards { font-size: 0.78rem; color: rgba(255,255,255,0.55); }
        .code-expires { font-size: 0.7rem; color: rgba(255,255,255,0.55); }
        .code-copy-btn {
          padding: 7px 16px;
          background: rgba(255,77,141,0.15);
          border: 1px solid rgba(255,77,141,0.35);
          color: #ff80ab;
          font-size: 0.78rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .code-copy-btn:hover { background: rgba(255,77,141,0.28); }
        .code-copy-btn.copied {
          background: rgba(34,197,94,0.18);
          border-color: rgba(34,197,94,0.4);
          color: #22c55e;
        }

        /* ── RESPONSIVE ───────────────────────────── */
        @media (max-width: 600px) {
          /* Hero section: enough height for the fan + title below */
          .hero-section {
            height: 35vw;
            min-height: 0;
            overflow: hidden;
          }
          /* Mosaic: fills hero width, absolute so it's at the top */
          .hero-mosaic {
            position: absolute;
            inset: 0;
            z-index: 0;
          }
          /* Cards: 8vw wide, positioned across the hero width */
          .mosaic-card {
            position: absolute;
            width: 8vw;
            aspect-ratio: 4/5;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.25);
            opacity: 0.97;
          }
          .hero-mosaic .mosaic-card:nth-child(1)  { left: 0%;   top: calc(3% + 27% * 1);   transform: rotate(-21deg); }
          .hero-mosaic .mosaic-card:nth-child(2)  { left: 7%;   top: calc(3% + 27% * 0.77); transform: rotate(-18deg); }
          .hero-mosaic .mosaic-card:nth-child(3)  { left: 14%;  top: calc(3% + 27% * 0.56); transform: rotate(-14deg); }
          .hero-mosaic .mosaic-card:nth-child(4)  { left: 21%;  top: calc(3% + 27% * 0.38); transform: rotate(-10deg); }
          .hero-mosaic .mosaic-card:nth-child(5)  { left: 28%;  top: calc(3% + 27% * 0.23); transform: rotate(-7deg); }
          .hero-mosaic .mosaic-card:nth-child(6)  { left: 35%;  top: calc(3% + 27% * 0.10); transform: rotate(-3.5deg); }
          .hero-mosaic .mosaic-card:nth-child(7)  { left: 42%;  top: 3%;   transform: none; }
          .hero-mosaic .mosaic-card:nth-child(8)  { left: 49%;  top: calc(3% + 27% * 0.10); transform: rotate(3.5deg); }
          .hero-mosaic .mosaic-card:nth-child(9)  { left: 56%;  top: calc(3% + 27% * 0.23); transform: rotate(7deg); }
          .hero-mosaic .mosaic-card:nth-child(10) { left: 63%;  top: calc(3% + 27% * 0.38); transform: rotate(10deg); }
          .hero-mosaic .mosaic-card:nth-child(11) { left: 70%;  top: calc(3% + 27% * 0.56); transform: rotate(14deg); }
          .hero-mosaic .mosaic-card:nth-child(12) { left: 77%;  top: calc(3% + 27% * 0.77); transform: rotate(18deg); }
          .hero-mosaic .mosaic-card:nth-child(13) { left: 84%;  top: calc(3% + 27% * 1);   transform: rotate(21deg); }
          .hero-overlay { display: none; }

          /* Hero content: compact below the fan, stacked vertically */
          .hero-content-mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 12px 16px 4px;
          }
          .hero-badge { font-size: 0.65rem; padding: 4px 12px; margin-bottom: 8px; }
          .hero-title { font-size: 1.8rem; letter-spacing: -1px; margin-bottom: 6px; }
          .hero-subtitle { display: none; }
          .hero-subtitle :global(strong) { color: #ff80ab; }
          .hero-stats { display: none; }
          .hero-ctas { flex-direction: row; gap: 6px; justify-content: center; width: 100%; flex-wrap: nowrap; }
          .hero-ctas a { padding: 8px 12px; font-size: 0.75rem; border-radius: 10px; box-shadow: none; white-space: nowrap; }
          .hero-content-desktop { display: none !important; }
          .artist-strip-section { display: none; }
          .offer-section { padding: 24px 12px; }
          .offer-inner { padding: 0; }
          .offer-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .offer-card { flex-direction: column; align-items: flex-start; padding: 14px 12px; gap: 8px; }
          .offer-card-icon { width: 40px; height: 40px; font-size: 1.4rem; }
          .offer-card-title { font-size: 0.88rem; }
          .offer-card-desc { font-size: 0.68rem; margin-bottom: 0; }
          .offer-card-detail { display: none; }
          .offer-card-arrow { display: none; }
          .codes-header { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
