"use client";

import ErrorBoundary from "@/components/error-boundary";
import { ClientError } from "./components/client-error";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const router = useRouter();

  return (
    <ErrorBoundary
      onRetry={() => {
        router.refresh();
      }}
    >
      <ClientError />
    </ErrorBoundary>
  );
}
