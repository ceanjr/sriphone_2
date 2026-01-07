/**
 * Página de Edição de Produto
 * Formulário para editar um produto existente
 */

import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getProdutoById } from "@/lib/supabase/queries";
import { getCategorias } from "@/lib/supabase/queries";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = {
  title: "Editar Produto - Admin",
  description: "Editar produto",
};

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProdutoById(id),
    getCategorias(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/produtos"
        className="inline-flex items-center gap-2 text-sm text-text-secondary-dark hover:text-text-primary-dark"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar para Produtos
      </Link>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary-dark">
          Editar Produto
        </h1>
        <p className="mt-2 text-text-secondary-dark">
          Atualize os dados do produto
        </p>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-6">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
