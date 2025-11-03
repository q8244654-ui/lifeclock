'use client'

interface PDFIframeEmbedProps {
  /** PDF filename to display */
  filename: string
  /** Iframe height */
  height?: string
  /** Base path for PDFs (default: /docs) */
  basePath?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Simple component to display a PDF in an iframe
 * Uses the browser's native PDF viewer
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
