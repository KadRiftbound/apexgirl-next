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

  const legacyRedirects: Record<string, string> = {
    "/events": "/en/guides",
    "/artists": "/en/teambuilder",
    "/guides/vip-level": "/en/vip-system-guide",
    "/guides/vip": "/en/vip-system-guide",
    "/vip": "/en/vip-system-guide",
    "/sw.js": "/sw.js",
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
