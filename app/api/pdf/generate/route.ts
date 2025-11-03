import { NextResponse } from 'next/server'
import { generateReportPDF } from '@/lib/emails/pdf-generator'

export const dynamic = 'force-dynamic'
// Ensure this runs in Node.js runtime, not Edge
export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    console.log('[PDF API] Received PDF generation request')
    const body = await request.json()
    const { reportData, forces, revelations, userName } = body

    console.log('[PDF API] Request data:', {
      hasReportData: !!reportData,
      hasForces: !!forces,
      revelationsCount: Array.isArray(revelations) ? revelations.length : 0,
      userName: userName,
    })

    if (!reportData || !forces || !revelations || !userName) {
      console.error('[PDF API] Missing required fields:', {
        reportData: !!reportData,
        forces: !!forces,
        revelations: !!revelations,
        userName: !!userName,
      })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate forces is an object (not array/null)
    // Note: After JSON serialization, undefined values become null, but the object itself must be valid
    if (
      forces === null ||
      forces === undefined ||
      typeof forces !== 'object' ||
      Array.isArray(forces)
    ) {
      console.error('[PDF API] Invalid forces format:', {
        type: typeof forces,
        isArray: Array.isArray(forces),
        isNull: forces === null,
        isUndefined: forces === undefined,
      })
      return NextResponse.json(
        { error: 'Invalid forces format: must be an object' },
        { status: 400 }
      )
    }

    // Validate revelations is an array
    if (!Array.isArray(revelations)) {
      console.error('[PDF API] Invalid revelations format:', {
        type: typeof revelations,
        isArray: Array.isArray(revelations),
      })
      return NextResponse.json(
        { error: 'Invalid revelations format: must be an array' },
        { status: 400 }
      )
    }

    // Validate that exactly 47 revelations are provided
    if (revelations.length !== 47) {
      console.error('[PDF API] Invalid revelations count:', {
        count: revelations.length,
        expected: 47,
      })
      return NextResponse.json(
        { error: 'You must reveal all 47 revelations before printing' },
        { status: 400 }
      )
    }

    console.log('[PDF API] Calling generateReportPDF...')
    const pdfBuffer = await generateReportPDF(reportData, forces, revelations, userName)
    console.log('[PDF API] PDF generated successfully, size:', pdfBuffer.length)

    // Return PDF with explicit Content-Length using native Response
    // Convert Buffer to ArrayBuffer for Web API Response compatibility
    // generateReportPDF returns a Buffer, so we convert it to ArrayBuffer for Response BodyInit
    const size = pdfBuffer.length
    // Convert Buffer to ArrayBuffer which is universally accepted by Response BodyInit
    // Using Uint8Array as intermediate step ensures compatibility with both Node.js and Edge runtime
    const arrayBuffer: ArrayBuffer = new Uint8Array(pdfBuffer).buffer

    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="LifeClock-${userName}-${Date.now()}.pdf"`,
        'Content-Length': String(size),
        // Do not set Content-Encoding to prevent Vercel/Next.js automatic compression
        // Binary files like PDFs should not be compressed
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('[PDF API] Error generating PDF:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate PDF'
    const errorStack = error instanceof Error ? error.stack : undefined

    // Provide user-friendly error messages
    let userMessage = errorMessage
    if (
      errorMessage.includes('hasOwnProperty') ||
      errorMessage.includes('Invalid data structure')
    ) {
      userMessage =
        'Unable to generate PDF due to data formatting issue. Please try again or contact support if the problem persists.'
    } else if (errorMessage.includes('Missing required data')) {
      userMessage =
        'Unable to generate PDF: Some required information is missing. Please ensure all revelations are revealed and try again.'
    } else if (errorMessage.includes('No valid revelations')) {
      userMessage =
        'Unable to generate PDF: No valid revelations found. Please ensure all 47 revelations are available.'
    }

    console.error('[PDF API] Error details:', { errorMessage, errorStack })
    return NextResponse.json(
      {
        error: userMessage,
        details: process.env.NODE_ENV === 'development' ? errorStack : undefined,
      },
      { status: 500 }
    )
  }
}
