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
  UR: "#fbbf24",
  "UR Bali": "#fbbf24",
  SSR: "#a855f7",
  "SSR VIP": "#a855f7",
  "SSR AH": "#a855f7",
  SR: "#3b82f6",
  R: "#22c55e",
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    setCurrentImageIndex(0);
  };

  const nextArtist = () => {
    if (!selectedArtist) return;
    const idx = filteredArtists.findIndex((a) => a.id === selectedArtist.id);
    if (idx < filteredArtists.length - 1) {
      setSelectedArtist(filteredArtists[idx + 1]);
      setCurrentImageIndex(0);
    }
  };

  const prevArtist = () => {
    if (!selectedArtist) return;
    const idx = filteredArtists.findIndex((a) => a.id === selectedArtist.id);
    if (idx > 0) {
      setSelectedArtist(filteredArtists[idx - 1]);
      setCurrentImageIndex(0);
    }
  };

  return (
    <>
      <Head>
        <title>Base de Données - TopGirl ApexGirl | 112+ Artistes</title>
        <meta name="description" content="Parcourez la base de données complète de TopGirl avec 112+ artistes. Stats, compétences, ranks et plus." />
        <meta name="keywords" content="TopGirl database, TopGirl artists, TopGirl characters, TopGirl stats, TopGirl SSR, TopGirl UR" />
        <meta property="og:title" content="Base de Données - TopGirl ApexGirl" />
        <meta property="og:description" content="Parcourez la base de données complète de TopGirl avec 112+ artistes." />
      </Head>

      <div className="database-container">
        <div className="database-header">
          <h1>Character & Skills</h1>
          <p>Cliquez sur un artiste pour voir ses informations détaillées</p>
        </div>

        <AdBanner />

        <div className="database-content">
          <div className="character-panel">
            <div className="panel-header">
              <span>Artist Overview</span>
            </div>

            {selectedArtist ? (
              <>
                <div className="character-preview">
                  <button className="nav-btn" onClick={prevArtist}>◀</button>
                  <div className="character-image-container">
                    <div
                      className="character-portrait"
                      style={{
                        borderColor: rankColors[selectedArtist.rank],
                        background: `linear-gradient(135deg, ${rankColors[selectedArtist.rank]}22, transparent)`,
                      }}
                    >
                      <span className="character-avatar" style={{ color: rankColors[selectedArtist.rank] }}>
                        {selectedArtist.name.charAt(0)}
                      </span>
                    </div>
                    <div className="character-badges">
                      <span className="rank-badge" style={{ backgroundColor: rankColors[selectedArtist.rank] }}>
                        {selectedArtist.rank}
                      </span>
                      <span className="position-badge">{selectedArtist.position}</span>
                    </div>
                  </div>
                  <button className="nav-btn" onClick={nextArtist}>▶</button>
                </div>

                <div className="character-info">
                  <h2 style={{ color: rankColors[selectedArtist.rank] }}>{selectedArtist.name}</h2>
                  <p className="group-name">{selectedArtist.group}</p>
                  <div className="stats-row">
                    <span>🎵 {selectedArtist.genre}</span>
                    <span>⭐ Build: {selectedArtist.build}</span>
                  </div>
                </div>

                <div className="skills-section">
                  <h3>Character Skills</h3>
                  {selectedArtist.skills.length > 0 ? (
                    <div className="skills-list">
                      {selectedArtist.skills.map((skill, idx) => (
                        <div key={idx} className="skill-item">{skill}</div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-skills">Skills not available</p>
                  )}
                </div>
              </>
            ) : (
              <div className="select-prompt">
                <span>Sélectionnez un artiste</span>
              </div>
            )}
          </div>

          <div className="character-list-panel">
            <div className="filters-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Rechercher un artiste..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-buttons">
                <select value={filterRank} onChange={(e) => setFilterRank(e.target.value)}>
                  <option value="">All Ranks</option>
                  <option value="UR">UR</option>
                  <option value="UR Bali">UR Bali</option>
                  <option value="SSR">SSR</option>
                  <option value="SSR VIP">SSR VIP</option>
                  <option value="SSR AH">SSR AH</option>
                  <option value="SR">SR</option>
                  <option value="R">R</option>
                </select>
                <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}>
                  <option value="">All Positions</option>
                  <option value="Center">Center</option>
                  <option value="Dancer">Dancer</option>
                  <option value="Vocalist">Vocalist</option>
                </select>
                <select value={filterGroup} onChange={(e) => setFilterGroup(e.target.value)}>
                  <option value="">All Groups</option>
                  {groups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="characters-grid">
              {filteredArtists
                .sort((a, b) => rankOrder[a.rank] - rankOrder[b.rank])
                .map((artist) => (
                  <button
                    key={artist.id}
                    className={`character-card ${selectedArtist?.id === artist.id ? "selected" : ""}`}
                    onClick={() => selectArtist(artist)}
                    style={{
                      borderColor: selectedArtist?.id === artist.id ? rankColors[artist.rank] : "var(--border)",
                    }}
                  >
                    <div className="card-avatar" style={{ color: rankColors[artist.rank] }}>
                      {artist.name.charAt(0)}
                    </div>
                    <div className="card-info">
                      <span className="card-name" style={{ color: rankColors[artist.rank] }}>{artist.name}</span>
                      <span className="card-meta">{artist.rank} • {artist.position}</span>
                    </div>
                  </button>
                ))}
            </div>

            {filteredArtists.length === 0 && (
              <div className="no-results"><p>Aucun artiste trouvé</p></div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .database-container { max-width: 1400px; margin: 0 auto; padding: var(--space-4); }
        .database-header { text-align: center; margin-bottom: var(--space-8); }
        .database-header h1 { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: var(--space-2); }
        .database-header p { color: var(--text-muted); }
        .database-content { display: grid; grid-template-columns: 400px 1fr; gap: var(--space-6); }
        @media (max-width: 1024px) { .database-content { grid-template-columns: 1fr; } }
        .character-panel { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; position: sticky; top: calc(var(--header-height) + var(--space-4)); height: fit-content; }
        .panel-header { background: var(--bg-subtle); padding: var(--space-4); border-bottom: 1px solid var(--border); font-weight: 600; }
        .character-preview { display: flex; align-items: center; justify-content: space-between; padding: var(--space-6); background: linear-gradient(180deg, var(--bg-subtle), var(--bg-card)); }
        .nav-btn { background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-muted); width: 40px; height: 40px; border-radius: var(--radius); cursor: pointer; transition: all 0.2s; }
        .nav-btn:hover { background: var(--primary); color: white; border-color: var(--primary); }
        .character-image-container { text-align: center; }
        .character-portrait { width: 160px; height: 200px; border-radius: var(--radius-lg); border: 3px solid; display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-3); }
        .character-avatar { font-size: 4rem; font-weight: 800; }
        .character-badges { display: flex; gap: var(--space-2); justify-content: center; }
        .rank-badge { padding: 4px 12px; border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: 700; color: #000; }
        .position-badge { padding: 4px 12px; background: var(--bg-elevated); border-radius: var(--radius-full); font-size: var(--text-xs); color: var(--text-muted); }
        .character-info { text-align: center; padding: var(--space-4); border-bottom: 1px solid var(--border); }
        .character-info h2 { font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--space-1); }
        .group-name { color: var(--text-muted); font-size: var(--text-sm); margin-bottom: var(--space-2); }
        .stats-row { display: flex; gap: var(--space-4); justify-content: center; font-size: var(--text-sm); color: var(--text-muted); }
        .skills-section { padding: var(--space-4); }
        .skills-section h3 { font-size: var(--text-lg); margin-bottom: var(--space-3); }
        .skills-list { display: flex; flex-direction: column; gap: var(--space-2); }
        .skill-item { background: var(--bg-subtle); padding: var(--space-3); border-radius: var(--radius); font-size: var(--text-sm); border-left: 3px solid var(--primary); }
        .no-skills { color: var(--text-muted); font-style: italic; }
        .select-prompt { display: flex; align-items: center; justify-content: center; height: 300px; color: var(--text-muted); }
        .character-list-panel { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--space-4); }
        .filters-container { margin-bottom: var(--space-4); }
        .search-box input { width: 100%; padding: var(--space-3) var(--space-4); background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-size: var(--text-base); margin-bottom: var(--space-3); }
        .search-box input:focus { outline: none; border-color: var(--primary); }
        .filter-buttons { display: flex; gap: var(--space-2); flex-wrap: wrap; }
        .filter-buttons select { flex: 1; min-width: 120px; padding: var(--space-2) var(--space-3); background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-size: var(--text-sm); cursor: pointer; }
        .characters-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: var(--space-3); max-height: 600px; overflow-y: auto; padding-right: var(--space-2); }
        .character-card { background: var(--bg-subtle); border: 2px solid var(--border); border-radius: var(--radius); padding: var(--space-3); cursor: pointer; transition: all 0.2s; text-align: center; }
        .character-card:hover { border-color: var(--primary); transform: translateY(-2px); }
        .card-avatar { width: 50px; height: 50px; border-radius: 50%; background: var(--bg-elevated); display: flex; align-items: center; justify-content: center; font-size: var(--text-xl); font-weight: 700; margin: 0 auto var(--space-2); }
        .card-name { font-weight: 600; font-size: var(--text-sm); display: block; margin-bottom: 2px; }
        .card-meta { font-size: var(--text-xs); color: var(--text-muted); }
        .no-results { text-align: center; padding: var(--space-8); color: var(--text-muted); }
      `}</style>
    </>
  );
}
