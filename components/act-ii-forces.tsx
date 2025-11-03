"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import type { HiddenForce } from "@/lib/analyze-forces"

interface ActIIForcesProps {
  forces: {
    shadow: HiddenForce
    fear: HiddenForce
    power: HiddenForce
  }
}

const forceConfig = {
  shadow: {
    emoji: "🌑",
    color: "rgba(20, 20, 20, 0.6)",
    glow: "rgba(20, 20, 20, 0.4)",
    hoverGlow: "rgba(10, 10, 10, 0.8)",
  },
  fear: {
    emoji: "😨",
    color: "rgba(100, 50, 50, 0.4)",
    glow: "rgba(150, 50, 50, 0.3)",
    hoverGlow: "rgba(120, 40, 40, 0.6)",
  },
  power: {
    emoji: "⚡",
    color: "rgba(229, 201, 126, 0.4)",
    glow: "rgba(229, 201, 126, 0.5)",
    hoverGlow: "rgba(229, 201, 126, 0.7)",
  },
}

export default function ActIIForces({ forces }: ActIIForcesProps) {
  const [expandedForce, setExpandedForce] = useState<string | null>(null)
  const [hoveredForce, setHoveredForce] = useState<string | null>(null)

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-4 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-title)" }}
          >
            The 3 Hidden Forces
          </h2>
          <p className="text-[#BFBFC2] text-lg" style={{ fontFamily: "var(--font-body)" }}>
            Three polarities shape your destiny. Have you ever seen them side by side?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {Object.entries(forces).map(([key, force], index) => {
            const config = forceConfig[key as keyof typeof forceConfig]
            const isExpanded = expandedForce === key
            const isHovered = hoveredForce === key

            return (
              <motion.div
                key={key}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                onHoverStart={() => setHoveredForce(key)}
                onHoverEnd={() => setHoveredForce(null)}
              >
                {/* Floating Sphere */}
                <motion.div
                  className="cursor-pointer relative z-10"
                  onClick={() => setExpandedForce(isExpanded ? null : key)}
                  animate={{
                    y: key === "fear" && isHovered ? [0, -5, 0] : 0,
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    y: key === "fear" && isHovered 
                      ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                      : { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                >
                  {/* Glassmorphism Sphere */}
                  <motion.div
                    className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full backdrop-blur-xl border border-white/10 flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
                      boxShadow: isHovered
                        ? `0 0 40px ${config.hoverGlow}, 0 0 80px ${config.glow}`
                        : `0 0 20px ${config.glow}`,
                    }}
                    animate={
                      key === "power" && isHovered
                        ? {
                            boxShadow: [
                              `0 0 20px ${config.glow}`,
                              `0 0 40px ${config.hoverGlow}`,
                              `0 0 20px ${config.glow}`,
                            ],
                          }
                        : {}
                    }
                    transition={
                      key === "power" && isHovered
                        ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                        : { duration: 0.3 }
                    }
                  >
                    <span className="text-5xl md:text-6xl">{config.emoji}</span>
                  </motion.div>

                  {/* Dark Halo for Shadow on hover */}
                  {key === "shadow" && isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none rounded-full"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: 0.6, scale: 2 }}
                      style={{
                        background: "radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, transparent 70%)",
                        filter: "blur(40px)",
                      }}
                    />
                  )}
                </motion.div>

                {/* Expanded Card */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-44 left-0 right-0 z-20 mt-8"
                    >
                      <motion.div
                        className="backdrop-blur-xl border border-white/10 rounded-2xl p-8"
                        style={{
                          background: `linear-gradient(135deg, ${config.color} 0%, rgba(0, 0, 0, 0.8) 100%)`,
                          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 40px ${config.glow}`,
                        }}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3
                              className="text-2xl font-bold text-[#FAFAFA] uppercase"
                              style={{ fontFamily: "var(--font-title)" }}
                            >
                              Your {key === "shadow" ? "Shadow" : key === "fear" ? "Fear" : "Power"}
                            </h3>
                            <span className="text-[#E5C97E] text-xl font-semibold">{force.score}/100</span>
                          </div>
                          <p className="text-[#BFBFC2] text-base leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                            {force.insight}
                          </p>
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-[#BFBFC2] text-sm mb-4" style={{ fontFamily: "var(--font-body)" }}>
                              Ritual: {force.action}
                            </p>
                            <motion.button
                              className="px-6 py-3 rounded-lg text-[#FAFAFA] font-semibold relative overflow-hidden"
                              style={{
                                background: `linear-gradient(135deg, ${config.color} 0%, ${config.glow} 100%)`,
                                fontFamily: "var(--font-body)",
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                              onHoverStart={() => {}}
                            >
                              <motion.div
                                className="absolute inset-0"
                                style={{
                                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
                                }}
                                animate={{
                                  opacity: [0.3, 0.6, 0.3],
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                }}
                              />
                              <span className="relative z-10">Activate Ritual</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
