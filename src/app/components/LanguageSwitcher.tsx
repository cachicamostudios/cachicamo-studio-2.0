"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n-config";

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const pathname = usePathname() || "/";
  // Strip a leading /en to get the locale-agnostic path.
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const esHref = bare;
  const enHref = bare === "/" ? "/en" : `/en${bare}`;

  const base: React.CSSProperties = {
    fontSize: "12px",
    letterSpacing: "0.08em",
    textDecoration: "none",
    padding: "2px 6px",
    borderRadius: "4px",
    transition: "color 0.2s ease, background-color 0.2s ease",
  };
  const active: React.CSSProperties = {
    ...base,
    color: "#04474B",
    background: "#D4AF37",
    fontWeight: 700,
  };
  const idle: React.CSSProperties = {
    ...base,
    color: "#D4AF37",
    background: "transparent",
  };

  return (
    <nav
      aria-label="Language"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        zIndex: 100,
        display: "flex",
        gap: "4px",
        alignItems: "center",
        mixBlendMode: "difference",
      }}
    >
      <Link href={esHref} hrefLang="es" style={currentLocale === "es" ? active : idle}>
        ES
      </Link>
      <Link href={enHref} hrefLang="en" style={currentLocale === "en" ? active : idle}>
        EN
      </Link>
    </nav>
  );
}
