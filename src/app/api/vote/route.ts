import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  console.log('getRedis called, url:', url ? 'exists' : 'missing', 'token:', token ? 'exists' : 'missing');
  
  if (url && token && url.startsWith('http')) {
    redis = new Redis({ url, token });
    console.log('Redis client created');
    return redis;
  }
  
  console.log('Redis not configured, returning null');
  return null;
}

interface VoteEntry {
  artist_id: number;
  artist_name: string;
  rank: string;
  count: number;
  week_count: number;
}

interface WeeklyTop extends VoteEntry {
  week_start: string;
}

interface VoteData {
  votes: VoteEntry[];
  weekly_top: WeeklyTop | null;
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
  const r = getRedis();
  console.log('readVotes: r is null?', !r);
  
  if (!r) {
    console.error("Redis not configured");
    return { votes: [], weekly_top: null };
  }
  try {
    const votesData = await r.get("votes:all");
    console.log('votesData:', votesData ? 'exists' : 'null', 'type:', typeof votesData);
    const votes: VoteEntry[] = votesData ? votesData as VoteEntry[] : [];
    
    const weekly_top = await r.get("weekly_top");
    
    return { 
      votes, 
      weekly_top: weekly_top ? weekly_top as WeeklyTop : null 
    };
  } catch (error) {
    console.error("Error reading votes:", error);
    return { votes: [], weekly_top: null };
  }
}

async function writeVotes(data: VoteData): Promise<void> {
  const r = getRedis();
  if (!r) {
    console.error("Redis not configured - votes will not be saved");
    return;
  }
  try {
    await r.set("votes:all", JSON.stringify(data.votes));
    if (data.weekly_top) {
      await r.set("weekly_top", JSON.stringify(data.weekly_top));
    }
  } catch (error) {
    console.error("Error writing votes:", error);
  }
}

async function getIPVotes(ip: string): Promise<{ last_vote: string; votes_today: number } | null> {
  const r = getRedis();
  if (!r) {
    return null;
  }
  try {
    const key = `ip_votes:${ip}`;
    const data = await r.get(key);
    return data ? data as { last_vote: string; votes_today: number } : null;
  } catch {
    return null;
  }
}

async function setIPVotes(ip: string, data: { last_vote: string; votes_today: number }): Promise<void> {
  const r = getRedis();
  if (!r) {
    return;
  }
  try {
    const key = `ip_votes:${ip}`;
    await r.set(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error setting IP votes:", error);
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
    const { artist_id, artist_name } = body;
    
    console.log('Vote request for artist:', artist_name || artist_id);
    
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || request.headers.get("x-real-ip") 
      || "unknown";
    
    console.log('Client IP:', ip);
    
    const data = await readVotes();
    console.log('Votes loaded:', data.votes.length);
    
    const today = getToday();
    const weekStart = getWeekStart();

    const ipVoteData = await getIPVotes(ip);
    
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
    
    // Find artist by name or id
    let artistIndex = -1;
    if (artist_name) {
      artistIndex = data.votes.findIndex(v => v.artist_name === artist_name);
    } else if (artist_id) {
      // Fallback to id lookup (legacy support)
      artistIndex = data.votes.findIndex(v => v.artist_id === artist_id);
    }
    
    console.log('Artist index:', artistIndex);
    
    if (artistIndex === -1) {
      return NextResponse.json({
        success: false,
        message: "Artiste non trouvé",
      }, { status: 404 });
    }
    
    data.votes[artistIndex].count += 1;
    data.votes[artistIndex].week_count += 1;
    
    if (!ipVoteData) {
      await setIPVotes(ip, { last_vote: today, votes_today: 1 });
    } else if (ipVoteData.last_vote !== today) {
      await setIPVotes(ip, { last_vote: today, votes_today: 1 });
    } else {
      await setIPVotes(ip, { last_vote: today, votes_today: ipVoteData.votes_today + 1 });
    }
    
    const topWeek = [...data.votes].sort((a, b) => b.week_count - a.week_count)[0];
    if (topWeek && topWeek.week_count > 0) {
      data.weekly_top = {
        artist_id: topWeek.artist_id,
        artist_name: topWeek.artist_name,
        rank: topWeek.rank,
        count: topWeek.week_count,
        week_count: topWeek.week_count,
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
