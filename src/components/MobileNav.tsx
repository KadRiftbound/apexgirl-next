"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { getUiStrings } from "@/lib/i18n/ui";
import artistImages from "@/lib/data/artist-images.json";
import { fetchVoteData } from "@/lib/voteCache";
import "./mobile-nav.css";

const VALID_LOCALES = ["fr", "en", "id"];

const languages = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "id", label: "Indonesia" },
];

function switchLanguage(pathname: string, newLang: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && VALID_LOCALES.includes(segments[0])) {
    segments[0] = newLang;
    return "/" + segments.join("/") + "/";
  }
  return `/${newLang}/`;
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [topVotedArtist, setTopVotedArtist] = useState<{ name: string; image?: string } | null>(null);
  const params = useParams();
  const pathname = usePathname() || "";
  const lang = (params?.lang as string) || "fr";
  const ui = getUiStrings(lang);
  const lastScrollY = useRef(0);

  useEffect(() => {
    fetchVoteData().then((data) => {
      const top = data?.rankings?.this_week?.[0];
      if (top?.artist_name) {
        const image = (artistImages as Record<string, string>)[top.artist_name];
        setTopVotedArtist({ name: top.artist_name, image });
      }
    });
  }, []);

  // Close the menu on navigation; hide the bar while scrolling down, show it again on scroll up.
  useEffect(() => {
    setIsOpen(false);
    setIsVisible(true);
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 80) setIsVisible(true);
      else if (y > lastScrollY.current + 6) setIsVisible(false);
      else if (y < lastScrollY.current - 6) setIsVisible(true);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navItems = [
    { href: `/${lang}/`, label: ui.nav.home },
    { href: `/${lang}/codes/`, label: ui.nav.codes },
    { href: `/${lang}/teambuilder/`, label: ui.nav.teambuilder },
    { href: `/${lang}/tierlist/`, label: ui.nav.tierList },
    { href: `/${lang}/guides/`, label: ui.nav.guides },
    { href: `/${lang}/tools/`, label: ui.nav.tools },
  ];

  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const isActive = (href: string) =>
    href === `/${lang}/` ? normalizedPath === href : normalizedPath.startsWith(href);

  return (
    <div className={`mnav${isVisible || isOpen ? "" : " mnav-hidden"}`}>
      <div className="mnav-bar">
        <div className="mnav-left">
          <Link href={`/${lang}/`} className="mnav-logo" aria-label="TopGirl - Home">
            <Image src="/assets/logositenew.png" alt="" width={30} height={30} priority />
            <span>TopGirl<em>Guide</em></span>
          </Link>
          {topVotedArtist && (
            <Link href={`/${lang}/tierlist/?tab=vote`} title={topVotedArtist.name} className="mnav-crown">
              <span className="mnav-crown-img">
                {topVotedArtist.image ? (
                  <Image src={`/assets/images/artists/${topVotedArtist.image}`} alt={topVotedArtist.name} fill sizes="24px" style={{ objectFit: "cover" }} />
                ) : (
                  topVotedArtist.name.charAt(0)
                )}
              </span>
              <span aria-hidden="true">👑</span>
            </Link>
          )}
        </div>

        <button
          type="button"
          className={`mnav-toggle${isOpen ? " open" : ""}`}
          aria-label={isOpen ? "Close menu" : ui.mobile.menu}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span /><span /><span />
        </button>
      </div>

      {isOpen && (
        <nav id="mobile-nav-menu" className="mnav-panel" aria-label="Navigation menu">
          <div className="mnav-links">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`mnav-link${isActive(item.href) ? " active" : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>

          <div className="mnav-lang">
            <p>{ui.mobile.languageLabel}</p>
            <div className="mnav-lang-grid">
              {languages.map((l) => (
                <Link
                  key={l.code}
                  href={switchLanguage(pathname, l.code)}
                  onClick={() => setIsOpen(false)}
                  className={`mnav-lang-btn${l.code === lang ? " on" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
