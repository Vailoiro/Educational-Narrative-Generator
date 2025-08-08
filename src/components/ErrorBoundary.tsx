import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className={cn(
            "w-16 h-16 rounded-2xl mb-6",
            "bg-red-100 flex items-center justify-center"
          )}>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="font-display font-semibold text-xl text-foreground mb-2">
            Algo deu errado
          </h2>
          
          <p className="text-muted-foreground text-center mb-6 max-w-md">
            Ocorreu um erro inesperado. Tente recarregar a página ou entre em contato com o suporte se o problema persistir.
          </p>
          
          <button
            onClick={this.handleRetry}
            className={cn(
              "btn-neumorphic flex items-center space-x-2",
              "hover:scale-[1.02] active:scale-[0.98]",
              "transition-all duration-200"
            )}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Tentar Novamente</span>
          </button>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200 max-w-2xl">
              <summary className="cursor-pointer font-medium text-red-800 mb-2">
                Detalhes do Erro (Desenvolvimento)
              </summary>
              <pre className="text-xs text-red-700 overflow-auto">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}