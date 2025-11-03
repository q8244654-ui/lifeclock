/**
 * Design system for LifeClock PDF reports
 * Modern, filmic design with proper typography hierarchy
 */

export const colors = {
  bgPrimary: '#0A0A0A',
  bgCard: '#1C1C1E',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textMuted: '#6B7280',
  borderColor: '#38383A',
  
  // Accent colors
  blue: '#60A5FA',
  violet: '#A78BFA',
  pink: '#F472B6',
  gold: '#E5C97E',
  red: '#EF4444',
  purple: '#8B5CF6',
  
  // Category colors
  catPhase: '#60A5FA',
  catEnergy: '#A78BFA',
  catPattern: '#F472B6',
  catExtreme: '#EF4444',
  catContradiction: '#8B5CF6',
  catForce: '#E5C97E',
} as const

export const typography = {
  // Font families (will be registered with Font.register)
  fonts: {
    display: 'Helvetica', // For titles and transitions (using Helvetica for now)
    body: 'Helvetica', // For body text (using Helvetica for now)
    system: 'Helvetica', // Fallback
  },
  
  // Font sizes (in pt, standard PDF unit)
  sizes: {
    hero: 48, // Main title page
    chapter: 36, // Chapter titles
    section: 24, // Section titles
    cardTitle: 18, // Card titles
    body: 11, // Body text
    small: 9, // Labels, badges
    tiny: 8, // Footer text
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2, // Titles
    normal: 1.4, // Subtitles
    relaxed: 1.65, // Body text
  },
  
  // Font weights
  weights: {
    normal: 'normal' as const,
    bold: 'bold' as const,
  },
} as const

export const spacing = {
  // Margins (in mm for A4: 210x297mm)
  page: {
    width: 210,
    height: 297,
    marginInner: 30, // Gutter for bound books
    marginOuter: 20,
    marginTop: 25,
    marginBottom: 25,
  },
  
  // Content spacing (in pt)
  section: 32, // Between major sections
  card: 16, // Between cards
  paragraph: 12, // Between paragraphs
  element: 8, // Between elements in same card
  
  // Padding
  cardPadding: 16,
  pagePadding: 24,
} as const

export const layout = {
  // Border radius (in pt)
  borderRadius: {
    card: 8,
    small: 4,
  },
  
  // Border widths
  borderWidth: {
    thick: 1,
    thin: 0.5,
  },
  
  // Card styling
  card: {
    backgroundColor: colors.bgCard,
    borderColor: colors.borderColor,
    borderWidth: 0.5,
    borderRadius: 8,
    padding: spacing.cardPadding,
  },
  
  // Glassmorphism effect simulation
  glass: {
    backgroundColor: 'rgba(28, 28, 30, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 0.5,
  },
} as const

export const transitions = {
  // Poetic transition phrases
  phrases: [
    '— The flame evolves —',
    '— A new chapter begins —',
    '— The pattern reveals itself —',
    '— Time shifts its shape —',
    '— The revelation unfolds —',
  ],
} as const

/**
 * Helper function to get category color
 */
export function getCategoryColor(category: string): string {
  const categoryMap: Record<string, string> = {
    phase: colors.catPhase,
    energy: colors.catEnergy,
    pattern: colors.catPattern,
    extreme: colors.catExtreme,
    contradiction: colors.catContradiction,
    force: colors.catForce,
  }
  
  return categoryMap[category] || colors.blue
}

/**
 * Helper function to calculate content width
 */
export function getContentWidth(): number {
  return spacing.page.width - spacing.page.marginInner - spacing.page.marginOuter
}

/**
 * Helper function to get content X position based on page
 */
export function getContentX(isOddPage: boolean): number {
  return isOddPage ? spacing.page.marginInner : spacing.page.marginOuter
}

