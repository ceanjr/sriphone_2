"use client";

/**
 * Admin Products Content (Client Component)
 * Gerencia o filtro de categoria na página de produtos admin
 */

import { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import type { Category } from "@/lib/types/category";
import type { ProductWithCategory } from "@/lib/types/product";
import { ProductListAdmin } from "./product-list-admin";

interface ProductsContentProps {
  products: ProductWithCategory[];
  categories: Category[];
}

export function ProductsContent({
  products,
  categories,
}: ProductsContentProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId || selectedCategoryId === "") {
      return products;
    }
    return products.filter((p) => p.categoria_id === selectedCategoryId);
  }, [products, selectedCategoryId]);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted-dark" />
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full appearance-none rounded-lg border border-border-subtle-dark bg-brand-gray-dark py-2.5 pl-10 pr-10 text-sm text-text-primary-dark transition-colors focus:border-brand-light focus:outline-none focus:ring-2 focus:ring-brand-light/20"
          >
            <option value="">Todas as Categorias</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="h-5 w-5 text-text-muted-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Results count */}
        {filteredProducts.length > 0 && (
          <div className="text-sm text-text-secondary-dark">
            <span className="font-semibold">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "produto" : "produtos"}
          </div>
        )}
      </div>

      {/* Product List */}
      <ProductListAdmin products={filteredProducts} />
    </div>
  );
}
