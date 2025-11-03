'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaymentSuccessClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    ;(async () => {
      try {
        if (!sessionId) {
          router.replace('/result')
          return
        }

        const resp = await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        })

        if (resp.ok) {
          router.replace('/bonus/new-testament')
        } else {
          router.replace('/result')
        }
      } catch {
        router.replace('/result')
      }
    })()
  }, [router, searchParams])

  return null
}
