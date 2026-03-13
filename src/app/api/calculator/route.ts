import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export type CalcItem = {
  category: string;
  item: string;
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

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "tools", "apexcalc-data.xlsx");
    const fileBuffer = fs.readFileSync(filePath);
    const wb = XLSX.read(fileBuffer, { type: "buffer", cellDates: true });

    const result: Record<string, CalcItem[]> = {};

    // Parse Glass sheet
    if (wb.Sheets["Glass"]) {
      result["HQ Glass"] = parseGlassSheet(wb.Sheets["Glass"]);
    }

    // Parse Artist sheet
    if (wb.Sheets["Artist"]) {
      result["Artists"] = parseArtistSheet(wb.Sheets["Artist"]);
    }

    // Parse Assets sheet
    if (wb.Sheets["Assets"]) {
      result["Assets"] = parseAssetsSheet(wb.Sheets["Assets"], "Assets");
    }

    // Parse Car Parts sheet
    if (wb.Sheets["Car Parts"]) {
      result["Car Parts"] = parseCarPartsSheet(wb.Sheets["Car Parts"]);
    }

    // Parse Gems (Collection Gems)
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

    // Parse Others (Blueprints, etc)
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

    // Parse Tables (Museum Exhibits)
    if (wb.Sheets["Tables"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Tables"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const level = Number(row[0]);
        const cost = Number(row[1]) || 0;
        if (level > 0 && cost > 0) {
          items.push({ category: "Museum Exhibits", item: "Exhibit", level, cost });
        }
      }
      if (items.length > 0) result["Museum Exhibits"] = items;
    }

    // Handle the complex Floors sheet
    if (wb.Sheets["Floors,Exhibits,Homemaking,CarC"]) {
      const raw = XLSX.utils.sheet_to_json(wb.Sheets["Floors,Exhibits,Homemaking,CarC"], { header: 1 }) as unknown[][];
      const items: CalcItem[] = [];
      for (const row of raw) {
        if (!Array.isArray(row)) continue;
        const level = Number(row[0]);
        const cost = Number(row[1]) || 0;
        if (level > 0 && cost > 0) {
          items.push({ category: "HQ Floors", item: "Floor", level, cost });
        }
      }
      if (items.length > 0) result["HQ Floors"] = items;
    }

    // Drones (as Villa Suite)
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
