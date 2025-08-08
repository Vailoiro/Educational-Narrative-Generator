import { create } from 'zustand';
import { AppState, ApiState, GenerationHistory, ApiUsage } from '../types';
import { STORAGE_KEYS, LIMITS } from './constants';
import { generateSessionId, security } from './security';
import { NarrativeGenerator } from './api';

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
  setApiKey: (apiKey: string) => boolean;
  removeApiKey: () => void;
  incrementUsage: () => void;
  addToHistory: (item: GenerationHistory) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  generateNarrative: (topic: string) => Promise<{ success: boolean; content?: string; error?: string; isDemo?: boolean }>;
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

  const initialApiKey = getStoredApiKey();
  const initialSessionId = getStoredSessionId();
  const initialHistory = getStoredHistory();
  const initialUsage = getStoredUsage();

  return {
    apiKey: initialApiKey,
    hasReachedLimit: false,
    generator: new NarrativeGenerator(initialApiKey),
    sessionId: initialSessionId,
    history: initialHistory,
    usage: initialUsage,
    hasCustomKey: !!initialApiKey,

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
          hasCustomKey: true
        });
        
        return true;
      } catch {
        return false;
      }
    },

    removeApiKey: () => {
      try {
        localStorage.removeItem(STORAGE_KEYS.API_KEY);
        const state = get();
        set({ 
          apiKey: undefined, 
          generator: new NarrativeGenerator(),
          hasReachedLimit: false,
          hasCustomKey: false
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