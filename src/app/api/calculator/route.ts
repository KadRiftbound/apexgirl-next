import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

export type CalcItem = {
  category: string;
  item: string;
  tier?: string;
  level: number;
  resources: Record<string, number>;
};

export type GirlMultiplier = {
  name: string;
  extraPercent: number;
  genre: string;
  season: string;
};

export type ArtistPromotion = {
  levels: string;
  exp: number;
  promoCards: number;
  expAccum: number;
  promoCardsAccum: number;
};

export type AssetPromotion = {
  level: number;
  newMaxLevel: number;
  assetsRequired: number;
};

export type BlueprintData = {
  tiers: Record<string, number[]>;
  tierTotals: Record<string, number>;
};

export type CarPartEntry = {
  rank: string;
  stars: string;
  phases: (number | null)[];
  totalPerPart: number;
  allFourParts: number;
};

export type CarDrawingEntry = {
  rank: string;
  stars: string;
  drawings: number;
};

export type VillaEntry = {
  villa: string;
  hammers: number;
  goldHammers: number;
  stages: number;
  droidsPerStage: number;
  droidsPerRoom: number;
  droidsAll4: number;
};

export type VillaDraftEntry = {
  villa: string;
  hammers: number;
  goldHammers: number;
  drafts: number;
};

function parseGlassSheet(ws: XLSX.WorkSheet): CalcItem[] {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const items: CalcItem[] = [];

  // Row 0: header, Row 1: column labels, Rows 2+: data
  // 12 column pairs: (0,1), (2,3), ..., (22,23)
  for (let rowIdx = 2; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!Array.isArray(row)) continue;

    for (let pair = 0; pair < 12; pair++) {
      const levelCol = pair * 2;
      const costCol = pair * 2 + 1;
      const level = Number(row[levelCol]);
      const cost = Number(row[costCol]);
      if (level > 0 && cost > 0) {
        items.push({ category: "HQ Glass", item: "Glass", level, resources: { Glass: cost } });
      }
    }
  }
  return items;
}

function parseGemsSheet(ws: XLSX.WorkSheet): CalcItem[] {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const items: CalcItem[] = [];

  // Row 0: header, Row 1: column labels, Rows 2+: data
  // 3 column pairs: (0,1), (2,3), (4,5)
  for (let rowIdx = 2; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!Array.isArray(row)) continue;

    for (let pair = 0; pair < 3; pair++) {
      const levelCol = pair * 2;
      const costCol = pair * 2 + 1;
      const level = Number(row[levelCol]);
      const cost = Number(row[costCol]);
      if (level > 0 && cost > 0) {
        items.push({ category: "Collection Gems", item: "Gem", level, resources: { Gems: cost } });
      }
    }
  }
  return items;
}

