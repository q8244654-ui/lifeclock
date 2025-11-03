import { NextResponse } from 'next/server'
import React from 'react'
import { pdf } from '@react-pdf/renderer'
import { SimplePDFDocument } from '@/lib/emails/pdf-fixed-template'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    console.log('[PDF Fixed] Generating simple fixed PDF...')

    // Create the PDF document component
    const doc = React.createElement(SimplePDFDocument)
    const pdfInstance = pdf(doc)
    // Use Node-friendly buffer for predictable Content-Length
    const buffer = await pdfInstance.toBuffer()
    const nodeBuffer = buffer as unknown as Buffer
    const size = nodeBuffer.length
    console.log(
      '[PDF Fixed] PDF generated successfully',
      size !== undefined ? `(size: ${size} bytes)` : '(stream)'
    )

    const body = new Uint8Array(nodeBuffer)
    return new Response(body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="LifeClock-Report.pdf"',
        'Content-Length': String(size),
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('[PDF Fixed] Error generating PDF:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate PDF'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
