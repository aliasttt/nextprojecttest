import { getProductById, listProducts } from "@/data/meshur-api/products.client";
import { mapApiProductToProduct } from "@/domain/product/product.mappers";
import type { Product } from "@/domain/product/product.types";

/**
 * Product service (UI-facing)
 * - Encapsulates data access + mapping.
 * - Keeps pages/components free of API shape knowledge and mapping logic.
 */
export async function getProducts(): Promise<readonly Product[]> {
  const api = await listProducts();
  return api.data.map(mapApiProductToProduct);
}

export async function getProduct(productId: string): Promise<Product | null> {
  const api = await getProductById(productId);
  return api ? mapApiProductToProduct(api) : null;
}




