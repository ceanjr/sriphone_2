/**
 * Filtro de Categoria
 * Dropdown para selecionar categoria (série de iPhone)
 */

"use client";

import { Filter } from "lucide-react";
import type { Category } from "@/lib/types/category";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onChange: (categoryId: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategoryId,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="relative">
      <Filter className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted-dark" />
      <select
        value={selectedCategoryId || ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="w-full appearance-none rounded-lg border border-border-subtle-dark bg-brand-gray-dark py-3 pl-10 pr-10 text-sm text-text-primary-dark transition-colors focus:border-brand-light focus:outline-none focus:ring-2 focus:ring-brand-light/20 md:w-auto"
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
  );
}
