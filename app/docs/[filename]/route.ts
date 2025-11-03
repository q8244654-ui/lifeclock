import { NextRequest } from 'next/server'
import { createReadStream, statSync } from 'fs'
import { Readable } from 'stream'
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

    // Create a stream to serve the file as-is without buffering/transformation
    const nodeStream = createReadStream(filePath)
    const webStream = Readable.toWeb(nodeStream) as ReadableStream

    // Infer content type from extension (PDF primary use-case)
    const ext = path.extname(decodedFilename).toLowerCase()
    const contentType = ext === '.pdf' ? 'application/pdf' : 'application/octet-stream'

    // Check query parameter to determine if PDF should be displayed inline or downloaded
    const { searchParams } = new URL(req.url)
    const mode = searchParams.get('mode')
    // If mode=view, display inline. Otherwise, force download (default behavior)
    const disposition = mode === 'view' ? 'inline' : 'attachment'

    // Stream response with correct headers; omit Content-Length to let platform handle it
    return new Response(webStream, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Allow inline viewing when mode=view, otherwise force download
        'Content-Disposition': `${disposition}; filename="${encodeURIComponent(decodedFilename)}"`,
        'Accept-Ranges': 'bytes',
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
