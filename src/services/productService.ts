import { getProductById, listProducts } from "@/data/meshur-api/products.client";
import { mapApiProductToProduct } from "@/domain/product/product.mappers";
import type { Product } from "@/domain/product/product.types";
import type { Locale } from "@/i18n/locales";

/**
 * Product service (UI-facing)
 * - Encapsulates data access + mapping.
 * - Keeps pages/components free of API shape knowledge and mapping logic.
 */
export async function getProducts(): Promise<readonly Product[]> {
  // Backwards-compatible default for callers that don't pass locale.
  const api = await listProducts("en");
  return api.data.map(mapApiProductToProduct);
}

export async function getProductsByLocale(
  locale: Locale,
): Promise<readonly Product[]> {
  const api = await listProducts(locale);
  return api.data.map(mapApiProductToProduct);
}

export async function getProduct(productId: string): Promise<Product | null> {
  // Backwards-compatible default for callers that don't pass locale.
  const api = await getProductById(productId, "en");
  return api ? mapApiProductToProduct(api) : null;
}

export async function getProductByLocale(
  productId: string,
  locale: Locale,
): Promise<Product | null> {
  const api = await getProductById(productId, locale);
  return api ? mapApiProductToProduct(api) : null;
}





