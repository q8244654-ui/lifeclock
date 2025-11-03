import { createClient } from "@/lib/supabase/client"

type EventType = "page_visit" | "email_given" | "quiz_complete" | "payment_complete"

const SESSION_KEY = "lifeclock-session-id"
const TRACKED_PREFIX = "lifeclock-tracked-"
const EMAIL_TRACKED_PREFIX = "lifeclock-email-tracked-"

export function getSessionId(): string {
  if (typeof window === "undefined") return ""
  try {
    const existing = localStorage.getItem(SESSION_KEY)
    if (existing) return existing
    const id = (typeof crypto !== "undefined" && (crypto as any).randomUUID)
      ? (crypto as any).randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2)}`
    localStorage.setItem(SESSION_KEY, id)
    return id
  } catch {
    return ""
  }
}

export function hasTrackedEvent(eventType: Extract<EventType, "page_visit" | "quiz_complete">): boolean {
  if (typeof window === "undefined") return false
  try {
    const key = `${TRACKED_PREFIX}${eventType}`
    return localStorage.getItem(key) === "1"
  } catch {
    return false
  }
}

function markTracked(eventType: Extract<EventType, "page_visit" | "quiz_complete">) {
  if (typeof window === "undefined") return
  try {
    const key = `${TRACKED_PREFIX}${eventType}`
    localStorage.setItem(key, "1")
  } catch {}
}

function hasTrackedEmail(eventType: Extract<EventType, "email_given" | "payment_complete">, email?: string | null): boolean {
  if (typeof window === "undefined" || !email) return false
  try {
    const key = `${EMAIL_TRACKED_PREFIX}${eventType}:${email.toLowerCase()}`
    return localStorage.getItem(key) === "1"
  } catch {
    return false
  }
}

function markEmailTracked(eventType: Extract<EventType, "email_given" | "payment_complete">, email?: string | null) {
  if (typeof window === "undefined" || !email) return
  try {
    const key = `${EMAIL_TRACKED_PREFIX}${eventType}:${email.toLowerCase()}`
    localStorage.setItem(key, "1")
  } catch {}
}

export async function trackEvent(eventType: EventType, email?: string | null) {
  try {
    const sessionId = getSessionId()
    if (!sessionId) return

    // Client-side dedupe guards
    if ((eventType === "page_visit" || eventType === "quiz_complete") && hasTrackedEvent(eventType)) {
      return
    }
    if ((eventType === "email_given" || eventType === "payment_complete") && hasTrackedEmail(eventType, email)) {
      return
    }

    const supabase = createClient()
    const { error } = await supabase.from("conversions").insert({
      event_type: eventType,
      email: email || null,
      session_id: sessionId,
    })

    if (error) {
      // Do not break UX; silent failure
      return
    }

    // Mark as tracked locally on success
    if (eventType === "page_visit" || eventType === "quiz_complete") {
      markTracked(eventType)
    }
    if (eventType === "email_given" || eventType === "payment_complete") {
      markEmailTracked(eventType, email)
    }
  } catch {
    // Silent error handling - tracking failures should not affect UX
  }
}

export const tracking = {
  pageVisit: async () => {
    await trackEvent("page_visit")
  },
  emailGiven: async (email: string) => {
    await trackEvent("email_given", email)
  },
  quizComplete: async (email?: string | null) => {
    // If email available in localStorage, include it to improve attribution
    let userEmail: string | null | undefined = email || null
    try {
      if (!userEmail && typeof window !== "undefined") {
        const onboarding = localStorage.getItem("lifeclockOnboarding")
        if (onboarding) {
          const parsed = JSON.parse(onboarding)
          userEmail = parsed?.email || null
        }
      }
    } catch {}
    await trackEvent("quiz_complete", userEmail || null)
  },
  paymentComplete: async (email: string) => {
    await trackEvent("payment_complete", email)
  },
}


