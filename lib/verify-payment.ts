import { cookies } from 'next/headers'
import crypto from 'crypto'

export async function verifyPayment(): Promise<boolean> {
  try {
    const cookieSecret = process.env.PAY_COOKIE_SECRET
    if (!cookieSecret) {
      return false
    }

    const cookieStore = await cookies()
    const paidEmail = cookieStore.get('lc_paid_email')?.value
    const paidSig = cookieStore.get('lc_paid_sig')?.value

    if (!paidEmail || !paidSig) {
      return false
    }

    // Verify signature
    const expectedSig = crypto.createHmac('sha256', cookieSecret).update(paidEmail).digest('hex')

    if (paidSig !== expectedSig) {
      return false
    }

    return true
  } catch {
    return false
  }
}
