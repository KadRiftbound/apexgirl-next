"use client";

import Link from "next/link";
import { useState } from "react";

import { AdSlot } from "@/components/AdSlot";
import { activeCodes } from "@/lib/data/codes";
import { getHomeContent } from "@/lib/i18n/home";

function formatExpiry(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const localeMap: Record<string, string> = {
    fr: "fr-FR", en: "en-GB", it: "it-IT", es: "es-ES",
    pt: "pt-BR", pl: "pl-PL", id: "id-ID", ru: "ru-RU", de: "de-DE",
  };
  return date.toLocaleDateString(localeMap[lang] || "en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatLastUpdated(lang: string): string {
  const localeMap: Record<string, string> = {
    fr: "fr-FR", en: "en-GB", it: "it-IT", es: "es-ES",
    pt: "pt-BR", pl: "pl-PL", id: "id-ID", ru: "ru-RU", de: "de-DE",
  };

  return new Date().toLocaleDateString(localeMap[lang] || "en-GB", {
    month: "long",
    year: "numeric",
  });
}



export default function HomeClient({ lang }: { lang: string }) {
  const t = getHomeContent(lang);
  const lastUpdatedText = formatLastUpdated(lang);
  const lastUpdatedLabel = t.lastUpdatedLabel;
  const updatedFrequency = t.updatedFrequency;

  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <div className="hero-content">
        <div className="hero-badge">TopGirl / ApexGirl</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
            {lastUpdatedLabel}: {lastUpdatedText}
          </span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 500 }}>
            {updatedFrequency}
          </span>
        </div>
        <h1 className="hero-title">{t.homeTitle}</h1>
        <p className="hero-subtitle" dangerouslySetInnerHTML={{ __html: t.subtitle }} />
        <div className="hero-stats">
          <span><strong>112+</strong> {t.statArtists}</span>
          <span className="stat-dot">·</span>
          <span><strong>50+</strong> {t.statGuides}</span>
          <span className="stat-dot">·</span>
          <span><strong>5+</strong> {t.statTools}</span>
        </div>
        <div className="hero-cta-frame">
          <div className="hero-cta-label">{t.quickAccessTitle}</div>
          <div className="hero-ctas">
            <Link href={`/${lang}/teambuilder/`} className="hero-cta cta-artists">
              <span className="cta-emoji">🎤</span>
              <span className="cta-label">{t.discoverArtists}</span>
            </Link>
            <Link href={`/${lang}/tierlist/`} className="hero-cta cta-tier">
              <span className="cta-emoji">🏆</span>
              <span className="cta-label">{t.tierListVotes}</span>
            </Link>
            <Link href={`/${lang}/tools/`} className="hero-cta cta-tools">
              <span className="cta-emoji">🛠️</span>
              <span className="cta-label">{t.seeTools}</span>
            </Link>
            <Link href={`/${lang}/guides/`} className="hero-cta cta-guides">
              <span className="cta-emoji">📖</span>
              <span className="cta-label">{t.seeGuides}</span>
            </Link>
          </div>
        </div>
      </div>
      {/* ═══════════════════════════════════════════
          TL;DR — Quick answers in 10 seconds
      ═══════════════════════════════════════════ */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(20, 20, 40, 0.95))',
          borderRadius: '20px',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          padding: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
              {t.quickAccessTitle}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {t.tldrCards.map((card, i) => (
              <div key={i} style={{ background: 'rgba(30,30,50,0.8)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                  {card.title}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                  {card.desc}
                </p>
                <Link href={`/${lang}${card.href}`} style={{ color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                  {card.linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════════
          SECTIONS — ce qu'on propose (premier contenu vu)
      ═══════════════════════════════════════════ */}
      <section className="offer-section">
        <div className="offer-inner">
          <h2 className="offer-title">{t.whatWeOffer}</h2>
          <div className="offer-grid">
            {t.sections.map((s: any, i: number) => (
              <Link key={i} href={`/${lang}/${s.href}/`} className="offer-card">
                <div className="offer-card-icon" style={{ color: s.color, background: `${s.color}18`, borderColor: `${s.color}33` }}>
                  {s.emoji}
                </div>
                <div className="offer-card-body">
                  <div className="offer-card-title">{s.title}</div>
                  <div className="offer-card-desc">{s.desc}</div>
                  <div className="offer-card-detail">{s.detail}</div>
                </div>
                <div className="offer-card-arrow" style={{ color: s.color }}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-inner">
          <h2 className="editorial-title">{t.editorialTitle}</h2>
          <div className="editorial-grid">
            {t.editorialCards.map((card, i) => (
              <article key={i} className="editorial-card">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <Link href={`/${lang}${card.href}`}>{card.link}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT IS TOPGIRL — war game explainer
      ═══════════════════════════════════════════ */}
      <section className="explainer-section">
        <div className="explainer-inner">
          <h2 className="explainer-title">{t.explainerTitle}</h2>

          {t.explainerParagraphs.map((p, i) => (
            <p key={i} className="explainer-p">{p}</p>
          ))}

          <div className="explainer-links">
            {t.explainerLinks.map((link, i) => (
              <Link key={i} href={`/${lang}${link.href}`} className="explainer-link">
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CODES PROMO
      ═══════════════════════════════════════════ */}
      <div className="home-container">
        <section className="section-codes">
          <div className="codes-header">
            <div>
              <h2 className="codes-title">🎁 {t.promoCodes}</h2>
              <p className="codes-subtitle">{t.promoSubtitle}</p>
            </div>
            <Link href={`/${lang}/codes/`} className="codes-see-all">{t.seeAllCodes}</Link>
          </div>
          <div className="codes-list">
            {activeCodes.map(c => (
              <div key={c.code} className="code-row">
                <div className="code-info">
                  <div className="code-top-line">
                    <span className="code-value">{c.code}</span>
                    {c.rarity === "new" && <span className="code-new">{t.newLabel}</span>}
                  </div>
                  <div className="code-meta">
                    <span className="code-rewards">{c.rewards}</span>
                    <span className="code-expires">{t.expiresOn} {formatExpiry(c.expires, lang)}</span>
                  </div>
                </div>
                <button
                  className={`code-copy-btn ${copiedCode === c.code ? "copied" : ""}`}
                  onClick={() => copyCode(c.code)}
                  aria-label={`${copiedCode === c.code ? t.copied : t.copy} ${c.code}`}
                >
                  {copiedCode === c.code ? t.copied : t.copy}
                </button>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="home" lang={lang} />
      </div>

      <style jsx>{`

        /* ── HERO ─────────────────────────────────── */
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
          width: 100%;
          padding: 48px 24px 52px;
        }

        .hero-badge {
          display: inline-block;
          padding: 6px 18px;
          background: rgba(255,77,141,0.40);
          border: 1px solid rgba(255,77,141,0.75);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 18px;
        }
        .hero-title {
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.05;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #fff 0%, #ff80ab 45%, #c084fc 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: clamp(1.05rem, 2.2vw, 1.25rem);
          color: rgba(255,255,255,0.90);
          margin-bottom: 22px;
          line-height: 1.65;
          max-width: 580px;
        }
        .hero-subtitle :global(strong) {
          color: #ff80ab;
          font-weight: 700;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.92rem;
          color: rgba(255,255,255,0.65);
          margin-bottom: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hero-stats strong { color: rgba(255,255,255,0.95); }
        .stat-dot { opacity: 0.35; }
        .hero-cta-frame {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 18px;
          padding: 24px 28px 20px;
          background: rgba(255,255,255,0.03);
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-cta-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.3);
          margin-bottom: 14px;
          text-align: center;
        }
        .hero-ctas {
          display: flex;
          gap: 14px;
          justify-content: center;
          width: 100%;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 36px;
          border-radius: 14px;
          text-decoration: none;
          color: #fff;
          font-weight: 800;
          font-size: 1.25rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease, border-color 0.25s ease;
          border: 2px solid rgba(255,255,255,0.22);
          min-width: 0;
          cursor: pointer;
        }
        .hero-cta:hover {
          transform: translateY(-3px) scale(1.03);
          filter: brightness(1.12);
          border-color: rgba(255,255,255,0.45);
        }
        .cta-artists {
          background: linear-gradient(135deg, #ff2d78, #ff80ab);
          box-shadow: 0 6px 28px rgba(255,45,120,0.45);
        }
        .cta-artists:hover {
          box-shadow: 0 10px 40px rgba(255,45,120,0.60);
        }
        .cta-tier {
          background: linear-gradient(135deg, #f59e0b, #ffd700);
          box-shadow: 0 6px 28px rgba(245,158,11,0.40);
        }
        .cta-tier:hover {
          box-shadow: 0 10px 40px rgba(245,158,11,0.55);
        }
        .cta-tools {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          box-shadow: 0 6px 28px rgba(59,130,246,0.40);
        }
        .cta-tools:hover {
          box-shadow: 0 10px 40px rgba(59,130,246,0.55);
        }
        .cta-guides {
          background: linear-gradient(135deg, #22c55e, #4ade80);
          box-shadow: 0 6px 28px rgba(34,197,94,0.40);
        }
        .cta-guides:hover {
          box-shadow: 0 10px 40px rgba(34,197,94,0.55);
        }
        .cta-emoji {
          font-size: 1.8rem;
          flex-shrink: 0;
        }
        .cta-label {
          white-space: nowrap;
        }

        /* ── OFFER SECTION ────────────────────────── */
        .offer-section {
          background: rgba(20,20,36,0.96);
          border-top: 1px solid rgba(255,255,255,0.09);
          border-bottom: 1px solid rgba(255,255,255,0.09);
          padding: 52px 20px;
        }
        .offer-inner {
          max-width: 900px;
          margin: 0 auto;
        }
        .offer-title {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-align: center;
          margin-bottom: 32px;
        }
        .offer-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .offer-card {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 26px 22px;
          background: rgba(30,30,48,0.85);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 18px;
          text-decoration: none;
          transition: border-color 0.2s, transform 0.2s, background 0.2s;
        }
        .offer-card:hover {
          background: rgba(38,38,60,0.98);
          transform: translateY(-3px);
        }
        .offer-card-icon {
          font-size: 2.2rem;
          width: 58px;
          height: 58px;
          border-radius: 14px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .offer-card-body { flex: 1; min-width: 0; }
        .offer-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 4px;
        }
        .offer-card-desc {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          margin-bottom: 6px;
        }
        .offer-card-detail {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.45;
        }
        .offer-card-arrow {
          font-size: 1.3rem;
          font-weight: 700;
          flex-shrink: 0;
          align-self: center;
          opacity: 0.5;
          transition: transform 0.2s, opacity 0.2s;
        }
        .offer-card:hover .offer-card-arrow {
          transform: translateX(4px);
          opacity: 1;
        }
        .offer-card:hover .offer-card-icon {
          border-color: currentColor;
        }

        /* ── EDITORIAL TRUST ─────────────────────── */
        .editorial-section {
          padding: 42px 20px 24px;
        }
        .editorial-inner {
          max-width: 980px;
          margin: 0 auto;
        }
        .editorial-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 18px;
          text-align: center;
        }
        .editorial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .editorial-card {
          background: rgba(26,26,44,0.86);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 18px;
        }
        .editorial-card h3 {
          margin: 0 0 8px;
          color: #fff;
          font-size: 1rem;
        }
        .editorial-card p {
          margin: 0 0 10px;
          color: rgba(255,255,255,0.72);
          font-size: 0.88rem;
          line-height: 1.55;
        }
        .editorial-card :global(a) {
          color: #8b5cf6;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
        }



        /* ── LAYOUT ───────────────────────────────── */
        .home-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }

        /* ── CODES ────────────────────────────────── */
        .section-codes {
          background: rgba(22,22,31,0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }
        .codes-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 18px;
          gap: 12px;
        }
        .codes-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }
        .codes-subtitle {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }
        .codes-see-all {
          font-size: 0.78rem;
          color: #ff4d8d;
          text-decoration: none;
          white-space: nowrap;
          font-weight: 600;
          padding: 6px 12px;
          border: 1px solid rgba(255,77,141,0.3);
          border-radius: 8px;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .codes-see-all:hover { background: rgba(255,77,141,0.1); color: #ff80ab; }
        .codes-list { display: flex; flex-direction: column; gap: 8px; }
        .code-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
        }
        .code-info { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .code-top-line { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .code-value {
          font-family: monospace;
          font-size: 0.95rem;
          font-weight: 700;
          color: #ff80ab;
          letter-spacing: 0.03em;
        }
        .code-new {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #22c55e;
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.3);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .code-meta { display: flex; flex-direction: column; gap: 1px; }
        .code-rewards { font-size: 0.78rem; color: rgba(255,255,255,0.55); }
        .code-expires { font-size: 0.7rem; color: rgba(255,255,255,0.55); }
        .code-copy-btn {
          padding: 7px 16px;
          background: rgba(255,77,141,0.15);
          border: 1px solid rgba(255,77,141,0.35);
          color: #ff80ab;
          font-size: 0.78rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .code-copy-btn:hover { background: rgba(255,77,141,0.28); }
        .code-copy-btn.copied {
          background: rgba(34,197,94,0.18);
          border-color: rgba(34,197,94,0.4);
          color: #22c55e;
        }

        /* ── EXPLAINER SECTION ────────────────────── */
        .explainer-section {
          background: rgba(18,20,34,0.92);
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 48px 20px;
        }
        .explainer-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .explainer-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 24px;
          text-align: center;
        }
        .explainer-p {
          font-size: 0.98rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
          margin: 0 0 18px;
        }
        .explainer-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 24px;
          justify-content: center;
        }
        .explainer-link {
          font-size: 0.9rem;
          color: #8b5cf6;
          text-decoration: none;
          font-weight: 600;
          padding: 10px 20px;
          border: 1px solid rgba(139,92,246,0.3);
          border-radius: 10px;
          transition: background 0.2s;
        }
        .explainer-link:hover {
          background: rgba(139,92,246,0.1);
          color: #a78bfa;
        }

        /* ── RESPONSIVE ───────────────────────────── */
        @media (max-width: 600px) {
          .hero-content {
            padding: 24px 16px 28px;
          }
          .hero-badge { font-size: 0.65rem; padding: 4px 12px; margin-bottom: 8px; }
          .hero-title { font-size: 1.8rem; letter-spacing: -1px; margin-bottom: 6px; }
          .hero-subtitle { display: none; }
          .hero-stats { display: none; }
          .hero-cta-frame { padding: 16px 14px 14px; border-radius: 14px; }
          .hero-cta-label { margin-bottom: 10px; font-size: 0.65rem; }
          .hero-ctas { flex-direction: column; gap: 8px; padding: 0; }
          .hero-cta { padding: 12px 16px; font-size: 0.9rem; border-radius: 12px; justify-content: center; border-width: 1.5px; }
          .cta-emoji { font-size: 1.2rem; }
          .offer-section { padding: 24px 12px; }
          .offer-inner { padding: 0; }
          .offer-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .offer-card { flex-direction: column; align-items: flex-start; padding: 14px 12px; gap: 8px; }
          .offer-card-icon { width: 40px; height: 40px; font-size: 1.4rem; }
          .offer-card-title { font-size: 0.88rem; }
          .offer-card-desc { font-size: 0.68rem; margin-bottom: 0; }
          .offer-card-detail { display: none; }
          .offer-card-arrow { display: none; }
          .editorial-section { padding: 22px 12px 6px; }
          .editorial-grid { grid-template-columns: 1fr; gap: 10px; }
          .editorial-title { font-size: 1.05rem; }
          .editorial-card { padding: 14px; }
          .codes-header { flex-direction: column; }
          .explainer-section { padding: 28px 16px; }
          .explainer-title { font-size: 1.2rem; margin-bottom: 16px; }
          .explainer-p { font-size: 0.88rem; margin-bottom: 14px; }
          .explainer-links { flex-direction: column; align-items: center; }
        }
      `}</style>
    </>
  );
}
