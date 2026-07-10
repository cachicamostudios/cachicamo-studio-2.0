import type { Metadata } from "next";
import Link from "next/link";
import IaSearch, { type IaProject } from "./IaSearch";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const SITE_URL = "https://cachicamo.studio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const path = lang === i18n.defaultLocale ? "/ia" : `/${lang}/ia`;
  return {
    title: dict.ia.metaTitle,
    description: dict.ia.metaDescription,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        es: `${SITE_URL}/ia`,
        en: `${SITE_URL}/en/ia`,
      },
    },
  };
}

export default async function IaPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const ia = dict.ia;
  const prefix = lang === i18n.defaultLocale ? "" : `/${lang}`;
  const projects = ia.projects as unknown as IaProject[];

  return (
    <div className="site-wrapper">
      <div className="dot-grid" aria-hidden="true" />

      {/* Back */}
      <div className="web-back">
        <Link href={prefix || "/"} className="web-back-link">
          {ia.back}
        </Link>
        <LanguageSwitcher currentLocale={lang} />
      </div>

      {/* Hero */}
      <section className="ia-hero">
        <div className="ia-hero-badge">
          <span className="ia-badge-dot" />
          <span>
            {projects.length} {ia.badgeProjects}
          </span>
          <span className="ia-badge-sep">·</span>
          <span>{ia.badgeUpdated}</span>
        </div>

        <h1 className="ia-hero-title">
          <span className="ia-title-line1">{ia.titleLine1}</span>
          <span className="ia-title-line2">{ia.titleLine2}</span>
        </h1>

        <p className="ia-hero-sub">{ia.sub}</p>

        {/* Search + filters + grid */}
        <IaSearch
          projects={projects}
          categories={ia.categories}
          statusLabels={ia.statusLabels}
          searchPlaceholder={ia.searchPlaceholder}
          empty={ia.empty}
          visitPrefix={ia.visitPrefix}
          githubLabel={ia.githubLabel}
          githubAria={ia.githubAria}
        />
      </section>
    </div>
  );
}
