/**
 * Grid de Produtos
 * Layout em grade responsivo (1 coluna mobile → 4 colunas desktop)
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

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );
}
