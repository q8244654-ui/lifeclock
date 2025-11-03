"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { GUARANTEE } from "@/lib/constants"

export default function GuaranteeBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 text-xs text-gray-400"
      title={GUARANTEE.MARKETING_TEXT}
    >
      <Shield className="w-4 h-4 text-green-400" />
      <span className="hidden sm:inline">{GUARANTEE.MARKETING_TEXT}</span>
      <span className="sm:hidden">7d</span>
    </motion.div>
  )
}

