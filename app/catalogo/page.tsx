/**
 * Página do Catálogo (/catalogo)
 * Server Component que busca dados iniciais e renderiza o catálogo
 */

import { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { CatalogHero } from '@/components/catalog/hero';
import { CatalogContent } from '@/components/catalog/catalog-content';
import { getCategorias, getProdutos } from '@/lib/supabase/queries';

export const metadata: Metadata = {
  title: 'Catálogo de iPhones | SriPhone',
  description:
    'Explore nosso catálogo completo de iPhones novos e seminovos com garantia de qualidade',
};

export default async function CatalogoPage() {
  // Buscar categorias e produtos iniciais no servidor
  const [categories, { produtos: initialProducts, total: initialTotal }] =
    await Promise.all([
      getCategorias(),
      getProdutos(undefined, { offset: 0, limit: 35 }),
    ]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-brand-dark">
        <CatalogHero />
        <CatalogContent
          initialProducts={initialProducts}
          initialTotal={initialTotal}
          categories={categories}
        />
      </div>
      <Footer />
    </>
  );
}
