export type ApiMoney = Readonly<{
  amount: number;
  currency: "TRY" | "USD" | "EUR";
}>;

export type ApiLocation = Readonly<{
  city: string;
  district: string;
}>;

export type ApiImage = Readonly<{
  src: string;
  alt: string;
}>;

// Simplified product shape, inspired by the Meshur public API docs.
// We model only what we need for the assessment UI.
export type ApiProduct = Readonly<{
  id: string;
  title: string;
  description: string;
  price: ApiMoney;
  location: ApiLocation;
  coverImage: ApiImage;
  updatedAt: string;
}>;

export type ApiListResponse<T> = Readonly<{
  data: readonly T[];
}>;