function parseArtistSheet(ws: XLSX.WorkSheet): {
  items: CalcItem[];
  girlMultipliers: GirlMultiplier[];
  promotions: ArtistPromotion[];
} {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const items: CalcItem[] = [];
  const girlMultipliers: GirlMultiplier[] = [];
  const promotions: ArtistPromotion[] = [];

  // The sheet has two EXP tables: rows 3+ (girl-adjusted) and a base table after
  // "BASIC ARTIST EXP CARDS PER LEVEL" header. We use the base table.
  // Find the start of the base data table
  let baseDataStart = -1;
  for (let rowIdx = 0; rowIdx < raw.length; rowIdx++) {
    const cellVal = String(raw[rowIdx]?.[0] || "");
    if (cellVal.includes("BASIC ARTIST EXP CARDS")) {
      baseDataStart = rowIdx + 2; // skip header + column labels
      break;
    }
  }
  if (baseDataStart === -1) baseDataStart = 3; // fallback

  for (let rowIdx = baseDataStart; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!Array.isArray(row)) continue;

    // Stop at next section header or empty block
    const firstCell = String(row[0] || "");
    if (firstCell && isNaN(Number(firstCell)) && firstCell !== "null") break;

    for (let pair = 0; pair < 6; pair++) {
      const levelCol = pair * 2;
      const costCol = pair * 2 + 1;
      const level = Number(row[levelCol]);
      const cost = Number(row[costCol]);
      if (level > 0 && cost >= 0) {
        items.push({ category: "Artists", item: "Artist EXP", level, resources: { EXP: cost } });
      }
    }
  }

  // Parse girl multipliers and promotion data from the first table area
  for (let rowIdx = 2; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!Array.isArray(row)) continue;

    // Girl multipliers (cols 19-22)
    if (rowIdx >= 2 && row[19]) {
      const name = String(row[19] || "");
      const extra = Number(row[20]) || 0;
      const genre = String(row[21] || "");
      const season = String(row[22] || "");
      if (name) {
        girlMultipliers.push({ name, extraPercent: extra, genre, season });
      }
    }

    // Promotion card summary (cols 13-17) - rows 2+
    // Only take the first ascending sequence to avoid duplicates/summaries
    if (rowIdx >= 2 && row[13] && typeof row[13] === "string" && row[13].includes("to")) {
      const levels = String(row[13]).trim();
      const match = levels.match(/(\d+)\s*to\s*(\d+)/);
      if (match) {
        const rangeStart = parseInt(match[1]);
        const lastPromo = promotions[promotions.length - 1];
        const lastStart = lastPromo
          ? parseInt((lastPromo.levels.match(/(\d+)/) || ["0"])[0])
          : 0;
        if (rangeStart > lastStart) {
          const exp = Number(row[14]) || 0;
          const promoCards = Number(row[15]) || 0;
          const expAccum = Number(row[16]) || 0;
          const promoCardsAccum = Number(row[17]) || 0;
          promotions.push({ levels, exp, promoCards, expAccum, promoCardsAccum });
        }
      }
    }
  }

  return { items, girlMultipliers, promotions };
}

