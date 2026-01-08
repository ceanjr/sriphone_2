/**
 * Lista de Produtos
 * Layout em lista vertical sem imagens
 * Agrupa produtos por categoria
 */

import type { ProductWithCategory } from "@/lib/types/product";
import { ProductListItem } from "./product-list-item";

interface ProductListProps {
  products: ProductWithCategory[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-text-muted-dark">Nenhum produto encontrado.</p>
      </div>
    );
  }

  // Agrupar produtos por categoria
  const groupedProducts = products.reduce((acc, product) => {
    const categoryName = product.categorias?.nome || "Sem categoria";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {} as Record<string, ProductWithCategory[]>);

  // Ordenar categorias (pode personalizar a ordem aqui)
  const sortedCategories = Object.keys(groupedProducts).sort();

  return (
    <div className="space-y-12">
      {sortedCategories.map((categoryName) => (
        <div key={categoryName}>
          {/* Título da Categoria */}
          <h2 className="mb-6 text-2xl font-bold text-text-primary-dark border-b border-border-subtle-dark pb-2">
            {categoryName}
          </h2>

          {/* Lista de Produtos da Categoria */}
          <div className="overflow-hidden rounded-lg border border-border-subtle-dark bg-brand-gray-dark">
            {groupedProducts[categoryName].map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
