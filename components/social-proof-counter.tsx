"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SOCIAL_PROOF } from "@/lib/constants"

interface SocialProofCounterProps {
  variant?: "compact" | "full"
  className?: string
}

export default function SocialProofCounter({ variant = "full", className = "" }: SocialProofCounterProps) {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/stats/today-count")
        if (response.ok) {
          const data = await response.json()
          setCount(data.count ?? SOCIAL_PROOF.FALLBACK_COUNT)
        } else {
          setCount(SOCIAL_PROOF.FALLBACK_COUNT)
        }
      } catch (error) {
        console.error("[SocialProofCounter] Error fetching count:", error)
        setCount(SOCIAL_PROOF.FALLBACK_COUNT)
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
  }, [])

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const text = count !== null
    ? `187 people received their report today + 10 personalized ebooks on their report.`
    : "Loading..."

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: loading ? 0.5 : 1, y: 0 }}
        className={`rounded-lg bg-white/10 border border-white/20 px-4 py-3 backdrop-blur-sm ${className}`}
      >
        <p className="text-sm text-white/90 text-center leading-relaxed font-medium">
          {text}
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: loading ? 0.5 : 1, y: 0 }}
      className={`rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm ${className}`}
    >
      <p className="text-sm text-gray-300 text-center">
        {text}
      </p>
    </motion.div>
  )
}

