"use client";

import Head from "next/head";
import { useState, useMemo, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import artistsData from "@/lib/data/artists.json";
import { AdBanner } from "@/components/AdSense";

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
  UR: "#fbbf24", SSR: "#a855f7", SR: "#3b82f6", R: "#22c55e",
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
const RANKS = ['UR', 'SSR', 'SR', 'R', 'UR Bali'];
const SPECIALTIES = ['Augmentation dommage', 'Dommage réduction', 'Vitesse de conduite', 'HQ Defense', 'Mixte', 'Rassemblement', 'Solo car', 'Économie'];

export default function ArtistsPage() {
  const params = useParams();
  const lang = (params?.lang as string) || "fr";
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [team, setTeam] = useState<Artist[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const t = filterTranslations[lang] || filterTranslations.fr;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!panelRef.current) return;
      const headerHeight = 70;
      const scrollY = window.scrollY;
      const startY = 110;
      if (scrollY > startY) {
        panelRef.current.style.position = 'fixed';
        panelRef.current.style.top = headerHeight + 'px';
      } else {
        panelRef.current.style.position = 'absolute';
        panelRef.current.style.top = startY + 'px';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToTeam = (artist: Artist) => {
    if (team.length < 5 && !team.find(a => a.id === artist.id)) {
      setTeam([...team, artist]);
    }
  };

  const removeFromTeam = (id: number) => {
    setTeam(team.filter(a => a.id !== id));
  };

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

  const rankOrder: Record<string, number> = { UR: 1, "UR Bali": 1, SSR: 2, SR: 3, R: 4 };
  const getRankSort = (r: string) => rankOrder[r] || 99;
  const sortedArtists = [...filteredArtists].sort((a, b) => getRankSort(a.rank) - getRankSort(b.rank));

  if (!mounted) {
    return <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Artistes - TopGirl</title>
      </Head>

      <div className="container" style={{ padding: "40px 20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "10px", background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "2.5rem", fontWeight: 800 }}>
          🎤 Artistes
        </h1>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", marginBottom: "30px" }}>Découvrez tous les personnages</p>

        <AdBanner />

        {/* MAIN LAYOUT: Left Panel + Right Grid */}
        <div style={{ position: "relative" }}>
          
          {/* LEFT: Fixed Panel */}
          <div ref={panelRef} style={{ position: "absolute", top: "110px", left: "0px" }} className="left-panel">
               
              {/* Artist Overview Card - compact */}
              <div className="artist-overview-card" style={{ background: "rgba(30,30,50,0.9)", borderRadius: "12px", border: "1px solid rgba(139,92,246,0.3)", padding: 0, marginBottom: "6px", overflow: "hidden" }}>
                <div className="artist-overview-title" style={{ padding: "10px", borderBottom: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(135deg, rgba(255,77,141,0.15), rgba(139,92,246,0.15))" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>{t.artistOverview}</span>
                </div>

                {selectedArtist ? (
                  <div className="artist-overview-content" style={{ padding: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button onClick={() => { const i = filteredArtists.findIndex(a => a.id === selectedArtist.id); if (i > 0) setSelectedArtist(filteredArtists[i-1]); }} style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", fontSize: "0.7rem" }}>◀</button>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: rankColors[selectedArtist.rank], marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center" }}>{selectedArtist.name}</h2>
                        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>{selectedArtist.group}</p>
                      </div>
                      <button onClick={() => { const i = filteredArtists.findIndex(a => a.id === selectedArtist.id); if (i < filteredArtists.length-1) setSelectedArtist(filteredArtists[i+1]); }} style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", fontSize: "0.7rem" }}>▶</button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
                      <div className="artist-image" style={{ width: "75px", height: "100px", borderRadius: "10px", border: `2px solid ${rankColors[selectedArtist.rank]}`, background: `linear-gradient(135deg, ${rankColors[selectedArtist.rank]}22, rgba(30,30,50,1))`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                        {selectedArtist.image ? (
                          <img src={`/assets/images/artists/${selectedArtist.image}`} alt={selectedArtist.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span style={{ fontSize: "1.8rem", fontWeight: 800, color: rankColors[selectedArtist.rank] }}>{selectedArtist.name.charAt(0)}</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", marginBottom: "2px" }}>🎯 {selectedArtist.position}</p>
                        <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", marginBottom: "2px" }}>⭐ {selectedArtist.build}</p>
                        <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", marginBottom: "2px" }}>💎 {selectedArtist.specialty || selectedArtist.genre}</p>
                        <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)" }}>🎵 {selectedArtist.genre}</p>
                      </div>
                    </div>

                     <div style={{ marginTop: "8px" }}>
                       <p style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.4)", marginBottom: "3px", textTransform: "uppercase" }}>{t.skills}</p>
                       <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                         {selectedArtist.skills?.slice(0,3).map((skill, i) => (
                           <div key={i} style={{ padding: "4px 6px", background: "rgba(255,255,255,0.03)", borderRadius: "4px", fontSize: "0.5rem", borderLeft: `2px solid ${rankColors[selectedArtist.rank]}`, color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{skill}</div>
                         ))}
                       </div>
                     </div>
                      {/* Lien vers la page détaillée de l'artiste */}
                      <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Link 
                          href={`/${lang}/artist/${slugify(selectedArtist.name)}`} 
                          className="view-profile-btn"
                          style={{
                           display: 'inline-block',
                           padding: '8px 16px',
                           background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                           color: 'white',
                           borderRadius: '6px',
                           fontSize: '0.85rem',
                           fontWeight: 500
                         }}
                        >
                          {t.viewFullProfile}
                       </Link>
                     </div>
                   </div>
                ) : (
                  <div style={{ padding: "20px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                    <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>👆</div>
                    <p style={{ fontSize: "0.75rem" }}>{t.selectArtist}</p>
                  </div>
                )}
              </div>

              {/* Team Builder Card */}
              <div className="team-builder-card" style={{ background: "rgba(30,30,50,0.9)", borderRadius: "12px", border: "1px solid rgba(139,92,246,0.3)", padding: "12px" }}>
                <div className="team-builder-title" style={{ fontWeight: 600, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "10px" }}>{t.teamBuilder} ({team.length}/5)</div>
                
                <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
                  {[0,1,2,3,4].map(i => (
                    <div className="team-slot" key={i} onClick={() => team[i] && removeFromTeam(team[i].id)} style={{ width: "62px", height: "70px", borderRadius: "8px", border: `2px solid ${team[i] ? rankColors[team[i].rank] : "rgba(255,255,255,0.1)"}`, background: team[i] ? `linear-gradient(135deg, ${rankColors[team[i].rank]}22, rgba(30,30,50,1))` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", cursor: team[i] ? "pointer" : "default", overflow: "hidden" }}>
                      {team[i] ? (
                        team[i].image ? <img src={`/assets/images/artists/${team[i].image}`} alt={team[i].name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "1.3rem", fontWeight: 800, color: rankColors[team[i].rank] }}>{team[i].name.charAt(0)}</span>
                      ) : <span style={{ color: "rgba(255,255,255,0.2)" }}>+</span>}
                    </div>
                  ))}
                </div>

                {team.length > 0 && (
                  <div className="team-stats" style={{ background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "10px", marginBottom: "10px" }}>
                    <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "4px", textTransform: "uppercase" }}>{t.combinedStats}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", fontSize: "0.7rem" }}>
                      <div style={{ color: "#ff6b6b" }}>⚔️ Skill damage: {teamStats.skillDamage}%</div>
                      <div style={{ color: "#ff8c42" }}>💥 DMG Factor: {teamStats.skillDamageRaw}</div>
                      <div style={{ color: "#4ecdc4" }}>👊 Basic attack: {teamStats.basicAttackPercent}%</div>
                      <div style={{ color: "#95e1d3" }}>🛡️ Res: {teamStats.attackResist}%</div>
                      <div style={{ color: "#a29bfe" }}>✨ S.Res: {teamStats.skillResist}%</div>
                      <div style={{ color: "#ffd700" }}>🎵 Fan: {teamStats.fanCapacity}%</div>
                      <div style={{ color: "#00ff88" }}>🚀 Rally: {teamStats.rallyCapacity}%</div>
                    </div>
                  </div>
                )}

                {selectedArtist && !team.find(a => a.id === selectedArtist.id) && team.length < 5 && (
                  <button className="add-to-team-btn" onClick={() => addToTeam(selectedArtist)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", color: "#fff", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}>+ Ajouter {selectedArtist.name}</button>
                )}

                {team.length > 0 && (
                  <button onClick={() => setTeam([])} style={{ width: "100%", marginTop: "8px", padding: "8px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", cursor: "pointer" }}>🗑️ Tout effacer</button>
                )}

                {team.length > 0 && (
                  <div style={{ marginTop: "8px", padding: "8px", background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))", borderRadius: "8px" }}>
                    <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", marginBottom: "4px", textTransform: "uppercase" }}>{t.genres}</p>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {Object.entries(teamStats.genreCounts).map(([g, c]) => (
                        <span key={g} style={{ padding: "3px 8px", borderRadius: "10px", fontSize: "0.65rem", fontWeight: 600, background: "rgba(0,0,0,0.4)", color: "#fff" }}>{c} {g}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* RIGHT: Artists Grid */}
          <div className="artists-container">
            {/* BARRE DE RECHERCHE */}
            <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "#0f0f1a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "1rem",
                  marginBottom: "12px",
                  outline: "none",
                }}
              />
              <div style={{ display: "flex", gap: "8px" }}>
                <select 
                  value={filterRank} 
                  onChange={(e) => setFilterRank(e.target.value)} 
                  style={{ 
                    flex: 1,
                    padding: "10px", 
                    background: "#0f0f1a", 
                    border: "1px solid #333", 
                    borderRadius: "8px", 
                    color: "#fff", 
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  <option value="">{t.allRanks}</option>
                  {RANKS.map(rank => (
                    <option key={rank} value={rank} style={{ color: "#fff" }}>{rank}</option>
                  ))}
                </select>
                <select 
                  value={filterGenre} 
                  onChange={(e) => setFilterGenre(e.target.value)} 
                  style={{ 
                    flex: 1,
                    padding: "10px", 
                    background: "#0f0f1a", 
                    border: "1px solid #333", 
                    borderRadius: "8px", 
                    color: "#fff", 
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  <option value="">{t.allGenres}</option>
                  {GENRES.map(genre => (
                    <option key={genre} value={genre} style={{ color: "#fff" }}>{genre}</option>
                  ))}
                </select>
                <select 
                  value={filterSpecialty} 
                  onChange={(e) => setFilterSpecialty(e.target.value)} 
                  style={{ 
                    flex: 1,
                    padding: "10px", 
                    background: "#0f0f1a", 
                    border: "1px solid #333", 
                    borderRadius: "8px", 
                    color: "#fff", 
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  <option value="">{t.allSpecialties}</option>
                  {SPECIALTIES.map(spec => (
                    <option key={spec} value={spec} style={{ color: "#fff" }}>{spec}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginTop: "10px", fontSize: "0.85rem", color: "#888" }}>
                {filteredArtists.length} artistes trouvés
              </div>
            </div>

            <div className="artists-grid" key={`grid-${filteredArtists.length}-${searchQuery}-${filterRank}-${filterGenre}-${filterSpecialty}`}>
              {sortedArtists.map((artist: Artist) => (
                <button key={artist.id} onClick={() => setSelectedArtist(artist)} style={{ background: selectedArtist?.id === artist.id ? `${rankColors[artist.rank]}22` : "rgba(30,30,50,0.9)", border: `2px solid ${selectedArtist?.id === artist.id ? rankColors[artist.rank] : "rgba(255,255,255,0.1)"}`, borderRadius: "12px", padding: 0, cursor: "pointer", aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                  {artist.image ? (
                    <img src={`/assets/images/artists/${artist.image}`} alt={artist.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: `linear-gradient(135deg, ${rankColors[artist.rank]}33, rgba(30,30,50,1))` }}>
                      <span style={{ fontSize: "2rem", fontWeight: 800, color: rankColors[artist.rank] }}>{artist.name.charAt(0)}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

      <style jsx>{`
        .left-panel {
          width: 49.5%;
          max-width: 660px;
        }
        .artists-container {
          margin-left: 52%;
          width: 48%;
          min-height: 100vh;
        }
        .artists-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 6px;
        }
        @media (max-width: 900px) {
          .left-panel {
            position: relative;
            width: 100%;
            max-width: 100%;
            margin-bottom: 10px;
          }
          .artists-container {
            margin-left: 0;
            width: 100%;
            padding-bottom: 80px;
          }
        }
        @media (max-width: 2200px) {
          .artists-grid { grid-template-columns: repeat(6, 1fr); }
        }
        @media (max-width: 1900px) {
          .artists-grid { grid-template-columns: repeat(5, 1fr); }
        }
        @media (max-width: 1600px) {
          .artists-grid { grid-template-columns: repeat(5, 1fr); }
        }
        @media (max-width: 1300px) {
          .artists-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 1000px) {
          .artists-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .artists-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        /* Mobile left panel fixes */
        @media (max-width: 900px) {
          .artist-overview-card {
            padding: 6px !important;
            margin-bottom: 4px !important;
          }
          .artist-overview-title {
            font-size: 0.7rem !important;
            padding: 6px !important;
          }
          .artist-overview-content {
            padding: 6px !important;
          }
          .artist-image {
            width: 50px !important;
            height: 65px !important;
          }
          .artist-info {
            font-size: 0.55rem !important;
          }
          .view-profile-btn {
            padding: 4px 8px !important;
            font-size: 0.7rem !important;
            margin-top: 8px !important;
          }
          .team-builder-card {
            padding: 6px !important;
          }
          .team-builder-title {
            font-size: 0.7rem !important;
            margin-bottom: 4px !important;
          }
          .team-slot {
            width: 48px !important;
            height: 55px !important;
          }
          .team-stats {
            padding: 4px !important;
            font-size: 0.55rem !important;
          }
          .add-to-team-btn {
            padding: 6px !important;
            font-size: 0.65rem !important;
          }
        }
      `}</style>
    </>
  );
}
