"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type ReferralRow = {
  id: string
  referrer_email: string
  referrer_code: string
  referred_email: string | null
  status: "pending" | "completed" | "paid"
  commission_amount: number
  created_at: string
  completed_at: string | null
}

type AffiliateInfo = {
  email: string
  name: string | null
}

type AffiliateStats = {
  referrer_email: string
  referrer_code: string
  name: string | null
  totalReferrals: number
  pendingCount: number
  completedCount: number
  paidCount: number
  revenueGenerated: number // 47$ × (completedCount + paidCount)
  amountToPay: number // somme commission_amount des "completed"
  amountPaid: number // somme commission_amount des "paid"
  referrals: ReferralRow[]
  latestCompletedAt: string | null // pour le tri
  latestPaidAt: string | null // pour le tri
}

const AUTH_STORAGE_KEY = "lifeclock-admin-authenticated"
const PRICE_PER_SALE = 47

export default function AdminReferralsPage() {
  const router = useRouter()
  const [referrals, setReferrals] = useState<ReferralRow[]>([])
  const [affiliatesInfo, setAffiliatesInfo] = useState<Map<string, AffiliateInfo>>(new Map())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPendingPayments, setFilterPendingPayments] = useState(false)
  const [filterCompletedPayments, setFilterCompletedPayments] = useState(false)
  const [updatingReferrals, setUpdatingReferrals] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored === "true") {
        setIsAuthenticated(true)
      }
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    const supabase = createClient()

    const loadData = async () => {
      // Charger les referrals
      const { data: referralsData, error: referralsError } = await supabase
        .from("referrals")
        .select("*")
        .not("referred_email", "is", null)
        .order("created_at", { ascending: false })

      if (referralsError) {
        // Silent error handling - UI will show empty state
        return
      }

      if (referralsData) {
        setReferrals(referralsData as ReferralRow[])

        // Récupérer les emails uniques des affiliés
        const uniqueEmails = Array.from(new Set(referralsData.map((r: ReferralRow) => r.referrer_email)))

        // Charger les infos des affiliés
        const { data: affiliatesData, error: affiliatesError } = await supabase
          .from("onboarding_data")
          .select("email, name")
          .in("email", uniqueEmails)

        if (!affiliatesError && affiliatesData) {
          const infoMap = new Map<string, AffiliateInfo>()
          affiliatesData.forEach((aff: AffiliateInfo) => {
            infoMap.set(aff.email, aff)
          })
          setAffiliatesInfo(infoMap)
        }
      }
    }

    loadData()

    // Écouter les changements en temps réel
    const channel = supabase
      .channel("realtime-referrals")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "referrals" },
        async () => {
          // Recharger les données
          await loadData()
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "referrals" },
        async () => {
          // Recharger les données
          await loadData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername("")
    setPassword("")
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username || !password) {
      setAuthError("Veuillez remplir tous les champs")
      return
    }

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsAuthenticated(true)
        setAuthError(null)
        if (typeof window !== "undefined") {
          localStorage.setItem(AUTH_STORAGE_KEY, "true")
        }
      } else {
        setAuthError(data.error || "Identifiant ou mot de passe incorrect")
        setPassword("")
      }
    } catch {
      setAuthError("Erreur de connexion")
      setPassword("")
    }
  }

  const handleMarkAsPaid = async (referralId: string) => {
    setUpdatingReferrals((prev) => new Set(prev).add(referralId))

    try {
      const supabase = createClient()
      
      // Get referral data before updating
      const { data: referralData } = await supabase
        .from("referrals")
        .select("referrer_email, commission_amount")
        .eq("id", referralId)
        .single()

      const { error } = await supabase
        .from("referrals")
        .update({ status: "paid" })
        .eq("id", referralId)

      if (error) {
        alert("Erreur lors de la mise à jour")
      } else if (referralData) {
        // Send commission paid email
        try {
          const { sendCommissionPaidEmail } = await import("@/lib/emails")
          
          // Get referrer name from onboarding data
          const { data: onboardingData } = await supabase
            .from("onboarding_data")
            .select("name")
            .eq("email", referralData.referrer_email)
            .single()

          const userName = onboardingData?.name || referralData.referrer_email.split("@")[0]
          
          await sendCommissionPaidEmail({
            email: referralData.referrer_email,
            userName,
            amount: Number(referralData.commission_amount) || 10.0,
          })
        } catch (emailError) {
          console.error("[Admin] Error sending commission paid email:", emailError)
          // Silent error - don't block the update
        }
      }
      // Le temps réel actualisera automatiquement les données
    } catch {
      alert("Erreur lors de la mise à jour")
    } finally {
      setUpdatingReferrals((prev) => {
        const next = new Set(prev)
        next.delete(referralId)
        return next
      })
    }
  }

  // Grouper les referrals par affilié
  const groupedAffiliates = useMemo(() => {
    const grouped = new Map<string, AffiliateStats>()

    referrals.forEach((referral) => {
      const email = referral.referrer_email
      if (!grouped.has(email)) {
        const info = affiliatesInfo.get(email)
        grouped.set(email, {
          referrer_email: email,
          referrer_code: referral.referrer_code,
          name: info?.name || null,
          totalReferrals: 0,
          pendingCount: 0,
          completedCount: 0,
          paidCount: 0,
          revenueGenerated: 0,
          amountToPay: 0,
          amountPaid: 0,
          referrals: [],
          latestCompletedAt: null,
          latestPaidAt: null,
        })
      }

      const stats = grouped.get(email)!
      stats.referrals.push(referral)
      stats.totalReferrals++

      if (referral.status === "pending") {
        stats.pendingCount++
      } else if (referral.status === "completed") {
        stats.completedCount++
        stats.amountToPay += Number(referral.commission_amount) || 0
        if (referral.completed_at && (!stats.latestCompletedAt || referral.completed_at > stats.latestCompletedAt)) {
          stats.latestCompletedAt = referral.completed_at
        }
      } else if (referral.status === "paid") {
        stats.paidCount++
        stats.amountPaid += Number(referral.commission_amount) || 0
        if (referral.completed_at && (!stats.latestPaidAt || referral.completed_at > stats.latestPaidAt)) {
          stats.latestPaidAt = referral.completed_at
        }
      }
    })

    // Calculer les revenus générés et arrondir les montants
    grouped.forEach((stats) => {
      stats.revenueGenerated = PRICE_PER_SALE * (stats.completedCount + stats.paidCount)
      stats.amountToPay = Math.round(stats.amountToPay * 100) / 100
      stats.amountPaid = Math.round(stats.amountPaid * 100) / 100
    })

    return Array.from(grouped.values())
  }, [referrals, affiliatesInfo])

  // Filtrer et trier les affiliés
  const filteredAndSortedAffiliates = useMemo(() => {
    let filtered = groupedAffiliates

    // Filtre de recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (aff) =>
          aff.name?.toLowerCase().includes(query) ||
          aff.referrer_email.toLowerCase().includes(query)
      )
    }

    // Filtres de paiement
    if (filterPendingPayments) {
      filtered = filtered.filter((aff) => aff.amountToPay > 0)
    }

    if (filterCompletedPayments) {
      filtered = filtered.filter((aff) => aff.amountPaid > 0)
    }

    // Tri
    if (filterPendingPayments && !filterCompletedPayments) {
      // Tri par completed_at le plus récent pour "paiements à faire"
      filtered.sort((a, b) => {
        if (!a.latestCompletedAt && !b.latestCompletedAt) return 0
        if (!a.latestCompletedAt) return 1
        if (!b.latestCompletedAt) return -1
        return b.latestCompletedAt.localeCompare(a.latestCompletedAt)
      })
    } else if (filterCompletedPayments && !filterPendingPayments) {
      // Tri par completed_at le plus récent pour "paiements finalisés"
      filtered.sort((a, b) => {
        if (!a.latestPaidAt && !b.latestPaidAt) return 0
        if (!a.latestPaidAt) return 1
        if (!b.latestPaidAt) return -1
        return b.latestPaidAt.localeCompare(a.latestPaidAt)
      })
    } else if (filterPendingPayments && filterCompletedPayments) {
      // Si les deux filtres sont actifs, trier par le plus récent entre les deux
      filtered.sort((a, b) => {
        const aLatest = a.latestCompletedAt || a.latestPaidAt
        const bLatest = b.latestCompletedAt || b.latestPaidAt
        if (!aLatest && !bLatest) return 0
        if (!aLatest) return 1
        if (!bLatest) return -1
        return bLatest.localeCompare(aLatest)
      })
    }

    return filtered
  }, [groupedAffiliates, searchQuery, filterPendingPayments, filterCompletedPayments])

  // Calculer les statistiques globales
  const globalStats = useMemo(() => {
    const activeAffiliates = new Set<string>()
    let totalReferrals = 0
    let totalCompletedOrPaid = 0
    let totalToPay = 0
    let totalPaid = 0

    referrals.forEach((ref) => {
      if (ref.referred_email) {
        activeAffiliates.add(ref.referrer_email)
        totalReferrals++
        if (ref.status === "completed" || ref.status === "paid") {
          totalCompletedOrPaid++
        }
        if (ref.status === "completed") {
          totalToPay += Number(ref.commission_amount) || 0
        }
        if (ref.status === "paid") {
          totalPaid += Number(ref.commission_amount) || 0
        }
      }
    })

    return {
      activeAffiliates: activeAffiliates.size,
      totalReferrals,
      totalRevenue: PRICE_PER_SALE * totalCompletedOrPaid,
      totalToPay: Math.round(totalToPay * 100) / 100,
      totalPaid: Math.round(totalPaid * 100) / 100,
    }
  }, [referrals])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400">Chargement...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="rounded-xl border border-white/10 bg-black/40 p-8">
            <h1 className="text-2xl font-semibold text-white mb-2">Accès Admin</h1>
            <p className="text-gray-400 text-sm mb-6">Entrez vos identifiants pour accéder au dashboard</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm text-gray-400 mb-2">
                  Identifiant
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg bg-[#2C2C2E] border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre identifiant"
                  autoFocus
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm text-gray-400 mb-2">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-[#2C2C2E] border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              
              {authError && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                  {authError}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white font-medium transition-colors"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const Card = ({ title, value, suffix, subtitle }: { title: string; value: number; suffix?: string; subtitle?: string }) => (
    <div className="rounded-xl border border-white/10 bg-black/40 p-5">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-white">
        {value}
        {suffix ? <span className="text-gray-400 text-xl ml-1">{suffix}</span> : null}
      </div>
      {subtitle && (
        <div className="mt-2 text-sm text-gray-500">{subtitle}</div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Affiliés</h1>
            <p className="text-gray-400 mt-1">Gestion des affiliés et paiements</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/admin/conversions")}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-white/10 text-sm text-gray-300 transition-colors"
            >
              Conversions
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-white/10 text-sm text-gray-300 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Statistiques globales */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card title="Affiliés actifs" value={globalStats.activeAffiliates} />
          <Card title="Total referrals" value={globalStats.totalReferrals} />
          <Card title="Revenus générés" value={globalStats.totalRevenue} suffix="$" />
          <Card title="À payer" value={globalStats.totalToPay} suffix="$" />
          <Card title="Déjà payé" value={globalStats.totalPaid} suffix="$" />
        </div>

        {/* Filtres */}
        <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom ou email..."
              className="flex-1 rounded-lg bg-[#2C2C2E] border border-white/10 px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setFilterPendingPayments(!filterPendingPayments)}
                className={`px-4 py-2 rounded-lg border border-white/10 text-sm transition-colors ${
                  filterPendingPayments
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                Paiements à faire
              </button>
              <button
                onClick={() => setFilterCompletedPayments(!filterCompletedPayments)}
                className={`px-4 py-2 rounded-lg border border-white/10 text-sm transition-colors ${
                  filterCompletedPayments
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                Paiements finalisés
              </button>
            </div>
          </div>
        </div>

        {/* Tableau principal */}
        <div className="mt-8 rounded-xl border border-white/10 bg-black/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/60 border-b border-white/10">
                <tr>
                  <th className="text-left px-4 py-3 text-sm text-gray-400">Affilié</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-400">Code</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-400">Personnes amenées</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-400">Revenus générés</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-400">À payer</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-400">Déjà payé</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedAffiliates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      Aucun affilié trouvé
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedAffiliates.map((aff) => (
                    <tr key={aff.referrer_email} className="border-b border-white/5 hover:bg-black/20">
                      <td className="px-4 py-3">
                        <div className="text-white">{aff.name || "N/A"}</div>
                        <div className="text-sm text-gray-400">{aff.referrer_email}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-300 font-mono text-sm">{aff.referrer_code}</td>
                      <td className="px-4 py-3">
                        <div className="text-white">{aff.totalReferrals}</div>
                        <div className="text-xs text-gray-500">
                          {aff.pendingCount} pending • {aff.completedCount} completed • {aff.paidCount} paid
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-green-400 font-semibold">${aff.revenueGenerated}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-yellow-400 font-semibold">${aff.amountToPay}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-blue-400 font-semibold">${aff.amountPaid}</span>
                      </td>
                      <td className="px-4 py-3">
                        {aff.completedCount > 0 && (
                          <button
                            onClick={() => {
                              // Marquer tous les "completed" comme "paid"
                              aff.referrals
                                .filter((r) => r.status === "completed")
                                .forEach((r) => handleMarkAsPaid(r.id))
                            }}
                            disabled={aff.referrals.some((r) => r.status === "completed" && updatingReferrals.has(r.id))}
                            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Marquer payé ({aff.completedCount})
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section détaillée */}
        <div className="mt-10 rounded-xl border border-white/10 bg-black/40 p-5">
          <h2 className="text-lg font-semibold mb-4">Détails des referrals par affilié</h2>
          <div className="space-y-6">
            {filteredAndSortedAffiliates.map((aff) => (
              <div key={aff.referrer_email} className="border border-white/10 rounded-lg p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-white">{aff.name || "N/A"}</h3>
                  <p className="text-sm text-gray-400">{aff.referrer_email}</p>
                  <p className="text-xs text-gray-500 mt-1">Code: {aff.referrer_code}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-black/40 border-b border-white/10">
                      <tr>
                        <th className="text-left px-3 py-2 text-gray-400">Email référé</th>
                        <th className="text-left px-3 py-2 text-gray-400">Date création</th>
                        <th className="text-left px-3 py-2 text-gray-400">Date complétion</th>
                        <th className="text-left px-3 py-2 text-gray-400">Statut</th>
                        <th className="text-left px-3 py-2 text-gray-400">Commission</th>
                        <th className="text-left px-3 py-2 text-gray-400">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aff.referrals.map((ref) => (
                        <tr key={ref.id} className="border-b border-white/5">
                          <td className="px-3 py-2 text-gray-300">{ref.referred_email || "-"}</td>
                          <td className="px-3 py-2 text-gray-400">
                            {new Date(ref.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-3 py-2 text-gray-400">
                            {ref.completed_at ? new Date(ref.completed_at).toLocaleDateString() : "-"}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`px-2 py-0.5 rounded text-xs ${
                                ref.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : ref.status === "completed"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              {ref.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-gray-300">${ref.commission_amount}</td>
                          <td className="px-3 py-2">
                            {ref.status === "completed" && (
                              <button
                                onClick={() => handleMarkAsPaid(ref.id)}
                                disabled={updatingReferrals.has(ref.id)}
                                className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                {updatingReferrals.has(ref.id) ? "..." : "Marquer payé"}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

