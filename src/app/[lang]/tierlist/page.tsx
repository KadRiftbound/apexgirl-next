"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
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
  calculatedTier: string;
  build: string;
  rating: string;
};

const rankColors: Record<string, string> = {
  UR: "#ffd700",
  SSR: "#c084fc",
  SR: "#60a5fa",
  R: "#4ade80",
  N: "#94a3b8",
};

const tierColors: Record<string, { bg: string; border: string; text: string }> = {
  "S+": { bg: "rgba(255, 215, 0, 0.25)", border: "#ffd700", text: "#ffd700" },
  S: { bg: "rgba(255, 215, 0, 0.15)", border: "#ffd700", text: "#ffd700" },
  A: { bg: "rgba(34, 197, 94, 0.15)", border: "#22c55e", text: "#22c55e" },
  B: { bg: "rgba(59, 130, 246, 0.15)", border: "#3b82f6", text: "#3b82f6" },
  C: { bg: "rgba(245, 158, 11, 0.15)", border: "#f59e0b", text: "#f59e0b" },
  F: { bg: "rgba(148, 163, 184, 0.15)", border: "#94a3b8", text: "#94a3b8" },
};

const tierOrder: Record<string, number> = {
  "S+": 0,
  S: 1,
  A: 2,
  B: 3,
  C: 4,
  F: 5,
};

const getTierOrder = (tier: string): number => {
  return tierOrder[tier] ?? 3;
};

