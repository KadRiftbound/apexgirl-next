"use client";

import { useState, useEffect, useMemo } from "react";

type CalcItem = {
  category: string;
  item: string;
  level: number;
  cost: number;
};

const categoryConfig = [
  { id: "Artists", icon: "🎤", color: "#a855f7", label: "Artist EXP" },
  { id: "HQ Glass", icon: "🏢", color: "#22d3ee", label: "HQ Glass" },
  { id: "HQ Floors", icon: "🏗️", color: "#34d399", label: "HQ Floors" },
  { id: "Collection Gems", icon: "💎", color: "#fbbf24", label: "Collection Gems" },
  { id: "Museum Exhibits", icon: "🏛️", color: "#f472b6", label: "Museum Exhibits" },
  { id: "Car Parts", icon: "🚗", color: "#f87171", label: "Car Parts" },
  { id: "Assets", icon: "💰", color: "#4ade80", label: "Assets" },
  { id: "Villa Suite", icon: "🏰", color: "#2dd4bf", label: "Villa Suite" },
  { id: "Blueprints", icon: "📐", color: "#818cf8", label: "Blueprints" },
];

export default function ApexCalculator() {
  const [data, setData] = useState<Record<string, CalcItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Artists");

  // Store selections as { category: { itemName: quantity } }
  const [selections, setSelections] = useState<Record<string, Record<string, number>>>({});

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

  const handleLevelChange = (item: string, level: number) => {
    setSelections((prev) => ({
      ...prev,
      [activeCategory]: {
        ...(prev[activeCategory] || {}),
        [item]: level,
      },
    }));
  };

  const calculateTotal = useMemo(() => {
    let total = 0;
    const categoryItems = data[activeCategory] || [];
    
    for (const item of categoryItems) {
      const qty = selections[activeCategory]?.[item.item] || 0;
      if (qty > 0) {
        const itemData = categoryItems.filter((i) => i.item === item.item);
        // Sum up costs for levels 1 to qty
        for (let l = 1; l <= qty; l++) {
          const levelData = itemData.find((i) => i.level === l);
          if (levelData) {
            total += levelData.cost;
          }
        }
      }
    }
    return total;
  }, [data, activeCategory, selections]);

  const resetAll = () => {
    setSelections({});
  };

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

  const currentItems = data[activeCategory] || [];
  const uniqueItems = [...new Set(currentItems.map((i) => i.item))];

  return (
    <div style={{ width: "100%" }}>
      {/* Category Tabs */}
      <div style={{ 
        display: "flex", 
        gap: "6px", 
        flexWrap: "wrap", 
        marginBottom: "20px",
        justifyContent: "center"
      }}>
        {categoryConfig.map((cat) => {
          const hasData = data[cat.id] && data[cat.id].length > 0;
          if (!hasData) return null;
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "8px 14px",
                borderRadius: "10px",
                border: activeCategory === cat.id 
                  ? `1px solid ${cat.color}99` 
                  : "1px solid rgba(255,255,255,0.15)",
                background: activeCategory === cat.id 
                  ? `${cat.color}33` 
                  : "rgba(30, 30, 50, 0.8)",
                color: activeCategory === cat.id ? cat.color : "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 500,
                transition: "all 0.2s",
              }}
            >
              {cat.icon} {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Calculator Table - KTS Style */}
      <div style={{
        background: "linear-gradient(135deg, rgba(88, 28, 135, 0.4), rgba(134, 25, 143, 0.3))",
        borderRadius: "16px",
        border: "1px solid rgba(168, 85, 247, 0.4)",
        overflow: "hidden",
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse",
            fontSize: "0.85rem"
          }}>
            <thead>
              <tr style={{ 
                background: "rgba(0,0,0,0.3)",
                borderBottom: "1px solid rgba(168, 85, 247, 0.3)"
              }}>
                <th style={{ 
                  padding: "12px 16px", 
                  textAlign: "left", 
                  color: "#f0abfc",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Item
                </th>
                <th style={{ 
                  padding: "12px 16px", 
                  textAlign: "center", 
                  color: "#f0abfc",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Level
                </th>
                <th style={{ 
                  padding: "12px 16px", 
                  textAlign: "right", 
                  color: "#f0abfc",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {uniqueItems.map((itemName) => {
                const itemLevels = currentItems
                  .filter((i) => i.item === itemName)
                  .sort((a, b) => a.level - b.level);
                
                const selectedLevel = selections[activeCategory]?.[itemName] || 0;
                
                return (
                  <tr 
                    key={itemName}
                    style={{ 
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: selectedLevel > 0 ? "rgba(168, 85, 247, 0.1)" : "transparent"
                    }}
                  >
                    <td style={{ 
                      padding: "10px 16px", 
                      color: "#fff",
                      fontWeight: 500
                    }}>
                      {itemName}
                    </td>
                    <td style={{ padding: "10px 16px", textAlign: "center" }}>
                      <select
                        value={selectedLevel}
                        onChange={(e) => handleLevelChange(itemName, parseInt(e.target.value))}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "8px",
                          border: "1px solid rgba(168, 85, 247, 0.5)",
                          background: "rgba(30, 30, 50, 0.9)",
                          color: "#fff",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          minWidth: "80px"
                        }}
                      >
                        <option value={0}>-</option>
                        {itemLevels.map((lvl) => (
                          <option key={lvl.level} value={lvl.level}>
                            {lvl.level}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ 
                      padding: "10px 16px", 
                      textAlign: "right",
                      color: selectedLevel > 0 ? "#fff" : "rgba(255,255,255,0.5)",
                      fontFamily: "monospace"
                    }}>
                      {selectedLevel > 0 
                        ? itemLevels
                            .filter((l) => l.level <= selectedLevel)
                            .reduce((sum, l) => sum + l.cost, 0)
                            .toLocaleString()
                        : "-"
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total & Reset */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
        padding: "16px 20px",
        background: "rgba(30, 30, 50, 0.8)",
        borderRadius: "12px",
        border: "1px solid rgba(168, 85, 247, 0.3)"
      }}>
        <button
          onClick={resetAll}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 500,
          }}
        >
          Reset All
        </button>
        
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>
            TOTAL {categoryConfig.find(c => c.id === activeCategory)?.label.toUpperCase()}
          </div>
          <div style={{ 
            fontSize: "1.5rem", 
            fontWeight: 700, 
            color: "#f0abfc",
            fontFamily: "monospace"
          }}>
            {calculateTotal.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
