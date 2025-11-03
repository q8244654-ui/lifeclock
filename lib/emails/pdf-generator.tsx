/**
 * Generate a beautiful PDF report with modern UI design
 * Using @react-pdf/renderer for proper UTF-8 encoding and typography
 *
 * This file MUST only be used server-side (API routes, server actions, etc.)
 */

import React from 'react'
import { pdf } from '@react-pdf/renderer'
import { Document, Page, View, Text } from '@react-pdf/renderer'
import { registerFonts } from './pdf-fonts'
import { PDFRevelationCard, PDFTransition } from './pdf-components'
import { spacing } from './pdf-styles'

// Register fonts before first use
let fontsRegistered = false

async function ensureFontsRegistered() {
  if (!fontsRegistered) {
    await registerFonts()
    fontsRegistered = true
  }
}

/**
 * Main PDF Document Component
 */
const LifeClockDocument: React.FC<{
  reportData: any
  forces: any
  revelations: any[]
  userName: string
}> = ({ reportData, forces, revelations, userName }) => {
  const cardsPerPage = 3
  const revelationPages =
    revelations && revelations.length > 0
      ? Array.from({ length: Math.ceil(revelations.length / cardsPerPage) })
      : []

  const validUserName = userName || 'User'

  return (
    <Document>
      {/* Page 1: Simple Title Page */}
      <Page
        size="A4"
        style={{
          backgroundColor: '#0A0A0A',
          paddingTop: spacing.page.marginTop,
          paddingBottom: spacing.page.marginBottom,
        }}
      >
        {/* Header */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: spacing.page.marginTop,
            paddingHorizontal: spacing.page.marginOuter,
            borderBottomWidth: 0.5,
            borderBottomColor: '#38383A',
            opacity: 0.5,
          }}
        >
          <Text
            style={{
              fontSize: 8,
              color: '#A0A0A0',
              textAlign: 'right',
            }}
          >
            LifeClock Report
          </Text>
        </View>

        {/* Content */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 600,
            paddingHorizontal: spacing.page.marginOuter,
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 42,
              color: '#E5C97E',
              fontFamily: 'PlayfairDisplay',
              fontWeight: 'bold',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            {validUserName}
          </Text>
          <Text
            style={{
              fontSize: 28,
              color: '#A0A0A0',
              fontFamily: 'Inter',
              fontWeight: 'normal',
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            The 47 Revelations
          </Text>
        </View>

        {/* Footer */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: spacing.page.marginBottom,
            borderTopWidth: 0.5,
            borderTopColor: '#38383A',
            opacity: 0.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 8,
          }}
        >
          <Text style={{ fontSize: 8, color: '#E5C97E', fontStyle: 'italic', marginBottom: 2 }}>
            Time is no longer counted. It belongs to you.
          </Text>
          <Text
            style={{
              position: 'absolute',
              bottom: 8,
              right: spacing.page.marginOuter,
              fontSize: 8,
              color: '#A0A0A0',
            }}
          >
            1
          </Text>
        </View>
      </Page>

      {/* Pages 2+: Revelations with transitions */}
      {revelationPages.map((_, pageIdx) => {
        const startIdx = pageIdx * cardsPerPage
        const endIdx = Math.min(startIdx + cardsPerPage, revelations.length)
        const pageRevelations = revelations.slice(startIdx, endIdx)
        const pageNumber = 2 + pageIdx
        const isOdd = pageNumber % 2 === 1

        // Strategic transition points
        const shouldAddTransition =
          pageIdx === 0 || pageIdx === Math.floor(revelationPages.length / 2)

        const transitionPhrases = [
          '— The revelations begin —',
          '— The pattern deepens —',
          '— Time shifts its shape —',
        ]

        return (
          <Page
            key={`revelations-page-${pageIdx}`}
            size="A4"
            style={{
              backgroundColor: '#0A0A0A',
              paddingTop: spacing.page.marginTop,
              paddingBottom: spacing.page.marginBottom,
            }}
          >
            {/* Header */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: spacing.page.marginTop,
                paddingHorizontal: spacing.page.marginOuter,
                borderBottomWidth: 0.5,
                borderBottomColor: '#38383A',
                opacity: 0.5,
              }}
            >
              <Text
                style={{
                  fontSize: 8,
                  color: '#A0A0A0',
                  textAlign: isOdd ? 'right' : 'left',
                }}
              >
                LifeClock Report
              </Text>
            </View>

            {/* Content */}
            <View
              style={{
                paddingHorizontal: isOdd ? spacing.page.marginInner : spacing.page.marginOuter,
                paddingRight: isOdd ? spacing.page.marginOuter : spacing.page.marginInner,
                paddingTop: 24,
                paddingBottom: 24,
              }}
            >
              {/* Add transition on strategic pages */}
              {shouldAddTransition && (
                <PDFTransition
                  phrase={transitionPhrases[Math.min(pageIdx, transitionPhrases.length - 1)]}
                />
              )}

              {/* Revelation cards */}
              {pageRevelations.map((revelation, idx) => {
                // Ensure revelation is a valid object
                if (!revelation || typeof revelation !== 'object') return null
                return (
                  <PDFRevelationCard
                    key={`rev-${startIdx + idx}`}
                    revelation={revelation}
                    index={startIdx + idx + 1}
                  />
                )
              })}
            </View>

            {/* Footer */}
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: spacing.page.marginBottom,
                borderTopWidth: 0.5,
                borderTopColor: '#38383A',
                opacity: 0.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 8,
              }}
            >
              <Text style={{ fontSize: 8, color: '#E5C97E', fontStyle: 'italic', marginBottom: 2 }}>
                Time is no longer counted. It belongs to you.
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  bottom: 8,
                  fontSize: 8,
                  color: '#A0A0A0',
                  ...(isOdd
                    ? { right: spacing.page.marginOuter }
                    : { left: spacing.page.marginOuter }),
                }}
              >
                {pageNumber}
              </Text>
            </View>
          </Page>
        )
      })}
    </Document>
  )
}

