import { create } from 'zustand';
import { AppState, ApiState, GenerationHistory, ApiUsage } from '../types';
import { STORAGE_KEYS, LIMITS } from './constants';
import { generateSessionId, security } from './security';
import { NarrativeGenerator } from './api';

const FREE_TRIAL_API_KEY = 'AIzaSyCNbYGEOZEI2LOCDfAxpsu_v_h0-NR7hOU';
const MAX_FREE_ATTEMPTS = 2;

interface AppStore extends AppState {
  setCurrentView: (view: 'generator' | 'history' | 'about') => void;
  setGenerating: (isGenerating: boolean) => void;
  setArticle: (article: string | null, topic?: string) => void;
  setError: (error: string | undefined) => void;
  clearError: () => void;
  setConfigModalOpen: (isOpen: boolean) => void;
}

interface ApiStore extends ApiState {
  generator: NarrativeGenerator;
  sessionId: string;
  history: GenerationHistory[];
  usage: ApiUsage;
  hasCustomKey: boolean;
  freeAttemptsUsed: number;
  freeAttemptsRemaining: number;
  isTrialMode: boolean;
  setApiKey: (apiKey: string) => boolean;
  removeApiKey: () => void;
  incrementUsage: () => void;
  incrementFreeAttempts: () => void;
  resetFreeAttempts: () => void;
  addToHistory: (item: GenerationHistory) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  generateNarrative: (topic: string) => Promise<{ success: boolean; content?: string; error?: string; isDemo?: boolean; needsApiKey?: boolean }>;
}

export const useAppStore = create<AppStore>((set, get) => ({
  currentView: 'generator',
  isGenerating: false,
  currentArticle: undefined,
  currentTopic: undefined,
  error: undefined,
  isConfigModalOpen: false,

  setCurrentView: (view) => set({ currentView: view }),
  
  setGenerating: (isGenerating) => set({ isGenerating }),
  
  setArticle: (article, topic) => set({ 
    currentArticle: article, 
    currentTopic: topic,
    error: undefined 
  }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: undefined }),
  
  setConfigModalOpen: (isOpen) => set({ isConfigModalOpen: isOpen }),
}));

