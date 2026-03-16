"use client";

import Head from "next/head";
import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import artistsData from "@/lib/data/artists.json";

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const filterTranslations: Record<string, any> = {
  fr: { all: "Tous", allGenres: "Tous genres", search: "Rechercher...", artistOverview: "Aperçu artiste", skills: "Compétences", viewFullProfile: "Voir la fiche complète", selectArtist: "Sélectionnez un artiste", teamBuilder: "Équipe", combinedStats: "Stats combinés", genres: "Genres", allRanks: "Tous les ranks", allSpecialties: "Toutes spécialités" },
  en: { all: "All", allGenres: "All genres", search: "Search...", artistOverview: "Artist Overview", skills: "Skills", viewFullProfile: "View full profile", selectArtist: "Select an artist", teamBuilder: "Team Builder", combinedStats: "Combined Stats", genres: "Genres", allRanks: "All ranks", allSpecialties: "All specialties" },
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

const getSpecialtyLabel = (spec: string) => {
  if (spec === 'Augmentation dommage') return 'Offensive';
  if (spec === 'Dommage réduction') return 'Defensive';
  return spec.slice(0, 8);
};

export default function MobileArtistsPage() {
  const params = useParams();
  const router = useRouter();
  const lang = (params?.lang as string) || "fr";
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [team1, setTeam1] = useState<Artist[]>([]);
  const [team2, setTeam2] = useState<Artist[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [mounted, setMounted] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(true);
  const [panelFixed, setPanelFixed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerSectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const t = filterTranslations[lang] || filterTranslations.fr;

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      // Get actual header section height after render
      setTimeout(() => {
        if (headerSectionRef.current) {
          setHeaderHeight(headerSectionRef.current.offsetHeight);
        }
      }, 100);
      
      try {
        const saved1 = localStorage.getItem('team1');
        const saved2 = localStorage.getItem('team2');
        if (saved1) {
          const ids = JSON.parse(saved1);
          const artists = ids.map((id: number) => artistsData.find((a: Artist) => a.id === id)).filter(Boolean);
          setTeam1(artists);
        }
        if (saved2) {
          const ids = JSON.parse(saved2);
          const artists = ids.map((id: number) => artistsData.find((a: Artist) => a.id === id)).filter(Boolean);
          setTeam2(artists);
        }
      } catch (e) {
        console.warn('Échec du chargement des équipes', e);
      }
    }
  }, []);

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const threshold = headerHeight > 0 ? headerHeight : 120;
          
          // Handle header section visibility (the scrollable section with title)
          const headerSection = document.querySelector('.mobile-header-section') as HTMLElement;
          if (headerSection) {
            if (currentScrollY > lastScrollY && currentScrollY > threshold) {
              headerSection.style.position = 'fixed';
              headerSection.style.top = `-${threshold}px`;
              headerSection.style.zIndex = '50';
            } else {
              headerSection.style.position = 'relative';
              headerSection.style.top = '0';
              headerSection.style.zIndex = '50';
            }
          }
          
          // Panel becomes fixed after scrolling past header
          const isPanelFixed = currentScrollY > threshold;
          setPanelFixed(isPanelFixed);
          
          if (panelRef.current) {
            if (isPanelFixed) {
              panelRef.current.style.position = 'fixed';
              panelRef.current.style.top = '0';
              panelRef.current.style.left = '0';
              panelRef.current.style.right = '0';
              panelRef.current.style.zIndex = '100';
            } else {
              panelRef.current.style.position = 'relative';
              panelRef.current.style.top = '0';
              panelRef.current.style.zIndex = '100';
            }
          }
          
          // Search bar visibility
          if (currentScrollY > lastScrollY && currentScrollY > threshold) {
            setSearchBarVisible(false);
          } else {
            setSearchBarVisible(true);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerHeight]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('team1', JSON.stringify(team1.map(a => a.id)));
      } catch (e) {}
    }
  }, [team1]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('team2', JSON.stringify(team2.map(a => a.id)));
      } catch (e) {}
    }
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

  const team1Stats = useMemo(() => {
    let skillDamage = 0, skillDamageRaw = 0, basicAttackPercent = 0, attackResist = 0, skillResist = 0, fanCapacity = 0, rallyCapacity = 0;
    const genreCounts: Record<string, number> = {};
    const specialtyCounts: Record<string, number> = {};
    team1.forEach(artist => {
      const g = artist.genre?.toUpperCase() || 'Unknown';
      genreCounts[g] = (genreCounts[g] || 0) + 1;
      const s = artist.specialty || artist.genre || 'Unknown';
      specialtyCounts[s] = (specialtyCounts[s] || 0) + 1;
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
          else if (skill.toLowerCase().includes('skill damage') && !skill.toLowerCase().includes('reduction')) skillDamage += val;
          else if (skill.toLowerCase().includes('basic attack')) basicAttackPercent += val;
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
    return { skillDamage, skillDamageRaw, basicAttackPercent, attackResist, skillResist, fanCapacity, rallyCapacity, genreCounts, specialtyCounts };
  }, [team1]);

  const team2Stats = useMemo(() => {
    let skillDamage = 0, skillDamageRaw = 0, basicAttackPercent = 0, attackResist = 0, skillResist = 0, fanCapacity = 0, rallyCapacity = 0;
    const genreCounts: Record<string, number> = {};
    const specialtyCounts: Record<string, number> = {};
    team2.forEach(artist => {
      const g = artist.genre?.toUpperCase() || 'Unknown';
      genreCounts[g] = (genreCounts[g] || 0) + 1;
      const s = artist.specialty || artist.genre || 'Unknown';
      specialtyCounts[s] = (specialtyCounts[s] || 0) + 1;
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
          else if (skill.toLowerCase().includes('skill damage') && !skill.toLowerCase().includes('reduction')) skillDamage += val;
          else if (skill.toLowerCase().includes('basic attack')) basicAttackPercent += val;
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
    return { skillDamage, skillDamageRaw, basicAttackPercent, attackResist, skillResist, fanCapacity, rallyCapacity, genreCounts, specialtyCounts };
  }, [team2]);

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

  const rankOrder: Record<string, number> = { UR: 1, "UR Roma": 1, "UR Bali": 1, SSR: 2, SR: 3, R: 4 };
  const sortedArtists = [...filteredArtists].sort((a, b) => (rankOrder[a.rank] || 99) - (rankOrder[b.rank] || 99));

  if (!mounted) {
    return <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Artistes - TopGirl</title>
      </Head>

      <div className="mobile-page-container">
        {/* Layer 1: Header section with title that scrolls away */}
        <div className="mobile-header-section" ref={headerSectionRef}>
          <h1 className="mobile-page-title">🎤 Artistes</h1>
          <p className="mobile-page-subtitle">Découvrez tous les personnages</p>
        </div>

        {/* Layer 2: Fixed 3-column Panel */}
        <div className={`mobile-top-panel ${panelFixed ? 'fixed' : ''}`} ref={panelRef}>
          {/* Column 1: Artist Preview - Name, Speciality, Genre, Skills */}
          <div className="mobile-panel-col mobile-panel-1">
            <div className="mobile-preview-card">
              <div className="mobile-preview-title">{t.artistOverview}</div>
              {selectedArtist ? (
                <div className="mobile-preview-content">
                  <div className="mobile-preview-image">
                    {selectedArtist.image ? (
                      <img src={`/assets/images/artists/${selectedArtist.image}`} alt={selectedArtist.name} />
                    ) : (
                      <span style={{ fontSize: "2.5rem", fontWeight: 800, color: rankColors[selectedArtist.rank] }}>{selectedArtist.name.charAt(0)}</span>
                    )}
                  </div>
                  
                  {/* Artist name - LARGE */}
                  <div className="mobile-preview-name" style={{ color: rankColors[selectedArtist.rank] }}>
                    {selectedArtist.name}
                  </div>
                  
                  {/* Speciality - NEW */}
                  <div className="mobile-preview-specialty">
                    💼 {selectedArtist.specialty || selectedArtist.genre}
                  </div>
                  
                  {/* Genre */}
                  <div className="mobile-preview-genre">
                    🎵 {selectedArtist.genre}
                  </div>
                  
                  {/* Skills/Sorts */}
                  <div className="mobile-preview-skills">
                    {selectedArtist.skills?.slice(0, 3).map((skill, i) => (
                      <p key={i} className="mobile-skill-line">{i === 0 ? "⚔️ " : "✨ "}{skill}</p>
                    ))}
                  </div>
                  
                  {/* Navigation */}
                  <div className="mobile-preview-nav">
                    <button 
                      onClick={() => {
                        const idx = sortedArtists.findIndex(a => a.id === selectedArtist?.id);
                        if (idx > 0) setSelectedArtist(sortedArtists[idx - 1]);
                      }}
                      disabled={!selectedArtist || sortedArtists.findIndex(a => a.id === selectedArtist.id) === 0}
                    >◀</button>
                    <button 
                      onClick={() => {
                        const idx = sortedArtists.findIndex(a => a.id === selectedArtist?.id);
                        if (idx >= 0 && idx < sortedArtists.length - 1) setSelectedArtist(sortedArtists[idx + 1]);
                      }}
                      disabled={!selectedArtist || sortedArtists.findIndex(a => a.id === selectedArtist.id) >= sortedArtists.length - 1}
                    >▶</button>
                  </div>
                  
                  {/* Actions */}
                  <div className="mobile-preview-actions">
                    <button onClick={() => router.push(`/${lang}/artist/${slugify(selectedArtist.name)}`)} className="mobile-profile-btn">
                      Fiche
                    </button>
                    <div className="mobile-add-buttons">
                      {!team1.find(a => a.id === selectedArtist.id) && team1.length < 5 && (
                        <button onClick={() => addToTeam1(selectedArtist)} className="mobile-add-team mobile-team1">+ Équipe 1</button>
                      )}
                      {!team2.find(a => a.id === selectedArtist.id) && team2.length < 5 && (
                        <button onClick={() => addToTeam2(selectedArtist)} className="mobile-add-team mobile-team2">+ Équipe 2</button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mobile-preview-empty">{t.selectArtist}</div>
              )}
            </div>
          </div>

          {/* Column 2: Team 1 - FULL stats with comparison */}
          <div className="mobile-panel-col mobile-panel-2">
            <div className="mobile-team-card mobile-team-1">
              <div className="mobile-team-header">
                <span>Équipe 1</span>
              </div>
              <div className="mobile-team-slots">
                {[0,1,2,3,4].map(i => (
                  <div key={i} onClick={() => team1[i] && setTeam1(team1.filter(a => a.id !== team1[i].id))} className="mobile-team-slot" title="Cliquer pour retirer">
                    {team1[i] ? (
                      team1[i].image ? <img src={`/assets/images/artists/${team1[i].image}`} alt={team1[i].name} /> : <span style={{ color: rankColors[team1[i].rank], fontWeight: 800 }}>{team1[i].name.charAt(0)}</span>
                    ) : <span>+</span>}
                  </div>
                ))}
              </div>
              <div className="mobile-team-genres">
                {Object.entries(team1Stats.genreCounts).map(([genre, count]) => (
                  <span key={genre} className="mobile-genre-badge">{genre} {count}</span>
                ))}
              </div>
              {/* FULL stats - each on single line */}
              <div className="mobile-team-stats">
                <div className="mobile-stat-row">
                  <span style={{ color: "#ff8c42", fontSize: "0.55rem" }}>DMG</span>
                  <span style={{ color: "#fff" }}>{team1Stats.skillDamageRaw}</span>
                  <span style={{ color: team1Stats.skillDamageRaw > team2Stats.skillDamageRaw ? "#4ade80" : team1Stats.skillDamageRaw < team2Stats.skillDamageRaw ? "#f87171" : "#888" }}>
                    ({team1Stats.skillDamageRaw - team2Stats.skillDamageRaw >= 0 ? "+" : ""}{team1Stats.skillDamageRaw - team2Stats.skillDamageRaw})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#ff6b6b" }}>⚔️ Skill</span>
                  <span style={{ color: "#fff" }}>{team1Stats.skillDamage}%</span>
                  <span style={{ color: team1Stats.skillDamage > team2Stats.skillDamage ? "#4ade80" : team1Stats.skillDamage < team2Stats.skillDamage ? "#f87171" : "#888" }}>
                    ({team1Stats.skillDamage - team2Stats.skillDamage >= 0 ? "+" : ""}{team1Stats.skillDamage - team2Stats.skillDamage})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#4ecdc4" }}>👊 ATK</span>
                  <span style={{ color: "#fff" }}>{team1Stats.basicAttackPercent}%</span>
                  <span style={{ color: team1Stats.basicAttackPercent > team2Stats.basicAttackPercent ? "#4ade80" : team1Stats.basicAttackPercent < team2Stats.basicAttackPercent ? "#f87171" : "#888" }}>
                    ({team1Stats.basicAttackPercent - team2Stats.basicAttackPercent >= 0 ? "+" : ""}{team1Stats.basicAttackPercent - team2Stats.basicAttackPercent})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#95e1d3" }}>🛡️ DEF</span>
                  <span style={{ color: "#fff" }}>{team1Stats.attackResist}%</span>
                  <span style={{ color: team1Stats.attackResist > team2Stats.attackResist ? "#4ade80" : team1Stats.attackResist < team2Stats.attackResist ? "#f87171" : "#888" }}>
                    ({team1Stats.attackResist - team2Stats.attackResist >= 0 ? "+" : ""}{team1Stats.attackResist - team2Stats.attackResist})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#a29bfe" }}>✨ S.RES</span>
                  <span style={{ color: "#fff" }}>{team1Stats.skillResist}%</span>
                  <span style={{ color: team1Stats.skillResist > team2Stats.skillResist ? "#4ade80" : team1Stats.skillResist < team2Stats.skillResist ? "#f87171" : "#888" }}>
                    ({team1Stats.skillResist - team2Stats.skillResist >= 0 ? "+" : ""}{team1Stats.skillResist - team2Stats.skillResist})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#ffd700" }}>🎵 Fan</span>
                  <span style={{ color: "#fff" }}>{team1Stats.fanCapacity}%</span>
                  <span style={{ color: team1Stats.fanCapacity > team2Stats.fanCapacity ? "#4ade80" : team1Stats.fanCapacity < team2Stats.fanCapacity ? "#f87171" : "#888" }}>
                    ({team1Stats.fanCapacity - team2Stats.fanCapacity >= 0 ? "+" : ""}{team1Stats.fanCapacity - team2Stats.fanCapacity})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#00ff88" }}>🚀 Rally</span>
                  <span style={{ color: "#fff" }}>{team1Stats.rallyCapacity}%</span>
                  <span style={{ color: team1Stats.rallyCapacity > team2Stats.rallyCapacity ? "#4ade80" : team1Stats.rallyCapacity < team2Stats.rallyCapacity ? "#f87171" : "#888" }}>
                    ({team1Stats.rallyCapacity - team2Stats.rallyCapacity >= 0 ? "+" : ""}{team1Stats.rallyCapacity - team2Stats.rallyCapacity})
                  </span>
                </div>
                <div className="mobile-team-specialties">
                  {Object.entries(team1Stats.specialtyCounts || {}).map(([spec, count]) => (
                    <span key={spec} className="mobile-specialty-badge">{getSpecialtyLabel(spec)} {count}</span>
                  ))}
                </div>
                <button onClick={() => setTeam1([])} className="mobile-clear-btn">🗑️ Effacer</button>
              </div>
            </div>
          </div>

          {/* Column 3: Team 2 - FULL stats with comparison */}
          <div className="mobile-panel-col mobile-panel-3">
            <div className="mobile-team-card mobile-team-2">
              <div className="mobile-team-header">
                <span>Équipe 2</span>
              </div>
              <div className="mobile-team-slots">
                {[0,1,2,3,4].map(i => (
                  <div key={i} onClick={() => team2[i] && setTeam2(team2.filter(a => a.id !== team2[i].id))} className="mobile-team-slot" title="Cliquer pour retirer">
                    {team2[i] ? (
                      team2[i].image ? <img src={`/assets/images/artists/${team2[i].image}`} alt={team2[i].name} /> : <span style={{ color: rankColors[team2[i].rank], fontWeight: 800 }}>{team2[i].name.charAt(0)}</span>
                    ) : <span>+</span>}
                  </div>
                ))}
              </div>
              <div className="mobile-team-genres">
                {Object.entries(team2Stats.genreCounts).map(([genre, count]) => (
                  <span key={genre} className="mobile-genre-badge">{genre} {count}</span>
                ))}
              </div>
              {/* FULL stats - each on single line */}
              <div className="mobile-team-stats">
                <div className="mobile-stat-row">
                  <span style={{ color: "#ff8c42", fontSize: "0.55rem" }}>DMG</span>
                  <span style={{ color: "#fff" }}>{team2Stats.skillDamageRaw}</span>
                  <span style={{ color: team2Stats.skillDamageRaw > team1Stats.skillDamageRaw ? "#4ade80" : team2Stats.skillDamageRaw < team1Stats.skillDamageRaw ? "#f87171" : "#888" }}>
                    ({team2Stats.skillDamageRaw - team1Stats.skillDamageRaw >= 0 ? "+" : ""}{team2Stats.skillDamageRaw - team1Stats.skillDamageRaw})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#ff6b6b" }}>⚔️ Skill</span>
                  <span style={{ color: "#fff" }}>{team2Stats.skillDamage}%</span>
                  <span style={{ color: team2Stats.skillDamage > team1Stats.skillDamage ? "#4ade80" : team2Stats.skillDamage < team1Stats.skillDamage ? "#f87171" : "#888" }}>
                    ({team2Stats.skillDamage - team1Stats.skillDamage >= 0 ? "+" : ""}{team2Stats.skillDamage - team1Stats.skillDamage})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#4ecdc4" }}>👊 ATK</span>
                  <span style={{ color: "#fff" }}>{team2Stats.basicAttackPercent}%</span>
                  <span style={{ color: team2Stats.basicAttackPercent > team1Stats.basicAttackPercent ? "#4ade80" : team2Stats.basicAttackPercent < team1Stats.basicAttackPercent ? "#f87171" : "#888" }}>
                    ({team2Stats.basicAttackPercent - team1Stats.basicAttackPercent >= 0 ? "+" : ""}{team2Stats.basicAttackPercent - team1Stats.basicAttackPercent})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#95e1d3" }}>🛡️ DEF</span>
                  <span style={{ color: "#fff" }}>{team2Stats.attackResist}%</span>
                  <span style={{ color: team2Stats.attackResist > team1Stats.attackResist ? "#4ade80" : team2Stats.attackResist < team1Stats.attackResist ? "#f87171" : "#888" }}>
                    ({team2Stats.attackResist - team1Stats.attackResist >= 0 ? "+" : ""}{team2Stats.attackResist - team1Stats.attackResist})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#a29bfe" }}>✨ S.RES</span>
                  <span style={{ color: "#fff" }}>{team2Stats.skillResist}%</span>
                  <span style={{ color: team2Stats.skillResist > team1Stats.skillResist ? "#4ade80" : team2Stats.skillResist < team1Stats.skillResist ? "#f87171" : "#888" }}>
                    ({team2Stats.skillResist - team1Stats.skillResist >= 0 ? "+" : ""}{team2Stats.skillResist - team1Stats.skillResist})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#ffd700" }}>🎵 Fan</span>
                  <span style={{ color: "#fff" }}>{team2Stats.fanCapacity}%</span>
                  <span style={{ color: team2Stats.fanCapacity > team1Stats.fanCapacity ? "#4ade80" : team2Stats.fanCapacity < team1Stats.fanCapacity ? "#f87171" : "#888" }}>
                    ({team2Stats.fanCapacity - team1Stats.fanCapacity >= 0 ? "+" : ""}{team2Stats.fanCapacity - team1Stats.fanCapacity})
                  </span>
                </div>
                <div className="mobile-stat-row">
                  <span style={{ color: "#00ff88" }}>🚀 Rally</span>
                  <span style={{ color: "#fff" }}>{team2Stats.rallyCapacity}%</span>
                  <span style={{ color: team2Stats.rallyCapacity > team1Stats.rallyCapacity ? "#4ade80" : team2Stats.rallyCapacity < team1Stats.rallyCapacity ? "#f87171" : "#888" }}>
                    ({team2Stats.rallyCapacity - team1Stats.rallyCapacity >= 0 ? "+" : ""}{team2Stats.rallyCapacity - team1Stats.rallyCapacity})
                  </span>
                </div>
                <div className="mobile-team-specialties">
                  {Object.entries(team2Stats.specialtyCounts || {}).map(([spec, count]) => (
                    <span key={spec} className="mobile-specialty-badge">{getSpecialtyLabel(spec)} {count}</span>
                  ))}
                </div>
                <button onClick={() => setTeam2([])} className="mobile-clear-btn">🗑️ Effacer</button>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3: Search Bar - Fixed below panel */}
        <div className={`mobile-search-bar ${!searchBarVisible ? 'hidden' : ''}`} style={panelFixed ? { position: 'fixed', top: '48vh', left: 0, right: 0, zIndex: 99 } : {}}>
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

        {/* Layer 4: Artists Grid - Scrollable */}
        <div className="mobile-artists-bottom" style={panelFixed ? { paddingTop: '56vh' } : {}}>
          <div className="mobile-artists-count">{filteredArtists.length} artistes trouvés</div>
          <div className="mobile-artists-grid">
            {sortedArtists.map((artist: Artist) => (
              <button key={artist.id} onClick={() => setSelectedArtist(artist)} className={selectedArtist?.id === artist.id ? "selected" : ""}>
                {artist.image ? (
                  <img src={`/assets/images/artists/${artist.image}`} alt={artist.name} />
                ) : (
                  <div className="mobile-artist-placeholder">
                    <span style={{ color: rankColors[artist.rank], fontWeight: 800 }}>{artist.name.charAt(0)}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .mobile-page-container {
          min-height: 100vh;
          background: transparent;
          padding-top: 56px;
        }
        
        /* Layer 1: Header section that scrolls away */
        .mobile-header-section {
          padding: 20px 12px;
          text-align: center;
          background: transparent;
          z-index: 50;
        }
        .mobile-page-title {
          margin-bottom: 10px;
          background: linear-gradient(135deg, #f472b6, #c084fc, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 2rem;
          font-weight: 800;
        }
        .mobile-page-subtitle {
          color: rgba(255,255,255,0.6);
          margin-bottom: 10px;
          font-size: 0.85rem;
        }
        
        /* Layer 2: Top Panel */
        .mobile-top-panel {
          display: flex;
          flex-direction: row;
          gap: 4px;
          padding: 4px;
          background: #0f0f1a;
          z-index: 100;
          height: 48vh;
          min-height: 350px;
          opacity: 1;
        }
        .mobile-top-panel.fixed {
          position: fixed;
          top: 0;
          left: 0;
          height: 48vh;
          min-height: 350px;
        }
          right: 0;
          height: 40vh;
          min-height: 300px;
        }
        
        .mobile-panel-col {
          height: 100%;
          overflow: hidden;
        }
        .mobile-panel-1 { width: 28%; }
        .mobile-panel-2 { width: 36%; }
        .mobile-panel-3 { width: 36%; }
        
        /* Preview Card */
        .mobile-preview-card {
          background: rgba(30,30,50,0.95);
          border-radius: 6px;
          border: 1px solid rgba(139,92,246,0.3);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .mobile-preview-title {
          padding: 4px;
          font-size: 0.55rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .mobile-preview-content {
          padding: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          gap: 3px;
          overflow-y: auto;
        }
        .mobile-preview-image {
          width: 50px;
          height: 65px;
          border-radius: 4px;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .mobile-preview-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* LARGER name */
        .mobile-preview-name {
          font-weight: 700;
          font-size: 0.9rem;
          text-align: center;
        }
        
        /* Speciality - NEW - LARGER */
        .mobile-preview-specialty {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.7);
          text-align: center;
        }
        
        /* Genre - LARGER */
        .mobile-preview-genre {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.6);
          text-align: center;
        }
        
        .mobile-preview-skills {
          margin-top: 2px;
          padding-top: 2px;
          border-top: 1px solid rgba(255,255,255,0.1);
          width: 100%;
          overflow-y: auto;
          flex: 1;
        }
        .mobile-skill-line {
          font-size: 0.55rem;
          color: rgba(255,255,255,0.7);
          margin: 1px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mobile-preview-nav {
          display: flex;
          gap: 8px;
          width: 100%;
          justify-content: center;
        }
        .mobile-preview-nav button {
          width: 24px;
          height: 22px;
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          color: #fff;
          cursor: pointer;
          font-size: 0.6rem;
        }
        .mobile-preview-nav button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .mobile-preview-actions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .mobile-profile-btn {
          padding: 5px 8px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
          border-radius: 4px;
          font-size: 0.6rem;
          border: none;
          cursor: pointer;
        }
        .mobile-add-buttons {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mobile-add-team {
          padding: 4px 6px;
          border-radius: 3px;
          border: none;
          color: white;
          font-size: 0.55rem;
          font-weight: 600;
          cursor: pointer;
        }
        .mobile-team1 { background: #8b5cf6; }
        .mobile-team2 { background: #06b6d4; }
        .mobile-preview-empty {
          padding: 8px;
          text-align: center;
          color: rgba(255,255,255,0.4);
          font-size: 0.55rem;
        }
        
        /* Team Cards */
        .mobile-team-card {
          background: rgba(30,30,50,0.95);
          border-radius: 6px;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 4px;
        }
        .mobile-team-1 { border: 1px solid rgba(139,92,246,0.5); }
        .mobile-team-2 { border: 1px solid rgba(6,182,212,0.5); }
        
        .mobile-team-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
          font-size: 0.65rem;
          font-weight: 700;
        }
        .mobile-team-1 .mobile-team-header span { color: #8b5cf6; }
        .mobile-team-2 .mobile-team-header span { color: #06b6d4; }
        
        .mobile-team-slots {
          display: flex;
          gap: 2px;
          margin-bottom: 4px;
          justify-content: center;
        }
        .mobile-team-slot {
          width: 32px;
          height: 40px;
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          font-size: 0.6rem;
          color: rgba(255,255,255,0.2);
        }
        .mobile-team-slot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .mobile-team-genres {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-bottom: 16px;
          justify-content: center;
        }
        .mobile-genre-badge {
          padding: 2px 5px;
          background: rgba(139,92,246,0.3);
          border-radius: 8px;
          font-size: 0.5rem;
          color: #fff;
        }
        .mobile-specialty-badge {
          padding: 2px 5px;
          background: rgba(6,182,212,0.3);
          border-radius: 8px;
          font-size: 0.5rem;
          color: #fff;
        }
        .mobile-team-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-top: 4px;
          justify-content: center;
        }
        
        /* Stats - EACH ON SINGLE LINE */
        .mobile-team-stats {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }
        .mobile-stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.65rem;
          padding: 2px 4px;
          background: rgba(0,0,0,0.2);
          border-radius: 2px;
        }
        .mobile-stat-row span:first-child {
          flex: 1;
        }
        .mobile-stat-row span:nth-child(2) {
          flex: 0.5;
          text-align: center;
        }
        .mobile-stat-row span:last-child {
          flex: 0.8;
          text-align: right;
          font-size: 0.6rem;
        }
        .mobile-clear-btn {
          width: 100%;
          margin-top: 4px;
          padding: 4px;
          font-size: 0.55rem;
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
        }
        
        /* Search Bar */
        .mobile-search-bar {
          display: flex;
          gap: 3px;
          padding: 6px;
          background: #0f0f1a;
          z-index: 99;
          transition: transform 0.3s ease;
          flex-wrap: wrap;
        }
        .mobile-search-bar.hidden {
          transform: translateY(-100%);
        }
        .mobile-search-bar input {
          flex: 1;
          min-width: 100px;
          padding: 8px;
          background: #1a1a2e;
          border: 1px solid #333;
          border-radius: 4px;
          color: #fff;
          font-size: 0.8rem;
        }
        .mobile-search-bar select {
          padding: 8px 4px;
          background: #1a1a2e;
          border: 1px solid #333;
          border-radius: 4px;
          color: #fff;
          font-size: 0.7rem;
          cursor: pointer;
          min-width: 55px;
        }
        
        /* Artists Bottom */
        .mobile-artists-bottom {
          padding: 8px 6px 100px 6px;
          min-height: 100vh;
        }
        .mobile-top-panel.fixed + .mobile-search-bar {
          top: 48vh;
        }
        .mobile-artists-count {
          font-size: 0.8rem;
          color: #888;
          margin-bottom: 6px;
        }
        .mobile-artists-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 3px;
        }
        .mobile-artists-grid button {
          aspect-ratio: 3/4;
          border-radius: 6px;
          border: 2px solid rgba(255,255,255,0.1);
          background: rgba(30,30,50,0.9);
          padding: 0;
          cursor: pointer;
          overflow: hidden;
        }
        .mobile-artists-grid button.selected {
          border-color: #8b5cf6;
        }
        .mobile-artists-grid img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .mobile-artist-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 800;
        }
      `}</style>
    </>
  );
}
