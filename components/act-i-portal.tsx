"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface ActIPortalProps {
  lifeIndex: number
  stage: string
  userName?: string
}

export default function ActIPortal({ lifeIndex, stage, userName }: ActIPortalProps) {
  const [showScore, setShowScore] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowScore(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  const text = userName 
    ? `The transmission is confirmed, ${userName}. You just opened a portal.`
    : "The transmission is confirmed. You just opened a portal."
  const words = text.split(" ")

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
      {/* Golden Halo Animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.6, 0.4], scale: [0.5, 1.2, 1] }}
        transition={{ duration: 15, ease: "easeInOut" }}
      >
        <motion.div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(229, 201, 126, 0.4) 0%, rgba(229, 201, 126, 0.1) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
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

      {/* Staggered Text Reveal */}
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
          className="flex flex-wrap justify-center gap-2"
          style={{ fontFamily: "var(--font-title)" }}
        >
          {words.map((word, index) => (
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
                    ease: "easeOut",
                  },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Score with Inverse Gravity Effect */}
        <AnimatePresence>
          {showScore && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: [50, -20, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="space-y-4"
            >
              <motion.div
                className="text-[#E5C97E] text-7xl md:text-9xl font-bold"
                style={{ fontFamily: "var(--font-title)" }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {lifeIndex}/100
              </motion.div>
              <motion.div
                className="text-[#BFBFC2] text-xl md:text-2xl"
                style={{ fontFamily: "var(--font-body)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {stage}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
