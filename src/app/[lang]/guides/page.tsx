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
  difficulty: string;
  readTime: string;
};

const guides: Guide[] = [
  {
    id: "debutant",
    title: "Guide des Débutants",
    description: "Tout ce que vous devez savoir pour bien commencer dans TopGirl. Desde la création de votre premier artiste jusqu'aux premières stratégies gagnantes.",
    icon: "🎤",
    color: "#8b5cf6",
    category: "Débutant",
    difficulty: "Facile",
    readTime: "10 min",
  },
  {
    id: "codes-promo",
    title: "Comment Utiliser les Codes",
    description: "Guide paso a paso para entrer vos codes promo et obtenir des récompenses exclusives.",
    icon: "🎁",
    color: "#f59e0b",
    category: "Débutant",
    difficulty: "Facile",
    readTime: "5 min",
  },
  {
    id: "team-composition",
    title: "Composition d'Équipe",
    description: "Les meilleures combinaisons d'artistes par rôle. Apprenez à créer des équipes équilibrées pour chaque type d'événement.",
    icon: "👥",
    color: "#06b6d4",
    category: "Intermédiaire",
    difficulty: "Intermédiaire",
    readTime: "15 min",
  },
  {
    id: "evenements",
    title: "Guide des Événements",
    description: "Comment maximiser vos récompenses lors des événements. Stratégies pour chaque type d'événement.",
    icon: "🎉",
    color: "#ec4899",
    category: "Avancé",
    difficulty: "Intermédiaire",
    readTime: "12 min",
  },
  {
    id: "ressources",
    title: "Gestion des Ressources",
    description: "Comment gérer efficacement vos pièces, diamants et autres ressources pour une progression optimale.",
    icon: "💎",
    color: "#10b981",
    category: "Intermédiaire",
    difficulty: "Intermédiaire",
    readTime: "8 min",
  },
  {
    id: "synergies",
    title: "Synergies entre Artistes",
    description: "Découvrez les synergies cachées entre les artistes et optimisez votre équipe.",
    icon: "✨",
    color: "#6366f1",
    category: "Avancé",
    difficulty: "Avancé",
    readTime: "20 min",
  },
  {
    id: "voitures",
    title: "Guide des Voitures",
    description: "Tout sur le système de voitures : acquisition, upgrade et optimisation.",
    icon: "🚗",
    color: "#ef4444",
    category: "Intermédiaire",
    difficulty: "Intermédiaire",
    readTime: "10 min",
  },
  {
    id: "villa",
    title: "Guide de la Villa",
    description: "Comment construire et personnaliser votre villa pour maximiser les bonus.",
    icon: "🏰",
    color: "#14b8a6",
    category: "Avancé",
    difficulty: "Avancé",
    readTime: "15 min",
  },
];

