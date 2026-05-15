import type { Metadata } from "next";

const BASE_URL = "https://apexgirlguide.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";
  return {
    title: isFr ? "Politique editoriale | TopGirl Guide" : "Editorial Policy | TopGirl Guide",
    description: isFr
      ? "Comment nous redigeons, verifions et mettons a jour les guides TopGirl/ApexGirl/Idol Company."
      : "How we write, review, and update TopGirl/ApexGirl/Idol Company guides.",
    alternates: { canonical: `${BASE_URL}/${lang}/editorial-policy/` },
  };
}

export default async function EditorialPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === "fr";

  return (
    <div className="container" style={{ maxWidth: 860, padding: "32px 20px 56px" }}>
      <h1>{isFr ? "Politique editoriale" : "Editorial Policy"}</h1>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "Notre priorite est de publier des contenus utiles, concrets et verifiables pour les joueurs de TopGirl/ApexGirl/Idol Company."
          : "Our priority is to publish useful, practical, and verifiable content for TopGirl/ApexGirl/Idol Company players."}
      </p>
      <h2>{isFr ? "Processus de publication" : "Publishing process"}</h2>
      <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
        <li>{isFr ? "Redaction initiale basee sur tests en jeu et donnees internes" : "Initial draft based on in-game tests and internal data"}</li>
        <li>{isFr ? "Verification des builds, couts, et prerequis cites" : "Verification of builds, costs, and listed requirements"}</li>
        <li>{isFr ? "Relecture et correction avant mise en ligne" : "Review and correction before publishing"}</li>
      </ul>
      <h2>{isFr ? "Mises a jour" : "Updates"}</h2>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "Les pages strategiques (guides events, tier list, team builder) sont revisees en priorite apres changements de meta et feedback communautaire." 
          : "Priority pages (event guides, tier list, team builder) are revised first after meta changes and community feedback."}
      </p>
      <h2>{isFr ? "Publicite et independance" : "Advertising and independence"}</h2>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "La monetisation ne modifie pas nos classements ni recommandations. Les partenariats eventuels sont identifies clairement." 
          : "Monetization does not alter our rankings or recommendations. Any partnerships are explicitly disclosed."}
      </p>
    </div>
  );
}
