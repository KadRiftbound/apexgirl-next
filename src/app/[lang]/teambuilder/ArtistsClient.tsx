"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import artistsData from "@/lib/data/artists.json";
import { AdSlot } from "@/components/AdSlot";
import MobileArtistsPage from "@/components/MobileArtistsPage";
import { slugify } from "@/lib/utils/slugify";
import { calculateTeamStats } from "@/lib/utils/calculateTeamStats";
import type { Artist } from "@/lib/types/artist";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getArtistContent } from "@/lib/i18n/artists";

const rankColors: Record<string, string> = {
  UR: "#ff6b6b", "UR Roma": "#ef4444", "UR Bali": "#ef4444", SSR: "#fbbf24", SR: "#8b5cf6", R: "#3b82f6",
};

const genreColors: Record<string, string> = {
  "Pop":     "rgba(236, 72, 153, 0.55)",
  "Rock":    "rgba(239, 68, 68, 0.55)",
  "EDM":     "rgba(139, 92, 246, 0.55)",
  "Hip Hop": "rgba(245, 158, 11, 0.55)",
  "R&B":     "rgba(6, 182, 212, 0.55)",
};

const seasonLabels: Record<string, string> = {
  fr: "Saison",
  en: "Season",
  it: "Stagione",
  es: "Temporada",
  pt: "Temporada",
  pl: "Sezon",
  id: "Musim",
  ru: "Сезон",
};


const GENRES = ['EDM', 'Hip Hop', 'Pop', 'R&B', 'Rock'];
const RANKS = ['UR', 'UR Roma', 'UR Bali', 'SSR', 'SR', 'R'];

// French values from artists.json (used internally)
const SPECIALTY_VALUES = ['Augmentation dommage', 'Dommage réduction', 'Vitesse de conduite', 'HQ Defense', 'Mixte', 'Rassemblement', 'Solo car', 'Économie'] as const;

// Key-based mapping for filtering
const SPECIALTY_KEYS = ['damage_boost', 'damage_reduction', 'driving_speed', 'hq_defense', 'mixed', 'gathering', 'solo_car', 'economy'] as const;

// French values to keys mapping
const SPECIALTY_FR_TO_KEY: Record<string, string> = {
  'Augmentation dommage': 'damage_boost',
  'Dommage réduction': 'damage_reduction',
  'Vitesse de conduite': 'driving_speed',
  'HQ Defense': 'hq_defense',
  'Mixte': 'mixed',
  'Rassemblement': 'gathering',
  'Solo car': 'solo_car',
  'Économie': 'economy',
};

// Translated display labels by language
const SPECIALTY_LABELS_BY_LANG: Record<string, Record<string, string>> = {
  fr: { damage_boost: 'Augmentation dommage', damage_reduction: 'Dommage réduction', driving_speed: 'Vitesse de conduite', hq_defense: 'HQ Defense', mixed: 'Mixte', gathering: 'Rassemblement', solo_car: 'Solo car', economy: 'Économie' },
  en: { damage_boost: 'Damage Boost', damage_reduction: 'Damage Reduction', driving_speed: 'Driving Speed', hq_defense: 'HQ Defense', mixed: 'Mixed', gathering: 'Gathering', solo_car: 'Solo Car', economy: 'Economy' },
  it: { damage_boost: 'Boost Danno', damage_reduction: 'Riduzione Danno', driving_speed: 'Velocità Guida', hq_defense: 'HQ Difesa', mixed: 'Misto', gathering: 'Raccolta', solo_car: 'Auto Solitaria', economy: 'Economia' },
  es: { damage_boost: 'Aumento de Daño', damage_reduction: 'Reducción de Daño', driving_speed: 'Velocidad de Conducción', hq_defense: 'HQ Defensa', mixed: 'Mixto', gathering: 'Reunión', solo_car: 'Coche Solitario', economy: 'Economía' },
  pt: { damage_boost: 'Aumento de Dano', damage_reduction: 'Redução de Dano', driving_speed: 'Velocidade de Condução', hq_defense: 'HQ Defesa', mixed: 'Misto', gathering: 'Reunião', solo_car: 'Carro Solo', economy: 'Economia' },
  pl: { damage_boost: 'Zwiększenie Obrażeń', damage_reduction: 'Redukcja Obrażeń', driving_speed: 'Prędkość Prowadzenia', hq_defense: 'HQ Obrona', mixed: 'Mieszany', gathering: 'Zbieranie', solo_car: 'Samochód Solo', economy: 'Ekonomia' },
  id: { damage_boost: 'Peningkat Kerusakan', damage_reduction: 'Pengurangan Kerusakan', driving_speed: 'Kecepatan Mengemudi', hq_defense: 'HQ Pertahanan', mixed: 'Campuran', gathering: 'Pengumpulan', solo_car: 'Mobil Solo', economy: 'Ekonomi' },
  ru: { damage_boost: 'Увеличение урона', damage_reduction: 'Уменьшение урона', driving_speed: 'Скорость вождения', hq_defense: 'HQ Защита', mixed: 'Смешанный', gathering: 'Сбор', solo_car: 'Соло Машина', economy: 'Экономика' },
  de: { damage_boost: 'Schadensboost', damage_reduction: 'Schadensreduzierung', driving_speed: 'Fahrgeschwindigkeit', hq_defense: 'HQ Verteidigung', mixed: 'Gemischt', gathering: 'Sammeln', solo_car: 'Solo Auto', economy: 'Wirtschaft' },
};

