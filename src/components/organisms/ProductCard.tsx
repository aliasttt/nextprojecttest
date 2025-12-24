import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/domain/product/product.types";
import { formatCurrency } from "@/lib/format/format-currency";
import { FavoriteButton } from "@/components/molecules/FavoriteButton";

export function ProductCard({
  product,
  locale,
  dict,
}: Readonly<{ product: Product; locale: Locale; dict: Dictionary }>) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={product.coverImage.src}
          alt={product.coverImage.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={false}
        />
        <div className="absolute right-3 top-3">
          <FavoriteButton productId={product.id} />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h2 className="line-clamp-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {product.title}
        </h2>
        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
          {product.description}
        </p>

        <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {dict.product.price}
            </dt>
            <dd className="font-semibold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(product.price.amount, product.price.currency, locale)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {dict.product.location}
            </dt>
            <dd className="text-zinc-700 dark:text-zinc-200">
              {product.locationLabel}
            </dd>
          </div>
        </dl>

        <Link
          href={`/${locale}/products/${product.id}`}
          className="mt-3 inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {dict.product.viewDetails}
        </Link>
      </div>
    </article>
  );
}




