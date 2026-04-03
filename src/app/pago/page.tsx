"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";

const PLANS: Record<string, { name: string; hours: [number, number]; rate: number }> = {
  landing:      { name: "Landing Page", hours: [20, 25], rate: 45 },
  personal:     { name: "Personal",     hours: [35, 40], rate: 45 },
  branding:     { name: "Branding",     hours: [40, 48], rate: 45 },
  profesional:  { name: "Profesional",  hours: [48, 55], rate: 45 },
  ecommerce:    { name: "E-commerce",   hours: [60, 75], rate: 45 },
};

function PagoContent() {
  const params = useSearchParams();
  const planKey = params.get("plan");
  const email = params.get("email") ?? "";
  const nombre = params.get("nombre") ?? "";
  const cancelado = params.get("cancelado");

  const plan = planKey ? PLANS[planKey] : null;

  const [montoCustom, setMontoCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const depositMin = plan ? plan.hours[0] * plan.rate * 0.5 : 0;
  const depositMax = plan ? plan.hours[1] * plan.rate * 0.5 : 0;

  async function handlePay(monto?: number) {
    setLoading(true);
    setError("");

    const body: Record<string, string | number> = {};
    if (monto) {
      body.monto = monto;
    } else if (plan && planKey) {
      body.plan = planKey;
    } else if (montoCustom && Number(montoCustom) > 0) {
      body.monto = Number(montoCustom);
    } else {
      setError("Indica un monto o selecciona un plan.");
      setLoading(false);
      return;
    }
    if (email) body.email = email;
    if (nombre) body.nombre = nombre;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      setError(data.error ?? "Error al crear la sesión de pago.");
      setLoading(false);
    }
  }

  return (
    <>
    <div className="dot-grid" aria-hidden />
    <div className="site-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>

      <Link href="/" style={{ marginBottom: "2rem", fontSize: "12px", letterSpacing: "0.15em", color: "var(--gold)", textTransform: "uppercase" as const }}>
        Cachicamo Studios
      </Link>

      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--line)",
        borderRadius: "16px",
        padding: "2.5rem 2rem",
        maxWidth: "480px",
        width: "100%",
      }}>

        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem", textAlign: "center" }}>
          Pago de Servicios
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", textAlign: "center", marginBottom: "2rem" }}>
          Completa tu pago de forma segura con Stripe
        </p>

        {cancelado && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", padding: "12px 16px", marginBottom: "1.5rem", fontSize: "0.875rem", color: "#fca5a5" }}>
            Pago cancelado. Puedes intentarlo de nuevo.
          </div>
        )}

        {nombre && (
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
            Cliente: <strong style={{ color: "var(--ink)" }}>{nombre}</strong>
          </p>
        )}

        {plan ? (
          <>
            <div style={{
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: "10px",
              padding: "1.25rem",
              marginBottom: "1.5rem",
            }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--gold)", textTransform: "uppercase" as const, marginBottom: "0.5rem" }}>
                Plan seleccionado
              </p>
              <p style={{ fontSize: "1.25rem", fontWeight: 700 }}>{plan.name}</p>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                {plan.hours[0]}–{plan.hours[1]} horas &middot; ${plan.hours[0] * plan.rate}–${plan.hours[1] * plan.rate} USD
              </p>
              <div style={{ borderTop: "1px solid var(--line)", marginTop: "1rem", paddingTop: "1rem" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                  Deposito 50%
                </p>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--gold)" }}>
                  ${depositMin.toLocaleString()}–${depositMax.toLocaleString()} USD
                </p>
              </div>
            </div>

            <button
              onClick={() => handlePay()}
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#a08520" : "var(--gold)",
                color: "#000",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: loading ? "wait" : "pointer",
                letterSpacing: "0.02em",
              }}
            >
              {loading ? "Redirigiendo a Stripe..." : `Pagar depósito $${depositMin.toLocaleString()} USD`}
            </button>
          </>
        ) : (
          <>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--muted)" }}>
              Monto a pagar (USD)
            </label>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                value={montoCustom}
                onChange={(e) => setMontoCustom(e.target.value)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "var(--ink)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  outline: "none",
                }}
              />
              <span style={{ display: "flex", alignItems: "center", color: "var(--muted)", fontWeight: 600 }}>USD</span>
            </div>

            <button
              onClick={() => handlePay()}
              disabled={loading || !montoCustom}
              style={{
                width: "100%",
                background: loading || !montoCustom ? "#a08520" : "var(--gold)",
                color: "#000",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: loading ? "wait" : "pointer",
                letterSpacing: "0.02em",
                opacity: !montoCustom ? 0.5 : 1,
              }}
            >
              {loading ? "Redirigiendo a Stripe..." : "Pagar ahora"}
            </button>
          </>
        )}

        {error && (
          <p style={{ color: "#fca5a5", fontSize: "0.875rem", marginTop: "1rem", textAlign: "center" }}>
            {error}
          </p>
        )}

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            Pago procesado de forma segura por Stripe.
            <br />Tus datos financieros nunca pasan por nuestros servidores.
          </p>
        </div>
      </div>

      <Link href="/" style={{ marginTop: "2rem", fontSize: "0.875rem", color: "var(--muted)" }}>
        &larr; Volver a cachicamo.studio
      </Link>
    </div>
    </>
  );
}

export default function PagoPage() {
  return (
    <Suspense>
      <PagoContent />
    </Suspense>
  );
}
