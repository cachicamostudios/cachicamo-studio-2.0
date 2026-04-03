import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS: Record<string, { name: string; hours: [number, number] }> = {
  landing: { name: "Landing Page", hours: [20, 25] },
  personal: { name: "Personal", hours: [35, 40] },
  branding: { name: "Branding", hours: [40, 48] },
  profesional: { name: "Profesional", hours: [48, 55] },
  ecommerce: { name: "E-commerce", hours: [60, 75] },
};

const RATE = 45; // USD/hora

export async function POST(req: NextRequest) {
  const { plan, email, nombre, monto } = await req.json();

  // Si se pasa un monto personalizado, usarlo; si no, calcular desde el plan
  let amount: number;
  let description: string;

  if (monto && Number(monto) > 0) {
    amount = Math.round(Number(monto) * 100); // Stripe usa centavos
    description = `Desarrollo Web — Monto acordado`;
  } else if (plan && PLANS[plan]) {
    const p = PLANS[plan];
    const minPrice = p.hours[0] * RATE;
    amount = Math.round(minPrice * 0.5 * 100); // 50% depósito del precio mínimo
    description = `Desarrollo Web ${p.name} — Depósito 50%`;
  } else {
    return NextResponse.json(
      { error: "Plan o monto requerido" },
      { status: 400 }
    );
  }

  if (amount < 50) {
    return NextResponse.json(
      { error: "El monto mínimo es $0.50 USD" },
      { status: 400 }
    );
  }

  const origin = req.headers.get("origin") ?? "https://cachicamo.studio";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: description,
              description: nombre
                ? `Cliente: ${nombre}`
                : "Cachicamo Studios — Desarrollo Web",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/pago/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pago?cancelado=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout error]", err);
    const message = err instanceof Error ? err.message : "Error al crear sesión de pago";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
