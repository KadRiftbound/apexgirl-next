export interface AffiliateProduct {
  name: string;
  url: string;
  tagline: string;
  icon: string;
  color: string;
}

export type AffiliateSlot = "home" | "guide-detail" | "guides-list" | "codes" | "teambuilder" | "tierlist" | "tools";

const products: Record<string, AffiliateProduct> = {
  "power-bank": {
    name: "Power Bank",
    url: "https://amzn.to/3QEXx1s",
    tagline: "Long sessions, no worries",
    icon: "🔋",
    color: "#8b5cf6",
  },
  headphones: {
    name: "Headphones",
    url: "https://amzn.to/4oPpYGx",
    tagline: "Crystal-clear audio",
    icon: "🎧",
    color: "#f472b6",
  },
};

const slotProductMap: Record<AffiliateSlot, string> = {
  home: "power-bank",
  "guide-detail": "headphones",
  "guides-list": "power-bank",
  codes: "headphones",
  teambuilder: "power-bank",
  tierlist: "headphones",
  tools: "power-bank",
};

export function getAffiliateProduct(slot: AffiliateSlot): AffiliateProduct {
  const id = slotProductMap[slot];
  return products[id];
}
