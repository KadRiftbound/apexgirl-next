'use client';

import { useState, useEffect, useMemo } from "react";

type CalcItem = {
  category: string;
  item: string;
  tier?: string;
  level: number;
  cost: number;
};

const categoryConfig = [
  { id: "Artists", icon: "🎤", color: "#f472b6", label: "Artist EXP" },
  { id: "HQ Glass", icon: "🏢", color: "#22d3ee", label: "HQ Glass" },
  { id: "HQ Floors", icon: "🏗️", color: "#34d399", label: "HQ Floors" },
  { id: "Museum", icon: "🏛️", color: "#c084fc", label: "Museum" },
  { id: "Homemaking", icon: "👗", color: "#f472b6", label: "Homemaking" },
  { id: "Car Core", icon: "🚗", color: "#f87171", label: "Car Core" },
  { id: "Collection Gems", icon: "💎", color: "#fbbf24", label: "Collection Gems" },
  { id: "Car Parts", icon: "🔧", color: "#fb923c", label: "Car Parts" },
  { id: "Assets", icon: "💰", color: "#4ade80", label: "Assets" },
  { id: "Villa Suite", icon: "🏰", color: "#2dd4bf", label: "Villa Suite" },
  { id: "Blueprints", icon: "📐", color: "#818cf8", label: "Blueprints" },
];

const tierCategories = ["HQ Floors", "Museum", "Homemaking", "Car Core"];