export default function ArtistsClient({ lang }: { lang: string }) {
  const router = useRouter();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [hoveredArtistId, setHoveredArtistId] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [team1, setTeam1] = useState<Artist[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('team1');
        if (saved) {
          const ids: number[] = JSON.parse(saved);
          const team: Artist[] = [];
          ids.forEach((id: number) => {
            const artist = artistsData.find((a: Artist) => a.id === id);
            if (artist) team.push(artist);
          });
          return team;
        }
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.warn('Team 1 load failed', e);
      }
    }
    return [];
  });

  const [team2, setTeam2] = useState<Artist[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('team2');
        if (saved) {
          const ids: number[] = JSON.parse(saved);
          const team: Artist[] = [];
          ids.forEach((id: number) => {
            const artist = artistsData.find((a: Artist) => a.id === id);
            if (artist) team.push(artist);
          });
          return team;
        }
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.warn('Team 2 load failed', e);
      }
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [filterMaxSeason, setFilterMaxSeason] = useState("");
  const [mounted, setMounted] = useState(false);
  const [panelFixed, setPanelFixed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelSentinelRef = useRef<HTMLDivElement>(null);
  const t = getArtistContent(lang);

  const acquisitionStyles: Record<string, { label: string; color: string; bg: string }> = {
    f2p: { label: t.acqF2p || "F2P", color: "#22c55e", bg: "rgba(34,197,94,0.18)" },
    low: { label: t.acqLow || "Low spender", color: "#38bdf8", bg: "rgba(56,189,248,0.18)" },
    mid: { label: t.acqMid || "Mid spender", color: "#a855f7", bg: "rgba(168,85,247,0.18)" },
    whale: { label: t.acqWhale || "Whale", color: "#f59e0b", bg: "rgba(245,158,11,0.18)" },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 900) return;

    const sentinel = panelSentinelRef.current;
    if (!sentinel) return;

    const header = document.querySelector('.header') as HTMLElement;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldFix = !entry.isIntersecting;
        setPanelFixed(shouldFix);
        if (header) {
          if (shouldFix) {
            header.classList.add('header-hidden');
          } else {
            header.classList.remove('header-hidden');
          }
        }
      },
      { threshold: 0, rootMargin: '0px' }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (header) header.classList.remove('header-hidden');
    };
  }, [mounted]);

  // Save teams to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const ids = team1.map((artist: Artist) => artist.id);
        localStorage.setItem('team1', JSON.stringify(ids));
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.warn('Team 1 save failed', e);
      }
    }
  }, [team1]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const ids = team2.map((artist: Artist) => artist.id);
        localStorage.setItem('team2', JSON.stringify(ids));
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.warn('Team 2 save failed', e);
      }
    }
  }, [team2]);

  const team1Stats = useMemo(() => calculateTeamStats(team1), [team1]);
  const team2Stats = useMemo(() => calculateTeamStats(team2), [team2]);

  const addToTeam1 = (artist: Artist) => {
    if (team1.length < 5 && !team1.find(a => a.id === artist.id)) {
      setTeam1([...team1, artist]);
    }
  };

  const addToTeam2 = (artist: Artist) => {
    if (team2.length < 5 && !team2.find(a => a.id === artist.id)) {
      setTeam2([...team2, artist]);
    }
  };

  const removeFromTeam1 = (id: number) => {
    setTeam1(team1.filter(a => a.id !== id));
  };

  const removeFromTeam2 = (id: number) => {
    setTeam2(team2.filter(a => a.id !== id));
  };

  // Saison max — order chronologique
  const SEASON_ORDER: Record<string, number> = {
    "Original": 0,
    "Tokyo 1": 1,
    "Événement": 1.5,
    "Bali 1": 2,
    "Rome 1": 3, "Roma 1": 3,
    "Tokyo 2": 4,
    "Bali 2": 5,
    "Rome 2": 6, "Roma 2": 6,
    "Tokyo 3": 7,
    "Bali 3": 8,
    "Rome 3": 9, "Roma 3": 9,
    "Tokyo 4": 10,
    "Bali 4": 11,
    "Rome 4": 12, "Roma 4": 12,
    "Tokyo 5": 13,
    "Bali 5": 14,
    "Rome 5": 15, "Roma 5": 15,
  };
  const SEASON_LABELS: string[] = [
    "Original", "Tokyo 1", "Événement",
    "Bali 1", "Rome 1",
    "Tokyo 2", "Bali 2", "Rome 2",
    "Tokyo 3", "Bali 3", "Rome 3",
    "Tokyo 4", "Bali 4", "Rome 4",
    "Tokyo 5", "Bali 5", "Rome 5",
  ];

  const getArtistSeasonOrder = (artist: Artist): number => {
    const ev = (artist as any).event as string | undefined;
    if (!ev) return SEASON_ORDER["Événement"];
    return SEASON_ORDER[ev] ?? SEASON_ORDER["Événement"];
  };

  const filteredArtists = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const maxOrder = filterMaxSeason ? (SEASON_ORDER[filterMaxSeason] ?? 9999) : 9999;
    return artistsData.filter((artist: Artist) => {
      const matchesSearch = !q || artist.name.toLowerCase().includes(q);
      const matchesRank = !filterRank || artist.rank === filterRank;
      const matchesGenre = !filterGenre || artist.genre === filterGenre;
      const matchesSpecialty = !filterSpecialty || artist.specialty === filterSpecialty;
      const matchesSeason = filterMaxSeason === "" || getArtistSeasonOrder(artist) <= maxOrder;
      return matchesSearch && matchesRank && matchesGenre && matchesSpecialty && matchesSeason;
    });
  }, [searchQuery, filterRank, filterGenre, filterSpecialty, filterMaxSeason]);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 900;

  const rankOrder: Record<string, number> = { UR: 1, "UR Roma": 1, "UR Bali": 1, SSR: 2, SR: 3, R: 4 };
  const getRankSort = (r: string) => rankOrder[r] || 99;
  const sortedArtists = [...filteredArtists].sort((a, b) => getRankSort(a.rank) - getRankSort(b.rank));

  if (!mounted) {
    return <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>{t.loading}</div>;
  }

  // Render mobile version on small screens
  if (isMobile) {
    return <MobileArtistsPage />;
  }

  return (
    <>
      
      <div className="page-container">
        {/* Header with title and ads */}
        <div className="page-header">
          <h1 className="page-title">{t.pageTitle || "🎤 Artists"}</h1>
          <p className="page-subtitle">{t.pageSubtitle || "Discover all characters"}</p>
          <div style={{ maxWidth: 920, margin: "12px auto 16px", textAlign: "left", background: "rgba(26,26,44,0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: "0.94rem", color: "rgba(255,255,255,0.9)", marginBottom: 6 }}>
              {t.teamBuilderMethodology}
            </div>
            <div style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.6 }}>
              {t.teamBuilderMethodologyDesc}
            </div>
          </div>
          <AdSlot slot="teambuilder" lang={lang} />
        </div>

        <Breadcrumb
          items={[
            { label: "Team Builder", href: "/teambuilder/" },
          ]}
          lang={lang}
        />

        {/* Sentinel: when this scrolls out of view, panel becomes fixed */}
        <div ref={panelSentinelRef} style={{ height: 0, pointerEvents: 'none' }} />

        {/* TOP PANEL */}
        <div
          ref={panelRef}
          className="top-panel"
          style={panelFixed ? {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1001,
          } : undefined}
        >
          {/* Column 1: Artist Preview (30%) */}
          <div className="panel-col panel-col-1">
            <div className="artist-preview-card">
              <div className="artist-preview-title">
                <span style={{ display: 'none' }}>{t.artistOverview}</span>
              </div>
              {selectedArtist ? (
                <div className="artist-preview-content">
                  <div
                    className="artist-preview-image-large"
                    onClick={() => router.push(`/${lang}/artist/${slugify(selectedArtist.name)}`)}
                    onDoubleClick={() => router.push(`/${lang}/artist/${slugify(selectedArtist.name)}`)}
                    title={t.viewProfileTitle}
                    style={{ cursor: "pointer" }}
                  >
                    {selectedArtist.image ? (
                      <Image src={`/assets/images/artists/${selectedArtist.image}`} alt={selectedArtist.name} width={160} height={200} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    ) : (
                      <span style={{ fontSize: "3rem", fontWeight: 800, color: rankColors[selectedArtist.rank] }}>{selectedArtist.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="artist-preview-info">
                    <div className="artist-preview-nav">
                      <button 
                        aria-label="Previous artist"
                        onClick={() => {
                          const idx = sortedArtists.findIndex(a => a.id === selectedArtist?.id);
                          if (idx > 0) setSelectedArtist(sortedArtists[idx - 1]);
                        }}
                        disabled={!selectedArtist || sortedArtists.findIndex(a => a.id === selectedArtist.id) === 0}
                      >◀</button>
                      <span style={{ color: rankColors[selectedArtist.rank], fontWeight: 700 }}>{selectedArtist.name}</span>
                      <button 
                        aria-label="Next artist"
                        onClick={() => {
                          const idx = sortedArtists.findIndex(a => a.id === selectedArtist?.id);
                          if (idx >= 0 && idx < sortedArtists.length - 1) setSelectedArtist(sortedArtists[idx + 1]);
                        }}
                        disabled={!selectedArtist || sortedArtists.findIndex(a => a.id === selectedArtist.id) >= sortedArtists.length - 1}
                      >▶</button>
                    </div>
                    <div className="artist-preview-details">
                      <div className="detail-col">
                        <p>🏠 {selectedArtist.group}</p>
                        <p>🎯 {selectedArtist.position}</p>
                        <p>💎 {selectedArtist.specialty || selectedArtist.genre}</p>
                        {selectedArtist.acquisitionTier && acquisitionStyles[selectedArtist.acquisitionTier] && (
                          <p style={{ color: acquisitionStyles[selectedArtist.acquisitionTier].color }}>
                            💳 {t.acquisition}: {acquisitionStyles[selectedArtist.acquisitionTier].label}
                          </p>
                        )}
                      </div>
                      <div className="detail-col">
                        <p>🎵 {selectedArtist.genre}</p>
                        <p>📊 {t.rankLabel}: <span style={{ color: rankColors[selectedArtist.rank], fontWeight: 700 }}>{selectedArtist.rank}</span></p>
                        {selectedArtist.calculatedTier && <p>⭐ {t.tier}: {selectedArtist.calculatedTier}</p>}
                        {(selectedArtist as any).season && <p>📍 {seasonLabels[lang]}: {(selectedArtist as any).season}</p>}
                      </div>
                    </div>
                    <div className="artist-preview-skills">
                      {selectedArtist.skills?.slice(0, 3).map((skill, i) => (
                        <p key={i} className="skill-line">{i === 0 ? "⚔️ " : "✨ "}{skill}</p>
                      ))}
                    </div>
                    <button onClick={() => router.push(`/${lang}/artist/${slugify(selectedArtist.name)}`)} className="view-profile-btn">
                      {t.profile}
                    </button>
                    <div className="add-buttons">
                      {selectedArtist && !team1.find(a => a.id === selectedArtist.id) && team1.length < 5 && (
                        <button onClick={() => addToTeam1(selectedArtist)} className="add-team-btn team1">{t.addTeam1}</button>
                      )}
                      {selectedArtist && !team2.find(a => a.id === selectedArtist.id) && team2.length < 5 && (
                        <button onClick={() => addToTeam2(selectedArtist)} className="add-team-btn team2">{t.addTeam2}</button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="artist-preview-empty">
                  <p>{t.selectArtist}</p>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Team 1 (35%) */}
          <div className="panel-col panel-col-2">
            <div className="team-card team-1">
              {/* Header with trash icon */}
              <div className="team-card-header">
                <button onClick={() => setTeam1([])} className="trash-btn" title={t.clearTeam}>🗑️</button>
              </div>
              {/* Slots row */}
              <div className="team-slots">
                {[0,1,2,3,4].map(i => (
                  <div key={i} onClick={() => team1[i] && removeFromTeam1(team1[i].id)} className="team-slot" title={team1[i] ? t.clickToRemove : ""}>
                    {team1[i] ? (
                      team1[i].image
                        ? <Image src={`/assets/images/artists/${team1[i].image}`} alt={team1[i].name} fill sizes="69px" style={{ objectFit: "cover" }} />
                        : <span style={{ color: rankColors[team1[i].rank], fontWeight: 800, fontSize: "1rem" }}>{team1[i].name.charAt(0)}</span>
                    ) : <span className="slot-plus">+</span>}
                  </div>
                ))}
              </div>
              {/* Genres row */}
                <div className="team-genres">
                  {Object.keys(team1Stats.genreCounts).length > 0
                    ? Object.entries(team1Stats.genreCounts).map(([genre, count]) => (
                        <span key={genre} className="genre-badge" style={{ background: genreColors[genre] || 'rgba(139,92,246,0.25)' }}>{genre} ×{count}</span>
                      ))
                    : <span className="genre-badge-empty">—</span>
                  }
                </div>
              {/* Stats — fixed height rows, no scroll */}
              <div className="team-stats-grid">
                 {[
                   { label: "💥 DMG Factor", v1: team1Stats.skillDamageRaw, v2: team2Stats.skillDamageRaw, color: "#ff8c42" },
                   { label: "⚔️ Skill DMG",  v1: team1Stats.skillDamage,    v2: team2Stats.skillDamage,    color: "#ff6b6b", suffix: "%" },
                   { label: "👊 Basic ATK",  v1: team1Stats.basicAttackPercent, v2: team2Stats.basicAttackPercent, color: "#4ecdc4", suffix: "%" },
                   { label: "🛡️ Resistance", v1: team1Stats.attackResist,   v2: team2Stats.attackResist,   color: "#95e1d3", suffix: "%" },
                   { label: "✨ S.Resist",   v1: team1Stats.skillResist,     v2: team2Stats.skillResist,     color: "#a29bfe", suffix: "%" },
                   { label: "🎵 Fan Cap",    v1: team1Stats.fanCapacity,     v2: team2Stats.fanCapacity,     color: "#ffd700", suffix: "%" },
                   { label: "🚀 Rally Cap",  v1: team1Stats.rallyCapacity,   v2: team2Stats.rallyCapacity,   color: "#00ff88", suffix: "%" },
                 ].map(({ label, v1, v2, color, suffix = "" }, i) => {
                   const diff = v1 - v2;
                   const diffColor = diff > 0 ? "#4ade80" : diff < 0 ? "#f87171" : "rgba(255,255,255,0.30)";
                   const diffIcon = diff > 0 ? "▲" : diff < 0 ? "▼" : "—";
                   const absDiff = Math.abs(diff);
                   return (
                      <div key={i} className="stat-row">
                        <span className="stat-label" style={{ color }}>{label}</span>
                        <span className="stat-value">
                          <span className="stat-number">{v1}{suffix}</span>
                          <span className="stat-diff" style={{ color: diffColor }}>{diffIcon}{absDiff > 0 ? absDiff + suffix : ""}</span>
                        </span>
                      </div>
                   );
                 })}
              </div>
            </div>
          </div>

          {/* Column 3: Team 2 (35%) */}
          <div className="panel-col panel-col-3">
            <div className="team-card team-2">
              {/* Header with trash icon */}
              <div className="team-card-header">
                <button onClick={() => setTeam2([])} className="trash-btn" title={t.clearTeam}>🗑️</button>
              </div>
              {/* Slots row */}
              <div className="team-slots">
                {[0,1,2,3,4].map(i => (
                  <div key={i} onClick={() => team2[i] && removeFromTeam2(team2[i].id)} className="team-slot" title={team2[i] ? t.clickToRemove : ""}>
                    {team2[i] ? (
                      team2[i].image
                        ? <Image src={`/assets/images/artists/${team2[i].image}`} alt={team2[i].name} fill sizes="69px" style={{ objectFit: "cover" }} />
                        : <span style={{ color: rankColors[team2[i].rank], fontWeight: 800, fontSize: "1rem" }}>{team2[i].name.charAt(0)}</span>
                    ) : <span className="slot-plus">+</span>}
                  </div>
                ))}
              </div>
               {/* Genres row */}
                <div className="team-genres">
                  {Object.keys(team2Stats.genreCounts).length > 0
                    ? Object.entries(team2Stats.genreCounts).map(([genre, count]) => (
                        <span key={genre} className="genre-badge" style={{ background: genreColors[genre] || 'rgba(139,92,246,0.25)' }}>{genre} ×{count}</span>
                      ))
                    : <span className="genre-badge-empty">—</span>
                  }
                </div>
              {/* Stats — fixed rows */}
              <div className="team-stats-grid">
                {[
                  { label: "💥 DMG Factor", v: team2Stats.skillDamageRaw,       color: "#ff8c42" },
                  { label: "⚔️ Skill DMG",  v: team2Stats.skillDamage,          color: "#ff6b6b", suffix: "%" },
                  { label: "👊 Basic ATK",  v: team2Stats.basicAttackPercent,    color: "#4ecdc4", suffix: "%" },
                  { label: "🛡️ Resistance", v: team2Stats.attackResist,          color: "#95e1d3", suffix: "%" },
                  { label: "✨ S.Resist",   v: team2Stats.skillResist,           color: "#a29bfe", suffix: "%" },
                  { label: "🎵 Fan Cap",    v: team2Stats.fanCapacity,           color: "#ffd700", suffix: "%" },
                  { label: "🚀 Rally Cap",  v: team2Stats.rallyCapacity,         color: "#00ff88", suffix: "%" },
                ].map(({ label, v, color, suffix = "" }, i) => (
                  <div key={i} className="stat-row">
                    <span className="stat-label" style={{ color }}>{label}</span>
                    <span className="stat-value">
                      <span className="stat-number">{v}{suffix}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add to Selected Team */}
        {/* BOTTOM - Artists Grid */}
        <div className="artists-bottom" style={panelFixed ? { paddingTop: 'calc(40vh + 50px + 240px)' } : undefined}>
          <div className="search-bar" style={panelFixed ? { position: 'fixed', top: '40vh', left: 0, right: 0, zIndex: 1002 } : {}}>
            <label htmlFor="artist-search" className="sr-only">{t.search}</label>
            <input
              id="artist-search"
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label htmlFor="filter-rank" className="sr-only">{t.allRanks}</label>
            <select id="filter-rank" value={filterRank} onChange={(e) => setFilterRank(e.target.value)}>
              <option value="">{t.allRanks}</option>
              {RANKS.map(rank => (<option key={rank} value={rank}>{rank}</option>))}
            </select>
            <label htmlFor="filter-genre" className="sr-only">{t.allGenres}</label>
            <select id="filter-genre" value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
              <option value="">{t.allGenres}</option>
              {GENRES.map(genre => (<option key={genre} value={genre}>{genre}</option>))}
            </select>
            <label htmlFor="filter-specialty" className="sr-only">{t.allSpecialties}</label>
            <select id="filter-specialty" value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)}>
              <option value="">{t.allSpecialties}</option>
              {SPECIALTY_KEYS.map(key => {
                const frValue = SPECIALTY_VALUES[SPECIALTY_KEYS.indexOf(key)];
                const label = SPECIALTY_LABELS_BY_LANG[lang]?.[key] || SPECIALTY_LABELS_BY_LANG['en'][key] || frValue;
                return <option key={key} value={frValue}>{label}</option>;
              })}
            </select>
            <label htmlFor="filter-season" className="sr-only">{t.allSeasons}</label>
            <select id="filter-season" value={filterMaxSeason} onChange={(e) => setFilterMaxSeason(e.target.value)}>
              <option value="">{t.allSeasons}</option>
              {SEASON_LABELS.map(s => (<option key={s} value={s}>{`${t.maxSeason} : ${s}`}</option>))}
            </select>
          </div>
          <div className="artists-count">{filteredArtists.length} {t.foundArtists}</div>

          <div className="artists-grid" key={`grid-${filteredArtists.length}-${searchQuery}-${filterRank}-${filterGenre}-${filterSpecialty}`}>
            {sortedArtists.map((artist: Artist) => (
                <button
                  key={artist.id}
                  onClick={() => {
                    setSelectedArtist(artist);
                    setHoveredArtistId(null);
                    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                  }}
                  onMouseEnter={(e) => {
                    // Store initial position so tooltip has coords when timer fires
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                    hoverTimerRef.current = setTimeout(() => setHoveredArtistId(artist.id), 2000);
                  }}
                  onMouseLeave={() => {
                    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                    setHoveredArtistId(null);
                    setTooltipPos(null);
                  }}
                  onMouseMove={(e) => {
                    // Always update position while hovering
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                  }}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const isInTeam1 = team1.some(a => a.id === artist.id);
                    const isInTeam2 = team2.some(a => a.id === artist.id);
                    
                    if (isInTeam1 && isInTeam2) {
                      // In both teams: do nothing
                      return;
                    } else if (isInTeam1) {
                      // In Team1 only: add to Team2 (keep in Team1)
                      if (team2.length < 5) {
                        setTeam2([...team2, artist]);
                      }
                    } else if (isInTeam2) {
                      // In Team2 only: add to Team1
                      if (team1.length < 5) {
                        setTeam1([...team1, artist]);
                      }
                    } else {
                      // Not in any team: add to Team1
                      if (team1.length < 5) {
                        setTeam1([...team1, artist]);
                      }
                    }
                  }}
                  className={selectedArtist?.id === artist.id ? "selected" : ""}
                  style={{ cursor: "pointer" }}
                >
                  {artist.image ? (
                     <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} fill sizes="(max-width: 900px) calc(100vw / 6), calc(100vw / 9)" style={{ objectFit: "cover" }} />
                   ) : (
                  <div className="artist-placeholder">
                    <span style={{ color: rankColors[artist.rank], fontWeight: 800 }}>{artist.name.charAt(0)}</span>
                  </div>
                )}
              </button>
            ))}
            {hoveredArtistId && tooltipPos && (
              <div style={{
                position: "fixed",
                left: tooltipPos.x,
                top: tooltipPos.y + 16,
                transform: "translateX(-50%)",
                background: "rgba(15,15,30,0.92)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "10px 14px",
                whiteSpace: "nowrap",
                zIndex: 99999,
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                pointerEvents: "none",
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
              }}>
                <div>👆 {t.tooltipSingle}</div>
                <div>👆 {t.tooltipDouble}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
        }
        .page-header {
          padding: 20px 12px;
          text-align: center;
        }
        .page-title {
          margin-bottom: 10px;
          background: linear-gradient(135deg, #f472b6, #c084fc, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 2.5rem;
          font-weight: 800;
        }
        .page-subtitle {
          color: rgba(255,255,255,0.6);
          margin-bottom: 20px;
        }
        .top-panel {
          display: flex;
          width: 100%;
          height: 40vh;
          min-height: 300px;
          gap: 8px;
          padding: 8px;
          background: #0f0f1a;
          position: relative;
          z-index: 1001;
          transition: box-shadow 0.3s ease;
        }
        .panel-col {
          height: 100%;
          overflow: hidden;
        }
        .panel-col-1 { width: 30%; }
        .panel-col-2 { width: 35%; }
        .panel-col-3 { width: 35%; }
        
        .artist-preview-card {
          background: rgba(30,30,50,0.95);
          border-radius: 8px;
          border: 1px solid rgba(139,92,246,0.3);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .artist-preview-title {
          padding: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          background: linear-gradient(135deg, rgba(255,77,141,0.15), rgba(139,92,246,0.15));
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
        }
        .artist-preview-content {
          padding: 8px;
          display: flex;
          gap: 12px;
          flex: 1;
        }
        .artist-preview-image-large {
          position: relative;
          width: 160px;
          height: 200px;
          border-radius: 8px;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .artist-preview-image-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .artist-preview-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 0.7rem;
          overflow: hidden;
        }
        .artist-preview-details {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }
        .detail-col {
          flex: 1;
        }
        .detail-col p {
          margin: 2px 0;
          color: rgba(255,255,255,0.82);
          font-size: 0.72rem;
          font-weight: 500;
        }
        .artist-preview-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 4px;
        }
        .artist-preview-nav button {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          color: #fff;
          cursor: pointer;
          font-size: 0.6rem;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .artist-preview-nav button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .artist-preview-nav span {
          flex: 1;
          text-align: center;
          font-weight: 700;
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
        }
        .artist-preview-info p {
          color: rgba(255,255,255,0.8);
          margin: 2px 0;
          font-size: 0.72rem;
        }
        .artist-preview-skills {
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .skill-line {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.7);
          margin: 2px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .view-profile-btn {
          display: inline-block;
          margin-top: 8px;
          padding: 6px 12px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
          border-radius: 4px;
          font-size: 0.65rem;
          text-decoration: none;
          text-align: center;
        }
        .add-buttons {
          display: flex;
          gap: 6px;
          margin-top: 6px;
        }
        .add-team-btn {
          flex: 1;
          padding: 6px 8px;
          border-radius: 4px;
          border: none;
          color: white;
          font-size: 0.6rem;
          font-weight: 600;
          cursor: pointer;
        }
        .add-team-btn.team1 {
          background: #8b5cf6;
        }
        .add-team-btn.team2 {
          background: #06b6d4;
        }
        .artist-preview-empty {
          padding: 20px;
          text-align: center;
          color: rgba(255,255,255,0.4);
          font-size: 0.8rem;
        }
        
        .team-card {
          background: rgba(30,30,50,0.95);
          border-radius: 8px;
          border: 1px solid rgba(139,92,246,0.3);
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 6px 8px;
          box-sizing: border-box;
          overflow: hidden;
        }
        .team-1 { border-color: rgba(139,92,246,0.5); }
        .team-2 { border-color: rgba(6,182,212,0.5); }

        /* Header: trash only */
        .team-card-header {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 3px;
          flex-shrink: 0;
        }
        .trash-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 5px;
          padding: 2px 6px;
          font-size: 0.75rem;
          cursor: pointer;
          color: rgba(255,255,255,0.5);
          line-height: 1;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .trash-btn:hover {
          border-color: #f87171;
          color: #f87171;
          background: rgba(248,113,113,0.1);
        }

        /* Slots */
        .team-slots {
          display: flex;
          gap: 4px;
          margin-bottom: 5px;
          justify-content: center;
          flex-shrink: 0;
          margin-top: -12px;
        }
        .team-slot {
          width: 69px;
          height: 87px;
          border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          transition: border-color 0.15s, transform 0.15s;
          flex-shrink: 0;
        }
        .team-slot:hover {
          border-color: rgba(255,80,80,0.6);
          transform: scale(1.04);
        }
        .slot-plus {
          color: rgba(255,255,255,0.2);
          font-size: 1rem;
        }

        /* Genres */
        .team-genres {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-bottom: 5px;
          justify-content: center;
          flex-shrink: 0;
          min-height: 16px;
        }
        .genre-badge {
          padding: 3px 8px;
          background: rgba(139,92,246,0.25);
          border-radius: 8px;
          font-size: 0.8rem;
          color: #fff;
          white-space: nowrap;
          font-weight: 600;
        }
        .genre-badge-empty {
          color: rgba(255,255,255,0.2);
          font-size: 0.6rem;
        }

        /* Stats grid — fixed rows, NO overflow scroll */
        .team-stats-grid {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          gap: 1px;
        }
        .stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          min-height: 0;
          padding: 1px 4px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          border-radius: 3px;
        }
        .stat-row:last-child { border-bottom: none; }
        .stat-row:nth-child(odd) {
          background: rgba(255,255,255,0.03);
        }
        .stat-label {
          font-size: 0.68rem;
          font-weight: 600;
          color: rgba(255,255,255,0.82);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          min-width: 0;
          letter-spacing: 0.01em;
        }
        .stat-value {
          font-size: 0.72rem;
          font-weight: 700;
          color: #fff;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          gap: 0;
        }
        .stat-number {
          display: inline-block;
          width: 52px;
          text-align: right;
          font-size: 0.72rem;
          font-weight: 700;
          color: rgba(255,255,255,0.88);
          font-variant-numeric: tabular-nums;
        }
        .stat-diff {
          display: inline-block;
          width: 52px;
          text-align: left;
          padding-left: 4px;
          font-size: 0.62rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }
        
        .artists-bottom {
          padding: 8px;
          padding-bottom: 100px;
          min-height: 100vh;
        }
        .search-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 0;
          padding: 8px;
          background: #0f0f1a;
        }
        .search-bar input {
          flex: 1;
          padding: 10px 12px;
          background: #0f0f1a;
          border: 1px solid #333;
          border-radius: 8px;
          color: #fff;
          font-size: 0.9rem;
        }
        .search-bar select {
          padding: 10px;
          background: #0f0f1a;
          border: 1px solid #333;
          border-radius: 8px;
          color: #fff;
          font-size: 0.85rem;
          cursor: pointer;
        }
        .artists-count {
          font-size: 0.85rem;
          color: #888;
          margin-bottom: 8px;
        }
        
        .artists-grid {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 4px;
        }
        .artists-grid button {
          aspect-ratio: 3/4;
          border-radius: 8px;
          border: 2px solid rgba(255,255,255,0.1);
          background: rgba(30,30,50,0.9);
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }
        .artists-grid button.selected {
          border-width: 2px;
        }
        .artists-grid button img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .artist-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 800;
        }

        
        /* Mobile - 20/40/40 columns */
        @media (max-width: 900px) {
          .page-header {
            display: none;
          }
          .top-panel {
            flex-direction: row;
            height: 40vh;
            min-height: 300px;
            max-height: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
          }
          .panel-col-1 { width: 28%; }
          .panel-col-2 { width: 40%; }
          .panel-col-3 { width: 32%; }
          
          /* Mobile artist preview - smaller image, buttons below */
          .artist-preview-content {
            flex-direction: column;
            align-items: center;
          }
          .artist-preview-image-large {
            width: 50px;
            height: 70px;
          }
          .artist-preview-info {
            font-size: 0.55rem;
          }
          .artist-preview-details {
            display: none;
          }
          .artist-preview-skills {
            display: none;
          }
          .artist-preview-nav {
            margin-bottom: 4px;
          }
          .view-profile-btn, .add-buttons {
            width: 100%;
            margin-top: 3px;
            padding: 6px 10px;
            font-size: 0.55rem;
            font-weight: 600;
            border-radius: 6px;
            text-align: center;
            border: none;
            cursor: pointer;
          }
          .view-profile-btn {
            background: linear-gradient(135deg, #f472b6, #c084fc);
            color: white;
            text-decoration: none;
            display: block;
          }
          .add-buttons {
            flex-direction: column;
            gap: 3px;
          }
          .add-team-btn {
            width: 100%;
            padding: 6px 10px;
            font-size: 0.55rem;
            font-weight: 600;
            border-radius: 6px;
            border: none;
          }
          .add-team-btn.team1 {
            background: linear-gradient(135deg, #8b5cf6, #a78bfa);
            color: white;
          }
          .add-team-btn.team2 {
            background: linear-gradient(135deg, #06b6d4, #22d3ee);
            color: white;
          }
          
          /* Team trash btn smaller on mobile */
          .trash-btn {
            padding: 1px 4px;
            font-size: 0.65rem;
          }
          
          .artists-bottom {
            padding-bottom: 100px;
            min-height: 100vh;
            padding-top: 48vh;
          }
          .search-bar {
            position: fixed;
            top: 40vh;
            left: 0;
            right: 0;
            margin-bottom: 0;
            z-index: 101;
            width: 100vw !important;
            padding: 8px 12px !important;
            box-sizing: border-box !important;
          }
          .top-panel {
            z-index: 100;
          }
          .artists-grid {
            grid-template-columns: repeat(6, 1fr);
          }
          
          /* Background handling */
          body {
            background-image: none !important;
          }
          
          /* Nav buttons styling */
          .artist-preview-nav button {
            opacity: 1;
          }
          .artist-preview-nav button:disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }
        }
      `}</style>
    </>
  );
}
