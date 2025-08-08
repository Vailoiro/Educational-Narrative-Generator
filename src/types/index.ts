export type AppView = 'generator' | 'history' | 'about';

export interface UserSession {
  sessionId: string;
  apiKey?: string;
  hasCustomKey: boolean;
  generationCount: number;
  lastUsed: Date;
}

export interface GenerationHistory {
  id: string;
  sessionId: string;
  topic: string;
  generatedContent: string;
  createdAt: Date;
  tokensUsed?: number;
  isDemo?: boolean;
}

export interface ApiUsage {
  dailyCount: number;
  limitReached: boolean;
}

export interface AppState {
  currentView: 'generator' | 'history' | 'about';
  isGenerating: boolean;
  currentArticle?: string;
  currentTopic?: string;
  error?: string;
  isConfigModalOpen: boolean;
}

export interface ApiState {
  apiKey?: string;
  hasReachedLimit: boolean;
}

export interface StoredData {
  apiKey?: string;
  sessionId: string;
  generationHistory: GenerationHistory[];
  usage: ApiUsage;
  preferences: {
    theme: 'light' | 'dark';
    language: 'pt' | 'en';
  };
}

export interface PromptConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  topP: number;
}

export interface GenerateRequest {
  topic: string;
  apiKey?: string;
}

export interface GenerateResponse {
  content: string;
  success: boolean;
  error?: string;
}

export interface SecurityUtils {
  sanitizeInput: (input: string) => string;
  validateApiKey: (key: string) => boolean;
  encryptStorage: (data: string) => string;
  decryptStorage: (data: string) => string;
}