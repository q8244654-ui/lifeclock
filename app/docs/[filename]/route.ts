import { NextRequest } from 'next/server'
import { statSync, readFileSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function GET(req: NextRequest, context: { params: Promise<{ filename: string }> }) {
  const { filename: rawName } = await context.params

  // Decode URL-encoded filename (handles %20 for spaces, etc.)
  const decodedFilename = decodeURIComponent(rawName)

  // Basic sanitization: disallow path traversal
  if (!decodedFilename || decodedFilename.includes('..') || decodedFilename.includes('/')) {
    return new Response('Invalid file name', { status: 400 })
  }

  // Public access: no cookie/secret required

  // Serve files from public/docs in production
  const filePath = path.join(process.cwd(), 'public', 'docs', decodedFilename)

  try {
    const stat = statSync(filePath)
    if (!stat.isFile()) {
      return new Response('Not found', { status: 404 })
    }

    // Read the entire file as Buffer to ensure complete and correct transmission
    // This avoids stream conversion issues that can corrupt PDF files
    const fileBuffer = readFileSync(filePath)

    // Convert Buffer to Uint8Array for better compatibility with Next.js Response
    // This ensures the binary data is properly transmitted without corruption
    const uint8Array = new Uint8Array(fileBuffer)

    // Infer content type from extension (PDF primary use-case)
    const ext = path.extname(decodedFilename).toLowerCase()
    const contentType = ext === '.pdf' ? 'application/pdf' : 'application/octet-stream'

    // Check query parameter to determine if PDF should be displayed inline or downloaded
    const { searchParams } = new URL(req.url)
    const mode = searchParams.get('mode')
    // If mode=view, display inline. Otherwise, force download (default behavior)
    const disposition = mode === 'view' ? 'inline' : 'attachment'

    // Response headers with Content-Length for proper file transmission
    const headers = new Headers({
      'Content-Type': contentType,
      // Allow inline viewing when mode=view, otherwise force download
      'Content-Disposition': `${disposition}; filename="${encodeURIComponent(decodedFilename)}"`,
      'Content-Length': uint8Array.length.toString(),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      // Allow embedding in iframe for same origin
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
    })

    // Only allow iframe embedding when mode=view
    if (mode === 'view') {
      headers.set('X-Frame-Options', 'SAMEORIGIN')
      // Remove Content-Security-Policy restrictions if any
      headers.delete('Content-Security-Policy')
    }

    // Return Uint8Array instead of Buffer for better Next.js compatibility
    // Uint8Array is the standard Web API format for binary data
    return new Response(uint8Array, {
      status: 200,
      headers,
    })
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return new Response('Not found', { status: 404 })
    }
    return new Response('Internal Server Error', { status: 500 })
  }
}
