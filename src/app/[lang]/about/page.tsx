import type { Metadata } from "next";

const BASE_URL = "https://apexgirlguide.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";
  const title = isFr ? "A propos | TopGirl Guide" : "About | TopGirl Guide";
  const description = isFr
    ? "Qui edite TopGirl Guide, notre experience sur TopGirl/ApexGirl/Idol Company, et comment nous maintenons le contenu."
    : "Who runs TopGirl Guide, our experience with TopGirl/ApexGirl/Idol Company, and how we maintain content quality.";

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${lang}/about/` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === "fr";

  return (
    <div className="container" style={{ maxWidth: 860, padding: "32px 20px 56px" }}>
      <h1>{isFr ? "A propos de TopGirl Guide" : "About TopGirl Guide"}</h1>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "TopGirl Guide est un fansite independant dedie a TopGirl/ApexGirl/Idol Company. Nous publions des guides pratiques, une tier list communautaire, des outils d'equipe et des ressources de progression basees sur l'experience en jeu."
          : "TopGirl Guide is an independent fansite dedicated to TopGirl/ApexGirl/Idol Company. We publish practical guides, a community tier list, team tools, and progression resources based on direct game experience."}
      </p>
      <h2>{isFr ? "Qui edite le site" : "Who edits this site"}</h2>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "Le contenu est redige par l'equipe TopGirl Guide et relu avant publication. Nous mettons a jour les pages majeures apres changements de meta, saisons, ou retours de la communaute."
          : "Content is written by the TopGirl Guide team and reviewed before publication. We update major pages after meta shifts, season changes, and community feedback."}
      </p>
      <h2>{isFr ? "Independance" : "Independence"}</h2>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "Nous ne sommes pas affilies a A3Games ni SuperPrism. Toutes les marques citees appartiennent a leurs proprietaires respectifs."
          : "We are not affiliated with A3Games or SuperPrism. All game trademarks belong to their respective owners."}
      </p>
      <h2>{isFr ? "Contact" : "Contact"}</h2>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr ? "Email: " : "Email: "}
        <a href="mailto:contact@apexgirlguide.com">contact@apexgirlguide.com</a>
      </p>
    </div>
  );
}
