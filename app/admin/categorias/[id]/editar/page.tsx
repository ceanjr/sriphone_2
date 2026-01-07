/**
 * Página de Edição de Categoria
 * Formulário para editar uma categoria existente
 */

import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { CategoryForm } from "@/components/admin/category-form";
import type { Category } from "@/lib/types/category";

export const metadata: Metadata = {
  title: "Editar Categoria - Admin",
  description: "Editar categoria",
};

async function getCategory(id: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Category;
}

export default async function EditarCategoriaPage({
  params,
}: {
  params: { id: string };
}) {
  const category = await getCategory(params.id);

  if (!category) {
    notFound();
  }

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
          Editar Categoria
        </h1>
        <p className="mt-2 text-text-secondary-dark">
          Atualize os dados da categoria
        </p>
      </div>

      {/* Form */}
      <div className="rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-6">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
