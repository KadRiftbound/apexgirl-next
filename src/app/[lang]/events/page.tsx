import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Événements - TopGirl ApexGirl | Calendrier et Récompenses",
  description: "Suivez tous les événements TopGirl en cours et à venir. Calendrier des événements, récompenses, tips pour maximiser vos gains!",
  keywords: ["TopGirl events", "TopGirl calendar", "TopGirl rewards", "TopGirl event schedule", "TopGirl current event"],
  openGraph: {
    title: "Événements - TopGirl ApexGirl",
    description: "Suivez tous les événements TopGirl en cours et à venir.",
  },
};

export default function EventsPage() {
  return (
    <div className="container">
      <h1 className="section-title" style={{ marginBottom: "var(--space-2)" }}>Événements</h1>
      <p className="section-subtitle" style={{ marginBottom: "var(--space-6)" }}>Calendrier et récompenses des événements</p>

      <div style={{ 
        background: "var(--bg-card)", 
        padding: "var(--space-10) 0", 
        margin: "var(--space-8) 0", 
        borderRadius: "var(--radius-lg)", 
        border: "1px solid var(--border)",
        textAlign: "center"
      }}>
        <p style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>🎉</p>
        <h2 style={{ marginBottom: "var(--space-2)" }}>Aucun événement en cours</h2>
        <p className="text-muted">Les nouveaux événements arrivent bientôt !</p>
      </div>
    </div>
  );
}
