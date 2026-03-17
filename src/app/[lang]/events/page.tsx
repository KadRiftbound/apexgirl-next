"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import eventsDataRaw from "@/lib/data/events.json";
import { AdBanner } from "@/components/AdSense";

const eventListTranslations: Record<string, any> = {
  fr: { searchPlaceholder: "🔍 Rechercher un événement...", filterAll: "Tous", filterRecurring: "Récurrents", filterSeasonal: "Saisonniers", filterPermanent: "Permanents", title: "Événements", subtitle: "Calendrier et récompenses des événements", noEvents: "Aucun événement trouvé" },
  en: { searchPlaceholder: "🔍 Search for an event...", filterAll: "All", filterRecurring: "Recurring", filterSeasonal: "Seasonal", filterPermanent: "Permanent", title: "Events", subtitle: "Event schedule and rewards", noEvents: "No events found" },
  it: { searchPlaceholder: "🔍 Cerca un evento...", filterAll: "Tutti", filterRecurring: "Ricorrenti", filterSeasonal: "Stagionali", filterPermanent: "Permanenti", title: "Eventi", subtitle: "Calendario e ricompense degli eventi", noEvents: "Nessun evento trovato" },
  es: { searchPlaceholder: "🔍 Buscar un evento...", filterAll: "Todos", filterRecurring: "Recurrentes", filterSeasonal: "Temporales", filterPermanent: "Permanentes", title: "Eventos", subtitle: "Calendario y recompensas de eventos", noEvents: "No se encontraron eventos" },
  pt: { searchPlaceholder: "🔍 Pesquisar um evento...", filterAll: "Todos", filterRecurring: "Recorrentes", filterSeasonal: "Sazonais", filterPermanent: "Permanentes", title: "Eventos", subtitle: "Calendário e recompensas dos eventos", noEvents: "Nenhum evento encontrado" },
  pl: { searchPlaceholder: "🔍 Szukaj wydarzenia...", filterAll: "Wszystkie", filterRecurring: "Powtarzające się", filterSeasonal: "Sezonowe", filterPermanent: "Stałe", title: "Wydarzenia", subtitle: "Harmonogram i nagrody wydarzeń", noEvents: "Nie znaleziono wydarzeń" },
  id: { searchPlaceholder: "🔍 Cari acara...", filterAll: "Semua", filterRecurring: "Berulang", filterSeasonal: "Musiman", filterPermanent: "Permanen", title: "Acara", subtitle: "Jadwal dan hadiah acara", noEvents: "Tidak ada acara ditemukan" },
  ru: { searchPlaceholder: "🔍 Поиск события...", filterAll: "Все", filterRecurring: "Повторяющиеся", filterSeasonal: "Сезонные", filterPermanent: "Постоянные", title: "События", subtitle: "Расписание и награды событий", noEvents: "События не найдены" },
};

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

const eventIconMap: Record<string, string> = {
  "Ultimate CEO": "ultimate-ceo.webp",
  "Grammy Contest": "grammy-contest.webp",
  "Radio Battle": "radio-battle.webp",
  "Daily Express": "daily-express.webp",
  "Luxury Auto Show": "luxury-auto-show.webp",
  "Business Battle Pass": "business-battle-pass.webp",
  "Ultimate Group": "ultimate-group.webp",
};

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  recurring: { bg: "rgba(34, 197, 94, 0.15)", text: "#22c55e", border: "rgba(34, 197, 94, 0.4)" },
  seasonal: { bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b", border: "rgba(245, 158, 11, 0.4)" },
  permanent: { bg: "rgba(59, 130, 246, 0.15)", text: "#3b82f6", border: "rgba(59, 130, 246, 0.4)" },
};

export default function EventsPage() {
  const params = useParams();
  const lang = params?.lang as string || "fr";
  const t = eventListTranslations[lang] || eventListTranslations.en;
  const events: Event[] = eventsDataRaw as Event[];
  const [filtered, setFiltered] = useState<Event[]>(eventsDataRaw as Event[]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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
  return (
    <div style={{ 
      minHeight: "100vh", 
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
            🎉 {t.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>
            {t.subtitle}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
        <AdBanner />

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: t.filterAll },
            { id: "recurring", label: t.filterRecurring },
            { id: "seasonal", label: t.filterSeasonal },
            { id: "permanent", label: t.filterPermanent }
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
          placeholder={t.searchPlaceholder}
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
            const slug = event.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <React.Fragment key={event.id}>
              <Link
                href={`/${lang}/events/${slug}`}
                style={{
                  background: "rgba(30, 30, 50, 0.8)",
                  borderRadius: "16px",
                  border: `1px solid ${typeColors[event.type]?.border || "rgba(139, 92, 246, 0.3)"}`,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                  display: "block",
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
                  height: "120px",
                  background: eventImages[event.type] || eventImages.recurring,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  backgroundImage: eventIconMap[event.name] ? `url('/assets/images/events/${eventIconMap[event.name]}')` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}>
                  {eventIconMap[event.name] && (
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.4)",
                    }} />
                  )}
                  {!eventIconMap[event.name] && (
                  <span style={{ fontSize: "3rem", opacity: 0.9, position: "relative" }}>
                    {event.type === "recurring" ? "🏆" : event.type === "seasonal" ? "🎉" : "⭐"}
                  </span>
                  )}
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
                      background: "rgba(0,0,0,0.6)",
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
              </Link>
              </React.Fragment>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.5)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🔍</div>
            <p>{t.noEvents}</p>
          </div>
        )}
      </div>
    </div>
  );
}
