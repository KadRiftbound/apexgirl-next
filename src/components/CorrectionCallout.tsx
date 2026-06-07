interface CorrectionCalloutProps {
  lang: string;
}

export function CorrectionCallout({ lang }: CorrectionCalloutProps) {
  const text = {
    fr: {
      title: "Info inexacte ou obsolète ?",
      body: "Tu as repéré une erreur ou un détail qui a changé dans le jeu ? Envoie-nous une correction ou une capture d'écran pour qu'on mette à jour le guide.",
      contact: "Nous contacter",
      email: "Envoyer un email",
    },
    en: {
      title: "Found outdated info?",
      body: "Spot an error or something that changed in the game? Send us a correction or screenshot so we can update the guide.",
      contact: "Contact us",
      email: "Send an email",
    },
  };

  const t = text[lang as keyof typeof text] || text.en;

  return (
    <div
      style={{
        background: "rgba(30,20,10,0.7)",
        borderRadius: "14px",
        border: "1px solid rgba(255,180,50,0.25)",
        padding: "16px 18px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
      }}
    >
      <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: "1px" }}>💡</span>
      <div>
        <div style={{ color: "#ffb432", fontWeight: 700, fontSize: "0.85rem", marginBottom: "4px" }}>
          {t.title}
        </div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", lineHeight: 1.55, marginBottom: "8px" }}>
          {t.body}
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a
            href={`/${lang}/contact/`}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              background: "rgba(255,180,50,0.12)",
              color: "#ffb432",
              fontSize: "0.82rem",
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid rgba(255,180,50,0.2)",
              transition: "background 0.2s",
            }}
          >
            {t.contact}
          </a>
          <a
            href="mailto:contact@apexgirlguide.com"
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.82rem",
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "background 0.2s",
            }}
          >
            {t.email}
          </a>
        </div>
      </div>
    </div>
  );
}
