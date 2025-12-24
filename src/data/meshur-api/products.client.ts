import type { ApiListResponse, ApiProduct } from "./product.api-types";
import productsJson from "@/data/products.json";

type ProductsJson = ApiListResponse<ApiProduct>;

function getMockProducts(): ProductsJson {
  return productsJson as ProductsJson;
}

export async function listProducts(): Promise<ApiListResponse<ApiProduct>> {
  // Mock API: in real life we'd call the REST API with fetch() and proper caching/retries.
  return getMockProducts();
}

export async function getProductById(
  productId: string,
): Promise<ApiProduct | null> {
  const { data } = getMockProducts();
  return data.find((p) => p.id === productId) ?? null;
}


