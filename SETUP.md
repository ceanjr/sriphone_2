# SETUP - Configuração Manual

Instruções de configuração que devem ser executadas manualmente pelo desenvolvedor.

---

## 🔐 Variáveis de Ambiente

Após a criação do projeto Next.js, você precisará configurar as variáveis de ambiente.

### 1. Criar arquivo `.env.local`

```bash
cp .env.example .env.local
```

### 2. Preencher variáveis

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Como obter as credenciais:

**Supabase:**
1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em Settings > API
3. Copie a URL e as chaves

**Cloudinary:**
1. Acesse [Cloudinary Console](https://console.cloudinary.com)
2. No Dashboard, copie Cloud Name, API Key e API Secret

---

## 📦 Instalação Inicial

Após criação do projeto Next.js:

```bash
# Instalar dependências base (já feito na criação)
npm install

# Instalar Tailwind CSS (se não configurado na criação)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Instalar shadcn/ui
npx shadcn@latest init

# Instalar dependências adicionais
npm install @supabase/supabase-js
npm install zod react-hook-form @hookform/resolvers
npm install clsx tailwind-merge
npm install lucide-react
```

---

## 🎨 Cloudinary - Configuração de Pastas

Organize as imagens no Cloudinary:

```
sriphone/
  ├── landing/
  │   ├── logo-fundo.webp
  │   ├── barbudo.webp
  │   ├── arrow-down.svg
  │   └── insta.webp
  ├── products/
  │   └── (produtos serão adicionados na Etapa 2)
  └── icons/
      └── (ícones adicionais)
```

### Upload de imagens necessárias:

**IMPORTANTE:** O projeto usa apenas Cloudinary, sem imagens locais.

1. Acesse [Cloudinary Media Library](https://console.cloudinary.com/console/media_library)
2. Crie a pasta `sriphone/landing/`
3. Faça upload das seguintes imagens:
   - `logo-fundo.webp` (logo do site)
   - `barbudo.webp` (imagem hero)
   - `insta.webp` (ícone Instagram)
   - `arrow-down.svg` (seta animada)

**Onde obter as imagens:**
- Extraia do site antigo em Astro (pasta `/legado/public/images/`)
- Ou solicite as imagens originais

**Verificação:**
Após upload, teste se a URL funciona:
```
https://res.cloudinary.com/SEU_CLOUD_NAME/image/upload/sriphone/landing/logo-fundo.webp
```

---

## 🗄️ Supabase - Configuração Inicial

### 1. Configurar políticas RLS (Row Level Security)

Não necessário na Etapa 1, será configurado na Etapa 3.

### 2. Configurar autenticação

Não necessário na Etapa 1, será configurado na Etapa 3.

**Nota:** Mantenha as credenciais prontas para uso futuro.

---

## 🚀 Comandos de Desenvolvimento

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint
```

---

## 📝 Git - Proteção de Credenciais

Certifique-se de que `.env.local` está no `.gitignore`:

```bash
# Verificar se está no .gitignore
cat .gitignore | grep .env.local

# Se não estiver, adicionar
echo ".env.local" >> .gitignore
```

---

## 🎨 Cores do Site (Referência)

Baseado no site legado, as cores principais são:

```css
/* cores.ts será criado com estes valores */
--cor-fundo-escuro: #0a0a0a
--cor-fundo-claro: #ffffff
--cor-primaria: #ffffff (em fundo escuro) / #000000 (em fundo claro)
--cor-secundaria: #000000 (invertido)
--cor-texto: #e0e0e0 (fundo escuro) / #333333 (fundo claro)
```

---

## 📍 Informações do Site (Referência)

```typescript
// site-info.ts será criado com estes valores
const SITE_INFO = {
  name: 'Sr. IPHONE',
  tagline: 'Seu iPhone, com Classe e Confiança',
  description: 'Revisamos, avaliamos e garantimos. Cada detalhe do processo assegura a entrega do melhor da tecnologia, com segurança e qualidade garantida.',

  contact: {
    phone: '(77) 98102-2246',
    phoneRaw: '+5577981022246',
    email: 'sriphonefinanceiro@gmail.com',
  },

  address: {
    street: 'Av. Frei Benjamin, 2427 - Brasil',
    city: 'Vitória da Conquista - BA',
    zip: '45051-075',
    complement: 'Pátio Brasil - 1º Andar - Sala 109',
  },

  hours: {
    weekdays: 'Segunda a Sexta: 9h às 18h',
    saturday: 'Sábado: 9h às 13h',
    sunday: 'Domingo: Fechado',
  },

  social: {
    instagram: 'https://www.instagram.com/sr.iphonevca',
    instagramHandle: '@sr.iphonevca',
  },

  maps: {
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241.02940971318205!2d-40.85382426833111!3d-14.854943494569762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7463b65867a14e1%3A0x10e79662a50bb7db!2sSr%20iPhone%20-%20Vit%C3%B3ria%20da%20Conquista!5e0!3m2!1spt-BR!2sbr!4v1761616029401!5m2!1spt-BR!2sbr',
  },
};
```

---

## ✅ Checklist de Setup Completo

Antes de iniciar o desenvolvimento da Etapa 1:

- [ ] Projeto Next.js criado
- [ ] Dependências instaladas
- [ ] Variáveis de ambiente configuradas
- [ ] Cloudinary: imagens organizadas em pastas
- [ ] Git: .env.local no .gitignore
- [ ] Servidor de desenvolvimento rodando (`npm run dev`)

---

## 🆘 Troubleshooting

### Erro: "Module not found"
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Image optimization requires sharp"
```bash
npm install sharp
```

### Erro ao conectar com Supabase
- Verifique se as URLs e chaves estão corretas
- Confirme que são variáveis `NEXT_PUBLIC_*` para uso no cliente
- Reinicie o servidor de desenvolvimento

---

**Nota:** Este arquivo deve ser consultado apenas na configuração inicial. Não será atualizado durante o desenvolvimento das etapas.
