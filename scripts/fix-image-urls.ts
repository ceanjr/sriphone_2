/**
 * Script para corrigir URLs das imagens do Cloudinary
 * Troca /raw/upload/ por /image/upload/
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function fixImageUrls() {
  console.log('\n🔧 Corrigindo URLs das imagens...\n');

  // Buscar todos os produtos
  const { data: products, error } = await supabase
    .from('produtos')
    .select('id, codigo, nome, imagens, imagem_principal');

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return;
  }

  console.log(`Encontrados ${products?.length || 0} produtos\n`);

  let fixed = 0;

  for (const product of products || []) {
    let needsUpdate = false;
    let newImagens = product.imagens;
    let newImagemPrincipal = product.imagem_principal;

    // Corrigir array de imagens
    if (product.imagens && product.imagens.length > 0) {
      newImagens = product.imagens.map((url: string) => {
        if (url.includes('/raw/upload/')) {
          needsUpdate = true;
          return url.replace('/raw/upload/', '/image/upload/');
        }
        return url;
      });
    }

    // Corrigir imagem principal
    if (product.imagem_principal && product.imagem_principal.includes('/raw/upload/')) {
      needsUpdate = true;
      newImagemPrincipal = product.imagem_principal.replace('/raw/upload/', '/image/upload/');
    }

    if (needsUpdate) {
      console.log(`✅ Corrigindo: ${product.nome} (${product.codigo})`);

      const { error: updateError } = await supabase
        .from('produtos')
        .update({
          imagens: newImagens,
          imagem_principal: newImagemPrincipal,
        })
        .eq('id', product.id);

      if (updateError) {
        console.error(`❌ Erro ao atualizar produto ${product.codigo}:`, updateError);
      } else {
        fixed++;
      }
    }
  }

  console.log(`\n✨ Concluído! ${fixed} produtos corrigidos.\n`);
}

fixImageUrls();
