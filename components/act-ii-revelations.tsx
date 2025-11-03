"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import type { Revelation } from "@/lib/generate-insights"
import { exportPDFReport } from "@/lib/pdf-export"
import { Download } from "lucide-react"

interface ActIIRevelationsProps {
  revelations: Revelation[]
  userName?: string
  finalReport?: any
  forces?: any
}

export default function ActIIRevelations({ revelations, userName, finalReport, forces }: ActIIRevelationsProps) {
  const [revealedCount, setRevealedCount] = useState(0)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    if (revealedCount === revelations.length) {
      setTimeout(() => {
        setShowFinalMessage(true)
        setTimeout(() => setShowFinalMessage(false), 3000)
      }, 1000)
    }
  }, [revealedCount, revelations.length])

  const revealNext = () => {
    if (revealedCount < revelations.length) {
      setRevealedCount((prev) => prev + 1)
    }
  }

  const progress = (revealedCount / revelations.length) * 100
  const allRevelationsRevealed = revealedCount === revelations.length && revelations.length === 47

  const handleExportPDF = async () => {
    if (!allRevelationsRevealed || !userName || !finalReport || !forces || !revelations || revelations.length !== 47) {
      setExportError('You must reveal all 47 revelations before printing')
      return
    }

    setIsExporting(true)
    setExportError(null)

    try {
      await exportPDFReport({
        userName,
        finalReport,
        forces,
        revelations,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to export PDF. Please try again.'
      setExportError(errorMessage)
      console.error('[ActIIRevelations] PDF export error:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0A0A0A] py-24 px-4 overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: parallaxY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A] to-transparent opacity-50" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-4 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-title)" }}
          >
            The 47 Revelations
          </h2>
          <p className="text-[#BFBFC2] text-lg" style={{ fontFamily: "var(--font-body)" }}>
            You think you know yourself? Here are 47 truths your unconscious let slip through.
          </p>
        </motion.div>

        {/* Progress Line */}
        <div className="mb-12 relative h-1 bg-[#BFBFC2]/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#E5C97E] via-[#8F73FF] to-[#E5C97E]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: `0 0 20px rgba(229, 201, 126, 0.5)`,
            }}
          />
        </div>

        {/* Revelations Grid */}
        <div className="grid gap-4 mb-12">
          <AnimatePresence>
            {revelations.slice(0, revealedCount).map((revelation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="backdrop-blur-xl border border-white/10 rounded-xl p-6"
                style={{
                  background: "linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.4) 100%)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{revelation.icon}</div>
                  <div className="flex-1 space-y-2">
                    <h3
                      className="text-[#FAFAFA] text-lg font-semibold"
                      style={{ fontFamily: "var(--font-title)" }}
                    >
                      {revelation.title}
                    </h3>
                    <p
                      className="text-[#BFBFC2] text-base leading-relaxed"
                      style={{ fontFamily: "var(--font-body)" }}
                      dangerouslySetInnerHTML={{ __html: revelation.insight.replace(/\n\n/g, '<br /><br />') }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Reveal Next Button */}
        {revealedCount < revelations.length && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={revealNext}
              className="px-8 py-3 rounded-lg text-[#BFBFC2] hover:text-[#FAFAFA] border border-[#BFBFC2]/20 hover:border-[#BFBFC2]/40 transition-all backdrop-blur-sm"
              style={{ fontFamily: "var(--font-body)" }}
              whileHover={{ scale: 1.05, borderColor: "rgba(191, 191, 194, 0.6)" }}
              whileTap={{ scale: 0.98 }}
            >
              Reveal next truth →
            </motion.button>
          </motion.div>
        )}

        {/* Final Message */}
        {revealedCount === revelations.length && !showFinalMessage && (
          <motion.div
            className="text-center mt-16 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p
              className="text-[#BFBFC2] text-xl md:text-2xl italic"
              style={{ fontFamily: "var(--font-quote)" }}
            >
              "You just explored the depths of your unconscious."
            </p>

            {/* PDF Export Button */}
            {allRevelationsRevealed && (
              <motion.div
                className="flex flex-col items-center gap-3 mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  style={{ fontFamily: "var(--font-body)" }}
                  whileHover={!isExporting ? { scale: 1.02 } : {}}
                  whileTap={!isExporting ? { scale: 0.98 } : {}}
                >
                  <Download className="w-5 h-5" />
                  {isExporting ? "Generating PDF..." : "Download Your Report as PDF"}
                </motion.button>
                {exportError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center max-w-md"
                  >
                    {exportError}
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}