/**
 * Script de Migração de Dados do Supabase Antigo para o Novo
 *
 * Este script migra:
 * - Produtos da tabela antiga para a nova
 * - Imagens do Supabase Storage para Cloudinary
 * - Vincula produtos às categorias corretas
 * - Gera UUIDs únicos para cada produto
 *
 * Uso: npx tsx scripts/migrate-from-old-db.ts
 */

import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

// ===== CONFIGURAÇÃO =====

// Supabase ANTIGO (origem)
const OLD_SUPABASE_URL = 'https://xaotzsgpepwtixzkuslx.supabase.co';
const OLD_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhb3R6c2dwZXB3dGl4emt1c2x4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDYzODU1OSwiZXhwIjoyMDc2MjE0NTU5fQ.4YTzXWz_IcrwJaujX1dOnK8BOYX6hSvvKMMDaccOqTE';

// Supabase NOVO (destino) - usar as variáveis de ambiente do projeto atual
const NEW_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const NEW_SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cloudinary
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

// Clientes Supabase
const oldSupabase = createClient(OLD_SUPABASE_URL, OLD_SUPABASE_KEY);
const newSupabase = createClient(NEW_SUPABASE_URL, NEW_SUPABASE_KEY);

// ===== TIPOS =====

interface OldProduct {
  id: string;
  nome: string;
  preco: number;
  codigo: string;
  categoria_id?: string;
  categoria?: string;
  descricao?: string;
  condicao?: string;
  bateria?: number;
  imagens?: string[];
  ativo?: boolean;
  created_at?: string;
}

interface NewCategory {
  id: string;
  nome: string;
}

interface MigrationStats {
  total: number;
  success: number;
  failed: number;
  skipped: number;
  errors: Array<{ produto: string; erro: string }>;
}

// ===== FUNÇÕES AUXILIARES =====

/**
 * Mapeia o nome da categoria antiga para o ID da categoria nova
 */
function mapCategoryNameToId(categoriaNome: string | undefined, newCategories: NewCategory[]): string | null {
  if (!categoriaNome) return null;

  // Normalizar o nome da categoria (remover espaços, lowercase)
  const normalized = categoriaNome.toLowerCase().trim();

  // Procurar categoria que contenha o nome
  const category = newCategories.find(cat =>
    cat.nome.toLowerCase().includes(normalized) ||
    normalized.includes(cat.nome.toLowerCase())
  );

  return category?.id || null;
}

/**
 * Faz upload de uma imagem do Supabase Storage para o Cloudinary
 */
