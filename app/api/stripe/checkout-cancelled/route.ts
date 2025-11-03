import { NextResponse } from "next/server"
import { sendCheckoutCancelledEmail } from "@/lib/emails"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get user name
    const { data: onboardingData } = await supabase
      .from("onboarding_data")
      .select("name")
      .eq("email", email)
      .single()

    const userName = onboardingData?.name || email.split("@")[0]
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const resultUrl = `${baseUrl}/result`

    // Send cancellation email
    try {
      await sendCheckoutCancelledEmail({
        email,
        userName,
        resultUrl,
      })
    } catch (emailError) {
      console.error("[Checkout Cancelled] Error sending email:", emailError)
      // Continue even if email fails
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Checkout Cancelled] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

