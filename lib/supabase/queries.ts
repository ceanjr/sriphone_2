// @ts-nocheck
/**
 * Supabase Queries
 * Funções reutilizáveis para consultas ao banco de dados
 */

import { supabase } from "./client";
import { compararProdutos } from "@/lib/data/product-order";
import type {
  Product,
  ProductWithCategory,
  ProductFilters,
  ProductPagination,
  ProductsResponse,
} from "@/lib/types/product";
import type { Category } from "@/lib/types/category";

/**
 * Busca todas as categorias ordenadas por campo 'ordem'
 */
export async function getCategorias(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("ordem", { ascending: true });

  if (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }

  return data || [];
}

/**
 * Busca produtos com filtros opcionais e paginação
 * @param filters - Filtros de busca (termo, categoria)
 * @param pagination - Configuração de paginação (offset, limit)
 * @returns Produtos e total de resultados
 */
export async function getProdutos(
  filters?: ProductFilters,
  pagination?: ProductPagination
): Promise<ProductsResponse> {
  let query = supabase
    .from("produtos")
    .select("*, categorias(*)", { count: "exact" })
    .eq("ativo", true);

  // Aplicar filtro de busca (termo)
  if (filters?.termo) {
    const termo = filters.termo.toLowerCase();
    query = query.or(
      `nome.ilike.%${termo}%,cor.ilike.%${termo}%,codigo.ilike.%${termo}%`
    );
  }

  // Aplicar filtro de categoria
  if (filters?.categoria_id) {
    query = query.eq("categoria_id", filters.categoria_id);
  }

  // Aplicar paginação
  const offset = pagination?.offset || 0;
  const limit = pagination?.limit || 35;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    return { produtos: [], total: 0 };
  }

  // Ordenar produtos usando a lógica customizada
  const produtosOrdenados = (data || []).sort((a: any, b: any) =>
    compararProdutos(a.nome, b.nome)
  );

  return {
    produtos: produtosOrdenados as ProductWithCategory[],
    total: count || 0,
  };
}

/**
 * Busca TODOS os produtos (incluindo inativos) para área administrativa
 * @param pagination - Configuração de paginação (offset, limit)
 * @returns Produtos e total de resultados
 */
export async function getProdutosAdmin(
  pagination?: ProductPagination
): Promise<ProductsResponse> {
  let query = supabase
    .from("produtos")
    .select("*, categorias(*)", { count: "exact" });

  // Aplicar paginação
  const offset = pagination?.offset || 0;
  const limit = pagination?.limit || 1000;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Erro ao buscar produtos (admin):", error);
    return { produtos: [], total: 0 };
  }

  // Ordenar produtos usando a lógica customizada
  const produtosOrdenados = (data || []).sort((a: any, b: any) =>
    compararProdutos(a.nome, b.nome)
  );

  return {
    produtos: produtosOrdenados as ProductWithCategory[],
    total: count || 0,
  };
}

/**
 * Busca um produto pelo ID
 * @param id - ID do produto
 */
export async function getProdutoById(
  id: string
): Promise<ProductWithCategory | null> {
  const { data, error } = await supabase
    .from("produtos")
    .select("*, categorias(*)")
    .eq("id", id)
    .eq("ativo", true)
    .single();

  if (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }

  return data as ProductWithCategory;
}

/**
 * Busca um produto pelo código
 * @param codigo - Código único do produto
 */
export async function getProdutoByCodigo(
  codigo: string
): Promise<ProductWithCategory | null> {
  const { data, error } = await supabase
    .from("produtos")
    .select("*, categorias(*)")
    .eq("codigo", codigo)
    .eq("ativo", true)
    .single();

  if (error) {
    console.error("Erro ao buscar produto por código:", error);
    return null;
  }

  return data as ProductWithCategory;
}

/**
 * Busca produtos por categoria (slug da categoria)
 * @param categorySlug - Slug da categoria
 * @param pagination - Configuração de paginação
 */
export async function getProdutosByCategoria(
  categorySlug: string,
  pagination?: ProductPagination
): Promise<ProductsResponse> {
  // Primeiro buscar a categoria pelo slug
  const { data: categoria, error: categoriaError } = await supabase
    .from("categorias")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (categoriaError || !categoria) {
    console.error("Erro ao buscar categoria:", categoriaError);
    return { produtos: [], total: 0 };
  }

  // Buscar produtos dessa categoria
  return getProdutos(
    { categoria_id: categoria.id },
    pagination
  );
}

/**
 * Conta total de produtos ativos
 */
export async function contarProdutos(): Promise<number> {
  const { count, error } = await supabase
    .from("produtos")
    .select("*", { count: "exact", head: true })
    .eq("ativo", true);

  if (error) {
    console.error("Erro ao contar produtos:", error);
    return 0;
  }

  return count || 0;
}
