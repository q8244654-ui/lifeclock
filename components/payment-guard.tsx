import { verifyPayment } from '@/lib/verify-payment'
import { PaymentError } from './payment-error'

interface PaymentGuardProps {
  children: React.ReactNode
}

export async function PaymentGuard({ children }: PaymentGuardProps) {
  const hasPaid = await verifyPayment()

  if (!hasPaid) {
    return <PaymentError />
  }

  return <>{children}</>
}
