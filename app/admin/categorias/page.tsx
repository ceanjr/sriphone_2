/**
 * Página de Listagem de Categorias
 * Lista todas as categorias com opções de editar e excluir
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getCategorias } from '@/lib/supabase/queries';
import { CategoryList } from '@/components/admin/category-list';

export const metadata: Metadata = {
  title: 'Categorias - Admin',
  description: 'Gerenciar categorias de produtos',
};

export default async function CategoriasPage() {
  const categories = await getCategorias();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary-dark">
            Categorias
          </h1>
          <p className="mt-2 text-text-secondary-dark">
            Gerencie as categorias de produtos
          </p>
        </div>

        {/* New Category Button */}
        <Link
          href="/admin/categorias/nova"
          className="flex items-center gap-2 rounded-md bg-brand-light px-4 py-2 font-semibold text-text-primary-light transition-opacity hover:opacity-90"
        >
          <Plus className="h-5 w-5" />
          Adicionar
        </Link>
      </div>

      {/* Category List */}
      <CategoryList categories={categories} />
    </div>
  );
}
