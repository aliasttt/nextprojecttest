import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeInitScript } from "@/components/organisms/ThemeInitScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getLocaleFromCookie(): Promise<string> {
  // Set by `middleware.ts` to keep `<html lang>` correct even though locale lives in a route segment.
  // Falls back to `en` to keep markup stable.
  const store = await cookies();
  const value = store.get("NEXT_LOCALE")?.value;
  return value ?? "en";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleFromCookie();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeInitScript />
        {children}
      </body>
    </html>
  );
}
