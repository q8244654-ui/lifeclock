'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Download, BookOpen, FileText, Eye, ExternalLink } from 'lucide-react'
import { PDFModal } from '@/components/pdf-viewer'
import { PDF_CONFIG } from '@/lib/constants'

// Phase colors matching the quiz phases
const PHASE_COLORS = [
  '#94A3B8', // Phase 1 - Silver/Grey (The Mirror)
  '#3B82F6', // Phase 2 - Blue (The Control)
  '#EF4444', // Phase 3 - Red (The Desire)
  '#EC4899', // Phase 4 - Pink (Love)
  '#8B5CF6', // Phase 5 - Violet (Time)
  '#F59E0B', // Phase 6 - Gold (Money)
  '#10B981', // Phase 7 - Green (The Body)
  '#0EA5E9', // Phase 8 - Cyan (Discipline)
  '#FEF3C7', // Phase 9 - White/Light (Faith)
  '#9333EA', // Phase 10 - Purple (Legacy)
]

// List of 10 bonus books - each corresponds to a phase
const BOOKS = [
  {
    id: 1,
    phase: 1,
    title: 'The Self Revelation',
    filename: 'ebook-1.pdf',
    description: 'Explore the depths of your hidden identity and unlock your true self',
    color: PHASE_COLORS[0],
  },
  {
    id: 2,
    phase: 2,
    title: 'Mastering Your Forces',
    filename: 'ebook-2.pdf',
    description: 'Learn to channel your inner power and harness your hidden strengths',
    color: PHASE_COLORS[1],
  },
  {
    id: 3,
    phase: 3,
    title: 'Overcoming Your Fears',
    filename: 'ebook-3.pdf',
    description: 'Transform your fears into engines of growth and transformation',
    color: PHASE_COLORS[2],
  },
  {
    id: 4,
    phase: 4,
    title: "The Heart's Energy",
    filename: 'ebook-4.pdf',
    description: 'Discover the secrets of your authentic heart and emotional core',
    color: PHASE_COLORS[3],
  },
  {
    id: 5,
    phase: 5,
    title: 'Time and Wisdom',
    filename: 'ebook-5.pdf',
    description: 'Understand your relationship with time and inner maturity',
    color: PHASE_COLORS[4],
  },
  {
    id: 6,
    phase: 6,
    title: 'Inner Abundance',
    filename: 'ebook-6.pdf',
    description: 'Create prosperity from your essence and true nature',
    color: PHASE_COLORS[5],
  },
  {
    id: 7,
    phase: 7,
    title: 'The Body as Temple',
    filename: 'ebook-7.pdf',
    description: 'Honor and heal your physical vessel with mindful awareness',
    color: PHASE_COLORS[6],
  },
  {
    id: 8,
    phase: 8,
    title: 'Liberating Discipline',
    filename: 'ebook-8.pdf',
    description: 'Build structures that set you free rather than confine you',
    color: PHASE_COLORS[7],
  },
  {
    id: 9,
    phase: 9,
    title: 'The Eternal Spirit',
    filename: 'ebook-9.pdf',
    description: 'Connect with your spiritual dimension and eternal essence',
    color: PHASE_COLORS[8],
  },
  {
    id: 10,
    phase: 10,
    title: 'Your Legacy',
    filename: 'ebook-10.pdf',
    description: 'Create an impact that transcends your existence and echoes through time',
    color: PHASE_COLORS[9],
  },
]

