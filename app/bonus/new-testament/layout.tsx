import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import crypto from "crypto"

function verifySignature(value: string, sig: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(value).digest("hex")
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieSecret = process.env.PAY_COOKIE_SECRET
  if (!cookieSecret) {
    redirect("/result")
  }

  const cookieStore = await cookies()
  const email = cookieStore.get("lc_paid_email")?.value || ""
  const sig = cookieStore.get("lc_paid_sig")?.value || ""

  if (!email || !sig || !verifySignature(email, sig, cookieSecret!)) {
    redirect("/result")
  }

  return <>{children}</>
}


