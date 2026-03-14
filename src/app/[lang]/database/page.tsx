"use client";

import Head from "next/head";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import artistsData from "@/lib/data/artists.json";
import { AdBanner } from "@/components/AdSense";

const filterTranslations: Record<string, any> = {
  fr: {
    all: "Tous", allGenres: "Tous genres", allSpecialties: "Toutes spécialités",
    search: "Rechercher...",
    rank: "Rang", genre: "Genre", specialty: "Spécialité",
    specialties: {
      "Augmentation dommage": "Augmentation dommage",
      "Mixte": "Mixte",
      "Single Car": "Single Car",
      "Damage Reduction": "Damage Reduction",
      "HQ Defense": "HQ Defense",
      "Rassemblement": "Rassemblement",
      "Économie": "Économie"
    }
  },
  en: {
    all: "All", allGenres: "All genres", allSpecialties: "All specialties",
    search: "Search...",
    rank: "Rank", genre: "Genre", specialty: "Specialty",
    specialties: {
      "Augmentation dommage": "Damage Boost",
      "Mixte": "Hybrid",
      "Single Car": "Single Car",
      "Damage Reduction": "Damage Reduction",
      "HQ Defense": "HQ Defense",
      "Rassemblement": "Gathering",
      "Économie": "Economy"
    }
  },
  it: {
    all: "Tutti", allGenres: "Tutti i generi", allSpecialties: "Tutte le specialità",
    search: "Cerca...",
    rank: "Rango", genre: "Genere", specialty: "Specialità",
    specialties: {
      "Augmentation dommage": "Aumento danno",
      "Mixte": "Ibrido",
      "Single Car": "Single Car",
      "Damage Reduction": "Riduzione danno",
      "HQ Defense": "HQ Difesa",
      "Rassemblement": "Raccolta",
      "Économie": "Economia"
    }
  },
  es: {
    all: "Todos", allGenres: "Todos los géneros", allSpecialties: "Todas las especialidades",
    search: "Buscar...",
    rank: "Rango", genre: "Género", specialty: "Especialidad",
    specialties: {
      "Augmentation dommage": "Aumento de daño",
      "Mixte": "Híbrido",
      "Single Car": "Single Car",
      "Damage Reduction": "Reducción de daño",
      "HQ Defense": "HQ Defensa",
      "Rassemblement": "Reunión",
      "Économie": "Economía"
    }
  },
  pt: {
    all: "Todos", allGenres: "Todos os gêneros", allSpecialties: "Todas as especialidades",
    search: "Pesquisar...",
    rank: "Rank", genre: "Gênero", specialty: "Especialidade",
    specialties: {
      "Augmentation dommage": "Aumento de dano",
      "Mixte": "Híbrido",
      "Single Car": "Single Car",
      "Damage Reduction": "Redução de dano",
      "HQ Defense": "HQ Defesa",
      "Rassemblement": "Reunião",
      "Économie": "Economia"
    }
  },
  pl: {
    all: "Wszystkie", allGenres: "Wszystkie gatunki", allSpecialties: "Wszystkie specjalności",
    search: "Szukaj...",
    rank: "Ranga", genre: "Gatunek", specialty: "Specjalność",
    specialties: {
      "Augmentation dommage": "Zwiększenie obrażeń",
      "Mixte": "Hybryda",
      "Single Car": "Single Car",
      "Damage Reduction": "Redukcja obrażeń",
      "HQ Defense": "HQ Obrona",
      "Rassemblement": "Zbieranie",
      "Économie": "Ekonomia"
    }
  },
  id: {
    all: "Semua", allGenres: "Semua genre", allSpecialties: "Semua spesialisasi",
    search: "Cari...",
    rank: "Pangkat", genre: "Genre", specialty: "Spesialisasi",
    specialties: {
      "Augmentation dommage": "Peningkatan damage",
      "Mixte": "Hibrida",
      "Single Car": "Single Car",
      "Damage Reduction": "Pengurangan damage",
      "HQ Defense": "HQ Pertahanan",
      "Rassemblement": "Pengumpulan",
      "Économie": "Ekonomi"
    }
  },
  ru: {
    all: "Все", allGenres: "Все жанры", allSpecialties: "Все специальности",
    search: "Поиск...",
    rank: "Ранг", genre: "Жанр", specialty: "Специальность",
    specialties: {
      "Augmentation dommage": "Увеличение урона",
      "Mixte": "Гибрид",
      "Single Car": "Single Car",
      "Damage Reduction": "Уменьшение урона",
      "HQ Defense": "HQ Защита",
      "Rassemblement": "Сбор",
      "Économie": "Экономика"
    }
  }
};

