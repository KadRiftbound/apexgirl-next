"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  lang: string;
  nav: {
    home: string;
    database: string;
    events: string;
    guides: string;
    tools: string;
  };
}

export function Header({ lang, nav }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    const cleanPath = pathname.replace(`/${lang}`, "") || "/";
    return cleanPath === path || (path !== "/" && pathname.startsWith(`/${lang}${path}`));
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link href={`/${lang}`} className="logo">
          <img src="/assets/images/logo.png" alt="TopGirl" style={{ height: 40, borderRadius: "var(--radius)" }} />
          <span>TopGirl</span>
        </Link>

        <nav className="nav">
          <Link href={`/${lang}`} className={isActive("/") ? "active" : ""}>
            {nav.home}
          </Link>
          <Link href={`/${lang}/database/`} className={isActive("/database/") ? "active" : ""}>
            {nav.database}
          </Link>
          <Link href={`/${lang}/events/`} className={isActive("/events/") ? "active" : ""}>
            {nav.events}
          </Link>
          <Link href={`/${lang}/guides/`} className={isActive("/guides/") ? "active" : ""}>
            {nav.guides}
          </Link>
          <Link href={`/${lang}/tools/`} className={isActive("/tools/") ? "active" : ""}>
            {nav.tools}
          </Link>
        </nav>
      </div>
    </header>
  );
}