function parseFloorsSheet(ws: XLSX.WorkSheet): Record<string, CalcItem[]> {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];

  const result: Record<string, CalcItem[]> = {
    "HQ Floors": [],
    "Museum": [],
    "Homemaking": [],
    "Car Core": []
  };

  // Column layout from row 4 headers:
  // HQ Floors: F1(1,2), F2(3,4), F3(5,6), F4(7,8), F5(9,10)
  // Museum: R1(11,12), R2(13,14), R3(15,16), R4(17,18), R5(19,20)
  // Homemaking: T1(21,22), T2(23,24), T3(25,26), T4(27,28), T5(29,30)
  // Car Core: D(31,32), C(33,34), B(35,36), A(37,38), A+(39,40), S(41,42)

  const floorIndices = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]];
  const museumIndices = [[11, 12], [13, 14], [15, 16], [17, 18], [19, 20]];
  const homemakingIndices = [[21, 22], [23, 24], [25, 26], [27, 28], [29, 30]];
  const carIndices = [[31, 32], [33, 34], [35, 36], [37, 38], [39, 40], [41, 42]];

  const floorNames = ["Floor 1", "Floor 2", "Floor 3", "Floor 4", "Floor 5"];
  const museumNames = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"];
  const homemakingNames = ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"];
  const carNames = ["D Grade", "C", "B", "A", "A+", "S"];

  // F1-F3: Wood + Steel, F4-F5: HQ Wood + HQ Steel
  const floorResources: [string, string][] = [
    ["Wood", "Steel"], ["Wood", "Steel"], ["Wood", "Steel"],
    ["HQ Wood", "HQ Steel"], ["HQ Wood", "HQ Steel"]
  ];
  // R1-R3: Sandstone + Tile, R4-R5: HQ Sandstone + HQ Tile
  const museumResources: [string, string][] = [
    ["Sandstone", "Tile"], ["Sandstone", "Tile"], ["Sandstone", "Tile"],
    ["HQ Sandstone", "HQ Tile"], ["HQ Sandstone", "HQ Tile"]
  ];
  // T1-T3: Coins + Keys, T4-T5: HQ Coins + HQ Keys
  const homemakingResources: [string, string][] = [
    ["Coins", "Keys"], ["Coins", "Keys"], ["Coins", "Keys"],
    ["HQ Coins", "HQ Keys"], ["HQ Coins", "HQ Keys"]
  ];
  // D,C,B: Plug + Coil. A,A+,S: Enhanced Plug + Enhanced Coil
  const carResources: [string, string][] = [
    ["Plug", "Coil"], ["Plug", "Coil"], ["Plug", "Coil"],
    ["Enhanced Plug", "Enhanced Coil"], ["Enhanced Plug", "Enhanced Coil"], ["Enhanced Plug", "Enhanced Coil"]
  ];

  // Data starts at row 5 (row 0: totals header, 1: totals, 2: section headers, 3: tier names, 4: resource names)
  for (let rowIdx = 5; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!row || !row[0]) continue;

    const level = Number(row[0]);
    if (!level || level < 1) continue;

    // HQ Floors
    for (let i = 0; i < 5; i++) {
      const cost1 = Number(row[floorIndices[i][0]]) || 0;
      const cost2 = Number(row[floorIndices[i][1]]) || 0;
      if (cost1 > 0 || cost2 > 0) {
        const [r1, r2] = floorResources[i];
        result["HQ Floors"].push({
          category: "HQ Floors",
          item: floorNames[i],
          tier: `${r1} + ${r2}`,
          level,
          resources: { [r1]: cost1, [r2]: cost2 }
        });
      }
    }

    // Museum
    for (let i = 0; i < 5; i++) {
      const cost1 = Number(row[museumIndices[i][0]]) || 0;
      const cost2 = Number(row[museumIndices[i][1]]) || 0;
      if (cost1 > 0 || cost2 > 0) {
        const [r1, r2] = museumResources[i];
        result["Museum"].push({
          category: "Museum",
          item: museumNames[i],
          tier: `${r1} + ${r2}`,
          level,
          resources: { [r1]: cost1, [r2]: cost2 }
        });
      }
    }

    // Homemaking
    for (let i = 0; i < 5; i++) {
      const cost1 = Number(row[homemakingIndices[i][0]]) || 0;
      const cost2 = Number(row[homemakingIndices[i][1]]) || 0;
      if (cost1 > 0 || cost2 > 0) {
        const [r1, r2] = homemakingResources[i];
        result["Homemaking"].push({
          category: "Homemaking",
          item: homemakingNames[i],
          tier: `${r1} + ${r2}`,
          level,
          resources: { [r1]: cost1, [r2]: cost2 }
        });
      }
    }

    // Car Core
    for (let i = 0; i < 6; i++) {
      const cost1 = Number(row[carIndices[i][0]]) || 0;
      const cost2 = Number(row[carIndices[i][1]]) || 0;
      if (cost1 > 0 || cost2 > 0) {
        const [r1, r2] = carResources[i];
        result["Car Core"].push({
          category: "Car Core",
          item: carNames[i],
          tier: `${r1} + ${r2}`,
          level,
          resources: { [r1]: cost1, [r2]: cost2 }
        });
      }
    }
  }

  return result;
}

function parseBlueprintsSheet(ws: XLSX.WorkSheet): BlueprintData {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];

  // Row 0: "BLUEPRINTS" header
  // Row 1: null, "Tier 1", "Tier 2", ..., "Tier 21" (cols 1-21)
  // Rows 2-16: step costs (variable number per tier)
  // Row 17: "Total" row

  const tierNames: string[] = [];
  if (raw[1]) {
    for (let col = 1; col <= 21; col++) {
      const name = String(raw[1][col] || "");
      if (name.includes("Tier")) tierNames.push(name);
    }
  }

  const tiers: Record<string, number[]> = {};
  const tierTotals: Record<string, number> = {};

  for (const tierName of tierNames) {
    tiers[tierName] = [];
  }

  for (let rowIdx = 2; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!Array.isArray(row)) continue;

    // Check if this is the "Total" row
    if (String(row[0] || "").toLowerCase() === "total") {
      for (let i = 0; i < tierNames.length; i++) {
        tierTotals[tierNames[i]] = Number(row[i + 1]) || 0;
      }
      break;
    }

    // Skip rows that are part of the master blueprints section
    if (row[0] !== null && row[0] !== undefined && String(row[0]) !== "") continue;

    // Parse step costs
    for (let i = 0; i < tierNames.length; i++) {
      const cost = Number(row[i + 1]);
      if (cost > 0) {
        tiers[tierNames[i]].push(cost);
      }
    }
  }

  return { tiers, tierTotals };
}

