import { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Key, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { security } from '../lib/security';
import { GOOGLE_AI_STUDIO_URL } from '../lib/constants';
import { PulseButton } from './GenerateButton';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentApiKey?: string;
  onSaveApiKey: (apiKey: string) => boolean;
  onRemoveApiKey: () => void;
}

export function ConfigModal({ 
  isOpen, 
  onClose, 
  currentApiKey, 
  onSaveApiKey, 
  onRemoveApiKey 
}: ConfigModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setApiKey(currentApiKey || '');
      setError(undefined);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, currentApiKey]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setError('Por favor, insira uma chave de API.');
      return;
    }

    if (!security.validateApiKey(apiKey.trim())) {
      setError('Formato de chave de API inválido.');
      return;
    }

    setIsLoading(true);
    setError(undefined);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const success = onSaveApiKey(apiKey.trim());
      
      if (success) {
        onClose();
      } else {
        setError('Erro ao salvar a chave de API. Verifique se está correta.');
      }
    } catch {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    onRemoveApiKey();
    setApiKey('');
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      "bg-black/50 backdrop-blur-sm",
      "animate-in fade-in duration-200"
    )}>
      <div 
        ref={modalRef}
        className={cn(
          "card-neumorphic w-full max-w-md mx-4",
          "animate-in zoom-in-95 duration-200"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-10 h-10 rounded-xl bg-primary/10",
              "flex items-center justify-center"
            )}>
              <Key className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-title font-display text-foreground">
              Configuração da API
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className={cn(
              "w-8 h-8 rounded-lg",
              "flex items-center justify-center",
              "hover:bg-muted-foreground/10 transition-colors",
              "text-muted-foreground hover:text-foreground"
            )}
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className={cn(
            "p-4 rounded-xl bg-blue-50/50 border border-blue-200/50",
            "flex items-start space-x-3"
          )}>
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Para uso ilimitado:</p>
              <p>Configure sua chave de API do Google AI Studio para gerar narrativas sem limites diários.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Chave de API do Google AI Studio
            </label>
            
            <div className="relative">
              <input
                ref={inputRef}
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  if (error) setError(undefined);
                }}
                onKeyDown={handleKeyPress}
                placeholder="Cole sua chave de API aqui..."
                className={cn(
                  "input-neumorphic w-full pr-10",
                  "font-mono text-sm",
                  error && "ring-2 ring-red-500/20"
                )}
                disabled={isLoading}
                autoComplete="off"
              />
              
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors text-sm"
                )}
                disabled={isLoading}
              >
                {showKey ? '🙈' : '👁️'}
              </button>
            </div>
            
            {error && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <a
              href={GOOGLE_AI_STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center space-x-2",
                "text-sm text-primary hover:text-primary/80",
                "transition-colors font-medium"
              )}
            >
              <span>Obter chave no Google AI Studio</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex space-x-3 mt-8">
          {currentApiKey && (
            <PulseButton
              onClick={handleRemove}
              disabled={isLoading}
              className="flex-1 text-red-600 hover:text-red-700"
            >
              Remover Chave
            </PulseButton>
          )}
          
          <PulseButton
            onClick={handleSave}
            disabled={isLoading || !apiKey.trim()}
            className={cn(
              "flex-1 bg-primary text-primary-foreground",
              "hover:bg-primary/90"
            )}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Salvando...</span>
              </span>
            ) : (
              'Salvar Chave'
            )}
          </PulseButton>
        </div>
      </div>
    </div>
  );
}