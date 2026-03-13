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

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "tools", "apexcalc-data.xlsx");
    const fileBuffer = fs.readFileSync(filePath);
    const wb = XLSX.read(fileBuffer, { type: "buffer", cellDates: true });

    const result: Record<string, CalcItem[]> = {};

    for (const sheetName of wb.SheetNames) {
      const ws = wb.Sheets[sheetName];
      const raw = XLSX.utils.sheet_to_json(ws) as Record<string, unknown>[];
      
      const items: CalcItem[] = raw
        .filter(row => row["Item"] && row["Level"])
        .map(row => ({
          category: sheetName,
          item: String(row["Item"] || ""),
          level: Number(row["Level"]) || 0,
          cost: Number(row["Cost"] || row["cost"] || 0),
        }))
        .filter(item => item.cost > 0);

      if (items.length > 0) {
        result[sheetName] = items;
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Calculator route failed", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
