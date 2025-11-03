import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

// Serve files moved under app/books as if they were static under /books/<filename>
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params

  // Basic filename validation to avoid path traversal
  if (!/^[A-Za-z0-9._ -]+$/.test(filename)) {
    return new NextResponse('Invalid filename', { status: 400 })
  }

  // Build absolute path to the PDF under app/books
  const filePath = path.join(process.cwd(), 'app', 'books', filename)

  try {
    const data = await fs.readFile(filePath)

    // Infer content type from extension (PDF expected)
    const isPdf = filename.toLowerCase().endsWith('.pdf')
    const contentType = isPdf ? 'application/pdf' : 'application/octet-stream'

    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Suggest download; adjust to inline if needed
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err: any) {
    if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
      return new NextResponse('File not found', { status: 404 })
    }
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
