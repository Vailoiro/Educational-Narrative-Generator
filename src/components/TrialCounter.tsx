import React from 'react';
import { Clock, Zap } from 'lucide-react';
import { useApiStore } from '../lib/store';
import { useTranslation } from '../hooks/useTranslation';

interface TrialCounterProps {
  onConfigClick?: () => void;
}

export const TrialCounter: React.FC<TrialCounterProps> = ({ onConfigClick }) => {
  const { 
    isTrialMode, 
    freeAttemptsRemaining, 
    freeAttemptsUsed, 
    hasCustomKey 
  } = useApiStore();
  
  const { t } = useTranslation();

  if (!isTrialMode || hasCustomKey) {
    return null
  }

  const isExhausted = freeAttemptsRemaining === 0;

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
      isExhausted 
        ? 'bg-red-50 border-red-200 text-red-700' 
        : freeAttemptsRemaining === 1
        ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
        : 'bg-blue-50 border-blue-200 text-blue-700'
    }`}>
        <div className="flex items-center gap-1">
          {isExhausted ? (
            <Clock className="w-4 h-4" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {isExhausted ? (
              t('trialCounter.exhausted')
            ) : (
              `${freeAttemptsRemaining} ${freeAttemptsRemaining === 1 ? t('trialCounter.attempt') : t('trialCounter.attempts')} ${t('trialCounter.remaining')}`
            )}
          </span>
        </div>
        
        {isExhausted && onConfigClick && (
          <button
            onClick={onConfigClick}
            className="ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
          >
            {t('trialCounter.addApiKey')}
          </button>
        )}
        
        <div className="flex gap-1 ml-2">
          {Array.from({ length: 2 }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < freeAttemptsUsed
                  ? isExhausted
                    ? 'bg-red-400'
                    : 'bg-gray-400'
                  : 'bg-gray-200'
              }`}
            />
          ))}
       </div>
     </div>
   );
};