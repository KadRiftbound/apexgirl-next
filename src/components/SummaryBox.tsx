export type SummaryBoxData = {
  bestFor?: string;
  mainPriority?: string;
  keyRewards?: string;
  commonMistake?: string;
};

interface SummaryBoxProps {
  data: SummaryBoxData;
  lang: string;
}

const labels: Record<string, Record<string, string>> = {
  fr: { bestFor: "Idéal pour", mainPriority: "Priorité principale", keyRewards: "Récompenses clés", commonMistake: "Erreur fréquente" },
  en: { bestFor: "Best for", mainPriority: "Main priority", keyRewards: "Key rewards", commonMistake: "Common mistake" },
};

export function SummaryBox({ data, lang }: SummaryBoxProps) {
  const t = labels[lang] || labels.en;
  const val = (key: string) => {
    const frKey = `${key}_fr` as keyof typeof data;
    return lang === "fr" && data[frKey] ? data[frKey] : (data as any)[key];
  };
  const items = [
    { key: "bestFor", label: t.bestFor, value: val("bestFor"), color: "#8b5cf6" },
    { key: "mainPriority", label: t.mainPriority, value: val("mainPriority"), color: "#22c55e" },
    { key: "keyRewards", label: t.keyRewards, value: val("keyRewards"), color: "#fbbf24" },
    { key: "commonMistake", label: t.commonMistake, value: val("commonMistake"), color: "#ef4444" },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <div
      style={{
        background: "rgba(10,14,24,0.92)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.09)",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.key}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "12px",
              padding: "12px",
            }}
          >
            <div
              style={{
                color: item.color,
                fontWeight: 700,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "6px",
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.88rem",
                lineHeight: 1.55,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
