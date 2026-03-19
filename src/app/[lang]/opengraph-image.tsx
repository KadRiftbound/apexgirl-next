import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TopGirl Guide — Fansite guides, tools & tier list";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const taglines: Record<string, string> = {
    fr: "Guides · Outils · Tier List · Codes Promo",
    en: "Guides · Tools · Tier List · Promo Codes",
    it: "Guide · Strumenti · Tier List · Codici Promo",
    es: "Guías · Herramientas · Tier List · Códigos Promo",
    pt: "Guias · Ferramentas · Tier List · Códigos Promo",
    pl: "Poradniki · Narzędzia · Tier List · Kody Promo",
    id: "Panduan · Alat · Tier List · Kode Promo",
    ru: "Руководства · Инструменты · Tier List · Промокоды",
  };

  const tagline = taglines[lang] ?? taglines.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a18 0%, #12082a 50%, #0a0a18 100%)",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
        }} />

        {/* Logo placeholder text */}
        <div style={{
          fontSize: "80px",
          fontWeight: 800,
          background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
          backgroundClip: "text",
          color: "transparent",
          letterSpacing: "-2px",
          marginBottom: "12px",
          display: "flex",
        }}>
          TopGirl
        </div>

        <div style={{
          fontSize: "28px",
          color: "rgba(255,255,255,0.5)",
          fontWeight: 400,
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginBottom: "40px",
          display: "flex",
        }}>
          Guide
        </div>

        {/* Divider */}
        <div style={{
          width: "120px",
          height: "3px",
          background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
          borderRadius: "2px",
          marginBottom: "36px",
          display: "flex",
        }} />

        {/* Tagline */}
        <div style={{
          fontSize: "22px",
          color: "rgba(255,255,255,0.7)",
          fontWeight: 400,
          display: "flex",
        }}>
          {tagline}
        </div>

        {/* Domain */}
        <div style={{
          position: "absolute",
          bottom: "32px",
          fontSize: "16px",
          color: "rgba(255,255,255,0.25)",
          display: "flex",
        }}>
          apexgirlguide.com
        </div>
      </div>
    ),
    { ...size }
  );
}
