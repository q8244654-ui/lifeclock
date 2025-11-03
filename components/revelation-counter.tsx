"use client"

import { motion } from "framer-motion"

interface RevelationCounterProps {
  current: number
  total: number
  className?: string
}

export default function RevelationCounter({ 
  current, 
  total,
  className = "" 
}: RevelationCounterProps) {
  const percentage = Math.min((current / total) * 100, 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl bg-white/5 border border-white/10 p-3 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400 text-xs">Revelations discovered</span>
        <motion.span
          key={current}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-sm font-bold text-white"
        >
          {current}/{total}
        </motion.span>
      </div>
      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

