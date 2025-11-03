import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// Test de validation Zod pour les types principaux
describe('Type validation with Zod', () => {
  const PhaseResultSchema = z.object({
    id: z.number(),
    title: z.string().optional(),
    total: z.number().min(0).max(100),
    archetype: z.string(),
    energyType: z.enum(['Mind', 'Heart', 'Drive', 'Spirit']).optional(),
  })

  it('should validate valid PhaseResult', () => {
    const validPhase = {
      id: 1,
      title: 'Phase 1',
      total: 50,
      archetype: 'Mirror',
    }

    expect(() => PhaseResultSchema.parse(validPhase)).not.toThrow()
    const result = PhaseResultSchema.parse(validPhase)
    expect(result.id).toBe(1)
    expect(result.total).toBe(50)
  })

  it('should reject invalid PhaseResult with negative total', () => {
    const invalidPhase = {
      id: 1,
      total: -10,
      archetype: 'Mirror',
    }

    expect(() => PhaseResultSchema.parse(invalidPhase)).toThrow()
  })

  it('should reject invalid PhaseResult with total > 100', () => {
    const invalidPhase = {
      id: 1,
      total: 150,
      archetype: 'Mirror',
    }

    expect(() => PhaseResultSchema.parse(invalidPhase)).toThrow()
  })

  it('should validate EnergyProfile structure', () => {
    const EnergyProfileSchema = z.object({
      averages: z.object({
        Mind: z.number(),
        Heart: z.number(),
        Drive: z.number(),
        Spirit: z.number(),
      }),
      dominantEnergy: z.enum(['Mind', 'Heart', 'Drive', 'Spirit']),
    })

    const validProfile = {
      averages: {
        Mind: 25,
        Heart: 30,
        Drive: 20,
        Spirit: 28,
      },
      dominantEnergy: 'Heart' as const,
    }

    expect(() => EnergyProfileSchema.parse(validProfile)).not.toThrow()
    const result = EnergyProfileSchema.parse(validProfile)
    expect(result.dominantEnergy).toBe('Heart')
    expect(result.averages.Heart).toBe(30)
  })

  it('should reject invalid dominantEnergy', () => {
    const EnergyProfileSchema = z.object({
      averages: z.object({
        Mind: z.number(),
        Heart: z.number(),
        Drive: z.number(),
        Spirit: z.number(),
      }),
      dominantEnergy: z.enum(['Mind', 'Heart', 'Drive', 'Spirit']),
    })

    const invalidProfile = {
      averages: {
        Mind: 25,
        Heart: 30,
        Drive: 20,
        Spirit: 28,
      },
      dominantEnergy: 'Invalid',
    }

    expect(() => EnergyProfileSchema.parse(invalidProfile)).toThrow()
  })
})

