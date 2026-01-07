-- Migration: Seed de categorias
-- Data: 2026-01-06
-- Descrição: Insere categorias de iPhone do 7 ao 17 Pro Max

INSERT INTO categorias (nome, slug, ordem) VALUES
  -- Série 17 (2025)
  ('iPhone 17 Pro Max', 'iphone-17-pro-max', 1),
  ('iPhone 17 Pro', 'iphone-17-pro', 2),
  ('iPhone 17 Air', 'iphone-17-air', 3),
  ('iPhone 17', 'iphone-17', 4),

  -- Série 16 (2024)
  ('iPhone 16 Pro Max', 'iphone-16-pro-max', 5),
  ('iPhone 16 Pro', 'iphone-16-pro', 6),
  ('iPhone 16 Plus', 'iphone-16-plus', 7),
  ('iPhone 16', 'iphone-16', 8),

  -- Série 15 (2023)
  ('iPhone 15 Pro Max', 'iphone-15-pro-max', 9),
  ('iPhone 15 Pro', 'iphone-15-pro', 10),
  ('iPhone 15 Plus', 'iphone-15-plus', 11),
  ('iPhone 15', 'iphone-15', 12),

  -- Série 14 (2022)
  ('iPhone 14 Pro Max', 'iphone-14-pro-max', 13),
  ('iPhone 14 Pro', 'iphone-14-pro', 14),
  ('iPhone 14 Plus', 'iphone-14-plus', 15),
  ('iPhone 14', 'iphone-14', 16),

  -- Série SE (Modelos Recentes)
  ('iPhone SE (3ª ger.)', 'iphone-se-3', 17),

  -- Série 13 (2021)
  ('iPhone 13 Pro Max', 'iphone-13-pro-max', 18),
  ('iPhone 13 Pro', 'iphone-13-pro', 19),
  ('iPhone 13 Mini', 'iphone-13-mini', 20),
  ('iPhone 13', 'iphone-13', 21),

  -- Série 12 (2020)
  ('iPhone 12 Pro Max', 'iphone-12-pro-max', 22),
  ('iPhone 12 Pro', 'iphone-12-pro', 23),
  ('iPhone 12 Mini', 'iphone-12-mini', 24),
  ('iPhone 12', 'iphone-12', 25),

  -- Série SE (2ª ger.)
  ('iPhone SE (2ª ger.)', 'iphone-se-2', 26),

  -- Série 11 (2019)
  ('iPhone 11 Pro Max', 'iphone-11-pro-max', 27),
  ('iPhone 11 Pro', 'iphone-11-pro', 28),
  ('iPhone 11', 'iphone-11', 29),

  -- Série XS / XR (2018)
  ('iPhone XS Max', 'iphone-xs-max', 30),
  ('iPhone XS', 'iphone-xs', 31),
  ('iPhone XR', 'iphone-xr', 32),

  -- Série X / 8 (2017)
  ('iPhone X', 'iphone-x', 33),
  ('iPhone 8 Plus', 'iphone-8-plus', 34),
  ('iPhone 8', 'iphone-8', 35),

  -- Série 7 (2016)
  ('iPhone 7 Plus', 'iphone-7-plus', 36),
  ('iPhone 7', 'iphone-7', 37)
ON CONFLICT (nome) DO NOTHING;

-- Log de sucesso
DO $$
BEGIN
  RAISE NOTICE 'Categorias inseridas com sucesso! Total: %', (SELECT COUNT(*) FROM categorias);
END $$;