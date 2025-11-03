"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  current: number
  total: number
  customProgress?: number
  phaseColor?: string // Added phaseColor prop
}

export default function ProgressBar({ current, total, customProgress, phaseColor = "#0A84FF" }: ProgressBarProps) {
  const percentage = customProgress !== undefined ? customProgress : (current / total) * 100

  return (
    <div className="w-full px-4 py-3">
      <div className="mb-3 flex items-center justify-center">
        <span className="text-sm font-medium" style={{ color: phaseColor }}>
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: phaseColor,
            boxShadow: `0 0 8px ${phaseColor}99`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8,
          }}
        />
      </div>
    </div>
  )
}
