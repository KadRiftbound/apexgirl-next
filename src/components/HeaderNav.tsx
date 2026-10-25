"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "@/components/navIcons";

type NavItem = {
  key: string;
  href: string;
  label: string;
  group?: string;
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
      {items.map((item, i) => {
        const active = isActive(item);
        const newGroup = i > 0 && item.group !== items[i - 1]?.group;
        return (
          <Fragment key={item.href}>
            {newGroup && (
              <div className="nav-group" aria-hidden="true">
                <span className="nav-sep" />
                {item.group && <span className="nav-group-label">{item.group}</span>}
              </div>
            )}
            <Link href={item.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
              <NavIcon name={item.key} size={20} />
              <span>{item.label}</span>
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}
