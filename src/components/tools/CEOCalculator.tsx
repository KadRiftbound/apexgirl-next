"use client";

import { useState, useEffect, useMemo } from "react";

type EventItem = {
  item: string;
  cost: number;
  points: number;
  bonus?: number;
};

type EventData = {
  name: string;
  items: EventItem[];
};

const colorSchemes = [
  { bg: "rgba(139, 92, 246, 0.1)", border: "#8b5cf6", title: "#a78bfa", name: "violet" },
  { bg: "rgba(6, 182, 212, 0.1)", border: "#06b6d4", title: "#22d3ee", name: "cyan" },
  { bg: "rgba(16, 185, 129, 0.1)", border: "#10b981", title: "#34d399", name: "emerald" },
];

function EventSection({
  event,
  color,
  onReset,
}: {
  event: EventData;
  color: typeof colorSchemes[0];
  onReset: () => void;
}) {
  const [counts, setCounts] = useState<number[]>(event.items.map(() => 0));

  const total = useMemo(
    () =>
      counts.reduce((sum, count, i) => sum + count * event.items[i].points, 0),
    [counts, event.items]
  );

  const totalCost = useMemo(
    () =>
      counts.reduce((sum, count, i) => sum + count * event.items[i].cost, 0),
    [counts, event.items]
  );

  function setCount(idx: number, val: number) {
    setCounts((prev) => prev.map((c, i) => (i === idx ? Math.max(0, val) : c)));
  }

  function reset() {
    setCounts(event.items.map(() => 0));
    onReset();
  }

  return (
    <section
      id={event.name}
      style={{
        background: color.bg,
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${color.border}66`,
        padding: "var(--space-5)",
        marginBottom: "var(--space-4)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
        <h3 style={{ color: color.title, fontSize: "var(--text-lg)", fontWeight: 600 }}>{event.name}</h3>
        <button
          onClick={reset}
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: "var(--text-xs)",
            padding: "4px 8px",
            borderRadius: "var(--radius)",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: "var(--text-sm)", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <th style={{ padding: "var(--space-2)", textAlign: "left" }}>Item</th>
              <th style={{ padding: "var(--space-2)", textAlign: "right" }}>Cost</th>
              <th style={{ padding: "var(--space-2)", textAlign: "right" }}>Points</th>
              <th style={{ padding: "var(--space-2)", textAlign: "right" }}>Qty</th>
              <th style={{ padding: "var(--space-2)", textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {event.items.map((item, i) => {
              const subtotal = counts[i] * item.points;
              return (
                <tr key={item.item} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "var(--space-2)", color: "var(--text-primary)" }}>
                    {item.item}
                    {item.bonus && (
                      <span style={{ marginLeft: "8px", color: "#fbbf24", fontSize: "var(--text-xs)" }}>
                        (+{item.bonus}% bonus)
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "var(--space-2)", textAlign: "right", color: "var(--text-muted)" }}>
                    {item.cost.toLocaleString()}
                  </td>
                  <td style={{ padding: "var(--space-2)", textAlign: "right", color: color.title }}>
                    {item.points.toLocaleString()}
                  </td>
                  <td style={{ padding: "var(--space-2)", textAlign: "right" }}>
                    <input
                      type="number"
                      min={0}
                      value={counts[i]}
                      onChange={(e) => setCount(i, Number(e.target.value))}
                      style={{
                        width: "60px",
                        padding: "4px 8px",
                        borderRadius: "var(--radius)",
                        border: "1px solid var(--border)",
                        background: "var(--bg-subtle)",
                        color: "var(--text-primary)",
                        textAlign: "right",
                      }}
                    />
                  </td>
                  <td style={{ padding: "var(--space-2)", textAlign: "right", fontWeight: 600, color: color.title }}>
                    {subtotal.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
        <div>
          <span style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>Total Cost: </span>
          <span style={{ fontWeight: 600 }}>{totalCost.toLocaleString()}</span>
        </div>
        <div>
          <span style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>Total Points: </span>
          <span style={{ fontWeight: 700, color: color.title, fontSize: "var(--text-xl)" }}>{total.toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
}

export default function CEOCalculator() {
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
      <div style={{ textAlign: "center", padding: "var(--space-16)", color: "var(--text-muted)" }}>
        Loading calculator data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "var(--space-16)", color: "#ef4444" }}>
        Error: {error}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div style={{ textAlign: "center", padding: "var(--space-16)", color: "var(--text-muted)" }}>
        No events found
      </div>
    );
  }

  const visibleEvents = events.filter(
    (e) => !e.name.toUpperCase().includes("ULTIMATE CEO EVENT") || e.name.toUpperCase().includes("TOP/ULTIMATE")
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "var(--space-6)" }}>
        <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
          📅 CEO Event Calculator
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Enter how many items you plan to use to calculate your event points
        </p>
      </div>

      <nav style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", justifyContent: "center", marginBottom: "var(--space-5)" }}>
        {visibleEvents.map((event, i) => {
          const color = colorSchemes[i % colorSchemes.length];
          return (
            <a
              key={event.name}
              href={`#${event.name}`}
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                padding: "6px 12px",
                borderRadius: "var(--radius)",
                border: `1px solid ${color.border}66`,
                color: color.title,
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
          />
        ))}
      </div>
    </div>
  );
}
