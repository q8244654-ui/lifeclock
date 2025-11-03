/**
 * Font registration for @react-pdf/renderer
 * Registers Playfair Display and Inter fonts with UTF-8 support
 * Using Google Fonts API with proper TTF format for better compatibility
 */

import { Font } from '@react-pdf/renderer'

/**
 * Register fonts from Google Fonts
 * Using TTF format for best UTF-8 and PDF compatibility
 */
export async function registerFonts(): Promise<void> {
  try {
    console.log('[PDF Fonts] Starting font registration...')
    
    // Playfair Display - Regular, Bold, Italic
    // Using Google Fonts TTF URLs with UTF-8 support
    try {
      Font.register({
        family: 'PlayfairDisplay',
        fonts: [
          {
            src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYhA_-NiXkQ.ttf',
            fontWeight: 'normal' as const,
          },
          {
            src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFlD-vYSZviVYUb_rj3ij__anPXDTnogkk7yRbPQ.ttf',
            fontWeight: 'bold' as const,
          },
          {
            src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFkD-vYSZviVYUb_rj3ij__anPXDTjYgBM4SDk.ttf',
            fontStyle: 'italic' as const,
            fontWeight: 'normal' as const,
          },
        ],
      })
      console.log('[PDF Fonts] PlayfairDisplay registered')
    } catch (error) {
      console.warn('[PDF Fonts] Failed to register PlayfairDisplay:', error)
    }

    // Inter - Regular, Medium, Bold
    // Note: @react-pdf/renderer supports WOFF2 from URLs
    try {
      Font.register({
        family: 'Inter',
        fonts: [
          {
            src: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2',
            fontWeight: 'normal' as const,
          },
          {
            src: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5n-wU.woff2',
            fontWeight: 'medium' as const,
          },
          {
            src: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2',
            fontWeight: 'bold' as const,
          },
        ],
      })
      console.log('[PDF Fonts] Inter registered')
    } catch (error) {
      console.warn('[PDF Fonts] Failed to register Inter:', error)
    }

    // Helvetica as fallback (built-in, already available in PDF)
    // No need to register, it's a standard PDF font
    console.log('[PDF Fonts] Font registration complete (using Helvetica fallback if custom fonts fail)')
  } catch (error) {
    console.error('[PDF Fonts] Error registering fonts:', error)
    // Continue with default fonts if registration fails
    // @react-pdf/renderer will fallback to Helvetica
  }
}

