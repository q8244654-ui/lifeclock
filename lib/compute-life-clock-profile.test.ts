import { describe, it, expect } from 'vitest'
import { computeLifeClockProfile } from './compute-life-clock-profile'
import type { PhaseResult } from './types'

describe('computeLifeClockProfile', () => {
  it('should calculate energy averages correctly', () => {
    const phasesResults: PhaseResult[] = [
      { id: 1, total: 30, archetype: 'Mirror' }, // Mind
      { id: 2, total: 25, archetype: 'Control' }, // Mind
      { id: 3, total: 20, archetype: 'Desire' }, // Drive
      { id: 4, total: 28, archetype: 'Love' }, // Heart
      { id: 5, total: 22, archetype: 'Time' }, // Spirit
      { id: 6, total: 18, archetype: 'Money' }, // Drive
      { id: 7, total: 26, archetype: 'Body' }, // Heart
      { id: 8, total: 24, archetype: 'Discipline' }, // Mind
      { id: 9, total: 29, archetype: 'Faith' }, // Spirit
      { id: 10, total: 27, archetype: 'Legacy' }, // Spirit
    ]

    const result = computeLifeClockProfile(phasesResults)

    // Mind: phases 1, 2, 8 = (30 + 25 + 24) / 3 = 26.33
    expect(result.averages.Mind).toBeCloseTo(26.33, 2)
    // Heart: phases 4, 7 = (28 + 26) / 2 = 27
    expect(result.averages.Heart).toBe(27)
    // Drive: phases 3, 6 = (20 + 18) / 2 = 19
    expect(result.averages.Drive).toBe(19)
    // Spirit: phases 5, 9, 10 = (22 + 29 + 27) / 3 = 26
    expect(result.averages.Spirit).toBeCloseTo(26, 2)
  })

  it('should identify dominant energy correctly', () => {
    const phasesResults: PhaseResult[] = [
      { id: 1, total: 30, archetype: 'Mirror' }, // Mind
      { id: 4, total: 30, archetype: 'Love' }, // Heart
      { id: 5, total: 30, archetype: 'Time' }, // Spirit
      { id: 6, total: 10, archetype: 'Money' }, // Drive
      { id: 7, total: 30, archetype: 'Body' }, // Heart
      { id: 8, total: 30, archetype: 'Discipline' }, // Mind
      { id: 9, total: 30, archetype: 'Faith' }, // Spirit
      { id: 10, total: 30, archetype: 'Legacy' }, // Spirit
      { id: 2, total: 30, archetype: 'Control' }, // Mind
      { id: 3, total: 30, archetype: 'Desire' }, // Drive
    ]

    const result = computeLifeClockProfile(phasesResults)

    // Mind: 1, 2, 8 = 3 phases, avg = 30
    // Heart: 4, 7 = 2 phases, avg = 30
    // Drive: 3, 6 = 2 phases, avg = (30 + 10) / 2 = 20
    // Spirit: 5, 9, 10 = 3 phases, avg = 30
    // Since Mind, Heart, and Spirit all have avg 30, the first sorted (alphabetically or by insertion order) wins
    // In practice, sorting by value descending then first key will give Mind as it's checked first
    expect(['Mind', 'Heart', 'Spirit']).toContain(result.dominantEnergy)
  })

  it('should handle phases with zero scores', () => {
    const phasesResults: PhaseResult[] = [
      { id: 1, total: 0, archetype: 'Mirror' },
      { id: 4, total: 0, archetype: 'Love' },
      { id: 3, total: 0, archetype: 'Desire' },
      { id: 5, total: 0, archetype: 'Time' },
    ]

    const result = computeLifeClockProfile(phasesResults)

    expect(result.averages.Mind).toBe(0)
    expect(result.averages.Heart).toBe(0)
    expect(result.averages.Drive).toBe(0)
    expect(result.averages.Spirit).toBe(0)
  })

  it('should handle empty phases array', () => {
    const result = computeLifeClockProfile([])

    expect(result.averages.Mind).toBe(0)
    expect(result.averages.Heart).toBe(0)
    expect(result.averages.Drive).toBe(0)
    expect(result.averages.Spirit).toBe(0)
  })

  it('should handle missing phases correctly', () => {
    // Only some phases present
    const phasesResults: PhaseResult[] = [
      { id: 1, total: 25, archetype: 'Mirror' },
      { id: 4, total: 30, archetype: 'Love' },
    ]

    const result = computeLifeClockProfile(phasesResults)

    // Mind: only phase 1 = 25 / 1 = 25
    expect(result.averages.Mind).toBe(25)
    // Heart: only phase 4 = 30 / 1 = 30
    expect(result.averages.Heart).toBe(30)
    // Drive: no phases = 0
    expect(result.averages.Drive).toBe(0)
    // Spirit: no phases = 0
    expect(result.averages.Spirit).toBe(0)
  })
})