function parseCarPartsSheet(ws: XLSX.WorkSheet): {
  parts: CarPartEntry[];
  drawings: CarDrawingEntry[];
} {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const parts: CarPartEntry[] = [];
  const drawings: CarDrawingEntry[] = [];

  // Row 0: headers, Row 1: column labels, Rows 2+: data
  // Parts: Rank(0), Stars(1), Phase1-5(2-6), TotalPerPart(7), All4Parts(8)
  // Drawings: Rank(10), Stars(11), Drawings(12)

  for (let rowIdx = 2; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!Array.isArray(row)) continue;

    const rank = String(row[0] || "");
    if (!rank || rank === "null" || rank === "undefined") continue;

    const stars = String(row[1] ?? "");
    const starsStr = stars === "0" ? "0" : stars;

    // Parts
    const phases: (number | null)[] = [];
    for (let p = 2; p <= 6; p++) {
      const val = row[p];
      if (val === "MAX" || val === null || val === undefined) {
        phases.push(null);
      } else {
        phases.push(Number(val) || 0);
      }
    }
    const totalPerPart = Number(row[7]) || 0;
    const allFourParts = Number(row[8]) || 0;

    if (totalPerPart > 0) {
      parts.push({ rank, stars: starsStr, phases, totalPerPart, allFourParts });
    }

    // Drawings (cols 10-12)
    const drawRank = String(row[10] || "");
    const drawStars = String(row[11] ?? "");
    const drawVal = row[12];
    if (drawRank && drawRank !== "null" && drawVal !== "MAX" && Number(drawVal) > 0) {
      drawings.push({
        rank: drawRank,
        stars: drawStars === "0" ? "0" : drawStars,
        drawings: Number(drawVal)
      });
    }
  }

  return { parts, drawings };
}

function parseDronesSheet(ws: XLSX.WorkSheet): {
  entries: VillaEntry[];
  drafts: VillaDraftEntry[];
} {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const entries: VillaEntry[] = [];
  const drafts: VillaDraftEntry[] = [];

  // Row 0: headers, Row 1: column labels, Rows 2+: data
  // Main: Villa(0), Hammers(1), GoldHammers(2), Stages(3), Droids/stage(4), Droids/room(5), DroidsAll4(6)
  // Drafts: Villa(8), Hammers(9), GoldHammers(10), Drafts(11)

  let currentVilla = "";
  let currentDraftVilla = "";

  for (let rowIdx = 2; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!Array.isArray(row)) continue;

    // Main entries
    const villaName = row[0] ? String(row[0]) : "";
    if (villaName) currentVilla = villaName;

    const hammers = Number(row[1]);
    const goldHammers = Number(row[2]);
    const stages = row[3];
    const droidsPerStage = Number(row[4]);

    if (currentVilla && !isNaN(hammers) && stages !== "MAX" && droidsPerStage > 0) {
      entries.push({
        villa: currentVilla,
        hammers,
        goldHammers: goldHammers || 0,
        stages: Number(stages) || 0,
        droidsPerStage,
        droidsPerRoom: Number(row[5]) || 0,
        droidsAll4: Number(row[6]) || 0
      });
    }

    // Drafts
    const draftVilla = row[8] ? String(row[8]) : "";
    if (draftVilla) currentDraftVilla = draftVilla;

    const draftHammers = Number(row[9]);
    const draftGoldHammers = Number(row[10]);
    const draftVal = row[11];

    if (currentDraftVilla && !isNaN(draftHammers) && draftVal !== "MAX" && Number(draftVal) > 0) {
      drafts.push({
        villa: currentDraftVilla,
        hammers: draftHammers,
        goldHammers: draftGoldHammers || 0,
        drafts: Number(draftVal)
      });
    }
  }

  return { entries, drafts };
}

