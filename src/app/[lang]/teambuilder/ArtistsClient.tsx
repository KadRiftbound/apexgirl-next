"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import artistsData from "@/lib/data/artists.json";
import { AdBanner } from "@/components/AdSense";
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

const tierBadgeColors: Record<string, string> = {
  "S+": "#d4a017", S: "#eab308", A: "#22c55e", B: "#3b82f6", C: "#f59e0b", D: "#64748b",
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


const copyToClipboard = async (text: string): Promise<boolean> => {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch { return false; }
};

type SavedTeam = { id: string; name: string; ids: number[]; createdAt: number };

const idsToArtists = (ids: number[]): Artist[] =>
  ids.map((id) => artistsData.find((a: Artist) => a.id === id)).filter(Boolean).slice(0, 5) as Artist[];

const readLS = (key: string, fallback: string): string => {
  if (typeof window === 'undefined') return fallback;
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
};

/** Team from ?t1= / ?t2= in the URL takes priority over localStorage. */
const loadInitialTeam = (n: 1 | 2): Artist[] => {
  if (typeof window === 'undefined') return [];
  try {
    const fromUrl = new URLSearchParams(window.location.search).get(`t${n}`);
    if (fromUrl) {
      const ids = fromUrl.split(',').map((x) => parseInt(x, 10)).filter((x) => !Number.isNaN(x));
      if (ids.length) return idsToArtists(ids);
    }
    const saved = localStorage.getItem(`team${n}`);
    if (saved) return idsToArtists(JSON.parse(saved));
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') console.warn(`Team ${n} load failed`, e);
  }
  return [];
};

export default function ArtistsClient({ lang }: { lang: string }) {
  const router = useRouter();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [hoveredArtistId, setHoveredArtistId] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [team1, setTeam1] = useState<Artist[]>(() => loadInitialTeam(1));
  const [team2, setTeam2] = useState<Artist[]>(() => loadInitialTeam(2));
  const [team1Name, setTeam1Name] = useState<string>(() => readLS('team1Name', ''));
  const [team2Name, setTeam2Name] = useState<string>(() => readLS('team2Name', ''));
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>(() => {
    const raw = readLS('savedTeams', '[]');
    try { const arr = JSON.parse(raw); return Array.isArray(arr) ? arr : []; } catch { return []; }
  });
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [filterMaxSeason, setFilterMaxSeason] = useState("");
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => { try { localStorage.setItem('team1Name', team1Name); } catch {} }, [team1Name]);
  useEffect(() => { try { localStorage.setItem('team2Name', team2Name); } catch {} }, [team2Name]);
  useEffect(() => { try { localStorage.setItem('savedTeams', JSON.stringify(savedTeams)); } catch {} }, [savedTeams]);

  const saveTeam = (n: 1 | 2) => {
    const team = n === 1 ? team1 : team2;
    if (team.length === 0) { showToast(t.emptyTeam); return; }
    const rawName = (n === 1 ? team1Name : team2Name).trim();
    const name = rawName || `${n === 1 ? t.team1Label : t.team2Label} · ${new Date().toLocaleDateString()}`;
    const entry: SavedTeam = { id: `${Date.now()}-${n}`, name, ids: team.map((a) => a.id), createdAt: Date.now() };
    setSavedTeams((prev) => [entry, ...prev].slice(0, 30));
    showToast(`💾 ${t.teamSaved} : ${name}`);
  };

  const loadSaved = (saved: SavedTeam, n: 1 | 2) => {
    const team = idsToArtists(saved.ids);
    if (n === 1) { setTeam1(team); setTeam1Name(saved.name); } else { setTeam2(team); setTeam2Name(saved.name); }
  };

  const deleteSaved = (id: string) => setSavedTeams((prev) => prev.filter((s) => s.id !== id));

  const shareTeams = async () => {
    const parts: string[] = [];
    if (team1.length) parts.push('t1=' + team1.map((a) => a.id).join(','));
    if (team2.length) parts.push('t2=' + team2.map((a) => a.id).join(','));
    if (!parts.length) { showToast(t.emptyTeam); return; }
    const url = `${window.location.origin}/${lang}/teambuilder/?${parts.join('&')}`;
    if (await copyToClipboard(url)) {
      showToast(`🔗 ${t.linkCopied}`);
    } else {
      showToast(url);
    }
  };

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
      
      {toast && <div className="tb-toast" role="status">{toast}</div>}
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
          <AdBanner />
        </div>

        <Breadcrumb
          items={[
            { label: "Team Builder", href: "/teambuilder/" },
          ]}
          lang={lang}
        />

        {/* TOP PANEL: sticks under the site header while the grid scrolls */}
        <div className="top-panel">
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
                    onClick={() => router.push(`/${lang}/artist/${slugify(selectedArtist.name)}/`)}
                    onDoubleClick={() => router.push(`/${lang}/artist/${slugify(selectedArtist.name)}/`)}
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
                    <button onClick={() => router.push(`/${lang}/artist/${slugify(selectedArtist.name)}/`)} className="view-profile-btn">
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
                <span className="team-badge team-badge-1">1</span>
                <input
                  className="team-name-input"
                  value={team1Name}
                  onChange={(e) => setTeam1Name(e.target.value)}
                  placeholder={t.team1Label}
                  maxLength={24}
                  aria-label={t.teamNamePlaceholder}
                />
                <div className="team-actions">
                  <button onClick={() => saveTeam(1)} className="icon-btn" title={t.saveTeam}>💾</button>
                  <button onClick={shareTeams} className="icon-btn" title={t.shareTeam}>🔗</button>
                  <button onClick={() => setTeam1([])} className="trash-btn" title={t.clearTeam}>🗑️</button>
                </div>
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
                <span className="team-badge team-badge-2">2</span>
                <input
                  className="team-name-input"
                  value={team2Name}
                  onChange={(e) => setTeam2Name(e.target.value)}
                  placeholder={t.team2Label}
                  maxLength={24}
                  aria-label={t.teamNamePlaceholder}
                />
                <div className="team-actions">
                  <button onClick={() => saveTeam(2)} className="icon-btn" title={t.saveTeam}>💾</button>
                  <button onClick={shareTeams} className="icon-btn" title={t.shareTeam}>🔗</button>
                  <button onClick={() => setTeam2([])} className="trash-btn" title={t.clearTeam}>🗑️</button>
                </div>
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
        <div className="artists-bottom">
          <div className="search-bar">
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
          <div className="saved-teams">
            <span className="saved-teams-title">📁 {t.myTeams}</span>
            {savedTeams.length === 0 ? (
              <span className="saved-empty">{t.noSavedTeams}</span>
            ) : savedTeams.map((s) => (
              <div key={s.id} className="saved-chip">
                <span className="saved-avatars">
                  {s.ids.slice(0, 5).map((id) => {
                    const a = artistsData.find((x: Artist) => x.id === id);
                    if (!a) return null;
                    return a.image
                      ? <Image key={id} src={`/assets/images/artists/${a.image}`} alt={a.name} width={22} height={28} style={{ objectFit: "cover", borderRadius: 3 }} />
                      : <span key={id} className="saved-avatar-letter">{a.name.charAt(0)}</span>;
                  })}
                </span>
                <span className="saved-name" title={s.name}>{s.name}</span>
                <button className="saved-btn b1" onClick={() => loadSaved(s, 1)} title={`${t.loadInto} 1`}>→1</button>
                <button className="saved-btn b2" onClick={() => loadSaved(s, 2)} title={`${t.loadInto} 2`}>→2</button>
                <button className="saved-btn del" onClick={() => deleteSaved(s.id)} title={t.deleteSaved}>✕</button>
              </div>
            ))}
          </div>
          <div className="artists-count">{filteredArtists.length} {t.foundArtists} · <span className="hint">{t.hintAdd}</span></div>

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
                  className={`artist-card${selectedArtist?.id === artist.id ? " selected" : ""}`}
                  style={{ cursor: "pointer", borderColor: selectedArtist?.id === artist.id ? rankColors[artist.rank] : undefined }}
                >
                  {artist.image ? (
                     <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} fill sizes="(max-width: 900px) calc(100vw / 6), calc(100vw / 9)" style={{ objectFit: "cover" }} />
                   ) : (
                  <div className="artist-placeholder">
                    <span style={{ color: rankColors[artist.rank], fontWeight: 800 }}>{artist.name.charAt(0)}</span>
                  </div>
                )}
                  {(() => {
                    const inT1 = team1.some((a) => a.id === artist.id);
                    const inT2 = team2.some((a) => a.id === artist.id);
                    return (
                      <>
                        <span className="card-rank" style={{ color: rankColors[artist.rank] || "#fff" }}>{artist.rank}</span>
                        {artist.calculatedTier && (
                          <span className="card-tier" style={{ background: tierBadgeColors[artist.calculatedTier] || "#64748b" }}>{artist.calculatedTier}</span>
                        )}
                        {(inT1 || inT2) && (
                          <span className="card-inteam">
                            {inT1 && <span className="card-inteam-1">1</span>}
                            {inT2 && <span className="card-inteam-2">2</span>}
                          </span>
                        )}
                        <span className="card-name">{artist.name}</span>
                        <span className="card-hover" onDoubleClick={(e) => e.stopPropagation()}>
                          <span
                            role="button"
                            className={`card-add t1${inT1 || team1.length >= 5 ? " off" : ""}`}
                            title={t.addTeam1}
                            onClick={(e) => { e.stopPropagation(); if (!inT1) addToTeam1(artist); }}
                          >+1</span>
                          <span
                            role="button"
                            className={`card-add t2${inT2 || team2.length >= 5 ? " off" : ""}`}
                            title={t.addTeam2}
                            onClick={(e) => { e.stopPropagation(); if (!inT2) addToTeam2(artist); }}
                          >+2</span>
                        </span>
                      </>
                    );
                  })()}
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
          height: max(40vh, 300px);
          gap: 8px;
          padding: 8px;
          background: #0f0f1a;
          position: sticky;
          top: var(--header-height);
          z-index: 50;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
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
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
          flex-shrink: 0;
        }
        .team-badge {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
        }
        .team-badge-1 { background: #8b5cf6; }
        .team-badge-2 { background: #06b6d4; }
        .team-name-input {
          flex: 1;
          min-width: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 6px;
          color: #fff;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 8px;
        }
        .team-name-input:focus { outline: none; border-color: rgba(255,255,255,0.35); }
        .team-name-input::placeholder { color: rgba(255,255,255,0.45); font-weight: 500; }
        .team-actions { display: flex; gap: 4px; flex-shrink: 0; }
        .icon-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 5px;
          padding: 2px 6px;
          font-size: 0.75rem;
          cursor: pointer;
          color: rgba(255,255,255,0.7);
          line-height: 1;
          transition: all 0.15s;
        }
        .icon-btn:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.08); color: #fff; }

        .tb-toast {
          position: fixed;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          padding: 12px 24px;
          border-radius: 40px;
          background: rgba(22, 163, 74, 0.95);
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 8px 32px rgba(34,197,94,0.4);
          border: 1px solid #22c55e;
          max-width: min(90vw, 720px);
          word-break: break-all;
          text-align: center;
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
          margin-top: 2px;
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
          margin: 0 -8px 8px;
          padding: 8px;
          background: #0f0f1a;
          position: sticky;
          top: calc(var(--header-height) + max(40vh, 300px));
          z-index: 49;
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
          box-shadow: 0 0 0 2px rgba(255,255,255,0.25);
        }
        .card-rank {
          position: absolute;
          top: 4px;
          left: 4px;
          font-size: 0.6rem;
          font-weight: 800;
          padding: 1px 5px;
          border-radius: 4px;
          background: rgba(0,0,0,0.65);
          line-height: 1.3;
          pointer-events: none;
        }
        .card-tier {
          position: absolute;
          top: 4px;
          right: 4px;
          font-size: 0.6rem;
          font-weight: 800;
          color: #fff;
          padding: 1px 5px;
          border-radius: 4px;
          line-height: 1.3;
          pointer-events: none;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        .card-inteam {
          position: absolute;
          right: 4px;
          bottom: 22px;
          display: flex;
          gap: 2px;
          pointer-events: none;
        }
        .card-inteam span {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          font-size: 0.6rem;
          font-weight: 800;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.6);
        }
        .card-inteam-1 { background: #8b5cf6; }
        .card-inteam-2 { background: #06b6d4; }
        .card-name {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 3px 4px;
          font-size: 0.62rem;
          font-weight: 700;
          color: #fff;
          text-align: center;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 40%);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          pointer-events: none;
        }
        .card-hover {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(0,0,0,0.35);
          opacity: 0;
          transition: opacity 0.15s;
        }
        .artists-grid button:hover .card-hover { opacity: 1; }
        .card-add {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 800;
          color: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          transition: transform 0.12s;
        }
        .card-add:hover { transform: scale(1.12); }
        .card-add.t1 { background: #8b5cf6; }
        .card-add.t2 { background: #06b6d4; }
        .card-add.off { opacity: 0.35; cursor: not-allowed; }
        .card-add.off:hover { transform: none; }

        .saved-teams {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          margin-bottom: 8px;
          background: rgba(30,30,50,0.7);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
        }
        .saved-teams-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          margin-right: 4px;
        }
        .saved-empty { font-size: 0.75rem; color: rgba(255,255,255,0.45); }
        .saved-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 6px 4px 4px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
        }
        .saved-avatars { display: inline-flex; gap: 2px; }
        .saved-avatar-letter {
          width: 22px; height: 28px; border-radius: 3px;
          background: rgba(255,255,255,0.1);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 0.7rem; font-weight: 800; color: #fff;
        }
        .saved-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: #fff;
          max-width: 140px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .saved-btn {
          border: none;
          border-radius: 5px;
          padding: 3px 7px;
          font-size: 0.68rem;
          font-weight: 800;
          color: #fff;
          cursor: pointer;
          line-height: 1.2;
        }
        .saved-btn.b1 { background: #8b5cf6; }
        .saved-btn.b2 { background: #06b6d4; }
        .saved-btn.del { background: rgba(248,113,113,0.25); color: #f87171; }
        .saved-btn.del:hover { background: rgba(248,113,113,0.5); color: #fff; }
        .artists-count .hint { color: rgba(255,255,255,0.4); font-weight: 400; }
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
