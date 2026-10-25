/* Guide icons: one stroke icon per guide (by id), with a fallback per guide type.
   Same family as the navigation icons: 24px grid, 1.8 stroke, round caps. */
import type { CSSProperties } from "react";

const paths: Record<string, React.ReactNode> = {
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5z" /><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19" /><path d="M8 7h7M8 10.5h7" /></>,
  ticket: <><path d="M3 8.6V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.6a2.4 2.4 0 0 0 0 4.8V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3.6a2.4 2.4 0 0 0 0-4.8z" /><path d="M9.4 5.4v13.2" strokeDasharray="2.2 2.4" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.2 6.1L12 16.8l-5.5 2.9 1.2-6.1-4.5-4.2 6.1-.8z" />,
  building: <><rect x="4" y="3" width="10" height="18" rx="1.2" /><path d="M14 9h5a1 1 0 0 1 1 1v11h-6" /><path d="M7.5 7h3M7.5 11h3M7.5 15h3M17 13h.5M17 17h.5" /></>,
  bag: <><path d="M5.5 8h13l-1 12.2a1 1 0 0 1-1 .8h-9a1 1 0 0 1-1-.8z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  coins: <><circle cx="9" cy="9" r="5.5" /><path d="M14.3 8.2a5.5 5.5 0 1 1-6.1 6.1" /><path d="M9 6.5v5M7 9h4" /></>,
  pin: <><path d="M12 21.5s6.5-6 6.5-11.5a6.5 6.5 0 0 0-13 0C5.5 15.5 12 21.5 12 21.5z" /><circle cx="12" cy="10" r="2.3" /></>,
  cards: <><rect x="3" y="7" width="11" height="14" rx="1.5" /><path d="M8 7V4.5A1.5 1.5 0 0 1 9.5 3H19.5A1.5 1.5 0 0 1 21 4.5V17" /><path d="M6.5 11h4M6.5 14.5h4" /></>,
  music: <><path d="M9 18V5.5l11-2.2V16" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>,
  sitemap: <><rect x="9" y="3" width="6" height="4.5" rx="1" /><rect x="3" y="16.5" width="6" height="4.5" rx="1" /><rect x="15" y="16.5" width="6" height="4.5" rx="1" /><path d="M12 7.5v4.5M6 16.5V12h12v4.5" /></>,
  sprout: <><path d="M12 21v-8.5" /><path d="M12 12.5c0-4.2 3-6.5 7.5-6.5 0 4.2-3 6.5-7.5 6.5z" /><path d="M12 15.5c0-3.3-2.5-5.5-6.5-5.5 0 3.3 2.5 5.5 6.5 5.5z" /></>,
  rocket: <><path d="M14.5 3.5c3.5 0 6.5 1.5 6 7-2 1-3.5 2.5-5.5 4.5L10.5 10.5c2-2 3-4.5 4-7z" /><path d="M10.5 10.5l-3-.7-4 3 4.2 1.2" /><path d="M13.5 13.5l.7 3-3 4-1.2-4.2" /><path d="M8.5 15.5l-3 3" /></>,
  fish: <><path d="M2.5 12c3-4.2 6.6-6.3 10.5-6.3 3.5 0 6.4 2.1 8.5 6.3-2.1 4.2-5 6.3-8.5 6.3-3.9 0-7.5-2.1-10.5-6.3z" /><circle cx="16.2" cy="10.6" r="1" /><path d="M2.5 12l-1-4.5M2.5 12l-1 4.5" /></>,
  trophy: <><path d="M8 21h8M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M17 5h3a2 2 0 0 1-2 4M7 5H4a2 2 0 0 0 2 4" /></>,
  gem: <><path d="M7 3h10l4.5 6L12 21 2.5 9z" /><path d="M2.5 9h19M9 3l3 18M15 3l-3 18M7 3l2 6M17 3l-2 6" /></>,
  users: <><circle cx="12" cy="7.6" r="3" /><path d="M6.6 20v-.9a5.4 5.4 0 0 1 10.8 0V20" /><circle cx="4.8" cy="10.2" r="2.1" /><path d="M1.5 19.2v-.6a3.4 3.4 0 0 1 4.2-3.3" /><circle cx="19.2" cy="10.2" r="2.1" /><path d="M22.5 19.2v-.6a3.4 3.4 0 0 0-4.2-3.3" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M8 14h3M13 14h3M8 17.5h3" /></>,
  mountain: <><path d="M2.5 20l6.5-11 4.5 6.5 3-4L21.5 20z" /><path d="M7.5 11.5l1.5-2.5 1.5 2.5" /></>,
  train: <><rect x="5" y="3" width="14" height="14" rx="3" /><path d="M5 11h14M9 21l1.2-4M15 21l-1.2-4M8.5 14h.01M15.5 14h.01" /></>,
  radio: <><rect x="3" y="8" width="18" height="12" rx="2" /><circle cx="9" cy="14" r="2.5" /><path d="M15 12.5h3M15 15.5h3M6.5 8l10-5" /></>,
  waves: <><path d="M3 7.5c2-3 4-3 6 0s4 3 6 0 4-3 6 0" /><path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" /><path d="M3 16.5c2-3 4-3 6 0s4 3 6 0 4-3 6 0" /></>,
  swords: <><path d="M14.5 17.5L3 6V3h3l11.5 11.5" /><path d="M13 19l6-6M16 16l4 4M19 21l2-2" /><path d="M9.5 6.5L21 3v3L17.5 9.5" /><path d="M5 19l-2 2M8 16l-4 4" /></>,
  landmark: <><path d="M3 21h18M5 21v-9M9.5 21v-9M14.5 21v-9M19 21v-9" /><path d="M3 12l9-6.5 9 6.5z" /></>,
  torii: <><path d="M3 6.5h18M5.5 6.5V21M18.5 6.5V21M4 10.5h16M12 10.5V21" /><path d="M3 6.5c3-1 15-1 18 0" /></>,
  crown: <><path d="M3.5 17.5h17l-1.8-9.5-4.7 4-2-6.5-2 6.5-4.7-4z" /><path d="M5 21h14" /></>,
  flag: <><path d="M5 21V3.5" /><path d="M5 4h11.5l-2.5 4 2.5 4H5" /></>,
  wheel: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.3 4.3M14.1 14.1l4.3 4.3M18.4 5.6l-4.3 4.3M9.9 14.1l-4.3 4.3" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12.5h18" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5M3 17.5l9 5 9-5" /></>,
};

