'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from 'lucide-react'

interface PDFModalProps {
  /** Nom du fichier PDF à afficher */
  filename: string
  /** Indique si la modal est ouverte */
  isOpen: boolean
  /** Fonction appelée pour fermer la modal */
  onClose: () => void
  /** Chemin de base pour les PDFs (par défaut: /docs) */
  basePath?: string
  /** Afficher le bouton de téléchargement */
  showDownload?: boolean
}

export default function PDFModal({
  filename,
  isOpen,
  onClose,
  basePath = '/docs',
  showDownload = true,
}: PDFModalProps) {
  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Empêcher le scroll du body quand la modal est ouverte
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

  const pdfUrl = `${basePath}/${encodeURIComponent(filename)}`

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = `${pdfUrl}?mode=download`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
            {/* Header avec boutons */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold text-sm truncate flex-1 mr-4">{filename}</h3>
              <div className="flex gap-2">
                {showDownload && (
                  <motion.button
                    onClick={handleDownload}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white p-2 rounded-lg transition-colors"
                    title="Télécharger"
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                )}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white p-2 rounded-lg transition-colors"
                  title="Fermer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Iframe avec le PDF */}
            <iframe
              src={`${pdfUrl}?mode=view`}
              className="w-full h-full rounded-xl"
              title={filename}
              style={{
                border: 'none',
                backgroundColor: '#0A0A0A',
              }}
            />

            {/* Footer avec instructions (optionnel) */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white/60 text-xs text-center">
                Appuyez sur <kbd className="bg-white/10 px-2 py-1 rounded">ESC</kbd> pour fermer
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
