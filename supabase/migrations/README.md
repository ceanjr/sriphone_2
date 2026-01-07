# Migrations do Supabase - Sr. IPHONE

Esta pasta contém as migrations (migrações) do banco de dados Supabase.

## Como usar as migrations

### 1. Via Supabase CLI (Recomendado)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login no Supabase
supabase login

# Linkar projeto local ao projeto Supabase
supabase link --project-ref SEU_PROJECT_ID

# Aplicar todas as migrations
supabase db push

# Ou aplicar uma migration específica
supabase db push --file supabase/migrations/001_create_categories.sql
```

### 2. Via Dashboard do Supabase (Alternativa)

1. Acesse https://app.supabase.com/project/SEU_PROJECT_ID/editor
2. Vá em "SQL Editor"
3. Copie e cole o conteúdo de cada migration na ordem
4. Execute cada uma sequencialmente

## Ordem das Migrations

As migrations devem ser executadas na ordem numérica:

1. `001_create_categories.sql` - Cria tabela de categorias
2. `002_create_products.sql` - Cria tabela de produtos
3. `003_seed_categories.sql` - Insere categorias de teste
4. `004_seed_products.sql` - Insere produtos de teste
5. `005_enable_rls.sql` (Etapa 3) - Habilita Row Level Security
6. `006_create_auth_policies.sql` (Etapa 3) - Cria políticas de acesso

## Estrutura do Banco

### Tabela: categorias
- `id` (uuid, PK)
- `nome` (text) - Ex: "iPhone 12"
- `slug` (text) - Ex: "iphone-12"
- `ordem` (integer) - Ordenação manual
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Tabela: produtos
- `id` (uuid, PK)
- `codigo` (text, unique) - Ex: "3986"
- `nome` (text) - Ex: "iPhone 15 Pro Max 256 GB - Branco"
- `descricao` (text)
- `preco` (decimal 10,2)
- `condicao` (text) - "novo" ou "seminovo"
- `cor` (text) - Ex: "branco"
- `bateria` (integer, nullable) - 0-100, apenas seminovos
- `categoria_id` (uuid, FK)
- `imagens` (text[]) - Array de URLs do Cloudinary
- `imagem_principal` (text) - URL da imagem principal
- `ativo` (boolean) - Visibilidade no catálogo
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Notas Importantes

- ⚠️ **Nunca editar migrations já aplicadas** - Sempre criar nova migration
- ✅ **Testar localmente** antes de aplicar em produção
- 📝 **Documentar** mudanças significativas no ROADMAP.md
- 🔒 **RLS será habilitado na Etapa 3** para segurança
