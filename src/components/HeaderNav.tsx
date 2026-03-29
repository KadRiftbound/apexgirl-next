"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "@/components/LanguageSelector";

type NavItem = {
  href: string;
  label: string;
  cta?: boolean;
};

export function HeaderNav({ lang, items }: { lang: string; items: NavItem[] }) {
  const pathname = usePathname() || "";
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;

  const isActive = (href: string) => {
    if (!href) return false;
    const normalizedHref = href.endsWith("/") ? href : `${href}/`;
    if (normalizedHref === `/${lang}/`) return normalizedPath === normalizedHref;
    return normalizedPath.startsWith(normalizedHref);
  };

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      {items.map((item) => {
        const active = isActive(item.href);
        const className = `${item.cta ? "nav-cta" : ""}${active ? " active" : ""}`.trim();
        return (
          <Link
            key={item.href}
            href={item.href}
            className={className}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
      <LanguageSelector currentLang={lang} />
    </nav>
  );
}
