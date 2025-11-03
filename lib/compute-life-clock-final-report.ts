import { computeLifeClockProfile } from "./compute-life-clock-profile"
import { computeLifeIndex } from "./compute-life-index"
import { generateLifeCurve, interpretLifeCurve } from "./generate-life-curve"
import { generateDestinyPhrase } from "./generate-destiny-phrase"
import { generateResultSummary } from "./generate-result-summary"
import type { PhaseResult } from "./types"

export interface LifeClockFinalReport {
  profile: ReturnType<typeof computeLifeClockProfile>
  lifeIndex: ReturnType<typeof computeLifeIndex>
  lifeCurve: ReturnType<typeof generateLifeCurve>
  destiny: string
  archetype: string
  summary: ReturnType<typeof generateResultSummary>
}

export function computeLifeClockFinalReport(phasesResults: PhaseResult[]): LifeClockFinalReport {
  const profile = computeLifeClockProfile(phasesResults)
  const lifeIndex = computeLifeIndex(phasesResults)
  const lifeCurve = generateLifeCurve(
    phasesResults.map((p) => ({
      title: p.title || `Phase ${p.id}`,
      total: p.total,
    }))
  )
  const destiny = generateDestinyPhrase(profile, lifeIndex)

  return {
    profile,
    lifeIndex,
    lifeCurve,
    destiny,
    archetype: profile.dominantEnergy,
    summary: generateResultSummary(profile, lifeIndex),
  }
}

export { interpretLifeCurve }
