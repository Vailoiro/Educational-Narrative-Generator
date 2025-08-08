import { SecurityUtils } from '../types';

export const security: SecurityUtils = {
  sanitizeInput: (input: string): string => {
    return input
      .trim()
      .replace(/[<>"'&]/g, '')
      .replace(/\s+/g, ' ')
      .substring(0, 200);
  },

  validateApiKey: (key: string): boolean => {
    if (!key || typeof key !== 'string') return false;
    
    const cleanKey = key.trim();
    if (cleanKey.length < 20) return false;
    
    const apiKeyPattern = /^[A-Za-z0-9_-]+$/;
    return apiKeyPattern.test(cleanKey);
  },

  encryptStorage: (data: string): string => {
    try {
      return btoa(encodeURIComponent(data));
    } catch {
      return data;
    }
  },

  decryptStorage: (data: string): string => {
    try {
      return decodeURIComponent(atob(data));
    } catch {
      return data;
    }
  },
};

export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

export const validateTopic = (topic: string): { isValid: boolean; error?: string } => {
  const sanitized = security.sanitizeInput(topic);
  
  if (sanitized.length < 3) {
    return { isValid: false, error: 'O tema deve ter pelo menos 3 caracteres.' };
  }
  
  if (sanitized.length > 200) {
    return { isValid: false, error: 'O tema deve ter no máximo 200 caracteres.' };
  }
  
  const forbiddenPatterns = [
    /\b(hack|exploit|malware|virus)\b/i,
    /\b(password|token|secret|key)\b/i,
    /[<>{}\[\]]/,
  ];
  
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, error: 'Tema contém conteúdo não permitido.' };
    }
  }
  
  return { isValid: true };
};

export const rateLimitCheck = (dailyUsage: number, hasCustomKey: boolean): boolean => {
  if (hasCustomKey) return true;
  return dailyUsage < 5;
};

export const sanitizeApiResponse = (response: string): string => {
  return response
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .trim();
};