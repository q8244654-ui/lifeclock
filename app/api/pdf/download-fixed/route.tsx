import { NextResponse } from "next/server"
import React from "react"
import { pdf } from "@react-pdf/renderer"
import { SimplePDFDocument } from "@/lib/emails/pdf-fixed-template"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  try {
    console.log('[PDF Fixed] Generating simple fixed PDF...')

    // Create the PDF document component
    const doc = React.createElement(SimplePDFDocument)
    const pdfInstance = pdf(doc)
    const buffer = await pdfInstance.toBuffer()
    const size = buffer instanceof Uint8Array ? buffer.byteLength : undefined
    console.log(
      '[PDF Fixed] PDF generated successfully',
      size !== undefined ? `(size: ${size} bytes)` : '(stream)'
    )

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="LifeClock-Report.pdf"',
      },
    })
  } catch (error) {
    console.error("[PDF Fixed] Error generating PDF:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to generate PDF"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

