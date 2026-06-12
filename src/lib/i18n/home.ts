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
  seeGuides: string;
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
    seeGuides: "Guides",
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
    seeGuides: "Guides",
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
    seeGuides: "Guide",
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
      { title: "🏆 Tier List della Community", desc: "Vota le tue artist preferite. Classifiche aggiornate ogni settimana in base ai feedback dei giocatori.", linkText: "Vedi Tier List →", href: "/tierlist/" },
      { title: "🎤 Database Artist", desc: "Sfoglia 117+ artist con statistiche, abilità e consigli di team. Trova la squadra perfetta.", linkText: "Sfoglia Artist →", href: "/teambuilder/" },
      { title: "💰 Codici Promo", desc: "Tutti i codici sono scaduti ma conservati come riferimento. Inseriscili in gioco: Profilo → Impostazioni → Codice Regalo", linkText: "Vedi Codici →", href: "/codes/" },
      { title: "📖 Guide di Gioco", desc: "Dai consigli per principianti alle strategie avanzate. Guide complete scritte da giocatori esperti.", linkText: "Vedi Guide →", href: "/guides/" },
    ],
    editorialTitle: "Come manteniamo la qualità dei contenuti",
    editorialCards: [
      { title: "Metodologia chiara", text: "I nostri tier e consigli si basano su test in-game, sinergie di team, costi di progressione e feedback della community.", link: "Leggi la metodologia →", href: "/methodology/" },
      { title: "Aggiornamenti monitorati", text: "Rivediamo le pagine principali dopo ogni cambiamento del meta e le segnalazioni dei giocatori.", link: "Segnala una correzione →", href: "/corrections/" },
      { title: "Indipendenza editoriale", text: "La monetizzazione non influisce sulle classifiche né sui consigli di gameplay.", link: "Leggi la trasparenza pubblicitaria →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "Cos'è TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (noto anche come ApexGirl o Idol Company) è un gioco di guerra strategico multigiocatore per mobile. Nonostante nome e grafica, non è un semplice rhythm game o gestionale di idol — è un vero war game basato su cooperazione di gruppo, conquista territoriale e gestione delle risorse.",
      "Il gioco funziona a server. Ogni server è una comunità di giocatori che devono collaborare per avanzare, conquistare zone sulla mappa e affrontare altri server durante i cicli Abroad (Tokyo, Bali, Roma Antica). Il coordinamento di gruppo è essenziale: un server disorganizzato viene penalizzato rapidamente.",
      "Come molti war game mobile, TopGirl adotta un modello freemium con microtransazioni. Le Artist (SSR e UR) sono i personaggi da collezionare e potenziare. Le SSR sono la base della progressione, mentre le UR sono versioni speciali legate alle vostre SSR. Risorse (oro, diamanti, lingotti) servono per potenziare edifici, artist e equipaggiamento.",
      "Per iniziare bene, concentratevi sugli edifici cittadini, reclutate un team equilibrato e unitevi a un gruppo attivo. La progressione passa attraverso la cooperazione — nessuno ha successo da solo in TopGirl.",
    ],
    explainerLinks: [
      { text: "Leggi la guida alla struttura del gioco →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Guida al team building per principianti →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
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
    seeGuides: "Guías",
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
      { title: "🏆 Tier List de la Comunidad", desc: "Vota por tus artistas favoritas. Ranking actualizado semanalmente según el feedback de los jugadores.", linkText: "Ver Tier List →", href: "/tierlist/" },
      { title: "🎤 Base de Datos de Artistas", desc: "Explora 117+ artistas con estadísticas, habilidades y recomendaciones de equipo. Encuentra el equipo perfecto.", linkText: "Explorar Artistas →", href: "/teambuilder/" },
      { title: "💰 Códigos Promocionales", desc: "Todos los códigos están vencidos pero se mantienen como referencia. Ingresa en el juego: Perfil → Ajustes → Código de Regalo", linkText: "Ver Códigos →", href: "/codes/" },
      { title: "📖 Guías del Juego", desc: "Desde consejos para principiantes hasta estrategias avanzadas. Guías completas escritas por jugadores experimentados.", linkText: "Ver Guías →", href: "/guides/" },
    ],
    editorialTitle: "Cómo mantenemos la calidad del contenido",
    editorialCards: [
      { title: "Metodología clara", text: "Nuestros tiers y recomendaciones se basan en pruebas dentro del juego, sinergias de equipo, costos de progresión y comentarios de la comunidad.", link: "Lee la metodología →", href: "/methodology/" },
      { title: "Actualizaciones rastreadas", text: "Revisamos las páginas principales después de cambios en el meta y reportes de jugadores.", link: "Reportar una corrección →", href: "/corrections/" },
      { title: "Independencia editorial", text: "La monetización no altera las clasificaciones ni las recomendaciones de juego.", link: "Lee la divulgación publicitaria →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "¿Qué es TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (también conocido como ApexGirl o Idol Company) es un juego de guerra estratégico multijugador para móviles. A pesar de su apariencia y nombre, no es un simple juego de ritmo o gestión de ídolos — es un verdadero juego de guerra basado en cooperación grupal, conquista territorial y administración de recursos.",
      "El juego funciona con un sistema de servidores. Cada servidor es una comunidad de jugadores que deben colaborar para progresar, conquistar zonas del mapa y enfrentarse a otros servidores durante los ciclos Abroad (Tokio, Bali, Roma Antigua). La coordinación grupal es esencial: un servidor desorganizado es rápidamente penalizado.",
      "Como muchos juegos de guerra para móviles, TopGirl usa un modelo freemium con microtransacciones. Las Artist (SSR y UR) son los personajes que coleccionas y mejoras. Las SSR son la base de tu progresión, mientras que las UR son versiones especiales vinculadas a tus SSR. Los recursos (oro, diamantes, lingotes) se usan para mejorar edificios, artistas y equipo.",
      "Para empezar bien, concéntrate en los edificios de tu ciudad, recluta un equipo equilibrado y únete a un grupo activo. La progresión llega con la cooperación — nadie triunfa solo en TopGirl.",
    ],
    explainerLinks: [
      { text: "Lee la guía de estructura del juego →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Guía de composición de equipo para principiantes →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
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
    seeGuides: "Guias",
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
      { title: "🏆 Tier List da Comunidade", desc: "Vote nas suas artistas favoritas. Rankings atualizados semanalmente com base no feedback dos jogadores.", linkText: "Ver Tier List →", href: "/tierlist/" },
      { title: "🎤 Banco de Dados de Artistas", desc: "Navegue por 117+ artistas com estatísticas, habilidades e recomendações de equipe. Encontre o time perfeito.", linkText: "Explorar Artistas →", href: "/teambuilder/" },
      { title: "💰 Códigos Promocionais", desc: "Todos os códigos expiraram, mas foram mantidos como referência. Insira no jogo: Perfil → Configurações → Código Presente", linkText: "Ver Códigos →", href: "/codes/" },
      { title: "📖 Guias do Jogo", desc: "De dicas para iniciantes a estratégias avançadas. Guias completos escritos por jogadores experientes.", linkText: "Ver Guias →", href: "/guides/" },
    ],
    editorialTitle: "Como mantemos a qualidade do conteúdo",
    editorialCards: [
      { title: "Metodologia clara", text: "Nossos tiers e recomendações são baseados em testes no jogo, sinergia de equipe, custo de progressão e feedback da comunidade.", link: "Leia a metodologia →", href: "/methodology/" },
      { title: "Atualizações monitoradas", text: "Revisamos as páginas principais após mudanças no meta e relatos de jogadores.", link: "Relatar uma correção →", href: "/corrections/" },
      { title: "Independência editorial", text: "A monetização não altera classificações nem recomendações de jogabilidade.", link: "Leia a divulgação de anúncios →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "O que é TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (também conhecido como ApexGirl ou Idol Company) é um jogo de guerra estratégico multiplayer para celular. Apesar da aparência e do nome, não é um simples jogo de ritmo ou gerenciamento de ídolos — é um verdadeiro jogo de guerra baseado em cooperação em grupo, conquista territorial e gerenciamento de recursos.",
      "O jogo funciona em um sistema de servidores. Cada servidor é uma comunidade de jogadores que precisam colaborar para progredir, conquistar zonas no mapa e enfrentar outros servidores durante os ciclos Abroad (Tóquio, Bali, Roma Antiga). A coordenação em grupo é essencial: um servidor desorganizado é rapidamente punido.",
      "Como muitos jogos de guerra para celular, TopGirl adota um modelo freemium com microtransações. As Artist (SSR e UR) são os personagens que você coleta e evolui. SSR são a base da sua progressão, enquanto URs são versões especiais ligadas às suas SSR. Recursos (ouro, diamantes, lingotes) são usados para melhorar prédios, artistas e equipamentos.",
      "Para começar bem, foque nos prédios da sua cidade, recrute um time equilibrado e entre num grupo ativo. A progressão vem pela cooperação — ninguém vence sozinho em TopGirl.",
    ],
    explainerLinks: [
      { text: "Leia o guia de estrutura do jogo →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Guia de formação de equipe para iniciantes →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
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
    seeGuides: "Poradniki",
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
      { title: "🏆 Tier List Społeczności", desc: "Głosuj na swoje ulubione artystki. Rankingi aktualizowane co tydzień na podstawie opinii graczy.", linkText: "Zobacz Tier Listę →", href: "/tierlist/" },
      { title: "🎤 Baza Artystek", desc: "Przeglądaj 117+ artystek ze statystykami, umiejętnościami i rekomendacjami drużyn. Znajdź idealny skład.", linkText: "Przeglądaj Artystki →", href: "/teambuilder/" },
      { title: "💰 Kody Promocyjne", desc: "Wszystkie kody wygasły, ale zostały zachowane w celach informacyjnych. Wpisz w grze: Profil → Ustawienia → Kod Prezentowy", linkText: "Zobacz Kody →", href: "/codes/" },
      { title: "📖 Poradniki", desc: "Od wskazówek dla początkujących po zaawansowane strategie. Obszerne poradniki napisane przez doświadczonych graczy.", linkText: "Zobacz Poradniki →", href: "/guides/" },
    ],
    editorialTitle: "Jak dbamy o jakość treści",
    editorialCards: [
      { title: "Jasna metodologia", text: "Nasze tiery i rekomendacje opierają się na testach w grze, synergii drużynowej, kosztach progresji i feedbacku społeczności.", link: "Przeczytaj metodologię →", href: "/methodology/" },
      { title: "Śledzone aktualizacje", text: "Aktualizujemy główne strony po zmianach meta i zgłoszeniach graczy.", link: "Zgłoś poprawkę →", href: "/corrections/" },
      { title: "Niezależność redakcyjna", text: "Monetyzacja nie wpływa na rankingi ani rekomendacje dotyczące rozgrywki.", link: "Przeczytaj o reklamach →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "Czym jest TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (znane też jako ApexGirl lub Idol Company) to wieloosobowa strategiczna gra wojenna na mobile. Mimo wyglądu i nazwy, to nie jest prosty rhythm game ani symulator idoli — to prawdziwa gra wojenna oparta na współpracy grupowej, podboju terytoriów i zarządzaniu zasobami.",
      "Gra działa na systemie serwerów. Każdy serwer to społeczność graczy, którzy muszą współpracować, by robić postępy, zdobywać strefy na mapie i mierzyć się z innymi serwerami podczas cykli Abroad (Tokio, Bali, Starożytny Rzym). Koordynacja grupy jest kluczowa — niezorganizowany serwer szybko zostaje zepchnięty na margines.",
      "Jak wiele mobilnych gier wojennych, TopGirl korzysta z modelu freemium z mikropłatnościami. Artystki (SSR i UR) to postacie, które zbierasz i ulepszasz. SSR to podstawa progresji, a UR to specjalne wersje powiązane z twoimi SSR. Zasoby (złoto, diamenty, sztaby) służą do ulepszania budynków, artystek i ekwipunku.",
      "Na dobry start skup się na budynkach w mieście, zrekrutuj zbalansowaną drużynę i dołącz do aktywnej grupy. Progresja wymaga współpracy — nikt nie osiąga sukcesu sam w TopGirl.",
    ],
    explainerLinks: [
      { text: "Przeczytaj przewodnik po strukturze gry →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Poradnik składania drużyny dla początkujących →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
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
    seeGuides: "Panduan",
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
      { title: "🏆 Tier List Komunitas", desc: "Vote buat artist favorit lo. Ranking diupdate tiap minggu based on feedback player.", linkText: "Lihat Tier List →", href: "/tierlist/" },
      { title: "🎤 Database Artist", desc: "Jelajahi 117+ artist lengkap dengan stat, skill, dan rekomendasi tim. Cari tim impian lo.", linkText: "Jelajahi Artist →", href: "/teambuilder/" },
      { title: "💰 Kode Promo", desc: "Semua kode udah expired tapi disimpan buat referensi. Masukin di game: Profile → Settings → Gift Code", linkText: "Lihat Kode →", href: "/codes/" },
      { title: "📖 Panduan Game", desc: "Dari tips pemula sampe strategi advanced. Panduan lengkap ditulis oleh player berpengalaman.", linkText: "Lihat Panduan →", href: "/guides/" },
    ],
    editorialTitle: "Gimana cara kami jaga kualitas konten",
    editorialCards: [
      { title: "Metodologi jelas", text: "Tier dan rekomendasi kami based on in-game testing, sinergi tim, biaya progresi, dan feedback dari komunitas.", link: "Baca metodologi →", href: "/methodology/" },
      { title: "Update terpantau", text: "Kami revisi halaman utama setelah ada perubahan meta dan laporan dari player.", link: "Lapor koreksi →", href: "/corrections/" },
      { title: "Independensi editorial", text: "Monetisasi gak ngaruh ke ranking atau rekomendasi gameplay.", link: "Baca disclosure iklan →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "Apa itu TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (dikenal juga sebagai ApexGirl atau Idol Company) adalah game perang strategi multiplayer buat mobile. Meskipun tampilan dan namanya kayak game rhythm atau manajemen idol, ini sebenernya game perang beneran yang fokus di kerja sama grup, rebutan wilayah, dan manajemen resource.",
      "Game ini pake sistem server. Tiap server adalah komunitas player yang harus kerja bareng buat maju, rebut zona di map, dan lawan server lain pas siklus Abroad (Tokyo, Bali, Roma Kuno). Koordinasi grup itu wajib: server yang kacau balau bakal kena hukuman cepat.",
      "Kayak game perang mobile pada umumnya, TopGirl pake model freemium dengan mikrotransaksi. Artist (SSR dan UR) adalah karakter yang lo kumpulin dan upgrade. SSR adalah fondasi progresi lo, sedangkan UR adalah versi spesial yang nyambung ke SSR lo. Resource (gold, diamond, ingot) dipake buat upgrade gedung, artist, dan equipment.",
      "Buat awal yang oke, fokus ke gedung kota lo, rekrut tim yang seimbang, dan gabung ke grup yang aktif. Progresi datang lewat kerja sama — gak ada yang sukses sendirian di TopGirl.",
    ],
    explainerLinks: [
      { text: "Baca panduan struktur game →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Panduan bikin tim buat pemula →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
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
    seeGuides: "Гайды",
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
      { title: "🏆 Тир-лист сообщества", desc: "Голосуйте за любимых артистов. Рейтинги обновляются еженедельно на основе отзывов игроков.", linkText: "Смотреть тир-лист →", href: "/tierlist/" },
      { title: "🎤 База артистов", desc: "Просматривайте 117+ артистов со статистикой, навыками и рекомендациями по отрядам. Найдите идеальную команду.", linkText: "Смотреть артистов →", href: "/teambuilder/" },
      { title: "💰 Промокоды", desc: "Все коды истекли, но сохранены для справки. Вводите в игре: Профиль → Настройки → Подарочный код", linkText: "Смотреть коды →", href: "/codes/" },
      { title: "📖 Гайды по игре", desc: "От советов для новичков до продвинутых стратегий. Подробные гайды от опытных игроков.", linkText: "Смотреть гайды →", href: "/guides/" },
    ],
    editorialTitle: "Как мы поддерживаем качество контента",
    editorialCards: [
      { title: "Чёткая методология", text: "Наши тиры и рекомендации основаны на тестировании в игре, синергии отрядов, стоимости прокачки и отзывах сообщества.", link: "Читать методологию →", href: "/methodology/" },
      { title: "Отслеживание обновлений", text: "Мы пересматриваем ключевые страницы после изменений меты и репортов игроков.", link: "Сообщить об ошибке →", href: "/corrections/" },
      { title: "Редакционная независимость", text: "Монетизация не влияет на рейтинги и рекомендации по геймплею.", link: "Читать о рекламе →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "Что такое TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (также известна как ApexGirl или Idol Company) — многопользовательская стратегическая военная игра для мобильных устройств. Несмотря на внешний вид и название, это не простой ритм-игра или симулятор айдолов — это настоящая военная игра, основанная на командной работе, захвате территорий и управлении ресурсами.",
      "Игра работает по серверной системе. Каждый сервер — это сообщество игроков, которым нужно сотрудничать, чтобы развиваться, захватывать зоны на карте и сражаться с другими серверами во время циклов Abroad (Токио, Бали, Древний Рим). Координация группы критически важна: неорганизованный сервер быстро оказывается в проигрыше.",
      "Как и многие мобильные военные игры, TopGirl использует фримиум-модель с микротранзакциями. Артисты (SSR и UR) — это персонажи, которых вы собираете и улучшаете. SSR — основа вашего прогресса, а UR — особые версии, привязанные к вашим SSR. Ресурсы (золото, алмазы, слитки) тратятся на улучшение зданий, артистов и экипировки.",
      "Чтобы начать с хорошим стартом, сосредоточьтесь на городских постройках, соберите сбалансированную команду и вступите в активную группу. Прогресс достигается через кооперацию — в TopGirl никто не преуспевает в одиночку.",
    ],
    explainerLinks: [
      { text: "Читать гайд по структуре игры →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Гайд по сбору команды для новичков →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
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
    seeGuides: "Guides",
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
      { title: "🏆 Community-Tierlist", desc: "Stimme für deine Lieblings-Artists ab. Rankings werden wöchentlich basierend auf Spieler-Feedback aktualisiert.", linkText: "Tierlist ansehen →", href: "/tierlist/" },
      { title: "🎤 Artists-Datenbank", desc: "Durchstöbere 117+ Artists mit Werten, Fähigkeiten und Team-Empfehlungen. Finde das perfekte Team.", linkText: "Artists durchsuchen →", href: "/teambuilder/" },
      { title: "💰 Promo-Codes", desc: "Alle Codes sind abgelaufen, aber als Referenz hinterlegt. Eingabe im Spiel: Profil → Einstellungen → Geschenkcode", linkText: "Codes ansehen →", href: "/codes/" },
      { title: "📖 Spielanleitungen", desc: "Von Anfänger-Tipps bis zu fortgeschrittenen Strategien. Umfassende Guides von erfahrenen Spielern.", linkText: "Guides ansehen →", href: "/guides/" },
    ],
    editorialTitle: "Wie wir die Content-Qualität sichern",
    editorialCards: [
      { title: "Klare Methodik", text: "Unsere Tiers und Empfehlungen basieren auf In-Game-Tests, Team-Synergien, Progressionskosten und Community-Feedback.", link: "Methodik lesen →", href: "/methodology/" },
      { title: "Nachgeführte Updates", text: "Wir überarbeiten Hauptseiten nach Meta-Änderungen und Spielerberichten.", link: "Korrektur melden →", href: "/corrections/" },
      { title: "Redaktionelle Unabhängigkeit", text: "Monetarisierung beeinflusst weder Rankings noch Gameplay-Empfehlungen.", link: "Werbeoffenlegung lesen →", href: "/advertising-disclosure/" },
    ],
    explainerTitle: "Was ist TopGirl / ApexGirl?",
    explainerParagraphs: [
      "TopGirl (auch bekannt als ApexGirl oder Idol Company) ist ein Multiplayer-Strategie-Kriegsspiel für Mobilgeräte. Trotz des Namens und der Aufmachung ist es kein einfaches Rhythmus- oder Idol-Management-Spiel — es ist ein echtes Kriegsspiel, das auf Gruppenkooperation, Gebietseroberung und Ressourcenmanagement basiert.",
      "Das Spiel arbeitet mit einem Serversystem. Jeder Server ist eine Gemeinschaft von Spielern, die zusammenarbeiten müssen, um voranzukommen, Zonen auf der Karte zu erobern und sich während der Abroad-Zyklen (Tokio, Bali, Antikes Rom) mit anderen Servern zu messen. Gruppenkoordination ist entscheidend: Ein unorganisierter Server wird schnell bestraft.",
      "Wie viele Mobile-Kriegsspiele setzt TopGirl auf ein Freemium-Modell mit Mikrotransaktionen. Artists (SSR und UR) sind die Charaktere, die ihr sammelt und verbessert. SSR-Bilder sind die Grundlage eures Fortschritts, während URs spezielle Versionen sind, die an eure SSRs gebunden sind. Ressourcen (Gold, Diamanten, Barren) werden genutzt, um Gebäude, Artists und Ausrüstung zu verbessern.",
      "Für einen guten Start konzentriert euch auf eure Stadtgebäude, rekrutiert ein ausgewogenes Team und tretet einer aktiven Gruppe bei. Fortschritt kommt durch Zusammenarbeit — in TopGirl schafft es niemand allein.",
    ],
    explainerLinks: [
      { text: "Lies den Leitfaden zur Spielstruktur →", href: "/guides/comprendre-la-structure-du-jeu-top-girl/" },
      { text: "Einsteiger-Guide für Teamaufstellung →", href: "/guides/guide-construction-d-equipe-debut-de-jeu/" },
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
