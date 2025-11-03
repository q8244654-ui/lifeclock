'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { downloadPDF } from '@/lib/pdf-download'

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
  const [downloading, setDownloading] = useState(false)

  // Extract filename from path if it starts with /docs/
  const cleanFilename = filename.startsWith('/docs/') ? filename.replace('/docs/', '') : filename
  const downloadFilename = downloadName || cleanFilename

  // Styles par variante
  const variantStyles = {
    primary:
      'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed',
    outline:
      'px-4 py-2 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  }

  const baseClasses = `inline-flex items-center justify-center gap-2 font-semibold ${variantStyles[variant]}`

  const handleDownload = async () => {
    try {
      await downloadPDF(cleanFilename, {
        downloadName: downloadFilename,
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

  return (
    <motion.button
      onClick={handleDownload}
      disabled={downloading}
      className={`${baseClasses} ${className}`}
      whileHover={{ scale: downloading ? 1 : 1.02 }}
      whileTap={{ scale: downloading ? 1 : 0.98 }}
    >
      {downloading ? (
        <>
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Téléchargement...</span>
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          {label}
        </>
      )}
    </motion.button>
  )
}
