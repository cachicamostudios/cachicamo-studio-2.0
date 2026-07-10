"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n-config";

export default function LanguageSwitcher({
  currentLocale,
  className = "",
}: {
  currentLocale: Locale;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  // Strip a leading /en to get the locale-agnostic path.
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const esHref = bare;
  const enHref = bare === "/" ? "/en" : `/en${bare}`;

  return (
    <div className={`lang-switch ${className}`.trim()}>
      <Link
        href={esHref}
        hrefLang="es"
        aria-current={currentLocale === "es" ? "true" : undefined}
        className={`lang-opt${currentLocale === "es" ? " lang-opt--active" : ""}`}
      >
        ES
      </Link>
      <span className="lang-sep" aria-hidden="true">
        /
      </span>
      <Link
        href={enHref}
        hrefLang="en"
        aria-current={currentLocale === "en" ? "true" : undefined}
        className={`lang-opt${currentLocale === "en" ? " lang-opt--active" : ""}`}
      >
        EN
      </Link>
    </div>
  );
}
