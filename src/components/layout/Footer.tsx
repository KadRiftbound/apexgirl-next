import Link from "next/link";

interface FooterProps {
  lang: string;
  footer: {
    copyright: string;
    disclaimer: string;
  };
  nav: {
    home: string;
    database: string;
    guides: string;
    tools: string;
  };
}

export function Footer({ lang, footer, nav }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h4>TopGirl Fansite</h4>
          <p className="text-sm text-muted">{footer.disclaimer}</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <Link href={`/${lang}`}>{nav.home}</Link>
          <Link href={`/${lang}/database/`}>{nav.database}</Link>
          <Link href={`/${lang}/guides/`}>{nav.guides}</Link>
          <Link href={`/${lang}/tools/`}>{nav.tools}</Link>
        </div>
        <div>
          <h4>Resources</h4>
          <Link href={`/${lang}/events/`}>Events</Link>
          <a href="#">Codes</a>
          <a href="#">News</a>
        </div>
        <div>
          <h4>Legal</h4>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 TopGirl Fansite. {footer.copyright}
      </div>
    </footer>
  );
}
