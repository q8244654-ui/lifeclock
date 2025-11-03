import type { PhaseResult } from "./types"

export interface HiddenForce {
  type: "shadow" | "fear" | "power"
  phase: PhaseResult
  score: number
  title: string
  description: string
  insight: string
  action: string
}

const phaseInsights = {
  1: {
    name: "Mirror",
    shadow: "You flee your own reflection. What you refuse to see in yourself controls you.",
    fear: "You're afraid to discover yourself. The inner unknown paralyzes you more than the outer.",
    power: "Your lucidity is your weapon. You see what others ignore.",
  },
  2: {
    name: "Control",
    shadow: "You let go of everything because controlling exhausts you. But chaos frightens you.",
    fear: "You're afraid of losing control. The unexpected terrifies you.",
    power: "Your mastery is impressive. You transform chaos into order.",
  },
  3: {
    name: "Desire",
    shadow: "You stifle your desires. You've learned to want nothing to avoid disappointment.",
    fear: "You're afraid to want. Desire seems dangerous, uncontrollable.",
    power: "Your desire is a flame that burns bright. It's your engine.",
  },
  4: {
    name: "Love",
    shadow: "You give little because you're afraid to lose. Love seems risky to you.",
    fear: "You're afraid to love. Vulnerability terrifies you.",
    power: "Your capacity for love is immense. You heal what you touch.",
  },
  5: {
    name: "Time",
    shadow: "You flee time. You procrastinate, you wait, you postpone until tomorrow.",
    fear: "You're afraid of passing time. Every second reminds you of your mortality.",
    power: "You master time. You know when to act, when to wait.",
  },
  6: {
    name: "Money",
    shadow: "Money controls you. You flee it or chase it, but you're never at peace with it.",
    fear: "You're afraid of lacking. Financial insecurity haunts you.",
    power: "You've understood that money is a tool. You master it without attachment.",
  },
  7: {
    name: "Body",
    shadow: "You neglect your body. You live in your head and forget your temple.",
    fear: "You're afraid of your body. Matter seems heavy, limiting.",
    power: "Your body is your ally. You listen to it, respect it, honor it.",
  },
  8: {
    name: "Discipline",
    shadow: "You lack structure. You start a thousand things, finish none.",
    fear: "You're afraid of discipline. It seems rigid, suffocating.",
    power: "Your discipline is your strength. You keep your commitments, to yourself first.",
  },
  9: {
    name: "Faith",
    shadow: "You believe in nothing. Cynicism protects you from disappointment.",
    fear: "You're afraid to believe. Faith seems naive, dangerous.",
    power: "Your faith is unshakeable. You believe in something greater than yourself.",
  },
  10: {
    name: "Legacy",
    shadow: "You live without thinking about what you leave behind. The present moment blinds you.",
    fear: "You're afraid of leaving nothing. Oblivion terrifies you.",
    power: "You're building a legacy. Every action is a stone in your cathedral.",
  },
}

export function analyzeHiddenForces(phasesResults: PhaseResult[]): {
  shadow: HiddenForce
  fear: HiddenForce
  power: HiddenForce
} {
  const sortedByScore = [...phasesResults].sort((a, b) => a.total - b.total)

  const shadowPhase = sortedByScore[0]
  const fearPhase = sortedByScore[1]
  const powerPhase = sortedByScore[sortedByScore.length - 1]

  const getInsight = (phase: PhaseResult, type: "shadow" | "fear" | "power") => {
    const insights = phaseInsights[phase.id as keyof typeof phaseInsights]
    return insights[type]
  }

  return {
    shadow: {
      type: "shadow",
      phase: shadowPhase,
      score: shadowPhase.total,
      title: phaseInsights[shadowPhase.id as keyof typeof phaseInsights].name,
      description: "What you refuse to see",
      insight: getInsight(shadowPhase, "shadow"),
      action: "Look it in the face. Once a day, for 5 minutes.",
    },
    fear: {
      type: "fear",
      phase: fearPhase,
      score: fearPhase.total,
      title: phaseInsights[fearPhase.id as keyof typeof phaseInsights].name,
      description: "What paralyzes you",
      insight: getInsight(fearPhase, "fear"),
      action: "Do one thing that scares you. Every week.",
    },
    power: {
      type: "power",
      phase: powerPhase,
      score: powerPhase.total,
      title: phaseInsights[powerPhase.id as keyof typeof phaseInsights].name,
      description: "What you dare not use",
      insight: getInsight(powerPhase, "power"),
      action: "Use it consciously. Every day.",
    },
  }
}
