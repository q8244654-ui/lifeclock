"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface ForceCardProps {
  name: "Shadow" | "Fear" | "Power"
  insight: string
  description?: string
  revealed: boolean
  onReveal: () => void
  color: string
}

export default function ForceCard({ 
  name, 
  insight, 
  description,
  revealed, 
  onReveal,
  color 
}: ForceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const icons = {
    Shadow: "🔒",
    Fear: "😰",
    Power: "⚡"
  }

  const emoji = icons[name]

  return (
    <motion.div
      className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        borderColor: revealed ? `${color}40` : "rgba(255, 255, 255, 0.1)",
        backgroundColor: revealed ? `${color}10` : "rgba(255, 255, 255, 0.05)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
        }}
        animate={{
          opacity: isHovered && revealed ? 0.5 : revealed ? 0.2 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {!revealed ? (
          <motion.button
            onClick={onReveal}
            className="w-full text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl opacity-50">{emoji}</span>
              <span className="text-gray-400 font-medium">{name}</span>
              <motion.span
                className="text-xs text-gray-500 ml-auto"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Click to reveal →
              </motion.span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div 
              className="flex items-center gap-3 mb-2 cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              <motion.span
                animate={{ rotate: showDetails ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {emoji}
              </motion.span>
              <span className="text-white font-semibold">{name}</span>
              <motion.span
                className="text-xs text-gray-400 ml-auto"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
              >
                {showDetails ? "Hide" : "Details"} ↓
              </motion.span>
            </div>
            
            <motion.p
              className="text-gray-300 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {insight}
            </motion.p>

            <AnimatePresence>
              {showDetails && description && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 pt-3 border-t border-white/10"
                >
                  <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

