"use client";

import { useEffect } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";
import { en } from "@/i18n/dictionaries";
import { ThemeSync } from "@/components/organisms/ThemeSync";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useThemeStore } from "@/stores/useThemeStore";

export function StoryProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    // Keep stories deterministic across reloads.
    useFavoritesStore.setState({ ids: [], byId: {} });
    useThemeStore.setState({ theme: "light" });
    try {
      window.localStorage.removeItem("favorites");
      window.localStorage.removeItem("theme");
    } catch {}
  }, []);

  return (
    <I18nProvider locale="en" dict={en}>
      <ThemeSync />
      {children}
    </I18nProvider>
  );
}


