"use client";

/**
 * Lista de Produtos Admin
 * Permite editar, excluir e toggle ativo/inativo
 */

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import type { ProductWithCategory } from "@/lib/types/product";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils/format-currency";

interface ProductListAdminProps {
  products: ProductWithCategory[];
}

export function ProductListAdmin({
  products,
}: ProductListAdminProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir o produto "${nome}"?`)) {
      return;
    }

    setDeleting(id);

    try {
      const { error } = await supabase.from("produtos").delete().eq("id", id);

      if (error) throw error;

      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Erro ao excluir produto. Tente novamente.");
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setToggling(id);

    try {
      const { error } = await supabase
        .from("produtos")
        .update({ ativo: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      router.refresh();
    } catch (error) {
      console.error("Error toggling product status:", error);
      alert("Erro ao atualizar status do produto. Tente novamente.");
    } finally {
      setToggling(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-12 text-center">
        <p className="text-text-muted-dark">
          Nenhum produto cadastrado. Crie seu primeiro produto!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle-dark bg-brand-gray-dark">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border-dark bg-border-dark">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary-dark">
                Imagem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary-dark">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary-dark">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary-dark">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary-dark">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-secondary-dark">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-border-dark"
              >
                <td className="px-6 py-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded bg-border-dark">
                    {product.imagem_principal || product.imagens[0] ? (
                      <Image
                        src={product.imagem_principal || product.imagens[0]}
                        alt={product.nome}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-text-muted-dark">
                        N/A
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-text-secondary-dark">
                    {product.codigo}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-text-primary-dark">
                      {product.nome}
                    </p>
                    <p className="text-xs text-text-muted-dark capitalize">
                      {product.cor} • {product.condicao}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-text-primary-dark">
                    {formatCurrency(product.preco)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleToggleActive(product.id, product.ativo)
                    }
                    disabled={toggling === product.id}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                      product.ativo
                        ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                        : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
                    }`}
                  >
                    {product.ativo ? (
                      <>
                        <Eye className="h-3 w-3" />
                        Ativo
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3 w-3" />
                        Inativo
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {/* Edit Button */}
                    <Link
                      href={`/admin/produtos/${product.id}/editar`}
                      className="rounded-md p-2 text-text-secondary-dark transition-colors hover:bg-border-subtle-dark hover:text-brand-light"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(product.id, product.nome)}
                      disabled={deleting === product.id}
                      className="rounded-md p-2 text-text-secondary-dark transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
