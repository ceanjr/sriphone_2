/**
 * Extrai informações do nome do produto iPhone
 * Ex: "iPhone 15 Pro Max 256 GB - Branco" → { modelo: "iPhone 15 Pro Max", capacidade: "256 GB", cor: "Branco" }
 */

export interface iPhoneInfo {
  modelo: string | null;
  capacidade: string | null;
  cor: string | null;
  nomeCompleto: string;
}

/**
 * Extrai o modelo de iPhone do nome do produto
 * @param nome - Nome completo do produto
 * @returns Modelo extraído ou null
 */
export function extrairModeloFromNome(nome: string): string | null {
  // Padrão: captura tudo antes da capacidade (GB/TB)
  const match = nome.match(/^(iPhone\s+[\w\s]+?)(?=\s+\d+\s*(?:GB|TB))/i);
  return match ? match[1].trim() : null;
}

/**
 * Extrai a capacidade de armazenamento do nome do produto
 * @param nome - Nome completo do produto
 * @returns Capacidade extraída (ex: "256 GB") ou null
 */
export function extrairCapacidadeFromNome(nome: string): string | null {
  const match = nome.match(/(\d+\s*(?:GB|TB))/i);
  return match ? match[1] : null;
}

/**
 * Extrai a cor do nome do produto (após o hífen)
 * @param nome - Nome completo do produto
 * @returns Cor extraída ou null
 */
export function extrairCorFromNome(nome: string): string | null {
  const match = nome.match(/-\s*(.+)$/);
  return match ? match[1].trim() : null;
}

/**
 * Extrai todas as informações do nome do produto
 * @param nome - Nome completo do produto
 * @returns Objeto com modelo, capacidade e cor
 */
export function parseiPhoneName(nome: string): iPhoneInfo {
  return {
    modelo: extrairModeloFromNome(nome),
    capacidade: extrairCapacidadeFromNome(nome),
    cor: extrairCorFromNome(nome),
    nomeCompleto: nome,
  };
}
