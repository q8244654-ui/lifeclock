import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

function verifySignature(value: string, sig: string, secret: string) {
  const expected = crypto.createHmac('sha256', secret).update(value).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
}

export async function GET(_req: NextRequest, context: { params: Promise<{ filename: string }> }) {
  const { filename: rawName } = await context.params

  // Decode URL-encoded filename (handles %20 for spaces, etc.)
  const decodedFilename = decodeURIComponent(rawName)

  // Basic sanitization: disallow path traversal
  if (!decodedFilename || decodedFilename.includes('..') || decodedFilename.includes('/')) {
    return new NextResponse('Invalid file name', { status: 400 })
  }

  // Optional protection: require paid cookie signature like in app/books/layout.tsx
  const cookieSecret = process.env.PAY_COOKIE_SECRET
  if (!cookieSecret) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const cookieStore = await cookies()
  const email = cookieStore.get('lc_paid_email')?.value || ''
  const sig = cookieStore.get('lc_paid_sig')?.value || ''
  if (!email || !sig || !verifySignature(email, sig, cookieSecret)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

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

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Force download behavior to mirror previous public/ behavior
        'Content-Disposition': `attachment; filename="${encodeURIComponent(decodedFilename)}"`,
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
