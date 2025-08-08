import { useState, useEffect } from 'react';
import { Sparkles, AlertCircle, Target, Shield, Lightbulb, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppStore } from '../lib/store';
import { useApiStore } from '../lib/store';
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
    freeAttemptsRemaining
  } = useApiStore();

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
      setTopicError('Por favor, insira um tópico.');
      return;
    }

    if (topic.trim().length < 3) {
      setTopicError('O tópico deve ter pelo menos 3 caracteres.');
      return;
    }

    if (!hasCustomKey && !isTrialMode) {
      setError('Configure sua chave de API para usar o gerador.');
      return;
    }

    if (isTrialMode && freeAttemptsRemaining <= 0) {
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
      setError('Erro inesperado. Verifique sua conexão e tente novamente.');
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
          topic={currentTopic || 'Tópico não especificado'}
          timestamp={new Date()}
          onNewGeneration={handleNewGeneration}
          isDemo={!hasCustomKey}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <div className={cn(
          "w-16 h-16 mx-auto mb-4 rounded-2xl",
          "bg-gradient-to-br from-primary to-primary/80",
          "flex items-center justify-center",
          "shadow-neumorphic animate-pulse-ring"
        )}>
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        
        <h1 className={cn(
          "font-display font-bold text-3xl mb-3",
          "bg-gradient-to-r from-foreground to-foreground/80",
          "bg-clip-text text-transparent"
        )}>
          Gerador de Narrativas
        </h1>
        
        <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
          Uma ferramenta educativa para explorar diferentes perspectivas jornalísticas e desenvolver pensamento crítico sobre narrativas na mídia.
        </p>
      </div>

      {!hasCustomKey && isTrialMode && freeAttemptsRemaining > 0 && (
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
              Você tem {freeAttemptsRemaining} tentativa{freeAttemptsRemaining !== 1 ? 's' : ''} gratuita{freeAttemptsRemaining !== 1 ? 's' : ''}. Configure sua chave de API para uso ilimitado.
            </button>
          </div>
        </div>
      )}

      {!hasCustomKey && (!isTrialMode || freeAttemptsRemaining <= 0) && (
        <div className={cn(
          "mb-6 p-4 rounded-xl",
          "bg-red-50/50 border border-red-200/50",
          "flex items-start space-x-3"
        )}>
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-800">
            <button
              onClick={onOpenConfig}
              className={cn(
                "text-left hover:underline transition-all duration-200",
                "hover:text-red-900 cursor-pointer"
              )}
            >
              Tentativas gratuitas esgotadas. Configure sua chave de API para continuar.
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <TopicInput
          value={topic}
          onChange={handleTopicChange}
          onSubmit={handleGenerate}
          error={topicError}
          disabled={isGenerating}
          placeholder="Ex: Impactos da inteligência artificial na educação"
        />

        {error && (
          <div className={cn(
            "p-4 rounded-xl",
            "bg-red-50/50 border border-red-200/50",
            "flex items-start space-x-3",
            "animate-in slide-in-from-top-2 duration-300"
          )}>
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-800">
              <p className="font-medium mb-1">Erro na geração</p>
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
                  Gerando artigo...
                </p>
                <p className="text-sm text-muted-foreground">
                  Isso pode levar alguns segundos
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
          <span>Powered by Google Gemini AI</span>
        </div>
      </div>

      <div className="mt-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-neumorphic">
            <h2 className="font-display font-semibold text-xl text-foreground mb-4">
              🎯 Missão
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Capacitar estudantes, jornalistas e educadores com uma ferramenta que demonstra 
              como diferentes perspectivas podem moldar a narrativa de um mesmo evento, 
              promovendo maior consciência sobre viés midiático e literacia digital.
            </p>
          </div>

          <div className="card-neumorphic">
            <h2 className="font-display font-semibold text-xl text-foreground mb-4">
              🔬 Como Funciona
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizando inteligência artificial avançada (Google Gemini), o simulador 
              gera artigos jornalísticos realistas baseados em tópicos fornecidos pelo usuário, 
              sempre mantendo neutralidade e qualidade editorial.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
            Características Principais
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
                Objetivo Educativo
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                Desenvolver pensamento crítico sobre narrativas jornalísticas e diferentes perspectivas de um mesmo evento.
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
                Ética e Responsabilidade
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                Promover o uso responsável da IA na criação de conteúdo, sempre com foco educacional e transparência.
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
                Exploração Criativa
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                Permitir a exploração de diferentes ângulos jornalísticos de forma segura e controlada.
              </p>
            </div>
          </div>
        </div>



        <div>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
            Uso Responsável
          </h2>
          
          <div className="card-neumorphic">
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-foreground">Finalidade Educativa:</strong> 
                  Esta ferramenta foi criada exclusivamente para fins educacionais e de pesquisa.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-foreground">Transparência:</strong> 
                  Todo conteúdo gerado é claramente identificado como criado por IA.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-foreground">Não Publicação:</strong> 
                  O conteúdo não deve ser usado como notícia real ou publicado sem contexto adequado.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>
                  <strong className="text-foreground">Pensamento Crítico:</strong> 
                  Incentivamos sempre a verificação de fontes e análise crítica de qualquer narrativa.
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
  return (
    <div className="text-center py-12">
      <div className={cn(
        "w-20 h-20 mx-auto mb-6 rounded-2xl",
        "bg-muted/20 flex items-center justify-center"
      )}>
        <Sparkles className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="font-display font-semibold text-xl text-foreground mb-2">
        Comece a explorar narrativas
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Digite um tópico de interesse e descubra como diferentes perspectivas 
        podem moldar uma narrativa jornalística.
      </p>
      
      <PulseButton
        onClick={onGetStarted}
        className={cn(
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 px-6 py-3"
        )}
      >
        Começar Agora
      </PulseButton>
    </div>
  );
}