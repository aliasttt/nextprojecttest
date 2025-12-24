"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";
import { LOCALES, type Locale } from "@/i18n/locales";

function swapLocale(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${nextLocale}`;
  segments[0] = nextLocale;
  return `/${segments.join("/")}`;
}

export function LocaleSwitcher() {
  const { dict, locale } = useI18n();
  const pathname = usePathname() ?? "/";
  const other = LOCALES.find((l) => l !== locale) ?? "en";

  return (
    <Link
      href={swapLocale(pathname, other)}
      className="inline-flex h-10 items-center rounded-xl bg-zinc-100 px-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      aria-label={dict.common.switchLocale}
    >
      {locale.toUpperCase()} → {other.toUpperCase()}
    </Link>
  );
}





