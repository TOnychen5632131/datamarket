import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables.
// In a real application, you must set STRIPE_SECRET_KEY in your .env.local file.
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_for_build';
const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-04-22.dahlia' });

export async function POST(request: Request) {
  try {
    const { datasetId, price } = await request.json();

    if (!datasetId || !price) {
      return NextResponse.json({ error: 'datasetId and price are required' }, { status: 400 });
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { 
            name: `Dataset Access: ${datasetId}`,
            description: 'Premium AI Training Dataset'
          },
          unit_amount: Math.round(price * 100), // convert dollars to cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      // Ensure NEXT_PUBLIC_BASE_URL is set in your environment
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/purchases?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?canceled=true`,
      metadata: { datasetId }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
