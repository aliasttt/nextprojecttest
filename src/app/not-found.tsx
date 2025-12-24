"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionarySync } from "@/i18n/get-dictionary-sync";
import { isLocale, type Locale } from "@/i18n/locales";

function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const maybe = segments[0] ?? "en";
  return isLocale(maybe) ? maybe : "en";
}

export default function NotFound() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPath(pathname);
  const dict = getDictionarySync(locale);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {dict.errors.notFoundTitle}
      </h1>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {dict.errors.notFoundCta}
      </Link>
    </main>
  );
}




