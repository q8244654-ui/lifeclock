"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type ConversionRow = {
  event_type: "page_visit" | "email_given" | "quiz_complete" | "payment_complete"
  email: string | null
  session_id: string
  created_at: string
}

const AUTH_STORAGE_KEY = "lifeclock-admin-authenticated"

export default function AdminConversionsPage() {
  const router = useRouter()
  const [rows, setRows] = useState<ConversionRow[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si déjà authentifié dans localStorage
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

    const loadInitial = async () => {
      const { data, error } = await supabase
        .from("conversions")
        .select("event_type,email,session_id,created_at")
        .order("created_at", { ascending: true })
      if (!error && data) setRows(data as unknown as ConversionRow[])
    }

    loadInitial()

    const channel = supabase
      .channel("realtime-conversions")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "conversions" },
        (payload) => {
          const rec = payload.new as ConversionRow
          setRows((prev) => [...prev, rec])
        },
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

  const metrics = useMemo(() => {
    // Par session_id : ensemble de tous les événements pour chaque session
    const sessionEvents = new Map<string, Set<string>>()
    
    // Construire le mapping des événements par session
    for (const r of rows) {
      if (!sessionEvents.has(r.session_id)) {
        sessionEvents.set(r.session_id, new Set())
      }
      sessionEvents.get(r.session_id)!.add(r.event_type)
    }

    // Compter par type d'événement (sessions uniques)
    const pageSessions = new Set<string>()
    const emailSessionsSet = new Set<string>()
    const quizSessions = new Set<string>()

    // Compter les emails uniques
    const emailSet = new Set<string>()
    const payEmailSet = new Set<string>()

    for (const r of rows) {
      if (r.event_type === "page_visit") pageSessions.add(r.session_id)
      if (r.event_type === "quiz_complete") quizSessions.add(r.session_id)
      if (r.event_type === "email_given" && r.email) {
        emailSessionsSet.add(r.session_id)
        emailSet.add(r.email.toLowerCase())
      }
      if (r.event_type === "payment_complete" && r.email) {
        payEmailSet.add(r.email.toLowerCase())
      }
    }

    // Compter les sessions qui ont progressé dans le funnel
    // Sessions qui ont visité ET donné un email
    const sessionsWithEmail = new Set<string>()
    for (const sessionId of pageSessions) {
      const events = sessionEvents.get(sessionId)
      if (events?.has("email_given")) {
        sessionsWithEmail.add(sessionId)
      }
    }

    // Sessions qui ont donné un email ET complété le quiz
    const sessionsEmailToQuiz = new Set<string>()
    for (const sessionId of emailSessionsSet) {
      const events = sessionEvents.get(sessionId)
      if (events?.has("quiz_complete")) {
        sessionsEmailToQuiz.add(sessionId)
      }
    }

    // Sessions qui ont complété le quiz ET payé
    const sessionsQuizToPay = new Set<string>()
    for (const sessionId of quizSessions) {
      const events = sessionEvents.get(sessionId)
      if (events?.has("payment_complete")) {
        sessionsQuizToPay.add(sessionId)
      }
    }

    // Sessions qui ont visité ET payé (global)
    const sessionsVisitedToPaid = new Set<string>()
    for (const sessionId of pageSessions) {
      const events = sessionEvents.get(sessionId)
      if (events?.has("payment_complete")) {
        sessionsVisitedToPaid.add(sessionId)
      }
    }

    const visitors = pageSessions.size
    const emails = emailSet.size
    const quizzes = quizSessions.size
    const payments = payEmailSet.size

    const rate = (num: number, den: number) => (den > 0 ? Math.round((num / den) * 100) : 0)

    return {
      visitors,
      emails,
      quizzes,
      payments,
      // Taux basés sur les sessions pour un funnel cohérent
      convPageToEmail: rate(sessionsWithEmail.size, visitors),
      convEmailToQuiz: rate(sessionsEmailToQuiz.size, emailSessionsSet.size),
      convQuizToPay: rate(sessionsQuizToPay.size, quizzes),
      convGlobal: rate(sessionsVisitedToPaid.size, visitors),
    }
  }, [rows])

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
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Conversions (Temps réel)</h1>
            <p className="text-gray-400 mt-1">Funnel LifeClock — sessions et emails uniques</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/admin/referrals")}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 border border-white/10 text-sm text-white transition-colors"
            >
              Affiliés
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-white/10 text-sm text-gray-300 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            title="Visiteurs page" 
            value={metrics.visitors} 
            subtitle={`${metrics.convGlobal}% de conversion globale`}
          />
          <Card 
            title="Emails" 
            value={metrics.emails} 
            subtitle={`${metrics.convPageToEmail}% Page → Email`}
          />
          <Card 
            title="Quiz complétés" 
            value={metrics.quizzes} 
            subtitle={`${metrics.convEmailToQuiz}% Email → Quiz`}
          />
          <Card 
            title="Paiements" 
            value={metrics.payments} 
            subtitle={`${metrics.convQuizToPay}% Quiz → Paiement`}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Page → Email" value={metrics.convPageToEmail} suffix="%" />
          <Card title="Email → Quiz" value={metrics.convEmailToQuiz} suffix="%" />
          <Card title="Quiz → Paiement" value={metrics.convQuizToPay} suffix="%" />
          <Card title="Global" value={metrics.convGlobal} suffix="%" />
        </div>

        <div className="mt-10 rounded-xl border border-white/10 bg-black/40 p-5">
          <div className="text-sm text-gray-400">Derniers événements</div>
          <div className="mt-3 text-sm text-gray-300 space-y-1 max-h-64 overflow-auto">
            {rows.slice(-50).reverse().map((r, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-400">{new Date(r.created_at).toLocaleString()}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                  {r.event_type}
                </span>
                <span className="text-gray-400 truncate max-w-[30%]">{r.session_id}</span>
                <span className="text-gray-400 truncate max-w-[30%]">{r.email || "-"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


