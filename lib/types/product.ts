import type { Category } from "./category";

/**
 * Type para condição do produto
 */
export type ProductCondition = "novo" | "seminovo";

/**
 * Interface para Produto
 * Representa um iPhone disponível no catálogo
 */
export interface Product {
  id: string;
  codigo: string;
  nome: string;
  descricao: string | null;
  preco: number;
  condicao: ProductCondition;
  cor: string;
  bateria: number | null; // 0-100, apenas para seminovos
  categoria_id: string;
  imagens: string[]; // URLs do Cloudinary
  imagem_principal: string | null;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Interface para Produto com Categoria (join)
 * Usado em queries que incluem dados da categoria
 */
export interface ProductWithCategory extends Product {
  categoria?: Category;  // Legacy field name
  categorias?: Category; // Actual field name returned by Supabase
}

/**
 * Type para criação de novo produto (sem campos auto-gerados)
 */
export type ProductInsert = Omit<Product, "id" | "created_at" | "updated_at">;

/**
 * Type para atualização de produto (campos opcionais)
 */
export type ProductUpdate = Partial<ProductInsert>;

/**
 * Type para filtros de busca de produtos
 */
export interface ProductFilters {
  searchTerm?: string;
  termo?: string;
  categoryId?: string;
  categoria_id?: string;
  condicao?: ProductCondition;
  ativo?: boolean;
}

/**
 * Type para paginação de produtos
 */
export interface ProductPagination {
  page?: number;
  pageSize?: number;
  offset?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

/**
 * Type para resposta paginada de produtos
 */
export interface ProductsResponse {
  produtos: ProductWithCategory[];
  total: number;
}
