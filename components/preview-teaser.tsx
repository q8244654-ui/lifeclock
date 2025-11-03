"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, memo } from "react"

interface Revelation {
  text: string
  index: number
}

interface PreviewTeaserProps {
  revelations: Revelation[]
}

function PreviewTeaser({ revelations }: PreviewTeaserProps) {
  const [revealedIndex, setRevealedIndex] = useState(-1)

  useEffect(() => {
    // Consolidated timers: delays in milliseconds for each revelation reveal
    const revealDelays = [1000, 3000, 5000]
    const timers: NodeJS.Timeout[] = []

    revealDelays.forEach((delay, index) => {
      const timer = setTimeout(() => {
        setRevealedIndex(index)
      }, delay)
      timers.push(timer)
    })

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 p-6 backdrop-blur-sm space-y-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">👁️</span>
        <h3 className="text-lg font-bold text-white">Preview — Here's a glimpse of what's inside...</h3>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {revelations.map((revelation, index) => 
            revealedIndex >= index ? (
              <motion.div
                key={revelation.index}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ 
                  opacity: 1, 
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1,
                  delay: index * 0.3 
                }}
                className="relative p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-3 pr-20">
                  <span className="text-purple-400 font-bold text-sm mt-1 shrink-0">
                    #{revelation.index}
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">
                    {revelation.text}
                  </p>
                </div>
                {index < revealedIndex && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-sm"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
                      className="text-purple-400 text-xs"
                    >
                      ✓
                    </motion.span>
                    <span className="text-purple-300 text-xs font-medium">
                      Revealed
                    </span>
                  </motion.div>
                )}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: revealedIndex >= 0 ? 1 : 0 }}
        className="text-xs text-gray-500 text-center pt-2 border-t border-white/10"
      >
        ... and {47 - revelations.length} more revelations waiting inside
      </motion.p>
    </motion.div>
  )
}

export default memo(PreviewTeaser)

