"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getDictionarySync } from "@/i18n/get-dictionary-sync";

function getLocaleFromDocumentCookie(): "en" | "tr" {
  try {
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
    const value = match?.[1];
    return value === "tr" ? "tr" : "en";
  } catch {
    return "en";
  }
}

export default function GlobalError({
  error,
}: Readonly<{ error: Error & { digest?: string } }>) {
  const locale = getLocaleFromDocumentCookie();
  const dict = getDictionarySync(locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang={locale}>
      <body>
        <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dict.errors.unexpectedTitle}
          </h1>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            {dict.errors.notFoundCta}
          </Link>
        </main>
      </body>
    </html>
  );
}


