import { describe, it, expect } from 'vitest'
import { analyzeHiddenForces } from './analyze-forces'
import type { PhaseResult } from './types'

describe('analyzeHiddenForces', () => {
  it('should identify shadow, fear, and power phases correctly', () => {
    const phasesResults: PhaseResult[] = [
      { id: 1, total: 5, archetype: 'Mirror' }, // Lowest - shadow
      { id: 2, total: 10, archetype: 'Control' }, // Second lowest - fear
      { id: 3, total: 15, archetype: 'Desire' },
      { id: 4, total: 20, archetype: 'Love' },
      { id: 5, total: 25, archetype: 'Time' },
      { id: 6, total: 30, archetype: 'Money' }, // Highest - power
      { id: 7, total: 18, archetype: 'Body' },
      { id: 8, total: 22, archetype: 'Discipline' },
      { id: 9, total: 28, archetype: 'Faith' },
      { id: 10, total: 12, archetype: 'Legacy' },
    ]

    const result = analyzeHiddenForces(phasesResults)

    expect(result.shadow.type).toBe('shadow')
    expect(result.shadow.score).toBe(5)
    expect(result.shadow.phase.id).toBe(1)

    expect(result.fear.type).toBe('fear')
    expect(result.fear.score).toBe(10)
    expect(result.fear.phase.id).toBe(2)

    expect(result.power.type).toBe('power')
    expect(result.power.score).toBe(30)
    expect(result.power.phase.id).toBe(6)
  })

  it('should include correct insights for each force type', () => {
    const phasesResults: PhaseResult[] = [
      { id: 1, total: 5, archetype: 'Mirror' },
      { id: 2, total: 10, archetype: 'Control' },
      { id: 6, total: 30, archetype: 'Money' },
      { id: 3, total: 15, archetype: 'Desire' },
      { id: 4, total: 20, archetype: 'Love' },
      { id: 5, total: 25, archetype: 'Time' },
      { id: 7, total: 18, archetype: 'Body' },
      { id: 8, total: 22, archetype: 'Discipline' },
      { id: 9, total: 28, archetype: 'Faith' },
      { id: 10, total: 12, archetype: 'Legacy' },
    ]

    const result = analyzeHiddenForces(phasesResults)

    expect(result.shadow.title).toBe('Mirror')
    expect(result.shadow.insight).toContain('flee your own reflection')

    expect(result.fear.title).toBe('Control')
    expect(result.fear.insight).toContain('afraid of losing control')

    expect(result.power.title).toBe('Money')
    expect(result.power.insight).toContain('money is a tool')
  })

  it('should include action items for each force', () => {
    const phasesResults: PhaseResult[] = [
      { id: 1, total: 5, archetype: 'Mirror' },
      { id: 2, total: 10, archetype: 'Control' },
      { id: 6, total: 30, archetype: 'Money' },
      { id: 3, total: 15, archetype: 'Desire' },
      { id: 4, total: 20, archetype: 'Love' },
      { id: 5, total: 25, archetype: 'Time' },
      { id: 7, total: 18, archetype: 'Body' },
      { id: 8, total: 22, archetype: 'Discipline' },
      { id: 9, total: 28, archetype: 'Faith' },
      { id: 10, total: 12, archetype: 'Legacy' },
    ]

    const result = analyzeHiddenForces(phasesResults)

    expect(result.shadow.action).toContain('Look it in the face')
    expect(result.fear.action).toContain('one thing that scares you')
    expect(result.power.action).toContain('Use it consciously')
  })

  it('should handle minimum phases correctly', () => {
    const phasesResults: PhaseResult[] = [
      { id: 1, total: 5, archetype: 'Mirror' },
      { id: 2, total: 30, archetype: 'Control' },
    ]

    const result = analyzeHiddenForces(phasesResults)

    expect(result.shadow.phase.id).toBe(1)
    expect(result.fear.phase.id).toBe(2) // When only 2 phases, second lowest is the second phase
    expect(result.power.phase.id).toBe(2)
  })

  it('should have correct descriptions', () => {
    const phasesResults: PhaseResult[] = [
      { id: 1, total: 5, archetype: 'Mirror' },
      { id: 2, total: 10, archetype: 'Control' },
      { id: 6, total: 30, archetype: 'Money' },
      { id: 3, total: 15, archetype: 'Desire' },
      { id: 4, total: 20, archetype: 'Love' },
      { id: 5, total: 25, archetype: 'Time' },
      { id: 7, total: 18, archetype: 'Body' },
      { id: 8, total: 22, archetype: 'Discipline' },
      { id: 9, total: 28, archetype: 'Faith' },
      { id: 10, total: 12, archetype: 'Legacy' },
    ]

    const result = analyzeHiddenForces(phasesResults)

    expect(result.shadow.description).toBe('What you refuse to see')
    expect(result.fear.description).toBe('What paralyzes you')
    expect(result.power.description).toBe('What you dare not use')
  })
})

