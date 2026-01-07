/**
 * Constantes para ordenação de produtos no catálogo
 * Ordem: modelo (básico → avançado) + capacidade (menor → maior)
 */

/**
 * Ordem de modelos de iPhone (do mais básico ao mais avançado)
 * Usada para ordenar produtos dentro de uma mesma série
 */
export const ORDEM_MODELOS = [
  'iPhone 7',
  'iPhone 7 Plus',
  'iPhone 8',
  'iPhone 8 Plus',
  'iPhone X',
  'iPhone XR',
  'iPhone XS',
  'iPhone XS Max',
  'iPhone SE (2ª ger.)',
  'iPhone 11',
  'iPhone 11 Pro',
  'iPhone 11 Pro Max',
  'iPhone 12',
  'iPhone 12 Mini',
  'iPhone 12 Pro',
  'iPhone 12 Pro Max',
  'iPhone SE (3ª ger.)',
  'iPhone 13',
  'iPhone 13 Mini',
  'iPhone 13 Pro',
  'iPhone 13 Pro Max',
  'iPhone 14',
  'iPhone 14 Plus',
  'iPhone 14 Pro',
  'iPhone 14 Pro Max',
  'iPhone 15',
  'iPhone 15 Plus',
  'iPhone 15 Pro',
  'iPhone 15 Pro Max',
  'iPhone 16',
  'iPhone 16 Plus',
  'iPhone 16 Pro',
  'iPhone 16 Pro Max',
  'iPhone 17',
  'iPhone 17 Air',
  'iPhone 17 Pro',
  'iPhone 17 Pro Max',
] as const;

/**
 * Ordem de capacidades de armazenamento (do menor ao maior)
 */
export const ORDEM_CAPACIDADES = [
  '16GB',
  '32GB',
  '64GB',
  '128GB',
  '256GB',
  '512GB',
  '1TB',
  '2TB',
] as const;

/**
 * Type para modelos de iPhone
 */
export type ModeloIPhone = (typeof ORDEM_MODELOS)[number];

/**
 * Type para capacidades de armazenamento
 */
export type CapacidadeArmazenamento = (typeof ORDEM_CAPACIDADES)[number];

/**
 * Extrai o modelo de iPhone de um nome de produto
 * Ex: "iPhone 15 Pro Max 256 GB - Branco" → "iPhone 15 Pro Max"
 * @param nomeProduto Nome completo do produto
 * @returns Modelo extraído ou null se não encontrado
 */
export function extrairModelo(nomeProduto: string): string | null {
  const nomeNormalizado = nomeProduto.trim();

  // Tentar match exato com cada modelo na ordem
  for (const modelo of ORDEM_MODELOS) {
    if (nomeNormalizado.startsWith(modelo)) {
      return modelo;
    }
  }

  return null;
}

/**
 * Extrai a capacidade de armazenamento de um nome de produto
 * Ex: "iPhone 15 Pro Max 256 GB - Branco" → "256GB"
 * @param nomeProduto Nome completo do produto
 * @returns Capacidade extraída ou null se não encontrada
 */
export function extrairCapacidade(nomeProduto: string): string | null {
  const nomeNormalizado = nomeProduto.toUpperCase().replace(/\s+/g, '');

  // Buscar padrão de capacidade (ex: "256GB", "1TB")
  const match = nomeNormalizado.match(/(\d+(?:GB|TB))/);

  if (match) {
    const capacidadeEncontrada = match[1];
    // Verificar se está na lista de capacidades válidas
    const capacidadeValida = ORDEM_CAPACIDADES.find(
      (cap) => cap.toUpperCase() === capacidadeEncontrada
    );
    return capacidadeValida || null;
  }

  return null;
}

/**
 * Obtém o índice de ordenação de um modelo
 * @param modelo Nome do modelo
 * @returns Índice (menor = mais básico) ou 999 se não encontrado
 */
export function getIndiceModelo(modelo: string): number {
  const indice = ORDEM_MODELOS.indexOf(modelo as ModeloIPhone);
  return indice === -1 ? 999 : indice;
}

/**
 * Obtém o índice de ordenação de uma capacidade
 * @param capacidade Capacidade de armazenamento
 * @returns Índice (menor = menor capacidade) ou 999 se não encontrada
 */
export function getIndiceCapacidade(capacidade: string): number {
  const indice = ORDEM_CAPACIDADES.indexOf(capacidade as CapacidadeArmazenamento);
  return indice === -1 ? 999 : indice;
}

/**
 * Compara dois produtos para ordenação
 * Ordem: modelo (básico → avançado) + capacidade (menor → maior)
 * @param produtoA Nome do primeiro produto
 * @param produtoB Nome do segundo produto
 * @returns Número negativo se A < B, positivo se A > B, 0 se iguais
 */
export function compararProdutos(produtoA: string, produtoB: string): number {
  const modeloA = extrairModelo(produtoA);
  const modeloB = extrairModelo(produtoB);

  // Comparar por modelo primeiro
  if (modeloA && modeloB) {
    const indiceModeloA = getIndiceModelo(modeloA);
    const indiceModeloB = getIndiceModelo(modeloB);

    if (indiceModeloA !== indiceModeloB) {
      return indiceModeloA - indiceModeloB;
    }
  }

  // Se mesmo modelo, comparar por capacidade
  const capacidadeA = extrairCapacidade(produtoA);
  const capacidadeB = extrairCapacidade(produtoB);

  if (capacidadeA && capacidadeB) {
    const indiceCapacidadeA = getIndiceCapacidade(capacidadeA);
    const indiceCapacidadeB = getIndiceCapacidade(capacidadeB);

    return indiceCapacidadeA - indiceCapacidadeB;
  }

  // Fallback: ordem alfabética
  return produtoA.localeCompare(produtoB);
}

/**
 * Extrai a série de um modelo de iPhone
 * Ex: "iPhone 15 Pro Max" → "iPhone 15"
 * @param modelo Nome do modelo
 * @returns Série do iPhone ou null
 */
export function extrairSerie(modelo: string): string | null {
  // Padrões especiais
  if (modelo.includes('SE')) return 'iPhone SE';
  if (modelo.includes('XR')) return 'iPhone XR';
  if (modelo.includes('XS')) return 'iPhone XS';
  if (modelo.includes('iPhone X') && !modelo.includes('XS') && !modelo.includes('XR')) {
    return 'iPhone X';
  }

  // Padrão numérico (ex: iPhone 15, iPhone 14)
  const match = modelo.match(/iPhone (\d+)/);
  if (match) {
    return `iPhone ${match[1]}`;
  }

  return null;
}
