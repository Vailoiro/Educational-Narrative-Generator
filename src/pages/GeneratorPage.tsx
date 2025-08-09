import { useState, useEffect } from 'react';
import { Sparkles, AlertCircle, Target, Shield, Lightbulb, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppStore } from '../lib/store';
import { useApiStore } from '../lib/store';
import { useTranslation } from '../hooks/useTranslation';
import { TopicInput } from '../components/TopicInput';
import { GenerateButton, LoadingRing, PulseButton } from '../components/GenerateButton';
import { ArticleDisplay } from '../components/ArticleDisplay';

interface GeneratorPageProps {
  onOpenConfig?: () => void;
}

export function GeneratorPage({ onOpenConfig }: GeneratorPageProps) {
  const [topic, setTopic] = useState('');
  const [topicError, setTopicError] = useState<string>();
  
  const { 
    isGenerating, 
    currentArticle, 
    currentTopic, 
    error, 
    setGenerating, 
    setArticle, 
    setError, 
    clearError 
  } = useAppStore();
  
  const {
    hasCustomKey, 
    generateNarrative,
    isTrialMode,
    freeAttemptsRemaining,
    backendAttemptStatus,
    isCheckingAttempts
  } = useApiStore();

  const effectiveAttemptsRemaining = backendAttemptStatus 
    ? (backendAttemptStatus.hasCustomKey ? -1 : backendAttemptStatus.remaining)
    : freeAttemptsRemaining;
  
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setTopicError(t('generator.topicRequired'));
      return;
    }

    if (topic.trim().length < 3) {
      setTopicError(t('generator.topicTooShort'));
      return;
    }

    if (!hasCustomKey && !isTrialMode) {
      setError('Configure sua chave de API para usar o gerador.');
      return;
    }

    if (isTrialMode && effectiveAttemptsRemaining <= 0) {
      setError('Tentativas gratuitas esgotadas. Configure sua chave de API.');
      if (onOpenConfig) {
        setTimeout(() => onOpenConfig(), 1000);
      }
      return;
    }

    setGenerating(true);
    clearError();
    setTopicError(undefined);

    try {
      const result = await generateNarrative(topic.trim());
      
      if (result.success && result.content) {
        setArticle(result.content, topic.trim());
        setTopic('');
      } else {
        setError(result.error || 'Erro ao gerar o artigo. Tente novamente.');
        
        if (result.needsApiKey && onOpenConfig) {
          setTimeout(() => onOpenConfig(), 1000);
        }
      }
    } catch (err) {
      setError(t('generator.unexpectedError'));
      console.error('Generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleNewGeneration = () => {
    setArticle(null);
    setTopic('');
    clearError();
    setTopicError(undefined);
  };

  const handleTopicChange = (value: string) => {
    setTopic(value);
    if (topicError) setTopicError(undefined);
    if (error) clearError();
  };

  if (currentArticle) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ArticleDisplay
          article={currentArticle}
          topic={currentTopic || t('generator.unspecifiedTopic')}
          timestamp={new Date()}
          onNewGeneration={handleNewGeneration}
          isDemo={!hasCustomKey}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-10">
        <div className={cn(
          "w-20 h-20 mx-auto mb-5 rounded-2xl",
          "bg-gradient-to-br from-primary to-primary/80",
          "flex items-center justify-center",
          "shadow-neumorphic animate-pulse-ring"
        )}>
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        
        <h1 className={cn(
          "font-display font-bold text-4xl mb-4",
          "bg-gradient-to-r from-foreground to-foreground/80",
          "bg-clip-text text-transparent"
        )}>
          {t('generator.title')}
        </h1>
        
        <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
          {t('generator.subtitle')}
        </p>
      </div>

      {!hasCustomKey && isTrialMode && effectiveAttemptsRemaining > 0 && (
        <div className={cn(
          "mb-6 p-4 rounded-xl",
          "bg-blue-50/50 border border-blue-200/50",
          "flex items-start space-x-3"
        )}>
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <button
              onClick={onOpenConfig}
              className={cn(
                "text-left hover:underline transition-all duration-200",
                "hover:text-blue-900 cursor-pointer"
              )}
            >
              {t('generator.freeTrialMessage', { count: effectiveAttemptsRemaining })}
              {isCheckingAttempts && (
                <span className="ml-2 text-xs opacity-70">(verificando...)</span>
              )}
            </button>
          </div>
        </div>
      )}

      {!hasCustomKey && (!isTrialMode || effectiveAttemptsRemaining <= 0) && (
        <div className={cn(
          "mb-8 p-5 rounded-xl",
          "bg-red-50/50 border border-red-200/50",
          "flex items-start space-x-4"
        )}>
          <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="text-base text-red-800">
            <button
              onClick={onOpenConfig}
              className={cn(
                "text-left hover:underline transition-all duration-200",
                "hover:text-red-900 cursor-pointer"
              )}
            >
              {t('generator.freeTrialExhausted')}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-8">
        <TopicInput
          value={topic}
          onChange={handleTopicChange}
          onSubmit={handleGenerate}
          error={topicError}
          disabled={isGenerating}
          placeholder={t('generator.placeholder')}
        />

        {error && (
          <div className={cn(
            "p-5 rounded-xl",
            "bg-red-50/50 border border-red-200/50",
            "flex items-start space-x-4",
            "animate-in slide-in-from-top-2 duration-300"
          )}>
            <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-base text-red-800">
              <p className="font-medium mb-1">{t('generator.errorTitle')}</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center space-y-4">
              <LoadingRing />
              <div className="text-center">
                <p className="font-medium text-foreground mb-1">
                  {t('generator.generating')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('generator.generatingSubtext')}
                </p>
              </div>
            </div>
          ) : (
            <GenerateButton
              onClick={handleGenerate}
              disabled={!topic.trim() || topic.trim().length < 3}
              loading={isGenerating}
              hasCustomKey={hasCustomKey}
            />
          )}
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className={cn(
          "inline-flex items-center space-x-2 px-4 py-2 rounded-lg",
          "bg-muted/20 border border-muted/30",
          "text-sm text-muted-foreground"
        )}>
          <Sparkles className="w-4 h-4" />
          <span>{t('generator.poweredBy')}</span>
        </div>
      </div>

      <div className="mt-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-neumorphic">
            <h2 className="font-display font-semibold text-xl text-foreground mb-4">
              🎯 {t('about.mission.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.mission.description')}
            </p>
          </div>

          <div className="card-neumorphic">
            <h2 className="font-display font-semibold text-xl text-foreground mb-4">
              🔬 {t('about.howItWorks.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.howItWorks.description')}
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
            {t('about.features.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-neumorphic text-center">
              <div className={cn(
                "w-12 h-12 mx-auto mb-4 rounded-xl",
                "bg-primary/10 flex items-center justify-center"
              )}>
                <Target className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="font-medium text-foreground mb-2">
                {t('about.features.educational.title')}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('about.features.educational.description')}
              </p>
            </div>

            <div className="card-neumorphic text-center">
              <div className={cn(
                "w-12 h-12 mx-auto mb-4 rounded-xl",
                "bg-primary/10 flex items-center justify-center"
              )}>
                <Shield className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="font-medium text-foreground mb-2">
                {t('about.features.ethics.title')}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('about.features.ethics.description')}
              </p>
            </div>

            <div className="card-neumorphic text-center">
              <div className={cn(
                "w-12 h-12 mx-auto mb-4 rounded-xl",
                "bg-primary/10 flex items-center justify-center"
              )}>
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="font-medium text-foreground mb-2">
                {t('about.features.creative.title')}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('about.features.creative.description')}
              </p>
            </div>
          </div>
        </div>



        <div>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
            {t('about.responsibleUse.title')}
          </h2>
          
          <div className="card-neumorphic">
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-foreground">{t('about.responsibleUse.educational.title')}:</strong> 
                  {t('about.responsibleUse.educational.description')}
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-foreground">{t('about.responsibleUse.transparency.title')}:</strong> 
                  {t('about.responsibleUse.transparency.description')}
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-foreground">{t('about.responsibleUse.noPublication.title')}:</strong> 
                  {t('about.responsibleUse.noPublication.description')}
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-foreground">{t('about.responsibleUse.criticalThinking.title')}:</strong> 
                  {t('about.responsibleUse.criticalThinking.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ 
  onGetStarted 
}: { 
  onGetStarted: () => void 
}) {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-12">
      <div className={cn(
        "w-20 h-20 mx-auto mb-6 rounded-2xl",
        "bg-muted/20 flex items-center justify-center"
      )}>
        <Sparkles className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="font-display font-semibold text-xl text-foreground mb-2">
        {t('generator.emptyState.title')}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {t('generator.emptyState.description')}
      </p>
      
      <PulseButton
        onClick={onGetStarted}
        className={cn(
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 px-6 py-3"
        )}
      >
        {t('generator.emptyState.startButton')}
      </PulseButton>
    </div>
  );
}