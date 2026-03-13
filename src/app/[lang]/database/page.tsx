"use client";

import Head from "next/head";
import { useState, useMemo } from "react";
import artistsData from "@/lib/data/artists.json";
import { AdBanner } from "@/components/AdSense";

type Artist = {
  id: number;
  name: string;
  group: string;
  rank: string;
  position: string;
  genre: string;
  skills: string[];
  skillCategories: {
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

export default function DatabasePage() {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterGroup, setFilterGroup] = useState("");

  const filteredArtists = useMemo(() => {
    return artistsData.filter((artist: Artist) => {
      const matchesSearch =
        !searchQuery ||
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.group.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRank = !filterRank || artist.rank === filterRank;
      const matchesPosition = !filterPosition || artist.position === filterPosition;
      const matchesGroup = !filterGroup || artist.group === filterGroup;
      return matchesSearch && matchesRank && matchesPosition && matchesGroup;
    });
  }, [searchQuery, filterRank, filterPosition, filterGroup]);

  const groups = useMemo(() => {
    return [...new Set(artistsData.map((a: Artist) => a.group))].sort();
  }, []);

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

        <div className="grid" style={{ gridTemplateColumns: "380px 1fr", gap: "32px", marginTop: "32px" }}>
          {/* Artist Panel */}
          <div className="glass-card" style={{ 
            position: "sticky", 
            top: "100px", 
            height: "fit-content",
            padding: "0",
            overflow: "hidden"
          }}>
            <div style={{ 
              padding: "20px", 
              borderBottom: "1px solid var(--border)",
              background: "linear-gradient(135deg, rgba(255, 77, 141, 0.1), rgba(139, 92, 246, 0.1))"
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
                      width: "36px", height: "36px",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-subtle)",
                      color: "var(--text-primary)",
                      cursor: "pointer"
                    }}
                  >
                    ←
                  </button>
                  <button 
                    onClick={nextArtist}
                    style={{
                      width: "36px", height: "36px",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-subtle)",
                      color: "var(--text-primary)",
                      cursor: "pointer"
                    }}
                  >
                    →
                  </button>
                </div>

                {/* Artist Image */}
                <div style={{ 
                  textAlign: "center", 
                  marginBottom: "20px",
                  position: "relative"
                }}>
                  <div style={{
                    width: "180px",
                    height: "220px",
                    margin: "0 auto",
                    borderRadius: "var(--radius-lg)",
                    border: `3px solid ${rankColors[selectedArtist.rank]}`,
                    background: `linear-gradient(135deg, ${rankColors[selectedArtist.rank]}22, var(--bg-subtle))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "4rem",
                    fontWeight: 800,
                    color: rankColors[selectedArtist.rank],
                    overflow: "hidden"
                  }}>
                    <img 
                      src={`/assets/images/artists/${selectedArtist.id}.png`}
                      alt={selectedArtist.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <span className="artist-initial" style={{
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {selectedArtist.name.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex gap-4" style={{ justifyContent: "center", marginTop: "12px" }}>
                    <span style={{ 
                      padding: "6px 14px", 
                      borderRadius: "var(--radius-full)", 
                      fontSize: "0.75rem", 
                      fontWeight: 700,
                      background: rankColors[selectedArtist.rank],
                      color: "#000"
                    }}>
                      {selectedArtist.rank}
                    </span>
                    <span style={{ 
                      padding: "6px 14px", 
                      borderRadius: "var(--radius-full)", 
                      fontSize: "0.75rem",
                      background: "var(--bg-elevated)",
                      color: "var(--text-muted)"
                    }}>
                      {selectedArtist.position}
                    </span>
                  </div>
                </div>

                {/* Artist Info */}
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px", color: rankColors[selectedArtist.rank] }}>
                    {selectedArtist.name}
                  </h2>
                  <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: "12px" }}>
                    {selectedArtist.group}
                  </p>
                  <div className="flex gap-4 justify-between" style={{ justifyContent: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    <span>🎵 {selectedArtist.genre}</span>
                    <span>⭐ {selectedArtist.build}</span>
                  </div>
                </div>

                {/* Skills */}
                <div style={{ marginTop: "24px" }}>
                  <h4 style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Compétences
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {selectedArtist.skills.map((skill, idx) => (
                      <div key={idx} style={{
                        padding: "10px 14px",
                        background: "var(--bg-subtle)",
                        borderRadius: "var(--radius)",
                        fontSize: "0.85rem",
                        borderLeft: "3px solid var(--primary)"
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
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>👆</div>
                <p>Sélectionnez un artiste</p>
              </div>
            )}
          </div>

          {/* Artists Grid */}
          <div>
            {/* Filters */}
            <div className="glass-card" style={{ marginBottom: "24px", padding: "20px" }}>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: "1",
                    minWidth: "200px",
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
                    minWidth: "120px"
                  }}
                >
                  <option value="">Tous les ranks</option>
                  <option value="UR">UR</option>
                  <option value="SSR">SSR</option>
                  <option value="SR">SR</option>
                  <option value="R">R</option>
                </select>
                <select
                  value={filterPosition}
                  onChange={(e) => setFilterPosition(e.target.value)}
                  style={{
                    padding: "12px 16px",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    minWidth: "140px"
                  }}
                >
                  <option value="">Tous les rôles</option>
                  <option value="Center">Center</option>
                  <option value="Dancer">Dancer</option>
                  <option value="Vocalist">Vocalist</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", 
              gap: "12px" 
            }}>
              {filteredArtists
                .sort((a, b) => rankOrder[a.rank] - rankOrder[b.rank])
                .map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => selectArtist(artist)}
                    style={{
                      background: selectedArtist?.id === artist.id 
                        ? `linear-gradient(135deg, ${rankColors[artist.rank]}33, var(--bg-card))`
                        : "var(--bg-card)",
                      border: `2px solid ${selectedArtist?.id === artist.id ? rankColors[artist.rank] : "var(--border)"}`,
                      borderRadius: "var(--radius-md)",
                      padding: "16px 12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textAlign: "center"
                    }}
                  >
                    <div style={{
                      width: "60px",
                      height: "60px",
                      margin: "0 auto 10px",
                      borderRadius: "var(--radius)",
                      background: `${rankColors[artist.rank]}22`,
                      border: `2px solid ${rankColors[artist.rank]}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: rankColors[artist.rank],
                      overflow: "hidden"
                                            }}>
                      <img 
                        src={`/assets/images/artists/${artist.id}.png`}
                        alt={artist.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div style={{ 
                      fontWeight: 600, 
                      fontSize: "0.85rem", 
                      color: selectedArtist?.id === artist.id ? rankColors[artist.rank] : "var(--text-primary)",
                      marginBottom: "4px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {artist.name}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      {artist.rank} • {artist.position}
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
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
