import "@/styles/globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import PrimaryLayout from "@/components/layout/PrimaryLayout";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://nextcare.life"),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  authors: [{ name: `${siteConfig.name} Team`, url: siteConfig.url }],
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/favicon/og_logo.png",
        width: 1200,
        height: 630,
        alt: "OpenGraph image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: "/favicon/og_logo.png",
    site: siteConfig.url,
    creator: siteConfig.name,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning={true}
      className={inter.className}
    >
      <head />
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div className="w-full light relative flex flex-col min-h-screen text-foreground bg-background">
              <PrimaryLayout>{children}</PrimaryLayout>
              <GoogleAnalytics gaId="G-9XLXTME5HQ" />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
