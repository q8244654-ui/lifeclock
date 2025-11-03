/**
 * Lit le fichier PDF statique depuis public/docs
 * Cette fonction utilise des imports dynamiques Node.js natifs et doit uniquement être utilisée côté serveur
 */
export async function readReportPDF(): Promise<Buffer | null> {
  try {
    // Import dynamique pour éviter les problèmes avec Turbopack lors du build
    const { readFile } = await import('node:fs/promises')
    const pathModule = await import('node:path')

    const REPORT_PDF_FILENAME = 'LifeClock-Report.pdf'
    const filePath = pathModule.default.join(process.cwd(), 'public', 'docs', REPORT_PDF_FILENAME)
    const pdfBuffer = await readFile(filePath)
    console.log('[Email] PDF file loaded successfully:', filePath)
    return pdfBuffer
  } catch (error) {
    console.error('[Email] Error reading PDF file:', error)
    return null
  }
}
