"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/domain/product/product.types";

const FavoritesList = dynamic(
  () => import("./FavoritesList").then((m) => m.FavoritesList),
  { ssr: false },
);

export function FavoritesClient({ products }: Readonly<{ products: readonly Product[] }>) {
  return <FavoritesList products={products} />;
}





