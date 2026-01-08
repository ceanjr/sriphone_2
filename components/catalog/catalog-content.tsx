/**
 * Catalog Content (Client Component)
 * Gerencia o estado e lógica da página de catálogo
 * - Busca com debounce
 * - Filtro por categoria
 * - Toggle de visualização (Grid/Lista)
 * - Infinite scroll (35 produtos por vez)
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import type { Category } from '@/lib/types/category';
import type { ProductWithCategory } from '@/lib/types/product';
import { getProdutos } from '@/lib/supabase/queries';
import { SearchBar } from './search-bar';
import { CategoryFilter } from './category-filter';
import { ViewToggle, type ViewMode } from './view-toggle';
import { ProductGrid } from './product-grid';
import { ProductList } from './product-list';

interface CatalogContentProps {
  initialProducts: ProductWithCategory[];
  initialTotal: number;
  categories: Category[];
}

const PRODUCTS_PER_PAGE = 35;

export function CatalogContent({
  initialProducts,
  initialTotal,
  categories,
}: CatalogContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] =
    useState<ProductWithCategory[]>(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    () => searchParams.get('categoria') || null
  );
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    // Carregar preferência salva do localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('catalog-view-mode');
      return (saved as ViewMode) || 'grid';
    }
    return 'grid';
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialTotal > PRODUCTS_PER_PAGE);

  // Filter categories with products
  const categoriesWithProducts = categories.filter((category) => {
    const count = initialProducts.filter((p) => p.categoria_id === category.id).length;
    return count > 0;
  });

  // Salvar preferência de visualização no localStorage
  useEffect(() => {
    localStorage.setItem('catalog-view-mode', viewMode);
  }, [viewMode]);

  // Intersection Observer para infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  // Função para buscar produtos
  const fetchProducts = useCallback(
    async (offset: number, append: boolean = false) => {
      setLoading(true);
      try {
        const { produtos, total: totalResults } = await getProdutos(
          {
            termo: searchTerm || undefined,
            categoria_id: selectedCategoryId || undefined,
          },
          {
            offset,
            limit: PRODUCTS_PER_PAGE,
          }
        );

        if (append) {
          setProducts((prev) => [...prev, ...produtos]);
        } else {
          setProducts(produtos);
        }

        setTotal(totalResults);
        setHasMore(offset + PRODUCTS_PER_PAGE < totalResults);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, selectedCategoryId]
  );

  // Handle category change with URL update
  const handleCategoryChange = useCallback((categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
    // Update URL params without scroll
    const url = categoryId ? `/catalogo?categoria=${categoryId}` : '/catalogo';
    window.history.pushState({}, '', url);
  }, []);

  // Resetar e buscar quando filtros mudarem
  useEffect(() => {
    setPage(1);
    fetchProducts(0, false);
  }, [searchTerm, selectedCategoryId, fetchProducts]);

  // Carregar mais produtos quando scroll chegar ao fim
  useEffect(() => {
    if (inView && hasMore && !loading) {
      const newPage = page + 1;
      setPage(newPage);
      fetchProducts((newPage - 1) * PRODUCTS_PER_PAGE, true);
    }
  }, [inView, hasMore, loading, page, fetchProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filtros e Controles */}
      <div className="mb-8 space-y-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CategoryFilter
            categories={categoriesWithProducts}
            selectedCategoryId={selectedCategoryId}
            onChange={handleCategoryChange}
          />

          <ViewToggle view={viewMode} onChange={setViewMode} />
        </div>

        {/* Total de resultados - APENAS quando houver produtos */}
        {total > 0 && (
          <div className="text-sm text-text-secondary-dark">
            <span className="font-semibold">{total}</span>{' '}
            {total === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </div>
        )}
      </div>

      {/* Produtos */}
      <div className="mb-8">
        {viewMode === 'grid' ? (
          <ProductGrid products={products} />
        ) : (
          <ProductList products={products} />
        )}
      </div>

      {/* Loading Indicator para Infinite Scroll */}
      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {loading && (
            <div className="flex items-center gap-2 text-text-secondary-dark">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Carregando mais produtos...</span>
            </div>
          )}
        </div>
      )}

      {/* Fim dos resultados */}
      {!hasMore && products.length > 0 && (
        <div className="py-8 text-center text-sm text-text-muted-dark">
          Todos os produtos foram carregados
        </div>
      )}
    </div>
  );
}
