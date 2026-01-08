import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listImages() {
  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'sriphone/products',
    max_results: 500,
  });

  console.log('\n📸 Imagens no Cloudinary:\n');

  result.resources.forEach((resource: any) => {
    console.log('Public ID:', resource.public_id);
    console.log('URL:', resource.secure_url);
    console.log('Created:', resource.created_at);
    console.log('Format:', resource.format);
    console.log('---');
  });

  console.log(`\nTotal: ${result.resources.length} imagens\n`);
}

listImages();
