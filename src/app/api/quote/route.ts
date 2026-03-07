import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM!;
const TO = process.env.RESEND_TO ?? "info@cachicamo.studio";

export async function POST(req: NextRequest) {
  const { nombre, email, tipo, descripcion } = await req.json();

  if (!nombre || !email || !tipo || !descripcion) {
    return NextResponse.json({ ok: false, error: "Faltan campos" }, { status: 400 });
  }

  try {
    // Email al equipo
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `[web] Nueva solicitud — ${tipo}`,
      html: `
        <h2 style="font-family:sans-serif">Nueva solicitud de presupuesto web</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
          <tr><td style="padding:6px 16px 6px 0;color:#888">Nombre</td><td><strong>${nombre}</strong></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Tipo</td><td>${tipo}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:15px;margin-top:20px"><strong>Descripción:</strong><br>${descripcion.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Confirmación al cliente
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Recibimos tu solicitud — Cachicamo Studios",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#04474B">¡Recibimos tu solicitud!</h2>
          <p>Hola <strong>${nombre}</strong>,</p>
          <p>Gracias por contactarnos. Revisaremos los detalles de tu proyecto y te responderemos pronto.</p>
          <p>Si quieres avanzar más rápido, puedes agendar una llamada de 30 minutos con nuestro equipo:</p>
          <a href="https://cal.com/cachicamostudios/30min"
             style="display:inline-block;background:#D4AF37;color:#000;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;margin:12px 0">
            Agendar llamada →
          </a>
          <p style="color:#888;font-size:13px;margin-top:32px">— El equipo de Cachicamo Studios</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[quote API error]", error);
    return NextResponse.json({ ok: false, error: "Error al enviar" }, { status: 500 });
  }
}
