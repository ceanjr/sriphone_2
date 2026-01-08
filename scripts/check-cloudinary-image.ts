/**
 * Script para verificar se uma imagem existe no Cloudinary
 */

import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkImage(publicId: string) {
  console.log(`\n🔍 Verificando imagem: ${publicId}\n`);

  try {
    const result = await cloudinary.api.resource(publicId);
    console.log('✅ Imagem EXISTE no Cloudinary');
    console.log('URL:', result.secure_url);
    console.log('Created:', result.created_at);
  } catch (error: any) {
    if (error.error?.http_code === 404) {
      console.log('❌ Imagem NÃO EXISTE no Cloudinary (foi deletada com sucesso)');
    } else {
      console.error('Erro ao verificar:', error);
    }
  }
}

// Usar o publicId que apareceu no log
const publicId = process.argv[2] || 'sriphone/products/mophfoh8ujkyknbfuwqo';
checkImage(publicId);
