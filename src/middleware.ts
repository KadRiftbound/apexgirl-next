import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en", "it", "es", "pt", "pl", "id", "ru"];
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

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  if (!locale) return;

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
