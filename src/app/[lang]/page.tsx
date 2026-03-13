"use client";

import Head from "next/head";
import Link from "next/link";
import { AdBanner } from "@/components/AdSense";
import { HomeCarousel } from "@/components/HomeCarousel";

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
        <HomeCarousel />

        {/* Hero Section */}
        <section className="hero">
          <h1>TopGirl</h1>
          <p>
            La référence pour maîtriser TopGirl • 112+ artistes • Guides experts • Outils exclusifs
          </p>
          <div className="flex gap-4" style={{ justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/fr/database/" className="btn">
              🎤 Découvrir les Artistes
            </Link>
            <Link href="/fr/tools/" className="btn btn-outline">
              🛠️ Voir les Outils
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: "40px 0" }}>
          <div className="grid grid-cols-4">
            <div className="glass-card text-center" style={{ padding: "32px 20px" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🎤</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)" }}>112+</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Artistes</div>
            </div>
            <div className="glass-card text-center" style={{ padding: "32px 20px" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>📖</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--secondary)" }}>50+</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Guides</div>
            </div>
            <div className="glass-card text-center" style={{ padding: "32px 20px" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🎉</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent)" }}>8</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Événements</div>
            </div>
            <div className="glass-card text-center" style={{ padding: "32px 20px" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🛠️</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-yellow)" }}>5+</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Outils</div>
            </div>
          </div>
        </section>

        {/* Promo Codes */}
        <section style={{ padding: "40px 0" }}>
          <div className="glass-card" style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
            <h2 className="section-title text-center" style={{ marginBottom: "8px" }}>🎁 Codes Promo</h2>
            <p className="text-center text-muted" style={{ marginBottom: "32px" }}>
              Tous les codes disponibles pour TopGirl / ApexGirl
            </p>

            <div className="grid grid-cols-2" style={{ gap: "16px" }}>
              <div style={{ 
                background: "rgba(255, 77, 141, 0.1)", 
                border: "1px solid rgba(255, 77, 141, 0.2)", 
                borderRadius: "var(--radius-md)", 
                padding: "20px" 
              }}>
                <div className="flex justify-between items-center" style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--primary)" }}>TOPYEAR2026</span>
                  <span className="badge badge-success">Actif</span>
                </div>
                <p className="text-sm text-muted" style={{ marginBottom: "16px" }}>500 gems + 1000 coins</p>
                <button
                  onClick={() => copyCode("TOPYEAR2026")}
                  className="btn"
                  style={{ width: "100%", padding: "10px" }}
                >
                  Copier
                </button>
              </div>

              <div style={{ 
                background: "rgba(139, 92, 246, 0.1)", 
                border: "1px solid rgba(139, 92, 246, 0.2)", 
                borderRadius: "var(--radius-md)", 
                padding: "20px" 
              }}>
                <div className="flex justify-between items-center" style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--secondary)" }}>TOPLOVERS</span>
                  <span className="badge badge-success">Actif</span>
                </div>
                <p className="text-sm text-muted" style={{ marginBottom: "16px" }}>1000 gems</p>
                <button
                  onClick={() => copyCode("TOPLOVERS")}
                  className="btn"
                  style={{ width: "100%", padding: "10px", background: "linear-gradient(135deg, var(--secondary), #a78bfa)" }}
                >
                  Copier
                </button>
              </div>
            </div>

            <p className="text-center text-muted" style={{ marginTop: "24px", fontSize: "0.875rem" }}>
              Entrez les codes dans le jeu • <Link href="/fr/guides/" style={{ color: "var(--primary)" }}>Guide des codes</Link>
            </p>
          </div>
        </section>

        <AdBanner />

        {/* Explore Sections */}
        <section style={{ padding: "40px 0" }}>
          <h2 className="section-title text-center" style={{ marginBottom: "40px" }}>Explorer le Site</h2>

          <div className="grid grid-cols-4">
            <Link href="/fr/database/" className="glass-card" style={{ 
              display: "block", 
              textAlign: "center", 
              textDecoration: "none",
              padding: "40px 20px"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎤</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>Artistes</h3>
              <p className="text-sm text-muted">112+ artistes avec toutes leurs statistiques</p>
            </Link>

            <Link href="/fr/tools/" className="glass-card" style={{ 
              display: "block", 
              textAlign: "center", 
              textDecoration: "none",
              padding: "40px 20px"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🛠️</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>Outils</h3>
              <p className="text-sm text-muted">Calculateurs et optimiseurs exclusifs</p>
            </Link>

            <Link href="/fr/guides/" className="glass-card" style={{ 
              display: "block", 
              textAlign: "center", 
              textDecoration: "none",
              padding: "40px 20px"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📖</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>Guides</h3>
              <p className="text-sm text-muted">Tutoriels et stratégies complètes</p>
            </Link>

            <Link href="/fr/events/" className="glass-card" style={{ 
              display: "block", 
              textAlign: "center", 
              textDecoration: "none",
              padding: "40px 20px"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎉</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>Événements</h3>
              <p className="text-sm text-muted">Calendrier et récompenses</p>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ 
          padding: "60px 40px", 
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(255, 77, 141, 0.1), rgba(139, 92, 246, 0.1))",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          margin: "40px 0"
        }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "12px" }}>
            Prêt à dominer le jeu ?
          </h2>
          <p className="text-muted" style={{ marginBottom: "24px", maxWidth: "500px", margin: "0 auto 24px" }}>
            Débloquez tout le potentiel de vos artistes avec nos outils et guides exclusifs.
          </p>
          <Link href="/fr/database/" className="btn" style={{ padding: "16px 40px", fontSize: "1rem" }}>
            Commencer Maintenant →
          </Link>
        </section>
      </div>
    </>
  );
}
