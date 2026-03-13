"use client";

import { useState } from "react";
import Head from "next/head";
import SVSCalculator from "@/components/tools/SVSCalculator";
import CEOCalculator from "@/components/tools/CEOCalculator";
import ApexCalculator from "@/components/tools/ApexCalculator";
import { AdBanner } from "@/components/AdSense";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("calculator");

  const tools = [
    { id: "calculator", label: "Resources", icon: "🧮" },
    { id: "svs", label: "SVS Store", icon: "🛒" },
    { id: "ceo", label: "CEO Events", icon: "📅" },
    { id: "team", label: "Team", icon: "👥" },
  ];

  return (
    <>
      <Head>
        <title>Outils - TopGirl ApexGirl | Calculateurs et Optimisateurs</title>
        <meta name="description" content="Accédez aux meilleurs outils pour TopGirl : calculateur de ressources, optimiseur d'équipe, calculateur SVS et plus. Optimisez votre gameplay!" />
        <meta name="keywords" content="TopGirl tools, TopGirl calculator, TopGirl team optimizer, SVS calculator, TopGirl resources" />
        <meta property="og:title" content="Outils - TopGirl ApexGirl" />
        <meta property="og:description" content="Accédez aux meilleurs outils pour TopGirl : calculateur de ressources, optimiseur d'équipe, et plus." />
      </Head>

      <div className="container">
        <h1 className="section-title" style={{ marginBottom: "var(--space-2)" }}>Outils</h1>
        <p className="section-subtitle" style={{ marginBottom: "var(--space-6)" }}>Optimisez votre gameplay avec nos outils exclusifs</p>

        <AdBanner />

        <div className="tabs">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`tab ${activeTab === tool.id ? "active" : ""}`}
              onClick={() => setActiveTab(tool.id)}
            >
              <span style={{ marginRight: "8px" }}>{tool.icon}</span>
              {tool.label}
            </button>
          ))}
        </div>

        <div className="tool-content">
          {activeTab === "calculator" && (
            <div className="tool-panel">
              <ApexCalculator />
            </div>
          )}

          {activeTab === "svs" && (
            <div className="tool-panel">
              <SVSCalculator />
            </div>
          )}

          {activeTab === "ceo" && (
            <div className="tool-panel">
              <CEOCalculator />
            </div>
          )}

          {activeTab === "team" && (
            <div className="team-tool">
              <div className="tool-header">
                <h2>🎯 Optimiseur d'Équipe</h2>
                <p>Sélectionnez vos artistes pour créer la meilleure équipe</p>
              </div>
              
              <div className="team-coming-soon">
                <div style={{ fontSize: "4rem", marginBottom: "var(--space-4)" }}>🚧</div>
                <h3>En Construction</h3>
                <p style={{ color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto" }}>
                  L'optimiseur d'équipe arrive bientôt! Créez vos équipes idéales basées sur les synergies entre artistes.
                </p>
                
                <div className="features-list">
                  <div className="feature-item">
                    <span>⚡</span>
                    <span>Analyse des synergies</span>
                  </div>
                  <div className="feature-item">
                    <span>🎯</span>
                    <span>Calcul des stats complètes</span>
                  </div>
                  <div className="feature-item">
                    <span>🏆</span>
                    <span>Suggestions de builds optimaux</span>
                  </div>
                  <div className="feature-item">
                    <span>💾</span>
                    <span>Sauvegarde de vos équipes</span>
                  </div>
                </div>

                <a href="/fr/database/" className="btn" style={{ marginTop: "var(--space-6)" }}>
                  🎤 Voir la Base de Données
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="tools-notice">
          <p>💡 <strong>Tip:</strong> Ces outils utilisent les données originales. Crédits: <a href="https://github.com/IamClumsy" target="_blank" rel="noopener">@IamClumsy</a></p>
        </div>
      </div>

      <style jsx>{`
        .tabs {
          display: flex;
          gap: var(--space-2);
          border-bottom: 1px solid var(--border);
          margin-bottom: var(--space-6);
          overflow-x: auto;
          padding-bottom: var(--space-2);
        }
        
        .tab {
          display: flex;
          align-items: center;
          padding: var(--space-3) var(--space-4);
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-weight: 500;
          font-size: var(--text-sm);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          white-space: nowrap;
        }
        
        .tab:hover {
          color: var(--text-primary);
        }
        
        .tab.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }
        
        .tool-content {
          min-height: 400px;
        }
        
        .tool-panel {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          padding: var(--space-6);
        }
        
        .team-tool {
          text-align: center;
          padding: var(--space-10);
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }
        
        .tool-header {
          margin-bottom: var(--space-8);
        }
        
        .tool-header h2 {
          font-size: var(--text-2xl);
          font-weight: 700;
          margin-bottom: var(--space-2);
        }
        
        .tool-header p {
          color: var(--text-muted);
        }
        
        .team-coming-soon {
          padding: var(--space-8);
        }
        
        .team-coming-soon h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-4);
        }
        
        .features-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-4);
          max-width: 600px;
          margin: var(--space-6) auto;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3);
          background: var(--bg-subtle);
          border-radius: var(--radius);
          font-size: var(--text-sm);
        }
        
        .tools-notice {
          text-align: center;
          padding: var(--space-4);
          margin-top: var(--space-6);
          color: var(--text-muted);
          font-size: var(--text-sm);
          border-top: 1px solid var(--border);
        }
        
        .tools-notice a {
          color: var(--primary);
        }
      `}</style>
    </>
  );
}
