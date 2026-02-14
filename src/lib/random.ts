/**
 * Simula falha aleatória por item (determinística por seed + index + retry).
 * Mais retries reduzem a chance de falha, simulando recuperação.
 */
export function willItemFail(
  seed: number,
  index: number,
  retryCount: number
): boolean {
  const hash = (seed + 1) * 31 + index * 17 + retryCount * 7;
  const roll = Math.abs(hash) % 100;
  const threshold = Math.max(0, 28 - retryCount * 10);
  return roll < threshold;
}

const TITLES = [
  "Relatório Q4",
  "Dashboard de vendas",
  "Configuração de conta",
  "Exportação de dados",
  "Integração API",
  "Backup automático",
  "Notificação por e-mail",
  "Relatório de acesso",
  "Sincronização",
  "Log de auditoria",
];

export type ListItem = {
  id: number;
  title: string;
  subtitle: string;
};

export function generateList(size: number, seed: number): ListItem[] {
  return Array.from({ length: size }, (_, i) => ({
    id: i,
    title: TITLES[i % TITLES.length],
    subtitle: `Item #${i + 1} · Carregado com seed ${seed}`,
  }));
}
