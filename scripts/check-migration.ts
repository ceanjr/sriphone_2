import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function check() {
  const { data: products } = await supabase
    .from('produtos')
    .select('id, codigo, nome, imagens, imagem_principal, categoria_id')
    .order('created_at', { ascending: false });

  console.log(`\nTotal de produtos: ${products ? products.length : 0}\n`);

  if (products) {
    products.forEach(p => {
      console.log(`Código: ${p.codigo}`);
      console.log(`Nome: ${p.nome}`);
      console.log(`Categoria ID: ${p.categoria_id || 'NULL'}`);
      console.log(`Imagens: ${p.imagens ? p.imagens.length : 0}`);
      if (p.imagens && p.imagens.length > 0) {
        console.log(`Primeira imagem: ${p.imagens[0]}`);
      }
      console.log('---');
    });
  }
}

check();
