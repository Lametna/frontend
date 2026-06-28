import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from './button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-destructive/20 flex items-center justify-center mb-8 text-destructive animate-pulse">
            <AlertTriangle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Something went wrong</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            The application encountered an unexpected error. Please refresh the page to continue.
          </p>
          <div className="bg-secondary/50 p-4 rounded-xl text-left text-sm font-mono text-muted-foreground w-full max-w-xl overflow-auto mb-8 border border-border/50 max-h-48">
            {this.state.error?.message}
          </div>
          <Button size="lg" className="h-14 px-8 rounded-2xl gap-3 shadow-lg" onClick={() => window.location.reload()}>
            <RotateCcw className="w-5 h-5" /> Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
