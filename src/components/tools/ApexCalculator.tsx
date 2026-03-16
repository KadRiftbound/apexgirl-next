'use client';

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

type CalcItem = {
  category: string;
  item: string;
  tier?: string;
  level: number;
  resources: Record<string, number>;
};

type GirlMultiplier = {
  name: string;
  extraPercent: number;
  genre: string;
  season: string;
};

type ArtistPromotion = {
  levels: string;
  exp: number;
  promoCards: number;
  expAccum: number;
  promoCardsAccum: number;
};

type AssetPromotion = {
  level: number;
  newMaxLevel: number;
  assetsRequired: number;
};

type BlueprintData = {
  tiers: Record<string, number[]>;
  tierTotals: Record<string, number>;
};

type CarPartEntry = {
  rank: string;
  stars: string;
  phases: (number | null)[];
  totalPerPart: number;
  allFourParts: number;
};

type CarDrawingEntry = {
  rank: string;
  stars: string;
  drawings: number;
};

type VillaEntry = {
  villa: string;
  hammers: number;
  goldHammers: number;
  stages: number;
  droidsPerStage: number;
  droidsPerRoom: number;
  droidsAll4: number;
};

type VillaDraftEntry = {
  villa: string;
  hammers: number;
  goldHammers: number;
  drafts: number;
};

type ApiData = {
  "HQ Glass"?: CalcItem[];
  "Collection Gems"?: CalcItem[];
  "Artists"?: CalcItem[];
  "HQ Floors"?: CalcItem[];
  "Museum"?: CalcItem[];
  "Homemaking"?: CalcItem[];
  "Car Core"?: CalcItem[];
  "Assets"?: CalcItem[];
  "Others"?: CalcItem[];
  artistGirlMultipliers?: GirlMultiplier[];
  artistPromotions?: ArtistPromotion[];
  assetPromotions?: AssetPromotion[];
  blueprintData?: BlueprintData;
  carPartsData?: { parts: CarPartEntry[]; drawings: CarDrawingEntry[] };
  villaData?: { entries: VillaEntry[]; drafts: VillaDraftEntry[] };
};

const translations: Record<string, Record<string, string>> = {
  fr: {
    selectCategory: "Catégorie",
    selectTier: "Sélectionner Tier",
    fromLevel: "Niveau départ",
    toLevel: "Niveau final",
    totalCost: "Coût total",
    level: "Niveau",
    resource: "Ressource",
    selectGirl: "Fille",
    from: "De",
    to: "À",
  },
  en: {
    selectCategory: "Category",
    selectTier: "Select Tier",
    fromLevel: "From Level",
    toLevel: "To Level",
    totalCost: "Total",
    level: "Level",
    resource: "Resource",
    selectGirl: "Girl",
    from: "From",
    to: "To",
  },
  it: {
    selectCategory: "Categoria",
    selectTier: "Seleziona Tier",
    fromLevel: "Da Livello",
    toLevel: "A Livello",
    totalCost: "Totale",
    level: "Livello",
    resource: "Risorsa",
    selectGirl: "Ragazza",
    from: "Da",
    to: "A",
  },
  es: {
    selectCategory: "Categoría",
    selectTier: "Seleccionar Tier",
    fromLevel: "Desde Nivel",
    toLevel: "Hasta Nivel",
    totalCost: "Total",
    level: "Nivel",
    resource: "Recurso",
    selectGirl: "Chica",
    from: "Desde",
    to: "Hasta",
  },
  pt: {
    selectCategory: "Categoria",
    selectTier: "Selecionar Tier",
    fromLevel: "Do Nível",
    toLevel: "Até Nível",
    totalCost: "Total",
    level: "Nível",
    resource: "Recurso",
    selectGirl: "Garota",
    from: "De",
    to: "Até",
  },
  pl: {
    selectCategory: "Kategoria",
    selectTier: "Wybierz Tier",
    fromLevel: "Z Poziomu",
    toLevel: "Do Poziomu",
    totalCost: "Łącznie",
    level: "Poziom",
    resource: "Zasób",
    selectGirl: "Dziewczyna",
    from: "Od",
    to: "Do",
  },
  id: {
    selectCategory: "Kategori",
    selectTier: "Pilih Tier",
    fromLevel: "Dari Level",
    toLevel: "Ke Level",
    totalCost: "Total",
    level: "Level",
    resource: "Sumber",
    selectGirl: "Girl",
    from: "Dari",
    to: "Ke",
  },
  ru: {
    selectCategory: "Категория",
    selectTier: "Выбрать Тир",
    fromLevel: "С Уровня",
    toLevel: "По Уровень",
    totalCost: "Итого",
    level: "Уровень",
    resource: "Ресурс",
    selectGirl: "Девушка",
    from: "От",
    to: "До",
  },
};

