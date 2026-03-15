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

export default function MobileArtistsPage() {
  const params = useParams();
  const router = useRouter();
  const lang = (params?.lang as string) || "fr";
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [team1, setTeam1] = useState<Artist[]>([]);
  const [team2, setTeam2] = useState<Artist[]>([]);
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [mounted, setMounted] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const t = filterTranslations[lang] || filterTranslations.fr;

  useEffect(() => {
    setMounted(true);
    // Charger les équipes depuis localStorage
    if (typeof window !== 'undefined') {
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
          
          // Mobile search bar visibility
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
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
  }, []);

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
    team1.forEach(artist => {
      [...(artist.skillCategories?.dps || []), ...(artist.skillCategories?.offensive || [])].forEach(skill => {
        const match = skill.match(/(\d+)\s*Damage/);
        if (match && !skill.toLowerCase().includes('%')) skillDamageRaw += parseInt(match[1]);
        const pctMatch = skill.match(/(\d+)%/);
        if (pctMatch) {
          const val = parseInt(pctMatch[1]);
          if (skill.toLowerCase().includes('skill damage') && !skill.toLowerCase().includes('reduction')) skillDamage += val;
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
    return { skillDamage, skillDamageRaw, basicAttackPercent, attackResist, skillResist, fanCapacity, rallyCapacity };
  }, [team1]);

  const team2Stats = useMemo(() => {
    let skillDamage = 0, skillDamageRaw = 0, basicAttackPercent = 0, attackResist = 0, skillResist = 0, fanCapacity = 0, rallyCapacity = 0;
    team2.forEach(artist => {
      [...(artist.skillCategories?.dps || []), ...(artist.skillCategories?.offensive || [])].forEach(skill => {
        const match = skill.match(/(\d+)\s*Damage/);
        if (match && !skill.toLowerCase().includes('%')) skillDamageRaw += parseInt(match[1]);
        const pctMatch = skill.match(/(\d+)%/);
        if (pctMatch) {
          const val = parseInt(pctMatch[1]);
          if (skill.toLowerCase().includes('skill damage') && !skill.toLowerCase().includes('reduction')) skillDamage += val;
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
    return { skillDamage, skillDamageRaw, basicAttackPercent, attackResist, skillResist, fanCapacity, rallyCapacity };
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

      {/* Hide the main header on mobile */}
      <style jsx global>{`
        .header {
          display: none !important;
        }
        body {
          background-image: none !important;
        }
      `}</style>

      <div className="mobile-page-container">
        {/* TOP PANEL - Always fixed at top */}
        <div className="mobile-top-panel" ref={panelRef}>
          {/* Column 1: Artist Preview */}
          <div className="mobile-panel-col mobile-panel-1">
            <div className="mobile-preview-card">
              <div className="mobile-preview-title">{t.artistOverview}</div>
              {selectedArtist ? (
                <div className="mobile-preview-content">
                  <div className="mobile-preview-image">
                    {selectedArtist.image ? (
                      <img src={`/assets/images/artists/${selectedArtist.image}`} alt={selectedArtist.name} />
                    ) : (
                      <span style={{ fontSize: "2rem", fontWeight: 800, color: rankColors[selectedArtist.rank] }}>{selectedArtist.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="mobile-preview-nav">
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

          {/* Column 2: Team 1 */}
          <div className="mobile-panel-col mobile-panel-2">
            <div className="mobile-team-card mobile-team-1">
              <div className="mobile-team-header">
                <span>Équipe 1</span>
              </div>
              <div className="mobile-team-slots">
                {[0,1,2,3,4].map(i => (
                  <div key={i} onClick={() => team1[i] && setSelectedArtist(team1[i])} className="mobile-team-slot">
                    {team1[i] ? (
                      team1[i].image ? <img src={`/assets/images/artists/${team1[i].image}`} alt={team1[i].name} /> : <span style={{ color: rankColors[team1[i].rank], fontWeight: 800 }}>{team1[i].name.charAt(0)}</span>
                    ) : <span>+</span>}
                  </div>
                ))}
              </div>
              <div className="mobile-team-stats">
                <div style={{ color: "#ff8c42", fontSize: "0.65rem" }}>💥 {team1Stats.skillDamageRaw}</div>
                <div style={{ color: "#ff6b6b", fontSize: "0.65rem" }}>⚔️ {team1Stats.skillDamage}%</div>
                <div style={{ color: "#4ecdc4", fontSize: "0.65rem" }}>👊 {team1Stats.basicAttackPercent}%</div>
                <div style={{ color: "#95e1d3", fontSize: "0.65rem" }}>🛡️ {team1Stats.attackResist}%</div>
                <button onClick={() => setTeam1([])} className="mobile-clear-btn">🗑️</button>
              </div>
            </div>
          </div>

          {/* Column 3: Team 2 */}
          <div className="mobile-panel-col mobile-panel-3">
            <div className="mobile-team-card mobile-team-2">
              <div className="mobile-team-header">
                <span>Équipe 2</span>
              </div>
              <div className="mobile-team-slots">
                {[0,1,2,3,4].map(i => (
                  <div key={i} onClick={() => team2[i] && setSelectedArtist(team2[i])} className="mobile-team-slot">
                    {team2[i] ? (
                      team2[i].image ? <img src={`/assets/images/artists/${team2[i].image}`} alt={team2[i].name} /> : <span style={{ color: rankColors[team2[i].rank], fontWeight: 800 }}>{team2[i].name.charAt(0)}</span>
                    ) : <span>+</span>}
                  </div>
                ))}
              </div>
              <div className="mobile-team-stats">
                <div style={{ color: "#ff8c42", fontSize: "0.65rem" }}>💥 {team2Stats.skillDamageRaw}</div>
                <div style={{ color: "#ff6b6b", fontSize: "0.65rem" }}>⚔️ {team2Stats.skillDamage}%</div>
                <div style={{ color: "#4ecdc4", fontSize: "0.65rem" }}>👊 {team2Stats.basicAttackPercent}%</div>
                <div style={{ color: "#95e1d3", fontSize: "0.65rem" }}>🛡️ {team2Stats.attackResist}%</div>
                <button onClick={() => setTeam2([])} className="mobile-clear-btn">🗑️</button>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH BAR - Fixed below panel */}
        <div className={`mobile-search-bar ${!searchBarVisible ? 'hidden' : ''}`}>
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
        </div>

        {/* ARTISTS GRID - Scrollable */}
        <div className="mobile-artists-bottom">
          <div className="mobile-artists-count">{filteredArtists.length} artistes</div>
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
          background: #0f0f1a;
        }
        
        /* Top Panel - Always fixed */
        .mobile-top-panel {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 40vh;
          min-height: 280px;
          display: flex;
          flex-direction: row;
          gap: 4px;
          padding: 4px;
          background: #0f0f1a;
          z-index: 100;
        }
        
        .mobile-panel-col {
          height: 100%;
          overflow: hidden;
        }
        .mobile-panel-1 { width: 28%; }
        .mobile-panel-2 { width: 40%; }
        .mobile-panel-3 { width: 32%; }
        
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
          font-size: 0.6rem;
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
          gap: 4px;
        }
        .mobile-preview-image {
          width: 45px;
          height: 60px;
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
        .mobile-preview-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          width: 100%;
        }
        .mobile-preview-nav button {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          color: #fff;
          cursor: pointer;
          font-size: 0.5rem;
        }
        .mobile-preview-nav button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .mobile-preview-nav span {
          flex: 1;
          text-align: center;
          font-weight: 700;
          font-size: 0.7rem;
        }
        .mobile-preview-actions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .mobile-profile-btn {
          padding: 4px 8px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
          border-radius: 4px;
          font-size: 0.5rem;
          border: none;
          cursor: pointer;
        }
        .mobile-add-buttons {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mobile-add-team {
          padding: 3px 6px;
          border-radius: 3px;
          border: none;
          color: white;
          font-size: 0.45rem;
          font-weight: 600;
          cursor: pointer;
        }
        .mobile-team1 {
          background: #8b5cf6;
        }
        .mobile-team2 {
          background: #06b6d4;
        }
        .mobile-preview-empty {
          padding: 10px;
          text-align: center;
          color: rgba(255,255,255,0.4);
          font-size: 0.6rem;
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
        
        .mobile-team-stats {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mobile-clear-btn {
          width: 100%;
          margin-top: auto;
          padding: 2px;
          font-size: 0.5rem;
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
        }
        
        /* Search Bar */
        .mobile-search-bar {
          position: fixed;
          top: 40vh;
          left: 0;
          right: 0;
          display: flex;
          gap: 4px;
          padding: 6px 8px;
          background: #0f0f1a;
          z-index: 99;
          transition: transform 0.3s ease;
        }
        .mobile-search-bar.hidden {
          transform: translateY(-100%);
        }
        .mobile-search-bar input {
          flex: 1;
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
        }
        
        /* Artists Bottom */
        .mobile-artists-bottom {
          padding: 44vh 6px 100px 6px;
          min-height: 100vh;
        }
        .mobile-artists-count {
          font-size: 0.75rem;
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
