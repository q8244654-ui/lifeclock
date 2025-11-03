import { NextRequest, NextResponse } from 'next/server'
import { generateReportPDF } from '@/lib/emails/pdf-generator'

export const runtime = 'nodejs' // ✅ indispensable pour corriger le problème sur Vercel

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userName, finalReport, forces, revelations } = body

    // Validation des paramètres requis
    if (!userName || !finalReport || !forces || !revelations) {
      return NextResponse.json(
        { error: 'Missing required parameters: userName, finalReport, forces, or revelations' },
        { status: 400 }
      )
    }

    // Validation que revelations est un tableau avec exactement 47 éléments
    if (!Array.isArray(revelations) || revelations.length !== 47) {
      return NextResponse.json(
        { error: 'You must provide exactly 47 revelations' },
        { status: 400 }
      )
    }

    // Générer le PDF
    const pdfBuffer = await generateReportPDF(finalReport, forces, revelations, userName)

    if (!pdfBuffer || pdfBuffer.length === 0) {
      return NextResponse.json({ error: 'Generated PDF buffer is empty' }, { status: 500 })
    }

    // ✅ Conversion propre pour runtime Node sur Vercel
    let arrayBuffer: ArrayBuffer
    if (pdfBuffer instanceof ArrayBuffer) {
      arrayBuffer = pdfBuffer
    } else {
      // Créer un nouvel ArrayBuffer à partir du Buffer
      // Copier les données pour garantir un ArrayBuffer standard (pas SharedArrayBuffer)
      const uint8Array = new Uint8Array(pdfBuffer)
      arrayBuffer = new ArrayBuffer(uint8Array.length)
      new Uint8Array(arrayBuffer).set(uint8Array)
    }

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="LifeClock-${userName}-${Date.now()}.pdf"`,
      },
    })
  } catch (err: any) {
    console.error('Error generating PDF:', err)
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: err.message },
      { status: 500 }
    )
  }
}
