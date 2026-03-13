export interface NavTranslations {
  home: string;
  database: string;
  events: string;
  guides: string;
  tools: string;
}

export interface HomeTranslations {
  title: string;
  subtitle: string;
  cta: string;
  stats: {
    artists: string;
    guides: string;
    events: string;
    tools: string;
  };
  redeemCodes: {
    title: string;
    subtitle: string;
    enterInGame: string;
    seeGuide: string;
  };
  sections: {
    database: { title: string; description: string };
    tools: { title: string; description: string };
    guides: { title: string; description: string };
    events: { title: string; description: string };
  };
}

export interface ToolsTranslations {
  title: string;
  subtitle: string;
  tabs: {
    calculator: string;
    team: string;
    database: string;
    ceo: string;
    svs: string;
  };
  svs: {
    title: string;
    subtitle: string;
    items: {
      urSelector: string;
      ssrSelector: string;
      srSelector: string;
      rSelector: string;
      tenPull: string;
      memoryBoost: string;
      evolution: string;
      goldPack: string;
    };
    total: string;
  };
  team: {
    title: string;
    subtitle: string;
    search: string;
    stats: {
      artists: string;
      damage: string;
      fanCap: string;
      defense: string;
    };
  };
  database: {
    title: string;
    subtitle: string;
    search: string;
    filters: {
      rank: string;
      role: string;
    };
    roles: {
      center: string;
      dancer: string;
      singer: string;
      visual: string;
    };
    noResults: string;
  };
}

export interface FooterTranslations {
  copyright: string;
  disclaimer: string;
}

export interface CommonTranslations {
  active: string;
  copy: string;
  loading: string;
  error: string;
}
