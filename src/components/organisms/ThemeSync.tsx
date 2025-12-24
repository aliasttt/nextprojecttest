"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/useThemeStore";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";
}

export function ThemeSync() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const applied = theme === "system" ? getSystemTheme() : theme;
    const root = document.documentElement;
    root.classList.toggle("dark", applied === "dark");
  }, [theme]);

  return null;
}