type Artist = {
  id: number;
  name: string;
  group: string;
  rank: string;
  position: string;
  genre: string;
  skills: string[];
  image?: string;
  specialty?: string;
  skillCategories?: {
    dps: string[];
    offensive: string[];
    hp: string[];
    defense: string[];
    speed: string[];
  };
  build: string;
};

const rankColors: Record<string, string> = {
  UR: "#ffd700",
  "UR Bali": "#ffd700",
  SSR: "#c084fc",
  "SSR VIP": "#c084fc",
  "SSR AH": "#c084fc",
  SR: "#60a5fa",
  R: "#4ade80",
  N: "#94a3b8",
};

const rankOrder: Record<string, number> = {
  UR: 1,
  "UR Bali": 1,
  SSR: 2,
  "SSR VIP": 2,
  "SSR AH": 2,
  SR: 3,
  R: 4,
  N: 5,
};

const genreColors: Record<string, string> = {
  Pop: "#ff69b4",
  "Hip Hop": "#ff8c00",
  "R&B": "#9b59b6",
  Rock: "#e74c3c",
  Electronic: "#00ced1",
};

export default function DatabasePage() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = filterTranslations[lang] || filterTranslations.en;
  
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [team, setTeam] = useState<Artist[]>([]);

  const addToTeam = (artist: Artist) => {
    if (team.length < 5 && !team.find(a => a.id === artist.id)) {
      setTeam([...team, artist]);
    }
  };

  const removeFromTeam = (artistId: number) => {
    setTeam(team.filter(a => a.id !== artistId));
  };

  const teamStats = useMemo(() => {
    let skillDamage = 0;
    let skillDamageRaw = 0;
    let basicAttackPercent = 0;
    let attackResist = 0;
    let skillResist = 0;
    let passive = 0;
    let fanCapacity = 0;
    let rallyCapacity = 0;

    team.forEach(artist => {
      const basePassive = 200;
      passive += basePassive;
      
      [...(artist.skillCategories?.dps || []), ...(artist.skillCategories?.offensive || [])].forEach(skill => {
        const match = skill.match(/(\d+)\s*Damage/);
        if (match && !skill.toLowerCase().includes('%')) {
          skillDamageRaw += parseInt(match[1]);
        }
      });

      [...(artist.skillCategories?.hp || [])].forEach(skill => {
        const match = skill.match(/(\d+)%/);
        if (match) {
          const val = parseInt(match[1]);
          if (skill.toLowerCase().includes('fan capacity') && skill.toLowerCase().includes('rally')) {
            rallyCapacity += val;
          } else if (skill.toLowerCase().includes('fan capacity')) {
            fanCapacity += val;
          }
        }
      });

      artist.skills?.forEach(skill => {
        const match = skill.match(/(\d+)%/);
        if (match) {
          const val = parseInt(match[1]);
          if (skill.toLowerCase().includes('skill damage') && !skill.toLowerCase().includes('resist') && !skill.toLowerCase().includes('taken')) {
            skillDamage += val;
          }
          if (skill.toLowerCase().includes('basic attack') && !skill.toLowerCase().includes('taken')) {
            basicAttackPercent += val;
          }
          if (skill.toLowerCase().includes('resist') || skill.toLowerCase().includes('taken')) {
            if (skill.toLowerCase().includes('skill')) {
              skillResist += val;
            } else {
              attackResist += val;
            }
          }
        }
      });
    });

    const genreCounts: Record<string, number> = {};
    team.forEach(artist => {
      const genre = artist.genre?.toUpperCase() || 'Unknown';
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });

    return { 
      skillDamage, 
      skillDamageRaw,
      basicAttackPercent, 
      attackResist, 
      skillResist, 
      passive,
      fanCapacity,
      rallyCapacity,
      genreCounts
    };
  }, [team]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");

  const filteredArtists = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return artistsData.filter((artist: Artist) => {
      const matchesSearch =
        !query ||
        artist.name.toLowerCase().includes(query) ||
        artist.group.toLowerCase().includes(query) ||
        artist.position.toLowerCase().includes(query) ||
        artist.genre.toLowerCase().includes(query) ||
        artist.rank.toLowerCase().includes(query) ||
        artist.build?.toLowerCase().includes(query) ||
        (artist.skills && artist.skills.some(s => s.toLowerCase().includes(query)));
      const matchesRank = !filterRank || artist.rank === filterRank;
      const matchesPosition = !filterPosition || artist.position === filterPosition;
      const matchesGenre = !filterGenre || artist.genre === filterGenre;
      const matchesSpecialty = !filterSpecialty || artist.specialty === filterSpecialty;
      return matchesSearch && matchesRank && matchesPosition && matchesGenre && matchesSpecialty;
    });
  }, [searchQuery, filterRank, filterPosition, filterGenre, filterSpecialty]);

  const selectArtist = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  const nextArtist = () => {
    if (!selectedArtist) return;
    const idx = filteredArtists.findIndex((a) => a.id === selectedArtist.id);
    if (idx < filteredArtists.length - 1) {
      setSelectedArtist(filteredArtists[idx + 1]);
    }
  };

  const prevArtist = () => {
    if (!selectedArtist) return;
    const idx = filteredArtists.findIndex((a) => a.id === selectedArtist.id);
    if (idx > 0) {
      setSelectedArtist(filteredArtists[idx - 1]);
    }
  };

  return (
    <>
      <Head>
        <title>Artistes - TopGirl ApexGirl | 112+ Personnages</title>
        <meta name="description" content="Découvrez tous les artistes de TopGirl. Stats complètes, compétences, ranks UR/SSR/SR/R. Trouvez les meilleurs personnages!" />
        <meta name="keywords" content="TopGirl artists, TopGirl characters, TopGirl UR, TopGirl SSR, TopGirl database, personnages TopGirl" />
        <meta property="og:title" content="Artistes - TopGirl ApexGirl" />
        <meta property="og:description" content="Découvrez tous les artistes de TopGirl avec leurs stats complètes." />
      </Head>

      <div className="container" style={{ paddingTop: "40px" }}>
        <div className="text-center" style={{ marginBottom: "40px" }}>
          <h1 className="section-title">🎤 Artistes</h1>
          <p className="section-subtitle">Découvrez tous les personnages du jeu</p>
        </div>

        <AdBanner />

        <div className="grid" style={{ gridTemplateColumns: "270px 1fr", gap: "24px", marginTop: "32px" }}>
          {/* Left Panel - Sticky */}
          <div style={{ position: "sticky", top: "100px", height: "fit-content", alignSelf: "start" }}>
            <div className="glass-card" style={{ 
              padding: "0",
              overflow: "hidden",
              marginBottom: "24px",
              transform: "scale(0.75)",
              transformOrigin: "top left",
              width: "133.33%"
            }}>
            <div style={{ 
              padding: "20px", 
              borderBottom: "1px solid var(--border)",
              background: "linear-gradient(135deg, rgba(255, 77, 141, 0.15), rgba(139, 92, 246, 0.15))"
            }}>
              <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Artist Overview
              </span>
            </div>

            {selectedArtist ? (
              <div style={{ padding: "24px" }}>
                <div className="flex justify-between items-center" style={{ marginBottom: "20px" }}>
                  <button 
                    onClick={prevArtist}
                    style={{
                      width: "40px", height: "40px",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-subtle)",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      fontSize: "1.2rem"
                    }}
                  >
                    ←
                  </button>
                  <button 
                    onClick={nextArtist}
                    style={{
                      width: "40px", height: "40px",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-subtle)",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      fontSize: "1.2rem"
                    }}
                  >
                    →
                  </button>
                </div>

                {/* Artist Full Portrait */}
                <div style={{ 
                  textAlign: "center", 
                  marginBottom: "16px",
                  position: "relative"
                }}>
                  <div style={{
                    width: "160px",
                    height: "220px",
                    margin: "0 auto",
                    borderRadius: "var(--radius-lg)",
                    border: `3px solid ${rankColors[selectedArtist.rank]}`,
                    background: `linear-gradient(135deg, ${rankColors[selectedArtist.rank]}22, var(--bg-subtle))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    boxShadow: `0 0 30px ${rankColors[selectedArtist.rank]}44`
                  }}>
                    {selectedArtist.image ? (
                      <img 
                        src={`/assets/images/artists/${selectedArtist.image}`}
                        alt={selectedArtist.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top center"
                        }}
                      />
                    ) : (
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        width: "100%",
                        background: `linear-gradient(135deg, ${rankColors[selectedArtist.rank]}33, var(--bg-subtle))`
                      }}>
                        <span style={{ fontSize: "4rem", fontWeight: 800, color: rankColors[selectedArtist.rank] }}>{selectedArtist.name.charAt(0)}</span>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "6px" }}>{selectedArtist.name}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Rank & Position badges */}
                  <div className="flex gap-2" style={{ justifyContent: "center", marginTop: "12px" }}>
                    <span style={{ 
                      padding: "6px 12px", 
                      borderRadius: "var(--radius-full)", 
                      fontSize: "0.7rem", 
                      fontWeight: 700,
                      background: rankColors[selectedArtist.rank],
                      color: "#000",
                      boxShadow: `0 0 10px ${rankColors[selectedArtist.rank]}66`
                    }}>
                      {selectedArtist.rank}
                    </span>
                    <span style={{ 
                      padding: "6px 12px", 
                      borderRadius: "var(--radius-full)", 
                      fontSize: "0.7rem",
                      background: genreColors[selectedArtist.genre] || "var(--bg-elevated)",
                      color: "#fff"
                    }}>
                      {selectedArtist.genre}
                    </span>
                  </div>
                </div>

                {/* Artist Info */}
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "2px", color: rankColors[selectedArtist.rank] }}>
                    {selectedArtist.name}
                  </h2>
                  <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: "12px" }}>
                    {selectedArtist.group}
                  </p>
                  <div className="flex gap-3 justify-center" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    <span>🎯 {selectedArtist.position}</span>
                    <span>⭐ {selectedArtist.build}</span>
                  </div>
                </div>

                {/* Skills */}
                <div style={{ marginTop: "16px" }}>
                  <h4 style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Compétences
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {selectedArtist.skills.map((skill, idx) => (
                      <div key={idx} style={{
                        padding: "8px 12px",
                        background: "var(--bg-subtle)",
                        borderRadius: "var(--radius)",
                        fontSize: "0.8rem",
                        borderLeft: `3px solid ${rankColors[selectedArtist.rank]}`,
                        color: "var(--text-primary)"
                      }}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ 
                padding: "80px 24px", 
                textAlign: "center", 
                color: "var(--text-muted)"
              }}>
                <div style={{ fontSize: "4rem", marginBottom: "16px" }}>👆</div>
                <p style={{ fontSize: "1.1rem" }}>Sélectionnez un artiste</p>
              </div>
            )}

            {/* Team Builder */}
            <div style={{ 
              padding: "20px", 
              borderTop: "1px solid var(--border)",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))",
              transform: "scale(1.15)",
              transformOrigin: "top left",
              width: "86.96%"
            }}>
              <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
                Team Builder ({team.length}/5)
              </div>
              
              <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
                {[0,1,2,3,4].map(i => (
                  <div
                    key={i}
                    onClick={() => team[i] && removeFromTeam(team[i].id)}
                    style={{
                      width: "48px",
                      height: "60px",
                      borderRadius: "var(--radius)",
                      border: `2px solid ${team[i] ? rankColors[team[i].rank] : "var(--border)"}`,
                      background: team[i] ? `linear-gradient(135deg, ${rankColors[team[i].rank]}22, var(--bg-subtle))` : "var(--bg-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: team[i] ? "pointer" : "default",
                      overflow: "hidden"
                    }}
                  >
                    {team[i] ? (
                      team[i].image ? (
                        <img 
                          src={`/assets/images/artists/${team[i].image}`}
                          alt={team[i].name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <span style={{ fontSize: "1.3rem", fontWeight: 800, color: rankColors[team[i].rank] }}>
                          {team[i].name.charAt(0)}
                        </span>
                      )
                    ) : (
                      <span style={{ color: "var(--text-dim)", fontSize: "1rem" }}>+</span>
                    )}
                  </div>
                ))}
              </div>

              {team.length > 0 && (
                <div style={{ 
                  background: "var(--bg-subtle)", 
                  borderRadius: "var(--radius)",
                  padding: "12px",
                  marginBottom: "12px"
                }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>
                    Stats combinés
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "0.75rem" }}>
                    <div style={{ color: "#ff6b6b" }}>
                      ⚔️ Skill Dmg %: <span style={{ fontWeight: 700, color: "#fff" }}>{teamStats.skillDamage}%</span>
                    </div>
                    <div style={{ color: "#ff8c42" }}>
                      💥 Skill Dmg: <span style={{ fontWeight: 700, color: "#fff" }}>{teamStats.skillDamageRaw}</span>
                    </div>
                    <div style={{ color: "#4ecdc4" }}>
                      👊 Basic Atk: <span style={{ fontWeight: 700, color: "#fff" }}>{teamStats.basicAttackPercent}%</span>
                    </div>
                    <div style={{ color: "#95e1d3" }}>
                      🛡️ Atk Resist: <span style={{ fontWeight: 700, color: "#fff" }}>{teamStats.attackResist}%</span>
                    </div>
                    <div style={{ color: "#a29bfe" }}>
                      ✨ Skill Resist: <span style={{ fontWeight: 700, color: "#fff" }}>{teamStats.skillResist}%</span>
                    </div>
                    <div style={{ color: "#fd79a8" }}>
                      💫 Passive: <span style={{ fontWeight: 700, color: "#fff" }}>{teamStats.passive}</span>
                    </div>
                    <div style={{ color: "#ffd700" }}>
                      🎵 Fan Cap: <span style={{ fontWeight: 700, color: "#fff" }}>{teamStats.fanCapacity}%</span>
                    </div>
                    <div style={{ color: "#00ff88" }}>
                      🚀 Rally: <span style={{ fontWeight: 700, color: "#fff" }}>{teamStats.rallyCapacity}%</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedArtist && !team.find(a => a.id === selectedArtist.id) && team.length < 5 && (
                <button
                  onClick={() => addToTeam(selectedArtist)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "var(--radius)",
                    border: "none",
                    background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer"
                  }}
                >
                  + Ajouter {selectedArtist.name}
                </button>
              )}

              {team.length > 0 && (
                <button
                  onClick={() => setTeam([])}
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    padding: "8px",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-muted)",
                    fontSize: "0.75rem",
                    cursor: "pointer"
                  }}
                >
                  🗑️ Tout effacer
                </button>
              )}

              {team.length > 0 && (
                <div style={{ 
                  marginTop: "12px",
                  padding: "10px",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))",
                  borderRadius: "var(--radius)",
                  border: "1px solid rgba(139, 92, 246, 0.3)"
                }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Genres
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {Object.entries(teamStats.genreCounts).map(([genre, count]) => (
                      <span
                        key={genre}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "var(--radius-full)",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          background: "rgba(0,0,0,0.4)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.1)"
                        }}
                      >
                        {count} {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>

          {/* Artists Grid */}
          <div>
            <div className="glass-card" style={{ marginBottom: "24px", padding: "20px" }}>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: "1",
                    minWidth: "180px",
                    padding: "12px 16px",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem"
                  }}
                />
                <select
                  value={filterRank}
                  onChange={(e) => setFilterRank(e.target.value)}
                  style={{
                    padding: "12px 16px",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    minWidth: "100px"
                  }}
                >
                  <option value="">{t.all}</option>
                  <option value="UR">UR</option>
                  <option value="SSR">SSR</option>
                  <option value="SR">SR</option>
                  <option value="R">R</option>
                </select>
                <select
                  value={filterGenre}
                  onChange={(e) => setFilterGenre(e.target.value)}
                  style={{
                    padding: "12px 16px",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    minWidth: "130px"
                  }}
                >
                  <option value="">{t.allGenres}</option>
                  <option value="Pop">Pop</option>
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="R&B">R&B</option>
                  <option value="Rock">Rock</option>
                  <option value="Electronic">Electronic</option>
                </select>
                <select
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                  style={{
                    padding: "12px 16px",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    minWidth: "150px"
                  }}
                >
                  <option value="">{t.allSpecialties}</option>
                  <option value="Augmentation dommage">Augmentation dommage</option>
                  <option value="Mixte">Mixte</option>
                  <option value="Single Car">Single Car</option>
                  <option value="Damage Reduction">Damage Reduction</option>
                  <option value="HQ Defense">HQ Defense</option>
                  <option value="Rassemblement">Rassemblement</option>
                  <option value="Économie">Économie</option>
                </select>
              </div>
            </div>
            </div>

            <div className="grid-container">
            {filteredArtists
              .sort((a, b) => rankOrder[a.rank] - rankOrder[b.rank])
              .map((artist) => (
                <button
                  key={artist.id}
                  onClick={() => selectArtist(artist)}
                  style={{
                    background: selectedArtist?.id === artist.id 
                      ? `${rankColors[artist.rank]}22`
                      : "var(--bg-card)",
                    border: `2px solid ${selectedArtist?.id === artist.id ? rankColors[artist.rank] : "var(--border)"}`,
                    borderRadius: "var(--radius-md)",
                    padding: "0",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    aspectRatio: "3/4",
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  {artist.image ? (
                    <img 
                      src={`/assets/images/artists/${artist.image}`}
                      alt={artist.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      width: "100%",
                      background: `linear-gradient(135deg, ${rankColors[artist.rank]}33, var(--bg-subtle))`
                    }}>
                      <span style={{ fontSize: "2.5rem", fontWeight: 800, color: rankColors[artist.rank] }}>{artist.name.charAt(0)}</span>
                    </div>
                  )}
                  <div style={{
                    position: "absolute",
                    bottom: "6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    background: rankColors[artist.rank],
                    color: "#000",
                    whiteSpace: "nowrap"
                  }}>
                    {artist.rank}
                  </div>
                </button>
              ))}
          </div>

          {filteredArtists.length === 0 && (
            <div className="text-center" style={{ padding: "60px", color: "var(--text-muted)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
              <p>Aucun artiste trouvé</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 12px;
        }
        @media (max-width: 1400px) {
          .grid-container {
            grid-template-columns: repeat(6, 1fr) !important;
          }
        }
        @media (max-width: 1100px) {
          .grid-container {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .grid-container {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .grid-container {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
