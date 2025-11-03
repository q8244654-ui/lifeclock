'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Download } from 'lucide-react'
import PDFModal from './pdf-modal'

interface PDFViewButtonProps {
  /** Nom du fichier PDF */
  filename: string
  /** Chemin de base pour les PDFs (par défaut: /docs) */
  basePath?: string
  /** Texte du bouton */
  label?: string
  /** Afficher aussi l'option téléchargement */
  showDownload?: boolean
  /** Variante du style */
  variant?: 'primary' | 'secondary' | 'outline'
  /** Classes CSS supplémentaires */
  className?: string
}

export default function PDFViewButton({
  filename,
  basePath = '/docs',
  label = 'Voir le PDF',
  showDownload = true,
  variant = 'primary',
  className = '',
}: PDFViewButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const variantStyles = {
    primary: 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors',
    secondary:
      'px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all',
    outline:
      'px-4 py-2 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors',
  }

  const baseClasses = `inline-flex items-center justify-center gap-2 font-semibold ${variantStyles[variant]} ${className}`

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className={baseClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Eye className="w-5 h-5" />
        {label}
      </motion.button>

      <PDFModal
        filename={filename}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        basePath={basePath}
        showDownload={showDownload}
      />
    </>
  )
}
