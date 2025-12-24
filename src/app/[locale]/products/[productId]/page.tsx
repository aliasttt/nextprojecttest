import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/get-dictionary";
import { formatCurrency } from "@/lib/format/format-currency";
import { FavoriteButton } from "@/components/molecules/FavoriteButton";
import { getProduct } from "@/services/productService";
import { PageContainer } from "@/components/templates/PageContainer";

type Props = Readonly<{
  params: Promise<{ locale: Locale; productId: string }>;
}>;

// Rendering strategy: SSR
// - Product detail can change frequently (price/availability).
// - SSR guarantees the freshest data per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, productId } = await params;
  const dict = await getDictionary(locale);
  const product = await getProduct(productId);
  if (!product) return {};

  const title = `${product.title} · ${dict.common.appName}`;
  const description = product.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: product.coverImage.src, alt: product.coverImage.alt }],
      locale,
      // Next.js Metadata typing doesn't include "product" for OpenGraph.
      // We still provide Product schema.org JSON-LD on the page for richer semantics.
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.coverImage.src],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, productId } = await params;
  const dict = await getDictionary(locale);
  const product = await getProduct(productId);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: [product.coverImage.src],
    offers: {
      "@type": "Offer",
      priceCurrency: product.price.currency,
      price: product.price.amount,
      availability: "https://schema.org/InStock",
      url: `/${locale}/products/${product.id}`,
    },
  };

  return (
    <PageContainer>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <Image
            src={product.coverImage.src}
            alt={product.coverImage.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
          <div className="absolute right-3 top-3">
            <FavoriteButton productId={product.id} />
          </div>
        </div>

        <section className="flex flex-col gap-4">
          <h1 className="text-pretty text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {product.title}
          </h1>
          <p className="text-base text-zinc-700 dark:text-zinc-200">
            {product.description}
          </p>

          <dl className="mt-2 grid grid-cols-2 gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div>
              <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {dict.product.price}
              </dt>
              <dd className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
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
        </section>
      </div>
    </PageContainer>
  );
}


