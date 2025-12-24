import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, LOCALES } from "@/i18n/locales";
import { I18nProvider } from "@/i18n/I18nProvider";
import { ThemeSync } from "@/components/organisms/ThemeSync";
import { Header } from "@/components/organisms/Header";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);
  const title = dict.common.appName;

  return {
    title,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <ThemeSync />
      <Header />
      {children}
    </I18nProvider>
  );
}


