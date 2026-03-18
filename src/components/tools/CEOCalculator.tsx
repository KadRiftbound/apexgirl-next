"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

const translations: Record<string, any> = {
  fr: { task: "Tâche", used: "Utilisé", points: "Points", total: "Total", reset: "Réinitialiser", loading: "Chargement des données CEO...", error: "Erreur", noEvents: "Aucun événement trouvé" },
  en: { task: "Task", used: "Used", points: "Points", total: "Total", reset: "Reset", loading: "Loading CEO data...", error: "Error", noEvents: "No events found" },
  it: { task: "Compito", used: "Usato", points: "Punti", total: "Totale", reset: "Reset", loading: "Caricamento dati CEO...", error: "Errore", noEvents: "Nessun evento trovato" },
  es: { task: "Tarea", used: "Usado", points: "Puntos", total: "Total", reset: "Reiniciar", loading: "Cargando datos de CEO...", error: "Error", noEvents: "No se encontraron eventos" },
  pt: { task: "Tarefa", used: "Usado", points: "Pontos", total: "Total", reset: "Resetar", loading: "Carregando dados do CEO...", error: "Erro", noEvents: "Nenhum evento encontrado" },
  pl: { task: "Zadanie", used: "Użyte", points: "Punkty", total: "Suma", reset: "Resetuj", loading: "Ładowanie danych CEO...", error: "Błąd", noEvents: "Nie znaleziono wydarzeń" },
  id: { task: "Tugas", used: "Dipakai", points: "Poin", total: "Total", reset: "Reset", loading: "Memuat data CEO...", error: "Kesalahan", noEvents: "Tidak ada event" },
  ru: { task: "Задача", used: "Использовано", points: "Очки", total: "Всего", reset: "Сбросить", loading: "Загрузка данных CEO...", error: "Ошибка", noEvents: "События не найдены" },
};

function getT(lang: string) {
  return translations[lang] || translations.en;
}

type EventItem = {
  task: string;
  points: number;
  used?: number;
  score?: number;
};

type EventData = {
  name: string;
  items: EventItem[];
};

const colorSchemes = [
  { bg: "rgba(139, 92, 246, 0.15)", border: "rgba(139, 92, 246, 0.5)", title: "#a78bfa", name: "violet" },
  { bg: "rgba(6, 182, 212, 0.15)", border: "rgba(6, 182, 212, 0.5)", title: "#22d3ee", name: "cyan" },
  { bg: "rgba(16, 185, 129, 0.15)", border: "rgba(16, 185, 129, 0.5)", title: "#34d399", name: "emerald" },
];

function EventSection({
  event,
  color,
  onReset,
  t,
}: {
  event: EventData;
  color: typeof colorSchemes[0];
  onReset: () => void;
  t: Record<string, string>;
}) {
  const [counts, setCounts] = useState<number[]>(() => {
    // Filter out header rows and initialize counts
    return event.items
      .filter(item => item.task && !item.task.includes("Task") && !item.task.includes("TOTAL") && !item.task.includes("APPROXIMATE"))
      .map(() => 0);
  });

  const validItems = useMemo(() => {
    return event.items.filter(item => 
      item.task && 
      !item.task.includes("Task") && 
      !item.task.includes("TOTAL") && 
      !item.task.includes("APPROXIMATE") &&
      item.points > 0
    );
  }, [event.items]);

  const total = useMemo(
    () =>
      counts.reduce((sum, count, i) => sum + count * (validItems[i]?.points || 0), 0),
    [counts, validItems]
  );

  function setCount(idx: number, val: number) {
    setCounts((prev) => prev.map((c, i) => (i === idx ? Math.max(0, val) : c)));
  }

  function reset() {
    setCounts(validItems.map(() => 0));
    onReset();
  }

  return (
    <section
      id={event.name}
      style={{
        background: color.bg,
        borderRadius: "16px",
        border: `1px solid ${color.border}`,
        padding: "20px",
        marginBottom: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ color: color.title, fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {event.name}
        </h3>
        <button
          onClick={reset}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.75rem",
            padding: "6px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: "0.85rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <th style={{ padding: "8px", textAlign: "left", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{t.task}</th>
              <th style={{ padding: "8px", textAlign: "center", color: "rgba(255,255,255,0.65)", fontWeight: 500, width: "80px" }}>{t.used}</th>
              <th style={{ padding: "8px", textAlign: "right", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{t.points}</th>
              <th style={{ padding: "8px", textAlign: "right", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{t.total}</th>
            </tr>
          </thead>
          <tbody>
            {validItems.slice(0, 30).map((item, i) => {
              const subtotal = counts[i] * item.points;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "8px", color: "#fff" }}>
                    {item.task}
                  </td>
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    <input
                      type="number"
                      min={0}
                      value={counts[i]}
                      onChange={(e) => setCount(i, Number(e.target.value))}
                      style={{
                        width: "60px",
                        padding: "6px 8px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "rgba(30, 30, 50, 0.9)",
                        color: "#fff",
                        textAlign: "center",
                        fontSize: "0.85rem"
                      }}
                    />
                  </td>
                  <td style={{ padding: "8px", textAlign: "right", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>
                    {item.points.toLocaleString()}
                  </td>
                  <td style={{ padding: "8px", textAlign: "right", fontWeight: 600,                     color: counts[i] > 0 ? color.title : "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>
                    {subtotal.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "flex-end" }}>
        <div>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginRight: "12px" }}>Total Points: </span>
          <span style={{ fontWeight: 700, color: color.title, fontSize: "1.5rem", fontFamily: "monospace" }}>
            {total.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}

export default function CEOCalculator() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = getT(lang);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resetCounts, setResetCounts] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/ceo")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setEvents(data.events || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleReset(index: number) {
    setResetCounts((prev) => {
      const next = [...(prev.length ? prev : events.map(() => 0))];
      next[index] = (next[index] ?? 0) + 1;
      return next;
    });
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.6)" }}>
        <div style={{ fontSize: "2rem", marginBottom: "12px" }}>⏳</div>
        {t.loading}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "#f87171" }}>
        {t.error}: {error}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.6)" }}>
        {t.noEvents}
      </div>
    );
  }

  const visibleEvents = events.filter(
    (e) => !e.name.toUpperCase().includes("ULTIMATE CEO EVENT") || e.name.toUpperCase().includes("TOP/ULTIMATE")
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <nav style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
        {visibleEvents.map((event, i) => {
          const color = colorSchemes[i % colorSchemes.length];
          return (
            <a
              key={event.name}
              href={`#${event.name}`}
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                padding: "8px 14px",
                borderRadius: "10px",
                border: `1px solid ${color.border}`,
                color: color.title,
                background: "rgba(30, 30, 50, 0.8)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              {event.name}
            </a>
          );
        })}
      </nav>

      <div>
        {visibleEvents.map((event, i) => (
          <EventSection
            key={`${event.name}-${resetCounts[i]}`}
            event={event}
            color={colorSchemes[i % colorSchemes.length]}
            onReset={() => handleReset(i)}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
