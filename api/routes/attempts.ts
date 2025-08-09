import express, { type Request, type Response } from 'express';
import { backendRateLimiter } from '../lib/rateLimiter';

const router = express.Router();

interface AttemptStatus {
  remaining: number;
  total: number;
  resetTime: number;
  hasCustomKey: boolean;
}

function getClientIP(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0]) : req.connection.remoteAddress;
  return ip || 'unknown';
}

router.get('/status', (req: Request, res: Response): void => {
  try {
    const clientIP = getClientIP(req);
    const hasCustomKey = req.headers['x-has-custom-key'] === 'true';
    
    if (hasCustomKey) {
      res.json({
        success: true,
        data: {
          remaining: -1,
          total: -1,
          resetTime: 0,
          hasCustomKey: true
        } as AttemptStatus
      });
      return;
    }

    const rateLimitStatus = backendRateLimiter.getRateLimitStatus();
    const dayStatus = rateLimitStatus.day;
    
    res.json({
      success: true,
      data: {
        remaining: dayStatus.remaining,
        total: dayStatus.count + dayStatus.remaining,
        resetTime: dayStatus.resetTime,
        hasCustomKey: false
      } as AttemptStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get attempt status'
    });
  }
});

router.post('/check', (req: Request, res: Response): void => {
  try {
    const clientIP = getClientIP(req);
    const hasCustomKey = req.headers['x-has-custom-key'] === 'true';
    
    if (hasCustomKey) {
      res.json({
        success: true,
        allowed: true,
        remaining: -1
      });
      return;
    }

    const rateLimitCheck = backendRateLimiter.checkRateLimit('day');
    
    res.json({
      success: true,
      allowed: rateLimitCheck.allowed,
      remaining: rateLimitCheck.remaining,
      resetTime: rateLimitCheck.resetTime,
      message: rateLimitCheck.message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to check rate limit'
    });
  }
});

export default router;