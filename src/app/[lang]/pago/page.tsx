import type { Metadata } from "next";
import { Suspense } from "react";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import PagoClient from "./PagoClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return { title: dict.pago.metaTitle };
}

export default async function PagoPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const prefix = lang === i18n.defaultLocale ? "" : `/${lang}`;

  return (
    <Suspense>
      <PagoClient dict={dict.pago} home={prefix || "/"} lang={lang} />
    </Suspense>
  );
}
