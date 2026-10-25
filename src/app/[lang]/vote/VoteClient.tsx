"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import artistsData from "@/lib/data/artists.json";
import { AdBanner } from "@/components/AdSense";
import { slugify } from "@/lib/utils/slugify";
import type { Artist } from "@/lib/types/artist";
import "./vote.css";

type Copy = {
  banner: string; alreadyVoted: string; podium: string; fullRanking: string; voteForArtist: string;
  vote: string; votes: string; voteError: string; voteSuccess: string; voteAlreadyVoted: string;
  search: string; myVote: string; tierList: string; teamBuilder: string; noVotes: string;
};
const copy: Record<string, Copy> = {
  fr: { banner: "Un vote par jour. Le classement se remet à zéro chaque semaine.", alreadyVoted: "Vous avez voté aujourd'hui, revenez demain !", podium: "Podium de la semaine", fullRanking: "Classement complet", voteForArtist: "Votez pour une artiste", vote: "Voter", votes: "votes", voteError: "Une erreur est survenue.", voteSuccess: "Votre vote a été comptabilisé !", voteAlreadyVoted: "Vous avez déjà voté aujourd'hui.", search: "Chercher une artiste…", myVote: "Mon vote", tierList: "Voir la tier list", teamBuilder: "Composer une équipe", noVotes: "Aucun vote cette semaine pour le moment. Lancez le mouvement !" },
  en: { banner: "One vote a day. The ranking resets every week.", alreadyVoted: "You voted today, come back tomorrow!", podium: "Podium of the week", fullRanking: "Full ranking", voteForArtist: "Vote for an artist", vote: "Vote", votes: "votes", voteError: "An error occurred.", voteSuccess: "Your vote has been counted!", voteAlreadyVoted: "You have already voted today.", search: "Search an artist…", myVote: "My vote", tierList: "See the tier list", teamBuilder: "Build a team", noVotes: "No vote this week yet. Start the movement!" },
  id: { banner: "Satu suara per hari. Peringkat diatur ulang setiap minggu.", alreadyVoted: "Kamu sudah memilih hari ini, kembali besok!", podium: "Podium minggu ini", fullRanking: "Peringkat lengkap", voteForArtist: "Pilih seorang artis", vote: "Vote", votes: "suara", voteError: "Terjadi kesalahan.", voteSuccess: "Suara kamu telah dihitung!", voteAlreadyVoted: "Kamu sudah memilih hari ini.", search: "Cari artis…", myVote: "Pilihanku", tierList: "Lihat tier list", teamBuilder: "Susun tim", noVotes: "Belum ada suara minggu ini. Mulai duluan!" },
};

const rankColors: Record<string, string> = {
  UR: "#ffd700", "UR Roma": "#ef4444", "UR Bali": "#ef4444", SSR: "#c084fc", SR: "#60a5fa", R: "#4ade80", N: "#94a3b8",
};
const rankOrderMap: Record<string, number> = { UR: 1, "UR Roma": 1, "UR Bali": 1, SSR: 2, SR: 3, R: 4, N: 5 };

type VoteRow = { artist_id?: number; artist_name: string; rank?: string; count?: number; week_count: number };

