"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import ChatMessage from "@/components/chat-message"
import TypingIndicator from "@/components/typing-indicator"
import ProgressBar from "@/components/progress-bar"
import PhaseTransition from "@/components/phase-transition"
import { phases, type Answer } from "@/lib/phases"
import type { PhaseResult } from "@/lib/types"
import { tracking } from "@/lib/tracking"
import { useAudio } from "@/hooks/use-audio"
import { useAutoScroll } from "@/hooks/use-auto-scroll"
import { getLocalStorage, setLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS, TIMING, SOUNDS } from "@/lib/constants"
import { buttonClasses } from "@/lib/style-system"
import { getMotivationMessage, getTopPercentageMessage } from "@/lib/phase-top-messages"

interface Message {
  role: "assistant" | "user"
  text: string
  messageType?: "normal" | "motivation" | "revelation" | "introspection" | "humor"
  timestamp?: string
  showReadReceipt?: boolean
}

const phaseTransitions = [
  { id: 1, name: "The Mirror", color: "#94A3B8", text: "The mirror reflects what you hide...", sound: "phase1" },
  { id: 2, name: "The Control", color: "#3B82F6", text: "Control is an illusion you maintain...", sound: "phase2" },
  { id: 3, name: "The Desire", color: "#EF4444", text: "Desire reveals your true north...", sound: "phase3" },
  { id: 4, name: "Love", color: "#EC4899", text: "Love is the architecture of your soul...", sound: "phase4" },
  { id: 5, name: "Time", color: "#8B5CF6", text: "Time bends to those who understand it...", sound: "phase5" },
  { id: 6, name: "Money", color: "#F59E0B", text: "Money flows where energy goes...", sound: "phase6" },
  { id: 7, name: "The Body", color: "#10B981", text: "Your body remembers what your mind forgets...", sound: "phase7" },
  { id: 8, name: "Discipline", color: "#0EA5E9", text: "Discipline is freedom in disguise...", sound: "phase8" },
  { id: 9, name: "Faith", color: "#FEF3C7", text: "Faith is seeing light with your heart...", sound: "phase9" },
  { id: 10, name: "Legacy", color: "#9333EA", text: "Legacy is written in the lives you touch...", sound: "phase10" },
]

