"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AdBanner } from "@/components/AdSense";

const guideTranslations: Record<string, any> = {
  fr: { notFound: "Guide non trouvé", backToGuides: "← Retour aux guides", otherGuides: "Autres guides" },
  en: { notFound: "Guide not found", backToGuides: "← Back to Guides", otherGuides: "Other Guides" },
  it: { notFound: "Guida non trovata", backToGuides: "← Torna alle guide", otherGuides: "Altre guide" },
  es: { notFound: "Guía no encontrada", backToGuides: "← Volver a las guías", otherGuides: "Otras guías" },
  pt: { notFound: "Guia não encontrado", backToGuides: "← Voltar aos guias", otherGuides: "Outros guias" },
  pl: { notFound: "Poradnik nie znaleziony", backToGuides: "← Wróć do poradników", otherGuides: "Inne poradniki" },
  id: { notFound: "Panduan tidak ditemukan", backToGuides: "← Kembali ke panduan", otherGuides: "Panduan lain" },
  ru: { notFound: "Гайд не найден", backToGuides: "← Вернуться к гайдам", otherGuides: "Другие гайды" },
};

type Guide = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  readTime: string;
  content?: string;
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
    content: `
## Guide Équipement - TopGirl

### Bijoux (Accessories)
Les bijoux sont essentiels pour booster vos statistiques principales. Voici les优先级:

** Collier (Necklace) ** - +Bonus Vocal
** Bague (Ring) ** - +Bonus Dance  
** Montre (Watch) ** - +Bonus Charm

### Voitures (Vehicles)
Les voitures offrent des bonus massifs mais coûtent cher:
- Starter Car: 500,000 Gold
- Sports Car: 2,000,000 Gold
- Luxury Car: 10,000,000 Gold

### Propriétés (Properties)
Les propriétés génèrent des revenus passifs:
- Apartment: 50,000 Gold/jour
- House: 200,000 Gold/jour
- Mansion: 1,000,000 Gold/jour

### Comparaison Gold vs Purple

| Équipement | Gold Stats | Purple Stats |
|------------|-----------|-------------|
| Bijoux | +500 | +350 |
| Voiture | +2,000 | +1,400 |
| Propriété | +5,000 | +3,500 |

**Recommandation:** Visez d'abord le Gold pour les statistiques max, puis Purple pour le budget.
    `
  },
  {
    id: "team-builder",
    title: "Team Builder",
    description: "Comment construire l'équipe parfaite. Calcul des synergies de genre et bonus d'équipement.",
    icon: "👥",
    color: "#22d3ee",
    category: "Intermédiaire",
    readTime: "15 min",
    content: `
## Team Builder - TopGirl

### Composition d'équipe
Une équipe optimale contient 5 artistes avec des rôles bien définis:

1. **Vocalist (Lead)** - Highest stats, genre bonus
2. **Dancer (Support)** - Team buffs
3. **Center** - Balance
4. **Makestar** - Fan generation
5. **Support** - Defense/utility

### Synergies de Genre
Le bonus de genre s'applique quand vous avez 2+ artistes du même genre:

- **Pop + Pop**: +15% Vocal
- **EDM + EDM**: +15% Dance
- **Hip Hop + Hip Hop**: +15% Charm

### Bonus d'Équipement
Les équipements synergisent avec les rôles:
- Jewelry set: +20% main stat
- Vehicle set: +15% secondary stat
- Property set: +10% all stats

### Build Types
**Offensif:** 3 Offense / 1 Defense / 1 Support
**Défensif:** 2 Offense / 3 Defense / 0 Support
**Équilibré:** 2 Offense / 2 Defense / 1 Support
    `
  },
  {
    id: "recommended-teams",
    title: "Équipes Recommandées",
    description: "Les meilleures compositions d'équipes UR et SSR. Stratégies offensives, équilibrées et défensives.",
    icon: "🏆",
    color: "#f472b6",
    category: "Avancé",
    readTime: "12 min",
    content: `
## Équipes Recommandées - TopGirl

### Top UR Teams

**Team 1 - Hyper Offense:**
- Kokoro (Vocalist)
- Aurora (Dancer)
- Claire (Center)
- Anastasia (Defense)
- Beatrice (Support)

**Team 2 - Balance:**
- Alexandra (Vocalist)
- Elizabeth (Dancer)
- Genevieve (Center)
- Marguerite (Defense)
- Gabriella (Support)

### Top SSR Teams

**Team 1 - Budget Meta:**
- Alice (Vocalist)
- Hestia (Dancer)
- Hikari (Center)
- Eri (Defense)
- Flora (Support)

### Stratégies

**Offensive:** Maximisez les damage dealers
- Focus: Skill Damage + Basic Attack
- Meta: Kokoro, Aurora, Claire

**Défensive:** Focus survival
- Focus: Damage Reduction + HP
- Meta: Anastasia, Genevieve, Marguerite

**Équilibrée:** Mix des deux
- Focus: Stats distribution
- Meta: Elizabeth, Gabriella
    `
  },
  {
    id: "leveling-ssr",
    title: "Montée en Niveau SSR",
    description: "Nombre de cartes nécessaires pour level up vos personnages SSR jusqu'au niveau 115.",
    icon: "📈",
    color: "#34d399",
    category: "Débutant",
    readTime: "8 min",
    content: `
## Montée en Niveau SSR - TopGirl

### Cartes nécessaires par niveau

| Niveau | Cartes SSR | Total |
|--------|-----------|-------|
| 1-10 | 10 | 10 |
| 10-20 | 20 | 30 |
| 20-40 | 40 | 70 |
| 40-60 | 60 | 130 |
| 60-80 | 80 | 210 |
| 80-100 | 100 | 310 |
| 100-115 | 150 | 460 |

### Tips Level Up
- Utilisez les cartes SSR excédentaires
- Focus sur vos mains first
- Level up pendant les événements x2 XP
- Priorisez les artistes avec haute thérapeutisten

### Coût Gold
Le coût en gold augmente avec le niveau:
- Niv 1-40: ~500,000 Gold
- Niv 40-70: ~2,000,000 Gold  
- Niv 70-100: ~8,000,000 Gold
- Niv 100-115: ~25,000,000 Gold
    `
  },
  {
    id: "blueprints",
    title: "Guide Blueprints",
    description: "Requirements en blueprints par tier (1-21) pour améliorer vos installations. Tier 7-12 Gold.",
    icon: "🛠️",
    color: "#818cf8",
    category: "Intermédiaire",
    readTime: "10 min",
    content: `
## Guide Blueprints - TopGirl

### Installation Tiers

| Tier | Blueprints | Gold | Effet |
|------|-----------|------|-------|
| 1-3 | 50-100 | 10K | +5% stats |
| 4-6 | 150-300 | 50K | +10% stats |
| 7-9 | 500-800 | 200K | +15% stats |
| 10-12 | 1000-1500 | 500K | +20% stats |
| 13-15 | 2000-3000 | 1M | +25% stats |
| 16-18 | 4000-5000 | 3M | +30% stats |
| 19-21 | 7000+ | 10M | +35% stats |

### Priorités
1. **Studio** - Production de songs
2. **Training** - Level up artists
3. **Fan Hall** - Génération fans
4. **Marketing** - Revenus passifs

### Tips
- Focus tier 7-12 Gold en premier
- Attend les événements pour les discounts
- Upgrade uniformément pour éviter le瓶颈
    `
  },
  {
    id: "hq-upgrade",
    title: "Guide HQ (Quartier Général)",
    description: "Cartes de bâtiment nécessaires pour chaque niveau du HQ. Requirement total: 29,922 cartes.",
    icon: "🏢",
    color: "#a855f7",
    category: "Débutant",
    readTime: "5 min",
    content: `
## Guide HQ - TopGirl

### Cartes par Niveau HQ

| Niveau | Cartes | Coût Gold |
|-------|--------|----------|
| 1 | 50 | 1,000 |
| 2 | 100 | 2,500 |
| 3 | 200 | 5,000 |
| 4 | 400 | 10,000 |
| 5 | 800 | 25,000 |
| 6 | 1,500 | 50,000 |
| 7 | 2,500 | 100,000 |
| 8 | 4,000 | 200,000 |
| 9 | 6,000 | 400,000 |
| 10 | 8,000 | 800,000 |

**Total pour HQ Level 10:** ~29,922 cartes / ~1.6M Gold

### Bonus HQ
- Level 5: Unlock events supplémentaires
- Level 7: +10% toutes stats
- Level 10: Maximum bonus
    `
  },
  {
    id: "vehicle-system",
    title: "Système de Véhicules",
    description: "Système complet: Avancement, Pièces (Moteur, Châassis, Suspension, Jantes), Skins débloqués.",
    icon: "🚗",
    color: "#f87171",
    category: "Avancé",
    readTime: "15 min",
    content: `
## Système de Véhicules - TopGirl

### Types de Véhicules

** Starter (Gratuit) **
- Speed: 100
- Stats bonus: +500

** Sports (50,000 Gold) **
- Speed: 150  
- Stats bonus: +1,500

** Luxury (500,000 Gold) **
- Speed: 200
- Stats bonus: +5,000

** Super (5,000,000 Gold) **
- Speed: 300
- Stats bonus: +15,000

### Pièces d'Upgrade

| Pièce | Effet | Tier Max |
|-------|-------|----------|
| Moteur | +Speed | 10 |
| Châassis | +Handling | 10 |
| Suspension | +Confort | 10 |
| Jantes | +Style | 10 |

### Skins
Les skins débloquent à certains niveaux de véhicule:
- Level 5: Skin Bronze
- Level 10: Skin Silver
- Level 20: Skin Gold
- Level 30: Skin Platinum
    `
  },
  {
    id: "gold-equipment",
    title: "Équipement Gold Optimal",
    description: "Setup complet Gold pour Vocalist, Dancer et Center. +19,730 stats et 86,000 fans par personnage.",
    icon: "✨",
    color: "#fbbf24",
    category: "Avancé",
    readTime: "10 min",
    content: `
## Équipement Gold Optimal - TopGirl

### Setup Gold Vocalist

**Bijoux:**
- Collier: Gold Diamond Necklace (+3,000 Vocal)
- Bague: Gold Diamond Ring (+2,500 Vocal)
- Montre: Gold Chrono (+2,000 Vocal)

**Véhicule:**
- Super Car (+15,000 all stats)

**Propriété:**
- Luxury Mansion (+5,000 all stats)

**Total: +27,500 Vocal / +20,000 autre / 86,000 fans**

### Setup Gold Dancer

**Bijoux:**
- Collier: Gold Diamond Necklace (+3,000 Dance)
- Bague: Gold Diamond Ring (+2,500 Dance)
- Montre: Gold Chrono (+2,000 Dance)

**Véhicule:** Super Car
**Propriété:** Luxury Mansion

**Total: +27,500 Dance**

### Setup Gold Center

**Bijoux:**
- Collier: Gold Diamond Necklace (+3,000 Vocal)
- Bague: Gold Diamond Ring (+2,500 Dance)
- Montre: Gold Chrono (+2,000 Charm)

**Véhicule + Propriété:** Same

**Total: +27,500混合 stats**

### Coût Total
~50,000,000 Gold par personnage full Gold
    `
  },
  {
    id: "purple-equipment",
    title: "Équipement Purple (Budget)",
    description: "Setup économique Purple. +13,730 stats mais pas de bonus fans. Stratégie Gold/Purple mixte.",
    icon: "💜",
    color: "#a855f7",
    category: "Intermédiaire",
    readTime: "8 min",
    content: `
## Équipement Purple - TopGirl

### Setup Purple Vocalist

**Bijoux:**
- Collier: Purple Gem Necklace (+2,000 Vocal)
- Bague: Purple Gem Ring (+1,500 Vocal)
- Montre: Purple Watch (+1,200 Vocal)

**Véhicule:** Sports Car (+1,500 all stats)

**Propriété:** House (+3,000 all stats)

**Total: +9,700 Vocal / +6,500 autre / 0 fans**

### Setup Purple Dancer

Similar to Vocalist but:
- Collier: +2,000 Dance
- Bague: +1,500 Dance
- Montre: +1,200 Dance

**Total: +9,700 Dance**

### Stratégie Gold/Purple Mix

**Option 1: Budget Optimal**
- 2 Gold Jewelry + Purple Car + Purple Property
- Coût: ~15M Gold
- Stats: ~70% du full Gold

**Option 2: Purple Only**
- Tout Purple
- Coût: ~5M Gold
- Stats: ~50% du full Gold

### Avantages Purple
- Plus accessible
- Bon rapport qualité/prix
- Still competitive en mid-game
    `
  },
  {
    id: "event-ancient-rome",
    title: "Guide Ancient Rome",
    description: "Guide complet de l'événement Adventure Abroad Rome",
    icon: "🏛️",
    color: "#f97316",
    category: "Événements",
    readTime: "10 min",
    content: `
## Guide Ancient Rome - TopGirl

### Présentation
L'événement **Adventure Abroad: Rome** est un événement saisonnier de 12 jours qui se déroule dans la Rome antique. Le but est de收集 des items ROMA à travers 3 phases et de les échanger contre des rewards exclusifs.

### Phases de l'événement

**Phase 1: Colosseum (Jour 1-4)**
- **Objectif:** Collecter les items ROMA
- **Rewards:** ROMA Items, Diamonds
- **Conseil:** Focus sur les快速 battles pour accumuler rapidement

**Phase 2: Forum (Jour 5-8)**
- **Objectif:** Compléter des chansons
- **Rewards:** SSR Cards, ROMA Items
- **Conseil:** Utilisez vos meilleures équipes pour maximize les rewards

**Phase 3: Emperor (Jour 9-12)**
- **Objectif:** Échanger les rewards
- **Rewards:** UR Token, SSR+ Cards
- **Conseil:** Gardez enough ROMA Items pour les meilleurs échanges

### Stratégie
1. **Jour 1-4:** Maximisez la collecte d'items ROMA
2. **Jour 5-8:** Concentrez-vous sur les chanson completions
3. **Jour 9-12:** Échangez pour les meilleures rewards

### Meilleures Artists
- Cornelia, Aurelia, Xenia (bonus Rome)
    `
  },
  {
    id: "event-radio-battle",
    title: "Guide Radio Battle",
    description: "Guide complet du Radio Battle",
    icon: "📻",
    color: "#06b6d4",
    category: "Événements",
    readTime: "8 min",
    content: `
## Guide Radio Battle - TopGirl

### Présentation
Le **Radio Battle** est un événement récurrent où vous affrontez d'autres joueurs via la radio. Plus vous avez d'auditeurs, plus votre score est élevé.

### Les 5 Phases

**Phase 1: Opening (Day 1)**
- Préparez votre station radio
- Reward: Radio Coins x100

**Phase 2: Heat 1 (Day 1-2)**
- Accumulez des listeners
- Reward: Radio Coins x200

**Phase 3: Heat 2 (Day 2-3)**
- Défiez d'autres stations
- Reward: Radio Coins x300

**Phase 4: Finals (Day 3-4)**
- Bataille finale
- Reward: SSR Cards

**Phase 5: Exchange (Day 4-5)**
- Échangez vos Radio Coins
- Rewards: UR Tokens, SSR+

### Stratégie
1. **Releasez pendant les heures de pointe** (soir)
2. **Utilisez des artists avec compétences Charisma**
3. **Combinez différents genres** pour attract plus d'auditeurs

### Meilleures Artists
- Skylar, Nova, Sora, Evelyn
    `
  },
  {
    id: "event-grammy",
    title: "Guide Grammy Awards",
    description: "Guide des 8 catégories Grammy",
    icon: "🏆",
    color: "#fbbf24",
    category: "Événements",
    readTime: "10 min",
    content: `
## Guide Grammy Awards - TopGirl

### Présentation
Le **Grammy Contest** est un événement hebdomadaire de competition musicale avec 8 catégories différentes. Créez la meilleure chanson en combinant différents genres et artists.

### Les 8 Catégories

| Catégorie | Genre Requis | Meilleure Stratégie |
|-----------|--------------|---------------------|
| Best New Artist | Tous | Use rising stars avec high potential |
| Record of the Year | Pop + EDM | Combinez Pop + EDM pour max score |
| Album of the Year | Tous | Balancez tous les stats |
| Song of the Year | Tous | Focus sur Charisma skills |
| Best Pop | Pop only | Équipe 100% Pop |
| Best Hip Hop | Hip Hop only | Équipe Hip Hop |
| Best R&B | R&B only | Specialists R&B |
| Best Rock | Rock only | Équipe Rock |

### Stratégie
1. **Utilisez des artists avec high Singing stats**
2. **Combinez lead vocalist + supporting dancers**
3. **Pop et EDM ont tendance à scorer plus haut**

### Meilleures Artists
- Lestari, Brooklyn, Alice, Bella (general)
- Artists par genre: vérifier les stats
    `
  },
  {
    id: "event-ultimate-ceo",
    title: "Guide Ultimate CEO",
    description: "Guide complet de l'Ultimate CEO",
    icon: "💼",
    color: "#ef4444",
    category: "Événements",
    readTime: "8 min",
    content: `
## Guide Ultimate CEO - TopGirl

### Présentation
L'**Ultimate CEO** est un événement hebdomadaire de 5 jours où vous affrontez le CEO pour earn des rewards exclusifs.

### Phases

**Phase 1 (Day 1)**
- Accumulez des CEO Points
- Rewards: Cartes communes

**Phase 2 (Day 2)**
- Défiez le CEO
- Rewards: Cartes SSR

**Phase 3 (Day 3-5)**
- Échangez vos rewards
- Rewards: UR Tokens, CEO Cards

### Stratégie
1. **Focus sur teams avec high DPS**
2. **Equilibrez attack et defense artists**
3. **Utilisez des artists avec Fan Capacity bonuses**

### Meilleures Artists
- Kokoro, Aurora, Claire, Alice
    `
  },
  {
    id: "event-echo-death-match",
    title: "Guide Echo Death Match",
    description: "Guide du Echo Death Match",
    icon: "👻",
    color: "#8b5cf6",
    category: "Événements",
    readTime: "8 min",
    content: `
## Guide Echo Death Match - TopGirl

### Présentation
Le **Echo Death Match** est un événement où vous affrontez des échos. Accumulez des Echo Stones à travers des battles solo et team.

### Phases

**Phase 1 (Jour 1-2)**
- Solo battles
- Objectif: Accumuler Echo Stones
- Reward: Echo Stones x500

**Phase 2 (Jour 3-5)**
- Team battles
- Objectif: Bonus Echo Stones
- Reward: Echo Stones x1000, SSR Shards

**Phase 3 (Jour 6-7)**
- Échange des rewards
- Rewards: UR Token, SSR+ Cards

### Stratégie
1. **Phase 1:** Focus sur solo battles pour stocker
2. **Phase 2:** Team battles pour bonus
3. **Gardez des Echo Stones** pour les meilleurs échanges
    `
  },
  {
    id: "event-chamber-territory",
    title: "Guide Chamber Territory",
    description: "Guide du Chamber Territory",
    icon: "🏰",
    color: "#14b8a6",
    category: "Événements",
    readTime: "8 min",
    content: `
## Guide Chamber Territory - TopGirl

### Présentation
Le **Chamber Territory** est un événement de territoire. Capturez et défendez différentes chambres pour earn des rewards.

### Phases

**Phase 1 (Jour 1-3)**
- Capturez des territoires
- Reward: Territory Tokens x300

**Phase 2 (Jour 4-7)**
- Défendez et collectez
- Reward: SSR Cards, Tokens x500

**Phase 3 (Jour 8-10)**
- Échangez vos rewards
- Rewards: UR Token, SSR+ Cards

### Stratégie
1. **Capturez tôt** les territoires à haute valeur
2. **Défendez vos territoires** pour des bonus
3. **Coopérez avec d'autres joueurs**
    `
  },
  {
    id: "event-cleanup-party",
    title: "Guide Cleanup Party",
    description: "Guide du Cleanup Party",
    icon: "🧹",
    color: "#22c55e",
    category: "Événements",
    readTime: "5 min",
    content: `
## Guide Cleanup Party - TopGirl

### Présentation
Le **Cleanup Party** est un événement où vous nettoyez la ville en collectant des poubelles.

### Phases

**Phase 1 (Jour 1-2)**
- Collectez les poubelles
- Reward: Trash x200

**Phase 2 (Jour 3-5)**
- Missions de nettoyage
- Reward: Trash x400, SSR Shards

**Phase 3 (Jour 6-7)**
- Échangez les rewards
- Rewards: UR Token, SSR+ Cards

### Stratégie
1. **Complétez les missions** de nettoyage pour bonus
2. **Team up** pour une collecte plus rapide
3. **Échangez** vos trash pour les meilleures rewards
    `
  },
  {
    id: "event-metro-subway",
    title: "Guide Metro & Subway",
    description: "Guide du Metro & Subway",
    icon: "🚇",
    color: "#3b82f6",
    category: "Événements",
    readTime: "5 min",
    content: `
## Guide Metro & Subway - TopGirl

### Présentation
Le **Metro & Subway** est un événement où vous prenez le métro pour collecter des tickets et earn des rewards.

### Phases

**Phase 1 (Jour 1-2)**
- Collectez les tickets
- Reward: Tickets x150

**Phase 2 (Jour 3-5)**
- Complétez les lignes
- Reward: Tickets x300, SSR Shards

**Phase 3 (Jour 6-7)**
- Échangez les rewards
- Rewards: UR Token, SSR+ Cards

### Stratégie
1. **Complétez les lignes de métro** pour bonus tickets
2. **Différentes lignes** ont différentes rewards
3. **Échangez** vos tickets pour les meilleures rewards
    `
  },
];

