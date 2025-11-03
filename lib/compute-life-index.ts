import type { PhaseResult } from './types'

export interface LifeIndexResult {
  lifeIndex: number
  stage: string
}

export function computeLifeIndex(phasesResults: PhaseResult[]): LifeIndexResult {
  const totalScore = phasesResults.reduce((acc, p) => acc + p.total, 0)
  const maxScore = 10 * 30 // 10 phases x max 30 pts
  const ratio = totalScore / maxScore
  const lifeIndex = Math.round(ratio * 100) // sur 100

  let stage = ""
  if (lifeIndex < 40) stage = "The Sleeper — awareness awakening."
  else if (lifeIndex < 65) stage = "The Wanderer — learning alignment."
  else if (lifeIndex < 85) stage = "The Alchemist — shaping inner mastery."
  else stage = "The Luminary — embodying timelessness."

  return { lifeIndex, stage }
}