type CategoryConfig = {
  id: string;
  label: string;
  maxLevel?: number;
  tiers?: string[];
  assetTypes?: string[];
  mode?: "levels" | "blueprints" | "carparts" | "villa";
};

const categoryConfig: CategoryConfig[] = [
  { id: "HQ Floors", label: "HQ Floors", maxLevel: 60, tiers: ["Floor 1", "Floor 2", "Floor 3", "Floor 4", "Floor 5"] },
  { id: "Museum", label: "Museum", maxLevel: 60, tiers: ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"] },
  { id: "Homemaking", label: "Homemaking", maxLevel: 60, tiers: ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"] },
  { id: "Car Core", label: "Car Core", maxLevel: 60, tiers: ["D Grade", "C", "B", "A", "A+", "S"] },
  { id: "Artists", label: "Artist EXP", maxLevel: 160 },
  { id: "HQ Glass", label: "HQ Glass", maxLevel: 499 },
  { id: "Collection Gems", label: "Collection Gems", maxLevel: 49 },
  { id: "Assets", label: "Assets", maxLevel: 75, tiers: ["Jewelry", "Car", "Property"], assetTypes: ["Basic Gold", "Abroad Adventures", "Auction"] },
  { id: "Blueprints", label: "Blueprints", mode: "blueprints" },
  { id: "Car Parts", label: "Car Parts", mode: "carparts" },
  { id: "Villa Suite", label: "Villa", mode: "villa" },
  { id: "Others", label: "Others", maxLevel: 15, tiers: ["HQ Building Cards", "Business Building Gold"] },
];

const btnBase: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #374151",
  background: "#1f2937",
  color: "#fff",
  width: "70px",
  fontSize: "0.9rem",
};

const selectStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #374151",
  background: "#1f2937",
  color: "#fff",
  fontSize: "0.85rem",
  cursor: "pointer",
};

function formatRankStars(rank: string, stars: string): string {
  const s = stars === "0" ? "" : stars;
  return `${rank}${s}`;
}

