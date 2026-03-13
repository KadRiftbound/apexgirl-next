import Link from "next/link";

export async function generateStaticParams() {
  return [
    { lang: "fr" },
    { lang: "en" },
  ];
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/fr/" className="logo">
            <img src="/assets/images/logo.png" alt="TopGirl" />
            <span>TopGirl</span>
          </Link>
          <nav className="nav">
            <Link href="/fr/">Accueil</Link>
            <Link href="/fr/database/">Artistes</Link>
            <Link href="/fr/events/">Événements</Link>
            <Link href="/fr/guides/">Guides</Link>
            <Link href="/fr/tools/" className="nav-cta">Outils</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h4 style={{ background: "linear-gradient(135deg, var(--primary), #ff80ab)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TopGirl</h4>
            <p className="text-sm text-muted" style={{ marginBottom: "16px" }}>
              Le fansite非 officiel de TopGirl/ApexGirl par A3Games.
            </p>
            <p className="text-sm text-muted">
              Fansite dédié aux joueurs avec guides, outils et codes promo.
            </p>
          </div>
          <div>
            <h4>Navigation</h4>
            <Link href="/fr/">Accueil</Link>
            <Link href="/fr/database/">Artistes</Link>
            <Link href="/fr/guides/">Guides</Link>
            <Link href="/fr/tools/">Outils</Link>
          </div>
          <div>
            <h4>Ressources</h4>
            <Link href="/fr/events/">Événements</Link>
            <a href="#">Codes Promo</a>
            <a href="#">Actualités</a>
          </div>
          <div>
            <h4>Légal</h4>
            <a href="#">Mentions Légales</a>
            <a href="#">Confidentialité</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 TopGirl Fansite. Tous droits réservés. Ce site est un fansite non officiel.
        </div>
      </footer>
    </>
  );
}
