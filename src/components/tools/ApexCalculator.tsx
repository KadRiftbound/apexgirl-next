"use client";

import { useState, useEffect, useMemo } from "react";

type CalcItem = {
  category: string;
  item: string;
  level: number;
  cost: number;
};

const categories = [
  { id: "Artists", icon: "🎤", color: "#a855f7" },
  { id: "HQ Glass", icon: "🏢", color: "#22d3ee" },
  { id: "HQ Floors", icon: "🏗️", color: "#34d399" },
  { id: "Collection Gems", icon: "💎", color: "#fbbf24" },
  { id: "Museum Exhibits", icon: "🏛️", color: "#f472b6" },
  { id: "Car Parts", icon: "🚗", color: "#f87171" },
  { id: "Assets", icon: "💰", color: "#4ade80" },
  { id: "Villa Suite", icon: "🏰", color: "#2dd4bf" },
  { id: "Blueprints", icon: "📐", color: "#818cf8" },
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
        background: "rgba(0, 0, 0, 0.3)",
        borderRadius: "16px",
        border: `1px solid ${color}33`,
        padding: "20px",
        marginBottom: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 600 }}>
          {icon} {name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
            Total: <strong style={{ color, fontSize: "1.1rem" }}>{total.toLocaleString()}</strong>
          </span>
          <button
            onClick={reset}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.75rem",
              padding: "4px 12px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {Object.entries(itemsByLevel).map(([level, levelItems]) => (
        <div key={level} style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
            Level {level}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {levelItems.map(({ item, cost }) => {
              const qty = selectedLevel[item] || 0;
              return (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255,255,255,0.05)",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <button
                    onClick={() => decrement(item, cost)}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.1)",
                      color: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px"
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: "30px", textAlign: "center", fontSize: "0.85rem", color: "#fff" }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => increment(item, cost)}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "6px",
                      border: "none",
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
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", minWidth: "70px" }}>
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

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.6)" }}>
        <div style={{ fontSize: "2rem", marginBottom: "12px" }}>⏳</div>
        Loading calculator data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "#f87171" }}>
        Error: {error}
      </div>
    );
  }

  const categoryList = categories.filter((cat) => data[cat.id]);

  return (
    <div>
      <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "20px", fontSize: "0.9rem" }}>
        Calculate the cost to upgrade your resources. Select category and add levels.
      </p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
        {categoryList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              border: activeCategory === cat.id ? `1px solid ${cat.color}` : "1px solid rgba(255,255,255,0.15)",
              background: activeCategory === cat.id ? `${cat.color}33` : "rgba(255,255,255,0.05)",
              color: activeCategory === cat.id ? cat.color : "rgba(255,255,255,0.6)",
              cursor: "pointer",
              fontSize: "0.8rem",
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
          color={categories.find((c) => c.id === activeCategory)?.color || "#a855f7"}
          icon={categories.find((c) => c.id === activeCategory)?.icon || "📦"}
        />
      )}
    </div>
  );
}
