import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return { title: dict.confirmacion.metaTitle, robots: "noindex" };
}

export default async function ConfirmacionPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const c = dict.confirmacion;
  const prefix = lang === i18n.defaultLocale ? "" : `/${lang}`;
  const home = prefix || "/";

  return (
    <>
      <div className="dot-grid" aria-hidden />
      <div className="site-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", textAlign: "center" }}>

        <Link href={home} style={{ marginBottom: "2rem", fontSize: "12px", letterSpacing: "0.15em", color: "var(--gold)", textTransform: "uppercase" }}>
          Cachicamo Studios
        </Link>

        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--line)",
          borderRadius: "16px",
          padding: "3rem 2rem",
          maxWidth: "480px",
          width: "100%",
        }}>

          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&#10003;</div>

          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            {c.title}
          </h1>

          <p style={{ color: "var(--muted)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            {c.body1}
            <br />
            {c.body2}
          </p>

          <div style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: "10px",
            padding: "1rem 1.25rem",
            marginBottom: "2rem",
            fontSize: "0.875rem",
            color: "var(--muted)",
          }}>
            <strong style={{ color: "var(--gold)" }}>{c.nextTitle}</strong>
            <br />
            {c.nextBody}
          </div>

          <Link
            href={home}
            style={{
              display: "inline-block",
              background: "var(--gold)",
              color: "#000",
              padding: "14px 32px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.9375rem",
              letterSpacing: "0.02em",
            }}
          >
            {c.back}
          </Link>
        </div>
      </div>
    </>
  );
}
