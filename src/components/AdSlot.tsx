"use client";

import Link from "next/link";
import { AdBanner } from "@/components/AdSense";
import { getAffiliateProduct, type AffiliateSlot } from "@/lib/data/affiliateProducts";

interface AdSlotProps {
  slot: AffiliateSlot;
  lang: string;
}

export function AdSlot({ slot, lang }: AdSlotProps) {
  if (lang === "en") {
    const product = getAffiliateProduct(slot);
    return (
      <a
        href={product.url}
        target="_blank"
        rel="nofollow sponsored"
        className="affiliate-card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "14px 18px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "12px",
          textDecoration: "none",
          margin: "16px 0",
          transition: "border-color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = `${product.color}44`;
          el.style.background = "rgba(255,255,255,0.06)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = "rgba(255,255,255,0.10)";
          el.style.background = "rgba(255,255,255,0.03)";
        }}
      >
        <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{product.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem", marginBottom: "2px" }}>
            {product.name}
          </div>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", lineHeight: 1.4 }}>
            {product.tagline}
          </div>
        </div>
        <span style={{ color: product.color, fontSize: "0.78rem", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>
          Amazon →
        </span>
      </a>
    );
  }

  return <AdBanner />;
}
