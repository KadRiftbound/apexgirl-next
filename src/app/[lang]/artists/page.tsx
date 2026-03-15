"use client";

import Head from "next/head";
import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import artistsData from "@/lib/data/artists.json";
import { AdBanner } from "@/components/AdSense";
import MobileArtistsPage from "@/components/MobileArtistsPage";

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const filterTranslations: Record<string, any> = {
  fr: { all: "Tous", allGenres: "Tous genres", search: "Rechercher...", artistOverview: "Aperçu artiste", skills: "Compétences", viewFullProfile: "Voir la fiche complète", selectArtist: "Sélectionnez un artiste", teamBuilder: "Équipe", combinedStats: "Stats combinés", genres: "Genres", allRanks: "Tous les ranks", allSpecialties: "Toutes spécialités" },
  en: { all: "All", allGenres: "All genres", search: "Search...", artistOverview: "Artist Overview", skills: "Skills", viewFullProfile: "View full profile", selectArtist: "Select an artist", teamBuilder: "Team Builder", combinedStats: "Combined Stats", genres: "Genres", allRanks: "All ranks", allSpecialties: "All specialties" },
  it: { all: "Tutti", allGenres: "Tutti i generi", search: "Cerca...", artistOverview: "Panoramica Artista", skills: "Abilità", viewFullProfile: "Visualizza profilo completo", selectArtist: "Seleziona un artista", teamBuilder: "Team Builder", combinedStats: "Stats combinati", genres: "Generi", allRanks: "Tutti i ranghi", allSpecialties: "Tutte le specialità" },
  es: { all: "Todos", allGenres: "Todos los géneros", search: "Buscar...", artistOverview: "Resumen del Artista", skills: "Habilidades", viewFullProfile: "Ver perfil completo", selectArtist: "Selecciona un artista", teamBuilder: "Team Builder", combinedStats: "Stats combinados", genres: "Géneros", allRanks: "Todos los rangos", allSpecialties: "Todas las especialidades" },
  pt: { all: "Todos", allGenres: "Todos os gêneros", search: "Pesquisar...", artistOverview: "Visão Geral do Artista", skills: "Habilidades", viewFullProfile: "Ver perfil completo", selectArtist: "Selecione um artista", teamBuilder: "Team Builder", combinedStats: "Stats combinados", genres: "Gêneros", allRanks: "Todas as patentes", allSpecialties: "Todas as especialidades" },
  pl: { all: "Wszystkie", allGenres: "Wszystkie gatunki", search: "Szukaj...", artistOverview: "Przegląd Artysty", skills: "Umiejętności", viewFullProfile: "Zobacz pełny profil", selectArtist: "Wybierz artystę", teamBuilder: "Team Builder", combinedStats: "Łączne statystyki", genres: "Gatunki", allRanks: "Wszystkie rangi", allSpecialties: "Wszystkie specjalności" },
  id: { all: "Semua", allGenres: "Semua genre", search: "Cari...", artistOverview: "Ringkasan Artis", skills: "Skill", viewFullProfile: "Lihat profil lengkap", selectArtist: "Pilih artis", teamBuilder: "Team Builder", combinedStats: "Stats gabungan", genres: "Genre", allRanks: "Semua rank", allSpecialties: "Semua specialtis" },
  ru: { all: "Все", allGenres: "Все жанры", search: "Поиск...", artistOverview: "Обзор Артиста", skills: "Навыки", viewFullProfile: "Посмотреть полный профиль", selectArtist: "Выберите артиста", teamBuilder: "Team Builder", combinedStats: "Общие статы", genres: "Жанры", allRanks: "Все ранги", allSpecialties: "Все специализации" },
};

