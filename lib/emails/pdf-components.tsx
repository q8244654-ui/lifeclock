/**
 * React PDF Components for LifeClock Report
 * Modern, filmic design with proper hierarchy
 */

import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { colors, typography, spacing, layout, getCategoryColor, getContentWidth, getContentX } from './pdf-styles'

// Create stylesheet
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bgPrimary,
    paddingTop: spacing.page.marginTop,
    paddingBottom: spacing.page.marginBottom,
    paddingLeft: 0,
    paddingRight: 0,
    fontFamily: typography.fonts.body,
    color: colors.textPrimary,
  },
  
  // Header & Footer
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: spacing.page.marginTop,
    paddingHorizontal: spacing.page.marginOuter,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.borderColor,
    opacity: 0.5,
  },
  
  headerText: {
    fontSize: typography.sizes.tiny,
    color: colors.textSecondary,
    fontFamily: typography.fonts.body,
  },
  
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: spacing.page.marginBottom,
    paddingHorizontal: spacing.page.marginOuter,
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.borderColor,
    opacity: 0.5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  footerQuote: {
    fontSize: typography.sizes.tiny,
    color: colors.gold,
    fontStyle: 'italic',
    fontFamily: typography.fonts.body,
    marginBottom: 2,
  },
  
  footerPageNumber: {
    fontSize: typography.sizes.tiny,
    color: colors.textSecondary,
    fontFamily: typography.fonts.body,
  },
  
  // Content container
  content: {
    paddingHorizontal: spacing.page.marginOuter,
    minHeight: spacing.page.height - spacing.page.marginTop - spacing.page.marginBottom,
  },
  
  contentOdd: {
    paddingLeft: spacing.page.marginInner,
    paddingRight: spacing.page.marginOuter,
  },
  
  contentEven: {
    paddingLeft: spacing.page.marginOuter,
    paddingRight: spacing.page.marginInner,
  },
  
  // Cover page
  coverContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.page.height - spacing.page.marginTop - spacing.page.marginBottom,
    paddingHorizontal: spacing.pagePadding,
  },
  
  coverTitle: {
    fontSize: typography.sizes.hero,
    color: colors.blue,
    fontFamily: typography.fonts.display,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.element,
    textAlign: 'center',
  },
  
  coverUserName: {
    fontSize: typography.sizes.section,
    color: colors.textSecondary,
    fontFamily: typography.fonts.body,
    marginBottom: spacing.section,
    textAlign: 'center',
  },
  
  coverCard: {
    ...layout.card,
    width: '100%',
    maxWidth: getContentWidth(),
    marginBottom: spacing.section,
    padding: spacing.cardPadding * 2,
  },
  
  lifeIndexLabel: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
    fontFamily: typography.fonts.body,
    textAlign: 'center',
    marginBottom: spacing.element,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  lifeIndexValue: {
    fontSize: 64,
    color: colors.blue,
    fontFamily: typography.fonts.display,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    marginBottom: spacing.element,
  },
  
  lifeIndexStage: {
    fontSize: typography.sizes.cardTitle,
    color: colors.textPrimary,
    fontFamily: typography.fonts.body,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    marginBottom: spacing.element,
  },
  
  lifeIndexTagline: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
    fontFamily: typography.fonts.body,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: spacing.paragraph,
  },
  
  divider: {
    height: layout.borderWidth.thin,
    backgroundColor: colors.borderColor,
    marginVertical: spacing.paragraph,
    width: '60%',
    alignSelf: 'center',
  },
  
  dominantEnergyLabel: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
    fontFamily: typography.fonts.body,
    textAlign: 'center',
    marginBottom: spacing.element,
  },
  
  dominantEnergyValue: {
    fontSize: typography.sizes.cardTitle,
    color: colors.violet,
    fontFamily: typography.fonts.body,
    textAlign: 'center',
  },
  
  // Section titles
  sectionTitle: {
    fontSize: typography.sizes.chapter,
    color: colors.textPrimary,
    fontFamily: typography.fonts.display,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.section,
  },
  
  // Forces section
  forcesContainer: {
    marginBottom: spacing.section,
  },
  
  forceCard: {
    ...layout.card,
    marginBottom: spacing.card,
    padding: spacing.cardPadding,
  },
  
  forceCardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  
  forceTitle: {
    fontSize: typography.sizes.cardTitle,
    fontFamily: typography.fonts.body,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.element,
  },
  
  forcePhase: {
    fontSize: typography.sizes.small,
    color: colors.textSecondary,
    fontFamily: typography.fonts.body,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.element,
  },
  
  forceInsight: {
    fontSize: typography.sizes.body,
    color: colors.textPrimary,
    fontFamily: typography.fonts.body,
    lineHeight: typography.lineHeights.relaxed,
  },
  
  // Chapter page
  chapterContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.page.height - spacing.page.marginTop - spacing.page.marginBottom,
    paddingHorizontal: spacing.pagePadding,
  },
  
  chapterTitle: {
    fontSize: typography.sizes.hero,
    color: colors.textPrimary,
    fontFamily: typography.fonts.display,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    marginBottom: spacing.paragraph,
  },
  
  chapterDivider: {
    height: 2,
    backgroundColor: colors.blue,
    width: 100,
    marginVertical: spacing.paragraph,
    opacity: 0.5,
  },
  
  chapterSubtitle: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
    fontFamily: typography.fonts.body,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed,
    maxWidth: getContentWidth(),
  },
  
  // Transition phrases
  transition: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
    fontFamily: typography.fonts.display,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: spacing.paragraph,
    opacity: 0.6,
  },
  
  // Revelation card
  revelationCard: {
    ...layout.card,
    marginBottom: spacing.card,
    padding: spacing.cardPadding,
    position: 'relative',
  },
  
  revelationAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderRadius: 2,
  },
  
  revelationHeader: {
    marginLeft: 20,
    marginBottom: spacing.element,
  },
  
  revelationTitle: {
    fontSize: typography.sizes.cardTitle,
    fontFamily: typography.fonts.body,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.element / 2,
  },
  
  revelationBadge: {
    fontSize: typography.sizes.small,
    fontFamily: typography.fonts.body,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.element,
  },
  
  revelationText: {
    fontSize: typography.sizes.body,
    color: colors.textPrimary,
    fontFamily: typography.fonts.body,
    lineHeight: typography.lineHeights.relaxed,
    marginLeft: 20,
  },
})

