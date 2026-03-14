import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export type CalcItem = {
  category: string;
  item: string;
  tier?: string;
  level: number;
  resources: Record<string, number>;
};

function parseFloorsSheet(ws: XLSX.WorkSheet): Record<string, CalcItem[]> {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  
  const result: Record<string, CalcItem[]> = {
    "HQ Floors": [],
    "Museum": [],
    "Homemaking": [],
    "Car Core": []
  };

  const floorIndices = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]];
  const museumIndices = [[11, 12], [13, 14], [15, 16], [17, 18], [19, 20]];
  const homemakingIndices = [[21, 22], [23, 24], [25, 26], [27, 28], [29, 30]];
  const carIndices = [[31, 32], [33, 34], [35, 36], [37, 38], [39, 40]];

  const floorNames = ["Floor 1", "Floor 2", "Floor 3", "Floor 4", "Floor 5"];
  const museumNames = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"];
  const homemakingNames = ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"];
  const carNames = ["D Grade", "C", "B", "A", "A+"];

  const resourceNames = ["Wood", "Steel", "Sandstone", "Tile", "HQ Sandstone", "HQ Tile", "Coins", "Keys", "HQ Coins", "HQ Keys", "Plug", "Coil", "Enhanced Plug", "Enhanced Coil"];

  for (let rowIdx = 5; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!row || !row[0]) continue;
    
    const level = Number(row[0]);
    if (!level || level < 1) continue;

    // HQ Floors
    for (let i = 0; i < 5; i++) {
      const woodCost = Number(row[floorIndices[i][0]]) || 0;
      const steelCost = Number(row[floorIndices[i][1]]) || 0;
      
      if (woodCost > 0 || steelCost > 0) {
        const existing = result["HQ Floors"].find(t => t.item === floorNames[i] && t.level === level);
        if (!existing) {
          result["HQ Floors"].push({
            category: "HQ Floors",
            item: floorNames[i],
            tier: "Wood + Steel",
            level,
            resources: {
              Wood: woodCost,
              Steel: steelCost
            }
          });
        }
      }
    }

    // Museum
    for (let i = 0; i < 5; i++) {
      const sandCost = Number(row[museumIndices[i][0]]) || 0;
      const tileCost = Number(row[museumIndices[i][1]]) || 0;
      
      if (sandCost > 0 || tileCost > 0) {
        const existing = result["Museum"].find(t => t.item === museumNames[i] && t.level === level);
        if (!existing) {
          result["Museum"].push({
            category: "Museum",
            item: museumNames[i],
            tier: "Sandstone + Tile",
            level,
            resources: {
              Sandstone: sandCost,
              Tile: tileCost
            }
          });
        }
      }
    }

    // Homemaking
    for (let i = 0; i < 5; i++) {
      const hqSandCost = Number(row[homemakingIndices[i][0]]) || 0;
      const hqTileCost = Number(row[homemakingIndices[i][1]]) || 0;
      
      if (hqSandCost > 0 || hqTileCost > 0) {
        const existing = result["Homemaking"].find(t => t.item === homemakingNames[i] && t.level === level);
        if (!existing) {
          result["Homemaking"].push({
            category: "Homemaking",
            item: homemakingNames[i],
            tier: "HQ Tile + HQ Sandstone",
            level,
            resources: {
              "HQ Sandstone": hqSandCost,
              "HQ Tile": hqTileCost
            }
          });
        }
      }
    }

    // Car Core
    for (let i = 0; i < 5; i++) {
      const plugCost = Number(row[carIndices[i][0]]) || 0;
      const coilCost = Number(row[carIndices[i][1]]) || 0;
      
      if (plugCost > 0 || coilCost > 0) {
        const existing = result["Car Core"].find(t => t.item === carNames[i] && t.level === level);
        if (!existing) {
          result["Car Core"].push({
            category: "Car Core",
            item: carNames[i],
            tier: "Plug + Coil",
            level,
            resources: {
              Plug: plugCost,
              Coil: coilCost
            }
          });
        }
      }
    }
  }

  return result;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "tools", "apexcalc-data.xlsx");
    const fileBuffer = fs.readFileSync(filePath);
    const wb = XLSX.read(fileBuffer, { type: "buffer", cellDates: true });

    const result: Record<string, CalcItem[]> = {};

    // Parse tier-based categories
    if (wb.Sheets["Floors,Exhibits,Homemaking,CarC"]) {
      const tierData = parseFloorsSheet(wb.Sheets["Floors,Exhibits,Homemaking,CarC"]);
      for (const [category, items] of Object.entries(tierData)) {
        if (items.length > 0) {
          result[category] = items;
        }
      }
    }

    // HQ Glass
    if (wb.Sheets["Glass"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Glass"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const level = Number(row[0]);
        const cost = Number(row[1]);
        if (level > 0 && cost > 0) {
          items.push({ category: "HQ Glass", item: "Glass", level, resources: { Glass: cost } });
        }
      }
      if (items.length > 0) result["HQ Glass"] = items;
    }

    // Artists
    if (wb.Sheets["Artist"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Artist"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const level = Number(row[0]);
        const exp = Number(row[1]);
        if (level > 0 && exp >= 0) {
          items.push({ category: "Artists", item: "Artist EXP", level, resources: { EXP: exp } });
        }
      }
      if (items.length > 0) result["Artists"] = items;
    }

    // Collection Gems
    if (wb.Sheets["Gems"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Gems"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const level = Number(row[0]);
        const cost = Number(row[1]);
        if (level > 0 && cost > 0) {
          items.push({ category: "Collection Gems", item: "Gem", level, resources: { Gems: cost } });
        }
      }
      if (items.length > 0) result["Collection Gems"] = items;
    }

    // Assets
    if (wb.Sheets["Assets"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Assets"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const level = Number(row[0]);
        const cost = Number(row[1]) || 0;
        if (level > 0 && cost > 0) {
          items.push({ category: "Assets", item: "Asset", level, resources: { Coins: cost } });
        }
      }
      if (items.length > 0) result["Assets"] = items;
    }

    // Blueprints
    if (wb.Sheets["Others"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Others"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const level = Number(row[0]);
        const cost = Number(row[2]) || 0;
        if (level > 0 && cost > 0) {
          items.push({ category: "Blueprints", item: "Blueprint", level, resources: { Blueprints: cost } });
        }
      }
      if (items.length > 0) result["Blueprints"] = items;
    }

    // Car Parts
    if (wb.Sheets["Car Parts"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Car Parts"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const partType = String(row[0] || "");
        if (!partType || partType === "null") continue;
        const cost = Number(row[1]) || 0;
        if (cost > 0) {
          items.push({ category: "Car Parts", item: `Part ${partType}`, level: 1, resources: { Coins: cost } });
        }
      }
      if (items.length > 0) result["Car Parts"] = items;
    }

    // Villa Suite (Drones)
    if (wb.Sheets["Drones"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Drones"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const name = String(row[0] || "");
        if (!name || name === "null") continue;
        const cost = Number(row[2]) || 0;
        if (cost > 0) {
          items.push({ category: "Villa Suite", item: name, level: 1, resources: { Coins: cost } });
        }
      }
      if (items.length > 0) result["Villa Suite"] = items;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Calculator route failed", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
