'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from 'lucide-react'
import { downloadPDF } from '@/lib/pdf-download'

interface PDFModalProps {
  /** PDF filename to display */
  filename: string
  /** Whether the modal is open */
  isOpen: boolean
  /** Function called to close the modal */
  onClose: () => void
  /** Base path for PDFs (default: /docs) */
  basePath?: string
  /** External URL for PDF (overrides basePath if provided) */
  externalUrl?: string
  /** Show download button */
  showDownload?: boolean
}

export default function PDFModal({
  filename,
  isOpen,
  onClose,
  basePath = '/docs',
  externalUrl,
  showDownload = true,
}: PDFModalProps) {
  // Close with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const [downloading, setDownloading] = useState(false)
  const pdfUrl = externalUrl || `${basePath}/${encodeURIComponent(filename)}`
  const isExternal = externalUrl
    ? true
    : pdfUrl.startsWith('http://') || pdfUrl.startsWith('https://')

  const handleDownload = async () => {
    if (isExternal) {
      // For external URLs, open in new tab
      window.open(pdfUrl, '_blank', 'noopener,noreferrer')
    } else {
      // For local files, use the robust download function
      try {
        await downloadPDF(filename, {
          downloadName: filename,
          onProgress: loading => {
            setDownloading(loading)
          },
        })
      } catch (error) {
        console.error('Error downloading PDF:', error)
        alert('Erreur lors du téléchargement. Veuillez réessayer.')
        setDownloading(false)
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-[#1A1A1A] rounded-xl w-full max-w-6xl h-[90vh] relative shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header with buttons */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold text-sm truncate flex-1 mr-4">{filename}</h3>
              <div className="flex gap-2">
                {showDownload && (
                  <motion.button
                    onClick={handleDownload}
                    disabled={downloading}
                    whileHover={{ scale: downloading ? 1 : 1.1 }}
                    whileTap={{ scale: downloading ? 1 : 0.9 }}
                    className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title={downloading ? 'Téléchargement...' : 'Télécharger'}
                  >
                    {downloading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                  </motion.button>
                )}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white p-2 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Iframe with PDF */}
            <iframe
              src={isExternal ? pdfUrl : `${pdfUrl}?mode=view`}
              className="w-full h-full rounded-xl"
              title={filename}
              style={{
                border: 'none',
                backgroundColor: '#0A0A0A',
              }}
            />

            {/* Footer with instructions (optional) */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white/60 text-xs text-center">
                Press <kbd className="bg-white/10 px-2 py-1 rounded">ESC</kbd> to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
