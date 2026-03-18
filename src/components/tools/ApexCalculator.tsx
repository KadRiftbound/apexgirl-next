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
    loading: "Chargement...",
    error: "Erreur",
    floor: "Étage",
    room: "Salle",
    tier: "Palier",
    gradeD: "Grade D",
    catHqFloors: "Étages du HQ",
    catMuseum: "Musée",
    catHomemaking: "Homemaking",
    catCarCore: "Car Core",
    catArtists: "EXP artistes",
    catHqGlass: "HQ Glass",
    catCollectionGems: "Collection Gems",
    catAssets: "Assets",
    catBlueprints: "Blueprints",
    catCarParts: "Car Parts",
    catVilla: "Villa",
    catOthers: "Autres",
    assetJewelry: "Bijou",
    assetCar: "Voiture",
    assetProperty: "Propriété",
    assetBasicGold: "Or basique",
    assetAbroad: "Abroad",
    assetAuction: "Auction House",
    otherHqCards: "HQ Building Cards",
    otherBusinessGold: "Business Building Gold",
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
    loading: "Loading...",
    error: "Error",
    floor: "Floor",
    room: "Room",
    tier: "Tier",
    gradeD: "D Grade",
    catHqFloors: "HQ Floors",
    catMuseum: "Museum",
    catHomemaking: "Homemaking",
    catCarCore: "Car Core",
    catArtists: "Artist EXP",
    catHqGlass: "HQ Glass",
    catCollectionGems: "Collection Gems",
    catAssets: "Assets",
    catBlueprints: "Blueprints",
    catCarParts: "Car Parts",
    catVilla: "Villa",
    catOthers: "Others",
    assetJewelry: "Jewelry",
    assetCar: "Car",
    assetProperty: "Property",
    assetBasicGold: "Basic Gold",
    assetAbroad: "Abroad Adventures",
    assetAuction: "Auction",
    otherHqCards: "HQ Building Cards",
    otherBusinessGold: "Business Building Gold",
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
    loading: "Caricamento...",
    error: "Errore",
    floor: "Piano",
    room: "Stanza",
    tier: "Tier",
    gradeD: "Grado D",
    catHqFloors: "Piani HQ",
    catMuseum: "Museo",
    catHomemaking: "Homemaking",
    catCarCore: "Car Core",
    catArtists: "EXP artiste",
    catHqGlass: "HQ Glass",
    catCollectionGems: "Collection Gems",
    catAssets: "Assets",
    catBlueprints: "Blueprints",
    catCarParts: "Car Parts",
    catVilla: "Villa",
    catOthers: "Altro",
    assetJewelry: "Gioielli",
    assetCar: "Auto",
    assetProperty: "Proprietà",
    assetBasicGold: "Oro base",
    assetAbroad: "Abroad",
    assetAuction: "Auction House",
    otherHqCards: "HQ Building Cards",
    otherBusinessGold: "Business Building Gold",
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
    loading: "Cargando...",
    error: "Error",
    floor: "Piso",
    room: "Sala",
    tier: "Tier",
    gradeD: "Grado D",
    catHqFloors: "Pisos HQ",
    catMuseum: "Museo",
    catHomemaking: "Homemaking",
    catCarCore: "Car Core",
    catArtists: "EXP artistas",
    catHqGlass: "HQ Glass",
    catCollectionGems: "Collection Gems",
    catAssets: "Assets",
    catBlueprints: "Blueprints",
    catCarParts: "Car Parts",
    catVilla: "Villa",
    catOthers: "Otros",
    assetJewelry: "Joyería",
    assetCar: "Coche",
    assetProperty: "Propiedad",
    assetBasicGold: "Oro básico",
    assetAbroad: "Abroad",
    assetAuction: "Auction House",
    otherHqCards: "HQ Building Cards",
    otherBusinessGold: "Business Building Gold",
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
    loading: "Carregando...",
    error: "Erro",
    floor: "Andar",
    room: "Sala",
    tier: "Tier",
    gradeD: "Grau D",
    catHqFloors: "Andares HQ",
    catMuseum: "Museu",
    catHomemaking: "Homemaking",
    catCarCore: "Car Core",
    catArtists: "EXP artistas",
    catHqGlass: "HQ Glass",
    catCollectionGems: "Collection Gems",
    catAssets: "Assets",
    catBlueprints: "Blueprints",
    catCarParts: "Car Parts",
    catVilla: "Villa",
    catOthers: "Outros",
    assetJewelry: "Joia",
    assetCar: "Carro",
    assetProperty: "Propriedade",
    assetBasicGold: "Ouro básico",
    assetAbroad: "Abroad",
    assetAuction: "Auction House",
    otherHqCards: "HQ Building Cards",
    otherBusinessGold: "Business Building Gold",
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
    loading: "Ładowanie...",
    error: "Błąd",
    floor: "Piętro",
    room: "Sala",
    tier: "Tier",
    gradeD: "Klasa D",
    catHqFloors: "Piętra HQ",
    catMuseum: "Muzeum",
    catHomemaking: "Homemaking",
    catCarCore: "Car Core",
    catArtists: "EXP artystek",
    catHqGlass: "HQ Glass",
    catCollectionGems: "Collection Gems",
    catAssets: "Assets",
    catBlueprints: "Blueprints",
    catCarParts: "Car Parts",
    catVilla: "Villa",
    catOthers: "Inne",
    assetJewelry: "Biżuteria",
    assetCar: "Auto",
    assetProperty: "Posiadłość",
    assetBasicGold: "Podstawowe złoto",
    assetAbroad: "Abroad",
    assetAuction: "Auction House",
    otherHqCards: "HQ Building Cards",
    otherBusinessGold: "Business Building Gold",
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
    loading: "Memuat...",
    error: "Kesalahan",
    floor: "Lantai",
    room: "Ruang",
    tier: "Tier",
    gradeD: "Grade D",
    catHqFloors: "Lantai HQ",
    catMuseum: "Museum",
    catHomemaking: "Homemaking",
    catCarCore: "Car Core",
    catArtists: "EXP artis",
    catHqGlass: "HQ Glass",
    catCollectionGems: "Collection Gems",
    catAssets: "Assets",
    catBlueprints: "Blueprints",
    catCarParts: "Car Parts",
    catVilla: "Villa",
    catOthers: "Lainnya",
    assetJewelry: "Perhiasan",
    assetCar: "Mobil",
    assetProperty: "Properti",
    assetBasicGold: "Emas dasar",
    assetAbroad: "Abroad",
    assetAuction: "Auction House",
    otherHqCards: "HQ Building Cards",
    otherBusinessGold: "Business Building Gold",
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
    loading: "Загрузка...",
    error: "Ошибка",
    floor: "Этаж",
    room: "Зал",
    tier: "Тир",
    gradeD: "Класс D",
    catHqFloors: "Этажи HQ",
    catMuseum: "Музей",
    catHomemaking: "Homemaking",
    catCarCore: "Car Core",
    catArtists: "EXP артистов",
    catHqGlass: "HQ Glass",
    catCollectionGems: "Collection Gems",
    catAssets: "Assets",
    catBlueprints: "Blueprints",
    catCarParts: "Car Parts",
    catVilla: "Villa",
    catOthers: "Другое",
    assetJewelry: "Украшение",
    assetCar: "Машина",
    assetProperty: "Недвижимость",
    assetBasicGold: "Базовое золото",
    assetAbroad: "Abroad",
    assetAuction: "Auction House",
    otherHqCards: "HQ Building Cards",
    otherBusinessGold: "Business Building Gold",
  },
};

