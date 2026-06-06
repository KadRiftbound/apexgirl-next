"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "@/components/LanguageSelector";

type NavItem = {
  href: string;
  label: string;
  cta?: boolean;
  variant?: string;
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

  const isExternal = (href: string) => href.startsWith("http://") || href.startsWith("https://");

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      {items.map((item) => {
        const active = !isExternal(item.href) && isActive(item.href);
        const className = `${item.cta ? "nav-cta" : ""}${item.variant ? ` nav-cta-${item.variant}` : ""}${active ? " active" : ""}`.trim();

        if (isExternal(item.href)) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              ⭐ {item.label}
            </a>
          );
        }

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
