/**
 * Client-side utility function to download PDF report
 * Generates PDF dynamically via API route
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
    // Appeler l'API pour générer le PDF dynamiquement
    const response = await fetch('/api/pdf/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        finalReport,
        forces,
        revelations,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || 'Failed to generate PDF')
    }

    // Récupérer le blob du PDF
    const blob = await response.blob()

    // Créer un lien de téléchargement
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `LifeClock-${userName}-${Date.now()}.pdf`
    link.rel = 'noopener'
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
    throw new Error('Failed to download PDF. Please try again.')
  }
}
