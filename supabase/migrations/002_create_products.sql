-- Migration: Criar tabela de produtos
-- Data: 2026-01-06
-- Descrição: Tabela principal para armazenar produtos (iPhones novos e seminovos)

-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL CHECK (preco >= 0),
  condicao TEXT NOT NULL CHECK (condicao IN ('novo', 'seminovo')),
  cor TEXT NOT NULL,
  bateria INTEGER CHECK (bateria >= 0 AND bateria <= 100),
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  imagens TEXT[] NOT NULL DEFAULT '{}',
  imagem_principal TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX idx_produtos_codigo ON produtos(codigo);
CREATE INDEX idx_produtos_categoria_id ON produtos(categoria_id);
CREATE INDEX idx_produtos_ativo ON produtos(ativo);
CREATE INDEX idx_produtos_condicao ON produtos(condicao);
CREATE INDEX idx_produtos_created_at ON produtos(created_at DESC);

-- Índice para busca full-text (nome, cor, código)
CREATE INDEX idx_produtos_search ON produtos USING gin(to_tsvector('portuguese', nome || ' ' || cor || ' ' || codigo));

-- Trigger para atualizar updated_at
CREATE TRIGGER update_produtos_updated_at
  BEFORE UPDATE ON produtos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Constraint: bateria deve ser NULL para produtos novos
ALTER TABLE produtos ADD CONSTRAINT check_bateria_seminovo
  CHECK (
    (condicao = 'novo' AND bateria IS NULL) OR
    (condicao = 'seminovo' AND bateria IS NOT NULL)
  );

-- Constraint: deve ter pelo menos uma imagem
ALTER TABLE produtos ADD CONSTRAINT check_tem_imagens
  CHECK (array_length(imagens, 1) > 0 OR imagem_principal IS NOT NULL);

-- Comentários para documentação
COMMENT ON TABLE produtos IS 'Produtos disponíveis no catálogo (iPhones novos e seminovos)';
COMMENT ON COLUMN produtos.codigo IS 'Código único do produto (ex: 3986)';
COMMENT ON COLUMN produtos.nome IS 'Nome completo (ex: iPhone 15 Pro Max 256 GB - Branco)';
COMMENT ON COLUMN produtos.descricao IS 'Descrição detalhada do produto';
COMMENT ON COLUMN produtos.preco IS 'Preço em BRL (formato: 9999.99)';
COMMENT ON COLUMN produtos.condicao IS 'Condição: "novo" ou "seminovo"';
COMMENT ON COLUMN produtos.cor IS 'Cor do produto (ex: branco, azul)';
COMMENT ON COLUMN produtos.bateria IS 'Saúde da bateria (0-100), apenas para seminovos';
COMMENT ON COLUMN produtos.imagens IS 'Array de URLs das imagens do Cloudinary';
COMMENT ON COLUMN produtos.imagem_principal IS 'URL da imagem principal (destaque)';
COMMENT ON COLUMN produtos.ativo IS 'Se true, produto aparece no catálogo público';
