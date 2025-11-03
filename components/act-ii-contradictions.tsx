"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface ContradictionPair {
  fear: string
  truth: string
}

const contradictionPairs: ContradictionPair[] = [
  {
    fear: "You want freedom but fear the void.",
    truth: "You are the space itself.",
  },
  {
    fear: "You want to succeed but fear being seen.",
    truth: "Your visibility is your power.",
  },
  {
    fear: "You want to be loved but don't love yourself.",
    truth: "Love flows from within.",
  },
  {
    fear: "You want to move forward but look back.",
    truth: "The present moment holds your liberation.",
  },
  {
    fear: "You want to be authentic but wear a mask.",
    truth: "Your truth is already beautiful.",
  },
  {
    fear: "You want to be happy but cultivate suffering.",
    truth: "Joy is your birthright.",
  },
  {
    fear: "You want to be present but live in your head.",
    truth: "Here is where life happens.",
  },
  {
    fear: "You want love but fear losing.",
    truth: "Love multiplies when shared.",
  },
  {
    fear: "You want to change but fear the unknown.",
    truth: "Transformation is your nature.",
  },
  {
    fear: "You want to let go but hold on.",
    truth: "Release creates space for new beginnings.",
  },
]

export default function ActIIContradictions() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

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
            Contradictions & Forces
          </h2>
          <p className="text-[#BFBFC2] text-lg" style={{ fontFamily: "var(--font-body)" }}>
            Ten pairs of mirrors. Flip to see the truth behind the fear.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contradictionPairs.map((pair, index) => {
            const isFlipped = flippedCards.has(index)

            return (
              <motion.div
                key={index}
                className="relative h-48 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => toggleFlip(index)}
                style={{ perspective: "1000px" }}
              >
                {/* Card Container with 3D Flip */}
                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front (Fear) - Dark */}
                  <motion.div
                    className="absolute inset-0 rounded-xl backdrop-blur-xl border border-white/10 p-6 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.9) 100%)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                    }}
                  >
                    <p
                      className="text-[#BFBFC2] text-lg text-center italic"
                      style={{ fontFamily: "var(--font-quote)" }}
                    >
                      {pair.fear}
                    </p>
                  </motion.div>

                  {/* Back (Truth) - Light */}
                  <motion.div
                    className="absolute inset-0 rounded-xl backdrop-blur-xl border border-[#E5C97E]/30 p-6 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(229, 201, 126, 0.15) 0%, rgba(143, 115, 255, 0.1) 100%)",
                      boxShadow: "0 8px 32px rgba(229, 201, 126, 0.3)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p
                      className="text-[#E5C97E] text-lg text-center font-semibold"
                      style={{ fontFamily: "var(--font-quote)" }}
                    >
                      {pair.truth}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Hint */}
                {!isFlipped && (
                  <motion.div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[#BFBFC2]/50 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Click to reveal →
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
