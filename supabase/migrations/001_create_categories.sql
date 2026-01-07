-- Migration: Criar tabela de categorias
-- Data: 2026-01-06
-- Descrição: Tabela para armazenar categorias de produtos (ex: iPhone 12, iPhone 14 Pro)

-- Criar extensão UUID se não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Criar índice para ordenação
CREATE INDEX idx_categorias_ordem ON categorias(ordem ASC);

-- Criar índice para slug (usado em URLs)
CREATE INDEX idx_categorias_slug ON categorias(slug);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_categorias_updated_at
  BEFORE UPDATE ON categorias
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários para documentação
COMMENT ON TABLE categorias IS 'Categorias de produtos do catálogo (modelos de iPhone)';
COMMENT ON COLUMN categorias.nome IS 'Nome da categoria (ex: iPhone 12, iPhone 14 Pro)';
COMMENT ON COLUMN categorias.slug IS 'URL-friendly identifier (ex: iphone-12, iphone-14-pro)';
COMMENT ON COLUMN categorias.ordem IS 'Ordem de exibição (menor = primeiro)';
