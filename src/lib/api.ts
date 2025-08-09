import { GoogleGenerativeAI } from '@google/generative-ai';
import { GenerateRequest, GenerateResponse } from '../types';
import { MASTER_PROMPT, API_CONFIG, ERROR_MESSAGES } from './constants';
import { security, sanitizeApiResponse } from './security';
import { getGeminiApiKey } from './supabase';
import { rateLimiter } from './rateLimiter';
import { auditLogger } from './auditLogger';



export class NarrativeGenerator {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor(apiKey?: string) {
    if (apiKey && security.validateApiKey(apiKey)) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: API_CONFIG.MODEL });
    }
  }

  async generateNarrative(request: GenerateRequest): Promise<GenerateResponse> {
    try {
      auditLogger.log('generation_attempt', { 
        topic: request.topic,
        hasCustomKey: !!request.apiKey 
      });

      const rateLimitCheck = rateLimiter.checkRateLimit('minute');
      if (!rateLimitCheck.allowed) {
        auditLogger.log('rate_limit_exceeded', {
          rateLimitInfo: rateLimitCheck
        });
        return {
          success: false,
          content: '',
          error: rateLimitCheck.message || 'Rate limit exceeded. Please try again later.',
        };
      }

      const sanitizedTopic = security.sanitizeInput(request.topic);
      
      if (!sanitizedTopic || sanitizedTopic.length < 3) {
        return {
          success: false,
          content: '',
          error: ERROR_MESSAGES.TOPIC_TOO_SHORT,
        };
      }

      if (!this.model && request.apiKey) {
        if (!security.validateApiKey(request.apiKey)) {
          return {
            success: false,
            content: '',
            error: ERROR_MESSAGES.INVALID_API_KEY,
          };
        }
        
        this.genAI = new GoogleGenerativeAI(request.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: API_CONFIG.MODEL });
      }

      if (!this.model) {
        const systemApiKey = await getGeminiApiKey();
        if (systemApiKey && security.validateApiKey(systemApiKey)) {
          this.genAI = new GoogleGenerativeAI(systemApiKey);
          this.model = this.genAI.getGenerativeModel({ model: API_CONFIG.MODEL });
        } else {
          return {
            success: false,
            content: '',
            error: 'Configure sua chave de API para usar o gerador.',
          };
        }
      }

      const prompt = MASTER_PROMPT.replace('{TOPIC}', sanitizedTopic);
      
      const result = await this.model.generateContent({
        contents: [{
          role: 'user',
          parts: [{ text: prompt }],
        }],
        generationConfig: {
          temperature: API_CONFIG.TEMPERATURE,
          maxOutputTokens: API_CONFIG.MAX_TOKENS,
          topP: API_CONFIG.TOP_P,
        },
      });

      const response = await result.response;
      const content = response.text();
      
      if (!content) {
        return {
          success: false,
          content: '',
          error: ERROR_MESSAGES.GENERATION_ERROR,
        };
      }

      auditLogger.log('generation_success', {
        topic: sanitizedTopic,
        hasCustomKey: !!request.apiKey
      });

      return {
        success: true,
        content: sanitizeApiResponse(content),
      };
    } catch (error) {
      console.error('Generation error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      auditLogger.log('generation_failure', {
        topic: request.topic,
        error: errorMessage,
        hasCustomKey: !!request.apiKey
      });
      
      if (error instanceof Error) {
        if (error.message.includes('API_KEY')) {
          return {
            success: false,
            content: '',
            error: ERROR_MESSAGES.INVALID_API_KEY,
          };
        }
        
        if (error.message.includes('quota') || error.message.includes('limit')) {
          return {
            success: false,
            content: '',
            error: ERROR_MESSAGES.RATE_LIMIT,
          };
        }
      }
      
      return {
        success: false,
        content: '',
        error: ERROR_MESSAGES.NETWORK_ERROR,
      };
    }
  }



  updateApiKey(apiKey: string): boolean {
    if (!security.validateApiKey(apiKey)) {
      return false;
    }
    
    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: API_CONFIG.MODEL });
      return true;
    } catch {
      return false;
    }
  }
}