function parseAssetsSheet(ws: XLSX.WorkSheet): {
  items: CalcItem[];
  promotions: AssetPromotion[];
} {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const items: CalcItem[] = [];
  const promotions: AssetPromotion[] = [];

  // Row 0: header, Row 1: section labels, Row 2: column labels, Rows 3+: data
  // Basic: Level(0), Jewelry(1), Car(2), Property(3)
  // Abroad: Level(5), Jewelry(6), Car(7), Property(8)
  // Auction: Level(10), Car(11), Property(12)
  // Promotion: Level(14→col index), NewMax(15), AssetsReq(16) — starting around row 25

  for (let rowIdx = 3; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!Array.isArray(row)) continue;

    // Basic Assets
    const basicLevel = Number(row[0]);
    if (basicLevel > 0) {
      const jewelryCost = Number(row[1]) || 0;
      const carCost = Number(row[2]) || 0;
      const propertyCost = Number(row[3]) || 0;

      if (jewelryCost > 0 && String(row[1]) !== "MAX") {
        items.push({ category: "Assets", item: "Jewelry", tier: "Basic Gold", level: basicLevel, resources: { "Asset Coins": jewelryCost } });
      }
      if (carCost > 0 && String(row[2]) !== "MAX") {
        items.push({ category: "Assets", item: "Car", tier: "Basic Gold", level: basicLevel, resources: { "Asset Coins": carCost } });
      }
      if (propertyCost > 0 && String(row[3]) !== "MAX") {
        items.push({ category: "Assets", item: "Property", tier: "Basic Gold", level: basicLevel, resources: { "Asset Coins": propertyCost } });
      }
    }

    // Abroad Adventures
    const abroadLevel = Number(row[5]);
    if (abroadLevel > 0) {
      const jewelryCost2 = Number(row[6]) || 0;
      const carCost2 = Number(row[7]) || 0;
      const propertyCost2 = Number(row[8]) || 0;

      if (jewelryCost2 > 0 && String(row[6]) !== "MAX") {
        items.push({ category: "Assets", item: "Jewelry", tier: "Abroad Adventures", level: abroadLevel, resources: { "Asset Coins": jewelryCost2 } });
      }
      if (carCost2 > 0 && String(row[7]) !== "MAX") {
        items.push({ category: "Assets", item: "Car", tier: "Abroad Adventures", level: abroadLevel, resources: { "Asset Coins": carCost2 } });
      }
      if (propertyCost2 > 0 && String(row[8]) !== "MAX") {
        items.push({ category: "Assets", item: "Property", tier: "Abroad Adventures", level: abroadLevel, resources: { "Asset Coins": propertyCost2 } });
      }
    }

    // Auction
    const auctionLevel = Number(row[10]);
    if (auctionLevel > 0) {
      const carCost3 = Number(row[11]) || 0;
      const propertyCost3 = Number(row[12]) || 0;

      if (carCost3 > 0 && String(row[11]) !== "MAX") {
        items.push({ category: "Assets", item: "Car", tier: "Auction", level: auctionLevel, resources: { "Asset Coins": carCost3 } });
      }
      if (propertyCost3 > 0 && String(row[12]) !== "MAX") {
        items.push({ category: "Assets", item: "Property", tier: "Auction", level: auctionLevel, resources: { "Asset Coins": propertyCost3 } });
      }
    }

    // Promotion Costs (cols 14-16, starting where "PROMOTION COST" section appears)
    if (row[14] && typeof row[14] === "number" && row[15] && typeof row[15] === "number") {
      const promoLevel = Number(row[14]);
      const newMax = Number(row[15]);
      const assetsReq = Number(row[16]) || 0;
      if (promoLevel > 0 && newMax > promoLevel && assetsReq > 0) {
        promotions.push({ level: promoLevel, newMaxLevel: newMax, assetsRequired: assetsReq });
      }
    }
  }

  return { items, promotions };
}

