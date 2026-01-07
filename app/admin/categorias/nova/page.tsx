/**
 * Página de Nova Categoria
 * Formulário para criar uma nova categoria
 */

import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CategoryForm } from "@/components/admin/category-form";

export const metadata: Metadata = {
  title: "Nova Categoria - Admin",
  description: "Criar nova categoria",
};

export default function NovaCategoriaPage() {
  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/categorias"
        className="inline-flex items-center gap-2 text-sm text-text-secondary-dark hover:text-text-primary-dark"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar para Categorias
      </Link>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary-dark">
          Nova Categoria
        </h1>
        <p className="mt-2 text-text-secondary-dark">
          Preencha os dados da nova categoria
        </p>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-6">
        <CategoryForm />
      </div>
    </div>
  );
}
