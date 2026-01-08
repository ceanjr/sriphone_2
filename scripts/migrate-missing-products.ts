/**
 * Script para migrar os 4 produtos que foram pulados (código 0001 duplicado)
 * Gera códigos únicos para cada um
 */

import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

// Supabase ANTIGO (origem)
const OLD_SUPABASE_URL = 'https://xaotzsgpepwtixzkuslx.supabase.co';
const OLD_SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhb3R6c2dwZXB3dGl4emt1c2x4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDYzODU1OSwiZXhwIjoyMDc2MjE0NTU5fQ.4YTzXWz_IcrwJaujX1dOnK8BOYX6hSvvKMMDaccOqTE';

// Supabase NOVO (destino)
const NEW_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const NEW_SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const API_BASE_URL = 'http://localhost:3000';

const oldSupabase = createClient(OLD_SUPABASE_URL, OLD_SUPABASE_KEY);
const newSupabase = createClient(NEW_SUPABASE_URL, NEW_SUPABASE_KEY);

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

function extractCategoryFromProductName(productName: string): string | null {
  if (!productName) return null;
  const match = productName.match(/iPhone\s+(\d+)/i);
  if (match) {
    const modelNumber = match[1];
    return `iPhone ${modelNumber}`;
  }
  return null;
}

function mapCategoryNameToId(
  categoryName: string | null,
  newCategories: NewCategory[]
): string | null {
  if (!categoryName) return null;
  const category = newCategories.find(
    (cat) =>
      cat.nome.toLowerCase() === categoryName.toLowerCase() ||
      cat.nome.toLowerCase().includes(categoryName.toLowerCase()) ||
      categoryName.toLowerCase().includes(cat.nome.toLowerCase())
  );
  return category?.id || null;
}

async function uploadImageViaAPI(
  imageUrl: string,
  productCode: string,
  index: number
): Promise<string | null> {
  try {
    console.log(`   📤 Fazendo upload da imagem ${index + 1}...`);

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Falha ao baixar imagem: ${response.statusText}`);
    }

    const blob = await response.blob();
    const fileName = `${productCode}-${index}.jpg`;
    const file = new File([blob], fileName, {
      type: response.headers.get('content-type') || 'image/jpeg',
    });

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

function generateUniqueCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function migrate() {
  console.log('\n🚀 MIGRANDO PRODUTOS FALTANTES (código 0001)\n');
  console.log('================================\n');

  // Buscar categorias do novo banco
  const { data: newCategories } = await newSupabase
    .from('categorias')
    .select('id, nome');

  console.log(`✅ Encontradas ${newCategories?.length || 0} categorias\n`);

  // Buscar produtos com código 0001 do banco antigo
  const { data: oldProducts } = await oldSupabase
    .from('produtos')
    .select('*')
    .eq('codigo', '0001')
    .order('created_at', { ascending: true });

  console.log(`✅ Encontrados ${oldProducts?.length || 0} produtos para migrar\n`);

  if (!oldProducts || oldProducts.length === 0) {
    console.log('⚠️  Nenhum produto encontrado');
    return;
  }

  let migrated = 0;

  for (const product of oldProducts) {
    console.log(`\n🔄 Migrando: ${product.nome}`);

    // Gerar código único
    let newCode = generateUniqueCode();
    let codeExists = true;

    while (codeExists) {
      const { data: existing } = await newSupabase
        .from('produtos')
        .select('id')
        .eq('codigo', newCode)
        .single();

      if (!existing) {
        codeExists = false;
      } else {
        newCode = generateUniqueCode();
      }
    }

    console.log(`   📝 Novo código: ${newCode}`);

    // Extrair categoria
    const extractedCategory = extractCategoryFromProductName(product.nome);
    const categoria_id = mapCategoryNameToId(
      extractedCategory,
      newCategories || []
    );

    if (!categoria_id) {
      console.log(`   ❌ Categoria não encontrada: ${extractedCategory}`);
      continue;
    }

    const matchedCategory = newCategories?.find((c) => c.id === categoria_id);
    console.log(`   ✅ Categoria: ${matchedCategory?.nome}`);

    // Migrar imagens
    let cloudinaryImages: string[] = [];
    if (product.imagens && product.imagens.length > 0) {
      console.log(`   📸 Migrando ${product.imagens.length} imagens...`);

      for (let i = 0; i < product.imagens.length; i++) {
        const imageUrl = product.imagens[i];
        const cloudinaryUrl = await uploadImageViaAPI(imageUrl, newCode, i);

        if (cloudinaryUrl) {
          cloudinaryImages.push(cloudinaryUrl);
        }
      }

      console.log(
        `   ✅ ${cloudinaryImages.length}/${product.imagens.length} imagens migradas`
      );
    }

    // Criar produto
    const hasBateria =
      product.bateria !== null && product.bateria !== undefined;
    const condicao: 'novo' | 'seminovo' = hasBateria ? 'seminovo' : 'novo';

    const newProduct = {
      codigo: newCode,
      nome: product.nome,
      descricao: product.descricao || null,
      preco: product.preco,
      condicao: condicao,
      cor: null,
      bateria: hasBateria ? product.bateria : null,
      categoria_id: categoria_id,
      imagens: cloudinaryImages,
      imagem_principal: cloudinaryImages.length > 0 ? cloudinaryImages[0] : null,
      ativo: product.ativo !== false,
      created_at: product.created_at || new Date().toISOString(),
    };

    console.log(`   📊 Condição: ${condicao}`);

    // Inserir no banco
    const { error } = await newSupabase.from('produtos').insert(newProduct);

    if (error) {
      console.error(`   ❌ Erro ao migrar:`, error.message);
    } else {
      console.log(`   ✅ Produto migrado com sucesso!`);
      migrated++;
    }

    // Delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log(`\n\n✨ Migração concluída! ${migrated} produtos migrados.\n`);
}

migrate();
