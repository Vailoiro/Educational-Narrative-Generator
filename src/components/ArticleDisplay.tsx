import { useState } from 'react';
import { Copy, RotateCcw, Check, ExternalLink, Calendar, User } from 'lucide-react';
import { cn, copyToClipboard, formatDate } from '../lib/utils';
import { PulseButton } from './GenerateButton';
import type { GenerationHistory } from '../types';

interface ArticleDisplayProps {
  article: string;
  topic: string;
  timestamp: Date;
  onNewGeneration: () => void;
  isDemo?: boolean;
}

export function ArticleDisplay({ 
  article, 
  topic, 
  timestamp, 
  onNewGeneration, 
  isDemo = false 
}: ArticleDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(article);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Artigo sobre: ${topic}`,
        text: article,
      }).catch(() => {
        handleCopy();
      });
    } else {
      handleCopy();
    }
  };

  const articleLines = article.split('\n');
  const shouldTruncate = articleLines.length > 15;
  const displayedArticle = shouldTruncate && !isExpanded 
    ? articleLines.slice(0, 15).join('\n') + '\n\n[...]'
    : article;

  return (
    <div className="card-neumorphic animate-in slide-in-from-bottom-4 duration-500">
      {isDemo && (
        <div className={cn(
          "mb-4 p-3 rounded-lg",
          "bg-amber-50/50 border border-amber-200/50",
          "flex items-center space-x-2"
        )}>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-amber-800">
            Artigo de demonstração - Configure sua API para conteúdo personalizado
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={cn(
              "w-8 h-8 rounded-lg bg-primary/10",
              "flex items-center justify-center"
            )}>
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">
                Artigo Gerado
              </h3>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(timestamp)}</span>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "px-3 py-2 rounded-lg",
            "bg-muted/30 border border-muted"
          )}>
            <span className="text-sm font-medium text-muted-foreground">
              Tópico: 
            </span>
            <span className="text-sm text-foreground">
              {topic}
            </span>
          </div>
        </div>
      </div>

      <div className={cn(
        "prose prose-sm max-w-none",
        "text-foreground leading-relaxed"
      )}>
        <div className={cn(
          "whitespace-pre-wrap font-body text-sm",
          "p-4 rounded-xl bg-muted/20",
          "border border-muted/50"
        )}>
          {displayedArticle}
        </div>
        
        {shouldTruncate && (
          <div className="mt-3 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "text-sm font-medium text-primary",
                "hover:text-primary/80 transition-colors",
                "underline underline-offset-2"
              )}
            >
              {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <PulseButton
          onClick={handleCopy}
          className={cn(
            "flex items-center space-x-2 flex-1 min-w-[120px]",
            copied && "bg-green-100 text-green-700"
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar</span>
            </>
          )}
        </PulseButton>

        <PulseButton
          onClick={handleShare}
          className="flex items-center space-x-2 flex-1 min-w-[120px]"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Compartilhar</span>
        </PulseButton>

        <PulseButton
          onClick={onNewGeneration}
          className={cn(
            "flex items-center space-x-2 flex-1 min-w-[120px]",
            "bg-primary/10 text-primary hover:bg-primary/20"
          )}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Nova Geração</span>
        </PulseButton>
      </div>
    </div>
  );
}

export function ArticleHistory({ 
  history, 
  onSelectArticle 
}: { 
  history: GenerationHistory[]; 
  onSelectArticle: (article: GenerationHistory) => void; 
}) {
  if (history.length === 0) {
    return (
      <div className={cn(
        "card-neumorphic text-center py-8",
        "text-muted-foreground"
      )}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <p className="font-medium">Nenhum artigo gerado ainda</p>
        <p className="text-sm mt-1">Seus artigos aparecerão aqui após a geração</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-foreground mb-4">
        Histórico de Gerações
      </h3>
      
      {history.slice(0, 5).map((item) => (
        <button
          key={item.id}
          onClick={() => onSelectArticle(item)}
          className={cn(
            "w-full p-4 rounded-xl text-left",
            "bg-muted/20 hover:bg-muted/30",
            "border border-muted/50 hover:border-muted",
            "transition-all duration-200",
            "hover:scale-[1.01] active:scale-[0.99]"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm text-foreground truncate">
              {item.topic}
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              {formatDate(item.createdAt)}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {item.generatedContent.substring(0, 100)}...
          </p>
        </button>
      ))}
      
      {history.length > 5 && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          Mostrando os 5 artigos mais recentes
        </p>
      )}
    </div>
  );
}