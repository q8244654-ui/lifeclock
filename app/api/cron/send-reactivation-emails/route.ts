import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendReactivationEmail } from "@/lib/emails"
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
    const resultUrl = `${baseUrl}/result`

    // Find users with quiz_complete but no payment_complete after 2-3 days
    // Faster reactivation to re-engage users before they forget
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    // Get all quiz_complete events from 2-3 days ago
    const { data: quizCompletions } = await supabase
      .from("conversions")
      .select("email, session_id, created_at")
      .eq("event_type", "quiz_complete")
      .gte("created_at", threeDaysAgo.toISOString())
      .lte("created_at", twoDaysAgo.toISOString())
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

    // Send emails with discount offer
    let sentCount = 0
    for (const email of uniqueEmails) {
      try {
        const { data: onboardingData } = await supabase
          .from("onboarding_data")
          .select("name")
          .eq("email", email)
          .single()

        const userName = onboardingData?.name || email.split("@")[0]

        await sendReactivationEmail({
          email,
          userName,
          resultUrl,
          discountPercent: 20, // 20% off offer
          todayCount,
        })
        sentCount++

        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`[Reactivation Emails] Error sending to ${email}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      total: uniqueEmails.length,
    })
  } catch (error) {
    console.error("[Reactivation Emails] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Vercel Cron déclenche des requêtes GET par défaut
export async function GET(request: Request) {
  return POST(request)
}

