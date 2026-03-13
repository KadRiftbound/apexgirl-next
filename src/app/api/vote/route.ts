import { NextRequest, NextResponse } from "next/server";
import { getFirebaseDatabase, getFirebaseApp } from "@/lib/firebase";
import { ref, get, set, runTransaction } from "firebase/database";

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

export async function GET() {
  try {
    const db = getFirebaseDatabase();
    const votesRef = ref(db, "votes");
    const snapshot = await get(votesRef);
    
    if (!snapshot.exists()) {
      return NextResponse.json({
        rankings: { all_time: [], this_week: [] },
        weekly_top: null,
      });
    }
    
    const data = snapshot.val();
    const votes = Object.values(data.votes || {}) as any[];
    
    const sortedByTotal = [...votes].sort((a, b) => b.count - a.count);
    const sortedByWeek = [...votes].sort((a, b) => b.week_count - a.count);
    
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
    
    const db = getFirebaseDatabase();
    const today = getToday();
    const weekStart = getWeekStart();
    
    const ipRef = ref(db, `ip_votes/${ip}`);
    const ipSnapshot = await get(ipRef);
    
    if (ipSnapshot.exists()) {
      const ipData = ipSnapshot.val();
      if (ipData.last_vote === today && ipData.votes_today >= 1) {
        const nextVoteTime = new Date();
        nextVoteTime.setDate(nextVoteTime.getDate() + 1);
        nextVoteTime.setHours(0, 0, 0, 0);
        
        return NextResponse.json({
          success: false,
          message: "Vous avez déjà voted aujourd'hui ! Revenez demain.",
          next_vote: nextVoteTime.toISOString(),
        }, { status: 429 });
      }
    }
    
    const artistRef = ref(db, `votes/artists/${artist_id}`);
    
    let artistData: any = null;
    const artistSnapshot = await get(artistRef);
    if (artistSnapshot.exists()) {
      artistData = artistSnapshot.val();
    } else {
      return NextResponse.json({
        success: false,
        message: "Artiste non trouvé",
      }, { status: 404 });
    }
    
    await runTransaction(artistRef, (current: any) => {
      if (current) {
        return {
          ...current,
          count: (current.count || 0) + 1,
          week_count: (current.week_count || 0) + 1,
        };
      }
      return current;
    });
    
    await set(ipRef, {
      last_vote: today,
      votes_today: 1,
    });
    
    const updatedSnapshot = await get(artistRef);
    const updatedData = updatedSnapshot.val();
    
    const allVotesRef = ref(db, "votes/artists");
    const allSnapshot = await get(allVotesRef);
    const allVotes = Object.values(allSnapshot.val() || {}) as any[];
    const topWeek = [...allVotes].sort((a, b) => (b.week_count || 0) - (a.week_count || 0))[0];
    
    if (topWeek && (topWeek.week_count || 0) > 0) {
      await set(ref(db, "votes/weekly_top"), {
        artist_id: topWeek.artist_id,
        artist_name: topWeek.artist_name,
        rank: topWeek.rank,
        count: topWeek.week_count,
        week_start: weekStart,
      });
    }
    
    return NextResponse.json({
      success: true,
      message: "Vote enregistré ! Merci pour votre vote !",
      votes: updatedData,
      remaining_votes: 0,
    });
    
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({
      success: false,
      message: "Erreur lors du vote",
    }, { status: 500 });
  }
}
