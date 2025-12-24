import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

type ThemeState = Readonly<{
  theme: Theme;
}>;

type ThemeActions = Readonly<{
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}>;

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const current = get().theme;
        const next = current === "dark" ? "light" : "dark";
        set({ theme: next });
      },
    }),
    {
      name: "theme",
      version: 1,
    },
  ),
);




