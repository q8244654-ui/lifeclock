"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useEffect, useRef } from "react"

interface ActIIITransmutationProps {
  finalReport?: any
  forces?: any
  revelations?: any[]
  userName?: string
}

export default function ActIIITransmutation({ 
  finalReport, 
  forces, 
  revelations, 
  userName 
}: ActIIITransmutationProps) {
  const [showSymbol, setShowSymbol] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const [showEpilogue, setShowEpilogue] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Only start animations when component is in view
  useEffect(() => {
    if (!isInView) return

    const timers = [
      setTimeout(() => setShowSymbol(true), 500),
      setTimeout(() => setShowText(true), 2000),
      setTimeout(() => setShowCTA(true), 4000),
      setTimeout(() => setShowEpilogue(true), 7000),
    ]

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [isInView])

  const text = "You are the bridge between lucidity and instinct. What you finally master, no one can take from you."
  const words = text.split(" ")

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Vertical Gold Gradient Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: "linear-gradient(to bottom, #0A0A0A 0%, rgba(229, 201, 126, 0.2) 50%, rgba(229, 201, 126, 0.4) 100%)",
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24">
        {/* LifeClock Symbol */}
        <AnimatePresence>
          {showSymbol && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [50, -20, 0],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="mb-16"
            >
              {/* Floating LifeClock Symbol with Glass Effect */}
              <motion.div
                className="relative"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {/* Glassmorphism Container */}
                <div
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full backdrop-blur-2xl border border-[#E5C97E]/30 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(229, 201, 126, 0.2) 0%, rgba(143, 115, 255, 0.15) 100%)",
                    boxShadow:
                      "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 60px rgba(229, 201, 126, 0.4), inset 0 0 40px rgba(229, 201, 126, 0.1)",
                  }}
                >
                  {/* Reflective Highlights */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* LifeClock Icon/Text */}
                  <div className="relative z-10 text-[#E5C97E] text-6xl md:text-8xl font-bold" style={{ fontFamily: "var(--font-title)" }}>
                    ⏰
                  </div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(229, 201, 126, 0.4) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Staggered Text */}
        <AnimatePresence>
          {showText && (
            <motion.div
              className="max-w-3xl text-center mb-16"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <div className="flex flex-wrap justify-center gap-2">
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    className="text-[#FAFAFA] text-xl md:text-3xl font-semibold"
                    style={{ fontFamily: "var(--font-title)" }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                        },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Subtle Glow After Text */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ delay: words.length * 0.1 + 0.5, duration: 1 }}
                style={{
                  background: "radial-gradient(circle, rgba(229, 201, 126, 0.2) 0%, transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final CTA removed - PDF button is now only in ActIIRevelations */}

        {/* Epilogue */}
        <AnimatePresence>
          {showEpilogue && (
            <motion.div
              className="text-center mt-16 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <p
                className="text-[#E5C97E] text-2xl md:text-3xl italic"
                style={{ fontFamily: "var(--font-quote)" }}
              >
                "Time no longer belongs to numbers. It belongs to you."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
