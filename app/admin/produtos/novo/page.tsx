/**
 * Página de Novo Produto
 * Formulário para criar um novo produto
 */

import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getCategorias } from "@/lib/supabase/queries";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = {
  title: "Novo Produto - Admin",
  description: "Criar novo produto",
};

export default async function NovoProdutoPage() {
  const categories = await getCategorias();

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
          Novo Produto
        </h1>
        <p className="mt-2 text-text-secondary-dark">
          Preencha os dados do novo produto
        </p>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
