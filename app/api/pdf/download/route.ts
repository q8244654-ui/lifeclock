import { readFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  // Construct the file path
  const filePath = path.join(process.cwd(), 'public', 'docs', 'The New Testament.pdf')

  console.log('Serving PDF:', filePath)

  try {
    // Read the file from disk
    const fileBuffer = await readFile(filePath)

    // Log file size for debugging
    console.log('PDF file size:', fileBuffer.length, 'bytes')

    // Convert Buffer to Uint8Array for Response compatibility
    const uint8Array = new Uint8Array(fileBuffer)

    // Return the PDF with correct headers
    return new Response(uint8Array, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="The-New-Testament.pdf"',
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('[PDF Download] Error reading file:', error)

    // Handle file not found error
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : 'Failed to read PDF file'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
