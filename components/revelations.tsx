"use client"

import { motion } from "framer-motion"
import type { Revelation } from "@/lib/generate-insights"

interface RevelationsProps {
  revelations: Revelation[]
}

const categoryColors = {
  phase: "from-blue-900/50 to-cyan-900/50",
  energy: "from-purple-900/50 to-pink-900/50",
  pattern: "from-green-900/50 to-emerald-900/50",
  extreme: "from-orange-900/50 to-red-900/50",
  contradiction: "from-indigo-900/50 to-violet-900/50",
  force: "from-yellow-900/50 to-amber-900/50",
}

export default function Revelations({ revelations }: RevelationsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">The 47 Revelations</h2>
        <p className="text-gray-400 text-sm">
          You think you know yourself? Here are 47 truths your unconscious let slip through.
        </p>
      </div>

      <div className="grid gap-3">
        {revelations.map((revelation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-xl bg-gradient-to-br ${categoryColors[revelation.category]} border border-white/10 p-4 backdrop-blur-sm hover:border-white/20 transition-all`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{revelation.icon}</div>
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-semibold text-white">{revelation.title}</h3>
                <p 
                  className="text-sm text-gray-300"
                  dangerouslySetInnerHTML={{ __html: revelation.insight.replace(/\n\n/g, '<br /><br />') }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
