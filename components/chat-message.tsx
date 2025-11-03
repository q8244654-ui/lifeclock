"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { typography, spacing, borderRadius, colors, gradientClasses } from "@/lib/style-system"

interface ChatMessageProps {
  role: "assistant" | "user"
  text: string
  delay?: number
  messageType?: "normal" | "motivation" | "revelation" | "introspection" | "humor"
  showReadReceipt?: boolean
  timestamp?: string
  isRevealable?: boolean
  onReveal?: () => void
}

export default function ChatMessage({
  role,
  text,
  delay = 0,
  messageType = "normal",
  showReadReceipt = false,
  timestamp,
  isRevealable = false,
  onReveal,
}: ChatMessageProps) {
  const isAssistant = role === "assistant"
  const [showReceipt, setShowReceipt] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (showReadReceipt && !isAssistant) {
      const timer = setTimeout(() => {
        setShowReceipt(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showReadReceipt, isAssistant])

  const messageStyles = {
    normal: {
      background: colors.messageTypes.normal,
      color: "#E5E5EA", // Extracted from colors.textPrimary: '#E5E5EA'
      glow: "none",
      haloColor: "transparent",
      tailColor: colors.messageTypes.normal,
    },
    motivation: {
      background: gradientClasses.motivation,
      color: "#FFFFFF",
      glow: `0 0 15px rgba(249, 115, 22, 0.5)`, // Using motivationStart color
      haloColor: colors.messageTypes.motivationStart,
      tailColor: colors.messageTypes.motivationStart,
    },
    revelation: {
      background: gradientClasses.revelation,
      color: "#FFFFFF",
      glow: `0 0 15px rgba(239, 68, 68, 0.5)`, // Using revelationStart color
      haloColor: colors.messageTypes.revelationStart,
      tailColor: colors.messageTypes.revelationStart,
    },
    introspection: {
      background: gradientClasses.introspection,
      color: "#000000",
      glow: `0 0 15px rgba(234, 179, 8, 0.5)`, // Using introspectionStart color
      haloColor: colors.messageTypes.introspectionStart,
      tailColor: colors.messageTypes.introspectionStart,
    },
    humor: {
      background: gradientClasses.humor,
      color: "#FFFFFF",
      glow: `0 0 15px rgba(34, 197, 94, 0.5)`, // Using humorStart color
      haloColor: colors.messageTypes.humorStart,
      tailColor: colors.messageTypes.humorStart,
    },
  }

  const style = isAssistant && messageType !== "normal" ? messageStyles[messageType] : messageStyles.normal

  if (isAssistant && messageType !== "normal") {
    return (
      <motion.div
        className="flex w-full justify-start"
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          delay,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="relative">
          {/* Colored halo behind value message */}
          <motion.div
            className="absolute inset-0 -z-10 blur-xl"
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              background: `radial-gradient(circle, ${style.haloColor}50 0%, transparent 70%)`,
            }}
          />
          <motion.div
            className={`relative max-w-[80%] ${borderRadius.input} ${spacing.chatBubble} text-pretty ${typography.chatMessage} cursor-pointer transition-all`}
            style={{
              background: style.background,
              color: style.color,
              boxShadow: isHovered ? `0 0 20px ${style.haloColor}80, ${style.glow}` : style.glow,
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onTap={() => {
              setIsClicked(true)
              setTimeout(() => setIsClicked(false), 200)
              if (isRevealable && onReveal) {
                onReveal()
              }
            }}
            whileHover={{ 
              scale: 1.03,
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
            animate={{
              scale: isClicked ? 0.98 : isHovered ? 1.03 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.p
              animate={{
                opacity: isHovered ? 1 : 0.95,
              }}
            >
              {text}
            </motion.p>
            {isRevealable && !isHovered && (
              <motion.div
                className="absolute top-2 right-2 text-xs opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
              >
                👆
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn("flex w-full flex-col", isAssistant ? "items-start" : "items-end")}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.div
        className={cn(
          `max-w-[80%] ${borderRadius.input} ${spacing.chatBubble} text-pretty ${typography.chatMessage}`,
          isAssistant ? "imessage-bubble-assistant" : "imessage-bubble-user",
          "cursor-pointer"
        )}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.02,
          y: -1,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.p
          animate={{
            opacity: isHovered ? 1 : 0.9,
          }}
        >
          {text}
        </motion.p>
      </motion.div>

      {!isAssistant && showReceipt && timestamp && (
        <motion.div
          className="mt-0.5 pr-1.5 text-right"
          initial={{ opacity: 0, y: 3 }}
          animate={{
            opacity: [0, 1, 0.7, 1],
            y: 0,
          }}
          transition={{
            opacity: { duration: 0.6, times: [0, 0.5, 0.7, 1] },
            y: { duration: 0.6 },
          }}
        >
          <span
            className={`${typography.timestamp} ${colors.textSecondary}`}
            style={{ fontFamily: "SF Pro Text, -apple-system, system-ui, sans-serif" }}
          >
            read at {timestamp}
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
