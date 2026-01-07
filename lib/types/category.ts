/**
 * Interface para Categoria de Produtos
 * Representa um modelo de iPhone (ex: iPhone 12, iPhone 14 Pro)
 */
export interface Category {
  id: string;
  nome: string;
  slug: string;
  ordem: number;
  created_at: string;
  updated_at: string;
}

/**
 * Type para criação de nova categoria (sem campos auto-gerados)
 */
export type CategoryInsert = Omit<Category, "id" | "created_at" | "updated_at">;

/**
 * Type para atualização de categoria (campos opcionais)
 */
export type CategoryUpdate = Partial<CategoryInsert>;
