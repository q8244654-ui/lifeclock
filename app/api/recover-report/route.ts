import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendReportRecoveryEmail } from "@/lib/emails"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Find report by email
    const { data: reportData, error } = await supabase
      .from("reports")
      .select("*")
      .eq("user_email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error || !reportData) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    // Get user name
    const { data: onboardingData } = await supabase
      .from("onboarding_data")
      .select("name")
      .eq("email", email)
      .single()

    const userName = onboardingData?.name || email.split("@")[0]
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const reportUrl = reportData.unique_link
      ? `${baseUrl}/report?link=${reportData.unique_link}`
      : `${baseUrl}/report`

    // Send recovery email
    try {
      await sendReportRecoveryEmail({
        email,
        userName,
        reportUrl,
      })
    } catch (emailError) {
      console.error("[Recover Report] Error sending email:", emailError)
      // Continue even if email fails
    }

    return NextResponse.json({ success: true, message: "Recovery email sent" })
  } catch (error) {
    console.error("[Recover Report] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

