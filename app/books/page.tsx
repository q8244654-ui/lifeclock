'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Download, BookOpen, FileText, ExternalLink } from 'lucide-react'

const GOOGLE_DRIVE_LINK =
  'https://drive.google.com/drive/u/0/folders/1rL84pC3KxFOkDtKkLX3y__djl0yzdmId'

export default function BooksPage() {
  const router = useRouter()

  return (
    <div className="bg-[#0A0A0A] text-white">
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

        {/* Hero Content */}
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
            <div className="w-24 h-24 rounded-2xl bg-[#E5C97E]/20 border border-[#E5C97E]/30 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-[#E5C97E]" />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-2"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            {'Your 10 Bonus Books'.split(' ').map((word, index) => (
              <motion.span
                key={index}
                className="text-[#FAFAFA] text-2xl md:text-4xl font-semibold tracking-wide uppercase"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: 'easeOut',
                    },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="text-[#BFBFC2] text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Deepen your transformation with personalized guides
          </motion.p>
        </motion.div>
      </div>

      {/* Download Section */}
      <div className="relative min-h-screen bg-[#0A0A0A] py-24 px-4 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-6 uppercase tracking-wide"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              10 Personalized Ebooks
            </h2>
            <p className="text-[#BFBFC2] text-lg mb-12" style={{ fontFamily: 'var(--font-body)' }}>
              Complimentary guides that expand on your LifeClock revelations
            </p>

            {/* Google Drive Info Text */}
            <motion.div
              className="mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="space-y-3">
                <p
                  className="text-[#BFBFC2] text-base md:text-lg"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  🗝️ For your convenience, your ebooks are securely hosted on Google Drive.
                </p>
                <p
                  className="text-[#BFBFC2] text-base md:text-lg"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  This ensures instant access, smooth downloads, and compatibility with all devices.
                </p>
                <p
                  className="text-[#BFBFC2] text-base md:text-lg"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  🔓 Click below to open your private library.
                </p>
              </div>
            </motion.div>

            {/* Download Button */}
            <motion.a
              href={GOOGLE_DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-6 rounded-xl text-[#FAFAFA] font-semibold relative overflow-hidden flex items-center gap-4 mx-auto"
              style={{
                background:
                  'linear-gradient(135deg, rgba(229, 201, 126, 0.8) 0%, rgba(229, 201, 126, 0.6) 100%)',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 16px rgba(229, 201, 126, 0.3)',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
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
              <span className="relative z-10 flex items-center gap-4">
                <Download className="w-6 h-6" />
                <span>Télécharger tous les livres</span>
                <ExternalLink className="w-5 h-5" />
              </span>
            </motion.a>

            {/* Button to access full report */}
            <motion.button
              onClick={() => router.push('/report')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 rounded-xl text-[#FAFAFA] font-semibold relative overflow-hidden flex items-center gap-3 mx-auto"
              style={{
                background:
                  'linear-gradient(135deg, rgba(229, 201, 126, 0.4) 0%, rgba(229, 201, 126, 0.2) 100%)',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 16px rgba(229, 201, 126, 0.2)',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <FileText className="w-5 h-5" />
                View My Full Report
              </span>
            </motion.button>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div
              className="backdrop-blur-xl border border-white/10 rounded-xl p-6 inline-block"
              style={{
                background:
                  'linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.4) 100%)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
            >
              <p
                className="text-[#BFBFC2] text-base mb-2"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                These books are complimentary with your LifeClock purchase
              </p>
              <p
                className="text-[#E5C97E] text-xl font-bold"
                style={{ fontFamily: 'var(--font-title)' }}
              >
                Total value: $200
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
