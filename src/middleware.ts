import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n-config";

// Default locale (es) is served at the root with no prefix; `en` is prefixed.
//   /            -> rewrite to /es        (URL stays /)
//   /web         -> rewrite to /es/web    (URL stays /web)
//   /en, /en/... -> served as-is by the [lang] segment
//   /es, /es/... -> redirect to the unprefixed canonical URL
// The resolved locale is forwarded as an `x-locale` request header so server
// components without params (e.g. not-found.tsx) can read it.
function withLocaleHeader(req: NextRequest, locale: string) {
  const headers = new Headers(req.headers);
  headers.set("x-locale", locale);
  return headers;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  if (isEn) {
    return NextResponse.next({
      request: { headers: withLocaleHeader(req, "en") },
    });
  }

  const isEs = pathname === "/es" || pathname.startsWith("/es/");
  if (isEs) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/es/, "") || "/";
    return NextResponse.redirect(url);
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${i18n.defaultLocale}${pathname}`;
  return NextResponse.rewrite(url, {
    request: { headers: withLocaleHeader(req, i18n.defaultLocale) },
  });
}

export const config = {
  // Skip API routes, Next internals and any file with an extension
  // (favicon, images, sitemap.xml, robots.txt, manifest, …).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
