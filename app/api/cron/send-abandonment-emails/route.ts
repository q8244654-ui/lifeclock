import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendAbandonedCartEmail } from "@/lib/emails"
import { getTodayCompletedReportsCount } from "@/lib/supabase/stats"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Prevent abuse with API key check (optional but recommended)
const CRON_SECRET = process.env.CRON_SECRET

export async function POST(request: Request) {
  // Optional: Check for cron secret in headers
  const authHeader = request.headers.get("authorization")
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = await createClient()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const resultUrl = `${baseUrl}/result`

    // Find users with quiz_complete but no payment_complete in last 1-2 hours
    // Fast timing to capture users immediately after quiz completion
    const oneHourAgo = new Date()
    oneHourAgo.setHours(oneHourAgo.getHours() - 1)
    const twoHoursAgo = new Date()
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2)

    // Get all quiz_complete events from last 2 hours
    const { data: quizCompletions } = await supabase
      .from("conversions")
      .select("email, session_id, created_at")
      .eq("event_type", "quiz_complete")
      .gte("created_at", twoHoursAgo.toISOString())
      .lte("created_at", oneHourAgo.toISOString())
      .not("email", "is", null)

    if (!quizCompletions || quizCompletions.length === 0) {
      return NextResponse.json({ success: true, sent: 0, message: "No users to email" })
    }

    // Check which ones don't have payment_complete
    const emailsToContact: string[] = []
    for (const quizCompletion of quizCompletions) {
      if (!quizCompletion.email) continue

      const { data: paymentCompletions } = await supabase
        .from("conversions")
        .select("email")
        .eq("event_type", "payment_complete")
        .eq("email", quizCompletion.email)
        .gte("created_at", quizCompletion.created_at)

      if (!paymentCompletions || paymentCompletions.length === 0) {
        emailsToContact.push(quizCompletion.email)
      }
    }

    // Remove duplicates
    const uniqueEmails = Array.from(new Set(emailsToContact))

    // Get today's count for social proof (once for all emails)
    const todayCount = await getTodayCompletedReportsCount()

    // Send emails (with rate limiting consideration)
    let sentCount = 0
    for (const email of uniqueEmails) {
      try {
        // Get user name
        const { data: onboardingData } = await supabase
          .from("onboarding_data")
          .select("name")
          .eq("email", email)
          .single()

        const userName = onboardingData?.name || email.split("@")[0]

        await sendAbandonedCartEmail({
          email,
          userName,
          resultUrl,
          todayCount,
        })
        sentCount++

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`[Abandonment Emails] Error sending to ${email}:`, error)
        // Continue with next email
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      total: uniqueEmails.length,
    })
  } catch (error) {
    console.error("[Abandonment Emails] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Vercel Cron déclenche des requêtes GET par défaut
export async function GET(request: Request) {
  return POST(request)
}

