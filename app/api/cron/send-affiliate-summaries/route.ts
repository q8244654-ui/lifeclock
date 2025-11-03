import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendAffiliateSummaryEmail } from "@/lib/emails"

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

    // Get all unique referrer emails who have referrals
    const { data: referrals } = await supabase
      .from("referrals")
      .select("referrer_email")
      .not("referred_email", "is", null)

    if (!referrals || referrals.length === 0) {
      return NextResponse.json({ success: true, sent: 0, message: "No affiliates to email" })
    }

    const uniqueReferrers = Array.from(new Set(referrals.map((r) => r.referrer_email)))

    // Calculate period (last month)
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const periodName = lastMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })

    // Send summary to each affiliate
    let sentCount = 0
    for (const referrerEmail of uniqueReferrers) {
      try {
        // Get all referrals for this affiliate
        const { data: affiliateReferrals } = await supabase
          .from("referrals")
          .select("*")
          .eq("referrer_email", referrerEmail)
          .not("referred_email", "is", null)
          .gte("created_at", lastMonth.toISOString())
          .lt("created_at", currentMonth.toISOString())

        if (!affiliateReferrals || affiliateReferrals.length === 0) {
          continue // Skip if no referrals in this period
        }

        // Calculate stats
        const stats = {
          totalReferrals: affiliateReferrals.length,
          pendingCount: affiliateReferrals.filter((r) => r.status === "pending").length,
          completedCount: affiliateReferrals.filter((r) => r.status === "completed").length,
          paidCount: affiliateReferrals.filter((r) => r.status === "paid").length,
          revenueGenerated: 0,
          amountToPay: 0,
          amountPaid: 0,
        }

        const PRICE_PER_SALE = 47
        stats.revenueGenerated = PRICE_PER_SALE * (stats.completedCount + stats.paidCount)

        affiliateReferrals.forEach((referral) => {
          const commission = Number(referral.commission_amount) || 0
          if (referral.status === "completed") {
            stats.amountToPay += commission
          } else if (referral.status === "paid") {
            stats.amountPaid += commission
          }
        })

        // Get user name
        const { data: onboardingData } = await supabase
          .from("onboarding_data")
          .select("name")
          .eq("email", referrerEmail)
          .single()

        const userName = onboardingData?.name || referrerEmail.split("@")[0]

        await sendAffiliateSummaryEmail({
          email: referrerEmail,
          userName,
          period: periodName,
          stats,
        })
        sentCount++

        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`[Affiliate Summaries] Error sending to ${referrerEmail}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      total: uniqueReferrers.length,
    })
  } catch (error) {
    console.error("[Affiliate Summaries] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Vercel Cron déclenche des requêtes GET par défaut
export async function GET(request: Request) {
  return POST(request)
}

