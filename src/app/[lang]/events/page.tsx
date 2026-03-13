"use client";

import React, { useState, useEffect } from "react";
import { AdBanner } from "@/components/AdSense";

type Event = {
  id: number;
  name: string;
  type: string;
  description: string;
  rewards: string[];
  tips: string;
  bestArtists: string[];
  active: boolean;
  duration: string;
  frequency?: string;
  region?: string;
  date?: string;
  image?: string;
};

const eventImages: Record<string, string> = {
  recurring: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  seasonal: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  permanent: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
};

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  recurring: { bg: "rgba(34, 197, 94, 0.15)", text: "#22c55e", border: "rgba(34, 197, 94, 0.4)" },
  seasonal: { bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b", border: "rgba(245, 158, 11, 0.4)" },
  permanent: { bg: "rgba(59, 130, 246, 0.15)", text: "#3b82f6", border: "rgba(59, 130, 246, 0.4)" },
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filtered, setFiltered] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch("/database/data/events.json")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = events;
    if (filter !== "all") {
      result = result.filter((e) => e.type === filter);
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(s) ||
          e.description.toLowerCase().includes(s)
      );
    }
    setFiltered(result);
  }, [filter, search, events]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.2rem" }}>⏳ Chargement...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      paddingBottom: "60px"
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(15, 15, 26, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.3)",
        padding: "40px 0 30px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: 800, 
            marginBottom: "8px",
            background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            🎉 Événements
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>
            Calendrier et récompenses des événements
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
        <AdBanner />

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "Tous" },
            { id: "recurring", label: "Récurrents" },
            { id: "seasonal", label: "Saisonniers" },
            { id: "permanent", label: "Permanents" }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                border: filter === f.id ? "1px solid rgba(236, 72, 153, 0.6)" : "1px solid rgba(255,255,255,0.1)",
                background: filter === f.id ? "linear-gradient(135deg, #ec4899, #a855f7)" : "rgba(30, 30, 50, 0.8)",
                color: filter === f.id ? "#fff" : "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 500,
                transition: "all 0.2s",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Rechercher un événement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(30, 30, 50, 0.8)",
            color: "#fff",
            fontSize: "0.95rem",
            marginBottom: "24px",
            outline: "none",
          }}
        />

        {/* Events Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "16px",
        }}>
          {filtered.map((event) => {
            return (
              <React.Fragment key={event.id}>
              <div
                onClick={() => setSelectedEvent(event)}
                style={{
                  background: "rgba(30, 30, 50, 0.8)",
                  borderRadius: "16px",
                  border: `1px solid ${typeColors[event.type]?.border || "rgba(139, 92, 246, 0.3)"}`,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(236, 72, 153, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Event Image Banner */}
                <div style={{
                  height: "100px",
                  background: eventImages[event.type] || eventImages.recurring,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}>
                  <span style={{ fontSize: "3rem", opacity: 0.9 }}>
                    {event.type === "recurring" ? "🏆" : event.type === "seasonal" ? "🎉" : "⭐"}
                  </span>
                  <div style={{
                    position: "absolute",
                    bottom: "8px",
                    left: "12px",
                  }}>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      background: "rgba(0,0,0,0.5)",
                      color: "#fff",
                    }}>
                      {event.type}
                    </span>
                  </div>
                </div>

                {/* Event Info */}
                <div style={{ padding: "16px" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px", color: "#fff" }}>
                    {event.name}
                  </h3>
                  
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "12px" }}>
                    {event.description.slice(0, 100)}...
                  </p>

                  <div style={{ display: "flex", gap: "12px", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                    {event.duration && <span>⏱️ {event.duration}</span>}
                    {event.frequency && <span>🔄 {event.frequency}</span>}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
                    {(event.rewards || []).slice(0, 3).map((r, i) => (
                      <span key={i} style={{
                        padding: "3px 8px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "6px",
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.7)",
                      }}>
                        {r}
                      </span>
                    ))}
                    {(event.rewards || []).length > 3 && (
                      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>
                        +{event.rewards.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              </React.Fragment>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.5)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🔍</div>
            <p>Aucun événement trouvé</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(20, 20, 35, 0.98)",
              borderRadius: "20px",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <div style={{
              height: "120px",
              background: eventImages[selectedEvent.type] || eventImages.recurring,
              position: "relative",
            }}>
              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  color: "#fff",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px", color: "#fff" }}>
                {selectedEvent.name}
              </h2>
              
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <span style={{
                  padding: "4px 12px",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  background: typeColors[selectedEvent.type]?.bg,
                  color: typeColors[selectedEvent.type]?.text,
                }}>
                  {selectedEvent.type}
                </span>
                {selectedEvent.duration && (
                  <span style={{ padding: "4px 12px", borderRadius: "8px", fontSize: "0.75rem", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                    ⏱️ {selectedEvent.duration}
                  </span>
                )}
              </div>

              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: "20px" }}>
                {selectedEvent.description}
              </p>

              {selectedEvent.rewards && selectedEvent.rewards.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.9)" }}>
                    🎁 Récompenses
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {selectedEvent.rewards.map((r, i) => (
                      <span key={i} style={{
                        padding: "6px 12px",
                        background: "rgba(139, 92, 246, 0.2)",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.9)",
                      }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.bestArtists && selectedEvent.bestArtists.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.9)" }}>
                    ⭐ Meilleures artistes
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {selectedEvent.bestArtists.map((artist, i) => (
                      <span key={i} style={{
                        padding: "6px 12px",
                        background: "rgba(236, 72, 153, 0.2)",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.9)",
                      }}>
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.tips && (
                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "8px", color: "rgba(255,255,255,0.9)" }}>
                    💡 Conseils
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    {selectedEvent.tips}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