/**
 * Validate and normalize forces object
 */
function validateAndNormalizeForces(forces: any): any {
  // Return empty object if invalid
  if (!forces || typeof forces !== 'object' || Array.isArray(forces) || forces === null) {
    console.warn('[PDF Generator] Invalid forces, using empty object')
    return {}
  }

  // Create a safe copy with only valid properties
  const normalized: any = {}

  // Validate each force (shadow, fear, power)
  const forceKeys = ['shadow', 'fear', 'power'] as const
  for (const key of forceKeys) {
    const force = forces[key]
    if (force && typeof force === 'object' && !Array.isArray(force) && force !== null) {
      normalized[key] = {
        phase:
          force.phase && typeof force.phase === 'object' && !Array.isArray(force.phase)
            ? {
                title: typeof force.phase.title === 'string' ? force.phase.title : undefined,
              }
            : undefined,
        insight: typeof force.insight === 'string' ? force.insight : undefined,
      }
      // Remove undefined properties
      if (!normalized[key].phase) {
        delete normalized[key].phase
      }
      if (!normalized[key].insight) {
        delete normalized[key].insight
      }
      // Remove empty force objects
      if (Object.keys(normalized[key]).length === 0) {
        delete normalized[key]
      }
    }
  }

  return normalized
}

/**
 * Helper function to remove undefined/null properties from an object
 * Prevents hasOwnProperty errors in PDF renderer
 */
function cleanObject(obj: any): any {
  if (obj === null || obj === undefined) {
    return {}
  }

  if (Array.isArray(obj)) {
    return obj.map(cleanObject)
  }

  if (typeof obj !== 'object') {
    return obj
  }

  const cleaned: any = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      if (value !== undefined && value !== null) {
        cleaned[key] = cleanObject(value)
      }
    }
  }

  return cleaned
}

/**
 * Validate and normalize revelations array
 * Limits to 47 revelations maximum for PDF report
 * Ensures all properties are defined (never undefined) to prevent hasOwnProperty errors
 */
