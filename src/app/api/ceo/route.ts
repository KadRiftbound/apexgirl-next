import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export type EventItem = {
  item: string;
  cost: number;
  points: number;
  bonus?: number;
};

export type EventData = {
  name: string;
  items: EventItem[];
};

function parseEvent(ws: XLSX.WorkSheet): EventData | null {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];

  if (!raw.length || !raw[0]) return null;

  const name = String(raw[0]?.[0] ?? "Event");

  const items: EventItem[] = [];
  let foundData = false;

  for (const row of raw) {
    if (!Array.isArray(row)) continue;
    const col0 = String(row[0] ?? "");
    
    if (col0.toLowerCase().includes("item")) {
      foundData = true;
      continue;
    }
    if (!foundData) continue;
    if (!col0 || col0 === "Event Name") continue;

    const cost = typeof row[1] === "number" ? row[1] : Number(row[1]) || 0;
    const points = typeof row[2] === "number" ? row[2] : Number(row[2]) || 0;
    const bonus = typeof row[3] === "number" ? row[3] : Number(row[3]) || 0;

    if (cost > 0 || points > 0) {
      items.push({
        item: col0,
        cost,
        points,
        bonus: bonus || undefined,
      });
    }
  }

  return { name, items };
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "tools", "ceo-data.xlsx");
    const fileBuffer = fs.readFileSync(filePath);
    const wb = XLSX.read(fileBuffer, { type: "buffer", cellDates: true });

    const result: EventData[] = [];
    for (const sheetName of wb.SheetNames) {
      const eventData = parseEvent(wb.Sheets[sheetName]);
      if (eventData && eventData.items.length > 0) {
        result.push(eventData);
      }
    }

    return NextResponse.json({ events: result });
  } catch (error) {
    console.error("CEO events route failed", error);
    return NextResponse.json({ error: String(error), events: [] }, { status: 500 });
  }
}
