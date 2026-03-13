"use client";

import { useState } from "react";
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
    id: "debutant",
    title: "Guide des Débutants",
    description: "Tout ce que vous devez savoir pour bien commencer dans TopGirl. Créer votre premier artiste, compléter les missions et progresser.",
    icon: "🎤",
    color: "#a855f7",
    category: "Débutant",
    readTime: "10 min",
  },
  {
    id: "codes-promo",
    title: "Comment Utiliser les Codes",
    description: "Guide complet pour entrer vos codes promo et obtenir des récompenses exclusives.",
    icon: "🎁",
    color: "#fbbf24",
    category: "Débutant",
    readTime: "5 min",
  },
  {
    id: "team-composition",
    title: "Composition d'Équipe",
    description: "Les meilleures combinaisons d'artistes par rôle. Créez des équipes équilibrées pour chaque type d'événement.",
    icon: "👥",
    color: "#22d3ee",
    category: "Intermédiaire",
    readTime: "15 min",
  },
  {
    id: "evenements",
    title: "Guide des Événements",
    description: "Comment maximiser vos récompenses lors des événements. Stratégies avancées pour chaque type d'événement.",
    icon: "🎉",
    color: "#f472b6",
    category: "Avancé",
    readTime: "12 min",
  },
  {
    id: "ressources",
    title: "Gestion des Ressources",
    description: "Comment gérer efficacement vos pièces, diamants et autres ressources pour une progression optimale.",
    icon: "💎",
    color: "#34d399",
    category: "Intermédiaire",
    readTime: "8 min",
  },
  {
    id: "synergies",
    title: "Synergies entre Artistes",
    description: "Découvrez les synergies cachées entre les artistes et optimisez votre équipe pour le PvP et le PvE.",
    icon: "✨",
    color: "#818cf8",
    category: "Avancé",
    readTime: "20 min",
  },
  {
    id: "voitures",
    title: "Guide des Voitures",
    description: "Tout sur le système de voitures : acquisition, upgrade, promotion et optimisation.",
    icon: "🚗",
    color: "#f87171",
    category: "Intermédiaire",
    readTime: "10 min",
  },
  {
    id: "villa",
    title: "Guide de la Villa",
    description: "Comment construire et personnaliser votre villa pour maximiser les bonus de gameplay.",
    icon: "🏰",
    color: "#2dd4bf",
    category: "Avancé",
    readTime: "15 min",
  },
];

const categories = ["Tous", "Débutant", "Intermédiaire", "Avancé"];

