import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/domain/product/product.types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  locale,
  dict,
}: Readonly<{ products: readonly Product[]; locale: Locale; dict: Dictionary }>) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
      ))}
    </section>
  );
}




