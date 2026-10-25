"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { getUiStrings } from "@/lib/i18n/ui";
import { navIcons } from "@/components/navIcons";
import "./mobile-nav.css";

/** Phones only: a bottom tab bar with the five sections. Codes, language and the rest live in the footer. */
export function MobileNav() {
  const params = useParams();
  const pathname = usePathname() || "";
  const lang = (params?.lang as string) || "fr";
  const ui = getUiStrings(lang);

  const tabs = [
    { key: "home", href: `/${lang}/`, label: ui.nav.home },
    { key: "teambuilder", href: `/${lang}/teambuilder/`, label: ui.nav.teambuilder },
    { key: "tierlist", href: `/${lang}/tierlist/`, label: ui.nav.tierList },
    { key: "guides", href: `/${lang}/guides/`, label: ui.nav.guides },
    { key: "vote", href: `/${lang}/vote/`, label: ui.nav.vote },
  ];

  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const isActive = (href: string) =>
    href === `/${lang}/` ? normalizedPath === href : normalizedPath.startsWith(href);
  // Artist pages belong to the Team Builder tab.
  const activeKey = normalizedPath.includes("/artist/") ? "teambuilder" : (tabs.find((t) => isActive(t.href))?.key ?? "");

  return (
    <nav className="bnav" aria-label="Sections">
      {tabs.map((tab) => {
        const on = activeKey === tab.key;
        return (
          <Link key={tab.key} href={tab.href} className={`bnav-tab${on ? " on" : ""}`} aria-current={on ? "page" : undefined}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {navIcons[tab.key]}
            </svg>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
