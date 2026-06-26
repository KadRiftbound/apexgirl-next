export interface AffiliateProduct {
  name: string;
  url: string;
  tagline: string;
  imageUrl: string;
  color: string;
}

export type AffiliateSlot = "home" | "guide-detail" | "guides-list" | "codes" | "teambuilder" | "tierlist" | "tools";

const products: Record<string, AffiliateProduct> = {
  "power-bank": {
    name: "INIU Smallest 45W 20000mAh Power Bank",
    url: "https://amzn.to/4vBVvhQ",
    tagline: "Built-in USB-C cable, fast charge 3 devices",
    imageUrl: "https://cdn.iniucharger.com/cdn/2925/2026/04/15/main-INIU-45W-Portable-Charger-Smallest-20000mAh-Power-Bank-with-Build-in-USBC-Cable-Fast-Charging-USB-C-inampOut-Battery-Pack-Travel-Phone-Charger-for-iPh-1197300-763.jpg",
    color: "#8b5cf6",
  },
  headphones: {
    name: "Google Pixel Buds Pro 2",
    url: "https://amzn.to/4oPpYGx",
    tagline: "Pro-level noise cancellation, crystal-clear audio",
    imageUrl: "https://lh3.googleusercontent.com/MP4ymmRItYWpJsY0cjGQfkR38WYCvrqGWv8PF-sOJQwK0A9oM2u0sr-BKD2kq_SxImwincyudgTwJRiNF5UofQwXT0IljAXKq-Zm=rw-e365-w1200-rj-sc0xffffffff",
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
