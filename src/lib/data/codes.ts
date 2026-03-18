// Source unique pour tous les codes promo TopGirl / ApexGirl
// Importé par : [lang]/page.tsx ET [lang]/codes/page.tsx

export interface PromoCode {
  code: string;
  rewards: string;
  expires: string; // format YYYY-MM-DD
  status: "active" | "expired";
  rarity?: "new";
}

export const activeCodes: PromoCode[] = [
  { code: "TOPYEAR2026",    rewards: "500 Gems + 1000 Coins",             expires: "2026-12-31", status: "active", rarity: "new" },
  { code: "TOPLOVERS",      rewards: "1000 Gems",                          expires: "2026-12-31", status: "active" },
  { code: "1stAnniversary", rewards: "SSR Girl Promote Card + 500 Gems",  expires: "2026-06-30", status: "active" },
];

export const expiredCodes: PromoCode[] = [
  { code: "Springtopgirl", rewards: "500 Gems", expires: "2025-03-31", status: "expired" },
  { code: "Merrytopgirl",  rewards: "500 Gems", expires: "2024-12-31", status: "expired" },
];
