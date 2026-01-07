/**
 * Página de Detalhes do Produto (Pública)
 * Mostra informações completas do produto
 * URL: /produto/[id]
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProdutoById } from "@/lib/supabase/queries";
import { ProductDetail } from "@/components/catalog/product-detail";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProdutoById(id);

  if (!product) {
    return {
      title: "Produto não encontrado - Sr. IPHONE",
    };
  }

  return {
    title: `${product.nome} - Sr. IPHONE`,
    description: product.descricao || `${product.nome} ${product.cor}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProdutoById(id);

  if (!product || !product.ativo) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-brand-dark">
        <ProductDetail product={product} />
      </div>
      <Footer />
    </>
  );
}
