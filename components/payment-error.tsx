'use client'

import { motion } from 'framer-motion'
import { AlertCircle, BookOpen } from 'lucide-react'
import Link from 'next/link'

export function PaymentError() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      {/* Hero Section */}
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

        {/* Error Content */}
        <motion.div
          className="relative z-10 text-center space-y-8 max-w-3xl px-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
          </motion.div>

          <motion.h1
            className="text-[#FAFAFA] text-2xl md:text-4xl font-semibold tracking-wide uppercase"
            style={{ fontFamily: 'var(--font-title)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Access Restricted
          </motion.h1>

          <motion.p
            className="text-[#BFBFC2] text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            This content is only available after payment confirmation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link
              href="/result"
              className="inline-block px-8 py-4 rounded-xl text-[#FAFAFA] font-semibold relative overflow-hidden flex items-center gap-3"
              style={{
                background:
                  'linear-gradient(135deg, rgba(229, 201, 126, 0.8) 0%, rgba(229, 201, 126, 0.6) 100%)',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 16px rgba(229, 201, 126, 0.3)',
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                Go to Payment
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