const categories = ["Tous", "Débutant", "Intermédiaire", "Avancé"];

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const filteredGuides =
    activeCategory === "Tous"
      ? guides
      : guides.filter((g) => g.category === activeCategory);

  return (
    <div className="container">
      <h1 className="section-title" style={{ marginBottom: "var(--space-2)" }}>
        Guides
      </h1>
      <p className="section-subtitle" style={{ marginBottom: "var(--space-6)" }}>
        Tutoriels et stratégies pour maîtriser le jeu
      </p>

      <AdBanner />

      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          marginBottom: "var(--space-6)",
          overflowX: "auto",
          paddingBottom: "var(--space-2)",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 20px",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              background: activeCategory === cat ? "var(--primary)" : "transparent",
              color: activeCategory === cat ? "#fff" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "var(--space-5)",
        }}
      >
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border)",
              padding: "var(--space-6)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = `0 20px 40px ${guide.color}22`;
              e.currentTarget.style.borderColor = guide.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${guide.color}, ${guide.color}88)`,
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "var(--radius-lg)",
                background: `${guide.color}22`,
                fontSize: "1.75rem",
                marginBottom: "var(--space-4)",
              }}
            >
              {guide.icon}
            </div>

            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                marginBottom: "var(--space-2)",
                color: "var(--text-primary)",
              }}
            >
              {guide.title}
            </h3>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "var(--text-sm)",
                lineHeight: 1.6,
                marginBottom: "var(--space-4)",
              }}
            >
              {guide.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                fontSize: "var(--text-xs)",
              }}
            >
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "var(--radius)",
                  background: `${guide.color}22`,
                  color: guide.color,
                  fontWeight: 500,
                }}
              >
                {guide.category}
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "var(--radius)",
                  background: "var(--bg-subtle)",
                  color: "var(--text-muted)",
                }}
              >
                {guide.readTime}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedGuide && (
        <div
          onClick={() => setSelectedGuide(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--space-4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-8)",
              maxWidth: "700px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              position: "relative",
              border: "1px solid var(--border)",
            }}
          >
            <button
              onClick={() => setSelectedGuide(null)}
              style={{
                position: "absolute",
                top: "var(--space-4)",
                right: "var(--space-4)",
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                color: "var(--text-muted)",
                fontSize: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                marginBottom: "var(--space-4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-lg)",
                  background: `${selectedGuide.color}22`,
                  fontSize: "1.5rem",
                }}
              >
                {selectedGuide.icon}
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "var(--text-2xl)",
                    fontWeight: 700,
                  }}
                >
                  {selectedGuide.title}
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-2)",
                    fontSize: "var(--text-xs)",
                    marginTop: "var(--space-1)",
                  }}
                >
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "var(--radius)",
                      background: `${selectedGuide.color}22`,
                      color: selectedGuide.color,
                      fontWeight: 500,
                    }}
                  >
                    {selectedGuide.category}
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "var(--radius)",
                      background: "var(--bg-subtle)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {selectedGuide.readTime} de lecture
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                height: "1px",
                background: "var(--border)",
                marginBottom: "var(--space-6)",
              }}
            />

            <div
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.8,
                fontSize: "var(--text-base)",
              }}
            >
              {selectedGuide.id === "debutant" && (
                <>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      marginBottom: "var(--space-3)",
                      marginTop: "var(--space-6)",
                    }}
                  >
                    Bienvenue dans TopGirl! 👋
                  </h3>
                  <p style={{ marginBottom: "var(--space-4)" }}>
                    Ce guide vous accompagnera dans vos premiers pas pour devenir une véritable star.
                  </p>

                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      marginBottom: "var(--space-3)",
                      marginTop: "var(--space-6)",
                    }}
                  >
                    1. Créer votre premier artiste
                  </h3>
                  <p style={{ marginBottom: "var(--space-3)" }}>
                    Au début du jeu, vous pourrez créer votre premier artiste. Choisissez bien son genre -
                    Pop, Hip Hop, R&B, Rock ou Electronic - car cela affectera vos performances dans différents événements.
                  </p>

                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      marginBottom: "var(--space-3)",
                      marginTop: "var(--space-6)",
                    }}
                  >
                    2. Complétez les missions quotidiennes
                  </h3>
                  <p style={{ marginBottom: "var(--space-3)" }}>
                    Les missions quotidiennes sont votre principale source de ressources au début. Complétez-les
                    régulièrement pour accumuler des pièces et de l'expérience.
                  </p>

                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      marginBottom: "var(--space-3)",
                      marginTop: "var(--space-6)",
                    }}
                  >
                    3. Participez aux événements
                  </h3>
                  <p style={{ marginBottom: "var(--space-3)" }}>
                    Les événements sont essentiels pour progresser rapidement. Gardez un œil sur le calendrier
                    des événements et privilégiez ceux avec des récompenses UR ou SSR.
                  </p>
                </>
              )}

              {selectedGuide.id === "codes-promo" && (
                <>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    Comment utiliser les codes promo
                  </h3>
                  <ol style={{ paddingLeft: "var(--space-5)", marginBottom: "var(--space-4)" }}>
                    <li style={{ marginBottom: "var(--space-2)" }}>
                      Ouvrez le jeu et accédez à votre profil
                    </li>
                    <li style={{ marginBottom: "var(--space-2)" }}>
                      Cherchez l'icône "Paramètres" ou "Codes"
                    </li>
                    <li style={{ marginBottom: "var(--space-2)" }}>
                      Entrez votre code promo et validez
                    </li>
                    <li style={{ marginBottom: "var(--space-2)" }}>
                      Récupérez vos récompenses directement dans votre boîte aux lettres!
                    </li>
                  </ol>
                  <p style={{ color: "var(--primary)", fontWeight: 500 }}>
                    💡 Astuce: Les codes promo sont souvent publiés sur nos réseaux sociaux!
                  </p>
                </>
              )}

              {selectedGuide.id === "team-composition" && (
                <>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    Les rôles dans une équipe
                  </h3>
                  <p style={{ marginBottom: "var(--space-4)" }}>
                    Une équipe équilibrée doit contenir différents rôles: Vocaliste, Danseur, Center, et Support.
                    Chaque rôle apporte des bonus uniques.
                  </p>

                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      marginBottom: "var(--space-3)",
                      marginTop: "var(--space-4)",
                    }}
                  >
                    Synergies par genre
                  </h3>
                  <ul style={{ paddingLeft: "var(--space-5)", marginBottom: "var(--space-4)" }}>
                    <li><strong>Pop:</strong> Bonus de fans rapide</li>
                    <li><strong>Hip Hop:</strong> Bonus de revenus</li>
                    <li><strong>R&B:</strong> Bonus d'énergie</li>
                    <li><strong>Rock:</strong> Bonus de combat</li>
                    <li><strong>Electronic:</strong> Bonus d'événements</li>
                  </ul>
                </>
              )}

              {selectedGuide.id !== "debutant" &&
                selectedGuide.id !== "codes-promo" &&
                selectedGuide.id !== "team-composition" && (
                  <>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "var(--space-10)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <div style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>
                        {selectedGuide.icon}
                      </div>
                      <p>Ce guide arrive bientôt!</p>
                      <p style={{ fontSize: "var(--text-sm)", marginTop: "var(--space-2)" }}>
                        Restez connecté pour les mises à jour.
                      </p>
                    </div>
                  </>
                )}
            </div>

            <div
              style={{
                marginTop: "var(--space-6)",
                paddingTop: "var(--space-4)",
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                Mis à jour: Mars 2026
              </span>
              <button
                style={{
                  padding: "10px 20px",
                  borderRadius: "var(--radius)",
                  background: selectedGuide.color,
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Commencer à lire →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
