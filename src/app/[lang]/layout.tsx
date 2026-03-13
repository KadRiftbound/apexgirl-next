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
          <Link href="/" className="logo">
            <img src="/assets/images/logo.png" alt="TopGirl" style={{ height: 40, borderRadius: "var(--radius)" }} />
            <span>TopGirl</span>
          </Link>
          <nav className="nav">
            <Link href="/fr/">Accueil</Link>
            <Link href="/fr/database/">Base de Données</Link>
            <Link href="/fr/events/">Événements</Link>
            <Link href="/fr/guides/">Guides</Link>
            <Link href="/fr/tools/">Outils</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h4>TopGirl Fansite</h4>
            <p className="text-sm text-muted">Le fansite non officiel de TopGirl/ApexGirl par A3Games.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <Link href="/fr/">Accueil</Link>
            <Link href="/fr/database/">Base de Données</Link>
            <Link href="/fr/guides/">Guides</Link>
            <Link href="/fr/tools/">Outils</Link>
          </div>
          <div>
            <h4>Ressources</h4>
            <Link href="/fr/events/">Événements</Link>
            <a href="#">Codes</a>
            <a href="#">News</a>
          </div>
          <div>
            <h4>Légal</h4>
            <a href="#">Mentions Légales</a>
            <a href="#">Confidentialité</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 TopGirl Fansite. Tous droits réservés.
        </div>
      </footer>
    </>
  );
}
