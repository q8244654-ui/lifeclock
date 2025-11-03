'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

interface StaticPDFDownloadButtonProps {
  /** Chemin du fichier PDF dans /public/docs (ex: "mon-fichier.pdf") */
  filename: string
  /** Nom du fichier pour le téléchargement (optionnel, utilise filename par défaut) */
  downloadName?: string
  /** Texte du bouton */
  label?: string
  /** Classes CSS personnalisées */
  className?: string
  /** Variante du style du bouton */
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function StaticPDFDownloadButton({
  filename,
  downloadName,
  label = 'Télécharger le PDF',
  className = '',
  variant = 'primary',
}: StaticPDFDownloadButtonProps) {
  // Assure que le chemin commence par /docs/
  const pdfPath = filename.startsWith('/docs/') ? filename : `/docs/${filename}`
  const downloadFilename = downloadName || filename

  // Styles par variante
  const variantStyles = {
    primary: 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors',
    secondary:
      'px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all',
    outline:
      'px-4 py-2 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors',
  }

  const baseClasses = `inline-flex items-center justify-center gap-2 font-semibold ${variantStyles[variant]}`

  // Direct link to static file - Next.js serves files from /public/docs/ directly
  // This ensures no corruption as files are served as-is without any transformation
  return (
    <motion.a
      href={pdfPath}
      download={downloadFilename}
      className={`${baseClasses} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Download className="w-5 h-5" />
      {label}
    </motion.a>
  )
}
