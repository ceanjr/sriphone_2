"use client";

/**
 * Formulário de Categoria
 * Cria ou edita categoria (apenas nome)
 * Slug é gerado automaticamente
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { Category } from "@/lib/types/category";
import { Save, Loader2 } from "lucide-react";

interface CategoryFormProps {
  category?: Category;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with -
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing -
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = !!category;

  const [nome, setNome] = useState(category?.nome || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validation
      if (!nome.trim()) {
        throw new Error("Nome é obrigatório");
      }

      const slug = generateSlug(nome);

      if (isEditing) {
        // Update existing category (nome and slug only)
        const { error: updateError } = await supabase
          .from("categorias")
          .update({ nome: nome.trim(), slug })
          .eq("id", category.id);

        if (updateError) throw updateError;
      } else {
        // Create new category - get max ordem + 1
        const { data: maxOrdemData } = await supabase
          .from("categorias")
          .select("ordem")
          .order("ordem", { ascending: false })
          .limit(1);

        const newOrdem = maxOrdemData && maxOrdemData.length > 0
          ? maxOrdemData[0].ordem + 1
          : 0;

        const { error: insertError } = await supabase
          .from("categorias")
          .insert([{ nome: nome.trim(), slug, ordem: newOrdem }]);

        if (insertError) throw insertError;
      }

      // Redirect to categories list
      router.push("/admin/categorias");
      router.refresh();
    } catch (err: any) {
      console.error("Error saving category:", err);

      // Check for unique constraint violations
      if (err.code === "23505") {
        if (err.message.includes("nome")) {
          setError("Já existe uma categoria com este nome.");
        } else if (err.message.includes("slug")) {
          setError("Já existe uma categoria com este slug.");
        } else {
          setError("Erro: dados duplicados.");
        }
      } else {
        setError(err.message || "Erro ao salvar categoria.");
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Nome Field */}
      <div>
        <label
          htmlFor="nome"
          className="mb-2 block text-sm font-medium text-text-primary-dark"
        >
          Nome da Categoria *
        </label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          autoFocus
          className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark placeholder-text-muted-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
          placeholder="iPhone 15 Pro Max"
        />
        <p className="mt-1 text-xs text-text-muted-dark">
          Ex: iPhone 15 Pro, iPhone 14, iPhone 13 Pro Max
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 border-t border-border-dark pt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-md bg-brand-light px-6 py-2 font-semibold text-text-primary-light transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Salvando...</span>
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              <span>{isEditing ? "Atualizar" : "Criar"} Categoria</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-md border border-border-subtle-dark px-6 py-2 font-medium text-text-secondary-dark transition-colors hover:bg-border-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