type CategoryConfig = {
  id: string;
  label: string;
  maxLevel?: number;
  tiers?: { label: string; value: string }[];
  assetTypes?: { label: string; value: string }[];
  mode?: "levels" | "blueprints" | "carparts" | "villa";
};

const buildSeries = (label: string, englishBase: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({ label: `${label} ${i + 1}`, value: `${englishBase} ${i + 1}` }));

const btnBase: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: "8px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1.5px solid rgba(139,92,246,0.45)",
  background: "rgba(139,92,246,0.10)",
  color: "#fff",
  width: "70px",
  fontSize: "0.9rem",
};

const selectStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1.5px solid rgba(139,92,246,0.45)",
  background: "rgba(139,92,246,0.10)",
  color: "#fff",
  fontSize: "0.85rem",
  cursor: "pointer",
};

// Couleur par type de ressource pour les cards résultat
const RESOURCE_COLORS: Record<string, { color: string; bg: string }> = {
  "EXP":              { color: "#4ade80", bg: "rgba(74,222,128,0.12)"  },
  "Gold":             { color: "#fbbf24", bg: "rgba(251,191,36,0.12)"  },
  "Gems":             { color: "#c084fc", bg: "rgba(192,132,252,0.12)" },
  "Tickets":          { color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
  "Promotion Cards":  { color: "#f472b6", bg: "rgba(244,114,182,0.12)" },
  "Extra Assets":     { color: "#fb923c", bg: "rgba(251,146,60,0.12)"  },
  "Blueprints":       { color: "#38bdf8", bg: "rgba(56,189,248,0.12)"  },
  "Car Parts":        { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  "Advance Drawings": { color: "#34d399", bg: "rgba(52,211,153,0.12)"  },
  "Drones":           { color: "#f97316", bg: "rgba(249,115,22,0.12)"  },
  "Design Drafts":    { color: "#e879f9", bg: "rgba(232,121,249,0.12)" },
};
const DEFAULT_RESOURCE_COLOR = { color: "#f472b6", bg: "rgba(244,114,182,0.12)" };

function formatRankStars(rank: string, stars: string): string {
  const s = stars === "0" ? "" : stars;
  return `${rank}${s}`;
}

export default function ApexCalculator() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = translations[lang] || translations.en;

  const categoryConfig = useMemo<CategoryConfig[]>(() => [
    { id: "HQ Floors", label: t.catHqFloors, maxLevel: 60, tiers: buildSeries(t.floor, "Floor", 5) },
    { id: "Museum", label: t.catMuseum, maxLevel: 60, tiers: buildSeries(t.room, "Room", 5) },
    { id: "Homemaking", label: t.catHomemaking, maxLevel: 60, tiers: buildSeries(t.tier, "Tier", 5) },
    { id: "Car Core", label: t.catCarCore, maxLevel: 60, tiers: [
      { label: t.gradeD, value: "D Grade" },
      { label: "C", value: "C" },
      { label: "B", value: "B" },
      { label: "A", value: "A" },
      { label: "A+", value: "A+" },
      { label: "S", value: "S" },
    ]},
    { id: "Artists", label: t.catArtists, maxLevel: 160 },
    { id: "HQ Glass", label: t.catHqGlass, maxLevel: 499 },
    { id: "Collection Gems", label: t.catCollectionGems, maxLevel: 49 },
    { id: "Assets", label: t.catAssets, maxLevel: 75,
      tiers: [
        { label: t.assetJewelry, value: "Jewelry" },
        { label: t.assetCar, value: "Car" },
        { label: t.assetProperty, value: "Property" },
      ],
      assetTypes: [
        { label: t.assetBasicGold, value: "Basic Gold" },
        { label: t.assetAbroad, value: "Abroad Adventures" },
        { label: t.assetAuction, value: "Auction" },
      ]
    },
    { id: "Blueprints", label: t.catBlueprints, mode: "blueprints" },
    { id: "Car Parts", label: t.catCarParts, mode: "carparts" },
    { id: "Villa Suite", label: t.catVilla, mode: "villa" },
    { id: "Others", label: t.catOthers, maxLevel: 15, tiers: [
      { label: t.otherHqCards, value: "HQ Building Cards" },
      { label: t.otherBusinessGold, value: "Business Building Gold" },
    ]},
  ], [t]);

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
    return <div style={{ textAlign: "center", padding: "60px", color: "#fff" }}>{t.loading}</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "60px", color: "#f87171" }}>{t.error}: {error}</div>;
  }

  const totals = getTotals();

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const config = categoryConfig.find(c => c.id === catId);
    if (config?.tiers) setSelectedTier(config.tiers[0].value);
    if (config?.assetTypes) setSelectedAssetType(config.assetTypes[0].value);
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
              border: activeCategory === cat.id
                ? "1.5px solid #f472b6"
                : "1.5px solid rgba(139,92,246,0.35)",
              background: activeCategory === cat.id
                ? "linear-gradient(135deg, #ec4899, #a855f7)"
                : "rgba(139,92,246,0.10)",
              boxShadow: activeCategory === cat.id ? "0 4px 14px rgba(236,72,153,0.35)" : "none",
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
          {(currentConfig.tiers || []).map((tier) => (
            <button
              key={tier.value}
              onClick={() => setSelectedTier(tier.value)}
              style={{
                ...btnBase,
                padding: "6px 12px",
                border: selectedTier === tier.value
                  ? "1.5px solid #f472b6"
                  : "1.5px solid rgba(139,92,246,0.30)",
                background: selectedTier === tier.value
                  ? "rgba(236,72,153,0.25)"
                  : "rgba(139,92,246,0.08)",
              }}
            >
              {tier.label}
            </button>
          ))}
        </div>
      )}

      {/* Asset Type Selector */}
      {hasAssetTypes && currentConfig && (
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Type:</span>
          {(currentConfig.assetTypes || []).map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedAssetType(type.value)}
              style={{
                ...btnBase,
                padding: "6px 12px",
                border: selectedAssetType === type.value
                  ? "1.5px solid #8b5cf6"
                  : "1.5px solid rgba(139,92,246,0.30)",
                background: selectedAssetType === type.value
                  ? "rgba(139,92,246,0.25)"
                  : "rgba(139,92,246,0.08)",
              }}
            >
              {type.label}
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
          {Object.entries(totals).map(([resource, total]) => {
            const rc = RESOURCE_COLORS[resource] || DEFAULT_RESOURCE_COLOR;
            return (
            <div key={resource} style={{
              textAlign: "center",
              padding: "14px 22px",
              background: rc.bg,
              borderRadius: "12px",
              minWidth: "110px",
              border: `1.5px solid ${rc.color}55`,
              boxShadow: `0 2px 12px ${rc.color}20`,
            }}>
              <div style={{ fontSize: "0.72rem", color: rc.color, marginBottom: "6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{resource}</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: rc.color, fontFamily: "monospace" }}>{total.toLocaleString()}</div>
            </div>
            );
          })}
          {Object.keys(totals).length === 0 && (
            <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>No data for this selection</div>
          )}
        </div>
      </div>
    </div>
  );
}
