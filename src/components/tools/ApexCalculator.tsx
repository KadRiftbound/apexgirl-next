'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type CalcItem = {
  category: string;
  item: string;
  tier?: string;
  level: number;
  cost: number;
};

const translations: Record<string, any> = {
  fr: {
    selectCategory: "Catégorie",
    selectTier: "Sélectionner Tier",
    fromLevel: "Niveau départ",
    toLevel: "Niveau final",
    totalCost: "Coût total",
    costBreakdown: "Détail des coûts",
    level: "Niveau",
    resources: "Ressources",
  },
  en: {
    selectCategory: "Category",
    selectTier: "Select Tier",
    fromLevel: "From Level",
    toLevel: "To Level",
    totalCost: "Total Cost",
    costBreakdown: "Cost Breakdown",
    level: "Level",
    resources: "Resources",
  },
  it: {
    selectCategory: "Categoria",
    selectTier: "Seleziona Tier",
    fromLevel: "Da Livello",
    toLevel: "A Livello",
    totalCost: "Costo Totale",
    costBreakdown: "Dettaglio Costi",
    level: "Livello",
    resources: "Risorse",
  },
  es: {
    selectCategory: "Categoría",
    selectTier: "Seleccionar Tier",
    fromLevel: "Desde Nivel",
    toLevel: "Hasta Nivel",
    totalCost: "Costo Total",
    costBreakdown: "Desglose de Costos",
    level: "Nivel",
    resources: "Recursos",
  },
  pt: {
    selectCategory: "Categoria",
    selectTier: "Selecionar Tier",
    fromLevel: "Do Nível",
    toLevel: "Até Nível",
    totalCost: "Custo Total",
    costBreakdown: "Detalhamento de Custos",
    level: "Nível",
    resources: "Recursos",
  },
  pl: {
    selectCategory: "Kategoria",
    selectTier: "Wybierz Tier",
    fromLevel: "Z Poziomu",
    toLevel: "Do Poziomu",
    totalCost: "Łączny Koszt",
    costBreakdown: "Szczegółowy Koszt",
    level: "Poziom",
    resources: "Zasoby",
  },
  id: {
    selectCategory: "Kategori",
    selectTier: "Pilih Tier",
    fromLevel: "Dari Level",
    toLevel: "Ke Level",
    totalCost: "Total Biaya",
    costBreakdown: "Rincian Biaya",
    level: "Level",
    resources: "Sumber Daya",
  },
  ru: {
    selectCategory: "Категория",
    selectTier: "Выбрать Тир",
    fromLevel: "С Уровня",
    toLevel: "По Уровень",
    totalCost: "Общая Стоимость",
    costBreakdown: "Детализация Стоимости",
    level: "Уровень",
    resources: "Ресурсы",
  },
};

const tierResources: Record<string, Record<string, string>> = {
  "HQ Floors": {
    "Floor 1": "Wood + Steel",
    "Floor 2": "Wood + Steel",
    "Floor 3": "Wood + Steel",
    "Floor 4": "Wood + Steel",
    "Floor 5": "Wood + Steel",
  },
  "Museum": {
    "Room 1": "Sandstone + Tile",
    "Room 2": "Sandstone + Tile",
    "Room 3": "Sandstone + Tile",
    "Room 4": "Sandstone + Tile",
    "Room 5": "Sandstone + Tile",
  },
  "Homemaking": {
    "Tier 1": "HQ Tile + HQ Sandstone",
    "Tier 2": "HQ Tile + HQ Sandstone",
    "Tier 3": "HQ Tile + HQ Sandstone",
    "Tier 4": "HQ Tile + HQ Sandstone",
    "Tier 5": "HQ Tile + HQ Sandstone",
  },
  "Car Core": {
    "D Grade": "Plug + Coil",
    "C": "Plug + Coil",
    "B": "Plug + Coil",
    "A": "Plug + Coil",
    "A+": "Plug + Coil",
  },
};

