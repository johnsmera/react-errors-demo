"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/card";
import ErrorBoundary from "@/components/error-boundary";
import { generateList, willItemFail } from "@/lib/random";

const LIST_SIZE = 10;

export default function Home() {

  const [listKey, setListKey] = useState(0);
  const [retries, setRetries] = useState<Record<number, number>>({});

  const items = useMemo(
    () => generateList(LIST_SIZE, listKey),
    [listKey]
  );

  const handleRetryItem = (id: number) => {
    setRetries((r) => ({ ...r, [id]: (r[id] ?? 0) + 1 }));
  };

  const handleReloadList = () => {
    setListKey((k) => k + 1);
    setRetries({});
  };

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Tratamento de Erros
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Listagem onde alguns itens falham ao carregar; o sistema se recupera por item.
          </p>
        </div>
      </header>

      <section className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="grid gap-4 sm:gap-5">
          {items.map((item) => {
            const retryCount = retries[item.id] ?? 0;
            const shouldError = willItemFail(listKey, item.id, retryCount);
            const boundaryKey = `${listKey}-${item.id}-${retryCount}`;

            return (
              <ErrorBoundary
                key={boundaryKey}
                itemLabel={item.title}
                onRetry={() => handleRetryItem(item.id)}
              >
                <Card item={item} shouldError={shouldError} />
              </ErrorBoundary>
            );
          })}
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/50 p-4 sm:p-5">
          <h2 className="text-sm font-medium text-[var(--foreground)] mb-3">
            Controles
          </h2>
          <p className="text-sm text-[var(--muted)] mb-3">
            Recarregar gera uma nova &quot;requisição&quot;: outros itens podem falhar ou passar. Em cada card com erro, &quot;Tentar novamente&quot; aumenta a chance de sucesso (simulando retry).
          </p>
          <button
            type="button"
            onClick={handleReloadList}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--btn-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)] transition-colors"
          >
            Recarregar listagem
          </button>
        </div>
      </section>
    </main>
  );
}
