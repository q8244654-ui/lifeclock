/**
 * Client-side utility function to export PDF report
 * Calls the API endpoint and handles PDF download
 */

export interface PDFExportData {
  userName: string
  finalReport: any
  forces: any
  revelations: any[]
}

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
    // Call the API endpoint
    const response = await fetch('/api/pdf/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        reportData: finalReport,
        forces,
        revelations,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.error || `Failed to generate PDF: ${response.statusText}`
      throw new Error(errorMessage)
    }

    // Get the PDF blob
    const blob = await response.blob()

    // Create download link (with fallback)
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `LifeClock-${userName}-${Date.now()}.pdf`
    link.rel = 'noopener'
    // Some browsers or CSPs may block programmatic click; open in new tab as fallback
    link.target = '_blank'
    document.body.appendChild(link)
    try {
      link.click()
    } finally {
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to export PDF. Please try again.')
  }
}
