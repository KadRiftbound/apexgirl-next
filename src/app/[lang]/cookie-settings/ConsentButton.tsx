"use client";

import { useState } from "react";

type GoogleFc = { callbackQueue: unknown[]; showRevocationMessage?: () => void };

export function ConsentButton({ label, unavailable }: { label: string; unavailable: string }) {
  const [missing, setMissing] = useState(false);

  const open = () => {
    const fc = (window as unknown as { googlefc?: GoogleFc }).googlefc;
    if (!fc?.showRevocationMessage) {
      setMissing(true);
      return;
    }
    fc.callbackQueue.push(fc.showRevocationMessage);
  };

  return (
    <div>
      <button type="button" className="btn" onClick={open}>{label}</button>
      {missing && <p style={{ marginTop: 12, color: "var(--text-dim)", fontSize: "0.9rem" }}>{unavailable}</p>}
    </div>
  );
}
