import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM!;
const TO = process.env.RESEND_TO ?? "info@cachicamo.studio";

const RATE = 45;

const TIPO_LABELS: Record<string, string> = {
  landing: "Landing Page",
  personal: "Personal",
  branding: "Branding",
  profesional: "Profesional",
  ecommerce: "E-commerce",
};

const BASE_HOURS: Record<string, [number, number]> = {
  landing: [20, 25],
  personal: [35, 40],
  branding: [40, 48],
  profesional: [48, 55],
  ecommerce: [60, 75],
};

export async function POST(req: NextRequest) {
  const { nombre, email, tipo, descripcion } = await req.json();

  if (!nombre || !email || !tipo || !descripcion) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos" },
      { status: 400 }
    );
  }

  const tipoLabel = TIPO_LABELS[tipo] ?? tipo;
  const [hoursMin, hoursMax] = BASE_HOURS[tipo] ?? [40, 50];
  const priceMin = (hoursMin * RATE).toLocaleString("en-US");
  const priceMax = (hoursMax * RATE).toLocaleString("en-US");

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
    <h1 style="margin:0;font-size:28px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em">Tu Presupuesto Web</h1>
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
        Gracias por tu interés. Hemos preparado una estimación basada en lo que nos contaste. Aquí está el desglose:
      </p>
    </div>

    <!-- Project details card -->
    <div style="margin:0 40px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden">

      <!-- Project type -->
      <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06)">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.1em;color:#D4AF37;text-transform:uppercase">Tipo de proyecto</p>
        <p style="margin:0;font-size:16px;font-weight:700;color:#FFFFFF">${tipoLabel}</p>
      </div>

      <!-- Estimate breakdown -->
      <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06)">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:14px;color:#9CA3AF;padding:6px 0">Horas estimadas</td>
            <td style="font-size:14px;color:#E5E7EB;text-align:right;padding:6px 0;font-weight:600">${hoursMin} – ${hoursMax}h</td>
          </tr>
          <tr>
            <td style="font-size:14px;color:#9CA3AF;padding:6px 0">Tarifa por hora</td>
            <td style="font-size:14px;color:#E5E7EB;text-align:right;padding:6px 0;font-weight:600">$45 USD</td>
          </tr>
        </table>
      </div>

      <!-- Total -->
      <div style="padding:24px;background:rgba(212,175,55,0.08);text-align:center">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;color:#D4AF37;text-transform:uppercase">Presupuesto estimado</p>
        <p style="margin:0;font-size:32px;font-weight:800;color:#D4AF37;letter-spacing:-0.02em">$${priceMin} – $${priceMax}</p>
        <p style="margin:6px 0 0;font-size:12px;color:#9CA3AF">USD</p>
      </div>
    </div>

    <!-- Disclaimer -->
    <div style="padding:24px 40px 8px">
      <p style="margin:0;font-size:12px;color:#6B7280;line-height:1.6;font-style:italic">
        * Esta es una estimación basada en la información proporcionada. El precio final se definirá tras evaluar los detalles específicos de tu proyecto en una llamada.
      </p>
    </div>

    <!-- What's included -->
    <div style="padding:16px 40px 32px">
      <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.1em;color:#D4AF37;text-transform:uppercase">Qué incluye</p>
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
        <tr><td style="padding:6px 16px 6px 0;color:#888">Tipo</td><td><strong>${tipoLabel}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Horas</td><td><strong>${hoursMin} – ${hoursMax}h</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Presupuesto</td><td style="color:#D4AF37"><strong>$${priceMin} – $${priceMax}</strong></td></tr>
      </table>
      <p style="font-size:15px;margin-top:20px"><strong>Descripción:</strong><br>${descripcion.replace(/\n/g, "<br>")}</p>
    </div>`;

  try {
    await Promise.all([
      // Email al equipo
      resend.emails.send({
        from: FROM,
        to: TO,
        subject: `[web] Presupuesto — ${tipoLabel} — ${nombre}`,
        html: internalHtml,
      }),
      // Folleto al cliente
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
