/**
 * Item de Lista de Produto (Visualização Lista)
 * Layout horizontal minimalista sem imagens
 * Exibe apenas: modelo, capacidade, cor, bateria, condição (novo) e preço
 */

import Link from "next/link";
import type { ProductWithCategory } from "@/lib/types/product";
import { BatteryBadge } from "@/components/badges/battery-badge";
import { ConditionBadge } from "@/components/badges/condition-badge";
import { ColorBadge } from "./color-badge";
import { formatCurrency } from "@/lib/utils/format-currency";
import { parseiPhoneName } from "@/lib/utils/parse-iphone-model";

interface ProductListItemProps {
  product: ProductWithCategory;
}

export function ProductListItem({ product }: ProductListItemProps) {
  const { modelo, capacidade } = parseiPhoneName(product.nome);

  return (
    <Link
      href={`/produto/${product.id}`}
      className="group block border-b border-border-subtle-dark bg-brand-gray-dark px-4 py-4 transition-colors hover:bg-border-dark"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Nome e Badges */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-text-primary-dark group-hover:text-brand-light">
            {product.nome}
          </h3>
          {/* Badges abaixo do nome */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <ConditionBadge condicao={product.condicao} showIcon={false} />
            <ColorBadge productName={product.nome} color={product.cor} />
            {product.bateria !== null && (
              <BatteryBadge bateria={product.bateria} showIcon={false} />
            )}
          </div>
        </div>

        {/* Preço */}
        <div className="text-right">
          <p className="text-xl font-bold text-text-primary-dark">
            {formatCurrency(product.preco)}
          </p>
          <p className="text-xs text-text-muted-dark">Cód: {product.codigo}</p>
        </div>
      </div>
    </Link>
  );
}
