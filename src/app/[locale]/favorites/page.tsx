import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/get-dictionary";
import { FavoritesClient } from "@/components/organisms/FavoritesClient";
import { getProductsByLocale } from "@/services/productService";
import { PageContainer } from "@/components/templates/PageContainer";

type Props = Readonly<{
  params: Promise<{ locale: Locale }>;
}>;

// Rendering strategy: SSG
// - Favorites are user-specific (stored client-side), so the server only renders a stable shell.
// - Static generation keeps this route extremely fast, and the client hydrates the personalized list.
export const dynamic = "force-static";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.favorites.title,
    openGraph: { title: dict.favorites.title, locale },
    twitter: { card: "summary", title: dict.favorites.title },
  };
}

export default async function FavoritesPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const products = await getProductsByLocale(locale);

  return (
    <PageContainer>
      <h1 className="text-pretty text-2xl font-semibold tracking-tight">
        {dict.favorites.title}
      </h1>
      <div className="mt-6">
        <FavoritesClient products={products} />
      </div>
    </PageContainer>
  );
}