export default function GuideDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const lang = params?.lang as string || "fr";
  const t = guideTranslations[lang] || guideTranslations.en;
  
  const guide = guides.find(g => g.id === slug);

  if (!guide) {
    return (
      <div className="container" style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", marginBottom: "20px" }}>{t.notFound}</h1>
        <Link href={`/${lang}/guides/`} style={{ color: "#8b5cf6" }}>
          {t.backToGuides}
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link href={`/${lang}/guides/`} style={{ color: "rgba(255,255,255,0.6)", marginBottom: "20px", display: "inline-block" }}>
        {t.backToGuides}
      </Link>

      <div style={{ 
        background: "rgba(30,30,50,0.9)", 
        borderRadius: "16px", 
        padding: "32px", 
        marginTop: "20px",
        border: `1px solid ${guide.color}33`
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span style={{ fontSize: "2rem" }}>{guide.icon}</span>
          <span style={{ 
            padding: "4px 12px", 
            borderRadius: "20px", 
            background: `${guide.color}22`, 
            color: guide.color,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase"
          }}>
            {guide.category}
          </span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
            ⏱️ {guide.readTime}
          </span>
        </div>

        <h1 style={{ 
          fontSize: "2rem", 
          fontWeight: 800, 
          marginBottom: "16px",
          background: `linear-gradient(135deg, ${guide.color}, #fff)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          {guide.title}
        </h1>

        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", marginBottom: "24px" }}>
          {guide.description}
        </p>

        {guide.content && (
          <div style={{ 
            color: "rgba(255,255,255,0.8)", 
            lineHeight: 1.8,
            whiteSpace: "pre-line"
          }}>
            {guide.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} style={{ color: "#fff", fontSize: "1.4rem", marginTop: "24px", marginBottom: "12px" }}>{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} style={{ color: guide.color, fontSize: "1.1rem", marginTop: "20px", marginBottom: "8px" }}>{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('| ')) {
                return <div key={i} style={{ fontFamily: "monospace", fontSize: "0.85rem", margin: "8px 0" }}>{line}</div>;
              }
              if (line.startsWith('- ')) {
                return <div key={i} style={{ marginLeft: "16px", marginBottom: "4px" }}>• {line.replace('- ', '')}</div>;
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <div key={i} style={{ fontWeight: "bold", marginTop: "12px", color: "#fff" }}>{line.replace(/\*\*/g, '')}</div>;
              }
              return line.trim() ? <div key={i} style={{ marginBottom: "8px" }}>{line}</div> : <div key={i} style={{ height: "12px" }} />;
            })}
          </div>
        )}
      </div>

      <AdBanner />

      <div style={{ marginTop: "32px" }}>
        <h3 style={{ color: "#fff", marginBottom: "16px" }}>{t.otherGuides}</h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {guides.filter(g => g.id !== guide.id).slice(0, 4).map(g => (
            <Link 
              key={g.id}
              href={`/${lang}/guides/${g.id}/`}
              style={{
                padding: "16px 24px",
                background: "rgba(30,30,50,0.9)",
                borderRadius: "12px",
                color: "#fff",
                textDecoration: "none",
                border: `1px solid ${g.color}33`,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span>{g.icon}</span>
              <span style={{ fontSize: "0.9rem" }}>{g.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
