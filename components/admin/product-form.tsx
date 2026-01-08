// @ts-nocheck
"use client";

/**
 * Formulário de Produto
 * Cria ou edita produto com todos os campos necessários
 * Upload de imagens com Cloudinary
 */

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types/product";
import type { Category } from "@/lib/types/category";
import { Save, Loader2 } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { ColorPicker } from "./color-picker";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
}

interface UploadedImage {
  url: string;
  publicId: string;
  id: string;
}

// Format currency for display (1234.56 -> "R$ 1.234,56")
const formatCurrencyInput = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Parse currency display to number ("R$ 1.234,56" -> 1234.56)
const parseCurrencyInput = (value: string): number => {
  const cleaned = value.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
};

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!product;

  // Convert existing images to UploadedImage format for editing
  const existingImages: UploadedImage[] = product
    ? [
        ...(product.imagem_principal
          ? [
              {
                url: product.imagem_principal,
                publicId: "",
                id: `existing-0`,
              },
            ]
          : []),
        ...(product.imagens || []).map((url, index) => ({
          url,
          publicId: "",
          id: `existing-${index + 1}`,
        })),
      ]
    : [];

  // Form state
  const [codigo, setCodigo] = useState(product?.codigo || "");
  const [nome, setNome] = useState(product?.nome || "");
  const [descricao, setDescricao] = useState(product?.descricao || "");
  const [preco, setPreco] = useState(product?.preco || 0);
  const [precoDisplay, setPrecoDisplay] = useState(
    product?.preco ? formatCurrencyInput(product.preco) : "R$ 0,00"
  );
  const [condicao, setCondicao] = useState<"novo" | "seminovo">(
    product?.condicao || "novo"
  );
  const [cor, setCor] = useState(product?.cor || "");
  const [bateria, setBateria] = useState<number | null>(
    product?.bateria ?? null
  );
  const [categoriaId, setCategoriaId] = useState(
    product?.categoria_id || ""
  );
  const [images, setImages] = useState<UploadedImage[]>(existingImages);
  const [ativo, setAtivo] = useState(product?.ativo ?? true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track uploaded images for cleanup on cancel
  const uploadedImageIdsRef = useRef<string[]>([]);

  useEffect(() => {
    // Track newly uploaded images (not existing ones)
    const newImageIds = images
      .filter((img) => !img.id.startsWith("existing-") && img.publicId)
      .map((img) => img.publicId);
    uploadedImageIdsRef.current = newImageIds;
  }, [images]);

  // Handle price field focus - clear if value is 0
  const handlePrecoFocus = () => {
    if (preco === 0) {
      setPrecoDisplay("");
    }
  };

  // Handle price field blur - format and update
  const handlePrecoBlur = () => {
    if (precoDisplay.trim() === "") {
      setPreco(0);
      setPrecoDisplay("R$ 0,00");
    } else {
      const numericValue = parseCurrencyInput(precoDisplay);
      setPreco(numericValue);
      setPrecoDisplay(formatCurrencyInput(numericValue));
    }
  };

  // Handle price field change
  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrecoDisplay(value);
  };

  // Cleanup function to delete uploaded images if form is cancelled
  const cleanupUploadedImages = async () => {
    const imagesToDelete = uploadedImageIdsRef.current;
    if (imagesToDelete.length === 0) return;

    try {
      await Promise.all(
        imagesToDelete.map((publicId) =>
          fetch("/api/upload", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId }),
          })
        )
      );
    } catch (error) {
      console.error("Error cleaning up images:", error);
    }
  };

  // Handle beforeunload to cleanup images
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (uploadedImageIdsRef.current.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleCancel = async () => {
    if (uploadedImageIdsRef.current.length > 0) {
      if (
        !confirm(
          "Ao cancelar, as imagens enviadas serão removidas. Deseja continuar?"
        )
      ) {
        return;
      }
      await cleanupUploadedImages();
    }
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validation
      if (!nome.trim()) throw new Error("Nome é obrigatório");
      if (preco <= 0) throw new Error("Preço deve ser maior que zero");
      if (!categoriaId) throw new Error("Categoria é obrigatória");

      // Validate images
      if (images.length === 0) {
        throw new Error("Pelo menos 1 imagem é obrigatória");
      }
      if (images.length > 5) {
        throw new Error("Máximo de 5 imagens permitido");
      }

      // Validate bateria based on condicao
      if (condicao === "seminovo" && (bateria === null || bateria <= 0)) {
        throw new Error("Bateria é obrigatória para produtos seminovos");
      }

      // First image is the main image, rest are additional
      const [mainImage, ...additionalImages] = images;

      const productData = {
        codigo: codigo.trim() || null,
        nome: nome.trim(),
        descricao: descricao.trim() || null,
        preco,
        condicao,
        cor: cor.trim() || null,
        bateria: condicao === "novo" ? null : bateria,
        categoria_id: categoriaId,
        imagens: additionalImages.map((img) => img.url),
        imagem_principal: mainImage.url,
        ativo,
      };

      if (isEditing) {
        // Update existing product
        const { error: updateError } = await supabase
          .from("produtos")
          .update(productData)
          .eq("id", product.id);

        if (updateError) throw updateError;
      } else {
        // Create new product
        const { error: insertError } = await supabase
          .from("produtos")
          .insert([productData]);

        if (insertError) throw insertError;
      }

      // Clear the uploaded images ref since they're now saved
      uploadedImageIdsRef.current = [];

      // Redirect to products list
      router.push("/admin/produtos");
      router.refresh();
    } catch (err: any) {
      console.error("Error saving product:", err);

      // Check for constraint violations
      if (err.code === "23514") {
        setError("Erro de validação: verifique bateria e condição.");
      } else {
        setError(err.message || "Erro ao salvar produto.");
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

      {/* Image Upload - First Field */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary-dark">
          Imagens do Produto *
        </label>
        <ImageUploader images={images} onChange={setImages} maxImages={5} />
        <p className="mt-2 text-xs text-text-muted-dark">
          Mínimo 1, máximo 5 imagens. A primeira imagem será a principal.
        </p>
      </div>

      {/* Grid Layout for Fields */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Nome */}
        <div>
          <label
            htmlFor="nome"
            className="mb-2 block text-sm font-medium text-text-primary-dark"
          >
            Nome *
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark placeholder-text-muted-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
            placeholder="iPhone 15 Pro Max 256GB"
          />
        </div>

        {/* Código */}
        <div>
          <label
            htmlFor="codigo"
            className="mb-2 block text-sm font-medium text-text-primary-dark"
          >
            Código
          </label>
          <input
            id="codigo"
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark placeholder-text-muted-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
            placeholder="IP15PM-256-PRE"
          />
        </div>

        {/* Preço */}
        <div>
          <label
            htmlFor="preco"
            className="mb-2 block text-sm font-medium text-text-primary-dark"
          >
            Preço *
          </label>
          <input
            id="preco"
            type="text"
            value={precoDisplay}
            onChange={handlePrecoChange}
            onFocus={handlePrecoFocus}
            onBlur={handlePrecoBlur}
            required
            className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark placeholder-text-muted-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
            placeholder="R$ 5.999,99"
          />
        </div>

        {/* Categoria */}
        <div>
          <label
            htmlFor="categoria"
            className="mb-2 block text-sm font-medium text-text-primary-dark"
          >
            Categoria *
          </label>
          <select
            id="categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Condição */}
        <div>
          <label
            htmlFor="condicao"
            className="mb-2 block text-sm font-medium text-text-primary-dark"
          >
            Condição *
          </label>
          <select
            id="condicao"
            value={condicao}
            onChange={(e) => setCondicao(e.target.value as "novo" | "seminovo")}
            className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
          >
            <option value="novo">Novo</option>
            <option value="seminovo">Seminovo</option>
          </select>
        </div>

        {/* Cor */}
        <ColorPicker
          productName={nome}
          value={cor}
          onChange={setCor}
        />

        {/* Bateria */}
        <div>
          <label
            htmlFor="bateria"
            className="mb-2 block text-sm font-medium text-text-primary-dark"
          >
            Bateria (%)
            {condicao === "seminovo" && (
              <span className="text-red-400"> *</span>
            )}
          </label>
          <input
            id="bateria"
            type="number"
            min="0"
            max="100"
            value={bateria || ""}
            onChange={(e) =>
              setBateria(e.target.value ? parseInt(e.target.value) : null)
            }
            disabled={condicao === "novo"}
            required={condicao === "seminovo"}
            className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark placeholder-text-muted-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={condicao === "novo" ? "N/A para novos" : "85"}
          />
          {condicao === "novo" && (
            <p className="mt-1 text-xs text-text-muted-dark">
              Bateria não aplicável para produtos novos
            </p>
          )}
        </div>

        {/* Ativo */}
        <div className="flex items-center">
          <input
            id="ativo"
            type="checkbox"
            checked={ativo}
            onChange={(e) => setAtivo(e.target.checked)}
            className="h-4 w-4 rounded border-border-subtle-dark bg-brand-dark text-brand-light focus:ring-brand-light"
          />
          <label
            htmlFor="ativo"
            className="ml-2 text-sm font-medium text-text-primary-dark"
          >
            Produto ativo (visível no catálogo)
          </label>
        </div>
      </div>

      {/* Descrição - Full Width */}
      <div>
        <label
          htmlFor="descricao"
          className="mb-2 block text-sm font-medium text-text-primary-dark"
        >
          Descrição
        </label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={4}
          className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark placeholder-text-muted-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
          placeholder="Descrição detalhada do produto..."
        />
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
              <span>{isEditing ? "Atualizar" : "Criar"} Produto</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          className="rounded-md border border-border-subtle-dark px-6 py-2 font-medium text-text-secondary-dark transition-colors hover:bg-border-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
