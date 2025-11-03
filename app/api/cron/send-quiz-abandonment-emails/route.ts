import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendQuizAbandonmentEmail } from "@/lib/emails"
import { getTodayCompletedReportsCount } from "@/lib/supabase/stats"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const CRON_SECRET = process.env.CRON_SECRET

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = await createClient()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const quizUrl = `${baseUrl}/quiz`

    // Find users with email_given but no quiz_complete in last 30min-1h
    // Ultra-fast timing to catch users while engagement is highest
    const thirtyMinutesAgo = new Date()
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30)
    const oneHourAgo = new Date()
    oneHourAgo.setHours(oneHourAgo.getHours() - 1)

    // Get all email_given events from last 1 hour
    const { data: emailGivenEvents } = await supabase
      .from("conversions")
      .select("email, session_id, created_at")
      .eq("event_type", "email_given")
      .gte("created_at", oneHourAgo.toISOString())
      .lte("created_at", thirtyMinutesAgo.toISOString())
      .not("email", "is", null)

    if (!emailGivenEvents || emailGivenEvents.length === 0) {
      return NextResponse.json({ success: true, sent: 0, message: "No users to email" })
    }

    // Check which ones don't have quiz_complete
    const emailsToContact: string[] = []
    for (const emailEvent of emailGivenEvents) {
      if (!emailEvent.email) continue

      const { data: quizCompletions } = await supabase
        .from("conversions")
        .select("email")
        .eq("event_type", "quiz_complete")
        .eq("email", emailEvent.email)
        .gte("created_at", emailEvent.created_at)

      if (!quizCompletions || quizCompletions.length === 0) {
        emailsToContact.push(emailEvent.email)
      }
    }

    // Remove duplicates
    const uniqueEmails = Array.from(new Set(emailsToContact))

    // Get today's count for social proof (once for all emails)
    const todayCount = await getTodayCompletedReportsCount()

    // Send emails
    let sentCount = 0
    for (const email of uniqueEmails) {
      try {
        const { data: onboardingData } = await supabase
          .from("onboarding_data")
          .select("name")
          .eq("email", email)
          .single()

        const userName = onboardingData?.name || email.split("@")[0]

        await sendQuizAbandonmentEmail({
          email,
          userName,
          quizUrl,
          todayCount,
        })
        sentCount++

        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`[Quiz Abandonment Emails] Error sending to ${email}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      total: uniqueEmails.length,
    })
  } catch (error) {
    console.error("[Quiz Abandonment Emails] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Vercel Cron déclenche des requêtes GET par défaut
export async function GET(request: Request) {
  return POST(request)
}

