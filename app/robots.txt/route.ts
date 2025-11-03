export const dynamic = "force-static"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lifeclock.quest"
  const body = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    "",
  ].join("\n")

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  })
}


