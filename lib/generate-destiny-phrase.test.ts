import { describe, it, expect } from 'vitest'
import { generateDestinyPhrase } from './generate-destiny-phrase'

describe('generateDestinyPhrase', () => {
  it('should generate phrase for Mind energy with high index', () => {
    const profile = { dominantEnergy: 'Mind' }
    const index = { lifeIndex: 90 }

    const result = generateDestinyPhrase(profile, index)

    expect(result).toContain('born to build')
    expect(result).toContain('already begun fulfilling')
  })

  it('should generate phrase for Heart energy with medium index', () => {
    const profile = { dominantEnergy: 'Heart' }
    const index = { lifeIndex: 70 }

    const result = generateDestinyPhrase(profile, index)

    expect(result).toContain('born to connect')
    expect(result).toContain('walking toward it')
  })

  it('should generate phrase for Drive energy with low index', () => {
    const profile = { dominantEnergy: 'Drive' }
    const index = { lifeIndex: 50 }

    const result = generateDestinyPhrase(profile, index)

    expect(result).toContain('born to ignite')
    expect(result).toContain('waiting')
  })

  it('should generate phrase for Spirit energy', () => {
    const profile = { dominantEnergy: 'Spirit' }
    const index = { lifeIndex: 60 }

    const result = generateDestinyPhrase(profile, index)

    expect(result).toContain('born to dissolve')
    expect(result).toContain('waiting')
  })

  it('should use correct suffix for lifeIndex > 85', () => {
    const profile = { dominantEnergy: 'Mind' }
    const index = { lifeIndex: 86 }

    const result = generateDestinyPhrase(profile, index)

    expect(result).toContain('already begun fulfilling')
  })

  it('should use correct suffix for lifeIndex > 65 and <= 85', () => {
    const profile = { dominantEnergy: 'Heart' }
    const index = { lifeIndex: 70 }

    const result = generateDestinyPhrase(profile, index)

    expect(result).toContain('walking toward it')
  })

  it('should use correct suffix for lifeIndex <= 65', () => {
    const profile = { dominantEnergy: 'Drive' }
    const index = { lifeIndex: 65 }

    const result = generateDestinyPhrase(profile, index)

    expect(result).toContain('waiting')
    expect(result).toContain('unopened letter')
  })
})