export default function TierListPage() {
  const [activeTab, setActiveTab] = useState<"classic" | "vote">("classic");
  const [voteData, setVoteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [votedToday, setVotedToday] = useState(false);
  const [voteMessage, setVoteMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [votingArtist, setVotingArtist] = useState<number | null>(null);

  useEffect(() => {
    fetchVoteData();
  }, []);

  const fetchVoteData = async () => {
    try {
      const res = await fetch("/api/vote");
      const data = await res.json();
      setVoteData(data);
    } catch (e) {
      console.error("Failed to load vote data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (artistId: number) => {
    setVotingArtist(artistId);
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artist_id: artistId }),
      });
      const data = await res.json();
      
      if (data.success) {
        setVoteMessage({ type: "success", text: data.message });
        setVotedToday(true);
        fetchVoteData();
      } else {
        setVoteMessage({ type: "error", text: data.message });
        if (data.message.includes("déjà")) {
          setVotedToday(true);
        }
      }
      
      setTimeout(() => setVoteMessage(null), 3000);
    } catch (e) {
      setVoteMessage({ type: "error", text: "Erreur lors du vote" });
    } finally {
      setVotingArtist(null);
    }
  };

  const artists = artistsData as Artist[];
  const tierOrder = ["S+", "S", "A", "B", "C", "F"];

  return (
    <>
      <Head>
        <title>Tier List - TopGirl ApexGirl</title>
        <meta name="description" content="Découvrez la tier list des meilleurs artistes TopGirl et votez pour votre favori !" />
      </Head>

      <div className="container" style={{ paddingTop: "40px" }}>
        <div className="text-center" style={{ marginBottom: "40px" }}>
          <h1 className="section-title">🏆 Tier List</h1>
          <p className="section-subtitle">Classement des artistes et votes communautaires</p>
        </div>

        <AdBanner />

        {/* Tabs */}
        <div style={{ 
          display: "flex", 
          gap: "8px", 
          justifyContent: "center", 
          marginTop: "32px",
          marginBottom: "32px"
        }}>
          <button
            onClick={() => setActiveTab("classic")}
            style={{
              padding: "14px 32px",
              borderRadius: "var(--radius-full)",
              border: activeTab === "classic" 
                ? "2px solid var(--primary)" 
                : "2px solid var(--border)",
              background: activeTab === "classic" 
                ? "linear-gradient(135deg, var(--primary), #ff80ab)" 
                : "var(--bg-card)",
              color: activeTab === "classic" ? "#fff" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 600,
              transition: "all 0.2s ease",
              boxShadow: activeTab === "classic" 
                ? "0 4px 20px rgba(255, 77, 141, 0.4)" 
                : "none"
            }}
          >
            📊 Tier List Classique
          </button>
          <button
            onClick={() => setActiveTab("vote")}
            style={{
              padding: "14px 32px",
              borderRadius: "var(--radius-full)",
              border: activeTab === "vote" 
                ? "2px solid var(--secondary)" 
                : "2px solid var(--border)",
              background: activeTab === "vote" 
                ? "linear-gradient(135deg, var(--secondary), #a78bfa)" 
                : "var(--bg-card)",
              color: activeTab === "vote" ? "#fff" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 600,
              transition: "all 0.2s ease",
              boxShadow: activeTab === "vote" 
                ? "0 4px 20px rgba(139, 92, 246, 0.4)" 
                : "none"
            }}
          >
            ❤️ Votez pour votre favori
          </button>
        </div>

        {voteMessage && (
          <div style={{
            padding: "16px 24px",
            borderRadius: "var(--radius-md)",
            background: voteMessage.type === "success" 
              ? "rgba(34, 197, 94, 0.15)" 
              : "rgba(239, 68, 68, 0.15)",
            border: `1px solid ${voteMessage.type === "success" ? "#22c55e" : "#ef4444"}`,
            color: voteMessage.type === "success" ? "#22c55e" : "#ef4444",
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: 500
          }}>
            {voteMessage.text}
          </div>
        )}

        {/* Classic Tier List Tab */}
        {activeTab === "classic" && (
          <div>
            <div style={{ 
              display: "flex", 
              gap: "12px", 
              marginBottom: "24px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}>
              {tierOrder.map(tier => (
                <div
                  key={tier}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "var(--radius)",
                    background: tierColors[tier]?.bg,
                    border: `1px solid ${tierColors[tier]?.border}`,
                    color: tierColors[tier]?.text,
                    fontWeight: 600,
                    fontSize: "0.85rem"
                  }}
                >
                  Tier {tier}
                </div>
              ))}
            </div>

            {tierOrder.map(tier => {
              const tierArtists = artists.filter(a => 
                (a.rating || "F").toUpperCase() === tier
                && (a.rank === "UR" || a.rank === "SSR")
              );
              
              if (tierArtists.length === 0) return null;
              
              return (
                <div 
                  key={tier}
                  style={{
                    marginBottom: "24px",
                    borderRadius: "var(--radius-lg)",
                    background: tierColors[tier]?.bg,
                    border: `2px solid ${tierColors[tier]?.border}`,
                    overflow: "hidden"
                  }}
                >
                  <div style={{
                    padding: "12px 20px",
                    background: `${tierColors[tier]?.border}22`,
                    borderBottom: `1px solid ${tierColors[tier]?.border}44`,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}>
                    <span style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: tierColors[tier]?.text,
                      width: "40px"
                    }}>
                      {tier}
                    </span>
                    <span style={{ 
                      color: "var(--text-muted)", 
                      fontSize: "0.85rem" 
                    }}>
                      {tierArtists.length} artiste{tierArtists.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    padding: "16px"
                  }}>
                    {tierArtists
                      .sort((a, b) => getTierOrder(a.rating) - getTierOrder(b.rating))
                      .map(artist => (
                        <div
                          key={artist.id}
                          style={{
                            width: "90px",
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "transform 0.2s"
                          }}
                        >
                          <div style={{
                            width: "112px",
                            height: "140px",
                            margin: "0 auto 6px",
                            borderRadius: "var(--radius-md)",
                            border: `2px solid ${rankColors[artist.rank]}`,
                            background: "var(--bg-card)",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative"
                          }}>
                            {artist.image ? (
                              <img 
                                src={`/assets/images/artists/${artist.image}`}
                                alt={artist.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            ) : (
                              <span style={{ 
                                fontSize: "2rem", 
                                fontWeight: 800, 
                                color: rankColors[artist.rank] 
                              }}>
                                {artist.name.charAt(0)}
                              </span>
                            )}
                            <div style={{
                              position: "absolute",
                              top: "4px",
                              right: "4px",
                              background: "rgba(0,0,0,0.7)",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              color: tierColors[artist.rating]?.text
                            }}>
                              {artist.rating}
                            </div>
                          </div>
                          <div style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}>
                            {artist.name}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Voting Tab */}
        {activeTab === "vote" && (
          <div>
            {/* Weekly Top Artist */}
            {voteData?.weekly_top && (
              <div style={{
                padding: "32px",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.05))",
                border: "2px solid rgba(255, 215, 0, 0.5)",
                marginBottom: "32px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "100px",
                  height: "100px",
                  background: "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)",
                  borderRadius: "50%"
                }} />
                <div style={{ fontSize: "3rem", marginBottom: "8px", position: "relative" }}>👑</div>
                <div style={{ 
                  fontSize: "0.85rem", 
                  color: "#ffd700", 
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "8px",
                  fontWeight: 600,
                  position: "relative"
                }}>
                  Artiste de la semaine
                </div>
                <div style={{ 
                  fontSize: "2rem", 
                  fontWeight: 800, 
                  color: "#fff",
                  marginBottom: "8px",
                  position: "relative"
                }}>
                  {voteData.weekly_top.artist_name}
                </div>
                <div style={{ 
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 20px",
                  background: "rgba(255, 215, 0, 0.2)",
                  borderRadius: "var(--radius-full)",
                  position: "relative"
                }}>
                  <span style={{ fontSize: "1.25rem" }}>⭐</span>
                  <span style={{ fontWeight: 700, color: "#ffd700" }}>
                    {voteData.weekly_top.count} votes
                  </span>
                </div>
              </div>
            )}

            {/* Vote Status Banner */}
            {votedToday ? (
              <div style={{
                padding: "20px",
                borderRadius: "var(--radius-md)",
                background: "rgba(139, 92, 246, 0.15)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                textAlign: "center",
                marginBottom: "24px",
                color: "var(--text-muted)"
              }}>
                ✅ Vous avez déjà voted aujourd'hui ! Revenez demain pour voter à nouveau.
              </div>
            ) : (
              <div style={{
                padding: "20px",
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, rgba(255, 77, 141, 0.15), rgba(255, 77, 141, 0.05))",
                border: "1px solid rgba(255, 77, 141, 0.3)",
                textAlign: "center",
                marginBottom: "24px",
                color: "var(--text-primary)"
              }}>
                🎉 Votez pour votre artiste préféré ! Un vote par jour par IP.
              </div>
            )}

            {/* Top 3 Leaderboard */}
            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ 
                fontSize: "1.25rem", 
                fontWeight: 700, 
                marginBottom: "20px",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                🏅 Podium - Cette semaine
              </h3>
              
              {/* Top 3 with Images */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: "16px",
                marginBottom: "24px"
              }}>
                {/* 2nd Place */}
                {voteData?.rankings?.this_week?.[1] && (
                  <div style={{
                    textAlign: "center",
                    transform: "translateY(20px)"
                  }}>
                    <div style={{
                      width: "90px",
                      height: "90px",
                      margin: "0 auto 8px",
                      borderRadius: "50%",
                      border: "3px solid #c0c0c0",
                      background: "var(--bg-card)",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 20px rgba(192,192,192,0.3)"
                    }}>
                      {(() => {
                        const artist = artists.find(a => a.name === voteData?.rankings?.this_week?.[1]?.artist_name);
                        return artist?.image ? (
                          <img 
                            src={`/assets/images/artists/${artist.image}`}
                            alt={voteData?.rankings?.this_week?.[1]?.artist_name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <span style={{ fontSize: "2rem", color: "#c0c0c0" }}>2</span>
                        );
                      })()}
                    </div>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      margin: "0 auto",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #c0c0c0, #a0a0a0)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1.25rem",
                      color: "#000"
                    }}>2</div>
                    <div style={{ fontWeight: 700, color: "#fff", marginTop: "8px", fontSize: "0.9rem" }}>
                      {voteData?.rankings?.this_week?.[1]?.artist_name}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#c0c0c0" }}>
                      {voteData?.rankings?.this_week?.[1]?.week_count} ⭐
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {voteData?.rankings?.this_week?.[0] && (
                  <div style={{
                    textAlign: "center",
                    transform: "scale(1.1)"
                  }}>
                    <div style={{
                      width: "120px",
                      height: "120px",
                      margin: "0 auto 8px",
                      borderRadius: "50%",
                      border: "4px solid #ffd700",
                      background: "var(--bg-card)",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 30px rgba(255,215,0,0.5)"
                    }}>
                      {(() => {
                        const artist = artists.find(a => a.name === voteData?.rankings?.this_week?.[0]?.artist_name);
                        return artist?.image ? (
                          <img 
                            src={`/assets/images/artists/${artist.image}`}
                            alt={voteData?.rankings?.this_week?.[0]?.artist_name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <span style={{ fontSize: "2.5rem", color: "#ffd700" }}>1</span>
                        );
                      })()}
                    </div>
                    <div style={{
                      width: "50px",
                      height: "50px",
                      margin: "0 auto",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ffd700, #ffaa00)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1.5rem",
                      color: "#000",
                      boxShadow: "0 4px 15px rgba(255,215,0,0.5)"
                    }}>👑</div>
                    <div style={{ fontWeight: 700, color: "#ffd700", marginTop: "8px", fontSize: "1rem" }}>
                      {voteData?.rankings?.this_week?.[0]?.artist_name}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#ffd700" }}>
                      {voteData?.rankings?.this_week?.[0]?.week_count} ⭐
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {voteData?.rankings?.this_week?.[2] && (
                  <div style={{
                    textAlign: "center",
                    transform: "translateY(40px)"
                  }}>
                    <div style={{
                      width: "112px",
                      height: "112px",
                      margin: "0 auto 8px",
                      borderRadius: "50%",
                      border: "3px solid #cd7f32",
                      background: "var(--bg-card)",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 20px rgba(205,127,50,0.3)"
                    }}>
                      {(() => {
                        const artist = artists.find(a => a.name === voteData?.rankings?.this_week?.[2]?.artist_name);
                        return artist?.image ? (
                          <img 
                            src={`/assets/images/artists/${artist.image}`}
                            alt={voteData?.rankings?.this_week?.[2]?.artist_name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <span style={{ fontSize: "1.75rem", color: "#cd7f32" }}>3</span>
                        );
                      })()}
                    </div>
                    <div style={{
                      width: "36px",
                      height: "36px",
                      margin: "0 auto",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #cd7f32, #a05a20)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: "#fff"
                    }}>3</div>
                    <div style={{ fontWeight: 700, color: "#fff", marginTop: "8px", fontSize: "0.85rem" }}>
                      {voteData?.rankings?.this_week?.[2]?.artist_name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#cd7f32" }}>
                      {voteData?.rankings?.this_week?.[2]?.week_count} ⭐
                    </div>
                  </div>
                )}
              </div>

              {/* Rankings List */}
              <h4 style={{ 
                fontSize: "1rem", 
                fontWeight: 600, 
                marginBottom: "16px",
                color: "var(--text-primary)"
              }}>
                📊 Classement complet
              </h4>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "12px"
              }}>
                {voteData?.rankings?.this_week?.slice(0, 15).map((artist: any, index: number) => (
                  <div
                    key={artist.artist_id}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "var(--radius-md)",
                      background: index < 3 ? "rgba(255, 215, 0, 0.08)" : "var(--bg-card)",
                      border: index < 3 ? "1px solid rgba(255, 215, 0, 0.2)" : "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}
                  >
                    <div style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: index === 0 ? "#ffd700" : index === 1 ? "#c0c0c0" : index === 2 ? "#cd7f32" : "var(--bg-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: index < 3 ? "0.9rem" : "0.75rem",
                      color: index < 3 ? "#000" : "var(--text-muted)"
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.9rem" }}>
                        {artist.artist_name}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: rankColors[artist.rank] }}>
                        {artist.rank}
                      </div>
                    </div>
                    <div style={{ 
                      fontWeight: 700, 
                      color: index < 3 ? "#ffd700" : "var(--text-muted)",
                      fontSize: "1rem"
                    }}>
                      {artist.week_count} ⭐
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Artists for Voting */}
            <div>
              <h3 style={{ 
                fontSize: "1.1rem", 
                fontWeight: 700, 
                marginBottom: "16px",
                color: "var(--text-primary)"
              }}>
                🎤 Votez pour un artiste
              </h3>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: "12px"
              }}>
                {artists
                  .sort((a, b) => {
                    const rankOrder: Record<string, number> = { UR: 1, SSR: 2, SR: 3, R: 4, N: 5 };
                    return (rankOrder[a.rank] || 99) - (rankOrder[b.rank] || 99);
                  })
                  .map(artist => {
                    const artistVotes = voteData?.rankings?.all_time?.find((v: any) => v.artist_id === artist.id);
                    const isVoting = votingArtist === artist.id;
                    const isDisabled = votedToday || isVoting;
                    
                    return (
                      <div
                        key={artist.id}
                        style={{
                          textAlign: "center",
                          padding: "12px 8px",
                          borderRadius: "var(--radius-md)",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          transition: "all 0.2s"
                        }}
                      >
                        <div style={{
                          width: "70px",
                          height: "85px",
                          margin: "0 auto 8px",
                          borderRadius: "var(--radius-sm)",
                          border: `2px solid ${rankColors[artist.rank]}`,
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {artist.image ? (
                            <img 
                              src={`/assets/images/artists/${artist.image}`}
                              alt={artist.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            <span style={{ 
                              fontSize: "1.75rem", 
                              fontWeight: 800, 
                              color: rankColors[artist.rank] 
                            }}>
                              {artist.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div style={{
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginBottom: "4px"
                        }}>
                          {artist.name}
                        </div>
                        <button
                          onClick={() => !isDisabled && handleVote(artist.id)}
                          disabled={isDisabled}
                          style={{
                            width: "100%",
                            padding: "6px 10px",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            borderRadius: "var(--radius-sm)",
                            border: "none",
                            background: isVoting 
                              ? "linear-gradient(135deg, #a78bfa, #8b5cf6)" 
                              : isDisabled 
                                ? "rgba(148, 163, 184, 0.3)" 
                                : "linear-gradient(135deg, var(--primary), #ff80ab)",
                            color: "#fff",
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          {isVoting ? "..." : isDisabled ? "✓" : "❤️ Vote"}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          .container {
            padding-left: 12px !important;
            paddingRight: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
