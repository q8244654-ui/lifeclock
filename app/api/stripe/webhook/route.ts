import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/rate-limit'
import {
  sendPaymentConfirmationEmail,
  sendReferralCommissionEmail,
  sendAdminNewPaymentEmail,
  sendPaymentFailedEmail,
} from '@/lib/emails'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  if (!stripeSecretKey) {
    return new NextResponse('Missing STRIPE_SECRET_KEY', { status: 500 })
  }
  if (!webhookSecret) {
    return new NextResponse('Missing STRIPE_WEBHOOK_SECRET', { status: 500 })
  }
  const stripe = new Stripe(stripeSecretKey)
  // Rate limiting for webhook endpoint
  const clientIp =
    request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const limitResult = rateLimit(`webhook:${clientIp}`, {
    maxTokens: 20, // Allow 20 requests
    refillRate: 0.5, // Refill at 0.5 tokens/second (1 every 2 seconds)
    windowMs: 60000,
  })

  if (!limitResult.allowed) {
    return new NextResponse('Too many requests', {
      status: 429,
      headers: {
        'Retry-After': Math.ceil((limitResult.resetAt - Date.now()) / 1000).toString(),
      },
    })
  }

  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature') as string

  if (!signature) {
    return new NextResponse('Missing stripe-signature header', { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret!)
  } catch {
    // Invalid signature - return 400 so Stripe can retry
    return new NextResponse('Bad signature', { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const metadata = session.metadata || {}
      const referralCode = metadata['referral_code'] || ''
      const referredEmail = metadata['referred_email'] || session.customer_email || ''

      const supabase = await createClient()

      // Update referral status if applicable
      let referrerEmail = ''
      let commissionAmount = 10.0
      if (referralCode && referredEmail) {
        const { data: referralData } = await supabase
          .from('referrals')
          .select('referrer_email, commission_amount')
          .eq('referrer_code', referralCode)
          .eq('referred_email', referredEmail)
          .single()

        if (referralData) {
          referrerEmail = referralData.referrer_email
          commissionAmount = Number(referralData.commission_amount) || 10.0

          await supabase
            .from('referrals')
            .update({ status: 'completed', completed_at: new Date().toISOString() })
            .eq('referrer_code', referralCode)
            .eq('referred_email', referredEmail)
          // Silent error handling - referral update failures don't block webhook success
        }
      }

      // Track payment completion event in conversions table
      try {
        await supabase.from('conversions').insert({
          event_type: 'payment_complete',
          email: referredEmail || null,
          session_id: `stripe_${session.id}`,
        })
        // Silent error handling - conversion tracking failures don't block webhook success
      } catch {
        // Silent error handling for conversion tracking
      }

      // Send payment confirmation email
      if (referredEmail) {
        try {
          // Get user data and report from Supabase
          const { data: onboardingData } = await supabase
            .from('onboarding_data')
            .select('name, email')
            .eq('email', referredEmail)
            .single()

          const { data: reportData } = await supabase
            .from('reports')
            .select('*')
            .eq('user_email', referredEmail)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          if (onboardingData && reportData) {
            const userName = onboardingData.name || referredEmail.split('@')[0]
            const report =
              reportData.full_report || reportData.report_data?.full_report || reportData
            const forces = reportData.hidden_forces || reportData.report_data?.hidden_forces
            const revelations = reportData.insights || reportData.report_data?.insights || []

            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
            const reportUrl = reportData.unique_link
              ? `${baseUrl}/report?link=${reportData.unique_link}`
              : `${baseUrl}/report`
            const booksUrl = `${baseUrl}/books`

            const emailResult = await sendPaymentConfirmationEmail({
              email: referredEmail,
              userName,
              reportData: report,
              forces: forces || {},
              revelations: revelations || [],
              reportUrl,
              booksUrl,
            })

            if (!emailResult.success) {
              console.error('[Webhook] Failed to send payment confirmation email:', {
                email: referredEmail,
                error: emailResult.error,
              })
            } else {
              console.log('[Webhook] Payment confirmation email sent successfully:', {
                email: referredEmail,
                emailId: emailResult.id,
              })
            }
          }
        } catch (error) {
          console.error('[Webhook] Error sending payment confirmation email:', error)
          // Silent error - don't block webhook
        }

        // Send referral commission email
        if (referrerEmail) {
          try {
            const referralEmailResult = await sendReferralCommissionEmail({
              referrerEmail,
              referredEmail,
              commissionAmount,
              referralCode,
            })

            if (!referralEmailResult.success) {
              console.error('[Webhook] Failed to send referral commission email:', {
                email: referrerEmail,
                error: referralEmailResult.error,
              })
            } else {
              console.log('[Webhook] Referral commission email sent successfully:', {
                email: referrerEmail,
                emailId: referralEmailResult.id,
              })
            }
          } catch (error) {
            console.error('[Webhook] Error sending referral commission email:', error)
            // Silent error - don't block webhook
          }
        }

        // Send admin notification
        try {
          const amount = session.amount_total ? session.amount_total / 100 : 47
          const adminEmailResult = await sendAdminNewPaymentEmail({
            type: 'new_payment',
            data: {
              email: referredEmail,
              amount,
              referralCode: referralCode || undefined,
            },
          })

          if (!adminEmailResult.success) {
            console.error('[Webhook] Failed to send admin notification:', {
              error: adminEmailResult.error,
            })
          } else {
            console.log('[Webhook] Admin notification sent successfully:', {
              emailId: adminEmailResult.id,
            })
          }
        } catch (error) {
          console.error('[Webhook] Error sending admin notification:', error)
          // Silent error - don't block webhook
        }
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const customerEmail = paymentIntent.metadata?.email || ''

      if (customerEmail) {
        try {
          const supabase = await createClient()
          const { data: onboardingData } = await supabase
            .from('onboarding_data')
            .select('name')
            .eq('email', customerEmail)
            .single()

          const userName = onboardingData?.name || customerEmail.split('@')[0]
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
          const retryUrl = `${baseUrl}/result`

          await sendPaymentFailedEmail({
            email: customerEmail,
            userName,
            failureReason: paymentIntent.last_payment_error?.message,
            retryUrl,
          })
        } catch (error) {
          console.error('[Webhook] Error sending payment failed email:', error)
          // Silent error - don't block webhook
        }
      }
    }
  } catch (error) {
    console.error('[Webhook] Error processing event:', error)
    // Return 500 so Stripe knows to retry the webhook
    return new NextResponse('Webhook error', { status: 500 })
  }

  return NextResponse.json({ received: true })
}
