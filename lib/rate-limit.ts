interface RateLimitEntry {
  count: number;
  resetAt: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  check(key: string, limit: number, windowMs: number): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || entry.resetAt <= now) {
      this.store.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
    }

    entry.count++;
    const allowed = entry.count <= limit;
    return { allowed, remaining: Math.max(0, limit - entry.count), resetAt: entry.resetAt };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (entry.resetAt <= now) this.store.delete(key);
    }
  }
}

// Singleton instances for different rate limit tiers
export const aiLimiter = new RateLimiter();    // AI generation
export const apiLimiter = new RateLimiter();   // General API
export const authLimiter = new RateLimiter();  // Auth attempts

// Helper to get client identifier (userId or IP)
export function getClientId(request: Request, userId?: number): string {
  if (userId) return `user:${userId}`;
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `ip:${ip}`;
}

// Rate limit configs
export const LIMITS = {
  AI_GENERATE: { limit: 10, window: 24 * 60 * 60 * 1000 },      // 10/day
  AI_TRANSCRIBE: { limit: 20, window: 24 * 60 * 60 * 1000 },    // 20/day
  AI_COPILOT: { limit: 50, window: 24 * 60 * 60 * 1000 },       // 50/day
  LEAD_SUBMIT: { limit: 30, window: 60 * 1000 },                  // 30/min
  AUTH_ATTEMPT: { limit: 10, window: 60 * 1000 },                 // 10/min
} as const;

// Helper to create rate limit response
export function rateLimitResponse(resetAt: number) {
  return new Response(
    JSON.stringify({ error: "Too many requests. Try again later.", resetAt }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
      },
    },
  );
}
