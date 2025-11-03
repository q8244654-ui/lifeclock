"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Twitter, Linkedin, Instagram, Check } from "lucide-react"

interface ShareSectionProps {
  archetype: string
  lifeIndex: number
}

export default function ShareSection({ archetype, lifeIndex }: ShareSectionProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `I just discovered my LifeClock archetype: ${archetype} (${lifeIndex}/100). Do you know yours?`
  const shareUrl = "https://lifeclock.quest"

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      instagram: shareUrl, // Instagram doesn't support direct sharing via URL
    }

    if (platform === "instagram") {
      // Copy to clipboard for Instagram
      navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      alert("Text copied! Paste it in your Instagram post.")
    } else {
      window.open(urls[platform], "_blank", "width=600,height=400")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xl font-semibold text-white">
          <Share2 className="w-5 h-5" />
          Share your archetype
        </div>
        <p className="text-gray-400 text-sm">Inspire others to discover their LifeClock</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <motion.button
          onClick={() => handleShare("twitter")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-2 rounded-xl bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 p-4 hover:bg-[#1DA1F2]/20 transition-colors"
        >
          <Twitter className="w-6 h-6 text-[#1DA1F2]" />
          <span className="text-xs text-gray-300">Twitter</span>
        </motion.button>

        <motion.button
          onClick={() => handleShare("linkedin")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-2 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 p-4 hover:bg-[#0A66C2]/20 transition-colors"
        >
          <Linkedin className="w-6 h-6 text-[#0A66C2]" />
          <span className="text-xs text-gray-300">LinkedIn</span>
        </motion.button>

        <motion.button
          onClick={() => handleShare("instagram")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-2 rounded-xl bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 border border-[#833AB4]/20 p-4 hover:from-[#833AB4]/20 hover:via-[#FD1D1D]/20 hover:to-[#F77737]/20 transition-colors"
        >
          {copied ? <Check className="w-6 h-6 text-green-400" /> : <Instagram className="w-6 h-6 text-[#E4405F]" />}
          <span className="text-xs text-gray-300">Instagram</span>
        </motion.button>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500 italic">Every share helps someone discover themselves</p>
      </div>
    </motion.div>
  )
}
