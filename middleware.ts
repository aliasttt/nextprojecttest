import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["en", "tr"] as const;
const DEFAULT_LOCALE = "en";

function isLocale(value: string): value is (typeof LOCALES)[number] {
  return (LOCALES as readonly string[]).includes(value);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next internals and public files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  // Root -> default locale
  if (!maybeLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  // Unknown first segment -> treat as missing locale and prefix.
  if (!isLocale(maybeLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Persist locale for root layout `<html lang>` (nested layouts can't set <html>).
  const response = NextResponse.next();
  response.cookies.set("NEXT_LOCALE", maybeLocale, { path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};




