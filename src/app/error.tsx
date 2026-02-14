"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--background)]">
      <div className="max-w-md w-full rounded-2xl border border-[var(--border)] bg-[var(--muted-bg)]/50 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--destructive-bg)] text-[var(--destructive)]" aria-hidden>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Algo deu errado
          </h2>
        </div>
        <p className="text-sm text-[var(--muted)] mb-6">
          Ocorreu um erro neste segmento. Você pode tentar novamente ou navegar para outra página.
        </p>
        <button
          type="button"
          onClick={reset}
          className="w-full rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-4 py-3 text-sm font-medium hover:bg-[var(--btn-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
