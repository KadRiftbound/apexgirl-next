export type UiStrings = {
  nav: {
    home: string;
    codes: string;
    teambuilder: string;
    tierList: string;
    guides: string;
    tools: string;
  };
  header: {
    logoTitle: string;
  };
  skip: string;
  footer: {
    title: string;
    subtitle: string;
    navigation: string;
    resources: string;
    legal: string;
    legalNotice: string;
    privacy: string;
    cookies: string;
    contact: string;
    copyright: string;
  };
  mobile: {
    menu: string;
    languageLabel: string;
  };
};

const uiStrings: Record<string, UiStrings> = {
  fr: {
    nav: { home: "Accueil", codes: "Codes", teambuilder: "Team Builder", tierList: "Tier List", guides: "Guides", tools: "Outils" },
    header: { logoTitle: "Top Girl Guide" },
    skip: "Aller au contenu principal",
    footer: {
      title: "Le fansite non-officiel de TopGirl/ApexGirl par A3Games.",
      subtitle: "Fansite dédié aux joueurs avec guides, outils et codes promo.",
      navigation: "Navigation",
      resources: "Ressources",
      legal: "Légal",
      legalNotice: "Mentions Légales",
      privacy: "Confidentialité",
      cookies: "Cookies",
      contact: "Contact",
      copyright: "© 2026 TopGirl Fansite. Tous droits réservés. Ce site est un fansite non officiel.",
    },
    mobile: { menu: "MENU", languageLabel: "Langue" },
  },
  en: {
    nav: { home: "Home", codes: "Codes", teambuilder: "Team Builder", tierList: "Tier List", guides: "Guides", tools: "Tools" },
    header: { logoTitle: "Top Girl Guide" },
    skip: "Skip to main content",
    footer: {
      title: "The unofficial fansite for TopGirl/ApexGirl by A3Games.",
      subtitle: "Fansite dedicated to players with guides, tools and promo codes.",
      navigation: "Navigation",
      resources: "Resources",
      legal: "Legal",
      legalNotice: "Legal Notice",
      privacy: "Privacy Policy",
      cookies: "Cookies",
      contact: "Contact",
      copyright: "© 2026 TopGirl Fansite. All rights reserved. This is an unofficial fansite.",
    },
    mobile: { menu: "MENU", languageLabel: "Language" },
  },
  it: {
    nav: { home: "Home", codes: "Codici", teambuilder: "Team Builder", tierList: "Tier List", guides: "Guide", tools: "Strumenti" },
    header: { logoTitle: "Top Girl Guide" },
    skip: "Vai al contenuto principale",
    footer: {
      title: "Il fansite non ufficiale di TopGirl/ApexGirl.",
      subtitle: "Fansite dedicato ai giocatori con guide, strumenti e codici promo.",
      navigation: "Navigazione",
      resources: "Risorse",
      legal: "Legale",
      legalNotice: "Note Legali",
      privacy: "Privacy",
      cookies: "Cookies",
      contact: "Contatto",
      copyright: "© 2026 TopGirl Fansite. Tutti i diritti riservati. Questo è un fansite non ufficiale.",
    },
    mobile: { menu: "MENU", languageLabel: "Lingua" },
  },
  es: {
    nav: { home: "Inicio", codes: "Códigos", teambuilder: "Team Builder", tierList: "Tier List", guides: "Guías", tools: "Herramientas" },
    header: { logoTitle: "Top Girl Guide" },
    skip: "Ir al contenido principal",
    footer: {
      title: "El fansite no oficial de TopGirl/ApexGirl.",
      subtitle: "Fansite dedicado a jugadores con guías, herramientas y códigos promo.",
      navigation: "Navegación",
      resources: "Recursos",
      legal: "Legal",
      legalNotice: "Aviso Legal",
      privacy: "Privacidad",
      cookies: "Cookies",
      contact: "Contacto",
      copyright: "© 2026 TopGirl Fansite. Todos los derechos reservados. Este es un fansite no oficial.",
    },
    mobile: { menu: "MENU", languageLabel: "Idioma" },
  },
  pt: {
    nav: { home: "Início", codes: "Códigos", teambuilder: "Team Builder", tierList: "Tier List", guides: "Guias", tools: "Ferramentas" },
    header: { logoTitle: "Top Girl Guide" },
    skip: "Ir para o conteúdo principal",
    footer: {
      title: "O fansite não oficial da TopGirl/ApexGirl.",
      subtitle: "Fansite dedicado a jogadores com guias, ferramentas e códigos promo.",
      navigation: "Navegação",
      resources: "Recursos",
      legal: "Legal",
      legalNotice: "Aviso Legal",
      privacy: "Privacidade",
      cookies: "Cookies",
      contact: "Contato",
      copyright: "© 2026 TopGirl Fansite. Todos os direitos reservados. Este é um fansite não oficial.",
    },
    mobile: { menu: "MENU", languageLabel: "Idioma" },
  },
  pl: {
    nav: { home: "Strona", codes: "Kody", teambuilder: "Team Builder", tierList: "Tier List", guides: "Poradniki", tools: "Narzędzia" },
    header: { logoTitle: "Top Girl Guide" },
    skip: "Przejdź do treści głównej",
    footer: {
      title: "Nieoficjalny serwis TopGirl/ApexGirl.",
      subtitle: "Serwis dla graczy z poradnikami, narzędziami i kodami promocyjnymi.",
      navigation: "Nawigacja",
      resources: "Zasoby",
      legal: "Prawne",
      legalNotice: "Nota Prawna",
      privacy: "Prywatność",
      cookies: "Cookies",
      contact: "Kontakt",
      copyright: "© 2026 TopGirl Fansite. Wszelkie prawa zastrzeżone. To jest nieoficjalny serwis.",
    },
    mobile: { menu: "MENU", languageLabel: "Język" },
  },
  id: {
    nav: { home: "Beranda", codes: "Kode", teambuilder: "Team Builder", tierList: "Tier List", guides: "Panduan", tools: "Alat" },
    header: { logoTitle: "Top Girl Guide" },
    skip: "Lewati ke konten utama",
    footer: {
      title: "Fansite tidak resmi TopGirl/ApexGirl.",
      subtitle: "Fansite untuk pemain dengan panduan, alat, dan kode promo.",
      navigation: "Navigasi",
      resources: "Sumber",
      legal: "Hukum",
      legalNotice: "Ketentuan",
      privacy: "Privasi",
      cookies: "Cookies",
      contact: "Kontak",
      copyright: "© 2026 TopGirl Fansite. Semua hak dilindungi. Ini adalah fansite tidak resmi.",
    },
    mobile: { menu: "MENU", languageLabel: "Bahasa" },
  },
  ru: {
    nav: { home: "Главная", codes: "Коды", teambuilder: "Team Builder", tierList: "Tier List", guides: "Гайды", tools: "Инструменты" },
    header: { logoTitle: "Top Girl Guide" },
    skip: "Перейти к основному содержанию",
    footer: {
      title: "Неофициальный фан-сайт TopGirl/ApexGirl.",
      subtitle: "Фан-сайт для игроков с гайдами, инструментами и промокодами.",
      navigation: "Навигация",
      resources: "Ресурсы",
      legal: "Право",
      legalNotice: "Юридическая Информация",
      privacy: "Конфиденциальность",
      cookies: "Cookies",
      contact: "Контакт",
      copyright: "© 2026 TopGirl Fansite. Все права защищены. Это неофициальный фан-сайт.",
    },
    mobile: { menu: "MENU", languageLabel: "Язык" },
  },
};

export const getUiStrings = (lang: string): UiStrings => uiStrings[lang] || uiStrings.fr;
