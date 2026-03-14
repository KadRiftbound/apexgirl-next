import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

export type EventItem = {
  task: string;
  points: number;
  used?: number;
  score?: number;
};

export type EventData = {
  name: string;
  items: EventItem[];
};

function parseEventSheet(ws: XLSX.WorkSheet): EventData[] {
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];

  if (!raw.length || !raw[0]) return [];

  // Find event names from the header row
  const name = String(raw[0]?.[1] ?? "TOP CEO EVENT");
  const name2 = String(raw[0]?.[7] ?? "ULTIMATE CEO EVENT");
  const name3 = String(raw[0]?.[13] ?? "WARM UP EVENT");

  const events: EventData[] = [
    { name, items: [] },
    { name: name2, items: [] },
    { name: name3, items: [] },
  ];

  // Parse data rows
  for (let i = 4; i < raw.length; i++) {
    const row = raw[i];
    if (!Array.isArray(row)) continue;

    // Skip rows that don't have task names
    const task1 = String(row[1] || "");
    const task2 = String(row[7] || "");
    const task3 = String(row[13] || "");

    if (task1 && !task1.includes("null") && task1 !== "Task") {
      events[0].items.push({
        task: task1,
        points: Number(row[2]) || 0,
        used: Number(row[3]) || 0,
        score: Number(row[4]) || 0,
      });
    }

    if (task2 && !task2.includes("null") && task2 !== "Task") {
      events[1].items.push({
        task: task2,
        points: Number(row[8]) || 0,
        used: Number(row[9]) || 0,
        score: Number(row[10]) || 0,
      });
    }

    if (task3 && !task3.includes("null") && task3 !== "Task") {
      events[2].items.push({
        task: task3,
        points: Number(row[14]) || 0,
        used: Number(row[15]) || 0,
        score: Number(row[16]) || 0,
      });
    }
  }

  // Filter out empty events
  return events.filter(e => e.items.length > 0);
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "tools", "ceo-data.xlsx");
    const fileBuffer = fs.readFileSync(filePath);
    const wb = XLSX.read(fileBuffer, { type: "buffer", cellDates: true });

    const result: EventData[] = [];
    
    for (const sheetName of wb.SheetNames) {
      const parsed = parseEventSheet(wb.Sheets[sheetName]);
      result.push(...parsed);
    }

    return NextResponse.json({ events: result });
  } catch (error) {
    console.error("CEO events route failed", error);
    return NextResponse.json({ error: String(error), events: [] }, { status: 500 });
  }
}
