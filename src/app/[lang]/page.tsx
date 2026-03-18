"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { AdBanner } from "@/components/AdSense";
import artistsData from "@/lib/data/artists.json";
import { activeCodes } from "@/lib/data/codes";

// SSR artists for hero mosaic — 13 picked randomly at module load
const ALL_SSR_IMAGES = (artistsData as any[])
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

const HERO_ARTISTS = pickRandom(ALL_SSR_IMAGES, 13);

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
    pt: "pt-BR", pl: "pl-PL", id: "id-ID", ru: "ru-RU",
  };
  return date.toLocaleDateString(localeMap[lang] || "en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const translations: Record<string, any> = {
  fr: {
    homeTitle: "TOPGIRL GUIDE",
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
};

// Mosaic positions: [top%, left%, width%, rotation]
// Fan layout — 13 cards in a horizontal arc, smaller and evenly spaced
// [top%, left%, width%, rotation]  — parabolic vertical arc, rotation -30→+30
const MOSAIC_POSITIONS = ((): number[][] => {
  const n = 13;
  const cardW = 11;     // % width — légèrement plus grand
  const step  = 7;      // % horizontal step (chevauchement minimal)
  const startLeft = 0;
  const arcTop  = 3;    // point le plus haut (carte centrale)
  const arcDrop = 30;   // descente des cartes en bord (%)
  return Array.from({ length: n }, (_, i) => {
    const t = (i - (n - 1) / 2) / ((n - 1) / 2); // -1 à +1
    const top  = arcTop + arcDrop * t * t;
    const left = startLeft + i * step;
    const rot  = t * 28;
    return [Math.round(top), Math.round(left), cardW, Math.round(rot)];
  });
})();

export default function HomePage() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = translations[lang] || translations.en;

  const [copiedCode, setCopiedCode] = useState("");

  // SSR artists only — shuffled on mount, 12 shown
  const featuredArtists = useMemo(() => {
    const ssrOnly = (artistsData as any[]).filter((a) => a.image && a.rank === "SSR");
    return shuffleArray(ssrOnly).slice(0, 12);
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-mosaic" aria-hidden="true">
          {HERO_ARTISTS.map((img, i) => {
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
        <div className="hero-content">
          <div className="hero-badge">TopGirl / ApexGirl</div>
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
            <Link href={`/${lang}/artists/`} className="hero-btn-primary">🎤 {t.discoverArtists}</Link>
            <Link href={`/${lang}/tierlist/`} className="hero-btn-secondary">🏆 {t.tierListVotes}</Link>
            <Link href={`/${lang}/tools/`} className="hero-btn-secondary">🛠️ {t.seeTools}</Link>
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
            <Link href={`/${lang}/artists/`} className="strip-see-all">{t.seeAllArtists}</Link>
          </div>
          <div className="artist-strip">
            {featuredArtists.map((artist: any) => (
              <Link key={artist.id} href={`/${lang}/artists/`} className="artist-card">
                <div className="artist-card-img">
                  <Image
                    src={`/assets/images/artists/${artist.image}`}
                    alt={artist.name}
                    width={100}
                    height={125}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
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
          min-height: 60vh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
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
          background:
            linear-gradient(180deg,
              rgba(10,10,18,0.30) 0%,
              rgba(10,10,18,0.10) 30%,
              rgba(10,10,18,0.55) 60%,
              rgba(10,10,18,0.97) 100%
            ),
            radial-gradient(ellipse at 50% 60%, rgba(255,77,141,0.10) 0%, transparent 65%);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px 24px 48px;
          max-width: 720px;
          margin: 0 auto;
          width: 100%;
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
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.72);
          margin-bottom: 20px;
          line-height: 1.6;
          max-width: 560px;
        }
        .hero-subtitle :global(strong) { color: #fff; font-weight: 700; }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hero-stats strong { color: rgba(255,255,255,0.88); }
        .stat-dot { opacity: 0.35; }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .hero-btn-primary {
          padding: 18px 42px;
          background: linear-gradient(135deg, #ff4d8d, #ff80ab);
          color: #fff;
          font-weight: 800;
          font-size: 1.2rem;
          border-radius: 14px;
          text-decoration: none;
          box-shadow: 0 4px 28px rgba(255,77,141,0.45);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 36px rgba(255,77,141,0.60);
          color: #fff;
        }
        .hero-btn-secondary {
          padding: 17px 32px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.28);
          color: #fff;
          font-weight: 700;
          font-size: 1.15rem;
          border-radius: 14px;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: background 0.2s, transform 0.2s, border-color 0.2s;
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.17);
          border-color: rgba(255,255,255,0.45);
          transform: translateY(-2px);
          color: #fff;
        }

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
          color: rgba(255,255,255,0.3);
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
          color: rgba(255,255,255,0.38);
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
        .code-expires { font-size: 0.7rem; color: rgba(255,255,255,0.3); }
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
          .hero-section { min-height: 70vh; }

          /* Images hero mobile : taille réduite, opacité très haute */
          .mosaic-card {
            opacity: 0.94 !important;
            width: 16% !important;
          }

          .hero-ctas { flex-direction: column; width: 100%; max-width: 320px; }
          .hero-btn-primary, .hero-btn-secondary { width: 100%; text-align: center; }

          /* Sections : 2 par ligne sur mobile */
          .offer-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .offer-card { flex-direction: column; align-items: flex-start; padding: 16px 14px; gap: 10px; }
          .offer-card-icon { width: 44px; height: 44px; font-size: 1.6rem; }
          .offer-card-title { font-size: 0.95rem; }
          .offer-card-desc { font-size: 0.72rem; margin-bottom: 0; }
          .offer-card-detail { display: none; }
          .offer-card-arrow { display: none; }
          .offer-section { padding: 32px 16px; }

          .artist-strip-inner { padding: 0 16px; }
          .codes-header { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
