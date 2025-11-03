'use client'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import PaymentSuccessClient from './payment-success-client'

export const dynamic = 'force-dynamic'

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#0A0A0A] text-white min-h-screen flex items-center justify-center">
          <div
            className="w-10 h-10 rounded-full border-4 border-white/20 border-t-[#E5C97E] animate-spin"
            aria-label="Loading"
          />
        </div>
      }
    >
      <div className="bg-[#0A0A0A] text-white">
        {/* Hero Section (aligné sur /report) */}
        <div className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
          {/* Golden Halo Animation */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0.4], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 15, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(229, 201, 126, 0.4) 0%, rgba(229, 201, 126, 0.1) 40%, transparent 70%)',
                filter: 'blur(80px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Hero Content */}
          <motion.div
            className="relative z-10 text-center space-y-6 max-w-3xl px-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-block mb-6 mt-12"
            >
              <div className="w-24 h-24 rounded-2xl bg-[#E5C97E]/20 border border-[#E5C97E]/30 flex items-center justify-center">
                <span className="text-4xl">✅</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-[#FAFAFA] text-2xl md:text-4xl font-semibold tracking-wide"
              style={{ fontFamily: 'var(--font-title)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Thank you for your payment
            </motion.h1>

            <motion.p
              className="text-[#BFBFC2] text-lg md:text-xl"
              style={{ fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Your transaction is confirmed.
            </motion.p>

            <motion.p
              className="text-[#BFBFC2] text-sm md:text-base"
              style={{ fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              You will be automatically redirected to your bonus.
            </motion.p>

            {/* Spinner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 flex items-center justify-center"
            >
              <div
                className="w-10 h-10 rounded-full border-4 border-white/20 border-t-[#E5C97E] animate-spin"
                aria-label="Loading"
              />
            </motion.div>

            {/* Client-side side effects and redirect */}
            <PaymentSuccessClient />
          </motion.div>
        </div>
      </div>
    </Suspense>
  )
}
