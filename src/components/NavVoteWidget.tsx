"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import artistsData from "@/lib/data/artists.json";

type Artist = { id: number; name: string; image?: string };

export function NavVoteWidget({ lang }: { lang: string }) {
  const [topArtist, setTopArtist] = useState<{ name: string; image?: string } | null>(null);

  useEffect(() => {
    fetch("/api/vote")
      .then((r) => r.json())
      .then((data) => {
        const top = data?.rankings?.this_week?.[0];
        if (top?.artist_name) {
          const artist = (artistsData as Artist[]).find((a) => a.name === top.artist_name);
          setTopArtist({ name: top.artist_name, image: artist?.image });
        }
      })
      .catch(() => null);
  }, []);

  if (!topArtist) return null;

  return (
    <Link
      href={`/${lang}/tierlist?tab=vote`}
      title={topArtist.name}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        textDecoration: "none",
        padding: "3px 10px 3px 3px",
        borderRadius: "24px",
        border: "1.5px solid rgba(255,215,0,0.5)",
        background: "rgba(255,215,0,0.08)",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        border: "2px solid #ffd700",
        flexShrink: 0,
      }}>
        {topArtist.image ? (
          <Image
            src={`/assets/images/artists/${topArtist.image}`}
            alt={topArtist.name}
            fill
            sizes="28px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: "100%", fontSize: "0.75rem", color: "#ffd700", fontWeight: 800,
          }}>
            {topArtist.name.charAt(0)}
          </span>
        )}
      </div>
      <span style={{
        fontSize: "0.7rem",
        fontWeight: 700,
        color: "#ffd700",
        maxWidth: "70px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
        👑 {topArtist.name}
      </span>
    </Link>
  );
}