export default function BooksPage() {
  const router = useRouter()
  const [downloading, setDownloading] = useState<number | null>(null)
  const [viewingBook, setViewingBook] = useState<(typeof BOOKS)[0] | null>(null)

  const handleDownload = (book: (typeof BOOKS)[0]) => {
    setDownloading(book.id)
    try {
      const pdfUrl = PDF_CONFIG.getUrl(book.filename)

      // If external URL, open in new tab (redirect)
      if (pdfUrl.startsWith('http://') || pdfUrl.startsWith('https://')) {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer')
      } else {
        // Local file download
        const link = document.createElement('a')
        link.href = pdfUrl
        link.download = book.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Error triggering download:', error)
      alert('Error downloading. Please try again.')
    } finally {
      setTimeout(() => {
        setDownloading(null)
      }, 600)
    }
  }

  const getPdfUrl = (filename: string): string => {
    return PDF_CONFIG.getUrl(filename)
  }

  const isExternalUrl = (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://')
  }

  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
        {/* Golden Halo Animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.6, 0.4], scale: [0.5, 1.2, 1] }}
          transition={{ duration: 15, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-[600px] h-[600px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(229, 201, 126, 0.4) 0%, rgba(229, 201, 126, 0.1) 40%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center space-y-8 max-w-3xl px-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-2xl bg-[#E5C97E]/20 border border-[#E5C97E]/30 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-[#E5C97E]" />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-2"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            {'Your 10 Bonus Books'.split(' ').map((word, index) => (
              <motion.span
                key={index}
                className="text-[#FAFAFA] text-2xl md:text-4xl font-semibold tracking-wide uppercase"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: 'easeOut',
                    },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="text-[#BFBFC2] text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Deepen your transformation with personalized guides
          </motion.p>
        </motion.div>
      </div>

      {/* Books Grid Section */}
      <div className="relative min-h-screen bg-[#0A0A0A] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-4 uppercase tracking-wide"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              10 Personalized Ebooks
            </h2>
            <p className="text-[#BFBFC2] text-lg mb-8" style={{ fontFamily: 'var(--font-body)' }}>
              Complimentary guides that expand on your LifeClock revelations
            </p>

            {/* Button to access full report */}
            <motion.button
              onClick={() => router.push('/report')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl text-[#FAFAFA] font-semibold relative overflow-hidden flex items-center gap-3 mx-auto"
              style={{
                background:
                  'linear-gradient(135deg, rgba(229, 201, 126, 0.8) 0%, rgba(229, 201, 126, 0.6) 100%)',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 16px rgba(229, 201, 126, 0.3)',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
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
                <FileText className="w-5 h-5" />
                View My Full Report
              </span>
            </motion.button>
          </motion.div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {BOOKS.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group"
              >
                <div
                  className="backdrop-blur-xl border rounded-xl p-6 h-full flex flex-col transition-all duration-300"
                  style={{
                    borderColor: `${book.color}40`,
                    background: `linear-gradient(135deg, ${book.color}15 0%, rgba(10, 10, 10, 0.8) 50%, rgba(10, 10, 10, 0.4) 100%)`,
                    boxShadow: `0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px ${book.color}20`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${book.color}60`
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${book.color}30`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${book.color}40`
                    e.currentTarget.style.boxShadow = `0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px ${book.color}20`
                  }}
                >
                  {/* Book Icon */}
                  <div className="mb-4">
                    <div
                      className="w-12 h-12 rounded-lg border flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: `${book.color}20`,
                        borderColor: `${book.color}40`,
                      }}
                    >
                      <BookOpen className="w-6 h-6" style={{ color: book.color }} />
                    </div>
                  </div>

                  {/* Book Content */}
                  <div className="flex-1 mb-6">
                    <h3
                      className="text-[#FAFAFA] text-xl font-semibold mb-3"
                      style={{ fontFamily: 'var(--font-title)' }}
                    >
                      {book.title}
                    </h3>
                    <p
                      className="text-[#BFBFC2] text-base leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {book.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* View Button */}
                    <motion.button
                      onClick={() => setViewingBook(book)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 py-3 rounded-lg text-[#FAFAFA] font-semibold relative overflow-hidden flex items-center justify-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, ${book.color}60 0%, ${book.color}40 100%)`,
                        fontFamily: 'var(--font-body)',
                        boxShadow: `0 4px 16px ${book.color}20`,
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
                      <span className="relative z-10 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </span>
                    </motion.button>

                    {/* Download Button */}
                    <motion.button
                      onClick={() => handleDownload(book)}
                      disabled={downloading === book.id}
                      whileHover={{ scale: downloading === book.id ? 1 : 1.02 }}
                      whileTap={{ scale: downloading === book.id ? 1 : 0.98 }}
                      className="flex-1 px-4 py-3 rounded-lg text-[#FAFAFA] font-semibold relative overflow-hidden flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background:
                          downloading === book.id
                            ? `linear-gradient(135deg, ${book.color}40 0%, ${book.color}20 100%)`
                            : `linear-gradient(135deg, ${book.color}80 0%, ${book.color}60 100%)`,
                        fontFamily: 'var(--font-body)',
                        boxShadow: `0 4px 16px ${book.color}30`,
                      }}
                    >
                      {downloading !== book.id && (
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
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {downloading === book.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="hidden sm:inline">Downloading...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download</span>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div
              className="backdrop-blur-xl border border-white/10 rounded-xl p-6 inline-block"
              style={{
                background:
                  'linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.4) 100%)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
            >
              <p
                className="text-[#BFBFC2] text-base mb-2"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                These books are complimentary with your LifeClock purchase
              </p>
              <p
                className="text-[#E5C97E] text-xl font-bold"
                style={{ fontFamily: 'var(--font-title)' }}
              >
                Total value: $200
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PDF Modal */}
      {viewingBook && (
        <PDFModal
          filename={viewingBook.filename}
          isOpen={!!viewingBook}
          onClose={() => setViewingBook(null)}
          basePath={PDF_CONFIG.BASE_URL || '/pdfs'}
          externalUrl={
            isExternalUrl(getPdfUrl(viewingBook.filename))
              ? getPdfUrl(viewingBook.filename)
              : undefined
          }
          showDownload={true}
        />
      )}
    </div>
  )
}
