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
  image?: string;
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

const genreColors: Record<string, string> = {
  Pop: "#ff69b4",
  "Hip Hop": "#ff8c00",
  "R&B": "#9b59b6",
  Rock: "#e74c3c",
  Electronic: "#00ced1",
};

export default function DatabasePage() {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterGenre, setFilterGenre] = useState("");

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
      return matchesSearch && matchesRank && matchesPosition && matchesGenre;
    });
  }, [searchQuery, filterRank, filterPosition, filterGenre]);

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

        <div className="grid" style={{ gridTemplateColumns: "420px 1fr", gap: "32px", marginTop: "32px" }}>
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
                  marginBottom: "20px",
                  position: "relative"
                }}>
                  <div style={{
                    width: "200px",
                    height: "280px",
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
                        background: `linear-gradient(135deg, ${rankColors[selectedArtist.rank]}33, var(--bg-subtle))`
                      }}>
                        <span style={{ fontSize: "5rem", fontWeight: 800, color: rankColors[selectedArtist.rank] }}>{selectedArtist.name.charAt(0)}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "8px" }}>{selectedArtist.name}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Rank & Position badges */}
                  <div className="flex gap-4" style={{ justifyContent: "center", marginTop: "16px" }}>
                    <span style={{ 
                      padding: "8px 16px", 
                      borderRadius: "var(--radius-full)", 
                      fontSize: "0.8rem", 
                      fontWeight: 700,
                      background: rankColors[selectedArtist.rank],
                      color: "#000",
                      boxShadow: `0 0 15px ${rankColors[selectedArtist.rank]}66`
                    }}>
                      {selectedArtist.rank}
                    </span>
                    <span style={{ 
                      padding: "8px 16px", 
                      borderRadius: "var(--radius-full)", 
                      fontSize: "0.8rem",
                      background: genreColors[selectedArtist.genre] || "var(--bg-elevated)",
                      color: "#fff"
                    }}>
                      {selectedArtist.genre}
                    </span>
                  </div>
                </div>

                {/* Artist Info */}
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "4px", color: rankColors[selectedArtist.rank] }}>
                    {selectedArtist.name}
                  </h2>
                  <p className="text-muted" style={{ fontSize: "1rem", marginBottom: "16px" }}>
                    {selectedArtist.group}
                  </p>
                  <div className="flex gap-4 justify-between" style={{ justifyContent: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    <span>🎯 {selectedArtist.position}</span>
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
                        padding: "12px 16px",
                        background: "var(--bg-subtle)",
                        borderRadius: "var(--radius)",
                        fontSize: "0.9rem",
                        borderLeft: `3px solid ${rankColors[selectedArtist.rank]}`
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
                  <option value="">Tous</option>
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
                  <option value="">Tous genres</option>
                  <option value="Pop">Pop</option>
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="R&B">R&B</option>
                  <option value="Rock">Rock</option>
                  <option value="Electronic">Electronic</option>
                </select>
              </div>
            </div>

            {/* Grid - Full Portraits */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", 
              gap: "8px" 
            }}>
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
                    {/* Rank badge overlay */}
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
