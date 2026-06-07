export type CalloutData = {
  type: "tip" | "mistake" | "priority";
  text: string;
};

const calloutStyles: Record<string, { icon: string; color: string; bg: string; border: string; label: Record<string, string> }> = {
  tip: {
    icon: "💡",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
    label: { fr: "Astuce", en: "Quick tip" },
  },
  mistake: {
    icon: "⚠️",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
    label: { fr: "Erreur fréquente", en: "Common mistake" },
  },
  priority: {
    icon: "⭐",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.25)",
    label: { fr: "Priorité", en: "Priority" },
  },
};

interface TipCalloutProps {
  callout: CalloutData;
  lang: string;
}

export function TipCallout({ callout, lang }: TipCalloutProps) {
  const style = calloutStyles[callout.type];
  if (!style) return null;

  const label = style.label[lang] || style.label.en;

  return (
    <div
      style={{
        background: style.bg,
        borderRadius: "12px",
        border: `1px solid ${style.border}`,
        padding: "14px 16px",
        marginBottom: "12px",
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: "1px" }}>{style.icon}</span>
      <div>
        <span
          style={{
            color: style.color,
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "4px",
            display: "block",
          }}
        >
          {label}
        </span>
        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", lineHeight: 1.6 }}>
          {callout.text}
        </span>
      </div>
    </div>
  );
}