export default function ApexCalculator() {
  const [data, setData] = useState<Record<string, CalcItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("HQ Floors");
  const [selectedTier, setSelectedTier] = useState<string>("Floor 1");
  const [selections, setSelections] = useState<Record<string, Record<string, { from: number; to: number }>>>({});

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

  // Get unique tiers for the current category
  const availableTiers = useMemo(() => {
    if (!tierCategories.includes(activeCategory)) return [];
    const items = data[activeCategory] || [];
    const tiers = [...new Set(items.map(i => i.item))];
    return tiers;
  }, [data, activeCategory]);

  // Get levels for the selected tier
  const tierLevels = useMemo(() => {
    if (!selectedTier || !tierCategories.includes(activeCategory)) return [];
    const items = data[activeCategory] || [];
    const tierItems = items.filter(i => i.item === selectedTier);
    return [...new Set(tierItems.map(i => i.level))].sort((a, b) => a - b);
  }, [data, activeCategory, selectedTier]);

  // Auto-select first tier when category changes
  useEffect(() => {
    if (tierCategories.includes(activeCategory) && availableTiers.length > 0 && !selectedTier) {
      setSelectedTier(availableTiers[0]);
    } else if (!tierCategories.includes(activeCategory)) {
      setSelectedTier("");
    }
  }, [activeCategory, availableTiers, selectedTier]);

  const handleLevelChange = (item: string, fromLevel: number, toLevel: number) => {
    setSelections((prev) => ({
      ...prev,
      [activeCategory]: {
        ...(prev[activeCategory] || {}),
        [item]: { from: fromLevel, to: toLevel },
      },
    }));
  };

  const handleTierChange = (tier: string) => {
    setSelectedTier(tier);
    // Clear selections for this category when tier changes
    setSelections((prev) => ({
      ...prev,
      [activeCategory]: {},
    }));
  };

  const calculateItemCost = (category: string, itemName: string, fromLevel: number, toLevel: number, tier?: string) => {
    const categoryItems = data[category] || [];
    let itemLevels = categoryItems.filter((i) => i.item === itemName);
    
    // Filter by tier if this is a tier category
    if (tier && tierCategories.includes(category)) {
      itemLevels = itemLevels.filter(i => i.item === tier);
    }
    
    let total = 0;
    for (let l = fromLevel; l <= toLevel; l++) {
      const levelData = itemLevels.find((i) => i.level === l);
      if (levelData) {
        total += levelData.cost;
      }
    }
    return total;
  };

  const calculateTotal = useMemo(() => {
    const totals: Record<string, number> = {};
    let grandTotal = 0;

    for (const catId of Object.keys(data)) {
      totals[catId] = 0;
      const categoryItems = data[catId] || [];
      
      if (tierCategories.includes(catId)) {
        // For tier categories, calculate based on selected tier
        if (selectedTier) {
          const selection = selections[catId]?.[selectedTier];
          if (selection && selection.to > selection.from) {
            const cost = calculateItemCost(catId, selectedTier, selection.from, selection.to, selectedTier);
            totals[catId] += cost;
            grandTotal += cost;
          }
        }
      } else {
        // For non-tier categories
        const uniqueItems = [...new Set(categoryItems.map((i) => i.item))];
        for (const itemName of uniqueItems) {
          const selection = selections[catId]?.[itemName];
          if (selection && selection.to > selection.from) {
            const cost = calculateItemCost(catId, itemName, selection.from, selection.to);
            totals[catId] += cost;
            grandTotal += cost;
          }
        }
      }
    }

    return { totals, grandTotal };
  }, [data, selections, selectedTier]);

  const resetAll = () => {
    setSelections({});
  };

  const currentItems = data[activeCategory] || [];
  const uniqueItems = [...new Set(currentItems.map((i) => i.item))];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.6)" }}>
        <div style={{ fontSize: "2rem", marginBottom: "12px" }}>⏳</div>
        Loading...
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
                padding: "10px 16px",
                borderRadius: "10px",
                border: activeCategory === cat.id 
                  ? `1px solid ${cat.color}` 
                  : "1px solid rgba(255,255,255,0.15)",
                background: activeCategory === cat.id 
                  ? `${cat.color}22` 
                  : "rgba(20, 20, 35, 0.8)",
                color: activeCategory === cat.id ? cat.color : "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              {cat.icon} {cat.label}
            </button>
          );
        })}
      </div>

      {/* Tier Selector for tier-based categories */}
      {tierCategories.includes(activeCategory) && availableTiers.length > 0 && (
        <div style={{ 
          marginBottom: "20px", 
          display: "flex", 
          alignItems: "center", 
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
            Select:
          </span>
          {availableTiers.map((tier) => (
            <button
              key={tier}
              onClick={() => handleTierChange(tier)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: selectedTier === tier 
                  ? "1px solid #f472b6" 
                  : "1px solid rgba(255,255,255,0.15)",
                background: selectedTier === tier 
                  ? "rgba(244, 114, 182, 0.2)" 
                  : "rgba(30, 30, 50, 0.8)",
                color: selectedTier === tier ? "#fff" : "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                transition: "all 0.2s"
              }}
            >
              {tier}
            </button>
          ))}
        </div>
      )}

      {/* Calculator Table */}
      <div style={{
        background: "rgba(20, 20, 35, 0.8)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        overflow: "hidden",
      }}>
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse",
          fontSize: "0.9rem"
        }}>
          <thead>
            <tr style={{ 
              background: "rgba(0,0,0,0.3)",
              borderBottom: "1px solid rgba(255,255,255,0.1)"
            }}>
              <th style={{ 
                padding: "14px 16px", 
                textAlign: "left", 
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Item
              </th>
              <th style={{ 
                padding: "14px 16px", 
                textAlign: "center", 
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                From
              </th>
              <th style={{ 
                padding: "14px 16px", 
                textAlign: "center", 
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                To
              </th>
              <th style={{ 
                padding: "14px 16px", 
                textAlign: "right", 
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {tierCategories.includes(activeCategory) && selectedTier ? (
              // Show levels for selected tier
              tierLevels.map((level) => {
                const itemData = currentItems.find(i => i.item === selectedTier && i.level === level);
                const selection = selections[activeCategory]?.[selectedTier];
                const fromLevel = selection?.from || 1;
                const toLevel = selection?.to || 1;
                const hasSelection = level >= fromLevel && level <= toLevel && toLevel >= fromLevel;
                
                return (
                  <tr 
                    key={`${selectedTier}-${level}`}
                    style={{ 
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: hasSelection ? "rgba(244, 114, 182, 0.15)" : "transparent"
                    }}
                  >
                    <td style={{ 
                      padding: "12px 16px", 
                      color: "#fff",
                      fontWeight: 500
                    }}>
                      Level {level}
                    </td>
                    <td colSpan={2} style={{ padding: "12px 8px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                      {itemData ? itemData.cost.toLocaleString() : "-"}
                    </td>
                    <td style={{ 
                      padding: "12px 16px", 
                      textAlign: "right",
                      color: hasSelection ? "#f472b6" : "rgba(255,255,255,0.4)",
                      fontWeight: hasSelection ? 600 : 400,
                      fontFamily: "monospace",
                      fontSize: "0.95rem"
                    }}>
                      {hasSelection && itemData ? itemData.cost.toLocaleString() : "-"}
                    </td>
                  </tr>
                );
              })
            ) : (
              // Non-tier categories
              uniqueItems.map((itemName) => {
                const itemLevels = currentItems
                  .filter((i) => i.item === itemName)
                  .sort((a, b) => a.level - b.level);
                
                const selection = selections[activeCategory]?.[itemName];
                const fromLevel = selection?.from || 1;
                const toLevel = selection?.to || 1;
                const hasSelection = toLevel > fromLevel;
                
                return (
                  <tr 
                    key={itemName}
                    style={{ 
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: hasSelection ? "rgba(244, 114, 182, 0.1)" : "transparent"
                    }}
                  >
                    <td style={{ 
                      padding: "12px 16px", 
                      color: "#fff",
                      fontWeight: 500
                    }}>
                      {itemName}
                    </td>
                    <td style={{ padding: "12px 8px", textAlign: "center" }}>
                      <select
                        value={fromLevel}
                        onChange={(e) => handleLevelChange(itemName, parseInt(e.target.value), toLevel)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "1px solid rgba(255,255,255,0.2)",
                          background: "rgba(30, 30, 50, 0.9)",
                          color: "#fff",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          width: "80px"
                        }}
                      >
                        <option value={1}>1</option>
                        {itemLevels.map((lvl) => (
                          <option key={lvl.level} value={lvl.level}>
                            {lvl.level}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: "12px 8px", textAlign: "center" }}>
                      <select
                        value={toLevel}
                        onChange={(e) => handleLevelChange(itemName, fromLevel, parseInt(e.target.value))}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: hasSelection ? "1px solid #f472b6" : "1px solid rgba(255,255,255,0.2)",
                          background: "rgba(30, 30, 50, 0.9)",
                          color: hasSelection ? "#fff" : "rgba(255,255,255,0.5)",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          width: "80px"
                        }}
                      >
                        <option value={1}>-</option>
                        {itemLevels.map((lvl) => (
                          <option key={lvl.level} value={lvl.level}>
                            {lvl.level}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ 
                      padding: "12px 16px", 
                      textAlign: "right",
                      color: hasSelection ? "#f472b6" : "rgba(255,255,255,0.4)",
                      fontWeight: hasSelection ? 600 : 400,
                      fontFamily: "monospace",
                      fontSize: "0.95rem"
                    }}>
                      {hasSelection 
                        ? calculateItemCost(activeCategory, itemName, fromLevel, toLevel).toLocaleString()
                        : "-"
                      }
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div style={{
        marginTop: "24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "12px"
      }}>
        {categoryConfig.map((cat) => {
          const hasData = data[cat.id] && data[cat.id].length > 0;
          if (!hasData) return null;
          
          const total = calculateTotal.totals[cat.id] || 0;
          const isActive = activeCategory === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: isActive ? `1px solid ${cat.color}` : "1px solid rgba(255,255,255,0.1)",
                background: isActive ? `${cat.color}15` : "rgba(20, 20, 35, 0.6)",
                color: total > 0 ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 500,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.2s"
              }}
            >
              <span style={{ opacity: 0.7, fontSize: "1.1rem" }}>{cat.icon}</span>
              <span>{cat.label}</span>
              <span style={{ 
                fontFamily: "monospace", 
                color: total > 0 ? cat.color : "inherit",
                fontWeight: 600,
                fontSize: "0.9rem"
              }}>
                {total > 0 ? total.toLocaleString() : "-"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Total & Reset */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "24px",
        padding: "20px 24px",
        background: "linear-gradient(135deg, rgba(244, 114, 182, 0.15), rgba(168, 85, 247, 0.15))",
        borderRadius: "16px",
        border: "1px solid rgba(244, 114, 182, 0.3)"
      }}>
        <button
          onClick={resetAll}
          style={{
            padding: "12px 24px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: 600,
            transition: "all 0.2s"
          }}
        >
          ↺ Reset All
        </button>
        
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Grand Total
          </div>
          <div style={{ 
            fontSize: "1.75rem", 
            fontWeight: 700, 
            color: "#f472b6",
            fontFamily: "monospace"
          }}>
            {calculateTotal.grandTotal.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
