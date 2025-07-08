// src/app/not-found.tsx
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
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
        404: Página no encontrada
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "500px", marginBottom: "2rem" }}>
        Tal vez esta idea aún no ha sido producida... o quizás el cachicamo la enrolló y se la llevó.
      </p>
      <Link
        href="/"
        style={{
          backgroundColor: "#D4AF37",
          color: "#04474B",
          padding: "0.75rem 1.5rem",
          textDecoration: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease",
        }}
      >
        Volver al inicio
      </Link>
    </main>
  );
}

