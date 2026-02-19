import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cachicamo Studios – Contenido, Ideas y Tecnología",
  description:
    "Agencia de creatividad, producción digital y tecnología. YouTube, Web3, blogs y branding con visión global.",
  metadataBase: new URL("https://cachicamo.studio"),
  openGraph: {
    title: "Cachicamo Studios",
    description:
      "Agencia de creatividad, producción digital y tecnología. YouTube, Web3, blogs y branding con visión global.",
    url: "https://cachicamo.studio",
    siteName: "Cachicamo Studios",
    images: [{ url: "/cachicamo-logo.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cachicamo Studios",
    description: "Agencia de creatividad, producción digital y tecnología.",
    images: ["/cachicamo-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
