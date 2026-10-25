"use client";

import { useEffect, useRef } from "react";

interface AdSenseProps {
  adSlot?: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
}

export function AdSense({ adSlot, adFormat = "auto" }: AdSenseProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!adSlot || pushed.current) return;
    pushed.current = true;
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [adSlot]);

  if (!adSlot) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5737915177617454"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}

export function AdBanner({ className }: { className?: string }) {
  const slot = process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT;
  if (!slot) return null;

  return (
    <div className={`ad-banner${className ? ` ${className}` : ""}`} style={{ margin: "16px 0", minHeight: "90px" }}>
      <AdSense adSlot={slot} adFormat="horizontal" />
    </div>
  );
}
