import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { i18n } from "./i18n-config";
import { baseUrlByLocale } from "./i18n-server";

function geRequestHost(request: NextRequest) {
  return request.headers.get("x-forwarded-host") || request.headers.get("host");
}

  const localeByHost = Object.fromEntries(
  Object.entries(baseUrlByLocale).map(([locale, baseUrl]) => [
    new URL(baseUrl).host,
    locale,
  ])

  /**
       * localeByHost returns the list of possible routes
       * {
          en.localhost:3000: 'en',
          per.localhost:3000: 'per',
          ps.localhost:3000: 'ps'
          }
        *  */
);

export function middleware(request: NextRequest) {
  const newUrl = new URL(request.url);
  // newURl = http://localhost:3000/

  if (
    ["/browserconfig.xml", "/manifest.json", "/robots.txt"].includes(
      request.nextUrl.pathname
    )
  ) {
    return NextResponse.next();
  }


  //? dont know what does this condition do 
  if (
    i18n.locales.some((locale) => newUrl.pathname.startsWith(`/${locale}/`))
  ) {
    newUrl.pathname.slice(3);

    return NextResponse.redirect(newUrl);
  }

  const locale =
    localeByHost[geRequestHost(request) ?? ""] ?? i18n.defaultLocale;

  // @todo Remove when catch-all ‘not found’ pages are implemented
  const existingPathnamePatterns = [/^\/$/, /^\/dashboard$/];
  if (
    !existingPathnamePatterns.some((pathnamePattern) =>
      pathnamePattern.test(newUrl.pathname)
    )
  ) {
    newUrl.pathname = `/${locale}/404`;

    return NextResponse.rewrite(newUrl, { status: 404 });
  }

  newUrl.pathname = `/${locale}${newUrl.pathname}`;
  // pathname = /per/

  // ? still don't know what does rewrite do
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|favicon/|images/).*)"],
};
