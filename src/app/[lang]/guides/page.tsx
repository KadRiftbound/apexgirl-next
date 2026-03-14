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
    id: "purple-equipment",
    title: "Équipement Purple (Budget)",
    description: "Setup économique Purple. +13,730 stats mais pas de bonus fans. Stratégie Gold/Purple mixte.",
    icon: "💜",
    color: "#a855f7",
    category: "Intermédiaire",
    readTime: "8 min",
  },
];

const categories = ["Tous", "Débutant", "Intermédiaire", "Avancé"];

const guideContent: Record<string, { content: string[] }> = {
  "equipment": {
    content: [
      "L'équipement est essentiel pour booster les statistiques de votre équipe. Il existe 3 catégories principales avec deux rarités: Gold et Purple.",
      "BIJOUX (Jewelry)",
      "Les bijoux offrent des bonus modestes mais sont plus abordables. Chaque personnage peut équiper 1 bijou.",
      "Type | Rareté | Sing | Dance | Management | Fans",
      "Ring | GOLD | +2,015 | - | - | +11,000",
      "Choker | GOLD | - | +2,015 | - | +11,000",
      "Heels | GOLD | - | - | +806 | +11,000",
      "Watch | PURPLE | +1,640 | - | - | -",
      "Bracelet | PURPLE | - | +1,640 | - | -",
      "Lingerie | PURPLE | - | - | +656 | -",
      "VOITURES (Cars)",
      "Les voitures offrent des bonus moyens et augmentent la capacité de fans.",
      "Type | Rareté | Sing | Dance | Management | Fans",
      "Audi | GOLD | +5,905 | - | - | +25,000",
      "Lamborghini | GOLD | - | +5,905 | - | +25,000",
      "Lexus | GOLD | - | - | +2,362 | +25,000",
      "Lotus | PURPLE | +4,030 | - | - | -",
      "Beetle | PURPLE | - | +4,030 | - | -",
      "Cooper | PURPLE | - | - | +1,612 | -",
      "PROPRIÉTÉS (Properties)",
      "Les propriétés offrent les plus grands bonus de stats et de fans.",
      "Type | Rareté | Sing | Dance | Management | Fans",
      "Villa | GOLD | +11,810 | - | - | +50,000",
      "Park Mansion | GOLD | - | +11,810 | - | +50,000",
      "Country Manor | GOLD | - | - | +4,724 | +50,000",
      "Penthouse | PURPLE | +8,060 | - | - | -",
      "Loft | PURPLE | - | +8,060 | - | -",
      "PRIORITÉ D'ACHAT",
      "1. Properties (Villa/Park Mansion) - Plus gros boost: +11,810 stat + 50,000 fans",
      "2. Cars (Audi/Lamborghini) - Bonus moyen: +5,905 stat + 25,000 fans",
      "3. Jewelry (Ring/Choker) - Petit boost: +2,015 stat + 11,000 fans"
    ]
  },
  "team-builder": {
    content: [
      "Le Team Builder vous permet de construire l'équipe optimale en calculant les synergies de genre et les bonus d'équipement.",
      "COMPOSITION D'ÉQUIPE",
      "Une équipe efficace contient 5 personnages avec des rôles différents: Vocalist, Dancer, et Center.",
      "SYNERGIES DE GENRE",
      "Pop: Bonus de fans rapide",
      "Hip Hop: Bonus de revenus",
      "R&B: Bonus d'énergie",
      "Rock: Bonus de combat",
      "EDM: Bonus d'événements",
      "Les synergies s'activent avec 2+ personnages du même genre. Plus de personnages = plus de bonus!",
      "RÔLES DES PERSONNAGES",
      "Vocalist: Forte statistique de Sing (Attaque)",
      "Dancer: Forte statistique de Dance (Défense)",
      "Center: Équilibré entre Sing et Dance",
      "CALCUL DES STATS",
      "Stats finales = (Stats de base × Synergie) + Bonus équipement",
      "L'équipement s'additionne: 1 Ring + 1 Voiture + 1 Propriété par personnage",
      "Example Vocalist Gold: Ring (+2,015 Sing) + Audi (+5,905 Sing) + Villa (+11,810 Sing) = +19,730 Sing + 86,000 Fans"
    ]
  },
  "recommended-teams": {
    content: [
      "Voici les équipes optimisées basées sur les synergies, compétences et équilibre des stats.",
      "ÉQUIPES AVEC UR",
      "COMPOSITION OFFENSIVE R&B",
      "Marguerite (UR) | Sing: 11,261 | Dance: 6,446 | Compétences: Skill DMG +20%, Normal DMG +50%",
      "Elizabeth (UR) | Sing: 6,446 | Dance: 11,261 | Compétences: Normal DMG +50%, Player DMG +20%",
      "Sora (SSR) | Sing: 13,513 | Dance: 7,735 | Compétences: Normal DMG +50%, Fan Cap +10%",
      "Nova (SSR) | Sing: 8,854 | Dance: 8,854 | Compétences: Normal DMG +50%, DMG Defense 200/s",
      "Julia (SSR) | Sing: 11,261 | Dance: 6,446 | Compétences: Skill DMG +20%, Car Speed +75%",
      "Synergie: R&B (+4%) | Total Sing: 51,335 | Total Dance: 40,742",
      "ÉQUIPES SSR SEULEMENT (Offensive)",
      "Sora (SSR) | R&B Vocalist | Normal DMG +50%, Fan Cap +10%",
      "Julia (SSR) | R&B Vocalist | Skill DMG +20%, Car Speed +75%",
      "Nova (SSR) | R&B Dancer | Normal DMG +50%, DMG Defense 200/s",
      "Zendaya (SSR) | R&B Center | Normal DMG +50%, NPC DMG +20%, Car Speed +50%",
      "Raith (SSR) | R&B Dancer | Normal DMG +50%, Reduce Normal Atk DMG -12%",
      "Synergie: R&B (+6%) | Total Sing: 47,809 | Total Dance: 47,809",
      "ÉQUIPES DÉFENSIVES",
      "Paisley (SSR) | ROCK Dancer | Reduce Skill DMG -12%, Reduce Normal Atk DMG -12%",
      "Moana (SSR) | POP Vocalist | Reduce Skill DMG -12%, Reduce Normal Atk DMG -12%",
      "Avery (SSR) | HipHop Center | Reduce Skill DMG -12%, Reduce Normal Atk DMG -12%",
      "Ayaka (SSR) | HipHop Center | Reduce Skill DMG -12%, Reduce Normal Atk DMG -12%",
      "Nova (SSR) | R&B Dancer | Normal DMG +50%, DMG Defense 200/s",
      "Stats Clés: Reduce DMG -48%, Normal DMG +50%"
    ]
  },
  "leveling-ssr": {
    content: [
      "Ce guide montre le nombre de cartes Gold nécessaires pour level up vos personnages SSR.",
      "TABLEAU DES REQUIREMENTS",
      "Niveau | Cartes Requises | Total Cumulé",
      "Level 20 | 50 | 50",
      "Level 30 | 100 | 150",
      "Level 40 | 200 | 350",
      "Level 50 | 450 | 800",
      "Level 60 | 700 | 1,500",
      "Level 80 | 800 | 2,300",
      "Level 85 | 800 | 3,100",
      "Level 90 | 800 | 3,900",
      "Level 95 | 800 | 4,700",
      "Level 100 | 1,200 | 5,900",
      "Level 105 | 1,200 | 7,100",
      "Level 110 | 1,200 | 8,300",
      "Level 115 | 1,200 | 9,500",
      "TOTAL: 9,500 cartes Gold pour niveau max (115)",
      "CONSEIL: Concentrez-vous d'abord sur quelques personnages bien leveling plutôt que beaucoup de personnages faibles."
    ]
  },
  "blueprints": {
    content: [
      "Les blueprints sont utilisés pour level up les installations qui améliorent: rally capacity, sing, dance, management, et plundering.",
      "TIERS DISPONIBLES",
      "Tiers 1-2: Qualité Argent",
      "Tiers 3-4: Qualité Verte",
      "Tiers 5-7: Qualité Pourpre (Purple)",
      "Tiers 8-18: Qualité Or (Gold) - Tiers 13-18 ajoutés récemment",
      "REQUIREMENTS PAR TIER",
      "Tier 7 (Purple): Total 21,930",
      "Tier 8 (Gold): Total 40,820",
      "Tier 9 (Gold): Total 50,430",
      "Tier 10 (Gold): Total 60,610",
      "Tier 11 (Gold): Total 83,700",
      "Tier 12 (Gold): Total 96,000",
      "DÉTAIL TIER 7-12 (par niveau d'installation)",
      "Niveau | Tier 7 | Tier 8 | Tier 9 | Tier 10 | Tier 11 | Tier 12",
      "1 | 1,870 | 2,920 | 4,470 | 6,520 | 8,700 | 9,900",
      "4 | 2,170 | 3,220 | 5,070 | 7,020 | 9,000 | 10,000",
      "7 | 2,370 | 3,520 | 5,470 | 7,520 | 9,300 | 11,000",
      "10 | 2,570 | 3,820 | 5,870 | 8,020 | 9,600 | 11,000",
      "14 | - | 4,270 | - | - | - | -",
      "CONSEIL: Priorisez les tiers eleves pour des bonus maximums mais attention aux couts!",
    ]
  },
  "hq-upgrade": {
    content: [
      "Ce guide montre le nombre de cartes de bâtiment nécessaires pour level up votre Quartier Général (HQ).",
      "TABLEAU DES REQUIREMENTS",
      "Niveau | Cartes Requises | Total Cumulé",
      "1 | 0 | 0",
      "2 | 2 | 2",
      "3 | 20 | 22",
      "4 | 100 | 122",
      "5 | 200 | 322",
      "6 | 400 | 722",
      "7 | 800 | 1,522",
      "8 | 1,400 | 2,922",
      "9 | 2,000 | 4,922",
      "10 | 2,600 | 7,522",
      "11 | 3,200 | 10,722",
      "12 | 3,600 | 14,322",
      "13 | 4,000 | 18,322",
      "14 | 5,600 | 23,922",
      "15 | 6,000 | 29,922",
      "TOTAL: 29,922 cartes pour HQ niveau max (15)",
      "CONSEIL: Le HQ influence votre capacité globale. Upgradez régulièrement pour débloquer de nouvelles fonctionnalités."
    ]
  },
  "vehicle-system": {
    content: [
      "Le système de véhicules débloque de nouveaux skins et bonus à chaque étape d'avancement.",
      "AVANCEMENT DES VÉHICULES",
      "Classe | Étoiles | Drawings Requis | Skin Débloqué",
      "A Class | 0⭐ | 4 | -",
      "B Class | 0⭐ | 20 | Cybertruck",
      "B Class | 1⭐ | 80 | Mustang",
      "C Class | 0⭐ | 200 | Cooper",
      "C Class | 1⭐ | 500 | Lexas",
      "C Class | 2⭐ | 1,000 | Explorer",
      "D Class | 0⭐ | 1,200 | Hammer",
      "D Class | 1⭐ | 1,400 | -",
      "D Class | 2⭐ | 1,800 | Navigator",
      "D Class | 3⭐ | 2,000 | -",
      "E Class | 0⭐ | 2,300 | AodiQ5",
      "E Class | 5⭐ | 4,000 | -",
      "S Class | 0⭐ | 4,000 | Lamboginy",
      "S Class | 5⭐ | 4,000 | Colinan",
      "COMPOSANTS DU VÉHICULE",
      "Engine (5 niveaux): Augmente Sing et capacité fans",
      "Chassis (5 niveaux): Augmente Dance et capacité fans",
      "Suspension (5 niveaux): Augmente Management et capacité fans",
      "Rims (5 niveaux): Augmente driving speed et capacité fans",
      "PROCESSUS D'UPGRADE",
      "1. Upgradez chaque composant (Engine, Chassis, Suspension, Rims) 5 fois avec des 'Vehicle Upgrade Parts'",
      "2. Une fois tous les composants upgradez, utilisez 'Vehicle Advance Drawings' pour avancer au niveau suivant",
      "3. Cela débloque de nouveaux skins et offre des bonus de stats"
    ]
  },
  "gold-equipment": {
    content: [
      "Setup optimal en équipement Gold pour chaque type de personnage.",
      "PAR TYPE DE PERSONNAGE",
      "Vocalist (Haute Sing): Ring + Audi + Villa = +19,730 Sing, +86,000 Fans",
      "Dancer (Haute Dance): Choker + Lamborghini + Park Mansion = +19,730 Dance, +86,000 Fans",
      "Center (Équilibré): Ring/Choker + Audi/Lamborghini + Villa/Park Mansion = +19,730 Sing/Dance",
      "Management: Heels + Lexus + Country Manor = +7,892 Management, +86,000 Fans",
      "PERSONNAGES RECOMMANDÉS",
      "Pour Vocalist: Marguerite, Sora, Julia, Skylar, Moana, Alice, Bella",
      "Pour Dancer: Elizabeth, Raith, Yuuko, Paisley, Savannah, Caroline, Leilani",
      "Pour Center: Zendaya, Claire, Talia, Chizuru, Aurora, Kokoro, Everly, Avery, Ayaka, Audrey",
      "SETUP ÉQUIPE COMPLET - MAXIMUM OFFENSE",
      "Vocalist 1: Ring + Audi + Villa = +19,730 Sing",
      "Vocalist 2: Ring + Audi + Villa = +19,730 Sing",
      "Center: Ring + Audi + Villa = +19,730 Sing",
      "Dancer 1: Choker + Lamborghini + Park Mansion = +19,730 Dance",
      "Dancer 2: Choker + Lamborghini + Park Mansion = +19,730 Dance",
      "TOTAL: +59,190 Sing, +39,460 Dance, +430,000 Fans",
      "STRATÉGIE: Focus sur la stat Sing pour maximiser les dégats",
      "SETUP ÉQUIPE - BALANCED",
      "Mix Ring/Choker et Audi/Lamborghini selon les rôles",
      "TOTAL: ~+49,325 Sing, ~+49,325 Dance, +430,000 Fans",
      "STRATÉGIE: Équilibre entre Sing et Dance"
    ]
  },
  "purple-equipment": {
    content: [
      "Setup économique en équipement Purple pour les joueurs avec budget limité.",
      "PAR TYPE DE PERSONNAGE",
      "Vocalist: Watch + Lotus + Penthouse = +13,730 Sing, +0 Fans (différence: -86,000 Fans vs Gold)",
      "Dancer: Bracelet + Beetle + Loft = +13,730 Dance, +0 Fans",
      "Center: Watch/Bracelet + Lotus/Beetle + Penthouse/Loft = +13,730 Sing/Dance",
      "Management: Lingerie + Cooper = +2,268 Management, +0 Fans",
      "STRATÉGIE MIXTE Gold/Purple",
      "Priorité d'achat:",
      "1. Properties Gold (Villa/Park Mansion): +11,810 stat + 50,000 fans",
      "2. Cars Gold (Audi/Lamborghini): +5,905 stat + 25,000 fans",
      "3. Jewelry Gold (Ring/Choker): +2,015 stat + 11,000 fans",
      "EXAMPLE SETUP MIXTE (Vocalist)",
      "Gold Villa: +11,810 Sing, +50,000 Fans",
      "Purple Lotus: +4,030 Sing",
      "Purple Watch: +1,640 Sing",
      "TOTAL: +17,480 Sing, +50,000 Fans",
      "DIFFÉRENCE vs TOUT GOLD: -2,250 Sing, -36,000 Fans",
      "CONSEIL: Si vous ne pouvez pas avoir tout en Gold, priorité à la Propriété (plus gros bonus)"
    ]
  },
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
