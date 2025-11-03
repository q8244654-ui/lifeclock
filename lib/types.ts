export interface PhaseResult {
  id: number
  title?: string
  total: number
  archetype: string
  energyType?: "Mind" | "Heart" | "Drive" | "Spirit"
}

export interface EnergyProfile {
  averages: {
    Mind: number
    Heart: number
    Drive: number
    Spirit: number
  }
  dominantEnergy: "Mind" | "Heart" | "Drive" | "Spirit"
}

export interface Question {
  id: number
  text: string
  provocativeComment?: string // Optional provocative comment shown after answer
  options: Array<{
    label: string
    value: number
    feedback: string
  }>
}
