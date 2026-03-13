"use client";

import { useState } from "react";
import Head from "next/head";
import SVSCalculator from "@/components/tools/SVSCalculator";
import CEOCalculator from "@/components/tools/CEOCalculator";
import ApexCalculator from "@/components/tools/ApexCalculator";
import { AdBanner } from "@/components/AdSense";

const tools = [
  { id: "calculator", label: "Resources", icon: "🧮" },
  { id: "svs", label: "SVS Store", icon: "🛒" },
  { id: "ceo", label: "CEO Events", icon: "📅" },
  { id: "team", label: "Team Builder", icon: "👥" },
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("calculator");

  return (
    <>
      <Head>
        <title>Outils - TopGirl ApexGirl | Calculateurs et Optimisateurs</title>
        <meta name="description" content="Accédez aux meilleurs outils pour TopGirl : calculateur de ressources, optimiseur d'équipe, calculateur SVS et plus. Optimisez votre gameplay!" />
        <meta name="keywords" content="TopGirl tools, TopGirl calculator, TopGirl team optimizer, SVS calculator, TopGirl resources" />
        <meta property="og:title" content="Outils - TopGirl ApexGirl" />
        <meta property="og:description" content="Accédez aux meilleurs outils pour TopGirl : calculateur de ressources, optimiseur d'équipe, et plus." />
      </Head>

      <div style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        padding: "0"
      }}>
        {/* Header */}
        <div style={{
          background: "rgba(15, 15, 26, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(139, 92, 246, 0.3)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          padding: "16px 0"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
            <h1 style={{ 
              fontSize: "2rem", 
              fontWeight: 800, 
              marginBottom: "8px",
              background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              🔧 TopGirl Tools
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              Optimisez votre gameplay avec nos outils exclusifs
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px 60px" }}>
          <AdBanner />

          {/* Navigation Tabs - KTS Style */}
          <div style={{ 
            display: "flex", 
            gap: "8px", 
            marginBottom: "24px",
            flexWrap: "wrap",
            marginTop: "24px"
          }}>
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                style={{
                  padding: "12px 20px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: activeTab === tool.id 
                    ? "1px solid rgba(236, 72, 153, 0.6)" 
                    : "1px solid rgba(255,255,255,0.1)",
                  background: activeTab === tool.id
                    ? "linear-gradient(135deg, #ec4899, #a855f7)"
                    : "rgba(30, 30, 50, 0.8)",
                  color: activeTab === tool.id ? "#fff" : "rgba(255,255,255,0.6)",
                  boxShadow: activeTab === tool.id 
                    ? "0 0 20px rgba(236, 72, 153, 0.4)" 
                    : "none",
                }}
              >
                <span style={{ marginRight: "8px" }}>{tool.icon}</span>
                {tool.label}
              </button>
            ))}
          </div>

          {/* Tool Content - KTS Style Card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(88, 28, 135, 0.4), rgba(134, 25, 143, 0.3))",
            borderRadius: "24px",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            padding: "24px",
            minHeight: "500px",
            boxShadow: "0 0 60px rgba(168, 85, 247, 0.2)",
            backdropFilter: "blur(10px)",
          }}>
            {activeTab === "calculator" && (
              <div>
                <h2 style={{ 
                  color: "#fff", 
                  fontSize: "1.25rem", 
                  fontWeight: 700, 
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  🧮 Level Progression Cost Calculator
                </h2>
                <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "20px", fontSize: "0.9rem" }}>
                  Only complete levels are available. Select a category and choose levels to calculate total cost.
                </p>
                <ApexCalculator />
              </div>
            )}

            {activeTab === "svs" && (
              <div>
                <h2 style={{ 
                  color: "#fff", 
                  fontSize: "1.25rem", 
                  fontWeight: 700, 
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  🛒 SVS Store
                </h2>
                <SVSCalculator />
              </div>
            )}

            {activeTab === "ceo" && (
              <div>
                <h2 style={{ 
                  color: "#fff", 
                  fontSize: "1.25rem", 
                  fontWeight: 700, 
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  📅 CEO Events
                </h2>
                <CEOCalculator />
              </div>
            )}

            {activeTab === "team" && (
              <div style={{ 
                textAlign: "center", 
                padding: "60px 20px",
                color: "rgba(255,255,255,0.7)"
              }}>
                <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🚧</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "12px", color: "#fff" }}>
                  En Construction
                </h3>
                <p style={{ maxWidth: "400px", margin: "0 auto 24px", lineHeight: 1.6 }}>
                  L'optimiseur d'équipe arrive bientôt! Créez vos équipes idéales basées sur les synergies entre artistes.
                </p>
                
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                  maxWidth: "500px",
                  margin: "0 auto"
                }}>
                  {[
                    { icon: "⚡", text: "Analyse des synergies" },
                    { icon: "🎯", text: "Calcul des stats" },
                    { icon: "🏆", text: "Builds optimaux" },
                    { icon: "💾", text: "Sauvegarde équipe" },
                  ].map((feature, i) => (
                    <div key={i} style={{
                      background: "rgba(255,255,255,0.05)",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "0.9rem"
                    }}>
                      <span style={{ marginRight: "8px" }}>{feature.icon}</span>
                      {feature.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Notice */}
          <div style={{ 
            textAlign: "center", 
            padding: "24px", 
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.85rem"
          }}>
            💡 Ces outils utilisent les données originales. Crédits: <a 
              href="https://github.com/IamClumsy" 
              target="_blank" 
              rel="noopener"
              style={{ color: "#c084fc" }}
            >
              @IamClumsy
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
