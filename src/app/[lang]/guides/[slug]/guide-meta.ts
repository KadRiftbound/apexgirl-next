// Lightweight guide metadata — used server-side for generateMetadata only.
// Full guide content lives in GuideDetailClient.tsx.

export type GuideMeta = {
  id: string;
  title: string;
  title_en?: string; title_it?: string; title_es?: string;
  title_pt?: string; title_pl?: string; title_id?: string; title_ru?: string;
  description: string;
  description_en?: string; description_it?: string; description_es?: string;
  description_pt?: string; description_pl?: string; description_id?: string; description_ru?: string;
  category: string;
  category_en?: string; category_it?: string; category_es?: string;
  category_pt?: string; category_pl?: string; category_id?: string; category_ru?: string;
  thumbnail?: string;
  readTime?: string;
  isDone?: boolean;
  isNew?: boolean;
};

export const guidesMeta: GuideMeta[] = [
  {
    id: "structure-du-jeu",
    title: "Structure du jeu", title_en: "Game Structure",
    description: "Comprendre la structure globale de TopGirl/ApexGirl : serveurs, cycles Abroad, événements récurrents.",
    description_en: "Understand the global structure of TopGirl/ApexGirl: servers, Abroad cycles, recurring events.",
    category: "Débutant", category_en: "Beginner",
    readTime: "12 min", isDone: true,
  },
  {
    id: "equipment",
    title: "Guide Équipement", title_en: "Equipment Guide", title_it: "Guida Equipaggiamento",
    title_es: "Guía de Equipamiento", title_pt: "Guia de Equipamento",
    title_pl: "Poradnik Wyposażenia", title_id: "Panduan Peralatan", title_ru: "Гайд по снаряжению",
    description: "Bijoux, Voitures et Propriétés pour optimiser vos statistiques. Comparaison Gold vs Purple et priorités d'achat.",
    description_en: "Jewelry, Cars and Properties to optimize your stats. Gold vs Purple comparison and purchase priorities.",
    category: "Débutant", category_en: "Beginner",
    readTime: "10 min", isDone: true,
  },
  {
    id: "construction-equipe-debut",
    title: "Construction d'équipe début de jeu", title_en: "Early Game Team Building",
    description: "Choisir ses artistes au début et éviter de gaspiller des ressources.",
    description_en: "Choosing your artists early and avoiding wasting resources.",
    category: "Avancé - Début de jeu", category_en: "Advanced - Early Game",
    readTime: "12 min", isDone: true,
  },
  {
    id: "construction-equipe-fin",
    title: "Construction d'équipe fin de jeu", title_en: "Late Game Team Building",
    description: "Construire une équipe optimisée en fin de jeu selon l'adversaire.",
    description_en: "Building an optimized late-game team based on the opponent.",
    category: "Avancé - Fin de jeu", category_en: "Advanced - Late Game",
    readTime: "12 min", isDone: true,
  },
  {
    id: "event-echo-death-match",
    title: "Guide Echo Death Match", title_en: "Echo Death Match Guide",
    description: "Guide du Echo Death Match : difficulté, stages, récompenses par palier.",
    description_en: "Echo Death Match guide: difficulty, stages, tier rewards.",
    category: "Événements", category_en: "Events",
    readTime: "8 min", isDone: true,
  },
  {
    id: "event-muse",
    title: "Guide Muse Event", title_en: "Muse Event Guide",
    description: "Guide du Muse Event : gameplay musical, Crystals, upgrades et stratégies.",
    description_en: "Muse Event guide: musical gameplay, Crystals, upgrades and strategies.",
    category: "Événements", category_en: "Events",
    readTime: "8 min", isDone: true,
  },
  {
    id: "event-vs-group",
    title: "Guide VS Group Event", title_en: "Group Battle Guide",
    title_it: "Guida Group Battle", title_es: "Guía Group Battle",
    title_pt: "Guia Group Battle", title_pl: "Przewodnik Group Battle",
    title_id: "Panduan Group Battle", title_ru: "Гайд Group Battle",
    description: "Group Battle est un événement de groupe de 6 jours. Rush Attack, Blueprints et stratégies.",
    description_en: "Group Battle is a 6-day group event. Rush Attack, Blueprints and strategies.",
    description_it: "Group Battle è un evento di gruppo da 6 giorni. Rush Attack, Blueprint e strategie.",
    description_es: "Group Battle es un evento de grupo de 6 días. Rush Attack, Blueprints y estrategias.",
    description_pt: "Group Battle é um evento de grupo de 6 dias. Rush Attack, Blueprints e estratégias.",
    description_pl: "Group Battle to 6-dniowe wydarzenie grupowe. Rush Attack, Blueprints i strategie.",
    description_id: "Group Battle adalah acara grup 6 hari. Rush Attack, Blueprint dan strategi.",
    description_ru: "Group Battle — групповое событие на 6 дней. Rush Attack, Blueprints и стратегии.",
    category: "Événements", category_en: "Events",
    category_it: "Eventi", category_es: "Eventos", category_pt: "Eventos",
    category_pl: "Wydarzenia", category_id: "Acara", category_ru: "События",
    readTime: "8 min", isDone: true,
  },
  {
    id: "event-fishing",
    title: "Guide Fishing Event", title_en: "Fishing Event Guide",
    title_it: "Guida Fishing Event", title_es: "Guía Fishing Event",
    title_pt: "Guia Fishing Event", title_pl: "Przewodnik Fishing Event",
    title_id: "Panduan Fishing Event", title_ru: "Гайд Fishing Event",
    description: "Fishing Event dure 7 jours. Attrapez des poissons, gérez votre Aquarium et échangez des Vouchers.",
    description_en: "Fishing Event lasts 7 days. Catch fish, manage your Aquarium and exchange Vouchers for rewards.",
    category: "Événements", category_en: "Events",
    readTime: "6 min", isDone: true,
  },
  {
    id: "event-cleanup-party",
    title: "Guide Cleanup Party", title_en: "Cleanup Party Guide",
    description: "Guide de l'événement Cleanup Party. Associez des tuiles, complétez des stages et récupérez des récompenses.",
    description_en: "Cleanup Party event guide. Match tiles, complete stages and collect rewards.",
    category: "Guide événement", category_en: "Events",
    thumbnail: "/assets/images/guides/cleanup-party.jpg",
    readTime: "5 min", isDone: true, isNew: true,
  },
  {
    id: "event-metro-subway",
    title: "Guide Metro & Subway", title_en: "Metro & Subway Guide",
    title_it: "Guida Metro & Subway", title_es: "Guía Metro & Subway",
    title_pt: "Guia Metro & Subway", title_pl: "Przewodnik Metro & Subway",
    title_id: "Panduan Metro & Subway", title_ru: "Гайд Metro & Subway",
    description: "Guide de l'événement Adventure Abroad Metro. Débloquez des stations, gérez vos Fonds d'Investissement.",
    description_en: "Adventure Abroad Metro event guide. Unlock stations, manage your Investment Funds and maximize rewards.",
    category: "Guide événement", category_en: "Events",
    thumbnail: "/assets/images/guides/metro-subway.jpg",
    readTime: "8 min", isDone: true, isNew: true,
  },
  {
    id: "peak-level",
    title: "Guide Peak Level", title_en: "Peak Level Guide",
    description: "Système de Peak Level pour les artistes SSR. Milestones importants et stratégies F2P.",
    description_en: "Peak Level system for SSR artists. Key milestones and F2P strategies.",
    category: "Avancé", category_en: "Advanced",
    readTime: "15 min",
  },
  {
    id: "group-shop",
    title: "Guide Group Shop", title_en: "Group Shop Guide",
    description: "Que acheter dans le Group Shop ? Ordre de priorité des achats.",
    description_en: "What to buy in the Group Shop? Purchase priority order.",
    category: "Débutant", category_en: "Beginner",
    readTime: "5 min",
  },
  {
    id: "alliance-management",
    title: "Guide Gestion d'Alliance", title_en: "Alliance Management Guide",
    description: "Rôles, responsabilités et stratégies pour gérer une alliance dans TopGirl.",
    description_en: "Roles, responsibilities and strategies for managing an alliance in TopGirl.",
    category: "Avancé", category_en: "Advanced",
    readTime: "12 min",
  },
  {
    id: "ceo-coins",
    title: "Guide CEO Coins", title_en: "CEO Coins Purchase Guide",
    description: "Comment acheter des CEO Coins sur le site de paiement officiel.",
    description_en: "How to purchase CEO Coins on the official payment website.",
    category: "Avancé", category_en: "Advanced",
    readTime: "5 min",
  },
];

export function getGuideMeta(slug: string): GuideMeta | undefined {
  return guidesMeta.find(g => g.id === slug);
}

export function getGuideTitle(guide: GuideMeta, lang: string): string {
  return (guide as any)[`title_${lang}`] || guide.title;
}

export function getGuideDescription(guide: GuideMeta, lang: string): string {
  return (guide as any)[`description_${lang}`] || guide.description;
}

export function getGuideCategory(guide: GuideMeta, lang: string): string {
  return (guide as any)[`category_${lang}`] || guide.category;
}