function validateAndNormalizeRevelations(revelations: any[]): any[] {
  if (!Array.isArray(revelations)) {
    console.warn('[PDF Generator] Revelations is not an array, using empty array')
    return []
  }

  const MAX_REVELATIONS = 47

  const normalized = revelations
    .map((rev, index) => {
      // Skip invalid revelations
      if (!rev || typeof rev !== 'object' || Array.isArray(rev) || rev === null) {
        console.warn(`[PDF Generator] Skipping invalid revelation at index ${index}`)
        return null
      }

      // Create a safe revelation object with only valid properties
      // Always provide defaults to avoid undefined
      const normalized: any = {
        title:
          typeof rev.title === 'string' && rev.title.trim().length > 0
            ? rev.title.trim()
            : `Revelation ${index + 1}`,
        icon:
          typeof rev.icon === 'string' && rev.icon.length > 0
            ? String(rev.icon)
                .replace(/[🌑😨⚡🔮]/g, '○')
                .trim()
            : '○',
        category:
          typeof rev.category === 'string' && rev.category.length > 0 ? rev.category : 'phase',
        insight:
          typeof rev.insight === 'string' && rev.insight.trim().length > 0
            ? rev.insight.trim()
            : typeof rev.text === 'string' && rev.text.trim().length > 0
              ? rev.text.trim()
              : `Insight ${index + 1}`,
      }

      // Clean the object to remove any remaining undefined/null
      const cleaned = cleanObject(normalized)

      // Only return if it has at least title or insight
      return cleaned.title || cleaned.insight ? cleaned : null
    })
    .filter((rev): rev is any => rev !== null && rev !== undefined)
    .slice(0, MAX_REVELATIONS) // Limit to 47 revelations maximum

  if (revelations.length > MAX_REVELATIONS) {
    console.log(
      `[PDF Generator] Limited revelations from ${revelations.length} to ${MAX_REVELATIONS} for PDF report`
    )
  }

  // Final cleanup pass
  return normalized.map(cleanObject).filter(rev => rev && typeof rev === 'object')
}

/**
 * Validate and normalize report data
 */
function validateAndNormalizeReportData(reportData: any): any {
  if (
    !reportData ||
    typeof reportData !== 'object' ||
    Array.isArray(reportData) ||
    reportData === null
  ) {
    console.warn('[PDF Generator] Invalid reportData, using default values')
    return {
      lifeIndex: { lifeIndex: 0, stage: 'Unknown' },
      profile: { dominantEnergy: 'Unknown' },
    }
  }

  // Create a safe copy
  const normalized: any = {
    lifeIndex: {
      lifeIndex:
        typeof reportData.lifeIndex?.lifeIndex === 'number' ? reportData.lifeIndex.lifeIndex : 0,
      stage:
        typeof reportData.lifeIndex?.stage === 'string' ? reportData.lifeIndex.stage : 'Unknown',
    },
    profile: {
      dominantEnergy:
        typeof reportData.profile?.dominantEnergy === 'string'
          ? reportData.profile.dominantEnergy
          : 'Unknown',
    },
  }

  return normalized
}

/**
 * Generate PDF report
 */
