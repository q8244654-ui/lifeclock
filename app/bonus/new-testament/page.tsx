"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { BookOpen, FileText } from "lucide-react"

export default function NewTestamentPage() {
  return (
    <motion.div
      className="bg-[#0A0A0A] text-white"
      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Hero Section (matching style from ebooks page) */}
      <div className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
        {/* Golden Halo Animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.6, 0.4], scale: [0.5, 1.2, 1] }}
          transition={{ duration: 15, ease: "easeInOut" }}
        >
          <motion.div
            className="w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(229,201,126,0.4)_0%,rgba(229,201,126,0.1)_40%,transparent_70%)] blur-[80px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
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
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block mb-6 mt-12"
          >
            <div className="w-24 h-24 rounded-2xl bg-[#E5C97E]/20 border border-[#E5C97E]/30 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-[#E5C97E]" />
            </div>
          </motion.div>

          <motion.h1
            className="text-[#FAFAFA] text-2xl md:text-4xl font-semibold tracking-wide uppercase font-[var(--font-title)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The New Testament
          </motion.h1>

          {/* Thank You Note (bonus message) */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="mx-auto max-w-2xl bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <p
                className="text-[#BFBFC2] text-base md:text-lg font-[var(--font-body)]"
              >
                Thank you for taking the time to be here. This bonus wasn’t originally planned, but it felt essential to offer it to you. It’s our way of acknowledging your attention and your trust. Enjoy it to the fullest.
              </p>
              <p
                className="text-[#BFBFC2] text-sm md:text-base italic mt-3 font-[var(--font-body)]"
              >
                — The LifeClock team • May God bless you
              </p>
            </div>
          </motion.div>

          <motion.p
            className="text-[#BFBFC2] text-xl md:text-2xl font-[var(--font-body)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Enjoy this complimentary bonus in digital format
          </motion.p>

          {/* Illustration (full image, directly under the description) */}
          <div className="mx-auto max-w-xl mt-4 mb-6">
            <div className="rounded-xl overflow-hidden border border-white/10">
              <Image
                src="/books/Page%20new%20testament.png"
                alt="The New Testament preview"
                width={1600}
                height={1000}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Section (single bonus item) */}
      <div className="relative bg-[#0A0A0A] py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-4 uppercase tracking-wide font-[var(--font-title)]"
            >
              Bonus Access
            </h2>
            <p className="text-[#BFBFC2] text-lg font-[var(--font-body)]">
              Access the full PDF instantly. Keep it for your personal study and inspiration.
            </p>
          </motion.div>

          <motion.a
            href="/books/The%20New%20Testament.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-4 rounded-xl text-[#0A0A0A] font-semibold relative overflow-hidden flex items-center justify-center gap-3 mx-auto max-w-md font-[var(--font-body)] bg-linear-to-br from-[rgba(229,201,126,0.9)] to-[rgba(229,201,126,0.7)] shadow-[0_4px_16px_rgba(229,201,126,0.3)]"
          >
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_70%)]"
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <FileText className="w-5 h-5" />
              Open PDF
            </span>
          </motion.a>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Go to Ebook Page */}
            <motion.a
              href="/books"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 rounded-xl text-[#FAFAFA] font-semibold relative overflow-hidden flex items-center justify-center gap-3 mx-auto max-w-md mb-4 font-[var(--font-body)] bg-linear-to-br from-[rgba(229,201,126,0.8)] to-[rgba(229,201,126,0.6)] shadow-[0_4px_16px_rgba(229,201,126,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                Go to Ebook Page
              </span>
            </motion.a>

            <div
              className="backdrop-blur-xl border border-white/10 rounded-xl p-6 inline-block bg-linear-to-br from-[rgba(10,10,10,0.8)] to-[rgba(10,10,10,0.4)] shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            >
              <p
                className="text-[#BFBFC2] text-base mb-0 font-[var(--font-body)]"
              >
                Complimentary bonus with your LifeClock access
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}


