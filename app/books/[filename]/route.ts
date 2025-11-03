import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function GET(_req: NextRequest, context: { params: Promise<{ filename: string }> }) {
  const { filename: rawName } = await context.params

  // Decode URL-encoded filename (handles %20 for spaces, etc.)
  const decodedFilename = decodeURIComponent(rawName)

  // Basic sanitization: disallow path traversal
  if (!decodedFilename || decodedFilename.includes('..') || decodedFilename.includes('/')) {
    return new NextResponse('Invalid file name', { status: 400 })
  }

  // Public access: no cookie/secret required

  // Serve files from public/books in production
  const filePath = path.join(process.cwd(), 'public', 'books', decodedFilename)

  try {
    const stat = await fs.stat(filePath)
    if (!stat.isFile()) {
      return new NextResponse('Not found', { status: 404 })
    }

    const fileBuffer = await fs.readFile(filePath)

    // Infer content type from extension (PDF primary use-case)
    const ext = path.extname(decodedFilename).toLowerCase()
    const contentType = ext === '.pdf' ? 'application/pdf' : 'application/octet-stream'

    // Convert Buffer to Uint8Array for proper binary handling in production
    const fileBody = new Uint8Array(fileBuffer)

    return new NextResponse(fileBody, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Force download behavior to mirror previous public/ behavior
        'Content-Disposition': `attachment; filename="${encodeURIComponent(decodedFilename)}"`,
        'Content-Length': String(stat.size),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return new NextResponse('Not found', { status: 404 })
    }
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
