import { NextResponse } from "next/server"
import { getTodayCompletedReportsCount } from "@/lib/supabase/stats"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const count = await getTodayCompletedReportsCount()
    return NextResponse.json({ count })
  } catch (error) {
    console.error("[Stats API] Error:", error)
    // En cas d'erreur, retourner la valeur par défaut
    return NextResponse.json({ count: 1589 }, { status: 200 })
  }
}

