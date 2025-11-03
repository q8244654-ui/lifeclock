import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://lifeclock.quest"
  const now = new Date().toISOString()

  const pages = [
    "",
    "/quiz",
    "/result",
    "/report",
    "/books",
  ]

  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }))
}


