import type { PhaseResult, EnergyProfile } from './types'

// Collecte et pondération des phases
export function computeLifeClockProfile(phasesResults: PhaseResult[]): EnergyProfile {
  // phasesResults = [{ id, total, archetype }, ...]

  const energies = {
    Mind: [1, 2, 8],
    Heart: [4, 7],
    Drive: [3, 6],
    Spirit: [5, 9, 10],
  }

  const totals = { Mind: 0, Heart: 0, Drive: 0, Spirit: 0 }
  const counts = { Mind: 0, Heart: 0, Drive: 0, Spirit: 0 }

  for (const phase of phasesResults) {
    for (const [energy, ids] of Object.entries(energies)) {
      if (ids.includes(phase.id)) {
        totals[energy as keyof typeof totals] += phase.total
        counts[energy as keyof typeof counts] += 1
      }
    }
  }

  // Moyenne pondérée par type d'énergie
  const averages: EnergyProfile['averages'] = {
    Mind: counts.Mind ? totals.Mind / counts.Mind : 0,
    Heart: counts.Heart ? totals.Heart / counts.Heart : 0,
    Drive: counts.Drive ? totals.Drive / counts.Drive : 0,
    Spirit: counts.Spirit ? totals.Spirit / counts.Spirit : 0,
  }

  // Détermination de l'énergie dominante
  const dominantEnergy = Object.entries(averages).sort((a, b) => b[1] - a[1])[0][0] as EnergyProfile['dominantEnergy']

  return { averages, dominantEnergy }
}
