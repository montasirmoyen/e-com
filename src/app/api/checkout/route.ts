import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, origin } = body as { items: Array<{ id: number; title: string; price: number; quantity: number; }>; origin?: string };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const line_items = items.map(i => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: i.title,
        },
        unit_amount: Math.round(i.price * 100),
      },
      quantity: i.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${origin || ''}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin || ''}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
