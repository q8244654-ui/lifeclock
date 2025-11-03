/**
 * Utility function to download PDFs from public/docs
 * This function ensures reliable downloads by fetching the file as a blob
 * and creating a download link, which works regardless of server headers.
 */

export interface DownloadOptions {
  /** Optional custom filename for the download */
  downloadName?: string
  /** Whether to show loading state (managed by caller) */
  onProgress?: (loading: boolean) => void
}

/**
 * Downloads a PDF file from the public/docs directory
 * @param filename - The filename (e.g., 'ebook-1.pdf' or 'The New Testament.pdf')
 * @param options - Optional download configuration
 * @returns Promise that resolves when download is triggered
 */
export async function downloadPDF(filename: string, options: DownloadOptions = {}): Promise<void> {
  const { downloadName, onProgress } = options

  try {
    // Show loading state if callback provided
    onProgress?.(true)

    // Get the PDF URL using the same logic as PDF_CONFIG
    const pdfUrl = getPdfUrl(filename)

    // Check if it's an external URL
    const isExternal = pdfUrl.startsWith('http://') || pdfUrl.startsWith('https://')

    if (isExternal) {
      // For external URLs, open in new tab (redirect)
      // The browser will handle the download based on the server's Content-Disposition header
      window.open(pdfUrl, '_blank', 'noopener,noreferrer')
      onProgress?.(false)
      return
    }

    // For local files, fetch as blob to ensure reliable download
    // This works regardless of server headers
    const response = await fetch(pdfUrl, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`)
    }

    // Get the blob
    const blob = await response.blob()

    // Create object URL
    const blobUrl = window.URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = downloadName || filename
    link.rel = 'noopener'
    link.style.display = 'none'

    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
      onProgress?.(false)
    }, 100)
  } catch (error) {
    onProgress?.(false)
    console.error('Error downloading PDF:', error)
    throw error
  }
}

/**
 * Gets the PDF URL using the same logic as PDF_CONFIG
 * This ensures consistency across the application
 */
function getPdfUrl(filename: string): string {
  // Base URL for external PDF hosting
  const baseUrl = process.env.NEXT_PUBLIC_PDF_BASE_URL || ''

  // Individual PDF URLs (optional, overrides BASE_URL for specific files)
  const customUrls: Record<string, string> = {
    'ebook-1.pdf': process.env.NEXT_PUBLIC_PDF_1_URL || '',
    'ebook-2.pdf': process.env.NEXT_PUBLIC_PDF_2_URL || '',
    'ebook-3.pdf': process.env.NEXT_PUBLIC_PDF_3_URL || '',
    'ebook-4.pdf': process.env.NEXT_PUBLIC_PDF_4_URL || '',
    'ebook-5.pdf': process.env.NEXT_PUBLIC_PDF_5_URL || '',
    'ebook-6.pdf': process.env.NEXT_PUBLIC_PDF_6_URL || '',
    'ebook-7.pdf': process.env.NEXT_PUBLIC_PDF_7_URL || '',
    'ebook-8.pdf': process.env.NEXT_PUBLIC_PDF_8_URL || '',
    'ebook-9.pdf': process.env.NEXT_PUBLIC_PDF_9_URL || '',
    'ebook-10.pdf': process.env.NEXT_PUBLIC_PDF_10_URL || '',
  }

  // First check for custom URL
  const customUrl = customUrls[filename]
  if (customUrl) {
    return customUrl
  }

  // Then check for base URL
  if (baseUrl) {
    return `${baseUrl}/${filename}`
  }

  // Fallback to local static files in /docs/
  return `/docs/${filename}`
}
