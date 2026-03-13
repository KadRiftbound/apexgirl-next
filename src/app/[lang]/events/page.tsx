"use client";

import { useState, useEffect } from "react";
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
};

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  recurring: { bg: "rgba(34, 197, 94, 0.15)", text: "#22c55e", border: "rgba(34, 197, 94, 0.4)" },
  seasonal: { bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b", border: "rgba(245, 158, 11, 0.4)" },
  permanent: { bg: "rgba(99, 102, 241, 0.15)", text: "#6366f1", border: "rgba(99, 102, 241, 0.4)" },
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filtered, setFiltered] = useState<Event[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

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
          {filtered.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              style={{
                background: "rgba(30, 30, 50, 0.8)",
                borderRadius: "16px",
                border: `1px solid ${typeColors[event.type]?.border || "rgba(139, 92, 246, 0.3)"}`,
                padding: "20px",
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "8px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  background: typeColors[event.type]?.bg || "rgba(99, 102, 241, 0.15)",
                  color: typeColors[event.type]?.text || "#6366f1",
                }}>
                  {event.type}
                </span>
              </div>

              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>
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
          ))}
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
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, rgba(30, 30, 50, 0.95), rgba(20, 20, 35, 0.95))",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "10px",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <span style={{
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                background: typeColors[selectedEvent.type]?.bg,
                color: typeColors[selectedEvent.type]?.text,
              }}>
                {selectedEvent.type}
              </span>
            </div>

            <h2 style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 800, marginBottom: "16px" }}>
              {selectedEvent.name}
            </h2>

            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "20px" }}>
              {selectedEvent.description}
            </p>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
              {selectedEvent.duration && <span>⏱️ <strong style={{color:"#fff"}}>Durée:</strong> {selectedEvent.duration}</span>}
              {selectedEvent.frequency && <span>🔄 <strong style={{color:"#fff"}}>Fréquence:</strong> {selectedEvent.frequency}</span>}
              {selectedEvent.region && <span>🌍 <strong style={{color:"#fff"}}>Région:</strong> {selectedEvent.region}</span>}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "10px", textTransform: "uppercase" }}>
                💎 Récompenses
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {(selectedEvent.rewards || []).map((r, i) => (
                  <span key={i} style={{
                    padding: "6px 14px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {selectedEvent.tips && (
              <div style={{
                background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid rgba(236, 72, 153, 0.3)",
              }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                  💡 Tips
                </h4>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                  {selectedEvent.tips}
                </p>
              </div>
            )}

            {selectedEvent.bestArtists && selectedEvent.bestArtists.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "10px", textTransform: "uppercase" }}>
                  ⭐ Meilleurs Artistes
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selectedEvent.bestArtists.map((artist, i) => (
                    <span key={i} style={{
                      padding: "6px 14px",
                      background: "rgba(168, 85, 247, 0.2)",
                      color: "#c084fc",
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                    }}>
                      {artist}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
