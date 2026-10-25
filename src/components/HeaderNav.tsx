"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "@/components/navIcons";

type NavItem = {
  key: string;
  href: string;
  label: string;
};

/** Vertical navigation of the desktop sidebar. */
export function HeaderNav({ lang, items }: { lang: string; items: NavItem[] }) {
  const pathname = usePathname() || "";
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;

  const isActive = (item: NavItem) => {
    const normalizedHref = item.href.endsWith("/") ? item.href : `${item.href}/`;
    if (normalizedHref === `/${lang}/`) return normalizedPath === normalizedHref;
    if (item.key === "teambuilder" && normalizedPath.includes("/artist/")) return true;
    return normalizedPath.startsWith(normalizedHref);
  };

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      {items.map((item) => {
        const active = isActive(item);
        return (
          <Link key={item.href} href={item.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
            <NavIcon name={item.key} size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
