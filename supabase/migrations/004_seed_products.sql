-- Migration: Seed de produtos
-- Data: 2026-01-06
-- Descrição: Insere produtos de teste para desenvolvimento (iPhones variados)
-- Nota: Produtos criados SEM categorias (categoria_id = NULL)
-- Categorias serão criadas manualmente na área administrativa

-- URLs de imagens são placeholders do Cloudinary
-- Substitua pelas URLs reais após upload das fotos

-- ============================================
-- PRODUTOS IPHONE 12 (Seminovos)
-- ============================================

INSERT INTO produtos (codigo, nome, descricao, preco, condicao, cor, bateria, categoria_id, imagens, imagem_principal, ativo)
VALUES
  (
    '3986',
    'iPhone 12 128 GB - Branco',
    'iPhone 12 em excelente estado, bateria com saúde de 86%. Acompanha caixa original e todos os acessórios. Garantia de 3 meses.',
    1749.00,
    'seminovo',
    'branco',
    86,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-branco-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-branco-1.jpg',
    true
  ),
  (
    '8797',
    'iPhone 12 128 GB - Branco',
    'iPhone 12 seminovo com 80% de bateria. Aparelho revisado e testado. Sem arranhões significativos.',
    1749.00,
    'seminovo',
    'branco',
    80,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-branco-2.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-branco-2.jpg',
    true
  ),
  (
    '6499',
    'iPhone 12 256 GB - Branco',
    'iPhone 12 com bateria em ótimo estado (80%). Perfeito funcionamento, sem marcas de uso.',
    1899.00,
    'seminovo',
    'branco',
    80,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-branco-3.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-branco-3.jpg',
    true
  ),
  (
    '4640',
    'iPhone 12 128 GB - Azul',
    'iPhone 12 azul seminovo, bateria 87%. Aparelho premium com garantia estendida.',
    1749.00,
    'seminovo',
    'azul',
    87,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-azul-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-azul-1.jpg',
    true
  ),
  (
    '2341',
    'iPhone 12 64 GB - Preto',
    'iPhone 12 preto seminovo, bateria 82%. Estado muito bom.',
    1599.00,
    'seminovo',
    'preto',
    82,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-preto-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-preto-1.jpg',
    true
  );

-- ============================================
-- PRODUTOS IPHONE 12 PRO (Seminovos)
-- ============================================

INSERT INTO produtos (codigo, nome, descricao, preco, condicao, cor, bateria, categoria_id, imagens, imagem_principal, ativo)
VALUES
  (
    '5512',
    'iPhone 12 Pro 128 GB - Grafite',
    'iPhone 12 Pro com câmera tripla profissional. Bateria 85%. Estado premium.',
    2299.00,
    'seminovo',
    'grafite',
    85,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-pro-grafite-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-pro-grafite-1.jpg',
    true
  ),
  (
    '6623',
    'iPhone 12 Pro 256 GB - Dourado',
    'iPhone 12 Pro dourado, bateria 88%. Modelo premium em perfeito estado.',
    2499.00,
    'seminovo',
    'dourado',
    88,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-pro-dourado-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-12-pro-dourado-1.jpg',
    true
  );

-- ============================================
-- PRODUTOS IPHONE 13 (Seminovos)
-- ============================================

INSERT INTO produtos (codigo, nome, descricao, preco, condicao, cor, bateria, categoria_id, imagens, imagem_principal, ativo)
VALUES
  (
    '1234',
    'iPhone 13 128 GB - Azul',
    'iPhone 13 seminovo em perfeito estado. Bateria 89%. Sem nenhum defeito ou risco.',
    2199.00,
    'seminovo',
    'azul',
    89,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-13-azul-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-13-azul-1.jpg',
    true
  ),
  (
    '5678',
    'iPhone 13 256 GB - Rosa',
    'iPhone 13 rosa com 82% de bateria. Aparelho feminino, muito bem cuidado.',
    2349.00,
    'seminovo',
    'rosa',
    82,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-13-rosa-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-13-rosa-1.jpg',
    true
  ),
  (
    '7788',
    'iPhone 13 512 GB - Verde',
    'iPhone 13 verde com alta capacidade. Bateria 91%. Ideal para quem precisa de espaço.',
    2699.00,
    'seminovo',
    'verde',
    91,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-13-verde-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-13-verde-1.jpg',
    true
  );

-- ============================================
-- PRODUTOS IPHONE 14 (Seminovos e Novos)
-- ============================================

