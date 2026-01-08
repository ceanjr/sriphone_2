/**
 * Script para limpar todas as imagens da pasta sriphone/products no Cloudinary
 */

import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function cleanupCloudinary() {
  console.log('\n🧹 Limpando imagens do Cloudinary...\n');

  try {
    // Buscar todos os recursos da pasta sriphone/products
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'sriphone/products',
      max_results: 500,
    });

    console.log(`📸 Encontradas ${result.resources.length} imagens\n`);

    if (result.resources.length === 0) {
      console.log('✨ Nenhuma imagem para deletar!\n');
      return;
    }

    let deleted = 0;
    let failed = 0;

    for (const resource of result.resources) {
      try {
        console.log(`🗑️  Deletando: ${resource.public_id}`);
        await cloudinary.uploader.destroy(resource.public_id);
        deleted++;
      } catch (error) {
        console.error(`❌ Erro ao deletar ${resource.public_id}:`, error);
        failed++;
      }
    }

    console.log('\n================================');
    console.log('📊 RELATÓRIO DE LIMPEZA');
    console.log('================================\n');
    console.log(`Total de imagens: ${result.resources.length}`);
    console.log(`✅ Deletadas: ${deleted}`);
    console.log(`❌ Falharam: ${failed}\n`);
    console.log('✨ Limpeza concluída!\n');
  } catch (error) {
    console.error('❌ Erro ao buscar imagens:', error);
  }
}

cleanupCloudinary();
