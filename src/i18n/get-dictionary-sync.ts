import type { Locale } from "./locales";
import type { Dictionary } from "./dictionaries/schema";
import { en, tr } from "./dictionaries";

export function getDictionarySync(locale: Locale): Dictionary {
  switch (locale) {
    case "en":
      return en;
    case "tr":
      return tr;
    default: {
      const _never: never = locale;
      return _never;
    }
  }
}


