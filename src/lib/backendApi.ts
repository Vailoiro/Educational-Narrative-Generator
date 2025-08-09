interface AttemptStatus {
  remaining: number;
  total: number;
  resetTime: number;
  hasCustomKey: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class BackendApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';
  }

  async checkAttemptStatus(hasCustomKey: boolean = false): Promise<AttemptStatus | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/attempts/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-has-custom-key': hasCustomKey.toString()
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<AttemptStatus> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      return null;
    } catch (error) {
      console.warn('Failed to check attempt status:', error);
      return null;
    }
  }

  async checkRateLimit(hasCustomKey: boolean = false): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime?: number;
    message?: string;
  } | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/attempts/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-has-custom-key': hasCustomKey.toString()
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        return {
          allowed: result.allowed,
          remaining: result.remaining,
          resetTime: result.resetTime,
          message: result.message
        };
      }
      
      return null;
    } catch (error) {
      console.warn('Failed to check rate limit:', error);
      return null;
    }
  }
}

export const backendApi = new BackendApi();
export type { AttemptStatus };