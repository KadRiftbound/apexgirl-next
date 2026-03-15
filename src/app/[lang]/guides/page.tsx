"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AdBanner } from "@/components/AdSense";

type Guide = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  readTime: string;
};

const guides: Guide[] = [
  {
    id: "equipment",
    title: "Guide Équipement",
    description: "Bijoux, Voitures et Propriétés pour optimiser vos statistiques. Comparaison Gold vs Purple et priorités d'achat.",
    icon: "💍",
    color: "#fbbf24",
    category: "Débutant",
    readTime: "10 min",
  },
  {
    id: "team-builder",
    title: "Team Builder",
    description: "Comment construire l'équipe parfaite. Calcul des synergies de genre et bonus d'équipement.",
    icon: "👥",
    color: "#22d3ee",
    category: "Intermédiaire",
    readTime: "15 min",
  },
  {
    id: "recommended-teams",
    title: "Équipes Recommandées",
    description: "Les meilleures compositions d'équipes UR et SSR. Stratégies offensives, équilibrées et défensives.",
    icon: "🏆",
    color: "#f472b6",
    category: "Avancé",
    readTime: "12 min",
  },
  {
    id: "leveling-ssr",
    title: "Montée en Niveau SSR",
    description: "Nombre de cartes nécessaires pour level up vos personnages SSR jusqu'au niveau 115.",
    icon: "📈",
    color: "#34d399",
    category: "Débutant",
    readTime: "8 min",
  },
  {
    id: "blueprints",
    title: "Guide Blueprints",
    description: "Requirements en blueprints par tier (1-21) pour améliorer vos installations. Tier 7-12 Gold.",
    icon: "🛠️",
    color: "#818cf8",
    category: "Intermédiaire",
    readTime: "10 min",
  },
  {
    id: "hq-upgrade",
    title: "Guide HQ (Quartier Général)",
    description: "Cartes de bâtiment nécessaires pour chaque niveau du HQ. Requirement total: 29,922 cartes.",
    icon: "🏢",
    color: "#a855f7",
    category: "Débutant",
    readTime: "5 min",
  },
  {
    id: "vehicle-system",
    title: "Système de Véhicules",
    description: "Système complet: Avancement, Pièces (Moteur, Châssis, Suspension, Jantes), Skins débloqués.",
    icon: "🚗",
    color: "#f87171",
    category: "Avancé",
    readTime: "15 min",
  },
  {
    id: "gold-equipment",
    title: "Équipement Gold Optimal",
    description: "Setup complet Gold pour Vocalist, Dancer et Center. +19,730 stats et 86,000 fans par personnage.",
    icon: "✨",
    color: "#fbbf24",
    category: "Avancé",
    readTime: "10 min",
  },
  {
    id: "event-ancient-rome",
    title: "Guide Ancient Rome",
    description: "Guide complet de l'événement Adventure Abroad Rome. Phases, stratégies et rewards.",
    icon: "🏛️",
    color: "#f97316",
    category: "Événements",
    readTime: "10 min",
  },
  {
    id: "event-radio-battle",
    title: "Guide Radio Battle",
    description: "Guide complet du Radio Battle. 5 phases, stratégies pour maximiser vos Radio Coins.",
    icon: "📻",
    color: "#06b6d4",
    category: "Événements",
    readTime: "8 min",
  },
  {
    id: "event-grammy",
    title: "Guide Grammy Awards",
    description: "Guide des 8 catégories Grammy. Meilleures équipes et stratégies pour gagner des medals.",
    icon: "🏆",
    color: "#fbbf24",
    category: "Événements",
    readTime: "10 min",
  },
  {
    id: "event-ultimate-ceo",
    title: "Guide Ultimate CEO",
    description: "Guide complet de l'Ultimate CEO. Comment vaincre le CEO et获取 les meilleures rewards.",
    icon: "💼",
    color: "#ef4444",
    category: "Événements",
    readTime: "8 min",
  },
  {
    id: "event-echo-death-match",
    title: "Guide Echo Death Match",
    description: "Guide du Echo Death Match. Accumulez des Echo Stones et échangez pour des rewards SSR+.",
    icon: "👻",
    color: "#8b5cf6",
    category: "Événements",
    readTime: "8 min",
  },
  {
    id: "event-chamber-territory",
    title: "Guide Chamber Territory",
    description: "Guide du Chamber Territory. Capturez et défendez des territoires pour des rewards.",
    icon: "🏰",
    color: "#14b8a6",
    category: "Événements",
    readTime: "8 min",
  },
  {
    id: "event-cleanup-party",
    title: "Guide Cleanup Party",
    description: "Guide du Cleanup Party. Collectez des poubelles et échangez pour des rewards.",
    icon: "🧹",
    color: "#22c55e",
    category: "Événements",
    readTime: "5 min",
  },
  {
    id: "event-metro-subway",
    title: "Guide Metro & Subway",
    description: "Guide du Metro & Subway. Collectez des tickets et montez dans le métro pour des rewards.",
    icon: "🚇",
    color: "#3b82f6",
    category: "Événements",
    readTime: "5 min",
  },
];

const categories = ["Tous", "Débutant", "Intermédiaire", "Avancé", "Événements"];

export default function GuidesPage() {
  const params = useParams();
  const lang = params?.lang as string || "fr";
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredGuides =
    activeCategory === "Tous"
      ? guides
      : guides.filter((g) => g.category === activeCategory);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      paddingBottom: "60px"
    }}>
      <div style={{
        background: "rgba(15, 15, 26, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.3)",
        padding: "40px 0 30px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: 800, 
            marginBottom: "8px",
            background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            📖 Guides
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>
            Tutoriels et stratégies pour maîtriser le jeu
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
        <AdBanner />

        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                border: activeCategory === cat ? "1px solid rgba(236, 72, 153, 0.6)" : "1px solid rgba(255,255,255,0.1)",
                background: activeCategory === cat ? "linear-gradient(135deg, #ec4899, #a855f7)" : "rgba(30, 30, 50, 0.8)",
                color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 500,
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
        }}>
          {filteredGuides.map((guide) => (
            <Link
              key={guide.id}
              href={`/${lang}/guides/${guide.id}`}
              style={{
                background: "rgba(30, 30, 50, 0.8)",
                borderRadius: "20px",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                padding: "24px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                textDecoration: "none",
                display: "block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = `0 20px 40px ${guide.color}22`;
                e.currentTarget.style.borderColor = guide.color + "66";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${guide.color}, ${guide.color}88)`,
              }} />

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: `${guide.color}22`,
                fontSize: "1.75rem",
                marginBottom: "16px",
              }}>
                {guide.icon}
              </div>

              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>
                {guide.title}
              </h3>

              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "16px" }}>
                {guide.description}
              </p>

              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "8px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  background: `${guide.color}22`,
                  color: guide.color,
                }}>
                  {guide.category}
                </span>
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "8px",
                  fontSize: "0.7rem",
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                }}>
                  {guide.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
