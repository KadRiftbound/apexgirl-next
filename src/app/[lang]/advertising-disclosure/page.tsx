import type { Metadata } from "next";

const BASE_URL = "https://apexgirlguide.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";
  return {
    title: isFr ? "Transparence publicitaire | TopGirl Guide" : "Advertising Disclosure | TopGirl Guide",
    description: isFr
      ? "Informations sur la monetisation et l'independance editoriale de TopGirl Guide."
      : "Monetization and editorial independence disclosure for TopGirl Guide.",
    alternates: { canonical: `${BASE_URL}/${lang}/advertising-disclosure/` },
  };
}

export default async function AdvertisingDisclosurePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === "fr";

  return (
    <div className="container" style={{ maxWidth: 860, padding: "32px 20px 56px" }}>
      <h1>{isFr ? "Transparence publicitaire" : "Advertising Disclosure"}</h1>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "TopGirl Guide peut afficher des publicites et liens de soutien pour financer l'hebergement et le developpement du site."
          : "TopGirl Guide may display ads and support links to fund hosting and development."}
      </p>
      <h2>{isFr ? "Independance editoriale" : "Editorial independence"}</h2>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "La monetisation n'influence pas nos tiers, nos recommandations de build, ni l'ordre des artistes."
          : "Monetization does not influence our tiers, build recommendations, or artist ranking order."}
      </p>
      <h2>{isFr ? "Contenu sponsorise" : "Sponsored content"}</h2>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "Si un contenu sponsorise est publie, il sera indique de maniere explicite."
          : "If sponsored content is published, it is explicitly labeled."}
      </p>
    </div>
  );
}
