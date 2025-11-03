"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { generateReferralCode } from "@/lib/generate-referral-code"
import { Copy, Check } from "lucide-react"

interface ReferralSectionProps {
  userEmail: string
}

export default function ReferralSection({ userEmail }: ReferralSectionProps) {
  const [referralCode, setReferralCode] = useState<string>("")
  const [referralLink, setReferralLink] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState({ pending: 0, completed: 0, earned: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeReferral()
  }, [userEmail])

  const initializeReferral = async () => {
    try {
      const supabase = createClient()

      // Check if user already has a referral code
      const { data: existingReferral } = await supabase
        .from("referrals")
        .select("referrer_code")
        .eq("referrer_email", userEmail)
        .limit(1)
        .single()

      let code = existingReferral?.referrer_code

      // If no code exists, generate one
      if (!code) {
        code = generateReferralCode(userEmail)

        // Create initial referral entry
        await supabase.from("referrals").insert({
          referrer_email: userEmail,
          referrer_code: code,
          status: "pending",
        })
      }

      setReferralCode(code)
      const link = `${window.location.origin}/onboarding?ref=${code}`
      setReferralLink(link)

      // Fetch referral stats
      const { data: referrals } = await supabase
        .from("referrals")
        .select("status, commission_amount")
        .eq("referrer_email", userEmail)
        .not("referred_email", "is", null)

      if (referrals) {
        const pending = referrals.filter((r) => r.status === "pending").length
        const completed = referrals.filter((r) => r.status === "completed" || r.status === "paid").length
        const earned = referrals
          .filter((r) => r.status === "completed" || r.status === "paid")
          .reduce((sum, r) => sum + (r.commission_amount || 0), 0)

        setStats({ pending, completed, earned })
      }

      setLoading(false)
    } catch (error) {
      console.error("[v0] Error initializing referral:", error)
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("[v0] Failed to copy:", error)
    }
  }

  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#0A0A0A] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-[#BFBFC2] text-lg" style={{ fontFamily: "var(--font-body)" }}>
              Loading...
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
            Become an Ambassador
          </h2>
          <p className="text-[#BFBFC2] text-lg" style={{ fontFamily: "var(--font-body)" }}>
            Share the path. Earn your reward.
          </p>
        </motion.div>

        {/* Commission Highlight */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative backdrop-blur-xl border border-[#E5C97E]/30 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Glowing background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at center, rgba(229, 201, 126, 0.15) 0%, transparent 70%)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                className="text-6xl md:text-7xl font-bold text-[#E5C97E] mb-4"
                style={{ fontFamily: "var(--font-title)" }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                $10
              </motion.div>
              <p className="text-xl md:text-2xl text-[#FAFAFA] mb-2" style={{ fontFamily: "var(--font-title)" }}>
                per person you refer
              </p>
              <p className="text-[#BFBFC2] text-base" style={{ fontFamily: "var(--font-body)" }}>
                Earn when they unlock their complete LifeClock report
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { label: "Pending", value: stats.pending, color: "#BFBFC2", icon: "⏳" },
            { label: "Completed", value: stats.completed, color: "#E5C97E", icon: "✓" },
            { label: "Total Earned", value: `$${stats.earned}`, color: "#E5C97E", icon: "💰" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.4) 100%)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: stat.color, fontFamily: "var(--font-title)" }}
              >
                {stat.value}
              </div>
              <div className="text-[#BFBFC2] text-sm" style={{ fontFamily: "var(--font-body)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Referral Link */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="backdrop-blur-xl border border-white/10 rounded-xl p-6" style={{
            background: "linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.4) 100%)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
          }}>
            <div className="space-y-4">
              <div className="text-[#BFBFC2] text-sm mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Your unique referral link:
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-[#FAFAFA] font-mono focus:outline-none focus:border-[#E5C97E]/50 transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                <motion.button
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg text-[#FAFAFA] font-semibold relative overflow-hidden flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, rgba(229, 201, 126, 0.8) 0%, rgba(229, 201, 126, 0.6) 100%)",
                    fontFamily: "var(--font-body)",
                    boxShadow: "0 4px 16px rgba(229, 201, 126, 0.3)",
                  }}
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
                  <span className="relative z-10 flex items-center gap-2">
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3
            className="text-2xl font-bold text-[#FAFAFA] mb-8 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-title)" }}
          >
            How it works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Share your link",
                description: "Send your unique referral link to friends who want to discover themselves",
              },
              {
                step: "2",
                title: "They discover",
                description: "Your friends complete their LifeClock journey through your link",
              },
              {
                step: "3",
                title: "You earn $10",
                description: "Receive $10 for each friend who purchases their complete report",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="backdrop-blur-xl border border-white/10 rounded-xl p-6"
                style={{
                  background: "linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.4) 100%)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
              >
                <div
                  className="text-4xl font-bold text-[#E5C97E] mb-4"
                  style={{ fontFamily: "var(--font-title)" }}
                >
                  {item.step}
                </div>
                <h4
                  className="text-lg font-semibold text-[#FAFAFA] mb-2"
                  style={{ fontFamily: "var(--font-title)" }}
                >
                  {item.title}
                </h4>
                <p className="text-[#BFBFC2] text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