const byId: Record<string, string> = {
  "ancient-rome-event": "landmark",
  "guide-des-batiments-de-la-ville": "building",
  "guide-des-achats-integres": "coins",
  "guide-du-chamber-territory": "pin",
  "guide-city-supremacy": "flag",
  "guide-du-systeme-de-collection": "cards",
  "guide-echo-death-match": "waves",
  "guide-de-l-equipe-edm": "music",
  "comprendre-la-structure-du-jeu-top-girl": "sitemap",
  "type-classique-early-game-debutant": "sprout",
  "guide-fishing-event": "fish",
  "guide-grammy-award": "trophy",
  "guide-du-group-shop": "bag",
  "type-special": "users",
  "guide-construction-d-equipe-debut-de-jeu": "users",
  "guide-construction-d-equipe-fin-de-jeu": "users",
  "guide-des-equipements": "gem",
  "guide-de-planification-long-terme": "calendar",
  "guide-peak": "mountain",
  "metro-guide": "train",
  "guide-muse-event": "music",
  "guide-du-systeme-de-tier": "layers",
  "guide-radio-battle": "radio",
  "guide-de-l-equipe-rnb": "music",
  "ce-guide-n-inclus-pas-les-artistes-apres-roma-3": "layers",
  "type-classique-mid-game-avance": "rocket",
  "guide-des-attaques-et-des-rassemblements": "swords",
  "guide-tokyo": "torii",
  "guide-ultimate-ceo": "briefcase",
  "ultimate-group-guide": "flag",
  "guide-group-battle": "swords",
  "guide-du-systeme-vip": "crown",
  "roulette-event-guide": "wheel",
  "world-building": "globe",
};

const byType: Record<string, string> = { classic: "book", event: "ticket", special: "star" };

export function guideIconName(id: string, type?: string): string {
  return byId[id] || byType[type || ""] || "book";
}

export function GuideIcon({ id, type, size = 22, className, style }: { id: string; type?: string; size?: number; className?: string; style?: CSSProperties }) {
  const name = guideIconName(id, type);
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
