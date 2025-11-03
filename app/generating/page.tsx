"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { t, tArray } from "@/lib/i18n"
import { useAudio } from "@/hooks/use-audio"
import { getLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS, SOUNDS, AUDIO, TIMING } from "@/lib/constants"

const GENERATION_DURATION_SECONDS = 60
const STEP_INTERVALS = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54]

const phaseColors = [
  { from: "#94A3B8", to: "#CBD5E1" }, // Phase 1 - Silver
  { from: "#3B82F6", to: "#60A5FA" }, // Phase 2 - Blue
  { from: "#EF4444", to: "#F97316" }, // Phase 3 - Red/Orange
  { from: "#EC4899", to: "#F472B6" }, // Phase 4 - Pink
  { from: "#8B5CF6", to: "#A78BFA" }, // Phase 5 - Violet
  { from: "#F59E0B", to: "#FBBF24" }, // Phase 6 - Gold
  { from: "#10B981", to: "#34D399" }, // Phase 7 - Green
  { from: "#0EA5E9", to: "#06B6D4" }, // Phase 8 - Cyan
  { from: "#F3F4F6", to: "#FEF3C7" }, // Phase 9 - White/Light
  { from: "#9333EA", to: "#A855F7" }, // Phase 10 - Purple
]

const getProgressColor = (elapsedSeconds: number) => {
  const index = Math.min(Math.floor(elapsedSeconds / 6), phaseColors.length - 1)
  return phaseColors[index]
}

export default function GeneratingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(GENERATION_DURATION_SECONDS)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [soundsPlayed, setSoundsPlayed] = useState<Set<number>>(new Set())
  const [userName, setUserName] = useState("")
  const [userGender, setUserGender] = useState("")
  const temporalWindRef = useRef<HTMLAudioElement | null>(null)
  const { playSound } = useAudio()

  useEffect(() => {
    const onboardingData = getLocalStorage<any>(STORAGE_KEYS.ONBOARDING)
    if (onboardingData) {
      setUserName(onboardingData.name || "")
      setUserGender(onboardingData.gender || "")
    }
  }, [])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const totalDuration = GENERATION_DURATION_SECONDS * 1000
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(newProgress)

      const elapsedSeconds = Math.floor(elapsed / 1000)
      const remaining = Math.max(0, GENERATION_DURATION_SECONDS - elapsedSeconds)
      setTimeRemaining(remaining)

      const milestones = [15, 30, 45, 60]
      milestones.forEach((milestone) => {
        setSoundsPlayed((prev) => {
          if (elapsedSeconds >= milestone && !prev.has(milestone)) {
            playSound(`${SOUNDS.TAP}.mp3`, AUDIO.DEFAULT_VOLUME)
            return new Set(prev).add(milestone)
          }
          return prev
        })
      })

      // Find current step based on elapsed time
      const stepIndex = STEP_INTERVALS.findIndex(
        (timeStart, idx) =>
          elapsedSeconds >= timeStart &&
          (idx === STEP_INTERVALS.length - 1 || elapsedSeconds < STEP_INTERVALS[idx + 1]),
      )

      if (stepIndex >= 0 && stepIndex < STEP_INTERVALS.length) {
        let message = tArray('generating.steps', stepIndex)
        message = message.replace("{name}", userName)
        const ready = userGender.includes("Man") || userGender.includes("Homme") ? "ready" : "ready"
        message = message.replace("{ready}", ready)
        setCurrentMessage(message)
      }

      // Redirection lorsque le compteur atteint 0 ou la progression atteint 100%
      if (newProgress >= 100 || remaining <= 0 || elapsed >= totalDuration) {
        clearInterval(interval)
        setTimeout(() => {
          router.push("/result")
        }, 2000)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [router, userName, userGender, playSound])

  useEffect(() => {
    try {
      const audio = new Audio(`/sounds/${SOUNDS.TEMPORAL_WIND}.mp3`)
      audio.volume = AUDIO.TEMPORAL_WIND_VOLUME
      audio.loop = true
      audio.play().catch(() => {})
      temporalWindRef.current = audio
      return () => {
        if (temporalWindRef.current) {
          temporalWindRef.current.pause()
          temporalWindRef.current.currentTime = 0
        }
      }
    } catch (e) {
      // Silent failure
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const elapsedSeconds = 60 - timeRemaining
  const currentColor = getProgressColor(elapsedSeconds)

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-blue-500/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${currentColor.from}20 0%, transparent 70%)`,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-32 h-32 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${currentColor.from}40 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center space-y-8 px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-lg font-medium text-white/90"
          >
            {currentMessage}
          </motion.p>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-2xl font-semibold text-white/80"
        >
          {formatTime(timeRemaining)}
        </motion.p>

        <div className="w-full max-w-md space-y-2">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full"
              style={{
                background: `linear-gradient(to right, ${currentColor.from}, ${currentColor.to})`,
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <p className="text-center text-sm text-white/50">{Math.floor(progress)}%</p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center text-sm text-white/40 max-w-md"
        >
          {(t('generating.warning') as string)}
        </motion.p>
      </div>
    </div>
  )
}
