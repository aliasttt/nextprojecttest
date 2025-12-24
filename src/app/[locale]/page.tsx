import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { getProductsByLocale } from "@/services/productService";
import { PageContainer } from "@/components/templates/PageContainer";

type Props = Readonly<{
  params: Promise<{ locale: Locale }>;
}>;

// Rendering strategy: ISR
// - Product lists change over time.
// - ISR gives us fast, cached pages with periodic refresh without a full rebuild.
export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.home.title,
    openGraph: { title: dict.home.title, locale },
    twitter: { card: "summary", title: dict.home.title },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const products = await getProductsByLocale(locale);

  return (
    <PageContainer>
      <h1 className="text-pretty text-2xl font-semibold tracking-tight">
        {dict.home.title}
      </h1>
      <div className="mt-6">
        <ProductGrid products={products} locale={locale} dict={dict} />
      </div>
    </PageContainer>
  );
}


