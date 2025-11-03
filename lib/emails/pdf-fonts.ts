/**
 * Font registration for @react-pdf/renderer
 * Registers Playfair Display and Inter fonts with UTF-8 support
 * Using Google Fonts API with proper TTF format for better compatibility
 * Includes robust error handling and timeout mechanisms
 */

import { Font } from '@react-pdf/renderer'

/**
 * Font registration configuration with timeout support
 */
const FONT_TIMEOUT_MS = 5000 // 5 secondes max pour charger une police

/**
 * Register a font family with timeout and detailed error handling
 */
async function registerFontWithTimeout(
  familyName: string,
  fonts: Array<{
    src: string
    fontWeight?: 'normal' | 'medium' | 'bold'
    fontStyle?: 'normal' | 'italic'
  }>
): Promise<boolean> {
  const startTime = Date.now()

  try {
    console.log(`[PDF Fonts] Attempting to register ${familyName}...`)
    console.log(
      `[PDF Fonts] Font URLs for ${familyName}:`,
      fonts.map(f => f.src)
    )

    // Create a promise that will timeout
    const registerPromise = new Promise<void>((resolve, reject) => {
      try {
        Font.register({
          family: familyName,
          fonts: fonts.map(f => ({
            src: f.src,
            fontWeight: f.fontWeight || ('normal' as const),
            fontStyle: f.fontStyle || ('normal' as const),
          })),
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })

    // Race between font registration and timeout
    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Font registration timeout for ${familyName} after ${FONT_TIMEOUT_MS}ms`))
      }, FONT_TIMEOUT_MS)
    })

    await Promise.race([registerPromise, timeoutPromise])

    const elapsed = Date.now() - startTime
    console.log(`[PDF Fonts] ✓ ${familyName} registered successfully in ${elapsed}ms`)
    return true
  } catch (error) {
    const elapsed = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined

    console.warn(`[PDF Fonts] ✗ Failed to register ${familyName} after ${elapsed}ms`)
    console.warn(`[PDF Fonts] Error details for ${familyName}:`, {
      message: errorMessage,
      stack: errorStack,
      urls: fonts.map(f => f.src),
    })

    // Log specific error types
    if (errorMessage.includes('timeout')) {
      console.warn(
        `[PDF Fonts] Timeout error: ${familyName} took too long to load from Google Fonts`
      )
    } else if (errorMessage.includes('ERR_FAILED') || errorMessage.includes('network')) {
      console.warn(`[PDF Fonts] Network error: Cannot reach Google Fonts for ${familyName}`)
    } else if (errorMessage.includes('CORS') || errorMessage.includes('cross-origin')) {
      console.warn(`[PDF Fonts] CORS error: Cross-origin request blocked for ${familyName}`)
    }

    return false
  }
}

/**
 * Register fonts from Google Fonts
 * Using TTF format for best UTF-8 and PDF compatibility
 * Falls back to Helvetica (built-in PDF font) if registration fails
 */
export async function registerFonts(): Promise<void> {
  const results: Record<string, boolean> = {}

  try {
    console.log('[PDF Fonts] ===== Starting font registration =====')

    // Playfair Display - Regular, Bold, Italic
    // Using Google Fonts TTF URLs with UTF-8 support
    results.PlayfairDisplay = await registerFontWithTimeout('PlayfairDisplay', [
      {
        src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYhA_-NiXkQ.ttf',
        fontWeight: 'normal',
      },
      {
        src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFlD-vYSZviVYUb_rj3ij__anPXDTnogkk7yRbPQ.ttf',
        fontWeight: 'bold',
      },
      {
        src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFkD-vYSZviVYUb_rj3ij__anPXDTjYgBM4SDk.ttf',
        fontStyle: 'italic',
        fontWeight: 'normal',
      },
    ])

    // Inter - Regular, Medium, Bold
    // Note: @react-pdf/renderer supports WOFF2 from URLs
    results.Inter = await registerFontWithTimeout('Inter', [
      {
        src: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2',
        fontWeight: 'normal',
      },
      {
        src: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5n-wU.woff2',
        fontWeight: 'medium',
      },
      {
        src: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2',
        fontWeight: 'bold',
      },
    ])

    // Summary
    const successful = Object.values(results).filter(Boolean).length
    const total = Object.keys(results).length

    console.log('[PDF Fonts] ===== Font registration summary =====')
    console.log(`[PDF Fonts] Successfully registered: ${successful}/${total} font families`)
    Object.entries(results).forEach(([name, success]) => {
      console.log(`[PDF Fonts]   ${name}: ${success ? '✓' : '✗ (will use fallback)'}`)
    })

    // Helvetica as fallback (built-in, already available in PDF)
    // No need to register, it's a standard PDF font
    if (successful < total) {
      console.log(
        '[PDF Fonts] Some fonts failed to load. PDF will use Helvetica fallback where needed.'
      )
    } else {
      console.log('[PDF Fonts] All custom fonts registered successfully.')
    }
    console.log('[PDF Fonts] Font registration complete (Helvetica available as built-in fallback)')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined

    console.error('[PDF Fonts] ===== Critical error during font registration =====')
    console.error('[PDF Fonts] Error message:', errorMessage)
    console.error('[PDF Fonts] Error stack:', errorStack)
    console.error('[PDF Fonts] Continuing with built-in Helvetica font as fallback...')

    // Do not throw - always allow PDF generation to continue with fallback fonts
    // @react-pdf/renderer will automatically use Helvetica if custom fonts are unavailable
  }
}
