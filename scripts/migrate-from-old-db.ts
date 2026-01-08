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

import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

// Carregar variáveis de ambiente do .env.local
dotenv.config({ path: '.env.local' });

// ===== CONFIGURAÇÃO =====

// ⚠️ MODO DRY RUN: true = apenas simula, false = executa de verdade
const DRY_RUN = false;

// Supabase ANTIGO (origem)
const OLD_SUPABASE_URL = 'https://xaotzsgpepwtixzkuslx.supabase.co';
const OLD_SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhb3R6c2dwZXB3dGl4emt1c2x4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDYzODU1OSwiZXhwIjoyMDc2MjE0NTU5fQ.4YTzXWz_IcrwJaujX1dOnK8BOYX6hSvvKMMDaccOqTE';

// Supabase NOVO (destino) - usar as variáveis de ambiente do projeto atual
const NEW_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const NEW_SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// API do projeto (usada para upload de imagens)
const API_BASE_URL = 'http://localhost:3000';

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
 * Extrai a categoria do produto pelo nome
 * Exemplo: "iPhone 14 128GB - Azul" -> "iPhone 14"
 */
function extractCategoryFromProductName(productName: string): string | null {
  if (!productName) return null;

  // Regex para capturar "iPhone" seguido de um número (pode ter Pro, Plus, Max, etc depois)
  // Exemplos: iPhone 11, iPhone 12, iPhone 13 Pro, iPhone 14 Plus, iPhone 15 Pro Max
  const match = productName.match(/iPhone\s+(\d+)/i);

  if (match) {
    const modelNumber = match[1];
    return `iPhone ${modelNumber}`;
  }

  return null;
}

/**
 * Mapeia o nome da categoria extraída para o ID da categoria nova
 */
function mapCategoryNameToId(
  categoryName: string | null,
  newCategories: NewCategory[]
): string | null {
  if (!categoryName) return null;

  // Procurar categoria exata ou que contenha o nome
  const category = newCategories.find(
    (cat) =>
      cat.nome.toLowerCase() === categoryName.toLowerCase() ||
      cat.nome.toLowerCase().includes(categoryName.toLowerCase()) ||
      categoryName.toLowerCase().includes(cat.nome.toLowerCase())
  );

  return category?.id || null;
}

/**
 * Faz upload de uma imagem usando a API do projeto
 */
async function uploadImageViaAPI(
  imageUrl: string,
  productCode: string,
  index: number
): Promise<string | null> {
  try {
    console.log(`   📤 Fazendo upload da imagem ${index + 1}...`);

    if (DRY_RUN) {
      console.log(`   🔍 [DRY RUN] Simulando upload da imagem: ${imageUrl}`);
      return `https://res.cloudinary.com/fake/image/upload/sriphone/products/${productCode}-${index}.jpg`;
    }

    // Fazer download da imagem do Supabase
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Falha ao baixar imagem: ${response.statusText}`);
    }

    const blob = await response.blob();
    const fileName = `${productCode}-${index}.jpg`;
    const file = new File([blob], fileName, {
      type: response.headers.get('content-type') || 'image/jpeg',
    });

    // Upload usando a API do projeto
    const formData = new FormData();
    formData.append('file', file);

    const uploadResponse = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Falha no upload para Cloudinary: ${errorText}`);
    }

    const uploadResult = (await uploadResponse.json()) as {
      url: string;
      publicId: string;
    };
    console.log(`   ✅ Imagem ${index + 1} enviada com sucesso`);
    return uploadResult.url;
  } catch (error) {
    console.error(`   ❌ Erro ao fazer upload da imagem ${index + 1}:`, error);
    return null;
  }
}

/**
 * Migra um produto do banco antigo para o novo
 */
