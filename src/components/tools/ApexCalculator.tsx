'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type CalcItem = {
  category: string;
  item: string;
  tier?: string;
  level: number;
  resources: Record<string, number>;
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
    resource: "Ressource",
  },
  en: {
    selectCategory: "Category",
    selectTier: "Select Tier",
    fromLevel: "From Level",
    toLevel: "To Level",
    totalCost: "Total",
    costBreakdown: "Cost Breakdown",
    level: "Level",
    resources: "Resources",
    resource: "Resource",
  },
  it: {
    selectCategory: "Categoria",
    selectTier: "Seleziona Tier",
    fromLevel: "Da Livello",
    toLevel: "A Livello",
    totalCost: "Totale",
    costBreakdown: "Dettaglio Costi",
    level: "Livello",
    resources: "Risorse",
    resource: "Risorsa",
  },
  es: {
    selectCategory: "Categoría",
    selectTier: "Seleccionar Tier",
    fromLevel: "Desde Nivel",
    toLevel: "Hasta Nivel",
    totalCost: "Total",
    costBreakdown: "Desglose de Costos",
    level: "Nivel",
    resources: "Recursos",
    resource: "Recurso",
  },
  pt: {
    selectCategory: "Categoria",
    selectTier: "Selecionar Tier",
    fromLevel: "Do Nível",
    toLevel: "Até Nível",
    totalCost: "Total",
    costBreakdown: "Detalhamento",
    level: "Nível",
    resources: "Recursos",
    resource: "Recurso",
  },
  pl: {
    selectCategory: "Kategoria",
    selectTier: "Wybierz Tier",
    fromLevel: "Z Poziomu",
    toLevel: "Do Poziomu",
    totalCost: "Łącznie",
    costBreakdown: "Szczegóły",
    level: "Poziom",
    resources: "Zasoby",
    resource: "Zasób",
  },
  id: {
    selectCategory: "Kategori",
    selectTier: "Pilih Tier",
    fromLevel: "Dari Level",
    toLevel: "Ke Level",
    totalCost: "Total",
    costBreakdown: "Rincian",
    level: "Level",
    resources: "Sumber Daya",
    resource: "Sumber",
  },
  ru: {
    selectCategory: "Категория",
    selectTier: "Выбрать Тир",
    fromLevel: "С Уровня",
    toLevel: "По Уровень",
    totalCost: "Итого",
    costBreakdown: "Детализация",
    level: "Уровень",
    resources: "Ресурсы",
    resource: "Ресурс",
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

  const getFilteredItems = () => {
    const items = data[activeCategory] || [];
    if (hasTiers && selectedTier) {
      return items.filter((i) => i.item === selectedTier);
    }
    return items;
  };

  const calculateTotals = () => {
    const items = getFilteredItems().filter((i) => i.level >= fromLevel && i.level <= toLevel);
    const totals: Record<string, number> = {};
    
    for (const item of items) {
      for (const [resource, cost] of Object.entries(item.resources)) {
        totals[resource] = (totals[resource] || 0) + cost;
      }
    }
    return totals;
  };

  const getResourceBreakdown = () => {
    const items = getFilteredItems().filter((i) => i.level >= fromLevel && i.level <= toLevel);
    const breakdown: Record<string, { level: number; cost: number }[]> = {};
    
    for (const item of items) {
      for (const [resource, cost] of Object.entries(item.resources)) {
        if (!breakdown[resource]) breakdown[resource] = [];
        breakdown[resource].push({ level: item.level, cost });
      }
    }
    return breakdown;
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "60px", color: "#fff" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "60px", color: "#f87171" }}>Error: {error}</div>;
  }

  const totals = calculateTotals();
  const breakdown = getResourceBreakdown();
  const grandTotal = Object.values(totals).reduce((sum, val) => sum + val, 0);

  return (
    <div style={{ width: "100%", color: "#fff" }}>
      {/* Category Tabs */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {categoryConfig.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              if ("tiers" in cat && cat.tiers) setSelectedTier(cat.tiers[0]);
              setFromLevel(1);
              setToLevel(60);
            }}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: activeCategory === cat.id ? "1px solid #f472b6" : "1px solid #374151",
              background: activeCategory === cat.id ? "linear-gradient(135deg, #ec4899, #a855f7)" : "#1f2937",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tier Selector */}
      {hasTiers && currentConfig && "tiers" in currentConfig && (
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
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
              }}
            >
              {tier}
            </button>
          ))}
        </div>
      )}

      {/* Level Inputs */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", marginBottom: "24px", flexWrap: "wrap" }}>
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

      {/* Totals by Resource Type */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "8px", textTransform: "uppercase" }}>{t.totalCost}</div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          {Object.entries(totals).map(([resource, total]) => (
            <div key={resource} style={{ textAlign: "center", padding: "12px 20px", background: "#374151", borderRadius: "8px", minWidth: "100px" }}>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "4px" }}>{resource}</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f472b6", fontFamily: "monospace" }}>{total.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Breakdown by Type */}
      {Object.entries(breakdown).map(([resource, levels]) => {
        const resourceTotal = Object.values(levels).reduce((sum, l) => sum + l.cost, 0);
        return (
          <div key={resource} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#374151", borderRadius: "8px 8px 0 0" }}>
              <span style={{ fontWeight: 600, color: "#fff" }}>{resource}</span>
              <span style={{ fontFamily: "monospace", color: "#f472b6", fontWeight: 600 }}>{resourceTotal.toLocaleString()}</span>
            </div>
            <div style={{ background: "#1f2937", borderRadius: "0 0 8px 8px", border: "1px solid #374151", borderTop: "none", maxHeight: "200px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                <tbody>
                  {levels.sort((a, b) => a.level - b.level).map((lvl) => (
                    <tr key={lvl.level} style={{ borderBottom: "1px solid #374151" }}>
                      <td style={{ padding: "6px 12px", color: "#9ca3af" }}>Level {lvl.level}</td>
                      <td style={{ padding: "6px 12px", textAlign: "right", color: "#fff", fontFamily: "monospace" }}>{lvl.cost.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
