import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createHash } from "crypto"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Identifiant et mot de passe requis" }, { status: 400 })
    }

    // Utiliser service role key pour bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Récupérer l'utilisateur admin depuis Supabase
    const { data: adminUser, error } = await supabase
      .from("admin_users")
      .select("username, password_hash")
      .eq("username", username)
      .single()

    if (error || !adminUser) {
      return NextResponse.json({ error: "Identifiant ou mot de passe incorrect" }, { status: 401 })
    }

    // Hasher le mot de passe fourni pour comparaison
    // Note: En production, utilisez bcrypt ou argon2. Ici on utilise SHA-256 comme exemple simple
    const passwordHash = createHash("sha256").update(password).digest("hex")

    // Comparer les hashs
    if (passwordHash !== adminUser.password_hash) {
      return NextResponse.json({ error: "Identifiant ou mot de passe incorrect" }, { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