export const useApiStore = create<ApiStore>((set, get) => {
  const getStoredApiKey = (): string | undefined => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.API_KEY);
      return stored ? security.decryptStorage(stored) : undefined;
    } catch {
      return undefined;
    }
  };

  const getStoredSessionId = (): string => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
      return stored || generateSessionId();
    } catch {
      return generateSessionId();
    }
  };

  const getStoredHistory = (): GenerationHistory[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GENERATION_HISTORY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
    } catch {
      return [];
    }
  };

  const getStoredUsage = (): ApiUsage => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USAGE);
      
      if (stored) {
        const usage = JSON.parse(stored);
        return {
          dailyCount: usage.totalCount || 0,
          limitReached: false
        };
      }
      
      return {
        dailyCount: 0,
        limitReached: false
      };
    } catch {
      return {
        dailyCount: 0,
        limitReached: false
      };
    }
  };

  const getStoredFreeAttempts = (): number => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (stored) {
        const prefs = JSON.parse(stored);
        return prefs.freeAttemptsUsed || 0;
      }
      return 0;
    } catch {
      return 0;
    }
  };

  const initialApiKey = getStoredApiKey();
  const initialSessionId = getStoredSessionId();
  const initialHistory = getStoredHistory();
  const initialUsage = getStoredUsage();
  const initialFreeAttempts = getStoredFreeAttempts();
  const initialFreeAttemptsRemaining = Math.max(0, MAX_FREE_ATTEMPTS - initialFreeAttempts);
  const initialIsTrialMode = !initialApiKey;
  const initialHasCustomKey = !!initialApiKey;

  return {
    apiKey: initialApiKey,
    hasReachedLimit: false,
    generator: new NarrativeGenerator(initialApiKey || FREE_TRIAL_API_KEY),
    sessionId: initialSessionId,
    history: initialHistory,
    usage: initialUsage,
    hasCustomKey: initialHasCustomKey,
    freeAttemptsUsed: initialFreeAttempts,
    freeAttemptsRemaining: initialFreeAttemptsRemaining,
    isTrialMode: initialIsTrialMode,

    setApiKey: (apiKey: string) => {
      if (!security.validateApiKey(apiKey)) {
        return false;
      }

      try {
        const encryptedKey = security.encryptStorage(apiKey);
        localStorage.setItem(STORAGE_KEYS.API_KEY, encryptedKey);
        
        const generator = new NarrativeGenerator(apiKey);
        
        set({ 
          apiKey, 
          generator,
          hasReachedLimit: false,
          hasCustomKey: true,
          isTrialMode: false
        });
        
        return true;
      } catch {
        return false;
      }
    },

    removeApiKey: () => {
      try {
        localStorage.removeItem(STORAGE_KEYS.API_KEY);
        set({ 
          apiKey: undefined, 
          generator: new NarrativeGenerator(FREE_TRIAL_API_KEY),
          hasReachedLimit: false,
          hasCustomKey: false,
          isTrialMode: true
        });
      } catch (error) {
        console.warn('Error removing API key:', error);
      }
    },



    incrementUsage: () => {
      const state = get();
      const newCount = (state.usage?.dailyCount || 0) + 1;
      
      const newUsage = {
        dailyCount: newCount,
        limitReached: false
      };
      
      try {
        localStorage.setItem(STORAGE_KEYS.USAGE, JSON.stringify(newUsage));
      } catch (error) {
        console.warn('Error saving usage:', error);
      }
      
      set({ 
        usage: newUsage,
        hasReachedLimit: false
      });
    },

    incrementFreeAttempts: () => {
      const state = get();
      const newFreeAttemptsUsed = state.freeAttemptsUsed + 1;
      const newFreeAttemptsRemaining = Math.max(0, MAX_FREE_ATTEMPTS - newFreeAttemptsUsed);
      
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
        const prefs = stored ? JSON.parse(stored) : {};
        prefs.freeAttemptsUsed = newFreeAttemptsUsed;
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
      } catch (error) {
        console.warn('Error saving free attempts data:', error);
      }
      
      set({ 
        freeAttemptsUsed: newFreeAttemptsUsed,
        freeAttemptsRemaining: newFreeAttemptsRemaining,
        isTrialMode: !state.hasCustomKey && newFreeAttemptsUsed < MAX_FREE_ATTEMPTS
      });
    },

    resetFreeAttempts: () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
        const prefs = stored ? JSON.parse(stored) : {};
        prefs.freeAttemptsUsed = 0;
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
      } catch (error) {
        console.warn('Error resetting free attempts data:', error);
      }
      
      set({ 
        freeAttemptsUsed: 0,
        freeAttemptsRemaining: MAX_FREE_ATTEMPTS,
        isTrialMode: true
      });
    },

    addToHistory: (item: GenerationHistory) => {
      const state = get();
      const newHistory = [item, ...state.history].slice(0, 50);

      try {
        localStorage.setItem(STORAGE_KEYS.GENERATION_HISTORY, JSON.stringify(newHistory));
      } catch (error) {
        console.warn('Error saving generation history:', error);
      }

      set({ history: newHistory });
    },

    removeFromHistory: (id: string) => {
      const state = get();
      const newHistory = state.history.filter(item => item.id !== id);
      
      try {
        localStorage.setItem(STORAGE_KEYS.GENERATION_HISTORY, JSON.stringify(newHistory));
      } catch (error) {
        console.warn('Error saving history:', error);
      }
      
      set({ history: newHistory });
    },

    clearHistory: () => {
      try {
        localStorage.removeItem(STORAGE_KEYS.GENERATION_HISTORY);
      } catch (error) {
        console.warn('Error clearing history:', error);
      }
      
      set({ history: [] });
    },

    generateNarrative: async (topic: string) => {
      const state = get();
      
      if (!state.hasCustomKey && state.freeAttemptsRemaining <= 0) {
        return {
          success: false,
          error: 'Free attempts exhausted. Please add your API key.',
          needsApiKey: true
        };
      }

      if (!state.apiKey && !state.isTrialMode) {
        return {
          success: false,
          error: 'API key is required',
          needsApiKey: true
        };
      }

      try {
        const result = await state.generator.generateNarrative({ topic, apiKey: state.apiKey });
        
        if (result.success && result.content) {
          const historyItem: GenerationHistory = {
            id: `gen_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            sessionId: state.sessionId,
            topic,
            generatedContent: result.content,
            createdAt: new Date(),
            isDemo: !state.hasCustomKey
          };
          
          state.addToHistory(historyItem);
          
          state.incrementUsage();
          
          if (state.isTrialMode) {
            state.incrementFreeAttempts();
          }
          
          return {
            success: true,
            content: result.content,
            isDemo: !state.hasCustomKey
          };
        }
        
        return {
          success: false,
          error: result.error || 'Erro desconhecido na geração'
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Erro na geração'
        };
      }
    },
  };
});