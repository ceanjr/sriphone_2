/**
 * Gera um slug a partir de um texto
 * @param text - Texto para gerar slug
 * @returns Slug formatado
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with -
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing -
}
