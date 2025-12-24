import type { Locale } from "./locales";
import type { Dictionary } from "./dictionaries/schema";
import { en } from "./dictionaries";

export type { Dictionary } from "./dictionaries/schema";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "en":
      return en;
    case "tr": {
      const mod = await import("./tr.json");
      return mod.default as Dictionary;
    }
    default: {
      // Exhaustive check (keeps TS honest if we add new locales).
      const _never: never = locale;
      return _never;
    }
  }
}


