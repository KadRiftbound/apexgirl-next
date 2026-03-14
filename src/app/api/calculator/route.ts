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
  cost: number;
};

function parseSimpleSheet(ws: XLSX.WorkSheet, category: string, itemName: string): CalcItem[] {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const items: CalcItem[] = [];
  
  for (const row of raw) {
    if (!Array.isArray(row)) continue;
    const level = Number(row[0]);
    const cost = Number(row[1]);
    
    if (level > 0 && cost > 0) {
      items.push({ category, item: itemName, level, cost });
    }
  }
  
  return items;
}

function parseAssetsSheet(ws: XLSX.WorkSheet, category: string): CalcItem[] {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const items: CalcItem[] = [];
  
  for (const row of raw) {
    if (!Array.isArray(row)) continue;
    const level = Number(row[0]);
    const cost = Number(row[1]) || 0;
    
    if (level > 0 && cost > 0) {
      items.push({ category, item: "Asset", level, cost });
    }
  }
  
  return items;
}

function parseArtistSheet(ws: XLSX.WorkSheet): CalcItem[] {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const items: CalcItem[] = [];
  
  for (const row of raw) {
    if (!Array.isArray(row)) continue;
    const level = Number(row[0]);
    const exp = Number(row[1]);
    
    if (level > 0 && exp >= 0) {
      items.push({ category: "Artists", item: "Artist EXP", level, cost: exp });
    }
  }
  
  return items;
}

function parseGlassSheet(ws: XLSX.WorkSheet): CalcItem[] {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const items: CalcItem[] = [];
  
  for (const row of raw) {
    if (!Array.isArray(row)) continue;
    const level = Number(row[0]);
    const cost = Number(row[1]);
    
    if (level > 0 && cost > 0) {
      items.push({ category: "HQ Glass", item: "Glass", level, cost });
    }
  }
  
  return items;
}

function parseCarPartsSheet(ws: XLSX.WorkSheet): CalcItem[] {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  const items: CalcItem[] = [];
  
  for (const row of raw) {
    if (!Array.isArray(row)) continue;
    const partType = String(row[0] || "");
    if (!partType || partType === "null") continue;
    
    const cost = Number(row[1]) || 0;
    if (cost > 0) {
      items.push({ category: "Car Parts", item: `Part ${partType}`, level: 1, cost });
    }
  }
  
  return items;
}

interface TierData {
  name: string;
  material: string;
  levels: { level: number; cost: number }[];
}

function parseFloorsSheet(ws: XLSX.WorkSheet): Record<string, TierData[]> {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  
  const result: Record<string, TierData[]> = {
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

  for (let rowIdx = 5; rowIdx < raw.length; rowIdx++) {
    const row = raw[rowIdx];
    if (!row || !row[0]) continue;
    
    const level = Number(row[0]);
    if (!level || level < 1) continue;

    for (let i = 0; i < 5; i++) {
      const cost1 = Number(row[floorIndices[i][0]]) || 0;
      const cost2 = Number(row[floorIndices[i][1]]) || 0;
      const totalCost = cost1 + cost2;
      
      if (totalCost > 0) {
        const existing = result["HQ Floors"].find(t => t.name === floorNames[i]);
        if (existing) {
          existing.levels.push({ level, cost: totalCost });
        } else {
          result["HQ Floors"].push({
            name: floorNames[i],
            material: "Wood + Steel",
            levels: [{ level, cost: totalCost }]
          });
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const cost1 = Number(row[museumIndices[i][0]]) || 0;
      const cost2 = Number(row[museumIndices[i][1]]) || 0;
      const totalCost = cost1 + cost2;
      
      if (totalCost > 0) {
        const existing = result["Museum"].find(t => t.name === museumNames[i]);
        if (existing) {
          existing.levels.push({ level, cost: totalCost });
        } else {
          result["Museum"].push({
            name: museumNames[i],
            material: "Sandstone + Tile",
            levels: [{ level, cost: totalCost }]
          });
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const cost1 = Number(row[homemakingIndices[i][0]]) || 0;
      const cost2 = Number(row[homemakingIndices[i][1]]) || 0;
      const totalCost = cost1 + cost2;
      
      if (totalCost > 0) {
        const existing = result["Homemaking"].find(t => t.name === homemakingNames[i]);
        if (existing) {
          existing.levels.push({ level, cost: totalCost });
        } else {
          result["Homemaking"].push({
            name: homemakingNames[i],
            material: "HQ Tile + HQ Sandstone",
            levels: [{ level, cost: totalCost }]
          });
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const cost1 = Number(row[carIndices[i][0]]) || 0;
      const cost2 = Number(row[carIndices[i][1]]) || 0;
      const totalCost = cost1 + cost2;
      
      if (totalCost > 0) {
        const existing = result["Car Core"].find(t => t.name === carNames[i]);
        if (existing) {
          existing.levels.push({ level, cost: totalCost });
        } else {
          result["Car Core"].push({
            name: carNames[i],
            material: "Plug + Coil",
            levels: [{ level, cost: totalCost }]
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

    if (wb.Sheets["Glass"]) {
      result["HQ Glass"] = parseGlassSheet(wb.Sheets["Glass"]);
    }

    if (wb.Sheets["Artist"]) {
      result["Artists"] = parseArtistSheet(wb.Sheets["Artist"]);
    }

    if (wb.Sheets["Assets"]) {
      result["Assets"] = parseAssetsSheet(wb.Sheets["Assets"], "Assets");
    }

    if (wb.Sheets["Car Parts"]) {
      result["Car Parts"] = parseCarPartsSheet(wb.Sheets["Car Parts"]);
    }

    if (wb.Sheets["Gems"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Gems"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const level = Number(row[0]);
        const cost = Number(row[1]);
        if (level > 0 && cost > 0) {
          items.push({ category: "Collection Gems", item: "Gem", level, cost });
        }
      }
      if (items.length > 0) result["Collection Gems"] = items;
    }

    if (wb.Sheets["Others"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Others"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const level = Number(row[0]);
        const cost = Number(row[2]) || 0;
        if (level > 0 && cost > 0) {
          items.push({ category: "Others", item: "Blueprint", level, cost });
        }
      }
      if (items.length > 0) result["Blueprints"] = items;
    }

    if (wb.Sheets["Floors,Exhibits,Homemaking,CarC"]) {
      const tierData = parseFloorsSheet(wb.Sheets["Floors,Exhibits,Homemaking,CarC"]);
      
      for (const [category, tiers] of Object.entries(tierData)) {
        const items: CalcItem[] = [];
        for (const tier of tiers) {
          for (const lvl of tier.levels) {
            items.push({
              category,
              item: tier.name,
              tier: tier.material,
              level: lvl.level,
              cost: lvl.cost
            });
          }
        }
        if (items.length > 0) {
          result[category] = items;
        }
      }
    }

    if (wb.Sheets["Drones"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Drones"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const name = String(row[0] || "");
        if (!name || name === "null") continue;
        const cost = Number(row[2]) || 0;
        if (cost > 0) {
          items.push({ category: "Villa Suite", item: name, level: 1, cost });
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
