import { useEffect } from 'react';
import { cn } from './lib/utils';
import { useAppStore, useApiStore } from './lib/store';
import { Header, MobileNav } from './components/Header';
import { ConfigModal } from './components/ConfigModal';
import { GeneratorPage } from './pages/GeneratorPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import type { AppView } from './types';

function App() {
  const { 
    currentView, 
    isConfigModalOpen, 
    setCurrentView, 
    setConfigModalOpen 
  } = useAppStore();
  
  const { 
    apiKey, 
    hasCustomKey, 
    setApiKey, 
    removeApiKey,
    history 
  } = useApiStore();

  useEffect(() => {
    console.log('[App] Store initialization check:');
    console.log('[App] ApiStore - apiKey:', !!apiKey);
    console.log('[App] ApiStore - hasCustomKey:', hasCustomKey);
    console.log('[App] ApiStore - history:', history);
    console.log('[App] ApiStore - history length:', history?.length || 0);
    console.log('[App] AppStore - currentView:', currentView);
  }, [apiKey, hasCustomKey, history, currentView]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as AppView;
      if (['generator', 'history', 'about'].includes(hash)) {
        setCurrentView(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCurrentView]);

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    window.location.hash = view;
  };

  const handleOpenConfig = () => {
    setConfigModalOpen(true);
  };

  const handleCloseConfig = () => {
    setConfigModalOpen(false);
  };

  const handleSaveApiKey = (newApiKey: string): boolean => {
    try {
      setApiKey(newApiKey);
      return true;
    } catch (error) {
      console.error('Error saving API key:', error);
      return false;
    }
  };

  const handleRemoveApiKey = () => {
    removeApiKey();
  };

  const renderCurrentPage = () => {
    switch (currentView) {
      case 'generator':
        return <GeneratorPage />;
      case 'history':
        return <HistoryPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <GeneratorPage />;
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-background",
      "text-foreground antialiased",
      "selection:bg-primary/20 selection:text-primary-foreground"
    )}>
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        onOpenConfig={handleOpenConfig}
        hasCustomApiKey={hasCustomKey}
      />

      <main className={cn(
        "min-h-[calc(100vh-80px)]",
        "pb-20 md:pb-8"
      )}>
        {renderCurrentPage()}
      </main>

      <MobileNav
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      <ConfigModal
        isOpen={isConfigModalOpen}
        onClose={handleCloseConfig}
        currentApiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        onRemoveApiKey={handleRemoveApiKey}
      />

      <div className={cn(
        "fixed bottom-4 right-4 z-30",
        "md:hidden"
      )}>
        <button
          onClick={handleOpenConfig}
          className={cn(
            "w-12 h-12 rounded-full",
            "bg-primary text-primary-foreground",
            "shadow-neumorphic hover:shadow-neumorphic-hover",
            "flex items-center justify-center",
            "transition-all duration-200",
            "hover:scale-110 active:scale-95"
          )}
          title="Configurações"
        >
          <span className="text-lg">⚙️</span>
        </button>
      </div>
    </div>
  );
}

export default App;

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-provider">
      {children}
    </div>
  );
}

export function ErrorBoundary({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode; 
}) {
  return (
    <div className="error-boundary">
      {children}
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className={cn(
      "fixed inset-0 z-50",
      "bg-background flex items-center justify-center"
    )}>
      <div className="text-center">
        <div className={cn(
          "w-16 h-16 mx-auto mb-4 rounded-2xl",
          "bg-gradient-to-br from-primary to-primary/80",
          "flex items-center justify-center",
          "shadow-neumorphic animate-pulse-ring"
        )}>
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
        
        <h2 className="font-display font-semibold text-foreground mb-2">
          Carregando...
        </h2>
        
        <p className="text-sm text-muted-foreground">
          Preparando o simulador de narrativas
        </p>
      </div>
    </div>
  );
}