async function migrateProduct(
  oldProduct: OldProduct,
  newCategories: NewCategory[]
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(
      `\n🔄 Migrando: ${oldProduct.nome} (código: ${oldProduct.codigo})`
    );

    // 1. Verificar se produto já existe no novo banco (por código)
    if (!DRY_RUN) {
      const { data: existing } = await newSupabase
        .from('produtos')
        .select('id')
        .eq('codigo', oldProduct.codigo)
        .single();

      if (existing) {
        console.log(`   ⏭️  Produto já existe no novo banco, pulando...`);
        return { success: false, error: 'Produto já existe' };
      }
    } else {
      console.log(`   🔍 [DRY RUN] Verificando se produto existe...`);
    }

    // 2. Extrair e mapear categoria do nome do produto
    const extractedCategory = extractCategoryFromProductName(oldProduct.nome);
    console.log(
      `   📋 Categoria extraída do nome: ${extractedCategory || 'N/A'}`
    );

    const categoria_id = mapCategoryNameToId(extractedCategory, newCategories);
    if (!categoria_id) {
      const errorMsg = `Categoria não encontrada para: ${
        extractedCategory || 'N/A'
      }`;
      console.log(`   ⚠️  ${errorMsg}`);
      return { success: false, error: errorMsg };
    } else {
      const matchedCategory = newCategories.find((c) => c.id === categoria_id);
      console.log(
        `   ✅ Categoria encontrada: ${matchedCategory?.nome} (${categoria_id})`
      );
    }

    // 3. Migrar imagens para Cloudinary
    let cloudinaryImages: string[] = [];
    if (oldProduct.imagens && oldProduct.imagens.length > 0) {
      console.log(`   📸 Migrando ${oldProduct.imagens.length} imagens...`);

      for (let i = 0; i < oldProduct.imagens.length; i++) {
        const imageUrl = oldProduct.imagens[i];
        const cloudinaryUrl = await uploadImageViaAPI(
          imageUrl,
          oldProduct.codigo,
          i
        );

        if (cloudinaryUrl) {
          cloudinaryImages.push(cloudinaryUrl);
        }
      }

      console.log(
        `   ✅ ${cloudinaryImages.length}/${oldProduct.imagens.length} imagens migradas`
      );
    }

    // 4. Criar novo produto (Supabase gerará o UUID automaticamente)
    // Lógica de condição: se tem bateria, é seminovo. Se não tem, é novo.
    const hasBateria = oldProduct.bateria !== null && oldProduct.bateria !== undefined;
    const condicao: 'novo' | 'seminovo' = hasBateria ? 'seminovo' : 'novo';

    const newProduct = {
      codigo: oldProduct.codigo,
      nome: oldProduct.nome,
      descricao: oldProduct.descricao || null,
      preco: oldProduct.preco,
      condicao: condicao,
      cor: null, // Agora permite null
      bateria: hasBateria ? oldProduct.bateria : null,
      categoria_id: categoria_id,
      imagens: cloudinaryImages,
      imagem_principal:
        cloudinaryImages.length > 0 ? cloudinaryImages[0] : null,
      ativo: oldProduct.ativo !== false,
      created_at: oldProduct.created_at || new Date().toISOString(),
    };

    console.log(`   📊 Condição: ${condicao} (bateria: ${hasBateria ? oldProduct.bateria + '%' : 'N/A'})`);

    // 5. Inserir no novo banco (ou simular em DRY RUN)
    if (!DRY_RUN) {
      const { error } = await newSupabase.from('produtos').insert(newProduct);

      if (error) {
        throw error;
      }
      console.log(`   ✅ Produto migrado com sucesso!`);
    } else {
      console.log(
        `   🔍 [DRY RUN] Produto seria inserido com os seguintes dados:`
      );
      console.log(`      - Nome: ${newProduct.nome}`);
      console.log(`      - Código: ${newProduct.codigo}`);
      console.log(`      - Categoria ID: ${newProduct.categoria_id}`);
      console.log(`      - Imagens: ${newProduct.imagens.length}`);
      console.log(`      - Preço: R$ ${newProduct.preco.toFixed(2)}`);
      console.log(`   ✅ [DRY RUN] Validação bem-sucedida!`);
    }

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

  if (DRY_RUN) {
    console.log('⚠️  MODO DRY RUN ATIVADO');
    console.log('   Nenhum dado será inserido no banco de dados.');
    console.log('   Este é apenas um teste de validação.\n');
    console.log('================================\n');
  }

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
    newCategories?.forEach((cat) =>
      console.log(`   - ${cat.nome} (${cat.id})`)
    );

    // 2. Buscar produtos do banco antigo
    console.log('\n📦 Buscando produtos do banco antigo...');
    const { data: oldProducts, error: prodError } = await oldSupabase
      .from('produtos')
      .select('*')
      .order('created_at', { ascending: true });

    if (prodError) throw prodError;

    console.log(
      `✅ Encontrados ${oldProducts?.length || 0} produtos para migrar\n`
    );

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // 4. Relatório final
    console.log('\n\n================================');
    console.log('📊 RELATÓRIO DE MIGRAÇÃO');
    console.log('================================\n');

    if (DRY_RUN) {
      console.log('⚠️  MODO DRY RUN - Simulação concluída\n');
    }

    console.log(`Total de produtos: ${stats.total}`);
    console.log(
      `✅ ${DRY_RUN ? 'Validados' : 'Migrados'} com sucesso: ${stats.success}`
    );
    console.log(`⏭️  Pulados (já existem): ${stats.skipped}`);
    console.log(`❌ Falharam: ${stats.failed}\n`);

    if (stats.errors.length > 0) {
      console.log('❌ ERROS:\n');
      stats.errors.forEach((err) => {
        console.log(`   ${err.produto}: ${err.erro}`);
      });
    }

    if (DRY_RUN) {
      console.log('\n✨ Simulação concluída!');
      console.log('\n💡 Para executar a migração de verdade:');
      console.log('   1. Abra o arquivo scripts/migrate-from-old-db.ts');
      console.log('   2. Altere DRY_RUN = true para DRY_RUN = false');
      console.log(
        '   3. Execute novamente: npx tsx scripts/migrate-from-old-db.ts\n'
      );
    } else {
      console.log('\n✨ Migração concluída!\n');
    }
  } catch (error: any) {
    console.error('\n❌ ERRO FATAL NA MIGRAÇÃO:', error.message);
    process.exit(1);
  }
}

// Executar migração
migrate();
