import type { ApiProduct } from "@/data/meshur-api/product.api-types";
import type { Product } from "./product.types";

export function mapApiProductToProduct(api: ApiProduct): Product {
  return {
    id: api.id,
    title: api.title,
    description: api.description,
    price: api.price,
    locationLabel: `${api.location.city} / ${api.location.district}`,
    coverImage: api.coverImage,
    updatedAt: api.updatedAt,
  };
}





