"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import SVSCalculator from "@/components/tools/SVSCalculator";
import CEOCalculator from "@/components/tools/CEOCalculator";
import ApexCalculator from "@/components/tools/ApexCalculator";
import LevelingGuide from "@/components/tools/LevelingGuide";
import { AdBanner } from "@/components/AdSense";

const translations: Record<string, any> = {
  fr: {
    title: "Outils",
    subtitle: "Calculateurs et guides pour optimiser votre progression",
    resource: "Ressources",
    leveling: "Leveling",
    svs: "SVS Store",
    ceo: "CEO Event",
    resourceDesc: "Calcule les ressources nécessaires pour chaque amélioration",
    levelingDesc: "Guide de montée en niveau pour vos artistes SSR",
    svsDesc: "Optimise tes achats dans la boutique SVS",
    ceoDesc: "Planifie ton événement CEO et tes récompenses",
    credit: "Données fournies par",
  },
  en: {
    title: "Tools",
    subtitle: "Calculators and guides to optimize your progression",
    resource: "Resources",
    leveling: "Leveling",
    svs: "SVS Store",
    ceo: "CEO Event",
    resourceDesc: "Calculate resources needed for each upgrade",
    levelingDesc: "Level-up guide for your SSR artists",
    svsDesc: "Optimize your purchases in the SVS shop",
    ceoDesc: "Plan your CEO event and rewards",
    credit: "Data provided by",
  },
  it: {
    title: "Strumenti",
    subtitle: "Calcolatori e guide per ottimizzare la progressione",
    resource: "Risorse",
    leveling: "Leveling",
    svs: "SVS Store",
    ceo: "CEO Event",
    resourceDesc: "Calcola le risorse necessarie per ogni miglioramento",
    levelingDesc: "Guida al livellamento per le tue artiste SSR",
    svsDesc: "Ottimizza i tuoi acquisti nel negozio SVS",
    ceoDesc: "Pianifica il tuo evento CEO e le ricompense",
    credit: "Dati forniti da",
  },
  es: {
    title: "Herramientas",
    subtitle: "Calculadoras y guías para optimizar tu progresión",
    resource: "Recursos",
    leveling: "Leveling",
    svs: "SVS Store",
    ceo: "CEO Event",
    resourceDesc: "Calcula los recursos necesarios para cada mejora",
    levelingDesc: "Guía de subida de nivel para tus artistas SSR",
    svsDesc: "Optimiza tus compras en la tienda SVS",
    ceoDesc: "Planifica tu evento CEO y recompensas",
    credit: "Datos proporcionados por",
  },
  pt: {
    title: "Ferramentas",
    subtitle: "Calculadoras e guias para otimizar sua progressão",
    resource: "Recursos",
    leveling: "Leveling",
    svs: "SVS Store",
    ceo: "CEO Event",
    resourceDesc: "Calcule os recursos necessários para cada melhoria",
    levelingDesc: "Guia de level up para seus artistas SSR",
    svsDesc: "Otimize suas compras na loja SVS",
    ceoDesc: "Planeje seu evento CEO e recompensas",
    credit: "Dados fornecidos por",
  },
  pl: {
    title: "Narzędzia",
    subtitle: "Kalkulatory i poradniki do optymalizacji postępu",
    resource: "Zasoby",
    leveling: "Leveling",
    svs: "SVS Store",
    ceo: "CEO Event",
    resourceDesc: "Oblicz zasoby potrzebne do każdej rozbudowy",
    levelingDesc: "Poradnik levelowania dla twoich artystów SSR",
    svsDesc: "Zoptymalizuj zakupy w sklepie SVS",
    ceoDesc: "Zaplanuj swoje wydarzenie CEO i nagrody",
    credit: "Dane dostarczone przez",
  },
  id: {
    title: "Alat",
    subtitle: "Kalkulator dan panduan untuk mengoptimalkan kemajuan",
    resource: "Sumber Daya",
    leveling: "Leveling",
    svs: "SVS Store",
    ceo: "CEO Event",
    resourceDesc: "Hitung sumber daya yang dibutuhkan untuk setiap peningkatan",
    levelingDesc: "Panduan level up untuk artis SSR kamu",
    svsDesc: "Optimalkan pembelian di toko SVS",
    ceoDesc: "Rencanakan event CEO dan hadiahmu",
    credit: "Data dari",
  },
  ru: {
    title: "Инструменты",
    subtitle: "Калькуляторы и гайды для оптимизации прогресса",
    resource: "Ресурсы",
    leveling: "Левелинг",
    svs: "SVS Магазин",
    ceo: "CEO Событие",
    resourceDesc: "Рассчитайте ресурсы для каждого улучшения",
    levelingDesc: "Гайд по прокачке SSR артистов",
    svsDesc: "Оптимизируйте покупки в магазине SVS",
    ceoDesc: "Планируйте событие CEO и награды",
    credit: "Данные от",
  },
};

