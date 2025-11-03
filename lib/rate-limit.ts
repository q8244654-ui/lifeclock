// Simple in-memory rate limiter using token bucket algorithm
// For production, use Redis-based rate limiting (e.g., upstash/ratelimit)

interface RateLimitStore {
  [key: string]: {
    tokens: number
    lastRefill: number
  }
}

const store: RateLimitStore = {}

interface RateLimitOptions {
  maxTokens: number
  refillRate: number // tokens per second
  windowMs: number
}

const defaultOptions: RateLimitOptions = {
  maxTokens: 10,
  refillRate: 1, // 1 token per second
  windowMs: 60000, // 1 minute window
}

export function rateLimit(
  identifier: string,
  options: Partial<RateLimitOptions> = {}
): { allowed: boolean; remaining: number; resetAt: number } {
  const opts = { ...defaultOptions, ...options }
  const now = Date.now()
  const key = identifier

  if (!store[key]) {
    store[key] = {
      tokens: opts.maxTokens,
      lastRefill: now,
    }
  }

  const entry = store[key]
  const elapsed = (now - entry.lastRefill) / 1000 // seconds
  const tokensToAdd = Math.floor(elapsed * opts.refillRate)
  
  entry.tokens = Math.min(opts.maxTokens, entry.tokens + tokensToAdd)
  entry.lastRefill = now

  if (entry.tokens >= 1) {
    entry.tokens -= 1
    const resetAt = now + Math.ceil((1 / opts.refillRate) * 1000)
    return {
      allowed: true,
      remaining: entry.tokens,
      resetAt,
    }
  }

  const resetAt = now + Math.ceil(((1 - entry.tokens) / opts.refillRate) * 1000)
  return {
    allowed: false,
    remaining: 0,
    resetAt,
  }
}

// Cleanup old entries periodically (simple cleanup)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    const maxAge = 3600000 // 1 hour
    Object.keys(store).forEach((key) => {
      if (now - store[key].lastRefill > maxAge) {
        delete store[key]
      }
    })
  }, 60000) // Clean every minute
}

