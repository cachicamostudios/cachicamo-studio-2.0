import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pago confirmado | Cachicamo Studios",
  robots: "noindex",
};

export default function ConfirmacionPage() {
  return (
    <>
      <div className="dot-grid" aria-hidden />
      <div className="site-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", textAlign: "center" }}>

        <Link href="/" style={{ marginBottom: "2rem", fontSize: "12px", letterSpacing: "0.15em", color: "var(--gold)", textTransform: "uppercase" }}>
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
            Pago recibido
          </h1>

          <p style={{ color: "var(--muted)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Gracias por tu confianza. Hemos recibido tu pago correctamente.
            <br />
            Te enviaremos un correo de confirmación con los próximos pasos.
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
            <strong style={{ color: "var(--gold)" }}>Próximos pasos:</strong>
            <br />
            Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para comenzar el proyecto.
          </div>

          <Link
            href="/"
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
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}