const categoryConfig = [
  { id: "HQ Floors", label: "HQ Floors", tiers: ["Floor 1", "Floor 2", "Floor 3", "Floor 4", "Floor 5"] },
  { id: "Museum", label: "Museum", tiers: ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"] },
  { id: "Homemaking", label: "Homemaking", tiers: ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"] },
  { id: "Car Core", label: "Car Core", tiers: ["D Grade", "C", "B", "A", "A+"] },
  { id: "Artists", label: "Artist EXP" },
  { id: "HQ Glass", label: "HQ Glass" },
  { id: "Collection Gems", label: "Collection Gems" },
  { id: "Assets", label: "Assets" },
  { id: "Blueprints", label: "Blueprints" },
  { id: "Car Parts", label: "Car Parts" },
];

export default function ApexCalculator() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = translations[lang] || translations.en;

  const [data, setData] = useState<Record<string, CalcItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("HQ Floors");
  const [selectedTier, setSelectedTier] = useState("Floor 1");
  const [fromLevel, setFromLevel] = useState(1);
  const [toLevel, setToLevel] = useState(60);

  useEffect(() => {
    fetch("/api/calculator")
      .then((res) => res.json())
      .then((result) => {
        if (result.error) throw new Error(result.error);
        setData(result);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const currentConfig = categoryConfig.find((c) => c.id === activeCategory);
  const hasTiers = currentConfig && "tiers" in currentConfig;
  const tierResourceLabel = hasTiers ? tierResources[activeCategory]?.[selectedTier] : null;

  const calculateCost = () => {
    const items = data[activeCategory] || [];
    let filteredItems = items;

    if (hasTiers && selectedTier) {
      filteredItems = items.filter((i) => i.item === selectedTier);
    }

    let total = 0;
    for (let l = fromLevel; l <= toLevel; l++) {
      const item = filteredItems.find((i) => i.level === l);
      if (item) total += item.cost;
    }
    return total;
  };

  const getLevelCosts = () => {
    const items = data[activeCategory] || [];
    let filteredItems = items;

    if (hasTiers && selectedTier) {
      filteredItems = items.filter((i) => i.item === selectedTier);
    }

    return filteredItems
      .filter((item) => item.level >= fromLevel && item.level <= toLevel)
      .sort((a, b) => a.level - b.level);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "#fff" }}>
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
    <div style={{ width: "100%", color: "#fff" }}>
      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {categoryConfig.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              if ("tiers" in cat && cat.tiers) {
                setSelectedTier(cat.tiers[0]);
              }
              setFromLevel(1);
              setToLevel(60);
            }}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border:
                activeCategory === cat.id ? "1px solid #f472b6" : "1px solid #374151",
              background:
                activeCategory === cat.id
                  ? "linear-gradient(135deg, #ec4899, #a855f7)"
                  : "#1f2937",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tier Selector */}
      {hasTiers && currentConfig && "tiers" in currentConfig && (
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.selectTier}:</span>
          {(currentConfig.tiers || []).map((tier: string) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: selectedTier === tier ? "1px solid #f472b6" : "1px solid #374151",
                background: selectedTier === tier ? "rgba(244, 114, 182, 0.2)" : "#1f2937",
                color: "#fff",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 500,
              }}
            >
              {tier}
            </button>
          ))}
        </div>
      )}

      {/* Resource Type Display */}
      {tierResourceLabel && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            padding: "12px",
            background: "rgba(139, 92, 246, 0.15)",
            borderRadius: "8px",
            border: "1px solid rgba(139, 92, 246, 0.3)",
          }}
        >
          <span style={{ color: "#a78bfa", fontSize: "0.9rem" }}>
            {t.resources}: <strong style={{ color: "#fff" }}>{tierResourceLabel}</strong>
          </span>
        </div>
      )}

      {/* Level Inputs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          justifyContent: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.fromLevel}:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={fromLevel}
            onChange={(e) => setFromLevel(parseInt(e.target.value) || 1)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #374151",
              background: "#1f2937",
              color: "#fff",
              width: "70px",
              fontSize: "0.9rem",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.toLevel}:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={toLevel}
            onChange={(e) => setToLevel(parseInt(e.target.value) || 1)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #374151",
              background: "#1f2937",
              color: "#fff",
              width: "70px",
              fontSize: "0.9rem",
            }}
          />
        </div>
      </div>

      {/* Result */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))",
          borderRadius: "12px",
          border: "1px solid rgba(244, 114, 182, 0.3)",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            fontSize: "0.8rem",
            color: "#9ca3af",
            marginBottom: "4px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {t.totalCost}
        </div>
        <div style={{ fontSize: "2rem", fontWeight: 700, color: "#f472b6", fontFamily: "monospace" }}>
          {calculateCost().toLocaleString()}
        </div>
      </div>

      {/* Cost breakdown table */}
      <div style={{ marginTop: "24px" }}>
        <h3
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "12px",
            color: "#fff",
          }}
        >
          {t.costBreakdown}
        </h3>
        <div
          style={{
            background: "#1f2937",
            borderRadius: "8px",
            border: "1px solid #374151",
            maxHeight: "350px",
            overflowY: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead style={{ position: "sticky", top: 0, background: "#111827" }}>
              <tr>
                <th
                  style={{
                    padding: "10px 12px",
                    textAlign: "left",
                    color: "#9ca3af",
                    fontWeight: 600,
                    borderBottom: "1px solid #374151",
                  }}
                >
                  {t.level}
                </th>
                <th
                  style={{
                    padding: "10px 12px",
                    textAlign: "right",
                    color: "#9ca3af",
                    fontWeight: 600,
                    borderBottom: "1px solid #374151",
                  }}
                >
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {getLevelCosts().map((item) => (
                <tr key={item.level} style={{ borderBottom: "1px solid #374151" }}>
                  <td style={{ padding: "8px 12px", color: "#fff" }}>Level {item.level}</td>
                  <td
                    style={{
                      padding: "8px 12px",
                      textAlign: "right",
                      color: "#f472b6",
                      fontFamily: "monospace",
                    }}
                  >
                    {item.cost.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
