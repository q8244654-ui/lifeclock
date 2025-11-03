import { NextRequest } from 'next/server'
import { readFileSync, statSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function GET(_req: NextRequest, context: { params: Promise<{ filename: string }> }) {
  const { filename: rawName } = await context.params

  // Decode URL-encoded filename (handles %20 for spaces, etc.)
  const decodedFilename = decodeURIComponent(rawName)

  // Basic sanitization: disallow path traversal
  if (!decodedFilename || decodedFilename.includes('..') || decodedFilename.includes('/')) {
    return new Response('Invalid file name', { status: 400 })
  }

  // Public access: no cookie/secret required

  // Serve files from public/books in production
  const filePath = path.join(process.cwd(), 'public', 'books', decodedFilename)

  try {
    const stat = statSync(filePath)
    if (!stat.isFile()) {
      return new Response('Not found', { status: 404 })
    }

    // Read file synchronously to ensure exact binary match
    const fileBuffer = readFileSync(filePath)

    // Infer content type from extension (PDF primary use-case)
    const ext = path.extname(decodedFilename).toLowerCase()
    const contentType = ext === '.pdf' ? 'application/pdf' : 'application/octet-stream'

    // Use native Response (not NextResponse) with Buffer directly converted to Uint8Array
    // This ensures exact binary transmission without any transformation
    const fileBody = new Uint8Array(fileBuffer)

    return new Response(fileBody, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Force download behavior
        'Content-Disposition': `attachment; filename="${encodeURIComponent(decodedFilename)}"`,
        'Content-Length': String(stat.size),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return new Response('Not found', { status: 404 })
    }
    return new Response('Internal Server Error', { status: 500 })
  }
}
