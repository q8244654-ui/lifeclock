import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(_req: Request, { params }: { params: { filename: string } }) {
  const rawName = params.filename

  // Basic sanitization: disallow path traversal
  if (!rawName || rawName.includes('..') || rawName.includes('/')) {
    return new NextResponse('Invalid file name', { status: 400 })
  }

  const filePath = path.join(process.cwd(), 'app', 'books', rawName)

  try {
    const stat = await fs.stat(filePath)
    if (!stat.isFile()) {
      return new NextResponse('Not found', { status: 404 })
    }

    const fileBuffer = await fs.readFile(filePath)

    // Infer content type from extension (PDF primary use-case)
    const ext = path.extname(rawName).toLowerCase()
    const contentType = ext === '.pdf' ? 'application/pdf' : 'application/octet-stream'

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Force download behavior to mirror previous public/ behavior
        'Content-Disposition': `attachment; filename="${encodeURIComponent(rawName)}"`,
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
