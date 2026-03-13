"use client";

import Head from "next/head";
import Link from "next/link";
import { AdBanner } from "@/components/AdSense";

export default function HomePage() {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="TopGirl ApexGirl" />
      </Head>
      
      <div className="container">
        <div style={{
          background: "linear-gradient(90deg, var(--primary), var(--accent))",
          color: "white",
          textAlign: "center",
          padding: "var(--space-3)",
          fontWeight: 700,
          fontSize: "var(--text-sm)",
          marginBottom: "var(--space-8)",
          borderRadius: "var(--radius)"
        }}>
          🚧 SITE EN CONSTRUCTION - TopGirl ApexGirl - Nouveaux codes promo à venir ! 🚧
        </div>

        <section className="hero">
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: 800,
            letterSpacing: "-1px",
            background: "linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "var(--space-4)"
          }}>
            TOPGIRL
          </h1>
          <p style={{
            fontSize: "var(--text-lg)",
            color: "var(--text-muted)",
            marginBottom: "var(--space-8)",
            maxWidth: 500,
            margin: "0 auto var(--space-8)"
          }}>
            Maîtrise le jeu avec <strong style={{ color: "var(--primary)" }}>112+ artistes</strong>, des guides experts et des outils exclusifs
          </p>
          <Link href="/fr/database/" className="btn" style={{ padding: "var(--space-4) var(--space-8)" }}>
            🎤 Découvrir les Artistes
          </Link>
        </section>

        <AdBanner />

        <section style={{ padding: "var(--space-8) 0" }}>
          <div className="grid grid-cols-4" style={{ gap: "var(--space-4)" }}>
            <div className="card" style={{ textAlign: "center", padding: "var(--space-6)" }}>
              <div style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--primary)" }}>112+</div>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: "var(--space-2)" }}>Artistes</div>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "var(--space-6)" }}>
              <div style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--secondary)" }}>50+</div>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: "var(--space-2)" }}>Guides</div>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "var(--space-6)" }}>
              <div style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--accent)" }}>8</div>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: "var(--space-2)" }}>Événements</div>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "var(--space-6)" }}>
              <div style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--accent-yellow)" }}>5+</div>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: "var(--space-2)" }}>Outils</div>
            </div>
          </div>
        </section>

        <section style={{
          background: "var(--bg-card)",
          padding: "var(--space-10) 0",
          margin: "var(--space-8) 0",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)"
        }}>
          <div className="container">
            <h2 className="section-title text-center" style={{ marginBottom: "var(--space-2)" }}>🎁 Codes Promo & Redeem Codes</h2>
            <p className="text-center text-muted" style={{ marginBottom: "var(--space-6)" }}>Tous les codes disponibles pour TopGirl / ApexGirl</p>

            <div className="grid grid-cols-2" style={{ maxWidth: 600, margin: "0 auto", gap: "var(--space-4)" }}>
              <div className="card" style={{ padding: "var(--space-5)" }}>
                <div className="flex justify-between items-center" style={{ marginBottom: "var(--space-2)" }}>
                  <span className="font-bold" style={{ color: "var(--primary)" }}>TOPYEAR2026</span>
                  <span className="badge badge-success">Actif</span>
                </div>
                <p className="text-sm text-muted" style={{ marginBottom: "var(--space-3)" }}>500 gems + 1000 coins</p>
                <button
                  onClick={() => copyCode("TOPYEAR2026")}
                  className="btn"
                  style={{ width: "100%" }}
                >
                  Copier
                </button>
              </div>

              <div className="card" style={{ padding: "var(--space-5)" }}>
                <div className="flex justify-between items-center" style={{ marginBottom: "var(--space-2)" }}>
                  <span className="font-bold" style={{ color: "var(--primary)" }}>TOPLOVERS</span>
                  <span className="badge badge-success">Actif</span>
                </div>
                <p className="text-sm text-muted" style={{ marginBottom: "var(--space-3)" }}>1000 gems</p>
                <button
                  onClick={() => copyCode("TOPLOVERS")}
                  className="btn"
                  style={{ width: "100%" }}
                >
                  Copier
                </button>
              </div>
            </div>

            <p className="text-center text-muted" style={{ marginTop: "var(--space-6)", fontSize: "var(--text-sm)" }}>
              Les codes sont à entrer dans le jeu • <Link href="/fr/guides/" style={{ color: "var(--primary)" }}>Voir le guide</Link>
            </p>
          </div>
        </section>

        <section style={{ padding: "var(--space-8) 0" }}>
          <div className="container">
            <h2 className="section-title text-center" style={{ marginBottom: "var(--space-8)" }}>Explore le Site</h2>

            <div className="grid grid-cols-4">
              <Link href="/fr/database/" className="card" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-3)" }}>🎤</div>
                <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>Base de Données</h3>
                <p className="text-sm text-muted">112+ artistes avec toutes leurs statistiques</p>
              </Link>

              <Link href="/fr/tools/" className="card" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-3)" }}>🛠️</div>
                <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>Outils</h3>
                <p className="text-sm text-muted">Calculateurs et optimiseurs</p>
              </Link>

              <Link href="/fr/guides/" className="card" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-3)" }}>📖</div>
                <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>Guides</h3>
                <p className="text-sm text-muted">Tutoriels et stratégies</p>
              </Link>

              <Link href="/fr/events/" className="card" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-3)" }}>🎉</div>
                <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>Événements</h3>
                <p className="text-sm text-muted">Calendrier et récompenses</p>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "TopGirl ApexGirl",
            "url": "https://apexgirlguide.com",
            "description": "TopGirl (ApexGirl) fansite officiel - Tous les codes promo et redeem codes. Base de données 112+ artistes, guides, outils.",
            "publisher": {
              "@type": "Organization",
              "name": "A3Games"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://apexgirlguide.com/fr/database/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </>
  );
}
