import type { ApiListResponse, ApiProduct } from "./product.api-types";
import type { Locale } from "@/i18n/locales";
import productsEnJson from "@/data/products.en.json";
import productsTrJson from "@/data/products.tr.json";

type ProductsJson = ApiListResponse<ApiProduct>;

function getMockProducts(locale: Locale): ProductsJson {
  // Locale-aware mock data to keep the UI fully translated.
  const json = locale === "tr" ? productsTrJson : productsEnJson;
  return json as ProductsJson;
}

export async function listProducts(
  locale: Locale,
): Promise<ApiListResponse<ApiProduct>> {
  // Mock API: in real life we'd call the REST API with fetch() and proper caching/retries.
  return getMockProducts(locale);
}

export async function getProductById(
  productId: string,
  locale: Locale,
): Promise<ApiProduct | null> {
  const { data } = getMockProducts(locale);
  return data.find((p) => p.id === productId) ?? null;
}


