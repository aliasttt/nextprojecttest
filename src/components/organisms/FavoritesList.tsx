"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/domain/product/product.types";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useI18n } from "@/i18n/I18nProvider";
import { ProductCard } from "@/components/organisms/ProductCard";

export function FavoritesList({ products }: Readonly<{ products: readonly Product[] }>) {
  const { locale, dict } = useI18n();
  const favoriteIds = useFavoritesStore((s) => s.ids);

  const favorites = useMemo(() => {
    const set = new Set(favoriteIds);
    return products.filter((p) => set.has(p.id));
  }, [favoriteIds, products]);

  if (favorites.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        {dict.favorites.empty}
      </p>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence>
        {favorites.map((p) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            <ProductCard product={p} locale={locale} dict={dict} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}


