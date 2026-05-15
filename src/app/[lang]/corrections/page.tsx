import type { Metadata } from "next";

const BASE_URL = "https://apexgirlguide.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";
  return {
    title: isFr ? "Corrections et mises a jour | TopGirl Guide" : "Corrections and Updates | TopGirl Guide",
    description: isFr
      ? "Comment signaler une erreur et suivre les corrections sur TopGirl Guide."
      : "How to report an issue and track corrections on TopGirl Guide.",
    alternates: { canonical: `${BASE_URL}/${lang}/corrections/` },
  };
}

export default async function CorrectionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === "fr";

  return (
    <div className="container" style={{ maxWidth: 860, padding: "32px 20px 56px" }}>
      <h1>{isFr ? "Corrections et mises a jour" : "Corrections and Updates"}</h1>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "Si vous detectez une erreur (stat, route, build, traduction), ecrivez-nous avec la page concernee et une capture si possible."
          : "If you spot an error (stats, route, build, translation), send us the page URL and a screenshot when possible."}
      </p>
      <h2>{isFr ? "Delai cible" : "Target response time"}</h2>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr ? "Nous visons une premiere reponse sous 72 heures." : "We target a first response within 72 hours."}
      </p>
      <h2>{isFr ? "Canaux" : "Channels"}</h2>
      <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
        <li>Email: <a href="mailto:contact@apexgirlguide.com">contact@apexgirlguide.com</a></li>
        <li>{isFr ? "Page contact du site" : "Site contact page"}</li>
      </ul>
    </div>
  );
}
