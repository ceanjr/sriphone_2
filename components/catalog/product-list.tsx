/**
 * Lista de Produtos
 * Layout em lista vertical sem imagens
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

  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle-dark bg-brand-gray-dark">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
