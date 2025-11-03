"use client"

import { motion } from "framer-motion"
import type { HiddenForce } from "@/lib/analyze-forces"

interface ForcesCacheesProps {
  forces: {
    shadow: HiddenForce
    fear: HiddenForce
    power: HiddenForce
  }
}

const forceConfig = {
  shadow: {
    emoji: "🌑",
    color: "from-gray-900 to-gray-700",
    glow: "shadow-[0_0_30px_rgba(107,114,128,0.3)]",
  },
  fear: {
    emoji: "😨",
    color: "from-red-900 to-orange-700",
    glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
  },
  power: {
    emoji: "⚡",
    color: "from-yellow-600 to-amber-500",
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.3)]",
  },
}

export default function ForcesCachees({ forces }: ForcesCacheesProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">The 3 Hidden Forces</h2>
        <p className="text-gray-400 text-sm">
          Three polarities shape your destiny. Have you ever seen them side by side?
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(forces).map(([key, force], index) => {
          const config = forceConfig[key as keyof typeof forceConfig]
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`rounded-2xl bg-gradient-to-br ${config.color} ${config.glow} border border-white/10 p-6 backdrop-blur-sm`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{config.emoji}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {key === "shadow" ? "Your Shadow" : key === "fear" ? "Your Fear" : "Your Power"}
                    </h3>
                    <span className="text-sm text-gray-400">{force.score}/100</span>
                  </div>
                  <p className="text-sm text-gray-300">{force.description}</p>
                  <p className="text-white font-medium">{force.insight}</p>
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs text-gray-400">Action: {force.action}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-sm text-gray-400 italic"
      >
        "You are the bridge between lucidity and instinct. What you finally master, no one can take from you."
      </motion.div>
    </motion.div>
  )
}
