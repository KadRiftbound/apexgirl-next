import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides - TopGirl ApexGirl | Tutoriels et Stratégies",
  description: "Apprenez à maîtriser TopGirl avec nos guides complets : débutants, composition d'équipe, événements, comment utiliser les codes promo et plus!",
  keywords: ["TopGirl guide", "TopGirl tips", "TopGirl tutorial", "TopGirl beginners", "TopGirl team composition", "TopGirl codes guide"],
  openGraph: {
    title: "Guides - TopGirl ApexGirl",
    description: "Apprenez à maîtriser TopGirl avec nos guides complets.",
  },
};

export default function GuidesPage() {
  return (
    <div className="container">
      <h1 className="section-title" style={{ marginBottom: "var(--space-2)" }}>Guides</h1>
      <p className="section-subtitle" style={{ marginBottom: "var(--space-6)" }}>Tutoriels et stratégies pour maîtriser le jeu</p>

      <div className="grid grid-cols-2" style={{ gap: "var(--space-4)" }}>
        <article className="card" style={{ padding: "var(--space-6)" }}>
          <h3 style={{ marginBottom: "var(--space-2)" }}>Guide des Débutants</h3>
          <p className="text-muted">Tout ce que vous devez savoir pour bien commencer dans TopGirl</p>
        </article>
        <article className="card" style={{ padding: "var(--space-6)" }}>
          <h3 style={{ marginBottom: "var(--space-2)" }}>Comment Utiliser les Codes</h3>
          <p className="text-muted">Guide paso a paso pour entrer vos codes promo</p>
        </article>
        <article className="card" style={{ padding: "var(--space-6)" }}>
          <h3 style={{ marginBottom: "var(--space-2)" }}>Composition d'Équipe</h3>
          <p className="text-muted">Les meilleures combinaisons d'artistes par rôle</p>
        </article>
        <article className="card" style={{ padding: "var(--space-6)" }}>
          <h3 style={{ marginBottom: "var(--space-2)" }}>Événements</h3>
          <p className="text-muted">Comment maximiser vos récompenses lors des événements</p>
        </article>
      </div>
    </div>
  );
}
