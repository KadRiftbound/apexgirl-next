"use client";

import { useState, useEffect, useMemo } from "react";

type CalcItem = {
  category: string;
  item: string;
  level: number;
  cost: number;
};

const categories = [
  { id: "Artists", icon: "🎤", color: "#8b5cf6" },
  { id: "HQ Glass", icon: "🏢", color: "#06b6d4" },
  { id: "HQ Floors", icon: "🏗️", color: "#10b981" },
  { id: "Collection Gems", icon: "💎", color: "#f59e0b" },
  { id: "Museum Exhibits", icon: "🏛️", color: "#ec4899" },
  { id: "Car Parts", icon: "🚗", color: "#ef4444" },
  { id: "Car Core", icon: "⚙️", color: "#6366f1" },
  { id: "Villa Suite", icon: "🏰", color: "#14b8a6" },
  { id: "Villa Homemaking", icon: "🏠", color: "#f97316" },
  { id: "Assets", icon: "💰", color: "#22c55e" },
];

function CategorySection({
  name,
  items,
  color,
  icon,
}: {
  name: string;
  items: CalcItem[];
  color: string;
  icon: string;
}) {
  const [selectedLevel, setSelectedLevel] = useState<Record<string, number>>({});

  const total = useMemo(
    () => Object.values(selectedLevel).reduce((sum, level) => sum + level, 0),
    [selectedLevel]
  );

  const itemsByLevel = useMemo(() => {
    const sorted = [...items].sort((a, b) => a.level - b.level);
    const result: Record<number, { item: string; cost: number }[]> = {};
    sorted.forEach((item) => {
      if (!result[item.level]) result[item.level] = [];
      result[item.level].push({ item: item.item, cost: item.cost });
    });
    return result;
  }, [items]);

  function increment(item: string, cost: number) {
    setSelectedLevel((prev) => ({
      ...prev,
      [item]: (prev[item] || 0) + cost,
    }));
  }

  function decrement(item: string, cost: number) {
    setSelectedLevel((prev) => ({
      ...prev,
      [item]: Math.max(0, (prev[item] || 0) - cost),
    }));
  }

  function reset() {
    setSelectedLevel({});
  }

  return (
    <section
      style={{
        background: `${color}11`,
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${color}33`,
        padding: "var(--space-5)",
        marginBottom: "var(--space-4)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
        <h3 style={{ color, fontSize: "var(--text-lg)", fontWeight: 600 }}>
          {icon} {name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
            Total: <strong style={{ color, fontSize: "var(--text-lg)" }}>{total.toLocaleString()}</strong>
          </span>
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
      </div>

      {Object.entries(itemsByLevel).map(([level, levelItems]) => (
        <div key={level} style={{ marginBottom: "var(--space-3)" }}>
          <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBottom: "var(--space-2)" }}>
            Level {level}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
            {levelItems.map(({ item, cost }) => {
              const qty = selectedLevel[item] || 0;
              return (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    background: "var(--bg-subtle)",
                    padding: "4px 8px",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <button
                    onClick={() => decrement(item, cost)}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-elevated)",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: "30px", textAlign: "center", fontSize: "var(--text-sm)" }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => increment(item, cost)}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                      background: color,
                      color: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    +
                  </button>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", minWidth: "60px" }}>
                    {cost.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

export default function ApexCalculator() {
  const [data, setData] = useState<Record<string, CalcItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/calculator")
      .then((res) => res.json())
      .then((result) => {
        if (result.error) throw new Error(result.error);
        setData(result);
        const firstCat = Object.keys(result)[0];
        if (firstCat) setActiveCategory(firstCat);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalCost = useMemo(() => {
    return Object.values(data).flat().reduce((sum, item) => sum + item.cost, 0);
  }, [data]);

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

  const categoryList = categories.filter((cat) => data[cat.id]);

  return (
    <div>
      <div style={{ marginBottom: "var(--space-6)" }}>
        <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
          🧮 Resource Calculator
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Calculate the cost to upgrade your resources. Only complete levels are available.
        </p>
      </div>

      <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-4)" }}>
        {categoryList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius)",
              border: activeCategory === cat.id ? `1px solid ${cat.color}` : "1px solid var(--border)",
              background: activeCategory === cat.id ? `${cat.color}22` : "transparent",
              color: activeCategory === cat.id ? cat.color : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
          >
            {cat.icon} {cat.id}
          </button>
        ))}
      </div>

      {activeCategory && data[activeCategory] && (
        <CategorySection
          name={activeCategory}
          items={data[activeCategory]}
          color={categories.find((c) => c.id === activeCategory)?.color || "#8b5cf6"}
          icon={categories.find((c) => c.id === activeCategory)?.icon || "📦"}
        />
      )}
    </div>
  );
}
