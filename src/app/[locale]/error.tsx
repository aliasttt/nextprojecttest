"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { useI18n } from "@/i18n/I18nProvider";

export default function Error({
  error,
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  const { dict } = useI18n();

  useEffect(() => {
    // In a real app we'd report to Sentry/Datadog here.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {dict.errors.unexpectedTitle}
      </h1>
      <Button onClick={reset} type="button" variant="primary">
        {dict.errors.unexpectedCta}
      </Button>
    </main>
  );
}