export default function ApexCalculator() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = translations[lang] || translations.en;

  const [data, setData] = useState<ApiData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("HQ Floors");
  const [selectedTier, setSelectedTier] = useState("Floor 1");
  const [selectedAssetType, setSelectedAssetType] = useState("Basic Gold");
  const [fromLevel, setFromLevel] = useState(1);
  const [toLevel, setToLevel] = useState(60);
  const [selectedGirl, setSelectedGirl] = useState("");

  // Blueprints state
  const [bpFromTier, setBpFromTier] = useState("Tier 1");
  const [bpFromStep, setBpFromStep] = useState(0);
  const [bpToTier, setBpToTier] = useState("Tier 1");
  const [bpToStep, setBpToStep] = useState(0);

  // Car Parts state
  const [cpFromIdx, setCpFromIdx] = useState(0);
  const [cpToIdx, setCpToIdx] = useState(0);

  // Villa state
  const [villaFromIdx, setVillaFromIdx] = useState(0);
  const [villaToIdx, setVillaToIdx] = useState(0);

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
  const hasTiers = currentConfig?.tiers && currentConfig.tiers.length > 0;
  const hasAssetTypes = currentConfig?.assetTypes && currentConfig.assetTypes.length > 0;
  const maxLevel = currentConfig?.maxLevel || 100;
  const mode = currentConfig?.mode || "levels";

  // Girl multiplier for artists
  const girlMultipliers = (data.artistGirlMultipliers || []) as GirlMultiplier[];
  const artistPromotions = (data.artistPromotions || []) as ArtistPromotion[];
  const currentGirl = girlMultipliers.find(g => g.name === selectedGirl);
  const girlMultiplier = currentGirl ? 1 + currentGirl.extraPercent : 1;

  // Blueprint data
  const blueprintData = data.blueprintData as BlueprintData | undefined;
  const bpTierNames = blueprintData ? Object.keys(blueprintData.tiers) : [];

  // Car parts data
  const carPartsData = data.carPartsData as { parts: CarPartEntry[]; drawings: CarDrawingEntry[] } | undefined;
  const cpOptions = useMemo(() => {
    if (!carPartsData) return [];
    return carPartsData.parts.map((p, idx) => ({
      idx,
      label: formatRankStars(p.rank, p.stars),
      ...p
    }));
  }, [carPartsData]);

  // Villa data
  const villaData = data.villaData as { entries: VillaEntry[]; drafts: VillaDraftEntry[] } | undefined;
  const villaOptions = useMemo(() => {
    if (!villaData) return [];
    return villaData.entries.map((e, idx) => ({
      idx,
      label: `${e.villa}-${e.goldHammers}`,
      ...e
    }));
  }, [villaData]);

  // Calculate for level-based categories
  const calculateLevelTotals = () => {
    const categoryKey = activeCategory === "Others" ? "Others" : activeCategory;
    const items = (data[categoryKey as keyof ApiData] as CalcItem[] | undefined) || [];
    let filtered = items;

    if (hasTiers && selectedTier) {
      filtered = filtered.filter((i) => i.item === selectedTier);
    }
    if (hasAssetTypes && selectedAssetType) {
      filtered = filtered.filter((i) => i.tier === selectedAssetType);
    }

    filtered = filtered.filter((i) => i.level >= fromLevel && i.level < toLevel);

    const totals: Record<string, number> = {};
    for (const item of filtered) {
      for (const [resource, cost] of Object.entries(item.resources)) {
        let adjustedCost = cost;
        if (activeCategory === "Artists" && resource === "EXP") {
          adjustedCost = Math.ceil(cost * girlMultiplier);
        }
        totals[resource] = (totals[resource] || 0) + adjustedCost;
      }
    }

    // For Artists, also calculate promotion cards in the range
    // User range is [fromLevel, toLevel) — i.e., levels fromLevel..toLevel-1
    // Promo ranges are inclusive: "N1 to N2" covers levels N1..N2
    if (activeCategory === "Artists") {
      const userEnd = toLevel - 1; // inclusive end of user range
      let promoTotal = 0;
      for (const promo of artistPromotions) {
        const match = promo.levels.match(/(\d+)\s*to\s*(\d+)/);
        if (!match) continue;
        const rangeStart = parseInt(match[1]);
        const rangeEnd = parseInt(match[2]);
        const overlapStart = Math.max(rangeStart, fromLevel);
        const overlapEnd = Math.min(rangeEnd, userEnd);
        if (overlapEnd >= overlapStart) {
          const rangeSize = rangeEnd - rangeStart + 1;
          const overlapSize = overlapEnd - overlapStart + 1;
          promoTotal += Math.round(promo.promoCards * (overlapSize / rangeSize));
        }
      }
      if (promoTotal > 0) {
        totals["Promotion Cards"] = promoTotal;
      }
    }

    // For Assets, also calculate promotion costs
    if (activeCategory === "Assets" && data.assetPromotions) {
      const promos = data.assetPromotions as AssetPromotion[];
      let extraAssets = 0;
      for (const p of promos) {
        if (p.level >= fromLevel && p.level < toLevel) {
          extraAssets += p.assetsRequired;
        }
      }
      if (extraAssets > 0) {
        totals["Extra Assets"] = extraAssets;
      }
    }

    return totals;
  };

  // Calculate for blueprints
  const calculateBlueprintTotals = () => {
    if (!blueprintData) return {};
    const tiers = blueprintData.tiers;
    let total = 0;

    const fromTierIdx = bpTierNames.indexOf(bpFromTier);
    const toTierIdx = bpTierNames.indexOf(bpToTier);

    for (let ti = fromTierIdx; ti <= toTierIdx; ti++) {
      const tierName = bpTierNames[ti];
      const steps = tiers[tierName] || [];
      const startStep = ti === fromTierIdx ? bpFromStep : 0;
      const endStep = ti === toTierIdx ? bpToStep : steps.length - 1;

      for (let si = startStep; si <= endStep && si < steps.length; si++) {
        total += steps[si];
      }
    }

    return { Blueprints: total };
  };

  // Calculate for car parts
  const calculateCarPartsTotals = () => {
    if (!carPartsData) return {};
    let totalParts = 0;
    let totalDrawings = 0;

    const fromI = Math.min(cpFromIdx, cpToIdx);
    const toI = Math.max(cpFromIdx, cpToIdx);

    for (let i = fromI; i < toI; i++) {
      if (i < carPartsData.parts.length) {
        totalParts += carPartsData.parts[i].allFourParts;
      }
      if (i < carPartsData.drawings.length) {
        totalDrawings += carPartsData.drawings[i].drawings;
      }
    }

    const result: Record<string, number> = {};
    if (totalParts > 0) result["Car Parts"] = totalParts;
    if (totalDrawings > 0) result["Advance Drawings"] = totalDrawings;
    return result;
  };

  // Calculate for villa
  const calculateVillaTotals = () => {
    if (!villaData) return {};
    let totalDrones = 0;
    let totalDrafts = 0;

    const fromI = Math.min(villaFromIdx, villaToIdx);
    const toI = Math.max(villaFromIdx, villaToIdx);

    for (let i = fromI; i < toI; i++) {
      if (i < villaData.entries.length) {
        totalDrones += villaData.entries[i].droidsAll4;
      }
      if (i < villaData.drafts.length) {
        totalDrafts += villaData.drafts[i].drafts;
      }
    }

    const result: Record<string, number> = {};
    if (totalDrones > 0) result["Drones"] = totalDrones;
    if (totalDrafts > 0) result["Design Drafts"] = totalDrafts;
    return result;
  };

  const getTotals = () => {
    switch (mode) {
      case "blueprints": return calculateBlueprintTotals();
      case "carparts": return calculateCarPartsTotals();
      case "villa": return calculateVillaTotals();
      default: return calculateLevelTotals();
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "60px", color: "#fff" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "60px", color: "#f87171" }}>Error: {error}</div>;
  }

  const totals = getTotals();

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const config = categoryConfig.find(c => c.id === catId);
    if (config?.tiers) setSelectedTier(config.tiers[0]);
    if (config?.assetTypes) setSelectedAssetType(config.assetTypes[0]);
    setFromLevel(1);
    setToLevel(config?.maxLevel || 60);
    if (catId === "Artists" && girlMultipliers.length > 0 && !selectedGirl) {
      setSelectedGirl(girlMultipliers[0].name);
    }
  };

  return (
    <div style={{ width: "100%", color: "#fff" }}>
      {/* Category Tabs */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {categoryConfig.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            style={{
              ...btnBase,
              border: activeCategory === cat.id ? "1px solid #f472b6" : "1px solid #374151",
              background: activeCategory === cat.id ? "linear-gradient(135deg, #ec4899, #a855f7)" : "#1f2937",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tier Selector */}
      {hasTiers && currentConfig && (
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.selectTier}:</span>
          {(currentConfig.tiers || []).map((tier: string) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              style={{
                ...btnBase,
                padding: "6px 12px",
                border: selectedTier === tier ? "1px solid #f472b6" : "1px solid #374151",
                background: selectedTier === tier ? "rgba(244, 114, 182, 0.2)" : "#1f2937",
              }}
            >
              {tier}
            </button>
          ))}
        </div>
      )}

      {/* Asset Type Selector */}
      {hasAssetTypes && currentConfig && (
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Type:</span>
          {(currentConfig.assetTypes || []).map((type: string) => (
            <button
              key={type}
              onClick={() => setSelectedAssetType(type)}
              style={{
                ...btnBase,
                padding: "6px 12px",
                border: selectedAssetType === type ? "1px solid #8b5cf6" : "1px solid #374151",
                background: selectedAssetType === type ? "rgba(139, 92, 246, 0.2)" : "#1f2937",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* Girl Selector for Artists */}
      {activeCategory === "Artists" && girlMultipliers.length > 0 && (
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.selectGirl}:</span>
          <select
            value={selectedGirl}
            onChange={(e) => setSelectedGirl(e.target.value)}
            style={{ ...selectStyle, minWidth: "160px" }}
          >
            {girlMultipliers.map((g) => (
              <option key={g.name} value={g.name}>
                {g.name}{g.extraPercent > 0 ? ` (+${(g.extraPercent * 100).toFixed(0)}%)` : ""} - {g.season}
              </option>
            ))}
          </select>
          {currentGirl && currentGirl.extraPercent > 0 && (
            <span style={{ color: "#f472b6", fontSize: "0.8rem" }}>
              EXP x{girlMultiplier.toFixed(2)}
            </span>
          )}
        </div>
      )}

      {/* Level Inputs (for level-based modes) */}
      {mode === "levels" && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", marginBottom: "24px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.fromLevel}:</label>
            <input
              type="number"
              min={1}
              max={maxLevel}
              value={fromLevel}
              onChange={(e) => setFromLevel(parseInt(e.target.value) || 1)}
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.toLevel}:</label>
            <input
              type="number"
              min={1}
              max={maxLevel}
              value={toLevel}
              onChange={(e) => setToLevel(parseInt(e.target.value) || 1)}
              style={inputStyle}
            />
          </div>
        </div>
      )}

      {/* Blueprints UI */}
      {mode === "blueprints" && blueprintData && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", marginBottom: "24px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.from}:</label>
            <select
              value={bpFromTier}
              onChange={(e) => { setBpFromTier(e.target.value); setBpFromStep(0); }}
              style={selectStyle}
            >
              {bpTierNames.map((tn) => (
                <option key={tn} value={tn}>{tn}</option>
              ))}
            </select>
            <select
              value={bpFromStep}
              onChange={(e) => setBpFromStep(parseInt(e.target.value))}
              style={{ ...selectStyle, width: "90px" }}
            >
              {(blueprintData.tiers[bpFromTier] || []).map((_, idx) => (
                <option key={idx} value={idx}>Step {idx + 1}</option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.to}:</label>
            <select
              value={bpToTier}
              onChange={(e) => { setBpToTier(e.target.value); setBpToStep((blueprintData.tiers[e.target.value] || []).length - 1); }}
              style={selectStyle}
            >
              {bpTierNames.map((tn) => (
                <option key={tn} value={tn}>{tn}</option>
              ))}
            </select>
            <select
              value={bpToStep}
              onChange={(e) => setBpToStep(parseInt(e.target.value))}
              style={{ ...selectStyle, width: "90px" }}
            >
              {(blueprintData.tiers[bpToTier] || []).map((_, idx) => (
                <option key={idx} value={idx}>Step {idx + 1}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Car Parts UI */}
      {mode === "carparts" && cpOptions.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", marginBottom: "24px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.from}:</label>
            <select
              value={cpFromIdx}
              onChange={(e) => setCpFromIdx(parseInt(e.target.value))}
              style={{ ...selectStyle, minWidth: "120px" }}
            >
              {cpOptions.map((o) => (
                <option key={o.idx} value={o.idx}>{o.label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.to}:</label>
            <select
              value={cpToIdx}
              onChange={(e) => setCpToIdx(parseInt(e.target.value))}
              style={{ ...selectStyle, minWidth: "120px" }}
            >
              {cpOptions.map((o) => (
                <option key={o.idx} value={o.idx}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Villa UI */}
      {mode === "villa" && villaOptions.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", marginBottom: "24px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.from}:</label>
            <select
              value={villaFromIdx}
              onChange={(e) => setVillaFromIdx(parseInt(e.target.value))}
              style={{ ...selectStyle, minWidth: "200px" }}
            >
              {villaOptions.map((o) => (
                <option key={o.idx} value={o.idx}>{o.label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{t.to}:</label>
            <select
              value={villaToIdx}
              onChange={(e) => setVillaToIdx(parseInt(e.target.value))}
              style={{ ...selectStyle, minWidth: "200px" }}
            >
              {villaOptions.map((o) => (
                <option key={o.idx} value={o.idx}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

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
          {Object.keys(totals).length === 0 && (
            <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>No data for this selection</div>
          )}
        </div>
      </div>
    </div>
  );
}
