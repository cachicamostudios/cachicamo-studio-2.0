"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    tipo: "personal",
    descripcion: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="quote-success">
        <p className="quote-success-title">¡Mensaje recibido!</p>
        <p className="quote-success-sub">
          Te confirmamos por email. Si quieres avanzar más rápido, agenda una llamada con nosotros.
        </p>
        <a
          href="https://cal.com/cachicamostudios/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          data-cal-namespace="30min"
          data-cal-link="cachicamostudios/30min"
        >
          agendar llamada →
        </a>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} noValidate>
      <div className="quote-row">
        <div className="quote-field">
          <label htmlFor="nombre">nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
          />
        </div>
        <div className="quote-field">
          <label htmlFor="email">email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="quote-field">
        <label htmlFor="tipo">tipo de proyecto</label>
        <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="personal">personal</option>
          <option value="branding">branding</option>
          <option value="profesional">profesional</option>
        </select>
      </div>

      <div className="quote-field">
        <label htmlFor="descripcion">cuéntanos tu proyecto</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
          rows={4}
          placeholder="¿Qué tienes en mente?"
        />
      </div>

      {status === "error" && (
        <p className="quote-error">Algo salió mal. Inténtalo de nuevo.</p>
      )}

      <button type="submit" className="btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "enviando..." : "charlemos →"}
      </button>
    </form>
  );
}