export default function QuizPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [canAnswer, setCanAnswer] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [lastUserMessageIndex, setLastUserMessageIndex] = useState<number>(-1)
  const [allPhaseResults, setAllPhaseResults] = useState<PhaseResult[]>([])
  const [showPhaseTransition, setShowPhaseTransition] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState<(typeof phaseTransitions)[0] | null>(null)
  const [userName, setUserName] = useState<string>("")
  const phaseStartedRef = useRef<boolean>(false)
  const lastAskedQuestionRef = useRef<string>("") // Track la dernière question posée pour éviter les doublons

  const { playPop, playSend, playChime, playComplete } = useAudio()
  const { scrollContainerRef } = useAutoScroll({ messages, isTyping })

  const currentPhase = phases[currentPhaseIndex]
  const currentQuestion = currentPhase.questions[currentQuestionIndex]
  const totalQuestions = currentPhase.questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  useEffect(() => {
    const onboardingData = getLocalStorage<any>(STORAGE_KEYS.ONBOARDING)
    if (onboardingData) {
      setUserName(onboardingData.name || "")
    }
  }, [])

  useEffect(() => {
    // S'assurer que userName est chargé avant de démarrer la phase
    // et éviter les appels multiples (React Strict Mode)
    if (phaseStartedRef.current) return
    
    const onboardingData = getLocalStorage<any>(STORAGE_KEYS.ONBOARDING)
    const name = onboardingData?.name || ""
    
    // S'assurer que userName est défini avant de démarrer
    const timer = setTimeout(() => {
      if (!phaseStartedRef.current) {
        phaseStartedRef.current = true
        // Utiliser directement la valeur du localStorage pour éviter les problèmes de timing
        startPhase(name)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const startPhase = async (initialUserName?: string, phaseIndexOverride?: number) => {
    // Utiliser le paramètre ou fallback sur userName du state
    const nameToUse = initialUserName !== undefined ? initialUserName : userName
    if (initialUserName && initialUserName !== userName) {
      setUserName(initialUserName)
    }
    
    // Utiliser l'index de phase passé en paramètre ou l'index actuel
    const phaseIndex = phaseIndexOverride !== undefined ? phaseIndexOverride : currentPhaseIndex
    const phase = phases[phaseIndex]
    
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setMessages([
      {
        role: "assistant",
        text: phase.intro,
        messageType: "revelation",
      },
    ])
    setIsTyping(false)
    playPop()

    await new Promise((resolve) => setTimeout(resolve, 2500))
    askQuestion(nameToUse)
  }

  const askQuestion = (userNameOverride?: string) => {
    setIsTyping(true)
    setCanAnswer(false)
    setShowOptions(false)

    // Capturer les valeurs nécessaires au moment de l'appel
    const phaseIndex = currentPhaseIndex
    const questionIndex = currentQuestionIndex
    const questionText = phases[phaseIndex].questions[questionIndex].text
    
    // Utiliser le paramètre en priorité, sinon userName du state, sinon lire directement depuis localStorage
    let currentUserName: string = userNameOverride || userName || ""
    if (!currentUserName) {
      const onboardingData = getLocalStorage<any>(STORAGE_KEYS.ONBOARDING)
      currentUserName = onboardingData?.name || ""
    }
    
    // Créer un identifiant unique pour cette question
    const questionId = `${phaseIndex}-${questionIndex}-${questionText.replace(/\{name\}/g, "").trim()}`
    const questionTextWithName = questionText.replace(/\{name\}/g, currentUserName)

    setTimeout(() => {
      // Vérifier si cette question a déjà été posée en utilisant la ref
      if (lastAskedQuestionRef.current === questionId) {
        // Cette question a déjà été posée, vérifier si elle existe vraiment dans les messages
        // et si le nom est correct
        setMessages((prev) => {
          // Trouver le message de question correspondant
          const questionMessages = prev.filter(m => m.role === "assistant")
          // Prendre le dernier message qui pourrait être cette question
          // (on cherche le message assistant juste avant le dernier message user ou feedback)
          let foundQuestion: Message | null = null
          for (let i = questionMessages.length - 1; i >= 0; i--) {
            const msg = questionMessages[i]
            const normalizedMsg = msg.text.replace(/\{name\}/g, "").trim()
            const normalizedQuestion = questionText.replace(/\{name\}/g, "").trim()
            if (normalizedMsg === normalizedQuestion) {
              foundQuestion = msg
              break
            }
          }

          if (foundQuestion) {
            // La question existe déjà
            if (foundQuestion.text === questionTextWithName) {
              // Déjà affichée avec le bon nom, ne rien changer
              setIsTyping(false)
              setTimeout(() => {
                setShowOptions(true)
                setCanAnswer(true)
              }, 100)
              return prev
            } else {
              // Le nom est différent, mettre à jour
              return prev.map((msg) => {
                if (msg === foundQuestion) {
                  return {
                    ...msg,
                    text: questionTextWithName,
                  }
                }
                return msg
              })
            }
          }
          
          // La question n'existe pas dans les messages malgré la ref, l'ajouter
          return [
            ...prev,
            {
              role: "assistant",
              text: questionTextWithName,
            },
          ]
        })
        
        setIsTyping(false)
        playPop()
        setTimeout(() => {
          setShowOptions(true)
          setCanAnswer(true)
        }, 800)
        return
      }
      
      // Cette question n'a jamais été posée, l'ajouter
      lastAskedQuestionRef.current = questionId

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: questionTextWithName,
        },
      ])
      setIsTyping(false)
      playPop()

      setTimeout(() => {
        setShowOptions(true)
        setCanAnswer(true)
      }, 800)
    }, 1200)
  }

  const getCurrentTime = () => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
  }

  const handleAnswer = (option: (typeof currentQuestion.options)[0]) => {
    if (!canAnswer) return

    setCanAnswer(false)
    setShowOptions(false)

    playSend()

    const userMessage: Message = {
      role: "user",
      text: option.label,
      timestamp: getCurrentTime(),
      showReadReceipt: true,
    }

    setMessages((prev) => {
      const newMessages = [...prev, userMessage]
      setLastUserMessageIndex(newMessages.length - 1)
      return newMessages
    })

    const answer: Answer = {
      value: option.value,
      feedback: option.feedback,
    }
    setAnswers((prev) => [...prev, answer])

    setIsTyping(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: option.feedback,
          messageType: "introspection",
        },
      ])
      setIsTyping(false)
      playPop()

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg, idx) => (idx === lastUserMessageIndex ? { ...msg, showReadReceipt: false } : msg)),
        )
      }, 1500)

      // Check if we should show top percentage message (every 3 answers)
      // or motivation message (every 4 answers)
      const totalAnswers = answers.length + 1
      const shouldShowTopPercentage = totalAnswers > 0 && totalAnswers % 3 === 0
      const shouldShowMotivation = totalAnswers > 0 && totalAnswers % 4 === 0

      const nextQuestionIndex = currentQuestionIndex + 1

      // Show top percentage message every 3 answers
      if (shouldShowTopPercentage && nextQuestionIndex < totalQuestions) {
        setTimeout(() => {
          setIsTyping(true)
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                text: getTopPercentageMessage(),
                messageType: "motivation",
              },
            ])
            setIsTyping(false)
            playPop()

            setTimeout(() => {
              setCurrentQuestionIndex(nextQuestionIndex)
              lastAskedQuestionRef.current = "" // Réinitialiser pour la prochaine question
              askQuestion()
            }, 2000)
          }, 1500)
        }, 2000)
      }
      // Show motivation message every 4 answers (separate from top percentage)
      else if (shouldShowMotivation && nextQuestionIndex < totalQuestions) {
        setTimeout(() => {
          setIsTyping(true)
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                text: getMotivationMessage(),
                messageType: "motivation",
              },
            ])
            setIsTyping(false)
            playPop()

            setTimeout(() => {
              setCurrentQuestionIndex(nextQuestionIndex)
              lastAskedQuestionRef.current = "" // Réinitialiser pour la prochaine question
              askQuestion()
            }, 2000)
          }, 1500)
        }, 2000)
      } else if (nextQuestionIndex < totalQuestions) {
        setCurrentQuestionIndex(nextQuestionIndex)
        lastAskedQuestionRef.current = "" // Réinitialiser pour la prochaine question
        setTimeout(() => {
          askQuestion()
        }, 2000)
      } else {
        finishPhase()
      }
    }, 1000)
  }

  const finishPhase = async () => {
    const evaluation = currentPhase.evaluate(answers)
    const globalFeedback = currentPhase.globalFeedback(evaluation.total)

    const phaseResult: PhaseResult = {
      id: currentPhase.id,
      title: currentPhase.title,
      total: evaluation.total,
      archetype: evaluation.archetype,
      energyType: currentPhase.energyType,
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: globalFeedback,
        messageType: "revelation",
      },
    ])
    setIsTyping(false)
    playChime()

    await new Promise((resolve) => setTimeout(resolve, 2500))

    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: `Your archetype: ${evaluation.archetype}`,
        messageType: "revelation",
      },
    ])
    setIsTyping(false)
    playComplete()

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: evaluation.description,
        messageType: "introspection",
      },
    ])

    await new Promise((resolve) => setTimeout(resolve, 2500))

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: evaluation.message,
        messageType: "motivation",
      },
    ])

    const updatedResults = [...allPhaseResults, phaseResult]
    setAllPhaseResults(updatedResults)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    if (currentPhaseIndex < phases.length - 1) {
      const nextPhaseIndex = currentPhaseIndex + 1
      setTransitionPhase(phaseTransitions[nextPhaseIndex])
      setShowPhaseTransition(true)
    } else {
      setLocalStorage(STORAGE_KEYS.PHASES_RESULTS, updatedResults)
      setLocalStorage(STORAGE_KEYS.ALL_RESULTS, updatedResults) // Keep for backward compatibility
      // Track quiz completion once per session before redirect
      ;(async () => {
        try {
          await tracking.quizComplete()
        } catch {}
      })()

      setTimeout(() => {
        router.push("/generating")
      }, 2000)
    }
  }

  const handleTransitionComplete = () => {
    setShowPhaseTransition(false)
    const nextPhaseIndex = currentPhaseIndex + 1
    setCurrentPhaseIndex(nextPhaseIndex)
    setCurrentQuestionIndex(0)
    setAnswers([])
    setMessages([])
    lastAskedQuestionRef.current = "" // Réinitialiser pour la nouvelle phase

    setTimeout(() => {
      // Passer le nouvel index de phase pour éviter les problèmes de closure
      startPhase(undefined, nextPhaseIndex)
    }, 500)
  }

  const replaceVariables = (text: string): string => {
    return text.replace(/\{name\}/g, userName)
  }

  return (
    <div className="flex h-screen flex-col bg-black relative">
      <div
        className={`absolute inset-0 opacity-5 pointer-events-none quiz-overlay quiz-overlay-phase-${currentPhase.id}`}
      />

      <AnimatePresence>
        {showPhaseTransition && transitionPhase && (
          <PhaseTransition phase={transitionPhase} onComplete={handleTransitionComplete} />
        )}
      </AnimatePresence>

      <div className="border-b border-white/5 bg-black/50 p-4 backdrop-blur-sm">
        <div className="mx-auto max-w-md">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className={`text-xs font-medium quiz-phase-title quiz-overlay-phase-${currentPhase.id}`}>
              {currentPhase.title}
            </span>
          </div>
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={totalQuestions}
            customProgress={progress}
            phaseColor={currentPhase.color}
          />
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="hide-scrollbar flex-1 overflow-y-auto p-4"
        style={{ willChange: "transform", contain: "layout paint" }}
      >
        <div className="mx-auto flex max-w-md flex-col space-y-1.5 pb-[432px]">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              text={message.text}
              messageType={message.messageType}
              showReadReceipt={message.showReadReceipt && index === lastUserMessageIndex}
              timestamp={message.timestamp}
            />
          ))}

          <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {showOptions && canAnswer && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 border-t border-white/5 bg-linear-to-t from-black from-60% via-black/95 to-transparent p-4 pb-6 backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto max-w-md">
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.01 }}
                  className={buttonClasses.quizOption}
                  style={{
                    fontFamily: "SF Pro Text, -apple-system, system-ui, sans-serif",
                    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 0 1px ${currentPhase.color}20`,
                    borderLeft: `2px solid ${currentPhase.color}40`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to right, transparent, ${currentPhase.color}10, transparent)`,
                    }}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