export default function VoteClient({ lang }: { lang: string }) {
  const t = copy[lang] || copy.en;
  const artists = artistsData as Artist[];

  const [voteData, setVoteData] = useState<{ rankings?: { this_week?: VoteRow[] } } | null>(null);
  const [votedToday, setVotedToday] = useState(false);
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [voting, setVoting] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Remember today's vote across reloads
  useEffect(() => {
    try {
      const today = new Date().toISOString().split("T")[0];
      if (localStorage.getItem("voteDate") === today) {
        setVotedToday(true);
        setVotedFor(localStorage.getItem("voteFor"));
      }
    } catch {}
    load();
  }, []);

  const load = async () => {
    try {
      const res = await fetch("/api/vote");
      setVoteData(await res.json());
    } catch (e) {
      console.error("Failed to load vote data", e);
    }
  };

  const flash = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const handleVote = async (artistName: string) => {
    setVoting(artistName);
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artist_name: artistName }),
      });
      const data = await res.json();
      if (data.success) {
        flash("success", t.voteSuccess);
        setVotedToday(true);
        setVotedFor(artistName);
        try {
          localStorage.setItem("voteDate", new Date().toISOString().split("T")[0]);
          localStorage.setItem("voteFor", artistName);
        } catch {}
        load();
      } else {
        const msg = String(data.message || "").toLowerCase();
        const already = ["already", "déjà", "già", "ya has", "já votou", "oddałeś", "sudah", "уже"].some((w) => msg.includes(w));
        flash("error", already ? t.voteAlreadyVoted : t.voteError);
        if (already) setVotedToday(true);
      }
    } catch {
      flash("error", t.voteError);
    } finally {
      setVoting(null);
    }
  };

  const ranking: VoteRow[] = (voteData?.rankings?.this_week || []).slice(0, 15);
  const top3 = ranking.slice(0, 3);
  const maxVotes = Math.max(1, ...ranking.map((r) => r.week_count || 0));
  const q = query.trim().toLowerCase();
  const votable = [...artists]
    .filter((a) => !q || a.name.toLowerCase().includes(q) || (a.genre || "").toLowerCase().includes(q))
    .sort((a, b) => (rankOrderMap[a.rank] || 99) - (rankOrderMap[b.rank] || 99) || a.name.localeCompare(b.name));
  const find = (name: string) => artists.find((x) => x.name === name);

  return (
    <div className="vt">
      {message && (
        <div role="alert" className={`vt-toast ${message.type}`}>{message.text}</div>
      )}

      <div className={`vt-banner${votedToday ? " done" : ""}`}>
        <span className="vt-banner-dot" aria-hidden="true" />
        <span>{votedToday ? t.alreadyVoted : t.banner}</span>
        {votedFor && <span className="vt-banner-for">{t.myVote} : <b>{votedFor}</b></span>}
      </div>

      {/* Podium */}
      <section className="vt-section">
        <h2 className="vt-h2">{t.podium}</h2>
        {top3.length === 0 ? (
          <p className="vt-empty">{t.noVotes}</p>
        ) : (
          <div className="vt-podium">
            {top3.map((entry, i) => {
              const a = find(entry.artist_name);
              return (
                <Link key={entry.artist_name} href={`/${lang}/artist/${slugify(entry.artist_name)}/`} className={`vt-podium-card p${i + 1}`}>
                  <span className="vt-place">{i + 1}</span>
                  <span className="vt-podium-img">
                    {a?.image ? <Image src={`/assets/images/artists/${a.image}`} alt={entry.artist_name} fill sizes="240px" style={{ objectFit: "cover", objectPosition: "center 15%" }} /> : <span className="vt-letter">{entry.artist_name.charAt(0)}</span>}
                  </span>
                  <span className="vt-podium-meta">
                    <span className="vt-podium-name">{entry.artist_name}</span>
                    <span className="vt-podium-votes">{entry.week_count} {t.votes}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Full ranking */}
      {ranking.length > 3 && (
        <section className="vt-section">
          <h2 className="vt-h2">{t.fullRanking}</h2>
          <ol className="vt-rank">
            {ranking.map((entry, index) => {
              const a = find(entry.artist_name);
              return (
                <li key={entry.artist_name}>
                  <Link href={`/${lang}/artist/${slugify(entry.artist_name)}/`} className={`vt-row${index < 3 ? " top" : ""}`}>
                    <span className="vt-pos">{index + 1}</span>
                    <span className="vt-row-img">
                      {a?.image && <Image src={`/assets/images/artists/${a.image}`} alt="" fill sizes="44px" style={{ objectFit: "cover", objectPosition: "center 15%" }} />}
                    </span>
                    <span className="vt-row-name">{entry.artist_name}</span>
                    <span className="vt-row-rank" style={{ color: rankColors[entry.rank || ""] || "var(--text-muted)" }}>{entry.rank}</span>
                    <span className="vt-bar"><i style={{ width: `${Math.max(4, (entry.week_count / maxVotes) * 100)}%` }} /></span>
                    <span className="vt-count">{entry.week_count}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      <AdBanner />

      {/* Vote grid */}
      <section className="vt-section">
        <div className="vt-section-head">
          <h2 className="vt-h2">{t.voteForArtist}</h2>
          <label className="vt-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            <span className="sr-only">{t.search}</span>
            <input type="search" placeholder={t.search} value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
        </div>
        <div className="vt-grid">
          {votable.map((artist) => {
            const isVoting = voting === artist.name;
            const mine = votedFor === artist.name;
            const disabled = votedToday || isVoting;
            return (
              <div key={artist.id} className={`vt-tile${mine ? " mine" : ""}`} style={{ ["--rank" as string]: rankColors[artist.rank] || "#94a3b8" }}>
                <Link href={`/${lang}/artist/${slugify(artist.name)}/`} className="vt-tile-link">
                  <span className="vt-tile-img">
                    {artist.image ? <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} fill sizes="140px" style={{ objectFit: "cover" }} /> : <span className="vt-letter">{artist.name.charAt(0)}</span>}
                  </span>
                  <span className="vt-tile-name">{artist.name}</span>
                </Link>
                <button
                  type="button"
                  className={`vt-btn${mine ? " mine" : disabled ? " off" : ""}`}
                  aria-label={`${t.vote} ${artist.name}`}
                  onClick={() => { if (!disabled) handleVote(artist.name); }}
                  disabled={disabled}
                >
                  {isVoting ? "…" : mine ? "✓ " + t.myVote : disabled ? "—" : "♥ " + t.vote}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <div className="vt-links">
        <Link href={`/${lang}/tierlist/`}>{t.tierList} →</Link>
        <Link href={`/${lang}/teambuilder/`}>{t.teamBuilder} →</Link>
      </div>
    </div>
  );
}
