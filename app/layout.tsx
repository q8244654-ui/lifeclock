import type React from "react"
import type { Metadata } from "next"
import { Onest } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
import { Cormorant_Garamond } from "next/font/google"
import { Inter } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-sans",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
})

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-title",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-quote",
})

export const metadata: Metadata = {
  title: "LifeClock - Discover Your Temporal Archetype",
  description: "A mystical journey through 100 introspective questions to discover who you truly are.",
  icons: {
    icon: "/favicon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${onest.variable} ${spaceGrotesk.variable} ${cormorant.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
