/**
 * Client-side utility function to download PDF report
 * Opens a direct link to a static PDF file in public/docs
 */

export interface PDFExportData {
  userName: string
  finalReport: any
  forces: any
  revelations: any[]
}

/**
 * Configuration: nom du fichier PDF statique dans public/docs
 * Changez cette valeur pour pointer vers votre fichier de rapport PDF
 */
const REPORT_PDF_FILENAME = 'LifeClock-Report.pdf' // Modifiez selon votre fichier

export async function exportPDFReport(data: PDFExportData): Promise<void> {
  const { userName, finalReport, forces, revelations } = data

  // Client-side validation: check that we have exactly 47 revelations
  if (!Array.isArray(revelations) || revelations.length !== 47) {
    throw new Error('You must reveal all 47 revelations before printing')
  }

  // Validate required fields
  if (!userName || !finalReport || !forces) {
    throw new Error('Missing required data for PDF export')
  }

  try {
    // Créer un lien direct vers le fichier PDF statique dans public/docs
    const pdfPath = `/docs/${encodeURIComponent(REPORT_PDF_FILENAME)}`

    // Créer et déclencher le téléchargement
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = `LifeClock-${userName}-${Date.now()}.pdf`
    link.rel = 'noopener'
    document.body.appendChild(link)
    try {
      link.click()
    } finally {
      document.body.removeChild(link)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to download PDF. Please try again.')
  }
}
