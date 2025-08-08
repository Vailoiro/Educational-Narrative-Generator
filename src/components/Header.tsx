import React from 'react';
import { Settings, BookOpen, History, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { PulseButton } from './GenerateButton';
import { TrialCounter } from './TrialCounter';
import type { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onOpenConfig: () => void;
  hasCustomApiKey: boolean;
}

export function Header({ 
  currentView, 
  onViewChange, 
  onOpenConfig, 
  hasCustomApiKey
}: HeaderProps) {


  const navItems = [
    {
      id: 'generator' as AppView,
      label: 'Gerador',
      icon: BookOpen,
      description: 'Criar novos artigos'
    },
    {
      id: 'history' as AppView,
      label: 'Histórico',
      icon: History,
      description: 'Ver artigos anteriores'
    },
    {
      id: 'about' as AppView,
      label: 'Sobre',
      icon: Info,
      description: 'Informações do projeto'
    }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full",
      "bg-background/80 backdrop-blur-md",
      "border-b border-muted/20"
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={cn(
              "w-10 h-10 rounded-xl",
              "bg-gradient-to-br from-primary to-primary/80",
              "flex items-center justify-center",
              "shadow-neumorphic"
            )}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            
            <div>
              <h1 className={cn(
                "font-display font-bold text-xl text-foreground",
                "bg-gradient-to-r from-foreground to-foreground/80",
                "bg-clip-text"
              )}>
                Simulador de Narrativas
              </h1>
              <p className="text-sm text-muted-foreground">
                Exploração educativa de narrativas jornalísticas
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg",
                      "text-sm font-medium transition-all duration-200",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      isActive 
                        ? "bg-primary/10 text-primary shadow-neumorphic-inset" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                    )}
                    title={item.description}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-2 ml-4">
              <TrialCounter onConfigClick={onOpenConfig} />
              
              <div className={cn(
                "hidden sm:flex items-center space-x-2",
                "px-3 py-1.5 rounded-lg",
                "bg-muted/20 border border-muted/30"
              )}>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  hasCustomApiKey ? "bg-green-500" : "bg-red-500"
                )} />
                <span className="text-xs font-medium text-muted-foreground">
                  {hasCustomApiKey ? 'API Configurada' : 'API Não Configurada'}
                </span>
              </div>

              <PulseButton
                onClick={onOpenConfig}
                className={cn(
                  "w-12 h-12 rounded-lg",
                  "flex items-center justify-center",
                  hasCustomApiKey 
                    ? "text-green-600 bg-green-50 hover:bg-green-100" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Configurar API"
              >
                <Settings className="w-6 h-6" />
              </PulseButton>
            </div>
          </div>
        </div>

        <nav className="md:hidden mt-4 flex items-center justify-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg",
                  "text-xs font-medium transition-all duration-200",
                  "hover:scale-[1.02] active:scale-[0.98] flex-1",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-neumorphic-inset" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                )}
                title={item.description}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}



export function MobileNav({ 
  currentView, 
  onViewChange 
}: { 
  currentView: AppView; 
  onViewChange: (view: AppView) => void; 
}) {
  const navItems = [
    { id: 'generator' as AppView, label: 'Gerador', icon: BookOpen },
    { id: 'history' as AppView, label: 'Histórico', icon: History },
    { id: 'about' as AppView, label: 'Sobre', icon: Info }
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "bg-background/90 backdrop-blur-md",
      "border-t border-muted/20",
      "md:hidden"
    )}>
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg",
                "text-xs font-medium transition-all duration-200",
                "hover:scale-[1.02] active:scale-[0.98]",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}