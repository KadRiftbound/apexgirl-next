"use client";

import { useState } from "react";
import { AdBanner } from "@/components/AdSense";
import { getAffiliateProduct, type AffiliateSlot } from "@/lib/data/affiliateProducts";

interface AdSlotProps {
  slot: AffiliateSlot;
  lang: string;
}

function getEmoji(name: string): string {
  if (name.includes("Pixel Buds") || name.includes("Headphones") || name.includes("earphones") || name.includes("Buds")) return "🎧";
  return "🔋";
}

export function AdSlot({ slot, lang }: AdSlotProps) {
  if (lang !== "en") return <AdBanner />;

  const product = getAffiliateProduct(slot);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <a
      href={product.url}
      target="_blank"
      rel="nofollow sponsored"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px 20px",
        background: "var(--bg-card)",
        borderLeft: `4px solid ${product.color}`,
        borderTop: "1px solid var(--border-light)",
        borderRight: "1px solid var(--border-light)",
        borderBottom: "1px solid var(--border-light)",
        borderRadius: "var(--radius-lg)",
        textDecoration: "none",
        margin: "24px 0",
        boxShadow: "var(--shadow-sm)",
        transition: "box-shadow 0.25s, transform 0.25s",
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${product.color}22`;
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "var(--shadow-sm)";
        el.style.transform = "none";
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "12px",
          flexShrink: 0,
          background: `linear-gradient(135deg, ${product.color}18, ${product.color}06)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: `1px solid ${product.color}15`,
        }}
      >
        {!imgLoaded && (
          <span style={{ fontSize: "2rem", opacity: 0.4, lineHeight: 1 }}>
            {getEmoji(product.name)}
          </span>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: "6px",
            display: imgLoaded ? "block" : "none",
          }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: product.color,
            background: `${product.color}15`,
            padding: "2px 8px",
            borderRadius: "4px",
          }}>
            Pick
          </span>
        </div>
        <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: "3px", lineHeight: 1.3 }}>
          {product.name}
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.4 }}>
          {product.tagline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: `${product.color}18`,
          color: product.color,
          padding: "8px 14px",
          borderRadius: "8px",
          fontSize: "0.8rem",
          fontWeight: 700,
          whiteSpace: "nowrap",
          flexShrink: 0,
          border: `1px solid ${product.color}30`,
        }}
      >
        Amazon
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </div>
    </a>
  );
}
