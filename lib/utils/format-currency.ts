/**
 * Formata um valor numérico para moeda brasileira (BRL)
 * @param value - Valor a ser formatado
 * @returns String formatada (ex: "R$ 1.749,00")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Formata um valor numérico para moeda brasileira sem símbolo
 * @param value - Valor a ser formatado
 * @returns String formatada (ex: "1.749,00")
 */
export function formatCurrencyWithoutSymbol(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
