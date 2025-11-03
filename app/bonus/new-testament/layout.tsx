import { PaymentGuard } from '@/components/payment-guard'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <PaymentGuard>{children}</PaymentGuard>
}
