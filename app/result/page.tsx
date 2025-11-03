"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ChatMessage from "@/components/chat-message"
import SocialProofCounter from "@/components/social-proof-counter"
import GuaranteeBadge from "@/components/guarantee-badge"
import GuaranteeSection from "@/components/guarantee-section"
import ForceCard from "@/components/force-card"
import RevelationCounter from "@/components/revelation-counter"
import PreviewTeaser from "@/components/preview-teaser"
import PermissionQuestion from "@/components/permission-question"
import { computeLifeClockFinalReport } from "@/lib/compute-life-clock-final-report"
import { analyzeHiddenForces } from "@/lib/analyze-forces"
import { generateInsights } from "@/lib/generate-insights"
import type { PhaseResult } from "@/lib/types"
import { useAudio } from "@/hooks/use-audio"
import { useAutoScroll } from "@/hooks/use-auto-scroll"
import { getLocalStorage, setLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS, SOUNDS } from "@/lib/constants"
import { t, getTranslation } from "@/lib/i18n"

interface Message {
  id: number
  role: "assistant" | "user"
  text: string
  messageType?: "normal" | "motivation" | "revelation" | "introspection"
}

type MessageSpeed = "action" | "normal" | "introspection" | "revelation"

const getTypingDelay = (speed: MessageSpeed): number => {
  const delays = {
    action: 1000,
    normal: 1500,
    introspection: 2000,
    revelation: 2300,
  }
  return delays[speed]
}

