export type Dictionary = Readonly<{
  common: Readonly<{
    appName: string;
    toggleTheme: string;
    switchLocale: string;
  }>;
  nav: Readonly<{
    home: string;
    favorites: string;
  }>;
  home: Readonly<{
    title: string;
  }>;
  product: Readonly<{
    addToFavorites: string;
    removeFromFavorites: string;
    price: string;
    viewDetails: string;
    location: string;
  }>;
  favorites: Readonly<{
    title: string;
    empty: string;
  }>;
  errors: Readonly<{
    notFoundTitle: string;
    notFoundCta: string;
    unexpectedTitle: string;
    unexpectedCta: string;
  }>;
}>;





