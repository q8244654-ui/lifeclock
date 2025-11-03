"use client"

import { motion } from "framer-motion"
import { colors, buttonClasses } from "@/lib/style-system"

interface AnswerButtonsProps {
  onAnswer: (answer: string) => void
  disabled?: boolean
}

const answers = [
  { key: "R", label: "Rarement", value: 1, color: colors.answerColors.rarely },
  { key: "E", label: "Parfois", value: 2, color: colors.answerColors.sometimes },
  { key: "P", label: "Souvent", value: 3, color: colors.answerColors.often },
  { key: "S", label: "Toujours", value: 4, color: colors.answerColors.always },
]

export default function AnswerButtons({ onAnswer, disabled }: AnswerButtonsProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {answers.map((answer, index) => (
        <motion.button
          key={answer.key}
          disabled={disabled}
          onClick={() => onAnswer(answer.key)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          whileTap={{ scale: 0.97 }}
          className={buttonClasses.answer(answer.color)}
          style={{
            fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
            backgroundColor: answer.color,
          }}
        >
          {answer.label}
        </motion.button>
      ))}
    </div>
  )
}
