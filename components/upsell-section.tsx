"use client"

import { motion } from "framer-motion"
import { Sparkles, Users, ArrowRight } from "lucide-react"

export default function UpsellSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-8 backdrop-blur-sm space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          Go further
        </div>
        <p className="text-gray-300">Your report is just the beginning of the journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-3 cursor-pointer hover:border-purple-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Coaching 1-to-1</h3>
          <p className="text-sm text-gray-400">
            Work with a certified LifeClock coach to transform your insights into concrete actions.
          </p>
          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
            Learn more <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-3 cursor-pointer hover:border-pink-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
            <Users className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">LifeClock Community</h3>
          <p className="text-sm text-gray-400">
            Join a community of people who, like you, have chosen to truly know themselves.
          </p>
          <div className="flex items-center gap-2 text-pink-400 text-sm font-medium">
            Join <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>

      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500">These options are available to deepen your LifeClock experience</p>
      </div>
    </motion.div>
  )
}
