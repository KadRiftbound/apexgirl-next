import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en", "de", "it", "es", "pt", "pl", "id", "ru"];
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
    "de": "de", "de-de": "de", "de-at": "de", "de-ch": "de",
    "it": "it", "it-it": "it",
    "es": "es", "es-es": "es", "es-mx": "es",
    "pt": "pt", "pt-pt": "pt", "pt-br": "pt",
    "pl": "pl", "pl-pl": "pl",
    "id": "id", "id-id": "id",
    "ru": "ru", "ru-ru": "ru"
  };
  
  for (const browserLocale of browserLocales) {
    if (localeMap[browserLocale]) return localeMap[browserLocale];
  }
  
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeVipSlugs: Record<string, string> = {
    fr: "guide-systeme-vip",
    en: "vip-system-guide",
    de: "leitfaden-vip-system",
    it: "guida-sistema-vip",
    es: "guia-sistema-vip",
    pt: "guia-sistema-vip",
    pl: "przewodnik-system-vip",
    id: "panduan-sistem-vip",
    ru: "rukovodstvo-sistem-vip",
  };

  const localeVipMatch = pathname.match(/^\/(fr|en|de|it|es|pt|pl|id|ru)\/guides\/vip-level\/?$/);
  if (localeVipMatch) {
    const locale = localeVipMatch[1];
    const targetSlug = localeVipSlugs[locale] || localeVipSlugs.en;
    return NextResponse.redirect(new URL(`/${locale}/guides/${targetSlug}/`, request.url));
  }

  const localeVipShortMatch = pathname.match(/^\/(fr|en|de|it|es|pt|pl|id|ru)\/guides\/vip\/?$/);
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
