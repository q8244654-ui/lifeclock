import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createCheckoutSessionSchema } from '@/lib/validators/stripe'
import { rateLimit } from '@/lib/rate-limit'

// Ensure Node.js runtime for Stripe SDK
export const runtime = 'nodejs'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const priceId = process.env.LIFECLOCK_PRICE_ID

export async function POST(request: Request) {
  try {
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 })
    }
    if (!priceId) {
      return NextResponse.json({ error: 'Missing LIFECLOCK_PRICE_ID' }, { status: 500 })
    }
    const stripe = new Stripe(stripeSecretKey)
    // Simple rate limiting by client IP
    const clientIp =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const limitResult = rateLimit(`checkout:${clientIp}`, {
      maxTokens: 10,
      refillRate: 0.5, // 1 request every 2s average
      windowMs: 60000,
    })
    if (!limitResult.allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }
    console.log('[Stripe API] Request received')
    const body = await request.json()
    console.log('[Stripe API] Body parsed:', {
      email: body.email,
      hasReferralCode: !!body.referralCode,
    })

    const { referralCode, email, firstName, lastName } = createCheckoutSessionSchema.parse(body)

    const origin = request.headers.get('origin') || ''
    const referer = request.headers.get('referer') || ''

    console.log('[Stripe API] Headers:', { origin, referer })

    // Extract base URL from origin or referer if available
    let baseUrl = origin
    if (!baseUrl && referer) {
      try {
        const refererUrl = new URL(referer)
        baseUrl = `${refererUrl.protocol}//${refererUrl.host}`
      } catch {
        // Invalid referer URL, fall through to default
      }
    }

    // Fallback to environment variable or localhost
    if (!baseUrl) {
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    }

    // Ensure HTTPS in production (except localhost)
    try {
      const parsed = new URL(baseUrl)
      const isLocalhost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'
      if (!isLocalhost && parsed.protocol === 'http:') {
        parsed.protocol = 'https:'
        baseUrl = parsed.toString().replace(/\/$/, '')
      }
    } catch {
      // If baseUrl is not a valid URL string, fallback to safe default
      if (process.env.NEXT_PUBLIC_BASE_URL) {
        baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace('http://', 'https://')
      }
    }

    console.log('[Stripe API] Creating session with baseUrl:', baseUrl)

    const idempotencyKey = request.headers.get('idempotency-key') || undefined

    const session = await stripe.checkout.sessions.create(
      {
        mode: 'payment',
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/result`,
        // Set checkout page language to English
        locale: 'en',
        // Allow customers to enter promotion codes on the hosted Checkout page
        allow_promotion_codes: true,
        // Display a short message near the submit area on Checkout
        custom_text: {
          submit: {
            message: '7-day money-back guarantee',
          },
        },
        // Don't pre-fill email - let customer enter it themselves in checkout
        // customer_email: email || undefined,
        // Apple Pay and Google Pay are automatically enabled when payment_method_types includes "card"
        // They will appear as payment options if enabled in Stripe Dashboard and supported by the device
        payment_method_types: ['card'],
        payment_method_options: {
          card: {
            request_three_d_secure: 'automatic',
          },
        },
        // Enable automatic tax calculation (requires Stripe Tax to be enabled in dashboard)
        automatic_tax: {
          enabled: true,
        },
        payment_intent_data: {
          metadata: {
            referral_code: referralCode || '',
            referred_email: email || '',
          },
        },
        metadata: {
          referral_code: referralCode || '',
          referred_email: email || '',
        },
      },
      idempotencyKey ? { idempotencyKey } : undefined
    )

    console.log('[Stripe API] Session created successfully, URL:', session.url)
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[Stripe] Error creating checkout session:', error)

    let errorMessage = 'Unable to create checkout session'
    if (error instanceof Error) {
      // Don't expose sensitive API key information to client
      if (error.message.includes('API Key')) {
        errorMessage = 'Stripe API configuration error. Please check your API keys.'
      } else if (error.message.includes('Expired')) {
        errorMessage =
          'Stripe API key is expired. Please update your STRIPE_SECRET_KEY environment variable.'
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
