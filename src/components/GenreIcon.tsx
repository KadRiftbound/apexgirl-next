"use client";

/**
 * Genre glyphs taken from the in-game filter bar (public/assets/images/genres/*.png, white on transparent):
 * hat = Hip Hop, trumpet = R&B, drum = Rock, microphone = Pop, keyboard = EDM.
 * Rendered through a CSS mask so they take any colour (currentColor), white by default.
 */
import type { CSSProperties } from "react";

export const GENRES = ["Hip Hop", "R&B", "Rock", "Pop", "EDM"] as const;
export type Genre = (typeof GENRES)[number];

export const genreColors: Record<string, string> = {
  "Hip Hop": "#f59e0b",
  "R&B": "#06b6d4",
  Rock: "#ef4444",
  Pop: "#ec4899",
  EDM: "#8b5cf6",
};

const files: Record<string, string> = {
  "Hip Hop": "hiphop",
  "R&B": "rnb",
  Rock: "rock",
  Pop: "pop",
  EDM: "edm",
};

export function GenreIcon({ genre, size = 18, className, style, title }: { genre: string; size?: number; className?: string; style?: CSSProperties; title?: string }) {
  const file = files[genre];
  if (!file) return null;
  const url = `url(/assets/images/genres/${file}.png)`;
  return (
    <span
      className={`genre-ico${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={title ?? genre}
      title={title ?? genre}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: url,
        maskImage: url,
        ...style,
      }}
    />
  );
}

/** Segmented genre filter, like the in-game bar: "All" + the five genre glyphs. */
export function GenreBar({ value, onChange, allLabel, className }: { value: string; onChange: (genre: string) => void; allLabel: string; className?: string }) {
  return (
    <div className={`gbar${className ? ` ${className}` : ""}`} role="group" aria-label="Genre">
      <button type="button" className={`gbar-btn gbar-all${value === "" ? " on" : ""}`} onClick={() => onChange("")} aria-pressed={value === ""}>
        {allLabel}
      </button>
      {GENRES.map((g) => (
        <button
          key={g}
          type="button"
          className={`gbar-btn${value === g ? " on" : ""}`}
          onClick={() => onChange(value === g ? "" : g)}
          aria-pressed={value === g}
          title={g}
          aria-label={g}
        >
          <GenreIcon genre={g} size={24} />
        </button>
      ))}
    </div>
  );
}
