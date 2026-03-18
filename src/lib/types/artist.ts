/**
 * Canonical Artist type — single source of truth.
 * Used in: artists/page.tsx, tierlist/page.tsx, MobileArtistsPage.tsx
 */
export type Artist = {
  id: number;
  name: string;
  group: string;
  rank: string;
  genre: string;
  position: string;
  skills?: string[];
  image?: string;
  specialty?: string;
  earlyGameRecommended?: boolean;
  acquisitionTier?: string;
  calculatedTier?: string;
  photos?: string;
  season?: string;
  event?: string;
  skillCategories?: {
    dps: string[];
    offensive: string[];
    hp: string[];
    defense: string[];
  };
};
