import React from 'react';
import { Languages } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from '../hooks/useTranslation';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { t, isPortuguese, switchLanguage } = useTranslation();

  return (
    <button
      onClick={switchLanguage}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-lg",
        "text-sm font-medium transition-all duration-200",
        "hover:scale-[1.02] active:scale-[0.98]",
        "text-muted-foreground hover:text-foreground hover:bg-muted/20",
        "border border-muted/30 hover:border-muted/50",
        className
      )}
      title={`${t('language.switchTo')} ${isPortuguese ? t('language.english') : t('language.portuguese')}`}
    >
      <Languages className="w-4 h-4" />
      <span className="hidden sm:inline">
        {isPortuguese ? 'EN' : 'PT'}
      </span>
    </button>
  );
}