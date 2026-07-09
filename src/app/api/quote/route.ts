import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM!;
const TO = process.env.RESEND_TO ?? "info@cachicamo.studio";

export async function POST(req: NextRequest) {
  const { nombre, email, descripcion } = await req.json();

  if (!nombre || !email || !descripcion) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos" },
      { status: 400 }
    );
  }

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
    <h1 style="margin:0;font-size:28px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em">Solicitud recibida</h1>
    <p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.6)">Gracias, ${nombre}</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#111111;padding:0">

    <!-- Greeting -->
    <div style="padding:32px 40px 24px">
      <p style="margin:0;font-size:15px;color:#D1D5DB;line-height:1.7">
        Hola <strong style="color:#FFFFFF">${nombre}</strong>,
      </p>
      <p style="margin:12px 0 0;font-size:15px;color:#9CA3AF;line-height:1.7">
        Gracias por tu interés. Hemos recibido los detalles de tu proyecto y nos pondremos en contacto contigo para agendar una reunión donde revisaremos tu idea y definiremos juntos el alcance y el presupuesto a medida.
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
      <p style="margin:24px 0 0;font-size:13px;color:#6B7280">o si ya acordaste un precio:</p>
      <a href="https://cachicamo.studio/pago?email=${encodeURIComponent(email)}&nombre=${encodeURIComponent(nombre)}"
         style="display:inline-block;margin-top:12px;background:transparent;color:#D4AF37;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid rgba(212,175,55,0.4)">
        Realizar pago &#8594;
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
        subject: "Recibimos tu solicitud — Cachicamo Studios",
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
