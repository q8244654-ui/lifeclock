import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import Stripe from 'stripe'
import crypto from 'crypto'

export const runtime = 'nodejs'

function signValue(value: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(value).digest('hex')
}

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const cookieSecret = process.env.PAY_COOKIE_SECRET
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 })
    }
    if (!cookieSecret) {
      return NextResponse.json({ error: 'Missing PAY_COOKIE_SECRET' }, { status: 500 })
    }

    const { session_id: sessionId } = await request.json()
    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
    }

    const stripe = new Stripe(stripeSecretKey)
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 402 })
    }

    const email = session.customer_details?.email || session.customer_email
    if (!email) {
      return NextResponse.json({ error: 'Missing customer email' }, { status: 400 })
    }

    const value = email.toLowerCase()
    const sig = signValue(value, cookieSecret)

    const cookieStore = await cookies()
    cookieStore.set('lc_paid_email', value, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    cookieStore.set('lc_paid_sig', sig, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
