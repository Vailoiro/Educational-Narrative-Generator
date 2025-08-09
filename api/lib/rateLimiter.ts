interface RateLimitConfig {
  requestsPerMinute: number;
  requestsPerHour: number;
  maxDailyRequests: number;
}

interface RateLimitStatus {
  count: number;
  remaining: number;
  resetTime: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  message?: string;
}

class BackendRateLimiter {
  private config: RateLimitConfig;
  private clientId: string;
  private storage: Map<string, any> = new Map();

  constructor(clientId: string = 'default') {
    this.config = {
      requestsPerMinute: 10,
      requestsPerHour: 60,
      maxDailyRequests: 2
    };
    this.clientId = clientId;
  }

  private getStorageKey(period: string): string {
    return `rateLimit_${this.clientId}_${period}`;
  }

  private getCurrentPeriodStart(period: 'minute' | 'hour' | 'day'): number {
    const now = new Date();
    
    switch (period) {
      case 'minute':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()).getTime();
      case 'hour':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()).getTime();
      case 'day':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      default:
        return now.getTime();
    }
  }

  private getNextPeriodStart(period: 'minute' | 'hour' | 'day'): number {
    const now = new Date();
    
    switch (period) {
      case 'minute':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1).getTime();
      case 'hour':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1).getTime();
      case 'day':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();
      default:
        return now.getTime() + 60000;
    }
  }

  private getLimit(period: 'minute' | 'hour' | 'day'): number {
    switch (period) {
      case 'minute':
        return this.config.requestsPerMinute;
      case 'hour':
        return this.config.requestsPerHour;
      case 'day':
        return this.config.maxDailyRequests;
      default:
        return 1;
    }
  }

  private getRateLimitData(period: 'minute' | 'hour' | 'day'): RateLimitStatus {
    const key = this.getStorageKey(period);
    const currentPeriodStart = this.getCurrentPeriodStart(period);
    const limit = this.getLimit(period);
    
    let data = this.storage.get(key);
    
    if (!data || data.periodStart !== currentPeriodStart) {
      data = {
        count: 0,
        periodStart: currentPeriodStart
      };
      this.storage.set(key, data);
    }
    
    return {
      count: data.count || 0,
      remaining: Math.max(0, limit - (data.count || 0)),
      resetTime: this.getNextPeriodStart(period)
    };
  }

  checkRateLimit(period: 'minute' | 'hour' | 'day' = 'day'): RateLimitResult {
    const status = this.getRateLimitData(period);
    const limit = this.getLimit(period);
    
    if (status.count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: status.resetTime,
        message: `Rate limit exceeded for ${period}. Try again later.`
      };
    }
    
    const key = this.getStorageKey(period);
    const data = this.storage.get(key);
    data.count = (data.count || 0) + 1;
    this.storage.set(key, data);
    
    return {
      allowed: true,
      remaining: Math.max(0, limit - data.count),
      resetTime: status.resetTime
    };
  }

  getRateLimitStatus(): {
    minute: RateLimitStatus;
    hour: RateLimitStatus;
    day: RateLimitStatus;
  } {
    return {
      minute: this.getRateLimitData('minute'),
      hour: this.getRateLimitData('hour'),
      day: this.getRateLimitData('day')
    };
  }

  reset(): void {
    this.storage.clear();
  }
}

export const backendRateLimiter = new BackendRateLimiter();
export { BackendRateLimiter };
export type { RateLimitConfig, RateLimitStatus, RateLimitResult };