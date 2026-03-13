import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const VOTES_FILE = path.join(process.cwd(), "public", "database", "data", "votes.json");

interface VoteData {
  votes: Array<{
    artist_id: number;
    artist_name: string;
    rank: string;
    count: number;
    week_count: number;
  }>;
  ip_votes: Record<string, { last_vote: string; votes_today: number }>;
  weekly_top: {
    artist_id: number;
    artist_name: string;
    rank: string;
    count: number;
    week_start: string;
  } | null;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split("T")[0];
}

async function readVotes(): Promise<VoteData> {
  try {
    const data = await fs.readFile(VOTES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { votes: [], ip_votes: {}, weekly_top: null };
  }
}

async function writeVotes(data: VoteData): Promise<void> {
  try {
    await fs.writeFile(VOTES_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Failed to write votes:", error);
  }
}

export async function GET() {
  try {
    const data = await readVotes();
    
    const votes = data.votes || [];
    const sortedByTotal = [...votes].sort((a, b) => b.count - a.count);
    const sortedByWeek = [...votes].sort((a, b) => b.week_count - a.week_count);
    
    return NextResponse.json({
      rankings: {
        all_time: sortedByTotal.slice(0, 20),
        this_week: sortedByWeek.slice(0, 20),
      },
      weekly_top: data.weekly_top || null,
    });
  } catch (error) {
    console.error("GET vote error:", error);
    return NextResponse.json({ error: "Failed to load votes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { artist_id } = body;
    
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || request.headers.get("x-real-ip") 
      || "unknown";
    
    const data = await readVotes();
    const today = getToday();
    const weekStart = getWeekStart();
    
    const ipVoteData = data.ip_votes[ip];
    
    if (ipVoteData && ipVoteData.last_vote === today && ipVoteData.votes_today >= 1) {
      const nextVoteTime = new Date();
      nextVoteTime.setDate(nextVoteTime.getDate() + 1);
      nextVoteTime.setHours(0, 0, 0, 0);
      
      return NextResponse.json({
        success: false,
        message: "Vous avez déjà voted aujourd'hui ! Revenez demain.",
        next_vote: nextVoteTime.toISOString(),
      }, { status: 429 });
    }
    
    const artistIndex = data.votes.findIndex(v => v.artist_id === artist_id);
    if (artistIndex === -1) {
      return NextResponse.json({
        success: false,
        message: "Artiste non trouvé",
      }, { status: 404 });
    }
    
    data.votes[artistIndex].count += 1;
    data.votes[artistIndex].week_count += 1;
    
    if (!ipVoteData) {
      data.ip_votes[ip] = { last_vote: today, votes_today: 1 };
    } else if (ipVoteData.last_vote !== today) {
      data.ip_votes[ip] = { last_vote: today, votes_today: 1 };
    } else {
      data.ip_votes[ip].votes_today += 1;
    }
    
    const topWeek = [...data.votes].sort((a, b) => b.week_count - a.week_count)[0];
    if (topWeek && topWeek.week_count > 0) {
      data.weekly_top = {
        artist_id: topWeek.artist_id,
        artist_name: topWeek.artist_name,
        rank: topWeek.rank,
        count: topWeek.week_count,
        week_start: weekStart,
      };
    }
    
    await writeVotes(data);
    
    return NextResponse.json({
      success: true,
      message: "Vote enregistré ! Merci pour votre vote !",
      votes: data.votes[artistIndex],
      remaining_votes: 1 - (ipVoteData?.last_vote === today ? ipVoteData.votes_today : 0),
    });
    
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({
      success: false,
      message: "Erreur lors du vote",
    }, { status: 500 });
  }
}
