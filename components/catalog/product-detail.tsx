'use client';

/**
 * Componente de Detalhes do Produto
 * Exibe todas as informações do produto com galeria de imagens
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { ProductWithCategory } from '@/lib/types/product';
import { BatteryBadge } from '@/components/badges/battery-badge';
import { ConditionBadge } from '@/components/badges/condition-badge';
import { ColorBadge } from './color-badge';
import { formatCurrency } from '@/lib/utils/format-currency';
import { parseiPhoneName } from '@/lib/utils/parse-iphone-model';
import { FONT_CLASSES } from '@/lib/constants/colors';

interface ProductDetailProps {
  product: ProductWithCategory;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { modelo, capacidade } = parseiPhoneName(product.nome);
  const allImages = [
    ...(product.imagem_principal ? [product.imagem_principal] : []),
    ...product.imagens,
  ];

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Back Link */}
      <Link
        href="/catalogo"
        className="inline-flex items-center gap-2 font-semibold text-text-secondary-dark hover:text-text-primary-dark"
      >
        <ChevronLeft className="h-5 w-5" />
        Voltar ao Catálogo
      </Link>

      {/* Product Content */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Left Column - Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border-subtle-dark bg-border-dark">
            {allImages.length > 0 ? (
              <Image
                src={allImages[selectedImage]}
                alt={product.nome}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-text-muted-dark">
                Sem imagem
              </div>
            )}

            {/* Badge de Condição */}
            <div className="absolute left-4 top-4">
              <ConditionBadge condicao={product.condicao} />
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded border bg-border-dark transition-all ${
                    selectedImage === index
                      ? 'border-brand-light ring-2 ring-brand-light'
                      : 'border-border-subtle-dark hover:border-text-muted-dark'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.nome} - Imagem ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h1
              className={`text-3xl font-bold text-text-primary-dark md:text-4xl ${FONT_CLASSES.heading}`}
            >
              {product.nome}
            </h1>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <ColorBadge productName={product.nome} color={product.cor} />
            {product.bateria !== null && (
              <BatteryBadge bateria={product.bateria} showIcon={false} />
            )}
          </div>

          {/* Price */}
          <div className="rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-6">
            <p className="text-sm text-text-secondary-dark">Preço</p>
            <p className="mt-1 text-4xl font-bold text-text-primary-dark">
              {formatCurrency(product.preco)}
            </p>
          </div>

          {/* Specs */}
          <div className="space-y-3 rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-6">
            <h2 className="text-lg font-semibold text-text-primary-dark">
              Especificações
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-border-dark pb-2">
                <span className="text-text-secondary-dark">Código:</span>
                <span className="font-mono text-text-primary-dark">
                  {product.codigo}
                </span>
              </div>

              <div className="flex justify-between border-b border-border-dark pb-2">
                <span className="text-text-secondary-dark">Condição:</span>
                <span className="capitalize text-text-primary-dark">
                  {product.condicao}
                </span>
              </div>

              {product.categoria && (
                <div className="flex justify-between">
                  <span className="text-text-secondary-dark">Categoria:</span>
                  <span className="text-text-primary-dark">
                    {product.categoria.nome}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {product.descricao && (
            <div className="space-y-3 rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-6">
              <h2 className="text-lg font-semibold text-text-primary-dark">
                Descrição
              </h2>
              <p className="text-text-secondary-dark">{product.descricao}</p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="rounded-lg border border-[#50dd5777]  p-6">
            <h2 className="text-lg font-semibold text-text-primary-dark">
              Interessado?
            </h2>
            <p className="mt-2 text-sm text-text-secondary-dark">
              Entre em contato para mais informações sobre este produto.
            </p>
            <a
              href={`https://wa.me/5577981022246?text=Olá! Gostaria de saber mais sobre o ${product.nome} (${product.codigo})`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-[#50dd57ab] px-6 py-3 font-semibold text-text-primary-dark transition-opacity hover:opacity-90"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
