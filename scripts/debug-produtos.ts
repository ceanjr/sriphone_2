import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '/home/ceanbrjr/Dev/sriphone_2/.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function debug() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*, categorias(*)")
    .eq("ativo", true)
    .limit(1);

  if (error) {
    console.error('Erro:', error);
    return;
  }

  console.log('\n📦 Estrutura do produto retornado:\n');
  console.log(JSON.stringify(data[0], null, 2));

  console.log('\n🔍 Verificando campos:\n');
  console.log('Tem "categoria"?', 'categoria' in data[0]);
  console.log('Tem "categorias"?', 'categorias' in data[0]);

  if (data[0].categorias) {
    console.log('\n✅ Campo "categorias" existe:');
    console.log(JSON.stringify(data[0].categorias, null, 2));
  }

  if (data[0].categoria) {
    console.log('\n✅ Campo "categoria" existe:');
    console.log(JSON.stringify(data[0].categoria, null, 2));
  }
}

debug();
