import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "./QuoteForm";
import IaFloatButton from "./IaFloatButton";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

const SITE_URL = "https://cachicamo.studio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const path = lang === i18n.defaultLocale ? "/web" : `/${lang}/web`;
  return {
    title: dict.web.metaTitle,
    description: dict.web.metaDescription,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        es: `${SITE_URL}/web`,
        en: `${SITE_URL}/en/web`,
      },
    },
  };
}

export default async function WebPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const web = dict.web;
  const prefix = lang === i18n.defaultLocale ? "" : `/${lang}`;

  return (
    <div className="site-wrapper">
      <div className="dot-grid" aria-hidden="true" />

      {/* Back link */}
      <div className="web-back">
        <Link href={prefix || "/"} className="web-back-link">
          {web.back}
        </Link>
      </div>

      {/* Hero */}
      <section className="web-hero">
        <span className="web-hero-tag">{web.heroTag}</span>
        <h1 className="web-hero-title">{web.heroTitle}</h1>
        <IaFloatButton
          href={`${prefix}/ia`}
          label={web.iaLabel}
          ariaLabel={web.iaAria}
        />
      </section>

      {/* Manifesto */}
      <section className="web-manifesto">
        <p className="web-manifesto-label">{web.manifestoLabel}</p>
        <div className="web-manifesto-inner">
          {web.manifesto.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section className="web-showcase">
        <p className="web-showcase-title">{web.showcaseTitle}</p>
        <div className="web-grid">
          {web.sites.map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="web-card"
            >
              <div className="browser-chrome">
                <div className="browser-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="browser-url">{site.displayUrl}</div>
              </div>
              <div className="browser-screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    site.image ??
                    `https://api.microlink.io/?url=${encodeURIComponent(site.url)}&screenshot=true&meta=false&embed=screenshot.url`
                  }
                  alt={`${web.previewAltPrefix}${site.name}`}
                  loading="lazy"
                />
              </div>
              <div className="web-card-info">
                <span className="web-card-type">[{site.type}]</span>
                <h3 className="web-card-name">{site.name}</h3>
                <p className="web-card-desc">{site.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Formulario de presupuesto */}
      <section className="web-cta">
        <div className="web-cta-logo-bg" aria-hidden="true">
          <Image
            src="/cachicamo-logo.png"
            alt=""
            width={480}
            height={480}
            className="hero-logo-ghost"
            draggable={false}
          />
        </div>
        <p className="web-showcase-title">{web.ctaLabel}</p>
        <h2 className="web-cta-title">{web.ctaTitle}</h2>
        <QuoteForm dict={dict.form} lang={lang} />
      </section>
    </div>
  );
}
