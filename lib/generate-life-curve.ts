export interface LifeCurvePoint {
  phase: string
  value: number
}

export function generateLifeCurve(phasesResults: Array<{ title: string; total: number }>): LifeCurvePoint[] {
  return phasesResults.map((phase) => ({
    phase: phase.title,
    value: phase.total,
  }))
}

export function interpretLifeCurve(curve: LifeCurvePoint[]): string {
  if (curve.length === 0) return ""

  const values = curve.map((p) => p.value)
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min

  // Determine curve pattern
  const firstHalf = values.slice(0, 5).reduce((a, b) => a + b, 0) / 5
  const secondHalf = values.slice(5).reduce((a, b) => a + b, 0) / 5

  if (range < 5) {
    return "Your curve reveals remarkable consistency. You maintain equilibrium across all dimensions of life — a sign of deep integration."
  } else if (secondHalf > firstHalf + 3) {
    return "Your curve shows an ascending journey. You've been growing, evolving, transcending your earlier patterns. This is the path of transformation."
  } else if (firstHalf > secondHalf + 3) {
    return "Your curve reveals a descent into depth. What looks like decline is actually integration — you're moving from doing to being."
  } else {
    return "Your curve dances between peaks and valleys. This rhythm is not chaos — it's the natural pulse of a life fully lived."
  }
}
