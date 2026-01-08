/**
 * Página de Listagem de Produtos
 * Lista todos os produtos com opções de editar, excluir e toggle ativo
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getCategorias, getProdutosAdmin } from '@/lib/supabase/queries';
import { ProductsContent } from '@/components/admin/products-content';

export const metadata: Metadata = {
  title: 'Produtos - Admin',
  description: 'Gerenciar produtos',
};

export default async function ProdutosPage() {
  const [categories, { produtos }] = await Promise.all([
    getCategorias(),
    getProdutosAdmin({ offset: 0, limit: 1000 }),
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary-dark">
            Produtos
          </h1>
          <p className="mt-2 text-text-secondary-dark">
            Gerencie o catálogo de produtos
          </p>
        </div>

        {/* New Product Button */}
        <Link
          href="/admin/produtos/novo"
          className="flex items-center gap-2 rounded-md bg-brand-light px-4 py-2 font-semibold text-text-primary-light transition-opacity hover:opacity-90"
        >
          <Plus className="h-5 w-5" />
          Adicionar
        </Link>
      </div>

      {/* Products Content with Filter */}
      <ProductsContent products={produtos} categories={categories} />
    </div>
  );
}
