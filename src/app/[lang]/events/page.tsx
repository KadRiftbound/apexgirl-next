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

const typeColors: Record<string, { bg: string; text: string }> = {
  recurring: { bg: "#22c55e22", text: "#22c55e" },
  seasonal: { bg: "#f59e0b22", text: "#f59e0b" },
  permanent: { bg: "#6366f122", text: "#6366f1" },
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
      <div className="container">
        <div style={{ textAlign: "center", padding: "var(--space-16)" }}>
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="section-title" style={{ marginBottom: "var(--space-2)" }}>
        Événements
      </h1>
      <p className="section-subtitle" style={{ marginBottom: "var(--space-6)" }}>
        Calendrier et récompenses des événements
      </p>

      <AdBanner />

      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          marginBottom: "var(--space-4)",
          overflowX: "auto",
          paddingBottom: "var(--space-2)",
        }}
      >
        {["all", "recurring", "seasonal", "permanent"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              background: filter === f ? "var(--primary)" : "transparent",
              color: filter === f ? "#fff" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {f === "all"
              ? "Tous"
              : f === "recurring"
              ? "Récurrents"
              : f === "seasonal"
              ? "Saisonniers"
              : "Permanents"}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Rechercher un événement..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          fontSize: "var(--text-sm)",
          marginBottom: "var(--space-6)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        {filtered.map((event) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              padding: "var(--space-5)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "var(--shadow-lg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "var(--space-3)",
              }}
            >
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  background: typeColors[event.type]?.bg || "#6366f122",
                  color: typeColors[event.type]?.text || "#6366f1",
                }}
              >
                {event.type}
              </span>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  background: event.active ? "#22c55e22" : "#94a3b822",
                  color: event.active ? "#22c55e" : "#94a3b8",
                }}
              >
                {event.active ? "Actif" : "Terminé"}
              </span>
            </div>

            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                marginBottom: "var(--space-2)",
              }}
            >
              {event.name}
            </h3>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "var(--text-sm)",
                marginBottom: "var(--space-3)",
                lineHeight: 1.5,
              }}
            >
              {event.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                fontSize: "var(--text-xs)",
                color: "var(--text-muted)",
                marginBottom: "var(--space-3)",
              }}
            >
              {event.duration && <span>⏱️ {event.duration}</span>}
              {event.frequency && <span>🔄 {event.frequency}</span>}
              {event.region && <span>🌍 {event.region}</span>}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {(event.rewards || []).slice(0, 3).map((r, i) => (
                <span
                  key={i}
                  style={{
                    padding: "2px 8px",
                    background: "var(--bg-subtle)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "var(--text-xs)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {r}
                </span>
              ))}
              {(event.rewards || []).length > 3 && (
                <span
                  style={{
                    padding: "2px 8px",
                    color: "var(--text-muted)",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  +{event.rewards.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "var(--space-16)",
            color: "var(--text-muted)",
          }}
        >
          Aucun événement trouvé
        </div>
      )}

      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--space-4)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-8)",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              style={{
                position: "absolute",
                top: "var(--space-4)",
                right: "var(--space-4)",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "var(--text-muted)",
              }}
            >
              ✕
            </button>

            <div
              style={{
                display: "flex",
                gap: "var(--space-2)",
                marginBottom: "var(--space-4)",
              }}
            >
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  background: typeColors[selectedEvent.type]?.bg || "#6366f122",
                  color: typeColors[selectedEvent.type]?.text || "#6366f1",
                }}
              >
                {selectedEvent.type}
              </span>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  background: selectedEvent.active ? "#22c55e22" : "#94a3b822",
                  color: selectedEvent.active ? "#22c55e" : "#94a3b8",
                }}
              >
                {selectedEvent.active ? "Actif" : "Terminé"}
              </span>
            </div>

            <h2
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 700,
                marginBottom: "var(--space-4)",
              }}
            >
              {selectedEvent.name}
            </h2>

            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.6,
                marginBottom: "var(--space-4)",
              }}
            >
              {selectedEvent.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "var(--space-4)",
                flexWrap: "wrap",
                marginBottom: "var(--space-4)",
                fontSize: "var(--text-sm)",
                color: "var(--text-muted)",
              }}
            >
              {selectedEvent.duration && (
                <span>⏱️ Durée: {selectedEvent.duration}</span>
              )}
              {selectedEvent.frequency && (
                <span>🔄 Fréquence: {selectedEvent.frequency}</span>
              )}
              {selectedEvent.region && (
                <span>🌍 Région: {selectedEvent.region}</span>
              )}
            </div>

            <div style={{ marginBottom: "var(--space-4)" }}>
              <h4
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  marginBottom: "var(--space-2)",
                }}
              >
                Récompenses:
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                {(selectedEvent.rewards || []).map((r, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "4px 12px",
                      background: "var(--bg-subtle)",
                      borderRadius: "var(--radius)",
                      fontSize: "var(--text-sm)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {selectedEvent.tips && (
              <div
                style={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-4)",
                }}
              >
                <h4
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  💡 Tips:
                </h4>
                <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>
                  {selectedEvent.tips}
                </p>
              </div>
            )}

            {selectedEvent.bestArtists && selectedEvent.bestArtists.length > 0 && (
              <div style={{ marginTop: "var(--space-4)" }}>
                <h4
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  Meilleurs Artistes:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                  {selectedEvent.bestArtists.map((artist, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "4px 12px",
                        background: "rgba(99, 102, 241, 0.1)",
                        color: "var(--secondary)",
                        borderRadius: "var(--radius)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 500,
                      }}
                    >
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
