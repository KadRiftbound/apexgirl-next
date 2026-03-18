"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import SVSCalculator from "@/components/tools/SVSCalculator";
import CEOCalculator from "@/components/tools/CEOCalculator";
import ApexCalculator from "@/components/tools/ApexCalculator";
import BurjLottery from "@/components/tools/BurjLottery";
import { AdBanner } from "@/components/AdSense";

const translations: Record<string, any> = {
  fr: {
    title: "Outils",
    subtitle: "Calculateurs et guides pour optimiser votre progression",
    resource: "Ressources",
    svs: "SVS Store",
    ceo: "CEO Event",
    burj: "Burj Khalifa",
    resourceDesc: "Calcule les ressources nécessaires pour chaque amélioration",
    svsDesc: "Optimise tes achats dans la boutique SVS",
    ceoDesc: "Planifie ton événement CEO et tes récompenses",
    burjDesc: "Tirage au sort des récompenses du Burj Khalifa",
    burjTooltip: "Outil de tirage au sort pour distribuer équitablement les 26 récompenses du Burj Khalifa (18 Gifts + 8 Artist Picks) entre les participants de ton alliance.",
    credit: "Données fournies par",
  },
  en: {
    title: "Tools",
    subtitle: "Calculators and guides to optimize your progression",
    resource: "Resources",
    svs: "SVS Store",
    ceo: "CEO Event",
    burj: "Burj Khalifa",
    resourceDesc: "Calculate resources needed for each upgrade",
    svsDesc: "Optimize your purchases in the SVS shop",
    ceoDesc: "Plan your CEO event and rewards",
    burjDesc: "Lottery for Burj Khalifa rewards",
    burjTooltip: "Lottery tool to fairly distribute the 26 Burj Khalifa rewards (18 Gifts + 8 Artist Picks) among your alliance members.",
    credit: "Data provided by",
  },
  it: {
    title: "Strumenti",
    subtitle: "Calcolatori e guide per ottimizzare la progressione",
    resource: "Risorse",
    svs: "SVS Store",
    ceo: "CEO Event",
    burj: "Burj Khalifa",
    resourceDesc: "Calcola le risorse necessarie per ogni miglioramento",
    svsDesc: "Ottimizza i tuoi acquisti nel negozio SVS",
    ceoDesc: "Pianifica il tuo evento CEO e le ricompense",
    burjDesc: "Estrazione a sorte premi Burj Khalifa",
    burjTooltip: "Strumento di estrazione a sorte per distribuire i 26 premi del Burj Khalifa (18 Gift + 8 Artist Pick) tra i membri della tua alleanza.",
    credit: "Dati forniti da",
  },
  es: {
    title: "Herramientas",
    subtitle: "Calculadoras y guías para optimizar tu progresión",
    resource: "Recursos",
    svs: "SVS Store",
    ceo: "CEO Event",
    burj: "Burj Khalifa",
    resourceDesc: "Calcula los recursos necesarios para cada mejora",
    svsDesc: "Optimiza tus compras en la tienda SVS",
    ceoDesc: "Planifica tu evento CEO y recompensas",
    burjDesc: "Sorteo de recompensas del Burj Khalifa",
    burjTooltip: "Herramienta de sorteo para distribuir los 26 premios del Burj Khalifa (18 Gifts + 8 Artist Picks) entre los miembros de tu alianza.",
    credit: "Datos proporcionados por",
  },
  pt: {
    title: "Ferramentas",
    subtitle: "Calculadoras e guias para otimizar sua progressão",
    resource: "Recursos",
    svs: "SVS Store",
    ceo: "CEO Event",
    burj: "Burj Khalifa",
    resourceDesc: "Calcule os recursos necessários para cada melhoria",
    svsDesc: "Otimize suas compras na loja SVS",
    ceoDesc: "Planeje seu evento CEO e recompensas",
    burjDesc: "Sorteio de recompensas do Burj Khalifa",
    burjTooltip: "Ferramenta de sorteio para distribuir os 26 prêmios do Burj Khalifa (18 Gifts + 8 Artist Picks) entre os membros da sua aliança.",
    credit: "Dados fornecidos por",
  },
  pl: {
    title: "Narzędzia",
    subtitle: "Kalkulatory i poradniki do optymalizacji postępu",
    resource: "Zasoby",
    svs: "SVS Store",
    ceo: "CEO Event",
    burj: "Burj Khalifa",
    resourceDesc: "Oblicz zasoby potrzebne do każdej rozbudowy",
    svsDesc: "Zoptymalizuj zakupy w sklepie SVS",
    ceoDesc: "Zaplanuj swoje wydarzenie CEO i nagrody",
    burjDesc: "Losowanie nagród Burj Khalifa",
    burjTooltip: "Narzędzie do losowania 26 nagród Burj Khalifa (18 Gift + 8 Artist Pick) między członkami sojuszu.",
    credit: "Dane dostarczone przez",
  },
  id: {
    title: "Alat",
    subtitle: "Kalkulator dan panduan untuk mengoptimalkan kemajuan",
    resource: "Sumber Daya",
    svs: "SVS Store",
    ceo: "CEO Event",
    burj: "Burj Khalifa",
    resourceDesc: "Hitung sumber daya yang dibutuhkan untuk setiap peningkatan",
    svsDesc: "Optimalkan pembelian di toko SVS",
    ceoDesc: "Rencanakan event CEO dan hadiahmu",
    burjDesc: "Undian hadiah Burj Khalifa",
    burjTooltip: "Alat undian untuk mendistribusikan 26 hadiah Burj Khalifa (18 Gift + 8 Artist Pick) di antara anggota aliansi.",
    credit: "Data dari",
  },
  ru: {
    title: "Инструменты",
    subtitle: "Калькуляторы и гайды для оптимизации прогресса",
    resource: "Ресурсы",
    svs: "SVS Магазин",
    ceo: "CEO Событие",
    burj: "Burj Khalifa",
    resourceDesc: "Рассчитайте ресурсы для каждого улучшения",
    svsDesc: "Оптимизируйте покупки в магазине SVS",
    ceoDesc: "Планируйте событие CEO и награды",
    burjDesc: "Жеребьёвка наград Burj Khalifa",
    burjTooltip: "Инструмент жеребьёвки для распределения 26 наград Burj Khalifa (18 Gift + 8 Artist Pick) между членами альянса.",
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
  {
    id: "burj",
    icon: "🏙️",
    color: "#f97316",
    gradient: "linear-gradient(135deg, #f97316, #ea580c)",
    glowColor: "rgba(249, 115, 22, 0.4)",
  },
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("resource");
  const [showTooltip, setShowTooltip] = useState(false);
  const params = useParams();
  const lang = (params?.lang as string) || "fr";
  const t = translations[lang] || translations.en;

  const activeTool = toolConfig.find((t) => t.id === activeTab)!;

  return (
      <div style={{
        minHeight: "100vh",
        paddingBottom: "80px",
      }}>

      {/* Hero Header */}
      <div style={{
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.25)",
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
                    : `2px solid ${tool.color}40`,
                  background: isActive
                    ? `${tool.gradient}`
                    : `${tool.color}12`,
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
          background: `${activeTool.color}40`,
          borderRadius: "20px",
          border: `1.5px solid ${activeTool.color}44`,
          backdropFilter: "blur(20px)",
          overflow: "visible",
          boxShadow: `0 0 24px ${activeTool.glowColor}18, inset 0 1px 0 ${activeTool.color}20`,
        }}>
          {/* Panel Header */}
          <div style={{
            padding: "16px 24px",
            borderBottom: `1px solid ${activeTool.color}55`,
            background: `${activeTool.color}20`,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderRadius: "20px 20px 0 0",
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
              color: "#fff",
              letterSpacing: "0.02em",
            }}>
              {t[activeTab]}
            </span>

            {/* Tooltip pour Burj Khalifa */}
            {activeTab === "burj" && (
              <div
                style={{ marginLeft: "8px", position: "relative", display: "inline-flex" }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button
                  onClick={() => setShowTooltip(v => !v)}
                  style={{
                    width: "20px", height: "20px", borderRadius: "50%",
                    border: `1px solid ${activeTool.color}88`,
                    background: `${activeTool.color}22`,
                    color: "#fff", fontSize: "0.7rem", fontWeight: 700,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    lineHeight: 1, flexShrink: 0,
                  }}
                >?</button>
                {showTooltip && (
                  <div style={{
                    position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
                    transform: "translateX(-50%)",
                    width: "260px", padding: "10px 14px",
                    background: "rgba(20, 20, 40, 0.98)",
                    border: `1px solid ${activeTool.color}55`,
                    borderRadius: "10px", fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.85)", lineHeight: 1.5,
                    boxShadow: `0 8px 24px rgba(0,0,0,0.5)`,
                    zIndex: 50,
                    pointerEvents: "auto",
                  }}>
                    <div style={{ color: activeTool.color, fontWeight: 700, marginBottom: "6px", fontSize: "0.8rem" }}>
                      🏙️ Burj Khalifa Lottery
                    </div>
                    {t.burjTooltip}
                    {/* Flèche pointant vers le bas */}
                    <div style={{
                      position: "absolute", bottom: "-6px", left: "50%",
                      width: "10px", height: "10px",
                      background: "rgba(20, 20, 40, 0.98)",
                      border: `1px solid ${activeTool.color}55`,
                      borderTop: "none", borderLeft: "none",
                      transform: "translateX(-50%) rotate(45deg)",
                    }} />
                  </div>
                )}
              </div>
            )}

            <div style={{
              marginLeft: "auto",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow: `0 0 8px ${activeTool.color}`,
              animation: "pulse 2s infinite",
            }} />
          </div>

          {/* Tool Content */}
          <div style={{ padding: "24px" }}>
            <div style={{
              background: "rgba(15,15,32,0.85)",
              borderRadius: "14px",
              padding: "20px",
              margin: "0 4px 4px",
            }}>
              {activeTab === "resource" && <ApexCalculator />}
              {activeTab === "svs" && <SVSCalculator />}
              {activeTab === "ceo" && <CEOCalculator />}
              {activeTab === "burj" && <BurjLottery />}
            </div>
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