/**
 * PDF Cover Page Component
 */
export const PDFCoverPage: React.FC<{
  userName: string
  lifeIndex: number
  stage: string
  dominantEnergy: string
  pageNumber: number
  isOddPage: boolean
}> = ({ userName, lifeIndex, stage, dominantEnergy, pageNumber, isOddPage }) => {
  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { textAlign: isOddPage ? 'right' : 'left' }]}>
          LifeClock Report
        </Text>
      </View>
      
      {/* Content */}
      <View style={[styles.content, isOddPage ? styles.contentOdd : styles.contentEven]}>
        <View style={styles.coverContainer}>
          <Text style={styles.coverTitle}>LifeClock</Text>
          <Text style={styles.coverUserName}>{userName}</Text>
          
          <View style={styles.coverCard}>
            <Text style={styles.lifeIndexLabel}>LIFE INDEX</Text>
            <Text style={styles.lifeIndexValue}>{lifeIndex}/100</Text>
            <Text style={styles.lifeIndexStage}>{stage}</Text>
            <Text style={styles.lifeIndexTagline}>
              It's not your age. It's your inner maturity.
            </Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.dominantEnergyLabel}>Dominant Energy</Text>
            <Text style={styles.dominantEnergyValue}>{dominantEnergy}</Text>
          </View>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerQuote}>Time is no longer counted. It belongs to you.</Text>
        <Text
          style={[
            styles.footerPageNumber,
            {
              position: 'absolute',
              bottom: 8,
              ...(isOddPage ? { right: spacing.page.marginOuter } : { left: spacing.page.marginOuter }),
            },
          ]}
        >
          {pageNumber}
        </Text>
      </View>
    </Page>
  )
}

/**
 * PDF Forces Section Component
 */
export const PDFForcesSection: React.FC<{
  forces: {
    shadow?: { phase?: { title?: string }; insight?: string }
    fear?: { phase?: { title?: string }; insight?: string }
    power?: { phase?: { title?: string }; insight?: string }
  }
  pageNumber: number
  isOddPage: boolean
}> = ({ forces, pageNumber, isOddPage }) => {
  // Ensure forces is a valid object (handle null, undefined, arrays, etc.)
  const validForces = forces && typeof forces === 'object' && !Array.isArray(forces) && forces !== null ? forces : {}
  
  const forceConfigs = [
    {
      key: 'shadow' as const,
      title: 'Shadow',
      color: colors.violet,
      icon: '○',
    },
    {
      key: 'fear' as const,
      title: 'Fear',
      color: colors.pink,
      icon: '○',
    },
    {
      key: 'power' as const,
      title: 'Power',
      color: colors.gold,
      icon: '○',
    },
  ]

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { textAlign: isOddPage ? 'right' : 'left' }]}>
          LifeClock Report
        </Text>
      </View>
      
      {/* Content */}
      <View style={[styles.content, isOddPage ? styles.contentOdd : styles.contentEven]}>
        <Text style={styles.sectionTitle}>The 3 Hidden Forces</Text>
        
        <View style={styles.forcesContainer}>
          {forceConfigs.map((config) => {
            const force = validForces?.[config.key]
            // Validate force object before rendering - use optional chaining and type checks
            if (!force || typeof force !== 'object' || Array.isArray(force) || force === null) {
              return null
            }
            
            // Safely extract properties with validation
            const phaseTitle = force?.phase?.title
            const insight = force?.insight
            
            // Only render if we have at least phase title or insight
            if (!phaseTitle && !insight) {
              return null
            }
            
            return (
              <View key={config.key} style={styles.forceCard}>
                <View style={[styles.forceCardAccent, { backgroundColor: config.color }]} />
                <Text style={[styles.forceTitle, { color: config.color }]}>
                  {config.icon} {config.title}
                </Text>
                {phaseTitle && typeof phaseTitle === 'string' && (
                  <Text style={styles.forcePhase}>{String(phaseTitle).toUpperCase()}</Text>
                )}
                {insight && typeof insight === 'string' && (
                  <Text style={styles.forceInsight}>{String(insight)}</Text>
                )}
              </View>
            )
          })}
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerQuote}>Time is no longer counted. It belongs to you.</Text>
        <Text
          style={[
            styles.footerPageNumber,
            {
              position: 'absolute',
              bottom: 8,
              ...(isOddPage ? { right: spacing.page.marginOuter } : { left: spacing.page.marginOuter }),
            },
          ]}
        >
          {pageNumber}
        </Text>
      </View>
    </Page>
  )
}

