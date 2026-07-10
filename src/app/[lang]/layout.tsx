import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://cachicamo.studio";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const m = dict.metadata.site;
  const path = lang === i18n.defaultLocale ? "" : `/${lang}`;

  return {
    title: m.title,
    description: m.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        es: SITE_URL,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: "Cachicamo Studios",
      description: m.description,
      url: `${SITE_URL}${path}`,
      siteName: "Cachicamo Studios",
      images: [{ url: "/cachicamo-logo.png" }],
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Cachicamo Studios",
      description: m.description,
      images: ["/cachicamo-logo.png"],
    },
    other: {
      "msvalidate.01": "9C3CFFDF04A52C3D19D5C21FBAC2E67A",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
