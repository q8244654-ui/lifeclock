'use client'

import { useState } from 'react'
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
  const [downloading, setDownloading] = useState(false)

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

  const baseClasses = `inline-flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]}`

  const handleDownload = async () => {
    if (downloading) return

    setDownloading(true)
    try {
      // Use fetch to download the file as blob for better reliability
      // This ensures the PDF is correctly downloaded without corruption
      const response = await fetch(pdfPath)

      if (!response.ok) {
        throw new Error(`Failed to download: ${response.status} ${response.statusText}`)
      }

      // Get the blob from the response
      const blob = await response.blob()

      // Create a download link with the blob
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = downloadFilename
      link.rel = 'noopener'
      document.body.appendChild(link)

      try {
        link.click()
      } finally {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Erreur lors du téléchargement. Veuillez réessayer.')
    } finally {
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
      <Download className="w-5 h-5" />
      {downloading ? 'Téléchargement...' : label}
    </motion.button>
  )
}