function parseOthersSheet(ws: XLSX.WorkSheet): CalcItem[] {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const items: CalcItem[] = [];

  // Row 0: headers ("HQ Building Cards", ..., "Business Building Gold")
  // Row 1: column labels
  // Rows 2+: data
  // HQ Building Cards: Level(0), Cards(1)
  // Business Building Gold: Level(4), Gold(5)

  for (let rowIdx = 2; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!Array.isArray(row)) continue;

    const hqLevel = Number(row[0]);
    const hqCards = row[1];
    if (hqLevel > 0 && typeof hqCards === "number" && hqCards > 0) {
      items.push({
        category: "Others",
        item: "HQ Building Cards",
        level: hqLevel,
        resources: { Cards: hqCards }
      });
    }

    const bizLevel = Number(row[4]);
    const bizGold = row[5];
    if (bizLevel > 0 && typeof bizGold === "number" && bizGold > 0) {
      items.push({
        category: "Others",
        item: "Business Building Gold",
        level: bizLevel,
        resources: { Gold: bizGold }
      });
    }
  }

  return items;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "tools", "apexcalc-data.xlsx");
    const fileBuffer = fs.readFileSync(filePath);
    const wb = XLSX.read(fileBuffer, { type: "buffer", cellDates: true });

    const result: Record<string, unknown> = {};

    // HQ Glass
    if (wb.Sheets["Glass"]) {
      const items = parseGlassSheet(wb.Sheets["Glass"]);
      if (items.length > 0) result["HQ Glass"] = items;
    }

    // Collection Gems
    if (wb.Sheets["Gems"]) {
      const items = parseGemsSheet(wb.Sheets["Gems"]);
      if (items.length > 0) result["Collection Gems"] = items;
    }

    // Artists + Girl Multipliers + Promotion Cards
    if (wb.Sheets["Artist"]) {
      const { items, girlMultipliers, promotions } = parseArtistSheet(wb.Sheets["Artist"]);
      if (items.length > 0) result["Artists"] = items;
      result["artistGirlMultipliers"] = girlMultipliers;
      result["artistPromotions"] = promotions;
    }

    // Floors, Museum, Homemaking, Car Core
    if (wb.Sheets["Floors,Exhibits,Homemaking,CarC"]) {
      const tierData = parseFloorsSheet(wb.Sheets["Floors,Exhibits,Homemaking,CarC"]);
      for (const [category, items] of Object.entries(tierData)) {
        if (items.length > 0) result[category] = items;
      }
    }

    // Assets
    if (wb.Sheets["Assets"]) {
      const { items, promotions } = parseAssetsSheet(wb.Sheets["Assets"]);
      if (items.length > 0) result["Assets"] = items;
      result["assetPromotions"] = promotions;
    }

    // Blueprints
    if (wb.Sheets["Blueprints"]) {
      result["blueprintData"] = parseBlueprintsSheet(wb.Sheets["Blueprints"]);
    }

    // Car Parts
    if (wb.Sheets["Car Parts"]) {
      result["carPartsData"] = parseCarPartsSheet(wb.Sheets["Car Parts"]);
    }

    // Villa / Drones
    if (wb.Sheets["Drones"]) {
      result["villaData"] = parseDronesSheet(wb.Sheets["Drones"]);
    }

    // Others
    if (wb.Sheets["Others"]) {
      const items = parseOthersSheet(wb.Sheets["Others"]);
      if (items.length > 0) result["Others"] = items;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Calculator route failed", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
