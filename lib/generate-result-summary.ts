import type { EnergyProfile } from "./types"

interface LifeIndexResult {
  lifeIndex: number
  stage: string
}

export function generateResultSummary(profile: EnergyProfile, lifeIndex: LifeIndexResult) {
  const archetypeMessages: Record<string, string> = {
    Mind: "Your mind is your temple — but it may have become your prison.",
    Heart: "You feel deeply — perhaps too deeply to be at peace yet.",
    Drive: "You burn for more — but the fire can still consume you.",
    Spirit: "You've touched something eternal — few ever do.",
  }

  const archetypeEmojis: Record<string, string> = {
    Mind: "🧠",
    Heart: "💓",
    Drive: "⚡",
    Spirit: "🌞",
  }

  const archetypeNames: Record<string, string> = {
    Mind: "The Architect",
    Heart: "The Empath",
    Drive: "The Creator",
    Spirit: "The Sage",
  }

  return {
    score: lifeIndex.lifeIndex,
    stage: lifeIndex.stage,
    dominantEnergy: profile.dominantEnergy,
    archetypeName: archetypeNames[profile.dominantEnergy],
    archetypeEmoji: archetypeEmojis[profile.dominantEnergy],
    archetypeMessage: archetypeMessages[profile.dominantEnergy],
  }
}
