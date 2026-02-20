import { Component, ErrorInfo, ReactNode, startTransition } from "react";

interface Props {
  children?: ReactNode;
  onRetry?: () => void;
  itemLabel?: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    startTransition(() => {
      this.setState({ hasError: false });
      
      this.props.onRetry?.();
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-[var(--destructive)]/50 bg-[var(--destructive-bg)] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--destructive)]/10 text-[var(--destructive)]" aria-hidden>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                {this.props.itemLabel ? `Falha ao carregar: ${this.props.itemLabel}` : "Ocorreu um erro neste componente"}
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Este item falhou na listagem. Os demais continuam visíveis. Tente novamente ou recarregue a listagem.
              </p>
              <button
                type="button"
                onClick={this.handleRetry}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--btn-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--destructive-bg)] transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
