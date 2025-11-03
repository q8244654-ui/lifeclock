import { createClient } from "./server"

// Cache pour éviter trop de queries (5 minutes)
let cachedCount: number | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes en millisecondes

/**
 * Récupère le nombre de personnes ayant complété leur paiement aujourd'hui
 * Utilise un cache de 5 minutes pour optimiser les performances
 */
export async function getTodayCompletedReportsCount(): Promise<number> {
  // Vérifier le cache
  const now = Date.now()
  if (cachedCount !== null && now - cacheTimestamp < CACHE_DURATION) {
    return cachedCount
  }

  try {
    const supabase = await createClient()

    // Calculer le début et la fin du jour en UTC
    const now = new Date()
    const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0))
    const endOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999))

    // Compter les payment_complete du jour
    const { count, error } = await supabase
      .from("conversions")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "payment_complete")
      .gte("created_at", startOfToday.toISOString())
      .lte("created_at", endOfToday.toISOString())

    if (error) {
      console.error("[Stats] Error fetching today's count:", error)
      // En cas d'erreur, retourner le cache ou valeur par défaut
      return cachedCount ?? 1589
    }

    const countValue = count ?? 0

    // Mettre à jour le cache
    cachedCount = countValue
    cacheTimestamp = now.getTime()

    return countValue
  } catch (error) {
    console.error("[Stats] Error in getTodayCompletedReportsCount:", error)
    // En cas d'erreur, retourner le cache ou valeur par défaut
    return cachedCount ?? 1589
  }
}