async function uploadImageToCloudinary(imageUrl: string, productCode: string, index: number): Promise<string | null> {
  try {
    console.log(`   📤 Fazendo upload da imagem ${index + 1}...`);

    // Fazer download da imagem do Supabase
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Falha ao baixar imagem: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUri = `data:${response.headers.get('content-type')};base64,${base64}`;

    // Upload para o Cloudinary
    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: dataUri,
          upload_preset: CLOUDINARY_UPLOAD_PRESET,
          folder: 'sriphone/products',
          public_id: `${productCode}-${index}`,
        }),
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Falha no upload para Cloudinary: ${errorText}`);
    }

    const uploadResult = await uploadResponse.json() as { secure_url: string };
    console.log(`   ✅ Imagem ${index + 1} enviada com sucesso`);
    return uploadResult.secure_url;
  } catch (error) {
    console.error(`   ❌ Erro ao fazer upload da imagem ${index + 1}:`, error);
    return null;
  }
}

/**
}

/**
 * Migra um produto do banco antigo para o novo
 */
async function migrateProduct(
  oldProduct: OldProduct,
  newCategories: NewCategory[]
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`\n🔄 Migrando: ${oldProduct.nome} (código: ${oldProduct.codigo})`);

    // 1. Verificar se produto já existe no novo banco (por código)
    const { data: existing } = await newSupabase
      .from('produtos')
      .select('id')
      .eq('codigo', oldProduct.codigo)
      .single();

    if (existing) {
      console.log(`   ⏭️  Produto já existe no novo banco, pulando...`);
      return { success: false, error: 'Produto já existe' };
    }

    // 2. Mapear categoria
    const categoria_id = mapCategoryNameToId(oldProduct.categoria, newCategories);
    if (!categoria_id) {
      console.log(`   ⚠️  Categoria não encontrada: ${oldProduct.categoria}`);
    }

    // 3. Migrar imagens para Cloudinary
    let cloudinaryImages: string[] = [];
    if (oldProduct.imagens && oldProduct.imagens.length > 0) {
      console.log(`   📸 Migrando ${oldProduct.imagens.length} imagens...`);

      for (let i = 0; i < oldProduct.imagens.length; i++) {
        const imageUrl = oldProduct.imagens[i];
        const cloudinaryUrl = await uploadImageToCloudinary(imageUrl, oldProduct.codigo, i);

        if (cloudinaryUrl) {
          cloudinaryImages.push(cloudinaryUrl);
        }
      }

      console.log(`   ✅ ${cloudinaryImages.length}/${oldProduct.imagens.length} imagens migradas`);
    }

    // 4. Criar novo produto (Supabase gerará o UUID automaticamente)
    const newProduct = {
      codigo: oldProduct.codigo,
      nome: oldProduct.nome,
      descricao: oldProduct.descricao || null, // Manter vazio se estiver vazio
      preco: oldProduct.preco,
      condicao: (oldProduct.condicao as 'novo' | 'seminovo') || 'seminovo',
      cor: null, // Será adicionado manualmente depois
      bateria: oldProduct.bateria || null,
      categoria_id: categoria_id,
      imagens: cloudinaryImages,
      imagem_principal: cloudinaryImages.length > 0 ? cloudinaryImages[0] : null,
      ativo: oldProduct.ativo !== false, // Default true
      created_at: oldProduct.created_at || new Date().toISOString(),
    };

    // 5. Inserir no novo banco
    const { error } = await newSupabase
      .from('produtos')
      .insert(newProduct);

    if (error) {
      throw error;
    }

    console.log(`   ✅ Produto migrado com sucesso!`);
    return { success: true };

  } catch (error: any) {
    console.error(`   ❌ Erro ao migrar produto:`, error.message);
    return { success: false, error: error.message };
  }
}

// ===== FUNÇÃO PRINCIPAL =====

async function migrate() {
  console.log('\n🚀 INICIANDO MIGRAÇÃO DE DADOS\n');
  console.log('================================\n');

  const stats: MigrationStats = {
    total: 0,
    success: 0,
    failed: 0,
    skipped: 0,
    errors: [],
  };

  try {
    // 1. Buscar categorias do novo banco
    console.log('📋 Buscando categorias do novo banco...');
    const { data: newCategories, error: catError } = await newSupabase
      .from('categorias')
      .select('id, nome');

    if (catError) throw catError;

    console.log(`✅ Encontradas ${newCategories?.length || 0} categorias\n`);
    newCategories?.forEach(cat => console.log(`   - ${cat.nome} (${cat.id})`));

    // 2. Buscar produtos do banco antigo
    console.log('\n📦 Buscando produtos do banco antigo...');
    const { data: oldProducts, error: prodError } = await oldSupabase
      .from('produtos')
      .select('*')
      .order('created_at', { ascending: true });

    if (prodError) throw prodError;

    console.log(`✅ Encontrados ${oldProducts?.length || 0} produtos para migrar\n`);

    if (!oldProducts || oldProducts.length === 0) {
      console.log('⚠️  Nenhum produto encontrado no banco antigo');
      return;
    }

    stats.total = oldProducts.length;

    // 3. Migrar cada produto
    console.log('🔄 Iniciando migração de produtos...\n');

    for (const product of oldProducts) {
      const result = await migrateProduct(product, newCategories || []);

      if (result.success) {
        stats.success++;
      } else if (result.error === 'Produto já existe') {
        stats.skipped++;
      } else {
        stats.failed++;
        stats.errors.push({
          produto: `${product.nome} (${product.codigo})`,
          erro: result.error || 'Erro desconhecido',
        });
      }

      // Pequeno delay para não sobrecarregar as APIs
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // 4. Relatório final
    console.log('\n\n================================');
    console.log('📊 RELATÓRIO DE MIGRAÇÃO');
    console.log('================================\n');
    console.log(`Total de produtos: ${stats.total}`);
    console.log(`✅ Migrados com sucesso: ${stats.success}`);
    console.log(`⏭️  Pulados (já existem): ${stats.skipped}`);
    console.log(`❌ Falharam: ${stats.failed}\n`);

    if (stats.errors.length > 0) {
      console.log('❌ ERROS:\n');
      stats.errors.forEach(err => {
        console.log(`   ${err.produto}: ${err.erro}`);
      });
    }

    console.log('\n✨ Migração concluída!\n');

  } catch (error: any) {
    console.error('\n❌ ERRO FATAL NA MIGRAÇÃO:', error.message);
    process.exit(1);
  }
}

// Executar migração
migrate();