/**
 * PDF Revelations Chapter Page
 */
export const PDFRevelationsChapter: React.FC<{
  pageNumber: number
  isOddPage: boolean
}> = ({ pageNumber, isOddPage }) => {
  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { textAlign: isOddPage ? 'right' : 'left' }]}>
          LifeClock Report
        </Text>
      </View>
      
      {/* Content */}
      <View style={[styles.content, isOddPage ? styles.contentOdd : styles.contentEven]}>
        <View style={styles.chapterContainer}>
          <Text style={styles.chapterTitle}>The 47 Revelations</Text>
          <View style={styles.chapterDivider} />
          <Text style={styles.chapterSubtitle}>
            Deep insights into your life patterns, energies, and transformative moments
          </Text>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerQuote}>Time is no longer counted. It belongs to you.</Text>
        <Text
          style={[
            styles.footerPageNumber,
            {
              position: 'absolute',
              bottom: 8,
              ...(isOddPage ? { right: spacing.page.marginOuter } : { left: spacing.page.marginOuter }),
            },
          ]}
        >
          {pageNumber}
        </Text>
      </View>
    </Page>
  )
}

/**
 * PDF Revelation Card Component
 */
export const PDFRevelationCard: React.FC<{
  revelation: {
    title?: string
    icon?: string
    category?: string
    insight?: string
  }
  index: number
}> = ({ revelation, index }) => {
  // Ensure revelation is a valid object with defensive checks
  if (!revelation || typeof revelation !== 'object' || Array.isArray(revelation) || revelation === null) {
    return null
  }
  
  // Safely extract and validate properties using optional chaining
  const category = typeof revelation?.category === 'string' ? revelation.category : 'phase'
  const categoryColor = getCategoryColor(category)
  
  const title = typeof revelation?.title === 'string' && revelation.title.trim().length > 0
    ? revelation.title.trim()
    : `Revelation ${index + 1}`
  
  // Replace problematic emojis with Unicode-safe alternatives
  const icon = typeof revelation?.icon === 'string' && revelation.icon.length > 0
    ? String(revelation.icon).replace(/[🌑😨⚡🔮]/g, '○').trim()
    : '○'
  
  const insight = typeof revelation?.insight === 'string' && revelation.insight.trim().length > 0
    ? revelation.insight.trim()
    : null
  
  // Only render if we have at least a title or insight
  if (!title && !insight) {
    return null
  }
  
  return (
    <View style={styles.revelationCard}>
      <View style={[styles.revelationAccent, { backgroundColor: categoryColor }]} />
      
      <View style={styles.revelationHeader}>
        <Text style={[styles.revelationTitle, { color: categoryColor }]}>
          {icon} {String(title)}
        </Text>
        <Text style={[styles.revelationBadge, { color: categoryColor }]}>
          {String(category).toUpperCase()}
        </Text>
      </View>
      
      {insight && (
        <Text style={styles.revelationText}>{String(insight)}</Text>
      )}
    </View>
  )
}

/**
 * PDF Transition Component
 */
export const PDFTransition: React.FC<{
  phrase?: string
}> = ({ phrase }) => {
  const transitions = [
    '— The flame evolves —',
    '— A new chapter begins —',
    '— The pattern reveals itself —',
    '— Time shifts its shape —',
    '— The revelation unfolds —',
  ]
  
  const selectedPhrase = phrase || transitions[Math.floor(Math.random() * transitions.length)]
  
  return (
    <View style={{ marginVertical: spacing.paragraph }}>
      <Text style={styles.transition}>{selectedPhrase}</Text>
    </View>
  )
}

