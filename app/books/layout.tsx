import { PaymentGuard } from '@/components/payment-guard'

export default async function BooksLayout({ children }: { children: React.ReactNode }) {
  return <PaymentGuard>{children}</PaymentGuard>
}
