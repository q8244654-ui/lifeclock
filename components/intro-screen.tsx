"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

export default function IntroScreen() {
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)
  const [showHeartbeat, setShowHeartbeat] = useState(false)

  const handleStart = () => {
    setShowHeartbeat(true)

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([80, 100, 120])
    }

    try {
      const audio = new Audio("/sounds/heartbeat.mp3")
      audio.volume = 0.4
      audio.play().catch(() => {})
    } catch (e) {}

    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        router.push("/onboarding")
      }, 500)
    }, 2500)
  }

  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black p-4"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {showHeartbeat && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-96 w-96 rounded-full"
            style={{
              background: "radial-gradient(circle, #0A84FF 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
            animate={{
              scale: [1, 1.2, 1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              times: [0, 0.2, 0.4, 0.6, 1],
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div
          className="h-96 w-96 rounded-full"
          style={{
            background: "#0A84FF",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex max-w-md flex-col items-center gap-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image src="/images/lifeclock-logo.png" alt="LifeClock" width={160} height={160} className="w-auto h-40" />
        </motion.div>

        <div className="flex flex-col items-center gap-6">
          <motion.h1
            className="text-[19px] leading-relaxed tracking-tight text-white/90 text-balance px-4"
            style={{ fontFamily: "SF Pro Text, -apple-system, system-ui, sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            Tu n'as pas besoin de plus de temps....Tu as besoin de clarté.
          </motion.h1>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: [1, 1.05, 1, 1.08, 1],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 1.2 },
              scale: {
                duration: 1.5,
                times: [0, 0.2, 0.4, 0.6, 1],
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            whileTap={{ scale: 1.02 }}
            onClick={handleStart}
            className="relative overflow-hidden rounded-full px-10 py-3.5 text-[17px] font-medium text-white transition-all"
            style={{
              fontFamily: "SF Pro Text, -apple-system, system-ui, sans-serif",
              background: "linear-gradient(180deg, #FF3B30 0%, #FF453A 100%)",
              boxShadow: "0 4px 12px rgba(255, 59, 48, 0.3)",
            }}
          >
            <span className="relative z-10">Commencer gratuitement </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
