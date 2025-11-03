"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { GUARANTEE } from "@/lib/constants"
import { useState } from "react"

export default function GuaranteeSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative rounded-lg border border-green-500/20 p-4 backdrop-blur-sm overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1), rgba(34, 197, 94, 0.1))",
      }}
    >
      {/* Halo lumineux animé au survol */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(74, 222, 128, 0.2) 0%, transparent 70%)",
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 space-y-2.5">
        {/* Titre et icône compacts */}
        <div className="flex items-center gap-2.5">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-green-500/30 shrink-0"
            style={{
              background: "linear-gradient(to bottom right, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.2))",
            }}
          >
            <Clock className="w-4 h-4 text-green-400" />
          </motion.div>
          <h3 className="text-sm font-bold text-white">{GUARANTEE.MARKETING_TEXT}</h3>
        </div>

        {/* Hook émotionnel */}
        <p className="text-sm font-medium text-white/95 leading-snug">
          {GUARANTEE.HOOK}
        </p>

        {/* Promesse et remboursement compacts */}
        <div className="space-y-1.5">
          <p className="text-xs text-gray-200 leading-snug">
            {GUARANTEE.PROMISE}
          </p>
          <p className="text-xs text-gray-300 leading-snug">
            {GUARANTEE.REFUND}
          </p>
        </div>

        {/* Process et signature sur une ligne */}
        <div className="flex items-center gap-2 pt-1 border-t border-green-500/20">
          <p className="text-xs text-gray-300/90 font-medium shrink-0">
            {GUARANTEE.PROCESS}
          </p>
          <span className="text-green-500/50">•</span>
          <p className="text-xs text-green-300/80 italic flex-1">
            {GUARANTEE.SIGNATURE}
          </p>
        </div>

        {/* Note légale discrète */}
        <p className="text-[10px] text-gray-500/80 leading-tight pt-0.5">
          Terms apply. See refund policy for details.
        </p>
      </div>
    </motion.div>
  )
}

