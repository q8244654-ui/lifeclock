"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface RevealButtonProps {
  label: string
  onReveal: () => void
  revealed?: boolean
  disabled?: boolean
}

export default function RevealButton({ 
  label, 
  onReveal, 
  revealed = false,
  disabled = false 
}: RevealButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (revealed) {
    return null
  }

  return (
    <motion.button
      onClick={disabled ? undefined : onReveal}
      disabled={disabled}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative mt-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered && !disabled ? "100%" : "-100%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative flex items-center gap-2">
        <motion.span
          animate={{ rotate: isHovered && !disabled ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          🔓
        </motion.span>
        {label}
      </span>
    </motion.button>
  )
}

