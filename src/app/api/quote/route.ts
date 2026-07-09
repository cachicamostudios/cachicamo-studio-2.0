import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM!;
const TO = process.env.RESEND_TO ?? "info@cachicamo.studio";

export async function POST(req: NextRequest) {
  const { nombre, email, descripcion, lang } = await req.json();

  if (!nombre || !email || !descripcion) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos" },
      { status: 400 }
    );
  }

  const isEN = lang === "en";

  // ── Textos del folleto para el cliente ──
  const c = isEN
    ? {
        htmlLang: "en",
        headerTitle: "Request received",
        headerThanks: `Thanks, ${nombre}`,
        greeting: `Hi <strong style="color:#FFFFFF">${nombre}</strong>,`,
        body: "Thanks for your interest. We have received the details you provided and will get in touch with you soon.",
        meanwhile: "In the meantime, you can book a 30-min video call:",
        bookCta: "Book a video call &#8594;",
        payIntro: "or if you already agreed on a price:",
        payCta: "Make a payment &#8594;",
        subject: "We received your request — Cachicamo Studios",
      }
    : {
        htmlLang: "es",
        headerTitle: "Solicitud recibida",
        headerThanks: `Gracias, ${nombre}`,
        greeting: `Hola <strong style="color:#FFFFFF">${nombre}</strong>,`,
        body: "Gracias por tu interés. Hemos recibido los datos que nos proporcionaste y pronto entraremos en contacto contigo.",
        meanwhile: "Mientras tanto, puedes agendar una videollamada de 30 min:",
        bookCta: "Agendar videollamada &#8594;",
        payIntro: "o si ya acordaste un precio:",
        payCta: "Realizar pago &#8594;",
        subject: "Recibimos tu solicitud — Cachicamo Studios",
      };

  // ── Folleto para el cliente ──
  const brochureHtml = `
<!DOCTYPE html>
<html lang="${c.htmlLang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <!-- Header -->
  <tr><td style="background:#04474B;border-radius:12px 12px 0 0;padding:40px 40px 32px;text-align:center">
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.15em;color:#D4AF37;text-transform:uppercase">Cachicamo Studios</p>
    <h1 style="margin:0;font-size:28px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em">${c.headerTitle}</h1>
    <p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.6)">${c.headerThanks}</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#111111;padding:0">

    <!-- Greeting -->
    <div style="padding:32px 40px 24px">
      <p style="margin:0;font-size:15px;color:#D1D5DB;line-height:1.7">
        ${c.greeting}
      </p>
      <p style="margin:12px 0 0;font-size:15px;color:#9CA3AF;line-height:1.7">
        ${c.body}
      </p>
    </div>

    <!-- CTA -->
    <div style="padding:8px 40px 40px;text-align:center">
      <p style="margin:0 0 16px;font-size:15px;color:#D1D5DB">${c.meanwhile}</p>
      <a href="https://cal.com/cachicamostudios/30min"
         style="display:inline-block;background:#D4AF37;color:#000;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.02em">
        ${c.bookCta}
      </a>
      <p style="margin:24px 0 0;font-size:13px;color:#6B7280">${c.payIntro}</p>
      <a href="https://cachicamo.studio/pago?email=${encodeURIComponent(email)}&nombre=${encodeURIComponent(nombre)}"
         style="display:inline-block;margin-top:12px;background:transparent;color:#D4AF37;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid rgba(212,175,55,0.4)">
        ${c.payCta}
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
        subject: c.subject,
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
