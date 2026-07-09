import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";

const STRINGS = {
  es: {
    title: "404: Página no encontrada",
    body: "Tal vez esta idea aún no ha sido producida... o quizás el cachicamo la enrolló y se la llevó.",
    back: "Volver al inicio",
  },
  en: {
    title: "404: Page not found",
    body: "Maybe this idea hasn't been produced yet... or maybe the cachicamo rolled it up and carried it off.",
    back: "Back to home",
  },
};

export default async function NotFound() {
  const h = await headers();
  const isEn = h.get("x-locale") === "en";
  const t = isEn ? STRINGS.en : STRINGS.es;
  const home = isEn ? "/en" : "/";

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#04474B",
        color: "#C0C0C0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Image
        src="/cachicamo-logo.png"
        alt="Cachicamo Studios"
        width={120}
        height={120}
        style={{ marginBottom: "2rem", opacity: 0.8 }}
      />
      <h1 style={{ fontSize: "3rem", color: "#D4AF37", marginBottom: "1rem" }}>
        {t.title}
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "500px", marginBottom: "2rem" }}>
        {t.body}
      </p>
      <Link
        href={home}
        style={{
          backgroundColor: "#D4AF37",
          color: "#04474B",
          padding: "0.75rem 1.5rem",
          textDecoration: "none",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        {t.back}
      </Link>
    </main>
  );
}
