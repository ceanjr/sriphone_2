// @ts-nocheck
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
      // Buscar produto para pegar os publicIds das imagens
      const { data: product } = await supabase
        .from("produtos")
        .select("imagens, imagem_principal")
        .eq("id", id)
        .single();

      // Deletar produto do banco
      const { error } = await supabase.from("produtos").delete().eq("id", id);

      if (error) throw error;

      // Coletar todas as URLs de imagens (imagens + imagem_principal)
      const allImageUrls: string[] = [];

      if (product?.imagens && product.imagens.length > 0) {
        allImageUrls.push(...product.imagens);
      }

      if (product?.imagem_principal && !allImageUrls.includes(product.imagem_principal)) {
        allImageUrls.push(product.imagem_principal);
      }

      // Deletar imagens do Cloudinary
      if (allImageUrls.length > 0) {
        console.log('🗑️ Deletando imagens do Cloudinary:', allImageUrls.length);

        for (const imageUrl of allImageUrls) {
          try {
            // Extrair publicId da URL do Cloudinary
            // URL format: https://res.cloudinary.com/CLOUD_NAME/image/upload/VERSION/sriphone/products/IMAGE_ID.ext
            const match = imageUrl.match(/\/v\d+\/(.+?)(?:\.[^.]+)?$/);
            if (match) {
              let publicId = match[1]; // Ex: sriphone/products/abc123
              // Remover extensão se houver
              publicId = publicId.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
              console.log('Deletando imagem:', publicId);

              const response = await fetch("/api/upload", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ publicId }),
              });

              if (!response.ok) {
                console.error('Erro ao deletar imagem:', await response.text());
              } else {
                console.log('✅ Imagem deletada com sucesso');
              }
            } else {
              console.warn('URL não corresponde ao padrão esperado:', imageUrl);
            }
          } catch (imgError) {
            console.error("Error deleting image from Cloudinary:", imgError);
          }
        }
      }

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
    <>
      {/* Desktop Table View */}
      <div className="hidden overflow-hidden rounded-lg border border-border-subtle-dark bg-brand-gray-dark md:block">
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

      {/* Mobile Cards View */}
      <div className="space-y-4 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-4"
          >
            {/* Product Header with Image and Info */}
            <div className="flex gap-4">
              {/* Image */}
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-border-dark">
                {product.imagem_principal || product.imagens[0] ? (
                  <Image
                    src={product.imagem_principal || product.imagens[0]}
                    alt={product.nome}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-text-muted-dark">
                    N/A
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-mono text-text-secondary-dark">
                  Cód: {product.codigo}
                </p>
                <h3 className="mt-1 font-semibold text-text-primary-dark">
                  {product.nome}
                </h3>
                <p className="mt-1 text-sm text-text-muted-dark capitalize">
                  {product.cor} • {product.condicao}
                </p>
                <p className="mt-2 text-xl font-bold text-text-primary-dark">
                  {formatCurrency(product.preco)}
                </p>
              </div>
            </div>

            {/* Actions Row */}
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-border-dark pt-4">
              {/* Status Button */}
              <button
                onClick={() => handleToggleActive(product.id, product.ativo)}
                disabled={toggling === product.id}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  product.ativo
                    ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                    : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
                }`}
              >
                {product.ativo ? (
                  <>
                    <Eye className="h-4 w-4" />
                    Ativo
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Inativo
                  </>
                )}
              </button>

              {/* Edit and Delete Buttons */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/produtos/${product.id}/editar`}
                  className="flex items-center gap-1 rounded-md bg-brand-light/10 px-3 py-2 text-sm font-medium text-brand-light transition-colors hover:bg-brand-light/20"
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(product.id, product.nome);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (deleting !== product.id) {
                      handleDelete(product.id, product.nome);
                    }
                  }}
                  disabled={deleting === product.id}
                  className="rounded-md p-2 text-text-secondary-dark transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Excluir"
                  style={{ touchAction: 'manipulation' }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
