"use client";

import { useEffect, useRef } from "react";

interface AdSenseProps {
  adSlot?: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
}

export function AdSense({ adSlot, adFormat = "auto" }: AdSenseProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5737915177617454"
      data-ad-slot={adSlot || "1234567890"}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}

export function AdBanner() {
  return (
    <div className="ad-banner" style={{ margin: "16px 0", minHeight: "90px" }}>
      <AdSense adSlot="1234567890" />
    </div>
  );
}

export function AdSidebar() {
  return (
    <div className="ad-sidebar" style={{ margin: "var(--space-4) 0", minHeight: "250px" }}>
      <AdSense adSlot="1234567891" adFormat="rectangle" />
    </div>
  );
}
