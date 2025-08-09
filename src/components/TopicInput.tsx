import { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '../lib/utils';
import { validateTopic } from '../lib/security';
import { getRandomDemoTopics } from '../lib/constants';
import { useTranslation } from '../hooks/useTranslation';

interface TopicInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}

export function TopicInput({ 
  value, 
  onChange, 
  onSubmit, 
  disabled = false,
  placeholder,
  error: externalError
}: TopicInputProps) {
  const { t } = useTranslation();
  const [internalError, setInternalError] = useState<string>();
  const error = externalError || internalError;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const defaultPlaceholder = placeholder || t('topicInput.placeholder');
  
  const dynamicTopics = useMemo(() => getRandomDemoTopics(5), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    
    if (internalError) {
      const validation = validateTopic(newValue);
      if (validation.isValid) {
        setInternalError(undefined);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled) {
      e.preventDefault();
      handleSubmit();
    }
    
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSubmit = () => {
    const validation = validateTopic(value);
    
    if (!validation.isValid) {
      setInternalError(validation.error);
      return;
    }
    
    setInternalError(undefined);
    setShowSuggestions(false);
    onSubmit();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setInternalError(undefined);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (!value.trim()) {
      setShowSuggestions(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
          disabled={disabled}
          placeholder={defaultPlaceholder}
          className={cn(
            "input-neumorphic w-full text-center font-medium py-4 px-6 text-lg",
            "placeholder:text-muted-foreground/60",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "ring-2 ring-red-500/20 shadow-neumorphic-inset"
          )}
          maxLength={200}
          autoComplete="off"
          spellCheck={false}
        />
        
        {value && (
          <button
            onClick={() => {
              onChange('');
              setInternalError(undefined);
              inputRef.current?.focus();
            }}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "w-5 h-5 rounded-full bg-muted-foreground/20",
              "flex items-center justify-center",
              "hover:bg-muted-foreground/30 transition-colors",
              "text-xs text-muted-foreground hover:text-foreground"
            )}
            disabled={disabled}
            type="button"
          >
            ×
          </button>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 text-center font-medium">
          {error}
        </p>
      )}

      {showSuggestions && (
        <div className={cn(
          "absolute top-full left-0 right-0 mt-2 z-10",
          "card-neumorphic bg-background/95 backdrop-blur-sm",
          "border border-border/50"
        )}>
          <div className="p-3">
            <p className="text-xs text-muted-foreground mb-3 font-medium">
              {t('topicInput.suggestions')}
            </p>
            <div className="space-y-1">
              {dynamicTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(topic)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg",
                    "text-sm text-foreground/80",
                    "hover:bg-primary/10 hover:text-foreground",
                    "transition-colors duration-150",
                    "focus:outline-none focus:bg-primary/10"
                  )}
                  type="button"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}