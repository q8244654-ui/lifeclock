'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { computeLifeClockFinalReport } from '@/lib/compute-life-clock-final-report'
import { analyzeHiddenForces } from '@/lib/analyze-forces'
import { generateInsights } from '@/lib/generate-insights'
import { createClient } from '@/lib/supabase/client'
import ActIPortal from '@/components/act-i-portal'
import ActIIForces from '@/components/act-ii-forces'
import ActIIEnergies from '@/components/act-ii-energies'
import ActIIRevelations from '@/components/act-ii-revelations'
import ActIIContradictions from '@/components/act-ii-contradictions'
import ReferralSection from '@/components/referral-section'
import type { PhaseResult } from '@/lib/types'
import { getLocalStorage } from '@/hooks/use-local-storage'
import { STORAGE_KEYS } from '@/lib/constants'

export default function ReportPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [finalReport, setFinalReport] = useState<any>(null)
  const [phaseResults, setPhaseResults] = useState<PhaseResult[]>([])
  const [forces, setForces] = useState<any>(null)
  const [revelations, setRevelations] = useState<any[]>([])
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  function saveReportToSupabase(
    results: PhaseResult[],
    report: any,
    hiddenForces: any,
    insights: any[],
    onboardingData: any
  ) {
    ;(async () => {
      try {
        const supabase = createClient()

        if (!onboardingData) return

        const onboarding = onboardingData

        const reportData = {
          email: onboarding.email,
          name: onboarding.name,
          age: onboarding.age,
          gender: onboarding.gender,
          life_index: report.lifeIndex.lifeIndex,
          stage: report.lifeIndex.stage,
          dominant_energy: report.profile.dominantEnergy,
          phase_results: results,
          hidden_forces: hiddenForces,
          insights: insights,
          full_report: report,
        }

        await supabase.from('reports').insert(reportData)
        // Report saving is silent - errors don't affect UX as data is in localStorage
      } catch {
        // Silent error handling - report data is available in localStorage
      }
    })()
  }

  useEffect(() => {
    const loadReportData = () => {
      const storedResults =
        getLocalStorage<PhaseResult[]>(STORAGE_KEYS.PHASES_RESULTS) ||
        getLocalStorage<PhaseResult[]>(STORAGE_KEYS.ALL_RESULTS)
      const storedOnboarding = getLocalStorage<any>(STORAGE_KEYS.ONBOARDING)

      if (!storedResults) {
        router.push('/')
        return
      }

      const report = computeLifeClockFinalReport(storedResults)
      const hiddenForces = analyzeHiddenForces(storedResults)
      const insights = generateInsights(storedResults, report.profile)

      // Batch state updates
      setPhaseResults(storedResults)
      setFinalReport(report)
      setForces(hiddenForces)
      setRevelations(insights)

      if (storedOnboarding) {
        setUserName(storedOnboarding.name || '')
        setUserEmail(storedOnboarding.email || '')
      }

      saveReportToSupabase(storedResults, report, hiddenForces, insights, storedOnboarding)
      setLoading(false)
    }

    loadReportData()
  }, [router])

  if (loading || !finalReport) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0A0A0A]">
        <div className="text-[#FAFAFA] text-lg" style={{ fontFamily: 'var(--font-body)' }}>
          Generating your report...
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Quick Navigation Buttons */}
      <div className="sticky top-0 z-20 bg-[#0A0A0A]/70 backdrop-blur px-4 py-3 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center gap-3 justify-end">
          <a
            href="/books"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#FAFAFA] hover:bg-white/10 transition"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Back to Ebook
          </a>
          <a
            href="/bonus/new-testament"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#FAFAFA] hover:bg-white/10 transition"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Back to Bonus
          </a>
        </div>
      </div>
      {/* Act I: The Portal Opens */}
      <ActIPortal
        lifeIndex={finalReport.lifeIndex.lifeIndex}
        stage={finalReport.lifeIndex.stage}
        userName={userName}
      />

      {/* Act II: The Mirror of Souls */}

      {/* Section 1: The 3 Hidden Forces */}
      {forces && <ActIIForces forces={forces} />}

      {/* Section 2: The 4 Energies */}
      <ActIIEnergies energyProfile={finalReport.profile} />

      {/* Section 3: The 47 Revelations */}
      <ActIIRevelations
        revelations={revelations}
        userName={userName}
        finalReport={finalReport}
        forces={forces}
      />

      {/* Section 4: Contradictions & Forces */}
      <ActIIContradictions />

      {/* Section 5: Affiliation */}
      {userEmail && <ReferralSection userEmail={userEmail} />}

      {/* Section 6: Download Books */}
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
              style={{ fontFamily: 'var(--font-title)' }}
            >
              Your 10 Bonus Books
            </h2>
            <p className="text-[#BFBFC2] text-lg" style={{ fontFamily: 'var(--font-body)' }}>
              Deepen your transformation with personalized guides
            </p>
          </motion.div>

          {/* Main Card */}
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
                  background:
                    'radial-gradient(circle at center, rgba(229, 201, 126, 0.15) 0%, transparent 70%)',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              />

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.4 }}
                  className="inline-block mb-8"
                >
                  <div className="w-20 h-20 rounded-xl bg-[#E5C97E]/20 border border-[#E5C97E]/30 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-[#E5C97E]" />
                  </div>
                </motion.div>

                <h3
                  className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-4"
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  10 Personalized Ebooks
                </h3>
                <p
                  className="text-[#BFBFC2] text-lg mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Complimentary guides that expand on your LifeClock revelations
                </p>
                <p
                  className="text-[#BFBFC2] text-base mb-8"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Total value: $200
                </p>

                <motion.button
                  onClick={() => router.push('/books')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl text-[#FAFAFA] font-semibold relative overflow-hidden flex items-center gap-3 mx-auto"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(229, 201, 126, 0.8) 0%, rgba(229, 201, 126, 0.6) 100%)',
                    fontFamily: 'var(--font-body)',
                    boxShadow: '0 4px 16px rgba(229, 201, 126, 0.3)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    Download Your 10 Books
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bonus: The New Testament (same UI) */}
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
              style={{ fontFamily: 'var(--font-title)' }}
            >
              The New Testament (Bonus)
            </h2>
            <p className="text-[#BFBFC2] text-lg" style={{ fontFamily: 'var(--font-body)' }}>
              Access the full PDF instantly. Keep it for your personal study and inspiration.
            </p>
          </motion.div>

          {/* Main Card */}
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
                  background:
                    'radial-gradient(circle at center, rgba(229, 201, 126, 0.15) 0%, transparent 70%)',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              />

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.4 }}
                  className="inline-block mb-8"
                >
                  <div className="w-20 h-20 rounded-xl bg-[#E5C97E]/20 border border-[#E5C97E]/30 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-[#E5C97E]" />
                  </div>
                </motion.div>

                <h3
                  className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-4"
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  Bonus Access
                </h3>
                <p
                  className="text-[#BFBFC2] text-lg mb-8"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Enjoy this complimentary bonus in digital format
                </p>

                <motion.a
                  href="/books/The%20New%20Testament_compressed.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl text-[#0A0A0A] font-semibold relative overflow-hidden inline-flex items-center gap-3"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(229, 201, 126, 0.9) 0%, rgba(229, 201, 126, 0.7) 100%)',
                    fontFamily: 'var(--font-body)',
                    boxShadow: '0 4px 16px rgba(229, 201, 126, 0.3)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                    }}
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    Open PDF
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