export default function ResultPage() {
  const router = useRouter()
  const [finalReport, setFinalReport] = useState<any>(null)
  const [phasesResults, setPhasesResults] = useState<PhaseResult[]>([])
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [showChoices, setShowChoices] = useState(false)
  const [currentStep, setCurrentStep] = useState("start")
  const [timeLeft, setTimeLeft] = useState(7 * 60)
  const [isTyping, setIsTyping] = useState(false)
  const [userName, setUserName] = useState("")
  const [userGender, setUserGender] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [revealedForces, setRevealedForces] = useState<Set<string>>(new Set())
  const [revelationCount, setRevelationCount] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [showForceQuestion, setShowForceQuestion] = useState(false)
  const [showPermissionQuestion, setShowPermissionQuestion] = useState(false)
  const [permissionType, setPermissionType] = useState<"revelation" | "sensitive" | "deep" | null>(null)
  const [pendingRevelation, setPendingRevelation] = useState<(() => void) | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { playSound, playRevelation, playMotivation } = useAudio()
  const { scrollContainerRef } = useAutoScroll({ messages, isTyping })

  useEffect(() => {
    const onboarding = getLocalStorage<any>(STORAGE_KEYS.ONBOARDING)
    const phasesResultsData = getLocalStorage<PhaseResult[]>(STORAGE_KEYS.PHASES_RESULTS) || 
                              getLocalStorage<PhaseResult[]>(STORAGE_KEYS.ALL_RESULTS)

    if (!onboarding || !phasesResultsData) {
      router.push("/")
      return
    }

    try {
      setUserName(onboarding.name || "")
      setUserGender(onboarding.gender || "")
      setUserEmail(onboarding.email || "")

      setPhasesResults(phasesResultsData)

      const report = computeLifeClockFinalReport(phasesResultsData)
      setFinalReport(report)
      setLoading(false)
    } catch {
      // Silent error handling - redirect to home on data load failure
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])


  useEffect(() => {
    if (finalReport && messages.length === 0) {
      startConversation()
    }
  }, [finalReport])


  const showTyping = (duration: number) => {
    setIsTyping(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsTyping(false)
        resolve(true)
      }, duration)
    })
  }

  const addMessage = (
    role: "assistant" | "user",
    text: string,
    messageType?: "normal" | "motivation" | "revelation" | "introspection",
  ) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), role, text, messageType }])
    if (role === "assistant") {
      if (messageType === "revelation") {
        playRevelation()
      } else if (messageType === "motivation") {
        playMotivation()
      } else {
        playSound(SOUNDS.TAP)
      }
    }
  }

  const getPersonalizedInsight = () => {
    if (!phasesResults || phasesResults.length === 0) return null

    const sortedPhases = [...phasesResults].sort((a, b) => b.total - a.total)
    const highestPhase = sortedPhases[0]
    const lowestPhase = sortedPhases[sortedPhases.length - 1]

    const insights: Record<number, { high: string; low: string }> = {
      1: {
        high: "You look at yourself. But the mirror reflects a stranger.",
        low: "You flee your own gaze. The mirror waits.",
      },
      2: {
        high: "You control everything. Except what truly matters.",
        low: "You've let go of the reins. But who's driving now?",
      },
      3: {
        high: "Your desires burn. But you hide them under ash.",
        low: "You've extinguished the fire. But the embers still glow.",
      },
      4: {
        high: "You love like drowning. Magnificently. Dangerously.",
        low: "Your heart has closed. It waits for someone to knock again.",
      },
      5: {
        high: "Time devours you. You run. But towards what?",
        low: "You ignore the clock. But it doesn't forget you.",
      },
      6: {
        high: "Money possesses you more than you possess it.",
        low: "You despise gold. It's just another cage.",
      },
      7: {
        high: "Your body screams. But you only hear silence.",
        low: "You've left your temple. It awaits your return.",
      },
      8: {
        high: "Your discipline is armor. But against what?",
        low: "You flee structure. Or are you just afraid to hold on?",
      },
      9: {
        high: "You've touched the eternal. Few achieve this.",
        low: "You seek the light. But you're looking in the shadows.",
      },
      10: {
        high: "Your legacy obsesses you. You want to carve your name in time.",
        low: "You don't think about tomorrow. But tomorrow thinks about you.",
      },
    }

    return {
      high: insights[highestPhase.id]?.high || "Your answers reveal the invisible.",
      low: insights[lowestPhase.id]?.low || "A shadow you refuse to name.",
      highPhaseId: highestPhase.id,
      lowPhaseId: lowestPhase.id,
    }
  }

  const startConversation = async () => {
    const insight = getPersonalizedInsight()
    const forces = analyzeHiddenForces(phasesResults)
    
    // Initialize revelation count with initial insights
    setRevelationCount(3) // Archetype, Score, and 3 forces announcement

    // 1. INTRO (The silence before the revelation)
    await showTyping(getTypingDelay("action"))
    addMessage("assistant", "Your time has stopped. 100 questions. 100 doors opened.", "introspection")

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", "But none of them showed the full truth. Until now.", "revelation")

    // 2. PHASE INTROSPECTIVE
    if (insight) {
      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", insight.high, "introspection")

      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", insight.low, "introspection")
    }

    // 3. ANNOUNCE REPORT
    await showTyping(getTypingDelay("normal"))
    addMessage("assistant", "These are only fragments. Your real story begins inside your Full Report.", "motivation")

    await showTyping(getTypingDelay("revelation"))
    addMessage(
      "assistant",
      `Archetype: ${getArchetypeName(finalReport.archetype)} ${getArchetypeEmoji(finalReport.archetype)}`,
      "revelation"
    )

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", `Score: ${finalReport.lifeIndex.lifeIndex}/100`, "revelation")

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", "3 invisible forces control your life:", "introspection")
    setRevelationCount(prev => prev + 1)

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", "Click to reveal each one. They hold the keys to your transformation.", "revelation")
    
    // Show the force cards directly
    setShowForceQuestion(true)
    
    // The flow will continue automatically when all 3 forces are revealed
    // via the handleForceReveal function calling continueAfterForces
  }

  const handleMainCTA = async () => {
    console.log("[Checkout] Button clicked, handleMainCTA called")
    addMessage("user", "I'm ready to see who I really am — $47")
    setShowChoices(false)
    setIsRedirecting(true)

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", "Good choice.", "motivation")

    await showTyping(getTypingDelay("normal"))
    addMessage("assistant", "47 personalized revelations", "normal")

    await showTyping(getTypingDelay("normal"))
    addMessage("assistant", "10 bonus ebooks", "normal")

    await showTyping(getTypingDelay("normal"))
    addMessage("assistant", "7-day challenge", "normal")

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", "5 years of therapy = $10,000. Your LifeClock = $47.", "introspection")

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", `Offer expires in ${formatTimeDetailed(timeLeft)}.`, "revelation")

    // Create Stripe checkout session server-side then redirect to checkout URL
    try {
      console.log("[Checkout] Starting checkout session creation...")
      const referralCode = getLocalStorage<string>(STORAGE_KEYS.REFERRAL_CODE) || ""
      const onboarding = getLocalStorage<any>(STORAGE_KEYS.ONBOARDING)
      
      // Extract firstName and lastName from name
      let firstName = ""
      let lastName = ""
      if (onboarding?.name) {
        const nameParts = onboarding.name.trim().split(/\s+/)
        firstName = nameParts[0] || ""
        lastName = nameParts.slice(1).join(" ") || ""
      }
      
      console.log("[Checkout] Sending request to API...", { 
        email: userEmail, 
        firstName, 
        lastName,
        hasReferralCode: !!referralCode 
      })
      
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          referralCode, 
          email: userEmail,
          firstName,
          lastName,
        }),
      })

      console.log("[Checkout] Response status:", response.status, response.statusText)

      if (!response.ok) {
        let errorData: any = {}
        try {
          const responseText = await response.text()
          errorData = responseText ? JSON.parse(responseText) : {}
        } catch {
          // Response is not JSON, use status text
          errorData = { error: response.statusText || `Server error (${response.status})` }
        }
        
        console.error("[Checkout] API error:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData.error || "Unknown error"
        })
        
        throw new Error(errorData.error || `Failed to create checkout session (${response.status})`)
      }
      
      const data = await response.json()
      console.log("[Checkout] Response data:", data)
      
      if (data?.url) {
        console.log("[Checkout] Redirecting to:", data.url)
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        console.error("[Checkout] No URL in response:", data)
        throw new Error("No checkout URL returned")
      }
    } catch (error) {
      console.error("[Checkout] Error creating checkout session:", error)
      setIsRedirecting(false)
      setShowChoices(true)
      await showTyping(getTypingDelay("introspection"))
      const errorMessage = error instanceof Error ? error.message : "We encountered an issue. Please try again."
      addMessage("assistant", errorMessage, "introspection")
    }
  }

  const handleRefuse = async () => {
    addMessage("user", t('conversation.result.refuse.userRefuses', 'en') as string)
    setShowChoices(false)
    setCurrentStep("objection")

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", t('conversation.result.refuse.wait', 'en') as string)

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", t('conversation.result.refuse.whyHesitate', 'en') as string, "introspection")

    setShowChoices(true)
  }

  const handleObjection = async (type: string) => {
    setShowChoices(false)

    if (type === "price") {
      addMessage("user", t('conversation.result.objection.price.user', 'en') as string)

      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", t('conversation.result.objection.price.mirror', 'en') as string, "introspection")

      await showTyping(getTypingDelay("normal"))
      addMessage("assistant", t('conversation.result.objection.price.cost', 'en') as string)

      await showTyping(getTypingDelay("revelation"))
      addMessage("assistant", t('conversation.result.objection.price.invested', 'en') as string, "revelation")

      await showTyping(getTypingDelay("action"))
      addMessage("assistant", t('conversation.result.objection.price.souls', 'en') as string, "motivation")
    } else if (type === "worth") {
      addMessage("user", t('conversation.result.objection.worth.user', 'en') as string)

      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", t('conversation.result.objection.worth.afraid', 'en') as string, "introspection")

      await showTyping(getTypingDelay("normal"))
      addMessage("assistant", t('conversation.result.objection.worth.notPDF', 'en') as string)

      await showTyping(getTypingDelay("revelation"))
      addMessage("assistant", t('conversation.result.objection.worth.clarity', 'en') as string, "revelation")

      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", t('conversation.result.objection.worth.neverKnow', 'en') as string, "introspection")
    } else if (type === "time") {
      addMessage("user", t('conversation.result.objection.time.user', 'en') as string)

      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", t('conversation.result.objection.time.precisely', 'en') as string, "introspection")

      await showTyping(getTypingDelay("normal"))
      addMessage("assistant", t('conversation.result.objection.time.change', 'en') as string)

      await showTyping(getTypingDelay("revelation"))
      addMessage("assistant", t('conversation.result.objection.time.captures', 'en') as string, "revelation")

      await showTyping(getTypingDelay("action"))
      addMessage("assistant", t('conversation.result.objection.time.gone', 'en') as string)
    }

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", getTranslation('conversation.result.objection.ready', 'en').replace('{userName}', userName), "motivation")

    setCurrentStep("main-cta")
    setShowChoices(true)
  }

  const handleFinalRefuse = async () => {
    addMessage("user", t('conversation.result.finalRefuse.user', 'en') as string)
    setShowChoices(false)

    // Save intent for future retargeting
    setLocalStorage(STORAGE_KEYS.INTENT, {
      refused: true,
      timestamp: Date.now(),
      userName,
    })

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", t('conversation.result.finalRefuse.notReady', 'en') as string, "introspection")

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", t('conversation.result.finalRefuse.timeWaits', 'en') as string, "revelation")

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", getTranslation('conversation.result.finalRefuse.seeYou', 'en').replace('{userName}', userName))

    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  const getArchetypeName = (archetype: string) => {
    const names: Record<string, string> = {
      Mind: "The Architect",
      Heart: "The Empath",
      Drive: "The Creator",
      Spirit: "The Sage",
    }
    return names[archetype] || archetype
  }

  const getArchetypeEmoji = (archetype: string) => {
    const emojis: Record<string, string> = {
      Mind: "🧠",
      Heart: "💓",
      Drive: "⚡",
      Spirit: "🌞",
    }
    return emojis[archetype] || "✨"
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const formatTimeDetailed = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ${secs} ${secs === 1 ? "second" : "seconds"}`
  }

  const getProgressColor = () => {
    return "bg-red-500"
  }

  const progressPercentage = (timeLeft / (7 * 60)) * 100

  // Memoize previewRevelations to avoid recalculating on every render
  const previewRevelations = useMemo(() => {
    if (!showPreview || !finalReport || !finalReport.profile) {
      return null
    }
    
    try {
      const allRevelations = generateInsights(phasesResults, finalReport.profile)
      return allRevelations.slice(0, 3).map((r, i) => ({
        text: r.insight,
        index: i + 1
      }))
    } catch (error) {
      console.error("Error generating preview revelations:", error)
      return null
    }
  }, [showPreview, finalReport, phasesResults])

  const handleForceReveal = (forceName: string) => {
    // Ask for permission for sensitive revelations (Shadow and Fear)
    if ((forceName === "Shadow" || forceName === "Fear") && !revealedForces.has(forceName)) {
      setPermissionType(forceName === "Shadow" ? "deep" : "sensitive")
      setShowPermissionQuestion(true)
      setPendingRevelation(() => () => {
        revealForce(forceName)
      })
      return
    }
    
    revealForce(forceName)
  }

  const revealForce = (forceName: string) => {
    const newRevealed = new Set([...revealedForces, forceName])
    setRevealedForces(newRevealed)
    setRevelationCount(prev => prev + 1)
    playRevelation()
    
    const forces = analyzeHiddenForces(phasesResults)
    let insight = ""
    let warning = ""
    
    if (forceName === "Shadow") {
      insight = forces.shadow.insight
      warning = "This will reveal what you hide from yourself."
    } else if (forceName === "Fear") {
      insight = forces.fear.insight
      warning = "This will expose what paralyzes you."
    } else if (forceName === "Power") {
      insight = forces.power.insight
    }
    
    if (warning) {
      addMessage("assistant", `${forceName} — ${insight}`, "revelation")
    } else {
      addMessage("assistant", `${forceName} — ${insight}`, "revelation")
    }
    
    // Check if all forces are revealed
    if (newRevealed.size === 3) {
      setTimeout(() => {
        setShowForceQuestion(false)
        // Continue with dilemma automatically
        if (currentStep === "start") {
          continueAfterForces()
        }
      }, 3000)
    }
  }

  const handlePermissionGrant = () => {
    // Ne pas cacher immédiatement - le composant gère lui-même son état visuel
    // On cache seulement après un délai pour laisser voir l'animation
    setTimeout(() => {
      setShowPermissionQuestion(false)
    }, 2000) // Cache après 2 secondes pour laisser voir l'état "granted"
    
    if (pendingRevelation) {
      setTimeout(() => {
        pendingRevelation()
        setPendingRevelation(null)
      }, 800) // Exécute la révélation après l'animation
    }
    playRevelation()
  }

  const handlePermissionDeny = () => {
    // Dans les deux cas, on continue (grant ou deny)
    // On cache après un délai pour voir l'animation
    setTimeout(() => {
      setShowPermissionQuestion(false)
    }, 2000)
    
    if (pendingRevelation) {
      setTimeout(() => {
        pendingRevelation()
        setPendingRevelation(null)
      }, 800) // Exécute la révélation même si "deny"
    }
    playRevelation()
  }

  const continueAfterForces = async () => {
    // 4. THE DILEMMA
    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", `Two paths lie before you, ${userName}.`, "motivation")

    await showTyping(getTypingDelay("normal"))
    addMessage("assistant", "The first: you forget and continue.", "normal")

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", "The second: you see everything.", "introspection")

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", "Do you flee, or do you face it?", "revelation")

    // 5. THE OFFER
    await showTyping(getTypingDelay("action"))
    addMessage("assistant", "47 personalized revelations", "motivation")
    setRevelationCount(prev => prev + 1)

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", "10 bonus ebooks", "motivation")

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", "7-day challenge", "motivation")

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", "5 years of therapy = $10,000. Your LifeClock = $47.", "introspection")

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", `Offer expires in ${formatTimeDetailed(timeLeft)}.`, "revelation")

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", "187 people received their report today + 10 personalized ebooks on their report.", "motivation")

    // Show preview teaser
    setShowPreview(true)

    // 6. GUARANTEE & REASSURANCE
    await showTyping(getTypingDelay("normal"))
    addMessage("assistant", "7d Money-Back Guarantee. If you don't feel a shift in the next 24 hours, you pay nothing.", "motivation")

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", "You risk nothing. Except staying the same.", "introspection")

    // 7. IDENTITY CLOSURE
    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", "The door closes soon. What you choose in the next 7 minutes decides who you become.", "revelation")

    // Show CTA at peak intensity
    setCurrentStep("main-cta")
    setShowChoices(true)
  }

  const handleForceChoice = async (chosenForce: string) => {
    setShowForceQuestion(false)
    addMessage("user", `I want to know about my ${chosenForce}.`)
    
    await showTyping(getTypingDelay("revelation"))
    const forces = analyzeHiddenForces(phasesResults)
    let insight = ""
    if (chosenForce === "Shadow") {
      insight = forces.shadow.insight
      handleForceReveal("Shadow")
    } else if (chosenForce === "Fear") {
      insight = forces.fear.insight
      handleForceReveal("Fear")
    } else if (chosenForce === "Power") {
      insight = forces.power.insight
      handleForceReveal("Power")
    }
    
    setRevelationCount(prev => prev + 2)
  }

  if (loading || !finalReport) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="h-12 w-12 rounded-full border-4 border-purple-500 border-t-transparent"
          />
          <p className="text-lg text-gray-400">Analysis in progress...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-black">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 border-b border-gray-800/50 bg-black/95 backdrop-blur-md"
      >
        <div className="px-4 py-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image src="/favicon.png" alt="LifeClock" width={40} height={40} className="w-10 h-10 object-contain" />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Your report expires in</span>
              <span className={`text-xs font-medium ${timeLeft < 300 ? "text-red-400" : "text-gray-400"}`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${getProgressColor()} ${timeLeft < 300 ? "animate-pulse" : ""}`}
                style={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>
          </div>

          <div className="flex-shrink-0">
            <GuaranteeBadge />
          </div>
        </div>
      </motion.header>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto px-4 py-6 relative z-10 ${currentStep === "main-cta" ? "pb-[500px]" : ""}`}
        style={{ willChange: "transform", contain: "layout paint" }}
      >
        <div className="mx-auto max-w-md space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              text={message.text}
              messageType={message.messageType}
              delay={0}
            />
          ))}

          {/* Revelation Counter */}
          {revelationCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-4 z-20"
            >
              <RevelationCounter current={revelationCount} total={47} />
            </motion.div>
          )}

          {/* Permission Question */}
          {showPermissionQuestion && permissionType && (
            <PermissionQuestion
              question={
                permissionType === "sensitive"
                  ? "Are you ready to see what most people refuse to acknowledge?"
                  : permissionType === "deep"
                  ? "This revelation goes deep into your shadows. Are you prepared?"
                  : "Do you want to unlock this revelation?"
              }
              warning={
                permissionType === "sensitive"
                  ? "What you're about to see may challenge your self-image."
                  : permissionType === "deep"
                  ? "Once seen, this truth cannot be unseen."
                  : undefined
              }
              onGrant={handlePermissionGrant}
              grantLabel={
                permissionType === "deep" ? "Yes, I'm ready" : "Show me the truth"
              }
              type={permissionType === "deep" ? "deep" : permissionType === "sensitive" ? "sensitive" : "revelation"}
            />
          )}

          {/* Force Cards - Interactive Reveals - Sticky */}
          {showForceQuestion && finalReport && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-4 z-10 space-y-3"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 text-sm mb-4"
              >
                Which force intrigues you most?
              </motion.p>
              {(() => {
                const forces = analyzeHiddenForces(phasesResults)
                const forceColors = {
                  Shadow: "#EF4444",
                  Fear: "#EC4899",
                  Power: "#EAB308"
                }
                return (
                  <>
                    <ForceCard
                      name="Shadow"
                      insight={forces.shadow.insight}
                      revealed={revealedForces.has("Shadow")}
                      onReveal={() => handleForceReveal("Shadow")}
                      color={forceColors.Shadow}
                    />
                    <ForceCard
                      name="Fear"
                      insight={forces.fear.insight}
                      revealed={revealedForces.has("Fear")}
                      onReveal={() => handleForceReveal("Fear")}
                      color={forceColors.Fear}
                    />
                    <ForceCard
                      name="Power"
                      insight={forces.power.insight}
                      revealed={revealedForces.has("Power")}
                      onReveal={() => handleForceReveal("Power")}
                      color={forceColors.Power}
                    />
                  </>
                )
              })()}
            </motion.div>
          )}

          {/* Preview Teaser - Stays visible once shown */}
          {previewRevelations && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50"
            >
              <PreviewTeaser
                revelations={previewRevelations}
              />
            </motion.div>
          )}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}

          {currentStep === "main-cta" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <SocialProofCounter variant="compact" className="mt-2" />
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>


      {/* Section fixe en bas - Garantie + CTA */}
      {currentStep === "main-cta" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-0 z-30 border-t border-white/10 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-md"
        >
          <div className="mx-auto max-w-md">
            <div className="px-4 pt-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <GuaranteeSection />
              </motion.div>
            </div>
            {showChoices && (
              <div className="px-4 pt-4 pb-4 flex flex-col gap-3">
                <motion.button
                  onClick={handleMainCTA}
                  disabled={isRedirecting}
                  className="relative rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-[length:200%_100%] px-6 py-4 text-center font-bold text-white shadow-lg shadow-red-500/50 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    boxShadow: [
                      "0 10px 40px rgba(239, 68, 68, 0.4)",
                      "0 10px 60px rgba(220, 38, 38, 0.6)",
                      "0 10px 40px rgba(239, 68, 68, 0.4)",
                    ],
                  }}
                  transition={{
                    backgroundPosition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                  whileHover={{ scale: isRedirecting ? 1 : 1.02 }}
                  whileTap={{ scale: isRedirecting ? 1 : 0.98 }}
                >
                  <span className="relative z-10">
                    {isRedirecting ? "Redirecting to checkout..." : "I'm ready to see who I really am — $47"}
                  </span>
                </motion.button>
                <p className="text-xs text-gray-400 text-center">
                  + 10 personalized ebooks revealed after purchase (value $200)
                </p>
                <button
                  onClick={handleRefuse}
                  className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {t('conversation.result.refuse.userRefuses', 'en') as string}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showChoices && currentStep !== "main-cta" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="sticky bottom-0 z-30 border-t border-white/10 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-md p-4 pb-8"
          >
            <div className="mx-auto max-w-md flex flex-col gap-3">

              {currentStep === "objection" && (
                <>
                  <motion.button
                    onClick={() => handleObjection("price")}
                    className="rounded-2xl bg-white/10 px-6 py-3 text-center font-medium text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('conversation.result.objection.price.user', 'en') as string}
                  </motion.button>
                  <motion.button
                    onClick={() => handleObjection("worth")}
                    className="rounded-2xl bg-white/10 px-6 py-3 text-center font-medium text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('conversation.result.objection.worth.user', 'en') as string}
                  </motion.button>
                  <motion.button
                    onClick={() => handleObjection("time")}
                    className="rounded-2xl bg-white/10 px-6 py-3 text-center font-medium text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('conversation.result.objection.time.user', 'en') as string}
                  </motion.button>
                  <button
                    onClick={handleFinalRefuse}
                    className="text-xs text-gray-600 hover:text-gray-500 transition-colors mt-2"
                  >
                    {t('conversation.result.finalRefuse.user', 'en') as string}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
