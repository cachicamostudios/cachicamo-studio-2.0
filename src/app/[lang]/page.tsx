import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import HomeClient from "./HomeClient";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const prefix = lang === i18n.defaultLocale ? "" : `/${lang}`;

  return <HomeClient dict={dict.home} prefix={prefix} />;
}
