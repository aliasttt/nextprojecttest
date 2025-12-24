import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";
import { listProducts } from "@/data/meshur-api/products.client";
import { LOCALES } from "@/i18n/locales";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const products = await listProducts();

  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    { url: `${base}/${locale}`, changeFrequency: "daily" as const, priority: 1 },
    {
      url: `${base}/${locale}/favorites`,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    },
  ]);

  const productRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    products.data.map((p) => ({
      url: `${base}/${locale}/products/${p.id}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
      lastModified: new Date(p.updatedAt),
    })),
  );

  return [...staticRoutes, ...productRoutes];
}


