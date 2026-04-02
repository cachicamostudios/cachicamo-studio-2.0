import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM!;
const TO = process.env.RESEND_TO ?? "info@cachicamo.studio";

const RATE = 45;

const PLANS = [
  { name: "Landing Page", hours: [20, 25] as const },
  { name: "Personal", hours: [35, 40] as const },
  { name: "Branding", hours: [40, 48] as const },
  { name: "Profesional", hours: [48, 55] as const },
  { name: "E-commerce", hours: [60, 75] as const },
];

function buildPricingTable() {
  const rows = PLANS.map((p) => {
    const min = (p.hours[0] * RATE).toLocaleString("en-US");
    const max = (p.hours[1] * RATE).toLocaleString("en-US");
    return `
      <tr>
        <td style="padding:10px 16px;font-size:14px;color:#FFFFFF;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.06)">${p.name}</td>
        <td style="padding:10px 16px;font-size:13px;color:#9CA3AF;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06)">${p.hours[0]} – ${p.hours[1]}h</td>
        <td style="padding:10px 16px;font-size:14px;color:#D4AF37;text-align:right;font-weight:700;border-bottom:1px solid rgba(255,255,255,0.06)">$${min} – $${max}</td>
      </tr>`;
  }).join("");

  return `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:10px 16px;font-size:11px;letter-spacing:0.1em;color:#D4AF37;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.1)">Tipo</td>
        <td style="padding:10px 16px;font-size:11px;letter-spacing:0.1em;color:#D4AF37;text-transform:uppercase;text-align:center;border-bottom:1px solid rgba(255,255,255,0.1)">Horas</td>
        <td style="padding:10px 16px;font-size:11px;letter-spacing:0.1em;color:#D4AF37;text-transform:uppercase;text-align:right;border-bottom:1px solid rgba(255,255,255,0.1)">Precio</td>
      </tr>
      ${rows}
    </table>`;
}

export async function POST(req: NextRequest) {
  const { nombre, email, descripcion } = await req.json();

  if (!nombre || !email || !descripcion) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos" },
      { status: 400 }
    );
  }

  const pricingTable = buildPricingTable();

  // ── Folleto para el cliente ──
  const brochureHtml = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <!-- Header -->
  <tr><td style="background:#04474B;border-radius:12px 12px 0 0;padding:40px 40px 32px;text-align:center">
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.15em;color:#D4AF37;text-transform:uppercase">Cachicamo Studios</p>
    <h1 style="margin:0;font-size:28px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em">Presupuesto Desarrollo Web</h1>
    <p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.6)">Preparado para ${nombre}</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#111111;padding:0">

    <!-- Greeting -->
    <div style="padding:32px 40px 24px">
      <p style="margin:0;font-size:15px;color:#D1D5DB;line-height:1.7">
        Hola <strong style="color:#FFFFFF">${nombre}</strong>,
      </p>
      <p style="margin:12px 0 0;font-size:15px;color:#9CA3AF;line-height:1.7">
        Gracias por tu interés. Aquí tienes nuestros precios de desarrollo web según el tipo de proyecto:
      </p>
    </div>

    <!-- Rate -->
    <div style="margin:0 40px 16px;text-align:center">
      <p style="margin:0;font-size:12px;letter-spacing:0.1em;color:#D4AF37;text-transform:uppercase">Tarifa</p>
      <p style="margin:4px 0 0;font-size:24px;font-weight:800;color:#FFFFFF">$${RATE} USD <span style="font-size:14px;font-weight:400;color:#9CA3AF">/ hora</span></p>
    </div>

    <!-- Pricing table -->
    <div style="margin:0 40px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden">
      ${pricingTable}
    </div>

    <!-- Disclaimer -->
    <div style="padding:24px 40px 8px">
      <p style="margin:0;font-size:12px;color:#6B7280;line-height:1.6;font-style:italic">
        * Los precios son estimaciones basadas en la complejidad promedio de cada tipo de proyecto. El precio final se definirá tras evaluar los detalles específicos en una llamada.
      </p>
    </div>

    <!-- What's included -->
    <div style="padding:16px 40px 32px">
      <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.1em;color:#D4AF37;text-transform:uppercase">Todos los planes incluyen</p>
      <table cellpadding="0" cellspacing="0" style="font-size:14px;color:#D1D5DB;line-height:1.8">
        <tr><td style="padding:2px 10px 2px 0;color:#D4AF37">&#10003;</td><td>Diseño personalizado — sin plantillas</td></tr>
        <tr><td style="padding:2px 10px 2px 0;color:#D4AF37">&#10003;</td><td>Responsive (móvil, tablet, desktop)</td></tr>
        <tr><td style="padding:2px 10px 2px 0;color:#D4AF37">&#10003;</td><td>Optimización de rendimiento y SEO base</td></tr>
        <tr><td style="padding:2px 10px 2px 0;color:#D4AF37">&#10003;</td><td>Deploy y configuración de dominio</td></tr>
        <tr><td style="padding:2px 10px 2px 0;color:#D4AF37">&#10003;</td><td>2 rondas de revisiones incluidas</td></tr>
      </table>
    </div>

    <!-- CTA -->
    <div style="padding:0 40px 40px;text-align:center">
      <p style="margin:0 0 16px;font-size:15px;color:#D1D5DB">¿Listo para empezar? Agenda una llamada de 30 min:</p>
      <a href="https://cal.com/cachicamostudios/30min"
         style="display:inline-block;background:#D4AF37;color:#000;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.02em">
        Agendar llamada &#8594;
      </a>
    </div>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#04474B;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center">
    <p style="margin:0 0 4px;font-size:13px;color:rgba(255,255,255,0.7)">Cachicamo Studios</p>
    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4)">
      <a href="https://cachicamo.studio" style="color:#D4AF37;text-decoration:none">cachicamo.studio</a>
      &nbsp;&middot;&nbsp;
      <a href="mailto:info@cachicamo.studio" style="color:rgba(255,255,255,0.5);text-decoration:none">info@cachicamo.studio</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  // ── Email interno (para ti) ──
  const internalHtml = `
    <div style="font-family:sans-serif;max-width:600px">
      <h2 style="color:#04474B">Nueva solicitud de presupuesto web</h2>
      <table style="font-size:15px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#888">Nombre</td><td><strong>${nombre}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
      </table>
      <p style="font-size:15px;margin-top:20px"><strong>Descripción:</strong><br>${descripcion.replace(/\n/g, "<br>")}</p>
    </div>`;

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: TO,
        subject: `[web] Presupuesto — ${nombre}`,
        html: internalHtml,
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "Tu presupuesto web — Cachicamo Studios",
        html: brochureHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[quote API error]", error);
    return NextResponse.json(
      { ok: false, error: "Error al enviar" },
      { status: 500 }
    );
  }
}
