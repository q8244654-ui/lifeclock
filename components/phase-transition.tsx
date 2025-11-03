"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useAudio } from "@/hooks/use-audio"
import { STORAGE_KEYS, TIMING, SOUNDS, AUDIO, VIBRATION, PHASE_SOUNDS } from "@/lib/constants"

interface PhaseTransitionProps {
  phase: {
    id: number
    name: string
    color: string
    text: string
    sound: string
  }
  onComplete: () => void
}

export default function PhaseTransition({ phase, onComplete }: PhaseTransitionProps) {
  const { playSound, vibrate } = useAudio()
  const heartbeatRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Play phase sound
    playSound(`${phase.sound}.mp3`, AUDIO.PHASE_TRANSITION_VOLUME)

    // Play heartbeat sound
    try {
      const heartbeat = new Audio(`/sounds/${SOUNDS.HEARTBEAT}.mp3`)
      heartbeat.volume = AUDIO.HEARTBEAT_VOLUME
      heartbeat.loop = true
      heartbeat.play().catch(() => {})
      heartbeatRef.current = heartbeat

      // Stop heartbeat after transition
      setTimeout(() => {
        if (heartbeatRef.current) {
          heartbeatRef.current.pause()
          heartbeatRef.current.currentTime = 0
        }
      }, TIMING.PHASE_TRANSITION_DURATION)
    } catch (e) {
      // Silent failure
    }

    // Long vibration
    vibrate(VIBRATION.HEAVY)

    const timer = setTimeout(() => {
      onComplete()
    }, TIMING.PHASE_TRANSITION_DURATION)

    return () => {
      clearTimeout(timer)
      if (heartbeatRef.current) {
        heartbeatRef.current.pause()
        heartbeatRef.current.currentTime = 0
      }
    }
  }, [phase, onComplete, playSound, vibrate])

  const confettiColors = [
    "#0A84FF", // blue
    "#7C3AED", // violet
    "#EC4899", // pink
    "#F97316", // orange
    "#22C55E", // green
    "#FFD60A", // gold
    "#06B6D4", // cyan
    "#DC2626", // red
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "#000000" }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${phase.color}60 0%, ${phase.color}20 40%, transparent 70%)`,
          scale: [1, 1.05, 1, 1.08, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.4, 0, 0.6, 1],
          times: [0, 0.2, 0.4, 0.6, 1],
        }}
        style={{
          filter: "blur(120px)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              bottom: "-5%",
              opacity: 0.6,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <motion.div
        className="relative z-10 mx-4 max-w-lg text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: [1, 1.02, 1, 1.03, 1],
          opacity: 1,
        }}
        transition={{
          scale: {
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: [0.4, 0, 0.6, 1],
            times: [0, 0.2, 0.4, 0.6, 1],
          },
          opacity: {
            duration: 1.2,
            delay: 0.3,
            ease: "easeOut",
          },
        }}
      >
        {/* Phase name */}
        <motion.div
          className="mb-6 text-sm font-medium uppercase tracking-wider"
          style={{ color: phase.color }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Phase {phase.id}
        </motion.div>

        {/* Initiatic phrase */}
        <motion.h1
          className="mb-4 text-balance font-rounded text-2xl font-bold leading-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {phase.text}
        </motion.h1>

        {/* Phase subtitle */}
        <motion.p
          className="text-base font-medium text-white/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {phase.name}
        </motion.p>

        {/* Glowing line */}
        <motion.div
          className="mx-auto mt-8 h-px w-24"
          style={{
            background: `linear-gradient(90deg, transparent, ${phase.color}, transparent)`,
            boxShadow: `0 0 20px ${phase.color}`,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        />
      </motion.div>
    </motion.div>
  )
}
