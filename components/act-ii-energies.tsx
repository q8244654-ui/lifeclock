"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import type { EnergyProfile } from "@/lib/types"

interface ActIIEnergiesProps {
  energyProfile: EnergyProfile
}

const energies = [
  { key: "Mind", label: "Mind", icon: "🧠", color: "#8F73FF" },
  { key: "Heart", label: "Heart", icon: "💓", color: "#E5C97E" },
  { key: "Drive", label: "Drive", icon: "⚡", color: "#BFBFC2" },
  { key: "Spirit", label: "Spirit", icon: "🌞", color: "#FAFAFA" },
]

export default function ActIIEnergies({ energyProfile }: ActIIEnergiesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Find the dominant insight based on energy scores
  const getDominantInsight = () => {
    const { averages } = energyProfile
    const mindScore = averages.Mind
    const heartScore = averages.Heart

    if (mindScore > 70) {
      return "Your mind is your kingdom. You think before acting, analyze before feeling."
    }
    if (heartScore > 70) {
      return "Your heart is your compass. You feel before understanding, love before judging."
    }
    return "You live more in the heart than the head. Intuition guides your steps."
  }

  const dominantInsight = getDominantInsight()

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0A0A0A] py-24 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        style={{ opacity }}
      >
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
            The 4 Energies
          </h2>
        </motion.div>

        <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16">
          {energies.map((energy, index) => {
            const value = energyProfile.averages[energy.key as keyof typeof energyProfile.averages]
            const maxHeight = 400

            return (
              <motion.div
                key={energy.key}
                className="flex flex-col items-center justify-end h-[500px]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                {/* Vertical Bar */}
                <motion.div
                  className="relative w-full rounded-t-lg overflow-hidden"
                  initial={{ height: 0 }}
                  whileInView={{ height: maxHeight * (value / 100) }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 1.5, ease: "easeOut" }}
                  style={{
                    background: `linear-gradient(to top, ${energy.color} 0%, ${energy.color}80 50%, transparent 100%)`,
                    boxShadow: `0 0 20px ${energy.color}40, inset 0 0 40px ${energy.color}20`,
                  }}
                >
                  {/* Text appears at 50% height */}
                  {value >= 50 && (
                    <motion.p
                      className="absolute left-1/2 -translate-x-1/2 text-center text-[#FAFAFA] text-xs md:text-sm px-2"
                      style={{
                        top: "50%",
                        fontFamily: "var(--font-body)",
                        textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 1.5, duration: 0.8 }}
                    >
                      {value > 70
                        ? energy.key === "Mind"
                          ? "Your mind is your kingdom."
                          : energy.key === "Heart"
                            ? "Your heart is your compass."
                            : energy.key === "Drive"
                              ? "Your movement is your prayer."
                              : "You've seen beyond form."
                        : energy.key === "Mind"
                          ? "You live more in the heart than the head."
                          : energy.key === "Heart"
                            ? "You protect your heart."
                            : energy.key === "Drive"
                              ? "You hesitate to act."
                              : "You're still seeking meaning."}
                    </motion.p>
                  )}

                  {/* Glowing effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, transparent 0%, ${energy.color}20 50%, transparent 100%)`,
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Label */}
                <div className="mt-4 text-center">
                  <div className="text-2xl mb-1">{energy.icon}</div>
                  <div
                    className="text-[#BFBFC2] text-sm font-semibold"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {energy.label}
                  </div>
                  <div className="text-[#E5C97E] text-xs mt-1">{Math.round(value)}%</div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Central Insight */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p
            className="text-[#BFBFC2] text-xl md:text-2xl italic"
            style={{ fontFamily: "var(--font-quote)" }}
          >
            "{dominantInsight}"
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
