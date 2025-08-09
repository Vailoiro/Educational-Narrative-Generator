interface RateLimitEntry {
  count: number
  resetTime: number
  lastRequest: number
}

interface RateLimitConfig {
  requestsPerMinute: number
  requestsPerHour: number
  maxDailyRequests: number
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map()
  private config: RateLimitConfig

  constructor() {
    this.config = {
      requestsPerMinute: parseInt(import.meta.env.VITE_RATE_LIMIT_REQUESTS_PER_MINUTE) || 10,
      requestsPerHour: parseInt(import.meta.env.VITE_RATE_LIMIT_REQUESTS_PER_HOUR) || 50,
      maxDailyRequests: parseInt(import.meta.env.VITE_MAX_DAILY_REQUESTS) || 100
    }
  }

  private getClientId(): string {
    let clientId = localStorage.getItem('client_id')
    if (!clientId) {
      clientId = crypto.randomUUID()
      localStorage.setItem('client_id', clientId)
    }
    return clientId
  }

  private cleanupExpiredEntries(): void {
    const now = Date.now()
    for (const [key, entry] of this.storage.entries()) {
      if (now > entry.resetTime) {
        this.storage.delete(key)
      }
    }
  }

  checkRateLimit(timeWindow: 'minute' | 'hour' | 'day' = 'minute'): {
    allowed: boolean
    remaining: number
    resetTime: number
    message?: string
  } {
    const clientId = this.getClientId()
    const now = Date.now()
    
    this.cleanupExpiredEntries()

    let windowMs: number
    let maxRequests: number
    
    switch (timeWindow) {
      case 'minute':
        windowMs = 60 * 1000
        maxRequests = this.config.requestsPerMinute
        break
      case 'hour':
        windowMs = 60 * 60 * 1000
        maxRequests = this.config.requestsPerHour
        break
      case 'day':
        windowMs = 24 * 60 * 60 * 1000
        maxRequests = this.config.maxDailyRequests
        break
    }

    const key = `${clientId}_${timeWindow}`
    const entry = this.storage.get(key)
    
    if (!entry || now > entry.resetTime) {
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + windowMs,
        lastRequest: now
      }
      this.storage.set(key, newEntry)
      
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime: newEntry.resetTime
      }
    }

    if (entry.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        message: `Rate limit exceeded. Try again in ${Math.ceil((entry.resetTime - now) / 1000)} seconds.`
      }
    }

    entry.count++
    entry.lastRequest = now
    this.storage.set(key, entry)

    return {
      allowed: true,
      remaining: maxRequests - entry.count,
      resetTime: entry.resetTime
    }
  }

  getRateLimitStatus(): {
    minute: { count: number; remaining: number; resetTime: number }
    hour: { count: number; remaining: number; resetTime: number }
    day: { count: number; remaining: number; resetTime: number }
  } {
    const clientId = this.getClientId()
    const now = Date.now()
    
    const getStatus = (timeWindow: 'minute' | 'hour' | 'day') => {
      const key = `${clientId}_${timeWindow}`
      const entry = this.storage.get(key)
      
      let maxRequests: number
      switch (timeWindow) {
        case 'minute':
          maxRequests = this.config.requestsPerMinute
          break
        case 'hour':
          maxRequests = this.config.requestsPerHour
          break
        case 'day':
          maxRequests = this.config.maxDailyRequests
          break
      }
      
      if (!entry || now > entry.resetTime) {
        return {
          count: 0,
          remaining: maxRequests,
          resetTime: 0
        }
      }
      
      return {
        count: entry.count,
        remaining: Math.max(0, maxRequests - entry.count),
        resetTime: entry.resetTime
      }
    }

    return {
      minute: getStatus('minute'),
      hour: getStatus('hour'),
      day: getStatus('day')
    }
  }
}

export const rateLimiter = new RateLimiter()
export type { RateLimitConfig }