const rankColors: Record<string, string> = {
  UR: "#ff6b6b", "UR Roma": "#ef4444", "UR Bali": "#ef4444", SSR: "#fbbf24", SR: "#8b5cf6", R: "#3b82f6",
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
        console.warn('Échec du chargement de l\'équipe 1', e);
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
        console.warn('Échec du chargement de l\'équipe 2', e);
      }
    }
    return [];
  });
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const t = filterTranslations[lang] || filterTranslations.fr;

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
    let lastScrollY = window.scrollY;
    let ticking = false;
    
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            // Essayer plusieurs sélecteurs pour trouver le header
            const header = document.querySelector('.header') as HTMLElement ||
                          document.querySelector('header[role="banner"]') as HTMLElement ||
                          document.querySelector('header') as HTMLElement;
            
            // Toggle header hidden class - ONLY on desktop (mobile handled by CSS display)
            if (header && window.innerWidth > 900) {
              // Hide header when scrolling down past 100px, show only when at top
              if (currentScrollY > 100) {
                header.classList.add('header-hidden');
              } else {
                header.classList.remove('header-hidden');
              }
            }
          
          // Panel fixed behavior - for both mobile and desktop
          const isPanelFixed = currentScrollY > 50;
          setPanelFixed(isPanelFixed);
          
          if (panelRef.current) {
            // On desktop: panel becomes fixed after scrolling past initial position
            // On mobile: panel is always fixed at top: 0
            if (window.innerWidth > 900) {
              const headerHeight = currentScrollY > 100 ? 0 : 70;
              if (currentScrollY > 110) {
                panelRef.current.style.position = 'fixed';
                panelRef.current.style.top = headerHeight + 'px';
              } else {
                panelRef.current.style.position = 'absolute';
                panelRef.current.style.top = '110px';
              }
            } else {
              // Mobile: always fixed at top
              panelRef.current.style.position = 'fixed';
              panelRef.current.style.top = '0';
            }
          }
          
          // Mobile search bar visibility - only on mobile
          if (window.innerWidth <= 900) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
              setSearchBarVisible(false);
            } else {
              setSearchBarVisible(true);
            }
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save teams to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const ids = team1.map((artist: Artist) => artist.id);
        localStorage.setItem('team1', JSON.stringify(ids));
      } catch (e) {
        console.warn('Échec de la sauvegarde de l\'équipe 1', e);
      }
    }
  }, [team1]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const ids = team2.map((artist: Artist) => artist.id);
        localStorage.setItem('team2', JSON.stringify(ids));
      } catch (e) {
        console.warn('Échec de la sauvegarde de l\'équipe 2', e);
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

  const filteredArtists = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return artistsData.filter((artist: Artist) => {
      const matchesSearch = !q || artist.name.toLowerCase().includes(q);
      const matchesRank = !filterRank || artist.rank === filterRank;
      const matchesGenre = !filterGenre || artist.genre === filterGenre;
      const matchesSpecialty = !filterSpecialty || artist.specialty === filterSpecialty;
      return matchesSearch && matchesRank && matchesGenre && matchesSpecialty;
    });
  }, [searchQuery, filterRank, filterGenre, filterSpecialty]);

  const [searchBarVisible, setSearchBarVisible] = useState(true);
  const [panelFixed, setPanelFixed] = useState(false);
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
    return <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>Loading...</div>;
  }

  // Render mobile version on small screens
  if (isMobile) {
    return <MobileArtistsPage />;
  }

  return (
    <>
      <Head>
        <title>Artistes - TopGirl</title>
      </Head>

      <div className="page-container">
        {/* Header with title and ads */}
        <div className="page-header">
          <h1 className="page-title">🎤 Artistes</h1>
          <p className="page-subtitle">Découvrez tous les personnages</p>
          <AdBanner />
        </div>

        {/* TOP PANEL - Fixed 40vh */}
        <div className={`top-panel ${panelFixed ? 'fixed' : ''}`}>
          {/* Column 1: Artist Preview (30%) */}
          <div className="panel-col panel-col-1">
            <div className="artist-preview-card">
              <div className="artist-preview-title">
                <span>{t.artistOverview}</span>
              </div>
              {selectedArtist ? (
                <div className="artist-preview-content">
                  <div className="artist-preview-image-large">
                    {selectedArtist.image ? (
                      <img src={`/assets/images/artists/${selectedArtist.image}`} alt={selectedArtist.name} />
                    ) : (
                      <span style={{ fontSize: "3rem", fontWeight: 800, color: rankColors[selectedArtist.rank] }}>{selectedArtist.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="artist-preview-info">
                    <div className="artist-preview-nav">
                      <button 
                        onClick={() => {
                          const idx = sortedArtists.findIndex(a => a.id === selectedArtist?.id);
                          if (idx > 0) setSelectedArtist(sortedArtists[idx - 1]);
                        }}
                        disabled={!selectedArtist || sortedArtists.findIndex(a => a.id === selectedArtist.id) === 0}
                      >◀</button>
                      <span style={{ color: rankColors[selectedArtist.rank], fontWeight: 700 }}>{selectedArtist.name}</span>
                      <button 
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
                      </div>
                      <div className="detail-col">
                        <p>🎵 {selectedArtist.genre}</p>
                        <p>📊 Rang: <span style={{ color: rankColors[selectedArtist.rank], fontWeight: 700 }}>{selectedArtist.rank}</span></p>
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
                        <button onClick={() => addToTeam1(selectedArtist)} className="add-team-btn team1">+ Équipe 1</button>
                      )}
                      {selectedArtist && !team2.find(a => a.id === selectedArtist.id) && team2.length < 5 && (
                        <button onClick={() => addToTeam2(selectedArtist)} className="add-team-btn team2">+ Équipe 2</button>
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
              <div className="team-slots">
                {[0,1,2,3,4].map(i => (
                  <div key={i} onClick={() => team1[i] && removeFromTeam1(team1[i].id)} className="team-slot" title="Cliquer pour retirer">
                    {team1[i] ? (
                      team1[i].image ? <img src={`/assets/images/artists/${team1[i].image}`} alt={team1[i].name} /> : <span style={{ color: rankColors[team1[i].rank], fontWeight: 800 }}>{team1[i].name.charAt(0)}</span>
                    ) : <span>+</span>}
                  </div>
                ))}
              </div>
              <div className="team-genres">
                {Object.entries(team1Stats.genreCounts).map(([genre, count]) => (
                  <span key={genre} className="genre-badge">{genre} {count}</span>
                ))}
              </div>
              <div className="team-stats">
                {(() => {
                  const stats = [
                    { label: "💥 DMG Factor", v1: team1Stats.skillDamageRaw, v2: team2Stats.skillDamageRaw },
                    { label: "⚔️ Skill DMG", v1: team1Stats.skillDamage, v2: team2Stats.skillDamage, suffix: "%" },
                    { label: "👊 Basic ATK", v1: team1Stats.basicAttackPercent, v2: team2Stats.basicAttackPercent, suffix: "%" },
                    { label: "🛡️ Resistance", v1: team1Stats.attackResist, v2: team2Stats.attackResist, suffix: "%" },
                    { label: "✨ S.Resist", v1: team1Stats.skillResist, v2: team2Stats.skillResist, suffix: "%" },
                    { label: "🎵 Fan Cap", v1: team1Stats.fanCapacity, v2: team2Stats.fanCapacity, suffix: "%" },
                    { label: "🚀 Rally Cap", v1: team1Stats.rallyCapacity, v2: team2Stats.rallyCapacity, suffix: "%" },
                  ];
                  const colors = ["#ff8c42", "#ff6b6b", "#4ecdc4", "#95e1d3", "#a29bfe", "#ffd700", "#00ff88"];
                  return stats.map((stat, i) => {
                    const diff = stat.v1 - stat.v2;
                    const diffColor = diff > 0 ? "#4ade80" : diff < 0 ? "#f87171" : "rgba(255,255,255,0.4)";
                    const sign = diff > 0 ? "+" : "";
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", color: colors[i], fontSize: "0.7rem" }}>
                        <span>{stat.label}</span>
                        <span>{stat.v1}{stat.suffix || ""} <span style={{ color: diffColor, fontWeight: 600 }}>({sign}{diff})</span></span>
                      </div>
                    );
                  });
                })()}
                <button onClick={() => setTeam1([])} className="clear-btn">🗑️ Effacer</button>
              </div>
            </div>
          </div>

          {/* Column 3: Team 2 (35%) */}
          <div className="panel-col panel-col-3">
            <div className="team-card team-2">
              <div className="team-slots">
                {[0,1,2,3,4].map(i => (
                  <div key={i} onClick={() => team2[i] && removeFromTeam2(team2[i].id)} className="team-slot" title="Cliquer pour retirer">
                    {team2[i] ? (
                      team2[i].image ? <img src={`/assets/images/artists/${team2[i].image}`} alt={team2[i].name} /> : <span style={{ color: rankColors[team2[i].rank], fontWeight: 800 }}>{team2[i].name.charAt(0)}</span>
                    ) : <span>+</span>}
                  </div>
                ))}
              </div>
              <div className="team-genres">
                {Object.entries(team2Stats.genreCounts).map(([genre, count]) => (
                  <span key={genre} className="genre-badge">{genre} {count}</span>
                ))}
              </div>
              <div className="team-stats">
                <div style={{ display: "flex", justifyContent: "space-between", color: "#ff8c42", fontSize: "0.7rem" }}><span>💥 DMG Factor</span><span>{team2Stats.skillDamageRaw}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#ff6b6b", fontSize: "0.7rem" }}><span>⚔️ Skill DMG</span><span>{team2Stats.skillDamage}%</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#4ecdc4", fontSize: "0.7rem" }}><span>👊 Basic ATK</span><span>{team2Stats.basicAttackPercent}%</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#95e1d3", fontSize: "0.7rem" }}><span>🛡️ Resistance</span><span>{team2Stats.attackResist}%</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#a29bfe", fontSize: "0.7rem" }}><span>✨ S.Resist</span><span>{team2Stats.skillResist}%</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#ffd700", fontSize: "0.7rem" }}><span>🎵 Fan Cap</span><span>{team2Stats.fanCapacity}%</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#00ff88", fontSize: "0.7rem" }}><span>🚀 Rally Cap</span><span>{team2Stats.rallyCapacity}%</span></div>
                <button onClick={() => setTeam2([])} className="clear-btn">🗑️ Effacer</button>
              </div>
            </div>
          </div>
        </div>

        {/* Add to Selected Team */}
        {/* BOTTOM - Artists Grid (scrollable) */}
        <div className="artists-bottom">
          <div className={`search-bar ${!searchBarVisible ? 'hidden' : ''}`}>
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
          </div>
          <div className="artists-count">{filteredArtists.length} artistes trouvés</div>

          <div className="artists-grid" key={`grid-${filteredArtists.length}-${searchQuery}-${filterRank}-${filterGenre}-${filterSpecialty}`}>
            {sortedArtists.map((artist: Artist) => (
              <button key={artist.id} onClick={() => setSelectedArtist(artist)} className={selectedArtist?.id === artist.id ? "selected" : ""}>
                {artist.image ? (
                  <img src={`/assets/images/artists/${artist.image}`} alt={artist.name} />
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
          z-index: 100;
        }
        .top-panel.fixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
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
          width: 130px;
          height: 160px;
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
          color: rgba(255,255,255,0.6);
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
          color: rgba(255,255,255,0.5);
          margin: 2px 0;
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
          padding: 8px;
        }
        .team-1 { border-color: rgba(139,92,246,0.5); }
        .team-2 { border-color: rgba(6,182,212,0.5); }
        
        .team-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .team-1 .team-header span { color: #8b5cf6; }
        .team-2 .team-header span { color: #06b6d4; }
        .team-header button {
          padding: 2px 8px;
          font-size: 0.6rem;
          border-radius: 4px;
          border: 1px solid;
          background: transparent;
          color: #fff;
          cursor: pointer;
        }
        .team-1 .team-header button { border-color: #8b5cf6; }
        .team-2 .team-header button { border-color: #06b6d4; }
        .team-header button.active {
          background: #8b5cf6;
          border-color: #8b5cf6;
        }
        .team-2 .team-header button.active {
          background: #06b6d4;
          border-color: #06b6d4;
        }
        
        .team-slots {
          display: flex;
          gap: 6px;
          margin-bottom: 8px;
          justify-content: center;
        }
        .team-slot {
          width: 55px;
          height: 70px;
          border-radius: 6px;
          border: 2px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.2);
          transition: transform 0.2s;
        }
        .team-slot:hover {
          transform: scale(1.05);
          border-color: rgba(255,255,255,0.3);
        }
        .team-slot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .team-genres {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 8px;
          justify-content: center;
        }
        .genre-badge {
          padding: 2px 6px;
          background: rgba(139,92,246,0.3);
          border-radius: 10px;
          font-size: 0.6rem;
          color: #fff;
        }
        
        .team-stats {
          flex: 1;
          overflow-y: auto;
        }
        .team-stats > div {
          padding: 2px 0;
        }
        .clear-btn {
          width: 100%;
          margin-top: 8px;
          padding: 4px;
          font-size: 0.55rem;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
        }
        
        .artists-bottom {
          padding: 8px;
          padding-top: 40vh;
          padding-bottom: 100px;
          min-height: 100vh;
        }
        .top-panel.fixed + .artists-bottom {
          padding-top: 0;
        }
        .search-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 0;
          padding: 8px;
          background: #0f0f1a;
          z-index: 99;
        }
        .top-panel.fixed + .artists-bottom .search-bar {
          position: fixed;
          top: 40vh;
          left: 0;
          right: 0;
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
          
          /* Remove select buttons in teams on mobile */
          .team-header button {
            display: none;
          }
          
          .artists-bottom {
            padding-bottom: 100px;
            min-height: 100vh;
            padding-top: 48vh;
          }
          .top-panel.fixed + .artists-bottom {
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
            transition: transform 0.3s ease;
          }
          .search-bar.hidden {
            transform: translateY(-100%);
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
