import type { Metadata } from "next";

const BASE_URL = "https://apexgirlguide.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";
  return {
    title: isFr ? "Methodologie | TopGirl Guide" : "Methodology | TopGirl Guide",
    description: isFr
      ? "Methodologie de la tier list, des recommandations d'equipes et des guides TopGirl/ApexGirl/Idol Company."
      : "Methodology behind tier list rankings, team recommendations, and guides for TopGirl/ApexGirl/Idol Company.",
    alternates: { canonical: `${BASE_URL}/${lang}/methodology/` },
  };
}

export default async function MethodologyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === "fr";

  return (
    <div className="container" style={{ maxWidth: 860, padding: "32px 20px 56px" }}>
      <h1>{isFr ? "Methodologie" : "Methodology"}</h1>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "Nos classements et recommandations ne reposent pas sur un seul critere. Nous combinons performance en jeu, synergies d'equipe, cout de progression et stabilite dans la meta."
          : "Our rankings and recommendations are not based on one single metric. We combine in-game performance, team synergy, progression cost, and meta stability."}
      </p>
      <h2>{isFr ? "Critiques utilises" : "Scoring dimensions"}</h2>
      <ul style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
        <li>{isFr ? "Impact en combat (PvE/PvP selon le contexte)" : "Combat impact (PvE/PvP by context)"}</li>
        <li>{isFr ? "Synergie avec les genres/branches/equipements" : "Synergy with genres/branches/equipment"}</li>
        <li>{isFr ? "Rentabilite des ressources" : "Resource efficiency"}</li>
        <li>{isFr ? "Regularite des performances" : "Consistency of results"}</li>
      </ul>
      <h2>{isFr ? "Limites" : "Limits"}</h2>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        {isFr
          ? "Les resultats peuvent varier selon votre serveur, votre timing de saison et votre niveau d'investissement. Nous indiquons les hypotheses quand elles sont importantes." 
          : "Results can vary based on server, season timing, and spending level. We indicate assumptions when they matter."}
      </p>
    </div>
  );
}