const guideContent: Record<string, { content: string[] }> = {
  "debutant": {
    content: [
      "Bienvenue dans TopGirl! Ce guide vous accompagnera dans vos premiers pas pour devenir une véritable star.",
      "CRÉER VOTRE PREMIER ARTISTE",
      "Au début du jeu, vous pourrez créer votre premier artiste. Choisissez bien son genre - Pop, Hip Hop, R&B, Rock ou Electronic - car cela affectera vos performances dans différents événements.",
      "MISSIONS QUOTIDIENNES",
      "Les missions quotidiennes sont votre principale source de ressources au début. Complétez-les régulièrement pour accumuler des pièces et de l'expérience.",
      "PARTICIPEZ AUX ÉVÉNEMENTS",
      "Les événements sont essentiels pour progresser rapidement. Gardez un œil sur le calendrier des événements et privilégiez ceux avec des récompenses UR ou SSR.",
      "CONSTITUER VOTRE ÉQUIPE",
      "Au début, concentratez-vous sur un petit nombre d'artistes bien équipés plutôt que d'avoir beaucoup d'artistes faibles."
    ]
  },
  "codes-promo": {
    content: [
      "Les codes promo sont un excellent moyen d'obtenir des ressources gratuites!",
      "OÙ TROUVER LES CODES",
      "Les codes promo sont publiés sur les réseaux sociaux officiels du jeu, notre site web, et pendant les événements spéciaux.",
      "COMMENT LES RÉCUPÉRER",
      "1. Ouvrez le jeu et accédez à votre profil",
      "2. Cherchez l'icône 'Paramètres' ou 'Codes'",
      "3. Entrez votre code promo et validez",
      "4. Récupérez vos récompenses directement dans votre boîte aux lettres!"
    ]
  },
  "team-composition": {
    content: [
      "Une équipe équilibrée est la clé du succès dans TopGirl!",
      "LES RÔLES",
      "Une équipe efficace doit contenir différents rôles: Vocaliste, Danseur, Center, et Support. Chaque rôle apporte des bonus uniques.",
      "SYNERGIES PAR GENRE",
      "Pop: Bonus de fans rapide\nHip Hop: Bonus de revenus\nR&B: Bonus d'énergie\nRock: Bonus de combat\nElectronic: Bonus d'événements",
      "COMPOSITION RECOMMANDÉE",
      "Pour les débutants: 2 Vocalistes + 1 Danseur + 1 Center + 1 Support\nPour le PvP: 1 Tank + 2 DPS + 1 Support + 1 Utility"
    ]
  }
};

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

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
            <div
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              style={{
                background: "rgba(30, 30, 50, 0.8)",
                borderRadius: "20px",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                padding: "24px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
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
            </div>
          ))}
        </div>
      </div>

      {selectedGuide && (
        <div
          onClick={() => setSelectedGuide(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, rgba(30, 30, 50, 0.98), rgba(15, 15, 25, 0.98))",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "700px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              border: `1px solid ${selectedGuide.color}44`,
              position: "relative",
              boxShadow: `0 0 60px ${selectedGuide.color}33`,
            }}
          >
            <button
              onClick={() => setSelectedGuide(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "10px",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                background: `${selectedGuide.color}22`,
                fontSize: "2rem",
              }}>
                {selectedGuide.icon}
              </div>
              <div>
                <h2 style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 800 }}>
                  {selectedGuide.title}
                </h2>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <span style={{
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    background: `${selectedGuide.color}22`,
                    color: selectedGuide.color,
                  }}>
                    {selectedGuide.category}
                  </span>
                  <span style={{
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                  }}>
                    {selectedGuide.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)", marginBottom: "24px" }} />

            <div style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "1rem" }}>
              {guideContent[selectedGuide.id] ? (
                guideContent[selectedGuide.id].content.map((paragraph, idx) => {
                  const isHeader = paragraph.startsWith("CRÉER") || paragraph.startsWith("MISSIONS") || paragraph.startsWith("PARTICIPEZ") || paragraph.startsWith("CONSTITUER") || paragraph.startsWith("OÙ") || paragraph.startsWith("COMMENT") || paragraph.startsWith("LES") || paragraph.startsWith("SYNERGIES") || paragraph.startsWith("COMPOSITION");
                  const isList = paragraph.startsWith("1.") || paragraph.startsWith("2.") || paragraph.startsWith("3.") || paragraph.startsWith("4.");
                  const isSubheader = paragraph.includes(":") && paragraph.length < 50;
                  
                  if (isHeader) {
                    return <h3 key={idx} style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginTop: "24px", marginBottom: "12px", borderBottom: "1px solid rgba(139, 92, 246, 0.3)", paddingBottom: "8px" }}>{paragraph}</h3>;
                  }
                  if (isList) {
                    return <p key={idx} style={{ marginLeft: "20px", marginBottom: "8px", color: "rgba(255,255,255,0.7)" }}>{paragraph}</p>;
                  }
                  if (isSubheader) {
                    return <p key={idx} style={{ marginBottom: "8px", color: selectedGuide.color, fontWeight: 600 }}>{paragraph}</p>;
                  }
                  return <p key={idx} style={{ marginBottom: "12px" }}>{paragraph}</p>;
                })
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}>{selectedGuide.icon}</div>
                  <p style={{ color: "rgba(255,255,255,0.6)" }}>Ce guide arrive bientôt! Restez connecté pour les mises à jour.</p>
                </div>
              )}
            </div>

            <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>Mis à jour: Mars 2026</span>
              <button style={{ padding: "12px 24px", borderRadius: "12px", background: selectedGuide.color, color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                Commencer à lire →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
