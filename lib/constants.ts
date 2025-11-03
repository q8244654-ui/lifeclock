// Centralized constants for LifeClock

export const STORAGE_KEYS = {
  ONBOARDING: 'lifeclockOnboarding',
  PHASES_RESULTS: 'lifeclock-phases-results',
  REFERRAL_CODE: 'lifeclock-referral-code',
  USER: 'lifeclock-user',
  INTENT: 'lifeclock-intent',
  ALL_RESULTS: 'lifeclock-all-results',
  SESSION_ID: 'lifeclock-session-id',
  TRACKED_PREFIX: 'lifeclock-tracked-',
  EMAIL_TRACKED_PREFIX: 'lifeclock-email-tracked-',
  ADMIN_AUTHENTICATED: 'lifeclock-admin-authenticated',
} as const

export const SOUNDS = {
  POP: 'pop',
  SEND: 'send',
  COMPLETE: 'complete',
  CHIME: 'chime',
  HEARTBEAT: 'heartbeat',
  TAP: 'tap',
  TEMPORAL_WIND: 'temporal_wind',
} as const

export const PHASE_SOUNDS = {
  1: 'phase1',
  2: 'phase2',
  3: 'phase3',
  4: 'phase4',
  5: 'phase5',
  6: 'phase6',
  7: 'phase7',
  8: 'phase8',
  9: 'phase9',
  10: 'phase10',
} as const

export const TIMING = {
  TYPING_DELAY_BASE: 600,
  TYPING_DELAY_RANDOM: 700,
  MESSAGE_DELAY: 800,
  PHASE_TRANSITION_DURATION: 9000,
  AUTO_SCROLL_DELAY: 400,
  SCROLL_THRESHOLD: 40,
} as const

export const AUDIO = {
  DEFAULT_VOLUME: 0.3,
  PHASE_TRANSITION_VOLUME: 0.6,
  HEARTBEAT_VOLUME: 0.5,
  TEMPORAL_WIND_VOLUME: 0.2,
} as const

export const VIBRATION = {
  LIGHT: 40,
  MEDIUM: 80,
  HEAVY: 150,
} as const

export const GUARANTEE = {
  DAYS: 7,
  MARKETING_TEXT: "Satisfied or refunded - 7d",
  DESCRIPTION: "7-day money-back guarantee",
  // Version émotionnelle pour le bloc de garantie principal
  HOOK: "Your journey is sacred.",
  PROMISE: "You have 7 days to explore.",
  REFUND: "If it doesn't shift something inside you — we refund you, instantly.",
  PROCESS: "No forms. No questions. Just honesty.",
  SIGNATURE: "Because transformation should never feel like a risk.",
  // Version complète (pour référence)
  DETAILS: "7-day money-back guarantee. If you're not satisfied, get a full refund within 7 days. No questions asked.",
  // Condition technique (pour vérification backend, pas pour affichage marketing)
  CONDITION: "If you haven't downloaded your PDF",
  // Texte pour CGU/Terms (non affiché dans le marketing)
  TERMS_TEXT: "The 7-day money-back guarantee applies only if the PDF report has not been downloaded. Once the PDF is downloaded, customers retain lifetime access to their web report but refunds are no longer available.",
} as const

export const SOCIAL_PROOF = {
  FALLBACK_COUNT: 1589, // Nombre par défaut si erreur de récupération
} as const

