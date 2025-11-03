'use client'

interface PDFIframeEmbedProps {
  /** Nom du fichier PDF à afficher */
  filename: string
  /** Hauteur de l'iframe */
  height?: string
  /** Chemin de base pour les PDFs (par défaut: /docs) */
  basePath?: string
  /** Classes CSS supplémentaires */
  className?: string
}

/**
 * Composant simple pour afficher un PDF dans une iframe
 * Utilise le visualiseur PDF natif du navigateur
 */
export default function PDFIframeEmbed({
  filename,
  height = '600px',
  basePath = '/docs',
  className = '',
}: PDFIframeEmbedProps) {
  const pdfUrl = `${basePath}/${encodeURIComponent(filename)}`

  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={`${pdfUrl}?mode=view`}
        width="100%"
        height={height}
        className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg"
        title={filename}
        style={{
          backgroundColor: '#f5f5f5',
        }}
      />
    </div>
  )
}
