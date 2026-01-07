/**
 * Card de Produto (Visualização Grid)
 * Exibe produto com imagem, badges, nome e preço
 */

import Image from 'next/image';
import Link from 'next/link';
import type { ProductWithCategory } from '@/lib/types/product';
import { BatteryBadge } from '@/components/badges/battery-badge';
import { ConditionBadge } from '@/components/badges/condition-badge';
import { ColorBadge } from './color-badge';
import { formatCurrency } from '@/lib/utils/format-currency';
import { parseiPhoneName } from '@/lib/utils/parse-iphone-model';

interface ProductCardProps {
  product: ProductWithCategory;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { modelo, capacidade } = parseiPhoneName(product.nome);
  const imagemPrincipal = product.imagem_principal || product.imagens[0];

  return (
    <Link
      href={`/produto/${product.id}`}
      className="group block rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-4 transition-all hover:border-brand-light hover:shadow-lg"
    >
      {/* Imagem do produto */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md bg-border-dark">
        {imagemPrincipal ? (
          <Image
            src={imagemPrincipal}
            alt={product.nome}
            fill
            className="object-contain transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-text-muted-dark">
            Sem imagem
          </div>
        )}
      </div>

      {/* Informações do produto */}
      <div className="space-y-2">
        {/* Nome Completo do Produto */}
        <div>
          <h3 className="font-semibold text-text-primary-dark group-hover:text-brand-light">
            {product.nome}
          </h3>
        </div>

        {/* Badges de Cor, Bateria e Condição */}
        <div className="flex flex-wrap items-center gap-2">
          <ColorBadge productName={product.nome} color={product.cor} />
          {product.bateria !== null && product.bateria !== undefined && (
            <>
              <BatteryBadge bateria={product.bateria} showIcon={false} />
            </>
          )}
          <ConditionBadge condicao={product.condicao} />
        </div>

        {/* Preço */}
        <div className="pt-2">
          <p className="text-2xl font-bold text-text-primary-dark">
            {formatCurrency(product.preco)}
          </p>
        </div>

        {/* Código do produto */}
        <p className="text-xs text-text-muted-dark">Cód: {product.codigo}</p>
      </div>
    </Link>
  );
}
