import { useEffect } from "react";
import type { ListItem } from "@/lib/random";

type CardProps = {
  item: ListItem;
  shouldError: boolean;
};

export const Card = ({ item, shouldError }: CardProps) => {
  useEffect(() => {
    if (shouldError) {
      throw new Error(`Falha ao carregar "${item.title}" (simulação)`);
    }
  }, [shouldError, item.title]);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]/30 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--foreground)]" aria-hidden>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[var(--foreground)] truncate">
            {item.title}
          </h3>
          <p className="text-sm text-[var(--muted)] truncate mt-0.5">
            {item.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
