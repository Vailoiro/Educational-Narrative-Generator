import React, { useState, useMemo, useEffect } from 'react';
import { History, Search, Trash2, Calendar, FileText } from 'lucide-react';
import { cn, formatRelativeTime, copyToClipboard } from '../lib/utils';
import { useApiStore, useAppStore } from '../lib/store';
import { ArticleDisplay } from '../components/ArticleDisplay';
import { PulseButton } from '../components/GenerateButton';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { toast } from 'sonner';
import type { GenerationHistory } from '../types';

export function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<GenerationHistory | null>(null);
  
  const { history, clearHistory, removeFromHistory } = useApiStore();
  const { setCurrentView } = useAppStore();

  useEffect(() => {
    console.log('[HistoryPage] Component mounted');
    console.log('[HistoryPage] History data:', history);
    console.log('[HistoryPage] History length:', history?.length || 0);
    
    if (!Array.isArray(history)) {
      console.error('[HistoryPage] History is not an array:', typeof history, history);
    }
    
    return () => {
      console.log('[HistoryPage] Component unmounted');
    };
  }, [history]);

  const safeHistory = useMemo(() => {
    if (!Array.isArray(history)) {
      console.warn('[HistoryPage] History is not an array, returning empty array');
      return [];
    }
    
    return history.filter(item => {
      if (!item || typeof item !== 'object') {
        console.warn('[HistoryPage] Invalid history item:', item);
        return false;
      }
      
      if (!item.id || !item.topic || !item.generatedContent) {
        console.warn('[HistoryPage] History item missing required fields:', item);
        return false;
      }
      
      return true;
    });
  }, [history]);
  
  const filteredHistory = useMemo(() => {
    try {
      return safeHistory.filter(item => 
        item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.generatedContent.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('[HistoryPage] Error filtering history:', error);
      return [];
    }
  }, [safeHistory, searchTerm]);

  const handleSelectArticle = (article: GenerationHistory) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  const handleViewInGenerator = (article: GenerationHistory) => {
    setCurrentView('generator');
    window.location.hash = 'generator';
    setSelectedArticle(null);
  };

  const handleDeleteArticle = (articleId: string) => {
    removeFromHistory(articleId);
    if (selectedArticle?.id === articleId) {
      setSelectedArticle(null);
    }
    toast.success('Artigo removido do histórico');
  };

  const handleClearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
      clearHistory();
      setSelectedArticle(null);
      toast.success('Histórico limpo com sucesso');
    }
  };

  const renderContent = () => {
    try {
      if (selectedArticle) {
        return (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
              <PulseButton
                onClick={handleBackToList}
                className="flex items-center space-x-2 mb-4"
              >
                <span>← Voltar ao histórico</span>
              </PulseButton>
            </div>
            
            <ArticleDisplay
              article={selectedArticle.generatedContent}
              topic={selectedArticle.topic}
              timestamp={selectedArticle.createdAt}
              onNewGeneration={() => handleViewInGenerator(selectedArticle)}
              isDemo={selectedArticle.isDemo}
            />
          </div>
        );
      }

      return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className={cn(
                "w-12 h-12 rounded-xl",
                "bg-gradient-to-br from-primary to-primary/80",
                "flex items-center justify-center",
                "shadow-neumorphic"
              )}>
                <History className="w-6 h-6 text-white" />
              </div>
              
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground">
                  Histórico de Gerações
                </h1>
                <p className="text-muted-foreground">
                  {safeHistory.length} {safeHistory.length === 1 ? 'artigo gerado' : 'artigos gerados'}
                </p>
              </div>
            </div>

            {safeHistory.length > 0 && (
              <PulseButton
                onClick={handleClearAll}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                <span>Limpar Tudo</span>
              </PulseButton>
            )}
          </div>

          {safeHistory.length === 0 ? (
            <EmptyHistoryState />
          ) : (
            <>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por tópico ou conteúdo..."
                    className={cn(
                      "input-neumorphic w-full pl-10",
                      "focus:ring-2 focus:ring-primary/20"
                    )}
                  />
                </div>
              </div>

              {filteredHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-medium text-foreground mb-2">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-muted-foreground">
                    Tente buscar por outros termos
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredHistory.map((article) => (
                    <HistoryCard
                      key={article.id}
                      article={article}
                      onSelect={() => handleSelectArticle(article)}
                      onDelete={() => handleDeleteArticle(article.id)}
                      searchTerm={searchTerm}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      );
    } catch (error) {
      console.error('[HistoryPage] Error rendering content:', error);
      return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center py-16">
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              Erro ao carregar histórico
            </h3>
            <p className="text-muted-foreground mb-6">
              Ocorreu um erro ao carregar o histórico. Tente recarregar a página.
            </p>
            <PulseButton
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3"
            >
              Recarregar
            </PulseButton>
          </div>
        </div>
      );
    }
  };

  return (
    <ErrorBoundary>
      {renderContent()}
    </ErrorBoundary>
  );
}

function HistoryCard({ 
  article, 
  onSelect, 
  onDelete, 
  searchTerm 
}: {
  article: GenerationHistory;
  onSelect: () => void;
  onDelete: () => void;
  searchTerm: string;
}) {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200/60 text-foreground rounded px-1">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className={cn(
      "card-neumorphic group",
      "hover:scale-[1.01] transition-all duration-200"
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1">
          <div className={cn(
            "w-10 h-10 rounded-lg",
            "bg-primary/10 flex items-center justify-center",
            "flex-shrink-0"
          )}>
            <FileText className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">
              {highlightText(article.topic, searchTerm)}
            </h3>
            
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{formatRelativeTime(article.createdAt)}</span>
              </div>
              
              {article.isDemo && (
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs font-medium",
                  "bg-amber-100 text-amber-800"
                )}>
                  Demo
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className={cn(
              "w-8 h-8 rounded-lg",
              "flex items-center justify-center",
              "text-red-600 hover:bg-red-50",
              "transition-colors"
            )}
            title="Excluir artigo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
        {highlightText(article.generatedContent.substring(0, 200) + '...', searchTerm)}
      </p>

      <div className="flex justify-end">
        <PulseButton
          onClick={onSelect}
          className="text-sm px-4 py-2"
        >
          Ver Artigo
        </PulseButton>
      </div>
    </div>
  );
}

function EmptyHistoryState() {
  return (
    <div className="text-center py-16">
      <div className={cn(
        "w-20 h-20 mx-auto mb-6 rounded-2xl",
        "bg-muted/20 flex items-center justify-center"
      )}>
        <History className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="font-display font-semibold text-xl text-foreground mb-2">
        Nenhum artigo no histórico
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Seus artigos gerados aparecerão aqui. Comece criando seu primeiro artigo no gerador.
      </p>
      
      <PulseButton
        onClick={() => window.location.hash = '#generator'}
        className={cn(
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 px-6 py-3"
        )}
      >
        Ir para o Gerador
      </PulseButton>
    </div>
  );
}