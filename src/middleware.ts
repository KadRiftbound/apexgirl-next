import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en", "id"];
const defaultLocale = "en";

function getLocale(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return null;

  const acceptLanguage = request.headers.get("Accept-Language") || "en";
  const browserLocales = acceptLanguage
    .split(",")
    .map(l => l.split(";")[0].trim().toLowerCase());
  
  const localeMap: Record<string, string> = {
    "fr": "fr", "fr-fr": "fr", "fr-be": "fr",
    "en": "en", "en-us": "en", "en-gb": "en",
    "id": "id", "id-id": "id",
  };
  
  for (const browserLocale of browserLocales) {
    if (localeMap[browserLocale]) return localeMap[browserLocale];
  }
  
  return defaultLocale;
}

// Languages retired in 2026 (auto-translated content removed). 301 them to English,
// keeping the rest of the path: guide pages resolve old localized slugs themselves.
const retiredLocaleMatch = /^\/(de|it|es|pt|pl|ru)(\/.*)?$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const retired = pathname.match(retiredLocaleMatch);
  if (retired) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${retired[2] || "/"}`;
    return NextResponse.redirect(url, 301);
  }

  const localeVipSlugs: Record<string, string> = {
    fr: "guide-systeme-vip",
    en: "vip-system-guide",
    id: "panduan-sistem-vip",
  };

  const localeVipMatch = pathname.match(/^\/(fr|en|id)\/guides\/vip-level\/?$/);
  if (localeVipMatch) {
    const locale = localeVipMatch[1];
    const targetSlug = localeVipSlugs[locale] || localeVipSlugs.en;
    return NextResponse.redirect(new URL(`/${locale}/guides/${targetSlug}/`, request.url));
  }

  const localeVipShortMatch = pathname.match(/^\/(fr|en|id)\/guides\/vip\/?$/);
  if (localeVipShortMatch) {
    const locale = localeVipShortMatch[1];
    const targetSlug = localeVipSlugs[locale] || localeVipSlugs.en;
    return NextResponse.redirect(new URL(`/${locale}/guides/${targetSlug}/`, request.url));
  }

  const legacyRedirects: Record<string, string> = {
    "/events": "/en/guides",
    "/en/events": "/en/guides",
    "/artists": "/en/teambuilder",
    "/en/artists": "/en/teambuilder",
    "/guides/vip-level": "/en/guides/vip-system-guide/",
    "/guides/vip-level/": "/en/guides/vip-system-guide/",
    "/guides/vip": "/en/guides/vip-system-guide/",
    "/guides/vip/": "/en/guides/vip-system-guide/",
    "/vip": "/en/guides/vip-system-guide/",
    "/vip/": "/en/guides/vip-system-guide/",
  };

  if (legacyRedirects[pathname]) {
    return NextResponse.redirect(new URL(legacyRedirects[pathname], request.url));
  }

  const matchedLocale = locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (matchedLocale) {
    const response = NextResponse.next();
    response.headers.set("x-lang", matchedLocale);
    return response;
  }

  const locale = getLocale(request) || defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
