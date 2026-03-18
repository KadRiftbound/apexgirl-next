"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import artistsData from "@/lib/data/artists.json";
import { AdBanner } from "@/components/AdSense";
import MobileArtistsPage from "@/components/MobileArtistsPage";

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const filterTranslations: Record<string, any> = {
  fr: { all: "Tous", allGenres: "Tous genres", search: "Rechercher...", artistOverview: "Aperçu artiste", skills: "Compétences", viewFullProfile: "Voir la fiche complète", selectArtist: "Sélectionnez un artiste", teamBuilder: "Équipe", combinedStats: "Stats combinés", genres: "Genres", allRanks: "Tous les ranks", allSpecialties: "Toutes spécialités", foundArtists: "artistes trouvés", clearTeam: "Effacer", addTeam1: "+ Équipe 1", addTeam2: "+ Équipe 2", profile: "Fiche", clickToRemove: "Cliquer pour retirer", team1Stats: "Stats Équipe 1", team2Stats: "Stats Équipe 2", vs: "VS", total: "Total", acquisition: "Accès", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale", loading: "Chargement...", viewProfileTitle: "Cliquer pour voir la fiche", rankLabel: "Rang", allSeasons: "Toutes saisons", maxSeason: "Max saison", season: "Saison" },
  en: { all: "All", allGenres: "All genres", search: "Search...", artistOverview: "Artist Overview", skills: "Skills", viewFullProfile: "View full profile", selectArtist: "Select an artist", teamBuilder: "Team Builder", combinedStats: "Combined Stats", genres: "Genres", allRanks: "All ranks", allSpecialties: "All specialties", foundArtists: "artists found", clearTeam: "Clear", addTeam1: "+ Team 1", addTeam2: "+ Team 2", profile: "Profile", clickToRemove: "Click to remove", team1Stats: "Team 1 Stats", team2Stats: "Team 2 Stats", vs: "VS", total: "Total", acquisition: "Access", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale", loading: "Loading...", viewProfileTitle: "Click to view profile", rankLabel: "Rank", allSeasons: "All seasons", maxSeason: "Max season", season: "Season" },
  it: { all: "Tutti", allGenres: "Tutti i generi", search: "Cerca...", artistOverview: "Panoramica Artista", skills: "Abilità", viewFullProfile: "Visualizza profilo completo", selectArtist: "Seleziona un artista", teamBuilder: "Team Builder", combinedStats: "Stats combinati", genres: "Generi", allRanks: "Tutti i ranghi", allSpecialties: "Tutte le specialità", foundArtists: "artisti trovati", clearTeam: "Cancella", addTeam1: "+ Team 1", addTeam2: "+ Team 2", profile: "Scheda", clickToRemove: "Clicca per rimuovere", team1Stats: "Stats Team 1", team2Stats: "Stats Team 2", vs: "VS", total: "Totale", acquisition: "Accesso", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale", loading: "Caricamento...", viewProfileTitle: "Clicca per vedere la scheda", rankLabel: "Rango", allSeasons: "Tutte le stagioni", maxSeason: "Stagione max" },
  es: { all: "Todos", allGenres: "Todos los géneros", search: "Buscar...", artistOverview: "Resumen del Artista", skills: "Habilidades", viewFullProfile: "Ver perfil completo", selectArtist: "Selecciona un artista", teamBuilder: "Team Builder", combinedStats: "Stats combinados", genres: "Géneros", allRanks: "Todos los rangos", allSpecialties: "Todas las especialidades", foundArtists: "artistas encontrados", clearTeam: "Borrar", addTeam1: "+ Equipo 1", addTeam2: "+ Equipo 2", profile: "Perfil", clickToRemove: "Clic para eliminar", team1Stats: "Stats Equipo 1", team2Stats: "Stats Equipo 2", vs: "VS", total: "Total", acquisition: "Acceso", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale", loading: "Cargando...", viewProfileTitle: "Clic para ver el perfil", rankLabel: "Rango", allSeasons: "Todas las temporadas", maxSeason: "Temporada máx" },
  pt: { all: "Todos", allGenres: "Todos os gêneros", search: "Pesquisar...", artistOverview: "Visão Geral do Artista", skills: "Habilidades", viewFullProfile: "Ver perfil completo", selectArtist: "Selecione um artista", teamBuilder: "Team Builder", combinedStats: "Stats combinados", genres: "Gêneros", allRanks: "Todas as patentes", allSpecialties: "Todas as especialidades", foundArtists: "artistas encontrados", clearTeam: "Limpar", addTeam1: "+ Time 1", addTeam2: "+ Time 2", profile: "Perfil", clickToRemove: "Clique para remover", team1Stats: "Stats Time 1", team2Stats: "Stats Time 2", vs: "VS", total: "Total", acquisition: "Acesso", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale", loading: "Carregando...", viewProfileTitle: "Clique para ver o perfil", rankLabel: "Rank", allSeasons: "Todas as temporadas", maxSeason: "Temporada máx" },
  pl: { all: "Wszystkie", allGenres: "Wszystkie gatunki", search: "Szukaj...", artistOverview: "Przegląd Artysty", skills: "Umiejętności", viewFullProfile: "Zobacz pełny profil", selectArtist: "Wybierz artystę", teamBuilder: "Team Builder", combinedStats: "Łączne statystyki", genres: "Gatunki", allRanks: "Wszystkie rangi", allSpecialties: "Wszystkie specjalności", foundArtists: "znalezionych artystów", clearTeam: "Wyczyść", addTeam1: "+ Drużyna 1", addTeam2: "+ Drużyna 2", profile: "Profil", clickToRemove: "Kliknij aby usunąć", team1Stats: "Stats Drużyna 1", team2Stats: "Stats Drużyna 2", vs: "VS", total: "Suma", acquisition: "Dostęp", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale", loading: "Ładowanie...", viewProfileTitle: "Kliknij aby zobaczyć profil", rankLabel: "Ranga", allSeasons: "Wszystkie sezony", maxSeason: "Maks sezon" },
  id: { all: "Semua", allGenres: "Semua genre", search: "Cari...", artistOverview: "Ringkasan Artis", skills: "Skill", viewFullProfile: "Lihat profil lengkap", selectArtist: "Pilih artis", teamBuilder: "Team Builder", combinedStats: "Stats gabungan", genres: "Genre", allRanks: "Semua rank", allSpecialties: "Semua specialtis", foundArtists: "artis ditemukan", clearTeam: "Hapus", addTeam1: "+ Tim 1", addTeam2: "+ Tim 2", profile: "Profil", clickToRemove: "Klik untuk hapus", team1Stats: "Stats Tim 1", team2Stats: "Stats Tim 2", vs: "VS", total: "Total", acquisition: "Akses", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale", loading: "Memuat...", viewProfileTitle: "Klik untuk melihat profil", rankLabel: "Rank", allSeasons: "Semua musim", maxSeason: "Musim maks" },
  ru: { all: "Все", allGenres: "Все жанры", search: "Поиск...", artistOverview: "Обзор Артиста", skills: "Навыки", viewFullProfile: "Посмотреть полный профиль", selectArtist: "Выберите артиста", teamBuilder: "Team Builder", combinedStats: "Общие статы", genres: "Жанры", allRanks: "Все ранги", allSpecialties: "Все специализации", foundArtists: "артистов найдено", clearTeam: "Очистить", addTeam1: "+ Команда 1", addTeam2: "+ Команда 2", profile: "Профиль", clickToRemove: "Нажмите чтобы убрать", team1Stats: "Stats Команда 1", team2Stats: "Stats Команда 2", vs: "VS", total: "Всего", acquisition: "Доступ", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale", loading: "Загрузка...", viewProfileTitle: "Нажмите чтобы открыть профиль", rankLabel: "Ранг", allSeasons: "Все сезоны", maxSeason: "Макс сезон" },
};

const rankColors: Record<string, string> = {
  UR: "#ff6b6b", "UR Roma": "#ef4444", "UR Bali": "#ef4444", SSR: "#fbbf24", SR: "#8b5cf6", R: "#3b82f6",
};

const genreColors: Record<string, string> = {
  "Pop": "rgba(236, 72, 153, 0.25)",
  "Rock": "rgba(239, 68, 68, 0.25)",
  "EDM": "rgba(139, 92, 246, 0.25)",
  "Hip Hop": "rgba(245, 158, 11, 0.25)",
  "R&B": "rgba(6, 182, 212, 0.25)",
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

type Artist = {
  id: number;
  name: string;
  group: string;
  rank: string;
  genre: string;
  position: string;
  build?: string;
  skills?: string[];
  image?: string;
  specialty?: string;
  earlyGameRecommended?: boolean;
  acquisitionTier?: string;
  calculatedTier?: string;
  photos?: string;
  skillCategories?: { dps: string[]; offensive: string[]; hp: string[]; defense: string[] };
};

const GENRES = ['EDM', 'Hip Hop', 'Pop', 'R&B', 'Rock'];
const RANKS = ['UR', 'UR Roma', 'UR Bali', 'SSR', 'SR', 'R'];
const SPECIALTIES = ['Augmentation dommage', 'Dommage réduction', 'Vitesse de conduite', 'HQ Defense', 'Mixte', 'Rassemblement', 'Solo car', 'Économie'];

export default function ArtistsPage() {
  const params = useParams();
  const router = useRouter();
  const lang = (params?.lang as string) || "fr";
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
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
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [filterMaxSeason, setFilterMaxSeason] = useState("");
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const t = filterTranslations[lang] || filterTranslations.fr;

  const acquisitionStyles: Record<string, { label: string; color: string; bg: string }> = {
    f2p: { label: t.acqF2p || "F2P", color: "#22c55e", bg: "rgba(34,197,94,0.18)" },
    low: { label: t.acqLow || "Low spender", color: "#38bdf8", bg: "rgba(56,189,248,0.18)" },
    mid: { label: t.acqMid || "Mid spender", color: "#a855f7", bg: "rgba(168,85,247,0.18)" },
    whale: { label: t.acqWhale || "Whale", color: "#f59e0b", bg: "rgba(245,158,11,0.18)" },
  };

  const team = activeTeam === 1 ? team1 : team2;

  const addToTeam = (artist: Artist) => {
    if (activeTeam === 1) {
      if (team1.length < 5 && !team1.find(a => a.id === artist.id)) {
        setTeam1([...team1, artist]);
      }
    } else {
      if (team2.length < 5 && !team2.find(a => a.id === artist.id)) {
        setTeam2([...team2, artist]);
      }
    }
  };

  const removeFromTeam = (id: number) => {
    if (activeTeam === 1) {
      setTeam1(team1.filter(a => a.id !== id));
    } else {
      setTeam2(team2.filter(a => a.id !== id));
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const header = document.querySelector('.header') as HTMLElement ||
                        document.querySelector('header[role="banner"]') as HTMLElement ||
                        document.querySelector('header') as HTMLElement;

          // Hide header when the panel is about to reach it
          if (header && panelRef.current && window.innerWidth > 900) {
            const panelTop = panelRef.current.getBoundingClientRect().top;
            const headerHeight = header.offsetHeight;
            if (panelTop <= headerHeight) {
              header.classList.add('header-hidden');
            } else {
              header.classList.remove('header-hidden');
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      const header = document.querySelector('.header') as HTMLElement ||
                    document.querySelector('header[role="banner"]') as HTMLElement ||
                    document.querySelector('header') as HTMLElement;
      if (header) header.classList.remove('header-hidden');
    };
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

  const teamStats = useMemo(() => {
    let skillDamage = 0, skillDamageRaw = 0, basicAttackPercent = 0, attackResist = 0, skillResist = 0, passive = 0, fanCapacity = 0, rallyCapacity = 0;
    team.forEach(artist => {
      passive += 200;
      [...(artist.skillCategories?.dps || []), ...(artist.skillCategories?.offensive || [])].forEach(skill => {
        const match = skill.match(/(\d+)\s*Damage/);
        if (match && !skill.toLowerCase().includes('%')) skillDamageRaw += parseInt(match[1]);
        const pctMatch = skill.match(/(\d+)%/);
        if (pctMatch) {
          const val = parseInt(pctMatch[1]);
          if (skill.toLowerCase().includes('damage to player') || skill.toLowerCase().includes('player damage')) {
            skillDamage += val;
            basicAttackPercent += val;
          }
          else if (skill.toLowerCase().includes('skill damage') && !skill.toLowerCase().includes('reduction') && !skill.toLowerCase().includes('taken')) skillDamage += val;
          else if (skill.toLowerCase().includes('basic attack') && !skill.toLowerCase().includes('taken')) basicAttackPercent += val;
        }
      });
      [...(artist.skillCategories?.defense || [])].forEach(skill => {
        const match = skill.match(/(\d+)%/);
        if (match) {
          const val = parseInt(match[1]);
          if (skill.toLowerCase().includes('skill damage reduction')) skillResist += val;
          else if (skill.toLowerCase().includes('damage reduction')) attackResist += val;
        }
      });
      [...(artist.skillCategories?.hp || [])].forEach(skill => {
        const match = skill.match(/(\d+)%/);
        if (match) {
          const val = parseInt(match[1]);
          if (skill.toLowerCase().includes('fan capacity') && skill.toLowerCase().includes('rally')) rallyCapacity += val;
          else if (skill.toLowerCase().includes('fan capacity')) fanCapacity += val;
        }
      });
    });
    const genreCounts: Record<string, number> = {};
    team.forEach(artist => { const g = artist.genre?.toUpperCase() || 'Unknown'; genreCounts[g] = (genreCounts[g] || 0) + 1; });
    return { skillDamage, skillDamageRaw, basicAttackPercent, attackResist, skillResist, passive, fanCapacity, rallyCapacity, genreCounts };
  }, [team]);

  const team1Stats = useMemo(() => {
    let skillDamage = 0, skillDamageRaw = 0, basicAttackPercent = 0, attackResist = 0, skillResist = 0, passive = 0, fanCapacity = 0, rallyCapacity = 0;
    team1.forEach(artist => {
      passive += 200;
      [...(artist.skillCategories?.dps || []), ...(artist.skillCategories?.offensive || [])].forEach(skill => {
        const match = skill.match(/(\d+)\s*Damage/);
        if (match && !skill.toLowerCase().includes('%')) skillDamageRaw += parseInt(match[1]);
        const pctMatch = skill.match(/(\d+)%/);
        if (pctMatch) {
          const val = parseInt(pctMatch[1]);
          if (skill.toLowerCase().includes('damage to player') || skill.toLowerCase().includes('player damage')) {
            skillDamage += val;
            basicAttackPercent += val;
          }
          else if (skill.toLowerCase().includes('skill damage') && !skill.toLowerCase().includes('reduction') && !skill.toLowerCase().includes('taken')) skillDamage += val;
          else if (skill.toLowerCase().includes('basic attack') && !skill.toLowerCase().includes('taken')) basicAttackPercent += val;
        }
      });
      [...(artist.skillCategories?.defense || [])].forEach(skill => {
        const match = skill.match(/(\d+)%/);
        if (match) {
          const val = parseInt(match[1]);
          if (skill.toLowerCase().includes('skill damage reduction')) skillResist += val;
          else if (skill.toLowerCase().includes('damage reduction')) attackResist += val;
        }
      });
      [...(artist.skillCategories?.hp || [])].forEach(skill => {
        const match = skill.match(/(\d+)%/);
        if (match) {
          const val = parseInt(match[1]);
          if (skill.toLowerCase().includes('fan capacity') && skill.toLowerCase().includes('rally')) rallyCapacity += val;
          else if (skill.toLowerCase().includes('fan capacity')) fanCapacity += val;
        }
      });
    });
    const genreCounts: Record<string, number> = {};
    team1.forEach(artist => { const g = artist.genre?.toUpperCase() || 'Unknown'; genreCounts[g] = (genreCounts[g] || 0) + 1; });
    return { skillDamage, skillDamageRaw, basicAttackPercent, attackResist, skillResist, passive, fanCapacity, rallyCapacity, genreCounts };
  }, [team1]);

  const team2Stats = useMemo(() => {
    let skillDamage = 0, skillDamageRaw = 0, basicAttackPercent = 0, attackResist = 0, skillResist = 0, passive = 0, fanCapacity = 0, rallyCapacity = 0;
    team2.forEach(artist => {
      passive += 200;
      [...(artist.skillCategories?.dps || []), ...(artist.skillCategories?.offensive || [])].forEach(skill => {
        const match = skill.match(/(\d+)\s*Damage/);
        if (match && !skill.toLowerCase().includes('%')) skillDamageRaw += parseInt(match[1]);
        const pctMatch = skill.match(/(\d+)%/);
        if (pctMatch) {
          const val = parseInt(pctMatch[1]);
          if (skill.toLowerCase().includes('damage to player') || skill.toLowerCase().includes('player damage')) {
            skillDamage += val;
            basicAttackPercent += val;
          }
          else if (skill.toLowerCase().includes('skill damage') && !skill.toLowerCase().includes('reduction') && !skill.toLowerCase().includes('taken')) skillDamage += val;
          else if (skill.toLowerCase().includes('basic attack') && !skill.toLowerCase().includes('taken')) basicAttackPercent += val;
        }
      });
      [...(artist.skillCategories?.defense || [])].forEach(skill => {
        const match = skill.match(/(\d+)%/);
        if (match) {
          const val = parseInt(match[1]);
          if (skill.toLowerCase().includes('skill damage reduction')) skillResist += val;
          else if (skill.toLowerCase().includes('damage reduction')) attackResist += val;
        }
      });
      [...(artist.skillCategories?.hp || [])].forEach(skill => {
        const match = skill.match(/(\d+)%/);
        if (match) {
          const val = parseInt(match[1]);
          if (skill.toLowerCase().includes('fan capacity') && skill.toLowerCase().includes('rally')) rallyCapacity += val;
          else if (skill.toLowerCase().includes('fan capacity')) fanCapacity += val;
        }
      });
    });
    const genreCounts: Record<string, number> = {};
    team2.forEach(artist => { const g = artist.genre?.toUpperCase() || 'Unknown'; genreCounts[g] = (genreCounts[g] || 0) + 1; });
    return { skillDamage, skillDamageRaw, basicAttackPercent, attackResist, skillResist, passive, fanCapacity, rallyCapacity, genreCounts };
  }, [team2]);

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
  };
  const SEASON_LABELS: string[] = [
    "Original", "Tokyo 1", "Événement",
    "Bali 1", "Rome 1",
    "Tokyo 2", "Bali 2", "Rome 2",
    "Tokyo 3", "Bali 3", "Rome 3",
    "Tokyo 4", "Bali 4", "Rome 4",
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
          <h1 className="page-title">🎤 Artistes</h1>
          <p className="page-subtitle">Découvrez tous les personnages</p>
          <AdBanner />
        </div>

        {/* TOP PANEL - Fixed 40vh */}
        <div ref={panelRef} className="top-panel">
          {/* Column 1: Artist Preview (30%) */}
          <div className="panel-col panel-col-1">
            <div className="artist-preview-card">
              <div className="artist-preview-title" style={{ display: 'none' }}>
                <span>{t.artistOverview}</span>
              </div>
               {selectedArtist ? (
                 <>
                   {/* Name at top with nav */}
                   <div className="artist-preview-nav" style={{ marginBottom: '8px', justifyContent: 'space-between', padding: '0 8px' }}>
                     <button 
                       onClick={() => {
                         const idx = sortedArtists.findIndex(a => a.id === selectedArtist?.id);
                         if (idx > 0) setSelectedArtist(sortedArtists[idx - 1]);
                       }}
                       disabled={!selectedArtist || sortedArtists.findIndex(a => a.id === selectedArtist.id) === 0}
                       style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}
                     >◀</button>
                     <span style={{ color: rankColors[selectedArtist.rank], fontWeight: 700, fontSize: '1rem' }}>{selectedArtist.name}</span>
                     <button 
                       onClick={() => {
                         const idx = sortedArtists.findIndex(a => a.id === selectedArtist?.id);
                         if (idx >= 0 && idx < sortedArtists.length - 1) setSelectedArtist(sortedArtists[idx + 1]);
                       }}
                       disabled={!selectedArtist || sortedArtists.findIndex(a => a.id === selectedArtist.id) >= sortedArtists.length - 1}
                       style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}
                     >▶</button>
                   </div>
                   
                   <div className="artist-preview-content">
                     <div
                       className="artist-preview-image-large"
                       onClick={() => router.push(`/${lang}/artist/${slugify(selectedArtist.name)}`)}
                       onDoubleClick={() => router.push(`/${lang}/artist/${slugify(selectedArtist.name)}`)}
                       title="Cliquer pour voir la fiche complète"
                       style={{ cursor: "pointer" }}
                     >
                       {selectedArtist.image ? (
                         <Image src={`/assets/images/artists/${selectedArtist.image}`} alt={selectedArtist.name} width={160} height={200} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                       ) : (
                         <span style={{ fontSize: "3rem", fontWeight: 800, color: rankColors[selectedArtist.rank] }}>{selectedArtist.name.charAt(0)}</span>
                       )}
                     </div>
                     <div className="artist-preview-info">
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
                        {selectedArtist.calculatedTier && <p>⭐ {t.tier || 'Tier'}: {selectedArtist.calculatedTier}</p>}
                        {(selectedArtist as any).photos && <p>📍 {seasonLabels[lang]}: {(selectedArtist as any).photos}</p>}
                      </div>
                    </div>
                    <div className="artist-preview-skills">
                      {selectedArtist.skills?.slice(0, 3).map((skill, i) => (
                        <p key={i} className="skill-line">{i === 0 ? "⚔️ " : "✨ "}{skill}</p>
                      ))}
                    </div>
                    <button onClick={() => router.push(`/${lang}/artist/${slugify(selectedArtist.name)}`)} className="view-profile-btn">
                      Fiche
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
                  </>
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
                        ? <Image src={`/assets/images/artists/${team1[i].image}`} alt={team1[i].name} width={48} height={48} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
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
                         <span style={{ color, fontWeight: 800 }}>{v1}{suffix}</span>
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
                        ? <Image src={`/assets/images/artists/${team2[i].image}`} alt={team2[i].name} width={48} height={48} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
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
                      <span style={{ color }}>{v}{suffix}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add to Selected Team */}
        {/* BOTTOM - Artists Grid (scrollable) */}
        <div className="artists-bottom">
          <div className="search-bar">
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select value={filterRank} onChange={(e) => setFilterRank(e.target.value)}>
              <option value="">{t.allRanks}</option>
              {RANKS.map(rank => (<option key={rank} value={rank}>{rank}</option>))}
            </select>
            <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
              <option value="">{t.allGenres}</option>
              {GENRES.map(genre => (<option key={genre} value={genre}>{genre}</option>))}
            </select>
            <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)}>
              <option value="">{t.allSpecialties}</option>
              {SPECIALTIES.map(spec => (<option key={spec} value={spec}>{spec}</option>))}
            </select>
            <select value={filterMaxSeason} onChange={(e) => setFilterMaxSeason(e.target.value)}>
              <option value="">{t.allSeasons || "Toutes saisons"}</option>
              {SEASON_LABELS.map(s => (<option key={s} value={s}>{t.maxSeason ? `${t.maxSeason} : ${s}` : `Max : ${s}`}</option>))}
            </select>
          </div>
          <div className="artists-count">{filteredArtists.length} {t.foundArtists}</div>

          <div className="artists-grid" key={`grid-${filteredArtists.length}-${searchQuery}-${filterRank}-${filterGenre}-${filterSpecialty}`}>
            {sortedArtists.map((artist: Artist) => (
                <button
                  key={artist.id}
                  onClick={() => {
                    setSelectedArtist(artist);
                  }}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const isInTeam1 = team1.some(a => a.id === artist.id);
                    const isInTeam2 = team2.some(a => a.id === artist.id);
                    
                    if (isInTeam1) {
                      // In Team1 only: move to Team2
                      if (!isInTeam2 && team2.length < 5) {
                        setTeam2([...team2, artist]);
                      }
                    } else if (isInTeam2) {
                      // In Team2 only: move to Team1
                      if (team1.length < 5) {
                        setTeam1([...team1, artist]);
                      }
                    } else {
                      // Not in any team: add to Team1 if space, else Team2
                      if (team1.length < 5) {
                        setTeam1([...team1, artist]);
                      } else if (team2.length < 5) {
                        setTeam2([...team2, artist]);
                      }
                    }
                  }}
                  className={selectedArtist?.id === artist.id ? "selected" : ""}
                  title={selectedArtist?.id === artist.id ? t.viewProfileTitle : artist.name}
                  style={{ cursor: "pointer" }}
                >
                  {artist.acquisitionTier && acquisitionStyles[artist.acquisitionTier] && (
                    <span
                      className="acq-badge"
                      style={{ background: acquisitionStyles[artist.acquisitionTier].bg, color: acquisitionStyles[artist.acquisitionTier].color, borderColor: acquisitionStyles[artist.acquisitionTier].color + "66" }}
                    >
                      {acquisitionStyles[artist.acquisitionTier].label}
                    </span>
                  )}
                  {artist.image ? (
                     <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} width={60} height={60} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                  ) : (
                  <div className="artist-placeholder">
                    <span style={{ color: rankColors[artist.rank], fontWeight: 800 }}>{artist.name.charAt(0)}</span>
                  </div>
                )}
              </button>
            ))}
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
          position: sticky;
          top: 0;
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
          gap: 3px;
          align-items: center;
          flex-shrink: 0;
        }
        .stat-diff {
          font-size: 0.62rem;
          font-weight: 700;
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
          z-index: 99;
          position: sticky;
          top: max(40vh, 300px);
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
        .acq-badge {
          position: absolute;
          top: 4px;
          left: 4px;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 0.6rem;
          font-weight: 700;
          border: 1px solid;
          z-index: 2;
          backdrop-filter: blur(6px);
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
