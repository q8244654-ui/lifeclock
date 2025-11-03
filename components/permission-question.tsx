"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface PermissionQuestionProps {
  question: string
  warning?: string
  onGrant: () => void
  grantLabel?: string
  type?: "revelation" | "sensitive" | "deep"
}

export default function PermissionQuestion({
  question,
  warning,
  onGrant,
  grantLabel = "Yes, show me",
  type = "revelation"
}: PermissionQuestionProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [choice, setChoice] = useState<"grant" | null>(null)

  const handleGrant = () => {
    setIsAnimating(true)
    setChoice("grant")
    setTimeout(() => {
      onGrant()
    }, 800) // Plus de temps pour voir l'animation
  }

  const colors = {
    revelation: {
      border: "border-purple-500/30",
      bg: "bg-purple-500/10",
      glow: "shadow-purple-500/20",
      button: "from-purple-500 to-pink-500"
    },
    sensitive: {
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      glow: "shadow-red-500/20",
      button: "from-red-500 to-orange-500"
    },
    deep: {
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      glow: "shadow-amber-500/20",
      button: "from-amber-500 to-yellow-500"
    }
  }

  const colorScheme = colors[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: choice === "grant" ? 0.8 : 1, 
        y: 0, 
        scale: 1,
        borderColor: choice === "grant" ? `${type === "revelation" ? "rgba(168, 85, 247, 0.5)" : type === "sensitive" ? "rgba(34, 197, 94, 0.5)" : "rgba(245, 158, 11, 0.5)"}` : undefined,
      }}
      className={`relative rounded-xl ${colorScheme.border} border ${colorScheme.bg} backdrop-blur-sm p-6 space-y-4 ${colorScheme.glow} shadow-lg transition-all`}
    >
          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${type === "revelation" ? "rgba(168, 85, 247, 0.2)" : type === "sensitive" ? "rgba(239, 68, 68, 0.2)" : "rgba(245, 158, 11, 0.2)"} 0%, transparent 70%)`,
            }}
            animate={choice === "grant" ? {
              opacity: 0.6,
              scale: 1,
            } : {
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={choice === "grant" ? {
              duration: 0.5,
            } : {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          
          {/* Success overlay when granted */}
          {choice === "grant" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 rounded-xl pointer-events-none z-20 flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at center, ${type === "revelation" ? "rgba(168, 85, 247, 0.3)" : type === "sensitive" ? "rgba(34, 197, 94, 0.3)" : "rgba(245, 158, 11, 0.3)"} 0%, transparent 70%)`,
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-5xl"
              >
                ✨
              </motion.div>
            </motion.div>
          )}

          <div className={`relative z-10 space-y-4 ${choice === "grant" ? "pointer-events-none" : ""}`}>
            {/* Question */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: choice === "grant" ? 0.7 : 1,
                scale: choice === "grant" ? 0.98 : 1,
              }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold text-white text-center leading-relaxed"
            >
              {choice === "grant" ? "✓ Permission granted" : question}
            </motion.p>

            {/* Warning if provided */}
            {warning && choice !== "grant" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg bg-black/20 border border-white/10 p-3"
              >
                <p className="text-sm text-gray-300 text-center italic">
                  ⚠️ {warning}
                </p>
              </motion.div>
            )}

            {/* Button */}
            {choice !== "grant" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center pt-2"
            >
              <motion.button
                onClick={handleGrant}
                disabled={isAnimating}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${colorScheme.button} px-6 py-4 text-center font-bold text-white shadow-lg`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: isAnimating
                    ? "0 0 0px rgba(0, 0, 0, 0)"
                    : [
                        `0 10px 40px ${type === "revelation" ? "rgba(168, 85, 247, 0.4)" : type === "sensitive" ? "rgba(239, 68, 68, 0.4)" : "rgba(245, 158, 11, 0.4)"}`,
                        `0 10px 60px ${type === "revelation" ? "rgba(236, 72, 153, 0.6)" : type === "sensitive" ? "rgba(249, 115, 22, 0.6)" : "rgba(234, 179, 8, 0.6)"}`,
                        `0 10px 40px ${type === "revelation" ? "rgba(168, 85, 247, 0.4)" : type === "sensitive" ? "rgba(239, 68, 68, 0.4)" : "rgba(245, 158, 11, 0.4)"}`,
                      ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">{grantLabel}</span>
              </motion.button>
            </motion.div>
            )}
          </div>
        </motion.div>
  )
}

