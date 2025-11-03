import { describe, it, expect } from 'vitest'
import { generateLifeCurve, interpretLifeCurve } from './generate-life-curve'

describe('generateLifeCurve', () => {
  it('should generate life curve from phases results', () => {
    const phasesResults = [
      { title: 'Phase 1', total: 25 },
      { title: 'Phase 2', total: 30 },
      { title: 'Phase 3', total: 20 },
    ]

    const result = generateLifeCurve(phasesResults)

    expect(result).toEqual([
      { phase: 'Phase 1', value: 25 },
      { phase: 'Phase 2', value: 30 },
      { phase: 'Phase 3', value: 20 },
    ])
  })

  it('should handle empty array', () => {
    const result = generateLifeCurve([])
    expect(result).toEqual([])
  })

  it('should handle all phases', () => {
    const phasesResults = Array.from({ length: 10 }, (_, i) => ({
      title: `Phase ${i + 1}`,
      total: (i + 1) * 3,
    }))

    const result = generateLifeCurve(phasesResults)

    expect(result).toHaveLength(10)
    expect(result[0].phase).toBe('Phase 1')
    expect(result[0].value).toBe(3)
    expect(result[9].phase).toBe('Phase 10')
    expect(result[9].value).toBe(30)
  })
})

describe('interpretLifeCurve', () => {
  it('should return empty string for empty curve', () => {
    const result = interpretLifeCurve([])
    expect(result).toBe('')
  })

  it('should detect consistent curve', () => {
    const curve = Array.from({ length: 10 }, () => ({
      phase: 'Phase',
      value: 25,
    }))

    const result = interpretLifeCurve(curve)
    expect(result).toContain('consistency')
    expect(result).toContain('equilibrium')
  })

  it('should detect ascending curve', () => {
    const curve = Array.from({ length: 10 }, (_, i) => ({
      phase: `Phase ${i + 1}`,
      value: i < 5 ? 10 : 20, // First half: 10, second half: 20
    }))

    const result = interpretLifeCurve(curve)
    expect(result).toContain('ascending')
    expect(result).toContain('transformation')
  })

  it('should detect descending curve', () => {
    const curve = Array.from({ length: 10 }, (_, i) => ({
      phase: `Phase ${i + 1}`,
      value: i < 5 ? 25 : 15, // First half: 25, second half: 15
    }))

    const result = interpretLifeCurve(curve)
    expect(result).toContain('descent')
    expect(result).toContain('integration')
  })

  it('should detect rhythmic curve', () => {
    const curve = Array.from({ length: 10 }, (_, i) => ({
      phase: `Phase ${i + 1}`,
      value: i % 2 === 0 ? 30 : 20, // Alternating values
    }))

    const result = interpretLifeCurve(curve)
    expect(result).toContain('dances')
    expect(result).toContain('rhythm')
  })

  it('should handle curve with small range', () => {
    const curve = Array.from({ length: 10 }, (_, i) => ({
      phase: `Phase ${i + 1}`,
      value: 25 + (i % 2), // Range of 1
    }))

    const result = interpretLifeCurve(curve)
    expect(result).toContain('consistency')
  })
})

