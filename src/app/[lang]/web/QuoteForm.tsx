"use client";

import { useState } from "react";
import type { Dictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";

type Status = "idle" | "sending" | "success" | "error";

export default function QuoteForm({
  dict,
  lang,
}: {
  dict: Dictionary["form"];
  lang: Locale;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    tipo: "web",
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
        body: JSON.stringify({ ...form, lang }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="quote-success">
        <p className="quote-success-title">{dict.successTitle}</p>
        <p className="quote-success-sub">{dict.successSub}</p>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} noValidate>
      <div className="quote-row">
        <div className="quote-field">
          <label htmlFor="nombre">{dict.nombreLabel}</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder={dict.nombrePlaceholder}
          />
        </div>
        <div className="quote-field">
          <label htmlFor="email">{dict.emailLabel}</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder={dict.emailPlaceholder}
          />
        </div>
      </div>

      <div className="quote-field">
        <label htmlFor="tipo">{dict.servicioLabel}</label>
        <select id="tipo" name="tipo" value={form.tipo} disabled>
          <option value="web">{dict.servicioOption}</option>
        </select>
      </div>

      <div className="quote-field">
        <label htmlFor="descripcion">{dict.descripcionLabel}</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
          rows={4}
          placeholder={dict.descripcionPlaceholder}
        />
      </div>

      {status === "error" && <p className="quote-error">{dict.error}</p>}

      <button type="submit" className="btn-primary" disabled={status === "sending"}>
        {status === "sending" ? dict.sending : dict.submit}
      </button>
    </form>
  );
}