export async function generateReportPDF(
  reportData: any,
  forces: any,
  revelations: any[],
  userName: string
): Promise<Buffer> {
  try {
    console.log('[PDF Generator] Starting PDF generation...')
    console.log('[PDF Generator] Data check:', {
      hasReportData: !!reportData,
      hasForces: !!forces,
      revelationsCount: revelations?.length || 0,
      userName: userName,
    })

    // Validate and normalize userName
    const validUserName =
      typeof userName === 'string' && userName.trim().length > 0 ? userName.trim() : 'User'

    console.log('[PDF Generator] Validating and normalizing data...')

    // Validate and normalize all data before use
    const validReportData = cleanObject(validateAndNormalizeReportData(reportData))
    const validForces = cleanObject(validateAndNormalizeForces(forces))
    const validRevelations = validateAndNormalizeRevelations(revelations)

    // Final safety check: ensure revelations array is clean
    if (!Array.isArray(validRevelations) || validRevelations.length === 0) {
      throw new Error('No valid revelations found. Cannot generate PDF without revelations.')
    }

    console.log('[PDF Generator] Data validation complete:', {
      reportDataValid: !!validReportData,
      forcesKeys: Object.keys(validForces),
      revelationsCount: validRevelations.length,
      userName: validUserName,
    })

    // Ensure fonts are registered
    console.log('[PDF Generator] Registering fonts...')
    await ensureFontsRegistered()
    console.log('[PDF Generator] Fonts registered')

    // Create PDF document
    console.log('[PDF Generator] Creating document component...')
    const doc = (
      <LifeClockDocument
        reportData={validReportData}
        forces={validForces}
        revelations={validRevelations}
        userName={validUserName}
      />
    )

    // Render PDF directly to buffer (Node.js compatible)
    console.log('[PDF Generator] Rendering PDF to buffer...')
    try {
      // Use pdf().toBuffer() for Node.js server-side rendering
      console.log('[PDF Generator] Creating PDF instance from document...')
      const pdfInstance = pdf(doc)
      console.log('[PDF Generator] PDF instance created successfully, generating buffer...')

      console.log('[PDF Generator] Calling toBlob()...')
      const blob = await pdfInstance.toBlob()
      const arrayBuffer = await blob.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      console.log('[PDF Generator] Buffer generated successfully, size:', buffer.length, 'bytes')

      if (!buffer || buffer.length === 0) {
        console.error('[PDF Generator] Generated PDF buffer is empty or null')
        throw new Error('Generated PDF buffer is empty')
      }

      console.log('[PDF Generator] PDF generation completed successfully')
      return buffer
    } catch (renderError) {
      console.error('[PDF Generator] ========== PDF Rendering Error ==========')
      console.error('[PDF Generator] Error type:', typeof renderError)
      console.error('[PDF Generator] Error value:', renderError)

      if (renderError instanceof Error) {
        console.error('[PDF Generator] Error name:', renderError.name)
        console.error('[PDF Generator] Error message:', renderError.message)
        console.error('[PDF Generator] Error stack:', renderError.stack)

        // Check for specific error patterns
        if (renderError.message.includes('hasOwnProperty')) {
          console.error(
            '[PDF Generator] HAS_OWN_PROPERTY_ERROR: This suggests an issue with object prototype or data structure'
          )
        }
        if (renderError.message.includes('undefined')) {
          console.error('[PDF Generator] UNDEFINED_ERROR: This suggests missing data or properties')
        }
      } else {
        console.error(
          '[PDF Generator] Non-Error object thrown:',
          JSON.stringify(renderError, null, 2)
        )
      }

      console.error('[PDF Generator] Document structure check:', {
        hasReportData: !!validReportData,
        reportDataKeys: validReportData ? Object.keys(validReportData) : [],
        forcesKeys: Object.keys(validForces),
        revelationsCount: validRevelations.length,
      })

      console.error('[PDF Generator] =========================================')

      // Provide more helpful error messages
      let errorMessage = 'Failed to generate PDF report'
      if (renderError instanceof Error) {
        if (renderError.message.includes('hasOwnProperty')) {
          errorMessage =
            'PDF generation error: Invalid data structure detected. Please ensure all revelations are properly formatted.'
        } else if (renderError.message.includes('undefined')) {
          errorMessage =
            'PDF generation error: Missing required data. Please try refreshing and ensure all revelations are revealed.'
        } else {
          errorMessage = `PDF generation error: ${renderError.message}`
        }
      } else {
        errorMessage = `PDF generation error: ${String(renderError)}`
      }

      throw new Error(errorMessage)
    }
  } catch (error) {
    console.error('[PDF Generator] ========== PDF Generation Error ==========')
    console.error('[PDF Generator] Outer catch block - error type:', typeof error)
    console.error('[PDF Generator] Outer catch block - error value:', error)

    if (error instanceof Error) {
      console.error('[PDF Generator] Error name:', error.name)
      console.error('[PDF Generator] Error message:', error.message)
      console.error('[PDF Generator] Error stack:', error.stack)
    } else {
      console.error(
        '[PDF Generator] Non-Error object in outer catch:',
        JSON.stringify(error, null, 2)
      )
    }

    console.error('[PDF Generator] ===========================================')
    throw error
  }
}
