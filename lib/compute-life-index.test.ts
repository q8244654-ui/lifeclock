import { describe, it, expect } from 'vitest'
import { computeLifeIndex } from './compute-life-index'
import type { PhaseResult } from './types'

describe('computeLifeIndex', () => {
  it('should calculate life index correctly for high scores', () => {
    const phasesResults: PhaseResult[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Phase ${i + 1}`,
      total: 30,
      archetype: `Archetype ${i + 1}`,
    }))

    const result = computeLifeIndex(phasesResults)

    expect(result.lifeIndex).toBe(100)
    expect(result.stage).toBe('The Luminary — embodying timelessness.')
  })

  it('should calculate life index correctly for medium scores', () => {
    const phasesResults: PhaseResult[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Phase ${i + 1}`,
      total: 15,
      archetype: `Archetype ${i + 1}`,
    }))

    const result = computeLifeIndex(phasesResults)

    expect(result.lifeIndex).toBe(50)
    expect(result.stage).toBe('The Wanderer — learning alignment.')
  })

  it('should calculate life index correctly for low scores', () => {
    const phasesResults: PhaseResult[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Phase ${i + 1}`,
      total: 10,
      archetype: `Archetype ${i + 1}`,
    }))

    const result = computeLifeIndex(phasesResults)

    expect(result.lifeIndex).toBe(33)
    expect(result.stage).toBe('The Sleeper — awareness awakening.')
  })

  it('should categorize stages correctly', () => {
    // Test boundary values
    // 10 phases, max 30 each = 300 max
    // Boundaries: < 40 = Sleeper, 40-64 = Wanderer, 65-84 = Alchemist, >= 85 = Luminary
    const testCases = [
      { total: 11, expectedStage: 'The Sleeper — awareness awakening.' }, // 11*10 = 110, 110/300 = 0.367, lifeIndex = 37 < 40
      { total: 12, expectedStage: 'The Wanderer — learning alignment.' }, // 12*10 = 120, 120/300 = 0.4, lifeIndex = 40, 40 < 65
      { total: 19, expectedStage: 'The Wanderer — learning alignment.' }, // 19*10 = 190, 190/300 = 0.633, lifeIndex = 63, 40 <= 63 < 65
      { total: 20, expectedStage: 'The Alchemist — shaping inner mastery.' }, // 20*10 = 200, 200/300 = 0.667, lifeIndex = 67, 65 <= 67 < 85
      { total: 25, expectedStage: 'The Alchemist — shaping inner mastery.' }, // 25*10 = 250, 250/300 = 0.833, lifeIndex = 83, 65 <= 83 < 85
      { total: 26, expectedStage: 'The Luminary — embodying timelessness.' }, // 26*10 = 260, 260/300 = 0.867, lifeIndex = 87, >= 85
    ]

    testCases.forEach(({ total, expectedStage }) => {
      const phasesResults: PhaseResult[] = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `Phase ${i + 1}`,
        total,
        archetype: `Archetype ${i + 1}`,
      }))

      const result = computeLifeIndex(phasesResults)
      expect(result.stage).toBe(expectedStage)
    })
  })

  it('should handle empty phases array', () => {
    const result = computeLifeIndex([])

    expect(result.lifeIndex).toBe(0)
    expect(result.stage).toBe('The Sleeper — awareness awakening.')
  })
})

