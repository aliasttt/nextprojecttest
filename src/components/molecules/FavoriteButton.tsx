"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { IconButton } from "../atoms/IconButton";

function HeartIcon({ filled }: Readonly<{ filled: boolean }>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function FavoriteButton({ productId }: Readonly<{ productId: string }>) {
  const { dict } = useI18n();
  const isFav = useFavoritesStore((s) => Boolean(s.byId[productId]));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <IconButton
      type="button"
      aria-label={
        isFav ? dict.product.removeFromFavorites : dict.product.addToFavorites
      }
      onClick={() => toggle(productId)}
      className={isFav ? "text-rose-600 dark:text-rose-400" : ""}
    >
      <HeartIcon filled={isFav} />
    </IconButton>
  );
}


