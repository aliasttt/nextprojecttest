export type Money = Readonly<{
  amount: number;
  currency: "TRY" | "USD" | "EUR";
}>;

export type Product = Readonly<{
  id: string;
  title: string;
  description: string;
  price: Money;
  locationLabel: string;
  coverImage: Readonly<{
    src: string;
    alt: string;
  }>;
  updatedAt: string;
}>;




