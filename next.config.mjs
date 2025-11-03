import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // CSP adaptée pour Next.js 16, Stripe, Supabase, Sentry (via tunnel si activé) et assets
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self';",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com;",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
      "img-src 'self' data: blob: https://*.vercel-storage.com https://files.stripe.com https://q.stripe.com https://m.stripe.com;",
      "font-src 'self' https://fonts.gstatic.com;",
      "connect-src 'self' https://api.stripe.com https://r.stripe.com https://m.stripe.com https://*.supabase.co https://*.ingest.sentry.io https://vitals.vercel-insights.com;",
      "frame-src 'self' https://js.stripe.com https://checkout.stripe.com;",
      "frame-ancestors 'none';",
      "base-uri 'self';",
      "form-action 'self' https://checkout.stripe.com;",
    ].join(' '),
  },
]

const nextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Exclude @react-pdf/renderer from server components
  // It needs to run in Node.js environment, not in Edge runtime
  serverExternalPackages: ['@react-pdf/renderer'],
  // Turbopack config - empty to use defaults (Turbopack is default in Next.js 16)
  turbopack: {},
  // Configuration webpack pour exclure les modules Node.js du bundle client
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        'fs/promises': false,
        'node:fs/promises': false,
        'node:path': false,
      }
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Exception pour les routes PDF avec mode=view - permettre l'affichage en iframe
      {
        source: '/docs/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Permet l'affichage en iframe pour le même domaine
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self';", // Permet l'embedding depuis le même domaine
          },
        ],
      },
      {
        source: '/books/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Permet l'affichage en iframe pour le même domaine
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self';", // Permet l'embedding depuis le même domaine
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/favicon.png',
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
