/**
 * Grid de Produtos
 * Layout em grade responsivo (1 coluna mobile → 4 colunas desktop)
 * Agrupa produtos por categoria
 */

import type { ProductWithCategory } from "@/lib/types/product";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: ProductWithCategory[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-text-muted-dark">Nenhum produto encontrado.</p>
      </div>
    );
  }

  // Agrupar produtos por categoria
  const groupedProducts = products.reduce((acc, product) => {
    const categoryName = product.categoria?.nome || "Sem categoria";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {} as Record<string, ProductWithCategory[]>);

  // Ordenar categorias (pode personalizar a ordem aqui)
  const sortedCategories = Object.keys(groupedProducts).sort();

  let globalIndex = 0;

  return (
    <div className="space-y-12">
      {sortedCategories.map((categoryName) => (
        <div key={categoryName}>
          {/* Título da Categoria */}
          <h2 className="mb-6 text-2xl font-bold text-text-primary-dark border-b border-border-subtle-dark pb-2">
            {categoryName}
          </h2>

          {/* Grid de Produtos da Categoria */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groupedProducts[categoryName].map((product) => {
              const priority = globalIndex < 4;
              globalIndex++;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={priority}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
