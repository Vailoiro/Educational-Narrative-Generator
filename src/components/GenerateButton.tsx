import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from '../hooks/useTranslation';

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  hasCustomKey?: boolean;
}

export function GenerateButton({ 
  onClick, 
  disabled = false, 
  loading = false,
  hasCustomKey = false
}: GenerateButtonProps) {
  const { t } = useTranslation();
  const isDisabled = disabled || loading || !hasCustomKey;
  
  const getButtonText = () => {
    if (loading) return t('generator.generating');
    if (!hasCustomKey) return t('generator.configureApi');
    return t('generator.generateButton');
  };

  const getUsageText = () => {
    if (hasCustomKey) return t('generator.unlimitedUsage');
    return t('generator.configureApiKey');
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={cn(
          "btn-primary relative overflow-hidden",
          "min-w-[200px] h-12",
          "font-semibold text-base",
          "focus:outline-none focus:ring-2 focus:ring-primary/30",
          loading && "animate-pulse-ring",
          isDisabled && "opacity-50 cursor-not-allowed",
          !isDisabled && "hover:scale-[1.02] active:scale-[0.98]"
        )}
        type="button"
      >
        <span className={cn(
          "flex items-center justify-center space-x-2",
          "transition-all duration-200"
        )}>
          {loading && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          <span>{getButtonText()}</span>
        </span>
        
        {loading && (
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r",
            "from-transparent via-white/20 to-transparent",
            "animate-pulse"
          )} />
        )}
      </button>
      
      <div className="text-center">
        <p className={cn(
          "text-xs font-medium",
          hasCustomKey ? "text-primary" : "text-muted-foreground"
        )}>
          {getUsageText()}
        </p>
        
        {!hasCustomKey && (
          <p className="text-xs text-blue-600 mt-1 font-medium">
            {t('generator.apiKeyRequired')}
          </p>
        )}
      </div>
    </div>
  );
}

export function LoadingRing() {
  return (
    <div className="relative">
      <div className={cn(
        "w-16 h-16 rounded-full",
        "bg-background shadow-neumorphic-inset",
        "flex items-center justify-center"
      )}>
        <div className={cn(
          "w-8 h-8 rounded-full border-2 border-primary/30",
          "border-t-primary animate-spin"
        )} />
      </div>
      
      <div className={cn(
        "absolute inset-0 rounded-full",
        "animate-pulse-ring"
      )} />
    </div>
  );
}

export function PulseButton({ 
  children, 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "btn-neumorphic relative overflow-hidden",
        "hover:scale-[1.02] active:scale-[0.98]",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r z-0",
        "from-transparent via-white/10 to-transparent",
        "translate-x-[-100%] hover:translate-x-[100%]",
        "transition-transform duration-700 ease-in-out"
      )} />
    </button>
  );
}