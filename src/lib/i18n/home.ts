export type TldrCard = {
  title: string;
  desc: string;
  linkText: string;
  href: string;
};

export type EditorialCard = {
  title: string;
  text: string;
  link: string;
  href: string;
};

export type SectionCard = {
  emoji: string;
  title: string;
  desc: string;
  detail: string;
  href: string;
  color: string;
};

export type HomeContent = {
  homeTitle: string;
  lastUpdated: string;
  subtitle: string;
  discoverArtists: string;
  seeTools: string;
  tierListVotes: string;
  statArtists: string;
  statGuides: string;
  statTools: string;
  newLabel: string;
  lastUpdatedLabel: string;
  updatedFrequency: string;
  whatWeOffer: string;
  sections: SectionCard[];
  quickAccessTitle: string;
  tldrCards: TldrCard[];
  editorialTitle: string;
  editorialCards: EditorialCard[];
  explainerTitle: string;
  explainerParagraphs: string[];
  explainerLinks: { text: string; href: string }[];
  promoCodes: string;
  promoSubtitle: string;
  copy: string;
  copied: string;
  seeAllCodes: string;
  expiresOn: string;
};

const homeContent: Record<string, HomeContent> = {
  fr: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Dernière mise à jour",
    subtitle: "Le guide complet pour <strong>TopGirl / ApexGirl</strong> — artistes, tier lists, outils et codes promo",
    discoverArtists: "Voir les Artistes",
    seeTools: "Outils",
    tierListVotes: "Tier List",
    statArtists: "artistes",
    statGuides: "guides",
    statTools: "outils",
    newLabel: "Nouveau",
    lastUpdatedLabel: "Dernière mise à jour",
    updatedFrequency: "Mise à jour hebdomadaire",
    whatWeOffer: "Tout ce dont vous avez besoin",
    sections: [
      { emoji: "🎤", title: "Artistes", desc: "112+ fiches complètes", detail: "Stats, skills, tier et conseils pour chaque artiste du jeu", href: "teambuilder", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Classement communautaire", detail: "Votez et découvrez les artistes les plus puissants cette semaine", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Outils", desc: "Team builder & calculateurs", detail: "Construisez votre équipe idéale et simulez vos compositions", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Guides", desc: "Stratégies & tutoriels", detail: "De débutant à expert : tout ce qu'il faut savoir pour progresser", href: "guides", color: "#4ade80" },
    ],
    quickAccessTitle: "Accès rapide",
    tldrCards: [
      { title: "🏆 Community Tier List", desc: "Votez pour vos artistes préférés. Classements mis à jour chaque semaine.", linkText: "Voir la Tier List →", href: "/tierlist/" },
      { title: "🎤 Base de données artistes", desc: "Parcourez 117+ artistes avec statistiques, compétences et recommandations.", linkText: "Voir les Artistes →", href: "/teambuilder/" },
      { title: "💰 Codes Promo", desc: "Tous les codes sont expirés mais conservés pour référence.", linkText: "Voir les Codes →", href: "/codes/" },
      { title: "📖 Guides de jeu", desc: "Des conseils débutants aux stratégies avancées. Guides complets par des joueurs expérimentés.", linkText: "Voir les Guides →", href: "/guides/" },
    ],
    editorialTitle: "Comment nous maintenons le contenu",
    editorialCards: [
      { title: "Méthodologie claire", text: "Nos tiers et recommandations sont basés sur tests en jeu, synergies d'équipe, coût de progression et feedback communautaire.", link: "Voir la méthodologie →", href: "/methodology/" },
      { title: "Mises à jour tracées", text: "Nous corrigeons les pages majeures après changements de meta et signalements des joueurs.", link: "Signaler une correction →", href: "/corrections/" },
      { title: "Indépendance éditoriale", text: "La monétisation ne modifie pas les classements ni les conseils.", link: "Voir la transparence pub →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "Qu'est-ce que TopGirl / ApexGirl ?",
    explainerParagraphs: [
      "TopGirl (aussi appelé ApexGirl ou Idol Company) est un jeu de guerre stratégique multijoueur sur mobile. Contrairement à ce que son apparence et son nom suggèrent, il ne s'agit pas d'un simple jeu de rythme ou de gestion d'idoles — c'est un vrai war game basé sur la coopération en groupe, la conquête de territoires et la gestion de ressources.",
      "Le jeu fonctionne sur un système de serveurs. Chaque serveur est une communauté de joueurs qui doivent collaborer pour progresser, conquérir des zones sur la carte, et affronter d'autres serveurs lors des cycles Abroad (Tokyo, Bali, Rome Antique). La coordination de groupe est essentielle : un serveur désorganisé est rapidement pénalisé.",
      "Comme beaucoup de jeux de guerre mobiles, TopGirl repose sur un modèle freemium avec microtransactions. Les artistes (SSR et UR) sont les personnages que vous collectionnez et améliorez. Les artistes SSR sont la base de votre progression, tandis que les UR sont des versions spéciales liées à vos SSR. Les ressources (or, diamants, lingots) servent à améliorer vos bâtiments, vos artistes et votre équipement.",
      "Pour bien débuter, concentrez-vous sur vos bâtiments de ville, recrutez une équipe équilibrée, et rejoignez un groupe actif. La progression passe par la coopération : personne ne réussit seul dans TopGirl.",
    ],
    explainerLinks: [
      { text: "Lire le guide de structure du jeu →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Guide équipe débutant →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
    ],
    promoCodes: "Codes Promo Actifs",
    promoSubtitle: "Entrez-les dans le jeu : Profil → Réglages → Code cadeau",
    copy: "Copier",
    copied: "Copié !",
    seeAllCodes: "Voir tous les codes →",
    expiresOn: "Expire le",
  },

  en: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Last updated",
    subtitle: "The complete guide for <strong>TopGirl / ApexGirl</strong> — artists, tier lists, tools and promo codes",
    discoverArtists: "Browse Artists",
    seeTools: "Tools",
    tierListVotes: "Tier List",
    statArtists: "artists",
    statGuides: "guides",
    statTools: "tools",
    newLabel: "New",
    lastUpdatedLabel: "Last updated",
    updatedFrequency: "Updated weekly",
    whatWeOffer: "Everything you need",
    sections: [
      { emoji: "🎤", title: "Artists", desc: "112+ full profiles", detail: "Stats, skills, tier and tips for every artist in the game", href: "teambuilder", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Community ranking", detail: "Vote and discover the most powerful artists this week", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Tools", desc: "Team builder & calculators", detail: "Build your ideal team and simulate your compositions", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Guides", desc: "Strategies & tutorials", detail: "From beginner to expert: everything you need to know to improve", href: "guides", color: "#4ade80" },
    ],
    quickAccessTitle: "Quick Access",
    tldrCards: [
      { title: "🏆 Community Tier List", desc: "Vote for your favorite artists. Rankings updated weekly based on player feedback.", linkText: "View Tier List →", href: "/tierlist/" },
      { title: "🎤 Artist Database", desc: "Browse 117+ artists with stats, skills, and team recommendations. Find the perfect team.", linkText: "Browse Artists →", href: "/teambuilder/" },
      { title: "💰 Promo Codes", desc: "All codes are expired but kept for reference. Enter in game: Profile → Settings → Gift Code", linkText: "View Codes →", href: "/codes/" },
      { title: "📖 Game Guides", desc: "From beginner tips to advanced strategies. Comprehensive guides written by experienced players.", linkText: "View Guides →", href: "/guides/" },
    ],
    editorialTitle: "How we maintain content quality",
    editorialCards: [
      { title: "Clear methodology", text: "Our tiers and recommendations are based on in-game testing, team synergy, progression cost, and community feedback.", link: "Read methodology →", href: "/methodology/" },
      { title: "Tracked updates", text: "We revise major pages after meta changes and player reports.", link: "Report a correction →", href: "/corrections/" },
      { title: "Editorial independence", text: "Monetization does not change rankings or gameplay recommendations.", link: "Read ad disclosure →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "What is TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (also known as ApexGirl or Idol Company) is a multiplayer strategic war game for mobile. Despite its appearance and name, it is not a simple rhythm or idol management game — it is a real war game based on group cooperation, territory conquest, and resource management.",
      "The game operates on a server system. Each server is a community of players who must collaborate to progress, conquer zones on the map, and face other servers during Abroad cycles (Tokyo, Bali, Ancient Rome). Group coordination is essential: a disorganized server is quickly penalized.",
      "Like many mobile war games, TopGirl relies on a freemium model with microtransactions. Artists (SSR and UR) are the characters you collect and upgrade. SSR artists are the foundation of your progression, while URs are special versions linked to your SSRs. Resources (gold, diamonds, ingots) are used to upgrade your buildings, artists, and equipment.",
      "To start well, focus on your city buildings, recruit a balanced team, and join an active group. Progression comes through cooperation — no one succeeds alone in TopGirl.",
    ],
    explainerLinks: [
      { text: "Read the game structure guide →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Beginner team building guide →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
    ],
    promoCodes: "Active Promo Codes",
    promoSubtitle: "Enter in game: Profile → Settings → Gift Code",
    copy: "Copy",
    copied: "Copied!",
    seeAllCodes: "See all codes →",
    expiresOn: "Expires",
  },

  it: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Ultimo aggiornamento",
    subtitle: "La guida completa per <strong>TopGirl / ApexGirl</strong> — artisti, tier list, strumenti e codici promo",
    discoverArtists: "Scopri Artisti",
    seeTools: "Strumenti",
    tierListVotes: "Tier List",
    statArtists: "artisti",
    statGuides: "guide",
    statTools: "strumenti",
    newLabel: "Nuovo",
    lastUpdatedLabel: "Ultimo aggiornamento",
    updatedFrequency: "Aggiornato settimanalmente",
    whatWeOffer: "Tutto quello che ti serve",
    sections: [
      { emoji: "🎤", title: "Artisti", desc: "112+ schede complete", detail: "Stats, skill, tier e consigli per ogni artista", href: "teambuilder", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Classifica community", detail: "Vota e scopri gli artisti più potenti della settimana", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Strumenti", desc: "Team builder & calcolatori", detail: "Costruisci il tuo team ideale e simula composizioni", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Guide", desc: "Strategie & tutorial", detail: "Da principiante a esperto: tutto per migliorare", href: "guides", color: "#4ade80" },
    ],
    quickAccessTitle: "Accesso rapido",
    tldrCards: [
      { title: "🏆 Community Tier List", desc: "Vote for your favorite artists. Rankings updated weekly based on player feedback.", linkText: "View Tier List →", href: "/tierlist/" },
      { title: "🎤 Artist Database", desc: "Browse 117+ artists with stats, skills, and team recommendations. Find the perfect team.", linkText: "Browse Artists →", href: "/teambuilder/" },
      { title: "💰 Promo Codes", desc: "All codes are expired but kept for reference. Enter in game: Profile → Settings → Gift Code", linkText: "View Codes →", href: "/codes/" },
      { title: "📖 Game Guides", desc: "From beginner tips to advanced strategies. Comprehensive guides written by experienced players.", linkText: "View Guides →", href: "/guides/" },
    ],
    editorialTitle: "How we maintain content quality",
    editorialCards: [
      { title: "Clear methodology", text: "Our tiers and recommendations are based on in-game testing, team synergy, progression cost, and community feedback.", link: "Read methodology →", href: "/methodology/" },
      { title: "Tracked updates", text: "We revise major pages after meta changes and player reports.", link: "Report a correction →", href: "/corrections/" },
      { title: "Editorial independence", text: "Monetization does not change rankings or gameplay recommendations.", link: "Read ad disclosure →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "What is TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (also known as ApexGirl or Idol Company) is a multiplayer strategic war game for mobile. Despite its appearance and name, it is not a simple rhythm or idol management game — it is a real war game based on group cooperation, territory conquest, and resource management.",
      "The game operates on a server system. Each server is a community of players who must collaborate to progress, conquer zones on the map, and face other servers during Abroad cycles (Tokyo, Bali, Ancient Rome). Group coordination is essential: a disorganized server is quickly penalized.",
      "Like many mobile war games, TopGirl relies on a freemium model with microtransactions. Artists (SSR and UR) are the characters you collect and upgrade. SSR artists are the foundation of your progression, while URs are special versions linked to your SSRs. Resources (gold, diamonds, ingots) are used to upgrade your buildings, artists, and equipment.",
      "To start well, focus on your city buildings, recruit a balanced team, and join an active group. Progression comes through cooperation — no one succeeds alone in TopGirl.",
    ],
    explainerLinks: [
      { text: "Read the game structure guide →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Beginner team building guide →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
    ],
    promoCodes: "Codici Promo Attivi",
    promoSubtitle: "Inserisci nel gioco: Profilo → Impostazioni → Codice Regalo",
    copy: "Copia",
    copied: "Copiato!",
    seeAllCodes: "Vedi tutti i codici →",
    expiresOn: "Scade il",
  },

  es: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Última actualización",
    subtitle: "La guía completa para <strong>TopGirl / ApexGirl</strong> — artistas, tier lists, herramientas y códigos promo",
    discoverArtists: "Ver Artistas",
    seeTools: "Herramientas",
    tierListVotes: "Tier List",
    statArtists: "artistas",
    statGuides: "guías",
    statTools: "herramientas",
    newLabel: "Nuevo",
    lastUpdatedLabel: "Última actualización",
    updatedFrequency: "Actualizado semanalmente",
    whatWeOffer: "Todo lo que necesitas",
    sections: [
      { emoji: "🎤", title: "Artistas", desc: "112+ fichas completas", detail: "Stats, habilidades, tier y consejos para cada artista", href: "teambuilder", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Ranking comunidad", detail: "Vota y descubre los artistas más poderosos esta semana", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Herramientas", desc: "Team builder & calculadoras", detail: "Construye tu equipo ideal y simula composiciones", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Guías", desc: "Estrategias & tutoriales", detail: "De principiante a experto: todo para mejorar", href: "guides", color: "#4ade80" },
    ],
    quickAccessTitle: "Acceso rápido",
    tldrCards: [
      { title: "🏆 Community Tier List", desc: "Vote for your favorite artists. Rankings updated weekly based on player feedback.", linkText: "View Tier List →", href: "/tierlist/" },
      { title: "🎤 Artist Database", desc: "Browse 117+ artists with stats, skills, and team recommendations. Find the perfect team.", linkText: "Browse Artists →", href: "/teambuilder/" },
      { title: "💰 Promo Codes", desc: "All codes are expired but kept for reference. Enter in game: Profile → Settings → Gift Code", linkText: "View Codes →", href: "/codes/" },
      { title: "📖 Game Guides", desc: "From beginner tips to advanced strategies. Comprehensive guides written by experienced players.", linkText: "View Guides →", href: "/guides/" },
    ],
    editorialTitle: "How we maintain content quality",
    editorialCards: [
      { title: "Clear methodology", text: "Our tiers and recommendations are based on in-game testing, team synergy, progression cost, and community feedback.", link: "Read methodology →", href: "/methodology/" },
      { title: "Tracked updates", text: "We revise major pages after meta changes and player reports.", link: "Report a correction →", href: "/corrections/" },
      { title: "Editorial independence", text: "Monetization does not change rankings or gameplay recommendations.", link: "Read ad disclosure →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "What is TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (also known as ApexGirl or Idol Company) is a multiplayer strategic war game for mobile. Despite its appearance and name, it is not a simple rhythm or idol management game — it is a real war game based on group cooperation, territory conquest, and resource management.",
      "The game operates on a server system. Each server is a community of players who must collaborate to progress, conquer zones on the map, and face other servers during Abroad cycles (Tokyo, Bali, Ancient Rome). Group coordination is essential: a disorganized server is quickly penalized.",
      "Like many mobile war games, TopGirl relies on a freemium model with microtransactions. Artists (SSR and UR) are the characters you collect and upgrade. SSR artists are the foundation of your progression, while URs are special versions linked to your SSRs. Resources (gold, diamonds, ingots) are used to upgrade your buildings, artists, and equipment.",
      "To start well, focus on your city buildings, recruit a balanced team, and join an active group. Progression comes through cooperation — no one succeeds alone in TopGirl.",
    ],
    explainerLinks: [
      { text: "Read the game structure guide →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Beginner team building guide →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
    ],
    promoCodes: "Códigos Promo Activos",
    promoSubtitle: "Ingrésalos en el juego: Perfil → Ajustes → Código de regalo",
    copy: "Copiar",
    copied: "¡Copiado!",
    seeAllCodes: "Ver todos los códigos →",
    expiresOn: "Expira el",
  },

  pt: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Última atualização",
    subtitle: "O guia completo para <strong>TopGirl / ApexGirl</strong> — artistas, tier lists, ferramentas e códigos promo",
    discoverArtists: "Ver Artistas",
    seeTools: "Ferramentas",
    tierListVotes: "Tier List",
    statArtists: "artistas",
    statGuides: "guias",
    statTools: "ferramentas",
    newLabel: "Novo",
    lastUpdatedLabel: "Última atualização",
    updatedFrequency: "Atualizado semanalmente",
    whatWeOffer: "Tudo que você precisa",
    sections: [
      { emoji: "🎤", title: "Artistas", desc: "112+ perfis completos", detail: "Stats, skills, tier e dicas para cada artista", href: "teambuilder", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Ranking da comunidade", detail: "Vote e descubra os artistas mais poderosos desta semana", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Ferramentas", desc: "Team builder & calculadoras", detail: "Monte seu time ideal e simule composições", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Guias", desc: "Estratégias & tutoriais", detail: "Do iniciante ao expert: tudo para evoluir", href: "guides", color: "#4ade80" },
    ],
    quickAccessTitle: "Acesso rápido",
    tldrCards: [
      { title: "🏆 Community Tier List", desc: "Vote for your favorite artists. Rankings updated weekly based on player feedback.", linkText: "View Tier List →", href: "/tierlist/" },
      { title: "🎤 Artist Database", desc: "Browse 117+ artists with stats, skills, and team recommendations. Find the perfect team.", linkText: "Browse Artists →", href: "/teambuilder/" },
      { title: "💰 Promo Codes", desc: "All codes are expired but kept for reference. Enter in game: Profile → Settings → Gift Code", linkText: "View Codes →", href: "/codes/" },
      { title: "📖 Game Guides", desc: "From beginner tips to advanced strategies. Comprehensive guides written by experienced players.", linkText: "View Guides →", href: "/guides/" },
    ],
    editorialTitle: "How we maintain content quality",
    editorialCards: [
      { title: "Clear methodology", text: "Our tiers and recommendations are based on in-game testing, team synergy, progression cost, and community feedback.", link: "Read methodology →", href: "/methodology/" },
      { title: "Tracked updates", text: "We revise major pages after meta changes and player reports.", link: "Report a correction →", href: "/corrections/" },
      { title: "Editorial independence", text: "Monetization does not change rankings or gameplay recommendations.", link: "Read ad disclosure →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "What is TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (also known as ApexGirl or Idol Company) is a multiplayer strategic war game for mobile. Despite its appearance and name, it is not a simple rhythm or idol management game — it is a real war game based on group cooperation, territory conquest, and resource management.",
      "The game operates on a server system. Each server is a community of players who must collaborate to progress, conquer zones on the map, and face other servers during Abroad cycles (Tokyo, Bali, Ancient Rome). Group coordination is essential: a disorganized server is quickly penalized.",
      "Like many mobile war games, TopGirl relies on a freemium model with microtransactions. Artists (SSR and UR) are the characters you collect and upgrade. SSR artists are the foundation of your progression, while URs are special versions linked to your SSRs. Resources (gold, diamonds, ingots) are used to upgrade your buildings, artists, and equipment.",
      "To start well, focus on your city buildings, recruit a balanced team, and join an active group. Progression comes through cooperation — no one succeeds alone in TopGirl.",
    ],
    explainerLinks: [
      { text: "Read the game structure guide →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Beginner team building guide →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
    ],
    promoCodes: "Códigos Promo Ativos",
    promoSubtitle: "Insira no jogo: Perfil → Configurações → Código de presente",
    copy: "Copiar",
    copied: "Copiado!",
    seeAllCodes: "Ver todos os códigos →",
    expiresOn: "Expira em",
  },

  pl: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Ostatnia aktualizacja",
    subtitle: "Kompletny przewodnik po <strong>TopGirl / ApexGirl</strong> — artyści, tier listy, narzędzia i kody promo",
    discoverArtists: "Przeglądaj Artystów",
    seeTools: "Narzędzia",
    tierListVotes: "Tier List",
    statArtists: "artystów",
    statGuides: "poradników",
    statTools: "narzędzi",
    newLabel: "Nowy",
    lastUpdatedLabel: "Ostatnia aktualizacja",
    updatedFrequency: "Aktualizowane co tydzień",
    whatWeOffer: "Wszystko czego potrzebujesz",
    sections: [
      { emoji: "🎤", title: "Artyści", desc: "112+ pełnych profili", detail: "Statystyki, umiejętności, tier i porady dla każdego artysty", href: "teambuilder", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Ranking społeczności", detail: "Głosuj i odkryj najpotężniejszych artystów tego tygodnia", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Narzędzia", desc: "Team builder i kalkulatory", detail: "Zbuduj idealny zespół i symuluj kompozycje", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Poradniki", desc: "Strategie i samouczki", detail: "Od początkującego do eksperta: wszystko by się rozwijać", href: "guides", color: "#4ade80" },
    ],
    quickAccessTitle: "Szybki dostęp",
    tldrCards: [
      { title: "🏆 Community Tier List", desc: "Vote for your favorite artists. Rankings updated weekly based on player feedback.", linkText: "View Tier List →", href: "/tierlist/" },
      { title: "🎤 Artist Database", desc: "Browse 117+ artists with stats, skills, and team recommendations. Find the perfect team.", linkText: "Browse Artists →", href: "/teambuilder/" },
      { title: "💰 Promo Codes", desc: "All codes are expired but kept for reference. Enter in game: Profile → Settings → Gift Code", linkText: "View Codes →", href: "/codes/" },
      { title: "📖 Game Guides", desc: "From beginner tips to advanced strategies. Comprehensive guides written by experienced players.", linkText: "View Guides →", href: "/guides/" },
    ],
    editorialTitle: "How we maintain content quality",
    editorialCards: [
      { title: "Clear methodology", text: "Our tiers and recommendations are based on in-game testing, team synergy, progression cost, and community feedback.", link: "Read methodology →", href: "/methodology/" },
      { title: "Tracked updates", text: "We revise major pages after meta changes and player reports.", link: "Report a correction →", href: "/corrections/" },
      { title: "Editorial independence", text: "Monetization does not change rankings or gameplay recommendations.", link: "Read ad disclosure →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "What is TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (also known as ApexGirl or Idol Company) is a multiplayer strategic war game for mobile. Despite its appearance and name, it is not a simple rhythm or idol management game — it is a real war game based on group cooperation, territory conquest, and resource management.",
      "The game operates on a server system. Each server is a community of players who must collaborate to progress, conquer zones on the map, and face other servers during Abroad cycles (Tokyo, Bali, Ancient Rome). Group coordination is essential: a disorganized server is quickly penalized.",
      "Like many mobile war games, TopGirl relies on a freemium model with microtransactions. Artists (SSR and UR) are the characters you collect and upgrade. SSR artists are the foundation of your progression, while URs are special versions linked to your SSRs. Resources (gold, diamonds, ingots) are used to upgrade your buildings, artists, and equipment.",
      "To start well, focus on your city buildings, recruit a balanced team, and join an active group. Progression comes through cooperation — no one succeeds alone in TopGirl.",
    ],
    explainerLinks: [
      { text: "Read the game structure guide →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Beginner team building guide →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
    ],
    promoCodes: "Aktywne Kody Promo",
    promoSubtitle: "Wpisz w grze: Profil → Ustawienia → Kod upominkowy",
    copy: "Kopiuj",
    copied: "Skopiowano!",
    seeAllCodes: "Zobacz wszystkie kody →",
    expiresOn: "Wygasa",
  },

  id: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Terakhir diperbarui",
    subtitle: "Panduan lengkap untuk <strong>TopGirl / ApexGirl</strong> — artis, tier list, alat dan kode promo",
    discoverArtists: "Lihat Artis",
    seeTools: "Alat",
    tierListVotes: "Tier List",
    statArtists: "artis",
    statGuides: "panduan",
    statTools: "alat",
    newLabel: "Baru",
    lastUpdatedLabel: "Terakhir diperbarui",
    updatedFrequency: "Diperbarui mingguan",
    whatWeOffer: "Semua yang kamu butuhkan",
    sections: [
      { emoji: "🎤", title: "Artis", desc: "112+ profil lengkap", detail: "Stats, skill, tier dan tips untuk setiap artis", href: "teambuilder", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier List", desc: "Ranking komunitas", detail: "Pilih dan temukan artis terkuat minggu ini", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Alat", desc: "Team builder & kalkulator", detail: "Bangun tim ideal dan simulasikan komposisi", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Panduan", desc: "Strategi & tutorial", detail: "Dari pemula hingga ahli: semua untuk berkembang", href: "guides", color: "#4ade80" },
    ],
    quickAccessTitle: "Akses cepat",
    tldrCards: [
      { title: "🏆 Community Tier List", desc: "Vote for your favorite artists. Rankings updated weekly based on player feedback.", linkText: "View Tier List →", href: "/tierlist/" },
      { title: "🎤 Artist Database", desc: "Browse 117+ artists with stats, skills, and team recommendations. Find the perfect team.", linkText: "Browse Artists →", href: "/teambuilder/" },
      { title: "💰 Promo Codes", desc: "All codes are expired but kept for reference. Enter in game: Profile → Settings → Gift Code", linkText: "View Codes →", href: "/codes/" },
      { title: "📖 Game Guides", desc: "From beginner tips to advanced strategies. Comprehensive guides written by experienced players.", linkText: "View Guides →", href: "/guides/" },
    ],
    editorialTitle: "How we maintain content quality",
    editorialCards: [
      { title: "Clear methodology", text: "Our tiers and recommendations are based on in-game testing, team synergy, progression cost, and community feedback.", link: "Read methodology →", href: "/methodology/" },
      { title: "Tracked updates", text: "We revise major pages after meta changes and player reports.", link: "Report a correction →", href: "/corrections/" },
      { title: "Editorial independence", text: "Monetization does not change rankings or gameplay recommendations.", link: "Read ad disclosure →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "What is TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (also known as ApexGirl or Idol Company) is a multiplayer strategic war game for mobile. Despite its appearance and name, it is not a simple rhythm or idol management game — it is a real war game based on group cooperation, territory conquest, and resource management.",
      "The game operates on a server system. Each server is a community of players who must collaborate to progress, conquer zones on the map, and face other servers during Abroad cycles (Tokyo, Bali, Ancient Rome). Group coordination is essential: a disorganized server is quickly penalized.",
      "Like many mobile war games, TopGirl relies on a freemium model with microtransactions. Artists (SSR and UR) are the characters you collect and upgrade. SSR artists are the foundation of your progression, while URs are special versions linked to your SSRs. Resources (gold, diamonds, ingots) are used to upgrade your buildings, artists, and equipment.",
      "To start well, focus on your city buildings, recruit a balanced team, and join an active group. Progression comes through cooperation — no one succeeds alone in TopGirl.",
    ],
    explainerLinks: [
      { text: "Read the game structure guide →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Beginner team building guide →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
    ],
    promoCodes: "Kode Promo Aktif",
    promoSubtitle: "Masukkan di game: Profil → Pengaturan → Kode Hadiah",
    copy: "Salin",
    copied: "Disalin!",
    seeAllCodes: "Lihat semua kode →",
    expiresOn: "Kedaluwarsa",
  },

  ru: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Последнее обновление",
    subtitle: "Полный гайд по <strong>TopGirl / ApexGirl</strong> — артисты, тир-листы, инструменты и промокоды",
    discoverArtists: "Артисты",
    seeTools: "Инструменты",
    tierListVotes: "Тир-лист",
    statArtists: "артистов",
    statGuides: "гайдов",
    statTools: "инструментов",
    newLabel: "Новый",
    lastUpdatedLabel: "Последнее обновление",
    updatedFrequency: "Обновляется еженедельно",
    whatWeOffer: "Всё что нужно",
    sections: [
      { emoji: "🎤", title: "Артисты", desc: "112+ полных профилей", detail: "Статы, умения, тир и советы для каждого артиста", href: "teambuilder", color: "#ff4d8d" },
      { emoji: "🏆", title: "Тир-лист", desc: "Рейтинг сообщества", detail: "Голосуйте и узнайте сильнейших артистов недели", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Инструменты", desc: "Team builder и калькуляторы", detail: "Стройте идеальную команду и симулируйте составы", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Гайды", desc: "Стратегии и туториалы", detail: "От новичка до эксперта: всё для прогресса", href: "guides", color: "#4ade80" },
    ],
    quickAccessTitle: "Быстрый доступ",
    tldrCards: [
      { title: "🏆 Community Tier List", desc: "Vote for your favorite artists. Rankings updated weekly based on player feedback.", linkText: "View Tier List →", href: "/tierlist/" },
      { title: "🎤 Artist Database", desc: "Browse 117+ artists with stats, skills, and team recommendations. Find the perfect team.", linkText: "Browse Artists →", href: "/teambuilder/" },
      { title: "💰 Promo Codes", desc: "All codes are expired but kept for reference. Enter in game: Profile → Settings → Gift Code", linkText: "View Codes →", href: "/codes/" },
      { title: "📖 Game Guides", desc: "From beginner tips to advanced strategies. Comprehensive guides written by experienced players.", linkText: "View Guides →", href: "/guides/" },
    ],
    editorialTitle: "How we maintain content quality",
    editorialCards: [
      { title: "Clear methodology", text: "Our tiers and recommendations are based on in-game testing, team synergy, progression cost, and community feedback.", link: "Read methodology →", href: "/methodology/" },
      { title: "Tracked updates", text: "We revise major pages after meta changes and player reports.", link: "Report a correction →", href: "/corrections/" },
      { title: "Editorial independence", text: "Monetization does not change rankings or gameplay recommendations.", link: "Read ad disclosure →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "What is TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (also known as ApexGirl or Idol Company) is a multiplayer strategic war game for mobile. Despite its appearance and name, it is not a simple rhythm or idol management game — it is a real war game based on group cooperation, territory conquest, and resource management.",
      "The game operates on a server system. Each server is a community of players who must collaborate to progress, conquer zones on the map, and face other servers during Abroad cycles (Tokyo, Bali, Ancient Rome). Group coordination is essential: a disorganized server is quickly penalized.",
      "Like many mobile war games, TopGirl relies on a freemium model with microtransactions. Artists (SSR and UR) are the characters you collect and upgrade. SSR artists are the foundation of your progression, while URs are special versions linked to your SSRs. Resources (gold, diamonds, ingots) are used to upgrade your buildings, artists, and equipment.",
      "To start well, focus on your city buildings, recruit a balanced team, and join an active group. Progression comes through cooperation — no one succeeds alone in TopGirl.",
    ],
    explainerLinks: [
      { text: "Read the game structure guide →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Beginner team building guide →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
    ],
    promoCodes: "Активные Промокоды",
    promoSubtitle: "Введите в игре: Профиль → Настройки → Подарочный код",
    copy: "Копировать",
    copied: "Скопировано!",
    seeAllCodes: "Все коды →",
    expiresOn: "Истекает",
  },

  de: {
    homeTitle: "TOPGIRL GUIDE",
    lastUpdated: "Zuletzt aktualisiert",
    subtitle: "Der vollständige Leitfaden für <strong>TopGirl / ApexGirl</strong> — Künstlerinnen, Tier-Listen, Werkzeuge und Promo-Codes",
    discoverArtists: "Künstlerinnen entdecken",
    seeTools: "Werkzeuge",
    tierListVotes: "Tier Liste",
    statArtists: "Künstlerinnen",
    statGuides: "Leitfäden",
    statTools: "Werkzeuge",
    newLabel: "Neu",
    lastUpdatedLabel: "Zuletzt aktualisiert",
    updatedFrequency: "Wöchentlich aktualisiert",
    whatWeOffer: "Alles was du brauchst",
    sections: [
      { emoji: "🎤", title: "Künstlerinnen", desc: "112+ vollständige Profile", detail: "Stats, Fähigkeiten, Tier und Tipps für jede Künstlerin im Spiel", href: "teambuilder", color: "#ff4d8d" },
      { emoji: "🏆", title: "Tier Liste", desc: "Community-Ranking", detail: "Abstimmen und entdecke die stärksten Künstlerinnen dieser Woche", href: "tierlist", color: "#ffd700" },
      { emoji: "🛠️", title: "Werkzeuge", desc: "Team-Builder & Rechner", detail: "Baue dein ideales Team und simuliere Zusammenstellungen", href: "tools", color: "#60a5fa" },
      { emoji: "📖", title: "Leitfäden", desc: "Strategien & Tutorials", detail: "Vom Anfänger zum Experten: alles was du zum Verbessern brauchst", href: "guides", color: "#4ade80" },
    ],
    quickAccessTitle: "Schnellzugriff",
    tldrCards: [
      { title: "🏆 Community Tier List", desc: "Vote for your favorite artists. Rankings updated weekly based on player feedback.", linkText: "View Tier List →", href: "/tierlist/" },
      { title: "🎤 Artist Database", desc: "Browse 117+ artists with stats, skills, and team recommendations. Find the perfect team.", linkText: "Browse Artists →", href: "/teambuilder/" },
      { title: "💰 Promo Codes", desc: "All codes are expired but kept for reference. Enter in game: Profile → Settings → Gift Code", linkText: "View Codes →", href: "/codes/" },
      { title: "📖 Game Guides", desc: "From beginner tips to advanced strategies. Comprehensive guides written by experienced players.", linkText: "View Guides →", href: "/guides/" },
    ],
    editorialTitle: "How we maintain content quality",
    editorialCards: [
      { title: "Clear methodology", text: "Our tiers and recommendations are based on in-game testing, team synergy, progression cost, and community feedback.", link: "Read methodology →", href: "/methodology/" },
      { title: "Tracked updates", text: "We revise major pages after meta changes and player reports.", link: "Report a correction →", href: "/corrections/" },
      { title: "Editorial independence", text: "Monetization does not change rankings or gameplay recommendations.", link: "Read ad disclosure →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "What is TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (also known as ApexGirl or Idol Company) is a multiplayer strategic war game for mobile. Despite its appearance and name, it is not a simple rhythm or idol management game — it is a real war game based on group cooperation, territory conquest, and resource management.",
      "The game operates on a server system. Each server is a community of players who must collaborate to progress, conquer zones on the map, and face other servers during Abroad cycles (Tokyo, Bali, Ancient Rome). Group coordination is essential: a disorganized server is quickly penalized.",
      "Like many mobile war games, TopGirl relies on a freemium model with microtransactions. Artists (SSR and UR) are the characters you collect and upgrade. SSR artists are the foundation of your progression, while URs are special versions linked to your SSRs. Resources (gold, diamonds, ingots) are used to upgrade your buildings, artists, and equipment.",
      "To start well, focus on your city buildings, recruit a balanced team, and join an active group. Progression comes through cooperation — no one succeeds alone in TopGirl.",
    ],
    explainerLinks: [
      { text: "Read the game structure guide →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Beginner team building guide →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
    ],
    promoCodes: "Aktive Promo-Codes",
    promoSubtitle: "Im Spiel eingeben: Profil → Einstellungen → Geschenkcode",
    copy: "Kopieren",
    copied: "Kopiert!",
    seeAllCodes: "Alle Codes anzeigen →",
    expiresOn: "Läuft ab",
  },
};

export const getHomeContent = (lang: string): HomeContent =>
  homeContent[lang] || homeContent.en;