INSERT INTO produtos (codigo, nome, descricao, preco, condicao, cor, bateria, categoria_id, imagens, imagem_principal, ativo)
VALUES
  (
    '7467',
    'iPhone 14 128 GB - Branco',
    'iPhone 14 seminovo com 80% de bateria. Estado impecável, sem riscos. Garantia de 6 meses.',
    2349.00,
    'seminovo',
    'branco',
    80,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-14-branco-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-14-branco-1.jpg',
    true
  ),
  (
    '8901',
    'iPhone 14 256 GB - Roxo',
    'iPhone 14 roxo seminovo. Bateria 86%. Cor exclusiva, estado premium.',
    2599.00,
    'seminovo',
    'roxo',
    86,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-14-roxo-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-14-roxo-1.jpg',
    true
  );

-- ============================================
-- PRODUTOS IPHONE 14 PRO (Seminovos)
-- ============================================

INSERT INTO produtos (codigo, nome, descricao, preco, condicao, cor, bateria, categoria_id, imagens, imagem_principal, ativo)
VALUES
  (
    '9876',
    'iPhone 14 Pro 128 GB - Space Black',
    'iPhone 14 Pro seminovo premium. Bateria 91%. Dynamic Island, câmera 48MP. Estado de novo.',
    3499.00,
    'seminovo',
    'preto',
    91,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-14-pro-black-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-14-pro-black-1.jpg',
    true
  ),
  (
    '1122',
    'iPhone 14 Pro 256 GB - Deep Purple',
    'iPhone 14 Pro roxo profundo. Bateria 93%. Modelo exclusivo em perfeito estado.',
    3799.00,
    'seminovo',
    'roxo',
    93,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-14-pro-purple-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-14-pro-purple-1.jpg',
    true
  ),
  (
    '3344',
    'iPhone 14 Pro 512 GB - Dourado',
    'iPhone 14 Pro dourado com máxima capacidade. Bateria 89%. Premium.',
    4099.00,
    'seminovo',
    'dourado',
    89,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-14-pro-gold-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-14-pro-gold-1.jpg',
    true
  );

-- ============================================
-- PRODUTOS IPHONE 15 (Novos)
-- ============================================

INSERT INTO produtos (codigo, nome, descricao, preco, condicao, cor, bateria, categoria_id, imagens, imagem_principal, ativo)
VALUES
  (
    '5012',
    'iPhone 15 128 GB - Rosa',
    'iPhone 15 NOVO lacrado de fábrica. Garantia Apple de 1 ano. Nota fiscal inclusa.',
    3899.00,
    'novo',
    'rosa',
    NULL,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-15-rosa-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-15-rosa-1.jpg',
    true
  ),
  (
    '5013',
    'iPhone 15 256 GB - Preto',
    'iPhone 15 NOVO lacrado. Garantia Apple completa. Modelo mais vendido.',
    4199.00,
    'novo',
    'preto',
    NULL,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-15-preto-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-15-preto-1.jpg',
    true
  ),
  (
    '5014',
    'iPhone 15 512 GB - Azul',
    'iPhone 15 NOVO azul com máxima capacidade. Lacrado de fábrica.',
    4699.00,
    'novo',
    'azul',
    NULL,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-15-azul-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-15-azul-1.jpg',
    true
  );

-- ============================================
-- PRODUTOS IPHONE 15 PRO MAX (Seminovo)
-- ============================================

INSERT INTO produtos (codigo, nome, descricao, preco, condicao, cor, bateria, categoria_id, imagens, imagem_principal, ativo)
VALUES
  (
    '2891',
    'iPhone 15 Pro Max 256 GB - Titânio Branco',
    'iPhone 15 Pro Max seminovo premium. Bateria com 94% de saúde. Titanium White impecável. Garantia estendida de 12 meses.',
    5499.00,
    'seminovo',
    'branco',
    94,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-15-pro-max-white-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-15-pro-max-white-1.jpg',
    true
  ),
  (
    '2892',
    'iPhone 15 Pro Max 512 GB - Titânio Natural',
    'iPhone 15 Pro Max topo de linha. Bateria 92%. Cor exclusiva.',
    5999.00,
    'seminovo',
    'cinza',
    92,
    NULL,
    ARRAY['https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-15-pro-max-natural-1.jpg'],
    'https://res.cloudinary.com/seu-cloud/image/upload/v1/produtos/iphone-15-pro-max-natural-1.jpg',
    true
  );

-- Log de sucesso
DO $$
BEGIN
  RAISE NOTICE 'Produtos inseridos com sucesso! Total: %', (SELECT COUNT(*) FROM produtos);
  RAISE NOTICE 'Produtos sem categoria (categoria_id IS NULL): %', (SELECT COUNT(*) FROM produtos WHERE categoria_id IS NULL);
END $$;
