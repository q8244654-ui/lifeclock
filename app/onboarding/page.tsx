"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import ChatMessage from "@/components/chat-message"
import TypingIndicator from "@/components/typing-indicator"
import PhaseTransition from "@/components/phase-transition"
import { createClient } from "@/lib/supabase/client"
import { generateReferralCode } from "@/lib/generate-referral-code"
import { tracking } from "@/lib/tracking"
import { useAudio } from "@/hooks/use-audio"
import { useAutoScroll } from "@/hooks/use-auto-scroll"
import { setLocalStorage, getLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS, TIMING, SOUNDS, VIBRATION } from "@/lib/constants"
import { buttonClasses } from "@/lib/style-system"
import { tArray } from "@/lib/i18n"

interface Message {
  role: "assistant" | "user"
  text: string
  timestamp?: string
  showReadReceipt?: boolean
}

interface OnboardingData {
  name: string
  age: number
  gender: string
  email: string
  signature: string
  referral_code: string
}

type Step = "invocation" | "name" | "age" | "gender" | "email" | "signature" | "complete"

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState<Step>("invocation")
  const [isTyping, setIsTyping] = useState(false)
  const [canAnswer, setCanAnswer] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [userData, setUserData] = useState<Partial<OnboardingData>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [lastUserMessageIndex, setLastUserMessageIndex] = useState<number>(-1)
  const [hasStarted, setHasStarted] = useState(false)
  const [showPhaseTransition, setShowPhaseTransition] = useState(false)

  const { playSound, playPop, playComplete } = useAudio()
  const { scrollContainerRef } = useAutoScroll({ messages, isTyping })

  useEffect(() => {
    if (hasStarted) return

    const refCode = searchParams.get("ref")
    if (refCode) {
      setLocalStorage(STORAGE_KEYS.REFERRAL_CODE, refCode)
    }

    // Track page visit once per session
    ;(async () => {
      try {
        await tracking.pageVisit()
      } catch {}
    })()

    setHasStarted(true)
    const timer = setTimeout(() => {
      startInvocation()
    }, 1000)
    return () => clearTimeout(timer)
  }, []) // Empty dependency array to run only once


  useEffect(() => {
    if (canAnswer && inputRef.current) {
      inputRef.current.focus()
    }
  }, [canAnswer])


  const getCurrentTime = () => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
  }

  const addBotMessage = (text: string, callback?: () => void) => {
    setIsTyping(true)
    const typingDelay = Math.random() * TIMING.TYPING_DELAY_RANDOM + TIMING.TYPING_DELAY_BASE

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text,
        },
      ])
      setIsTyping(false)
      playPop()

      if (callback) {
        setTimeout(callback, TIMING.MESSAGE_DELAY)
      }
    }, typingDelay)
  }

  const startInvocation = () => {
    let messageIndex = 0
    const invocationMessages = 16

    const addNextMessage = () => {
      if (messageIndex < invocationMessages) {
        addBotMessage(tArray('conversation.onboarding.invocation', messageIndex, 'en'), () => {
          messageIndex++
          if (messageIndex < invocationMessages) {
            addNextMessage()
          } else {
            setCanAnswer(true)
          }
        })
      }
    }

    addNextMessage()
  }

  const handleInvocationChoice = (choice: string) => {
    if (!canAnswer) return

    playPop()
    setCanAnswer(false)

    const userMessage: Message = {
      role: "user",
      text: choice,
      timestamp: getCurrentTime(),
      showReadReceipt: true,
    }

    setMessages((prev) => {
      const newMessages = [...prev, userMessage]
      setLastUserMessageIndex(newMessages.length - 1)
      return newMessages
    })

    addBotMessage("Perfect.", () => {
      setMessages((prev) =>
        prev.map((msg, idx) => (idx === lastUserMessageIndex ? { ...msg, showReadReceipt: false } : msg)),
      )
      addBotMessage("What's your first name?", () => {
        setCurrentStep("name")
        setCanAnswer(true)
      })
    })
  }

  const handleNameSubmit = (name: string) => {
    playPop()
    setCanAnswer(false)

    const userMessage: Message = {
      role: "user",
      text: name,
      timestamp: getCurrentTime(),
      showReadReceipt: true,
    }

    setMessages((prev) => {
      const newMessages = [...prev, userMessage]
      setLastUserMessageIndex(newMessages.length - 1)
      return newMessages
    })

    setUserData((prev) => ({ ...prev, name }))

    let response = ""
    if (name.length <= 4) {
      response = `Nice to meet you, ${name}. Short and clear — like a spark ready to strike.`
    } else if (name.length >= 8) {
      response = `Nice to meet you, ${name}. Long and deep — a wave that never fades.`
    } else {
      response = `Nice to meet you, ${name}. Your name carries a rare vibration.`
    }

    addBotMessage(response, () => {
      setMessages((prev) =>
        prev.map((msg, idx) => (idx === lastUserMessageIndex ? { ...msg, showReadReceipt: false } : msg)),
      )
      addBotMessage(`How old are you, ${name}?`, () => {
        setCurrentStep("age")
        setCanAnswer(true)
      })
    })
  }

  const handleAgeSubmit = (ageStr: string) => {
    const age = Number(ageStr)

    if (isNaN(age) || age < 13 || age > 120) {
      addBotMessage("I didn't understand. Enter a valid age.")
      return
    }

    playPop()
    setCanAnswer(false)

    const userMessage: Message = {
      role: "user",
      text: ageStr,
      timestamp: getCurrentTime(),
      showReadReceipt: true,
    }

    setMessages((prev) => {
      const newMessages = [...prev, userMessage]
      setLastUserMessageIndex(newMessages.length - 1)
      return newMessages
    })

    setUserData((prev) => ({ ...prev, age }))

    let response = ""
    if (age < 20) {
      response = "At the dawn of fire — you're just entering the world of conscious beings."
    } else if (age < 30) {
      response = `${age} years old... The years when you choose what you'll become: flame or ash.`
    } else if (age < 40) {
      response = `${age} years old. The decade of irreversible choices, where you sculpt your destiny.`
    } else if (age < 60) {
      response = `${age} years old. The age of reckonings and rebirths.`
    } else {
      response = `${age} years old. The time of silent mirrors, where every second becomes a sacred memory.`
    }

    addBotMessage(response, () => {
      setMessages((prev) =>
        prev.map((msg, idx) => (idx === lastUserMessageIndex ? { ...msg, showReadReceipt: false } : msg)),
      )
      addBotMessage("How do you define yourself?", () => {
        setCurrentStep("gender")
        setCanAnswer(true)
      })
    })
  }

  const handleGenderChoice = (gender: string) => {
    if (!canAnswer) return

    playPop()
    setCanAnswer(false)

    const userMessage: Message = {
      role: "user",
      text: gender,
      timestamp: getCurrentTime(),
      showReadReceipt: true,
    }

    setMessages((prev) => {
      const newMessages = [...prev, userMessage]
      setLastUserMessageIndex(newMessages.length - 1)
      return newMessages
    })

    setUserData((prev) => ({ ...prev, gender }))

    let response = ""
    if (gender === "Man 🧠") {
      response = "Your energy is solar, anchored in movement and creation."
    } else if (gender === "Woman 💫") {
      response = "Your energy is lunar, fluid, guided by cycle and intuition."
    }

    addBotMessage(response, () => {
      setMessages((prev) =>
        prev.map((msg, idx) => (idx === lastUserMessageIndex ? { ...msg, showReadReceipt: false } : msg)),
      )
      addBotMessage(`Last thing, ${userData.name}.`, () => {
        addBotMessage("To send you your complete report, I need your email.", () => {
          addBotMessage("(Promise, no spam. Just your LifeClock.)", () => {
            setCurrentStep("email")
            setCanAnswer(true)
          })
        })
      })
    })
  }

  const handleEmailSubmit = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      addBotMessage("Hmm, this email doesn't seem correct.")
      return
    }

    // Track email given (by unique email)
    ;(async () => {
      try {
        await tracking.emailGiven(email)
      } catch {}
    })()

    playPop()
    setCanAnswer(false)

    const userMessage: Message = {
      role: "user",
      text: email,
      timestamp: getCurrentTime(),
      showReadReceipt: true,
    }

    setMessages((prev) => {
      const newMessages = [...prev, userMessage]
      setLastUserMessageIndex(newMessages.length - 1)
      return newMessages
    })

    setUserData((prev) => ({ ...prev, email }))

    // Send welcome email
    ;(async () => {
      try {
        const { sendWelcomeEmail } = await import("@/lib/emails")
        const baseUrl = window.location.origin
        const quizUrl = `${baseUrl}/quiz`
        
        await sendWelcomeEmail({
          email,
          userName: userData.name || email.split("@")[0],
          quizUrl,
        })
      } catch {
        // Silent error - welcome email is optional
      }
    })()

    addBotMessage(`Perfect, ${userData.name}.`, () => {
      setMessages((prev) =>
        prev.map((msg, idx) => (idx === lastUserMessageIndex ? { ...msg, showReadReceipt: false } : msg)),
      )

      const signature = `${userData.name?.toUpperCase()}-${(userData.age || 0) * 3}-${userData.gender?.[0] || "X"}`
      setUserData((prev) => ({ ...prev, signature }))

      addBotMessage("Your clock is synchronized.", () => {
        addBotMessage(`Your temporal signature: ${signature}`, () => {
          addBotMessage(`Before you: 10 doors.\nEach reveals a facet of your being.`, () => {
            addBotMessage("The journey takes 15 minutes.", () => {
              addBotMessage("But what you'll discover will last a lifetime.", () => {
                const readyQuestion =
                  userData.gender === "Man 🧠"
                    ? "Are you ready to cross the first door?"
                    : "Are you ready to cross the first door?"

                addBotMessage(readyQuestion, () => {
                  addBotMessage(`The first Door opens now. 🌒`, () => {
                    const finalData: OnboardingData = {
                      name: userData.name || "",
                      age: userData.age || 0,
                      gender: userData.gender || "",
                      email: email,
                      signature,
                      referral_code: generateReferralCode(email), // Generate referral code for this user
                    }

                    setLocalStorage(STORAGE_KEYS.ONBOARDING, finalData)

                    let supabaseClient: ReturnType<typeof createClient> | null = null
                    try {
                      supabaseClient = createClient()
                    } catch (e) {
                      console.error("[onboarding] Supabase client init error:", e)
                    }
                    ;(async () => {
                      if (!supabaseClient) return
                      try {
                        const { error } = await supabaseClient
                          .from("onboarding_data")
                          .upsert(
                            {
                              name: finalData.name,
                              age: finalData.age,
                              gender: finalData.gender,
                              email: finalData.email,
                            },
                            { onConflict: "email" }
                          )

                        if (error) {
                          console.error("[onboarding] Failed to upsert onboarding_data:", error)
                        }
                      } catch (e) {
                        console.error("[onboarding] Exception during upsert onboarding_data:", e)
                      }
                    })()

                    const refCode = getLocalStorage<string>(STORAGE_KEYS.REFERRAL_CODE)
                    if (refCode) {
                      const client = supabaseClient
                      if (!client) return
                      client
                        .from("referrals")
                        .select("referrer_email")
                        .eq("referrer_code", refCode)
                        .single()
                        .then(({ data: refRow, error: refLookupError }) => {
                          if (!refLookupError && refRow?.referrer_email) {
                            client
                              .from("referrals")
                              .insert({
                                referrer_email: refRow.referrer_email,
                                referrer_code: refCode,
                                referred_email: finalData.email,
                                status: "pending",
                              })
                              .then(() => {
                                // Referral tracking is silent
                              })
                          }
                        })
                    }

                    setTimeout(() => {
                      playComplete()
                      setShowPhaseTransition(true)
                    }, 2000)
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canAnswer || !inputValue.trim()) return

    if (currentStep === "name") {
      handleNameSubmit(inputValue)
    } else if (currentStep === "age") {
      handleAgeSubmit(inputValue)
    } else if (currentStep === "email") {
      handleEmailSubmit(inputValue)
    }

    setInputValue("")
  }

  const handleTransitionComplete = () => {
    setShowPhaseTransition(false)
    router.push("/quiz")
  }

  return (
    <div className="flex h-screen flex-col bg-black">
      <AnimatePresence>
        {showPhaseTransition && (
          <PhaseTransition
            phase={{
              id: 1,
              name: "The Mirror",
              color: "#94A3B8",
              text: "The mirror reflects what you hide...",
              sound: "phase1",
            }}
            onComplete={handleTransitionComplete}
          />
        )}
      </AnimatePresence>

      <div className="border-b border-white/5 bg-black/50 p-4 backdrop-blur-sm">
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-[#AEAEB2]">Hourglass synchronization</span>
            <span className="text-xs">⏳</span>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="hide-scrollbar flex-1 overflow-y-auto p-4 will-change-transform contain-[layout_paint]"
      >
        <div className="mx-auto flex max-w-md flex-col space-y-1.5 pb-[420px]">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              text={message.text}
              showReadReceipt={message.showReadReceipt && index === lastUserMessageIndex}
              timestamp={message.timestamp}
            />
          ))}

          <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {canAnswer && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 border-t border-white/5 bg-linear-to-t from-black from-70% via-black/95 to-transparent p-4 pt-8 pb-6 backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto max-w-md">
            {currentStep === "invocation" && (
              <div className="flex flex-col gap-3">
                {["I'm staying.", "Show me.", "I'm scared, but I want to know."].map((option, index) => (
                  <motion.button
                    key={option}
                    onClick={() => handleInvocationChoice(option)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01 }}
                    className={`${buttonClasses.primary} font-sans shadow-lg ring-1 ring-white/5`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative">{option}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {currentStep === "gender" && (
              <div className="flex flex-col gap-3">
                {["Man 🧠", "Woman 💫"].map((option, index) => (
                  <motion.button
                    key={option}
                    onClick={() => handleGenderChoice(option)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01 }}
                    className={`${buttonClasses.primary} font-sans shadow-lg ring-1 ring-white/5`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative">{option}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {(currentStep === "name" || currentStep === "age" || currentStep === "email") && (
              <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type={currentStep === "email" ? "email" : currentStep === "age" ? "number" : "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    currentStep === "name" ? "Your first name…" : currentStep === "age" ? "Your age…" : "your@email.com"
                  }
                  min={currentStep === "age" ? 13 : undefined}
                  max={currentStep === "age" ? 120 : undefined}
                  className={`${buttonClasses.input} font-sans shadow-lg ring-1 ring-white/5`}
                />

                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white transition-all disabled:opacity-40
                    ${inputValue.trim()
                      ? 'bg-linear-to-br from-[#007AFF] to-[#0A84FF] shadow-[0_4px_16px_rgba(10,132,255,0.5),0_2px_4px_rgba(0,0,0,0.3)]'
                      : 'bg-[#2C2C2E] shadow-lg'}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="transition-transform group-hover:translate-y-[-2px]"
                  >
                    <path
                      d="M10 4L10 16M10 4L6 8M10 4L14 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