const toolConfig = [
  {
    id: "resource",
    icon: "🧮",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    glowColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    id: "leveling",
    icon: "📈",
    color: "#22d3ee",
    gradient: "linear-gradient(135deg, #22d3ee, #0891b2)",
    glowColor: "rgba(34, 211, 238, 0.4)",
  },
  {
    id: "svs",
    icon: "🛒",
    color: "#f472b6",
    gradient: "linear-gradient(135deg, #f472b6, #ec4899)",
    glowColor: "rgba(244, 114, 182, 0.4)",
  },
  {
    id: "ceo",
    icon: "📅",
    color: "#fbbf24",
    gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    glowColor: "rgba(251, 191, 36, 0.4)",
  },
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("resource");
  const params = useParams();
  const lang = (params?.lang as string) || "fr";
  const t = translations[lang] || translations.en;

  const activeTool = toolConfig.find((t) => t.id === activeTab)!;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      paddingBottom: "80px",
    }}>

      {/* Hero Header */}
      <div style={{
        background: "rgba(15, 15, 26, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.3)",
        padding: "40px 0 30px",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              boxShadow: "0 8px 24px rgba(196, 132, 252, 0.4)",
              flexShrink: 0,
            }}>
              🛠️
            </div>
            <div>
              <h1 style={{
                fontSize: "2rem",
                fontWeight: 800,
                margin: 0,
                background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {t.title}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "0.9rem" }}>
                {t.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px 0" }}>
        <AdBanner />

        {/* Tool Cards Selector */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          margin: "32px 0 28px",
        }}>
          {toolConfig.map((tool) => {
            const isActive = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  border: isActive
                    ? `2px solid ${tool.color}`
                    : "2px solid rgba(255,255,255,0.06)",
                  background: isActive
                    ? `${tool.gradient}`
                    : "rgba(30, 30, 50, 0.6)",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  textAlign: "left",
                  boxShadow: isActive ? `0 8px 32px ${tool.glowColor}` : "none",
                  transform: isActive ? "translateY(-2px)" : "translateY(0)",
                  backdropFilter: "blur(10px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Shine effect on active */}
                {isActive && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  }} />
                )}
                <span style={{ fontSize: "1.75rem" }}>{tool.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "2px" }}>
                    {t[tool.id]}
                  </div>
                  <div style={{
                    fontSize: "0.75rem",
                    color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)",
                    lineHeight: 1.3,
                  }}>
                    {t[`${tool.id}Desc`]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tool Panel */}
        <div style={{
          background: "rgba(20, 20, 40, 0.8)",
          borderRadius: "20px",
          border: `1px solid ${activeTool.color}44`,
          backdropFilter: "blur(20px)",
          overflow: "hidden",
          boxShadow: `0 0 60px ${activeTool.glowColor}22`,
        }}>
          {/* Panel Header */}
          <div style={{
            padding: "16px 24px",
            borderBottom: `1px solid ${activeTool.color}33`,
            background: `${activeTool.color}11`,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: activeTool.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              boxShadow: `0 4px 12px ${activeTool.glowColor}`,
            }}>
              {activeTool.icon}
            </div>
            <span style={{
              fontWeight: 700,
              fontSize: "1.05rem",
              color: activeTool.color,
              letterSpacing: "0.02em",
            }}>
              {t[activeTab]}
            </span>
            <div style={{
              marginLeft: "auto",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: activeTool.color,
              boxShadow: `0 0 8px ${activeTool.color}`,
              animation: "pulse 2s infinite",
            }} />
          </div>

          {/* Tool Content */}
          <div style={{ padding: "24px" }}>
            {activeTab === "resource" && <ApexCalculator />}
            {activeTab === "leveling" && <LevelingGuide />}
            {activeTab === "svs" && <SVSCalculator />}
            {activeTab === "ceo" && <CEOCalculator />}
          </div>
        </div>

        {/* Credit */}
        <div style={{
          textAlign: "center",
          padding: "24px 0 0",
          color: "rgba(255,255,255,0.3)",
          fontSize: "0.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}>
          <span>📊</span>
          <span>{t.credit}</span>
          <a
            href="https://github.com/IamClumsy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#a855f7",
              textDecoration: "none",
              fontWeight: 600,
              transition: "color 0.2s",
            }}
          >
            @IamClumsy
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
