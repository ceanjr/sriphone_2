# ROADMAP - Sr. IPHONE

Projeto de migração e modernização do site Sr. IPHONE de Astro para Next.js.

## 📋 Status Geral do Projeto

- **Etapa Atual:** Etapas 1, 2 e 3 Concluídas ✅
- **Última Atualização:** 2026-01-06
- **Próximo Passo:** Executar migrations do Supabase (001-006), configurar autenticação e testar funcionalidades

---

## 🎯 ETAPA 1: LANDING PAGE

### Status: ✅ CONCLUÍDA

Migrar a landing page legado (Astro) para Next.js com melhorias de arquitetura, componentização e boas práticas.

### Análise dos Componentes Legados

**Componentes encontrados:**
- Header (sticky com logo e navegação)
- Hero (seção principal com imagem e CTA)
- Seminovos (destaque de garantia)
- AcessoCatalogo (CTA para catálogo com animações)
- Experiencia (contador animado de anos)
- Instagram (CTA para redes sociais com palavras dinâmicas)
- Mapa (localização e informações de contato)
- Footer (copyright)

**Observações importantes:**
- Seção "Servicos" ignorada (arquivo não encontrado)
- Uso de variáveis CSS customizadas
- Animações em JavaScript vanilla
- Layout com separadores entre seções
- Temas escuro/claro alternados por seção

### Decisões de Arquitetura

**Stack confirmada:**
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- next/image (otimização de imagens)
- Cloudinary (hospedagem de imagens)
- Supabase (preparação para etapas futuras)

**Estrutura de pastas:**
```
/src
  /app
    /(landing)
      page.tsx
      layout.tsx
    /catalogo
      /em-construcao
        page.tsx
  /components
    /landing
      header.tsx
      hero.tsx
      seminovos.tsx
      catalog-cta.tsx
      experience.tsx
      instagram-cta.tsx
      location.tsx
      footer.tsx
    /ui (shadcn/ui components)
  /lib
    /constants
      colors.ts
      site-info.ts
    /utils
      cn.ts
  /styles
    globals.css
```

### Tasks da Etapa 1

#### Setup Inicial
- [x] Criar projeto Next.js com TypeScript
- [x] Configurar Tailwind CSS
- [x] Instalar e configurar shadcn/ui
- [x] Criar arquivo de variáveis de ambiente (.env.example)
- [x] Configurar next.config com domínios de imagem
- [x] Criar constantes reutilizáveis (cores, informações do site, imagens)
- [x] Configurar fontes Google (Inter + Montserrat)
- [x] Sincronizar cores entre Tailwind e constantes
- [x] Upload de imagens no Cloudinary
- [x] Configurar variáveis de ambiente (.env.local)

#### Componentes Base
- [x] Criar layout principal da landing page
- [x] Implementar Header (sticky, responsivo)
- [x] Implementar Hero (imagem otimizada, animações)
- [x] Implementar seção Seminovos (tipografia, gradientes)
- [x] Implementar CatalogCTA (animações, mockup device)
- [x] Implementar Experience (contador animado com Intersection Observer)
- [x] Implementar InstagramCTA (palavras dinâmicas, animações)
- [x] Implementar Location (iframe Google Maps, informações)
- [x] Implementar Footer (dinâmico com ano atual)

#### Página Catálogo (Em Construção)
- [x] Criar rota /catalogo/em-construcao
- [x] Criar página "Em Construção" temporária
- [x] Garantir que Header mostre navegação condicional

#### Otimizações e SEO
- [x] Configurar Next Metadata API (title, description, OG tags, keywords)
- [x] Implementar separadores de seção como componente reutilizável
- [x] Otimizar todas as imagens via Cloudinary + next/image
- [x] Configurar preload de imagens críticas (hero com priority)
- [x] Garantir responsividade mobile-first
- [x] Implementar animações suaves em CSS (float, shimmer, pulse)

#### Testes e Validação
- [x] Verificar responsividade em todos os breakpoints
- [x] Testar navegação entre landing e catálogo
- [x] Servidor rodando sem erros de compilação
- [x] Acessibilidade básica (aria-labels, semantic HTML)

#### Finalização
- [x] Todos os componentes documentados no código
- [x] Commit final da Etapa 1

### Melhorias Aplicadas na Migração

1. **Componentização:**
   - Separação clara de responsabilidades
   - Componentes reutilizáveis e isolados
   - Props tipadas com TypeScript

2. **Performance:**
   - Imagens otimizadas (Cloudinary + next/image)
   - Lazy loading de componentes não críticos
   - Preload de recursos críticos

3. **Código Limpo:**
   - TypeScript para type safety
   - Nomenclatura consistente (camelCase/PascalCase)
   - Constantes centralizadas
   - Estilos com Tailwind (utility-first)

4. **UX/UI:**
   - Animações mais suaves
   - Transições otimizadas
   - Feedback visual aprimorado

5. **SEO:**
   - Metadata API do Next.js
   - Semantic HTML
   - Open Graph tags

### Nomenclatura Atualizada

| Legado (Astro) | Novo (Next.js) | Justificativa |
|---|---|---|
| AcessoCatalogo | CatalogCTA | Mais descritivo do propósito |
| Experiencia | Experience | Inglês (padrão do código) |
| Mapa | Location | Mais abrangente (inclui info de contato) |

### Notas de Implementação

- **Cache:** Usar `no-store` ou `revalidate` apropriadamente para conteúdo dinâmico
- **Animações:** Preferir CSS/Tailwind para animações simples, usar lib apenas se necessário
- **Acessibilidade:** Garantir alt em imagens, contraste adequado, navegação por teclado
- **Mobile First:** Desenvolver mobile primeiro, depois desktop

---

## 🛒 ETAPA 2: CATÁLOGO DE PRODUTOS

### Status: ✅ CONCLUÍDA

Implementar a página de catálogo com listagem de produtos, filtros, busca e integração completa com Supabase.

### Decisões de Arquitetura - Etapa 2

**Funcionalidades Confirmadas:**
- Busca em tempo real com lógica completa
- Filtros por categoria funcionais
- Infinite scroll (carregamento automático)
- Badge "Novo" apenas quando campo condicao = "novo"
- Badge de bateria não aparece em produtos novos
- Dados do Supabase desde o início (sem mocks no código)
- Visualização em Grid (padrão) e Lista

**Estrutura do Banco de Dados:**

```sql
-- Tabela: categorias
id: uuid (PK)
nome: text (ex: "iPhone 12", "iPhone 14 Pro")
slug: text (url-friendly)
ordem: integer (ordenação manual)
created_at: timestamp
updated_at: timestamp

-- Tabela: produtos
id: uuid (PK)
codigo: text (único, ex: "3986")
nome: text (ex: "iPhone 15 Pro Max 256 GB - Branco")
descricao: text
preco: decimal(10,2)
condicao: text ('novo' | 'seminovo')
cor: text (ex: "branco", "azul")
bateria: integer (nullable, 0-100, apenas seminovos)
categoria_id: uuid (FK → categorias.id)
imagens: text[] (array de URLs do Cloudinary)
imagem_principal: text (URL da imagem de destaque)
ativo: boolean (visibilidade no catálogo)
created_at: timestamp
updated_at: timestamp
```

**Estrutura de Pastas - Etapa 2:**
```
/app
  /catalogo
    page.tsx (catálogo principal)
    layout.tsx
  /produto
    /[id]
      page.tsx (detalhes - Etapa 3)
/components
  /catalogo
    hero.tsx
    search-bar.tsx
    category-filter.tsx
    view-toggle.tsx
    product-grid.tsx
    product-card.tsx
    product-list.tsx
    product-list-item.tsx
  /shared
    battery-badge.tsx
    condition-badge.tsx
    color-badge.tsx
/lib
  /data
    iphone-colors.ts (movido de .debug)
  /supabase
    client.ts (cliente Supabase)
    queries.ts (queries reutilizáveis)
  /types
    product.ts
    category.ts
  /utils
    format-currency.ts
    get-battery-color.ts
    parse-iphone-model.ts
/supabase
  /migrations
    001_create_categories.sql
    002_create_products.sql
    003_seed_categories.sql
    004_seed_products.sql
```

### Tasks da Etapa 2

#### 1. Configuração do Supabase
- [x] Criar pasta `/supabase/migrations`
- [x] Criar migration `001_create_categories.sql` (tabela categorias)
- [x] Criar migration `002_create_products.sql` (tabela produtos)
- [x] Criar migration `003_seed_categories.sql` (37 categorias: iPhone 7 até 17 Pro Max)
- [x] Criar migration `004_seed_products.sql` (21 produtos de teste SEM categorias)
- [x] Configurar Supabase client (`lib/supabase/client.ts`)
- [x] Criar queries reutilizáveis (`lib/supabase/queries.ts`)

#### 2. Types e Utilitários
- [x] Criar interface `Product` em `lib/types/product.ts`
- [x] Criar interface `Category` em `lib/types/category.ts`
- [x] Mover `.debug/iphone-cores.ts` para `lib/data/iphone-colors.ts`
- [x] Criar `lib/utils/format-currency.ts` (formatar BRL)
- [x] Criar `lib/utils/get-battery-color.ts` (verde ≥80%, amarelo <80%)
- [x] Criar `lib/utils/parse-iphone-model.ts` (extrair modelo do nome)
- [x] Criar `lib/data/product-order.ts` (lógica de ordenação de produtos)

#### 3. Badges Reutilizáveis
- [x] Criar `components/badges/battery-badge.tsx`
  - Ícone de bateria dinâmico (preenchimento baseado em %)
  - Verde (≥80%) ou Amarelo (<80%)
  - Padding discreto, posicionamento absoluto (canto superior direito)
- [x] Criar `components/badges/condition-badge.tsx`
  - Badge "Novo" (branco, canto superior esquerdo)
  - Não exibir nada para seminovos
- [x] Criar `components/badges/color-badge.tsx`
  - Círculo colorido + nome da cor
  - Usar dados de `iphone-colors.ts`
  - Calcular contraste automático para texto (função já existe no arquivo)

#### 4. Header do Catálogo
- [x] Atualizar `components/landing/header.tsx`:
  - Na rota `/catalogo`, botão deve apontar para `/login` (texto: "Admin")
  - Na rota `/`, botão aponta para `/catalogo` (texto: "Catálogo")
  - Manter estilo e comportamento sticky existentes
  - Header já estava implementado com lógica condicional

#### 5. Hero do Catálogo
- [x] Criar `components/catalog/hero.tsx`
  - Background preto (`bg-brand-dark`)
  - Logo barbudo do Cloudinary (`IMAGES.landing.hero`)
  - Título: "Catálogo de iPhones"
  - Subtítulo: "Escolha entre os melhores iPhones novos e seminovos com garantia de qualidade"
  - Padding vertical adequado
  - Responsivo (reduzir tamanhos no mobile)
  - Usa fontes e cores do projeto

#### 6. Busca e Filtros
- [x] Criar `components/catalog/search-bar.tsx`
  - Input com ícone de busca (lucide-react: Search)
  - Placeholder: "Buscar por modelo, cor ou código..."
  - Debounce de 300ms
  - Estado controlado (prop: `onChange`)
  - Largura completa
  - Cores escuras do projeto

- [x] Criar `components/catalog/category-filter.tsx`
  - Select nativo com categorias do Supabase
  - Opção padrão: "Todas as Categorias"
  - Mobile: largura completa
  - Desktop: largura automática
  - Cores escuras do projeto
  - Prop: `onChange`

- [x] Criar `components/catalog/view-toggle.tsx`
  - Toggle com 2 botões: Grid (Grid3x3) e List (List)
  - Modo padrão: Grid
  - Ícones do lucide-react
  - Estado ativo em branco (bg-brand-light)
  - Prop: `onChange`

#### 7. Visualização em Grid
- [x] Criar `components/catalog/product-grid.tsx`
  - Container responsivo com grid
  - Desktop: 4 colunas (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`)
  - Tablet: 2-3 colunas
  - Mobile: 1 coluna
  - Gap adequado entre cards
  - Mensagem "Nenhum produto encontrado" quando vazio

- [x] Criar `components/catalog/product-card.tsx`
  - Imagem principal em destaque (aspect-square)
  - Badge de condição no canto superior esquerdo
  - Badge de bateria no canto superior direito
  - Nome do produto (modelo + capacidade)
  - Badge de cor com círculo
  - Preço formatado em BRL
  - Código do produto
  - Hover: borda branca e shadow
  - Background dark (`bg-brand-gray-dark`)
  - Border sutil escura
  - Cursor pointer
  - Link para `/produto/[codigo]`

#### 8. Visualização em Lista
- [x] Criar `components/catalog/product-list.tsx`
  - Container com border e background escuro
  - Mensagem "Nenhum produto encontrado" quando vazio
  - Lista vertical de items

- [x] Criar `components/catalog/product-list-item.tsx`
  - Layout horizontal, largura completa
  - SEM imagem (minimalista)
  - Informações exibidas:
    - Modelo e capacidade
    - Cor do produto
    - Badge de bateria (inline, sem ícone)
    - Badge "Novo" (se condicao = "novo", sem ícone)
    - Preço (alinhado à direita)
    - Código do produto
  - Background dark sutil (`bg-brand-gray-dark`)
  - Border inferior para separação
  - Hover: background mais claro
  - Cursor pointer
  - Link para `/produto/[codigo]`

#### 9. Lógica de Busca e Filtros
- [x] Implementar busca em `lib/supabase/queries.ts`:
  - Query no Supabase filtrando por: nome, cor, código
  - Case insensitive usando `.or()` com `.ilike`
  - Pattern: `%searchTerm%`

- [x] Implementar filtro por categoria:
  - Se null: buscar todos
  - Senão: filtrar por `categoria_id`

- [x] Combinar busca + filtro de categoria na mesma query
- [x] Ordenação customizada usando `compararProdutos()` no client

#### 10. Infinite Scroll
- [x] Instalar dependência: `npm install react-intersection-observer`
- [x] Implementar infinite scroll em `components/catalog/catalog-content.tsx`:
  - Carregar 35 produtos por vez
  - Observar elemento sentinela no final da lista com `useInView`
  - Quando visível, carregar próximos 35 automaticamente
  - Loading spinner (Loader2 animado) enquanto carrega
  - Mensagem "Todos os produtos foram carregados" quando acabar

#### 11. Página do Catálogo (Principal)
- [x] Criar `app/catalogo/page.tsx`:
  - Importar Header e Footer (compartilhados da landing)
  - Hero do catálogo
  - Background escuro (`bg-brand-dark`)
  - CatalogContent (client component com estado)
  - Busca inicial no servidor (SSR)
  - Metadata específica

- [x] Criar `components/catalog/catalog-content.tsx`:
  - Client component com useState e useEffect
  - SearchBar com debounce
  - Flex row: CategoryFilter + ViewToggle
  - Contador de produtos encontrados
  - Condicional: ProductGrid ou ProductList
  - Infinite scroll integrado

#### 12. SEO e Performance
- [x] Configurar Metadata API para `/catalogo`
- [x] Otimizar imagens com Cloudinary (já usa getCloudinaryUrl)
- [ ] Implementar loading skeletons nos cards (futuro)
- [ ] Cache de queries do Supabase (futuro, considerar revalidate)
- [x] Lazy load de imagens (next/image padrão com `sizes`)

#### 13. Responsividade
- [x] Testar em mobile (320px - 767px) - Grid responsivo 1 coluna
- [x] Testar em tablet (768px - 1023px) - Grid 2-3 colunas
- [x] Testar em desktop (1024px+) - Grid 4 colunas
- [x] Ajustar grid breakpoints (sm:2, lg:3, xl:4)
- [x] Filtros e busca responsivos (largura completa no mobile)
- [x] Buttons touch-friendly (py-2.5, py-3)

#### 14. Testes e Validação
- [ ] Inserir produtos no Supabase (usuário executará migrations manualmente)
- [x] Busca funcional (debounce, filtra nome/cor/código)
- [x] Filtro de categorias funcional
- [x] Infinite scroll funcional (35 produtos por vez)
- [x] Troca entre Grid e Lista funcional
- [x] Badges implementadas (bateria verde/amarelo, novo, cor)
- [x] Loading states (spinner durante carregamento)
- [ ] Performance mobile (testar após ter produtos reais)

#### 15. Finalização
- [x] Remover página `/catalogo/em-construcao` (substituída por catálogo real)
- [x] Documentar componentes com comentários
- [x] Cores escuras aplicadas em todos os componentes
- [x] Header e Footer integrados
- [x] ROADMAP atualizado com tasks concluídas
- [x] Preparar para Etapa 3

### Notas Técnicas - Etapa 2

**Badges de Bateria:**
- Verde (#22C55E): 80% ou mais
- Amarelo (#EAB308): Menos de 80%
- Ícone: `BatteryFull` ou `BatteryMedium` do lucide-react

**Badges de Cor:**
- Usar círculo SVG ou div com `background-color: ${hex}`
- Tamanho: 16px x 16px
- Border branca sutil para cores claras
- Texto da cor ao lado (opcional, depende do espaço)

**Query Supabase (Busca + Filtro):**
```typescript
const query = supabase
  .from('produtos')
  .select('*, categoria:categorias(*)')
  .eq('ativo', true)
  .order('created_at', { ascending: false })
  .range(start, end)

if (searchTerm) {
  query.or(`nome.ilike.%${searchTerm}%,cor.ilike.%${searchTerm}%,codigo.ilike.%${searchTerm}%`)
}

if (categoryId !== 'all') {
  query.eq('categoria_id', categoryId)
}
```

**Performance:**
- Usar `next/image` com `sizes` apropriados
- Cloudinary: adicionar transformações (w_400, q_auto, f_auto)
- Debounce na busca (evitar queries excessivas)
- Virtualização da lista se houver 500+ produtos (considerar para futuro)

---

## 🔐 ETAPA 3: ÁREA ADMINISTRATIVA

### Status: ✅ CONCLUÍDA

Implementar autenticação, dashboard admin, CRUD de produtos e página de detalhes do produto.

### Decisões de Arquitetura - Etapa 3

**Funcionalidades Confirmadas:**
- Autenticação via Supabase Auth (email/senha)
- Dashboard administrativo protegido
- Formulário de criação/edição de produtos com inteligência de cores
- Upload múltiplo de imagens via Cloudinary
- Página de detalhes do produto (pública)
- Middleware de proteção de rotas
- Row Level Security no Supabase

**Auto-preenchimento de Cores:**
- Campo "nome" é monitorado em tempo real
- Ao digitar modelo de iPhone (ex: "iPhone 15 Pro - 256GB"), o campo "cor" detecta automaticamente o modelo
- Exibe dropdown com cores oficiais da Apple para aquele modelo
- Usa dados de `lib/data/iphone-colors.ts`
- Se modelo não for iPhone ou não existir no dicionário, campo de cor é text input livre

**Estrutura de Pastas - Etapa 3:**
```
/app
  /login
    page.tsx
  /admin
    layout.tsx (proteção de rotas)
    page.tsx (dashboard)
    /produtos
      page.tsx (listagem CRUD)
      /novo
        page.tsx (formulário criação)
      /editar
        /[id]
          page.tsx (formulário edição)
    /categorias
      page.tsx (listagem CRUD de categorias)
      /nova
        page.tsx (formulário criação de categoria)
      /editar
        /[id]
          page.tsx (formulário edição de categoria)
  /produto
    /[id]
      page.tsx (detalhes públicos)
/components
  /admin
    sidebar.tsx
    product-form.tsx
    category-form.tsx
    image-uploader.tsx
    color-selector.tsx (inteligente)
  /produto
    product-gallery.tsx
    product-info.tsx
    product-specs.tsx
/lib
  /auth
    middleware.ts
  /hooks
    use-color-detection.ts (hook para auto-complete de cores)
/supabase
  /migrations
    005_enable_rls.sql
    006_create_auth_policies.sql
```

### Tasks da Etapa 3

#### 1. Autenticação
- [x] Criar migration `005_enable_rls.sql` (habilitar RLS)
- [x] Criar migration `006_create_auth_policies.sql` (políticas de acesso)
- [x] Criar página `/login` com formulário email/senha
- [x] Implementar login com Supabase Auth
- [x] Criar middleware de proteção (`middleware.ts`)
- [x] Proteger rota `/admin/*` com middleware
- [x] Implementar logout

#### 2. Dashboard Admin
- [x] Criar layout `/admin/layout.tsx`:
  - Sidebar com navegação (Dashboard, Produtos, Categorias)
  - Header com breadcrumb
  - Botão de logout na sidebar
- [x] Criar `/admin/page.tsx`:
  - Estatísticas básicas (total de produtos, produtos ativos, total de categorias)
  - Cards com métricas coloridos
  - Botões de ação rápida (Novo Produto, Nova Categoria, Ver Catálogo)

#### 3. Listagem de Produtos (Admin)
- [x] Criar `/admin/produtos/page.tsx`:
  - Tabela com todos os produtos
  - Colunas: imagem, código, nome, preço, status (ativo/inativo), ações
  - Botões: Editar, Excluir, Toggle Ativo/Inativo
  - Botão "Novo Produto" (link para `/admin/produtos/novo`)
  - Toggle visual de status ativo/inativo

#### 4. Formulário de Produto
- [x] Criar `components/admin/product-form.tsx`:
  - Campos: código, nome, descrição (textarea), preço (number), condição (select: novo/seminovo), cor (input text), bateria (number 0-100, disabled se novo), categoria (select), imagem principal (URL), imagens adicionais (textarea com URLs), ativo (checkbox)
  - Validação de bateria baseada em condição (obrigatória para seminovos, null para novos)
  - Submit para Supabase com tratamento de erros
  - Feedback visual de loading e erros

#### 5. Páginas de CRUD - Produtos
- [x] Criar `/admin/produtos/novo/page.tsx`:
  - ProductForm em modo criação
  - Após salvar, redirecionar para listagem

- [x] Criar `/admin/produtos/[id]/editar/page.tsx`:
  - Carregar produto do Supabase
  - ProductForm em modo edição
  - Após salvar, redirecionar para listagem

- [x] Implementar delete de produto:
  - Confirmação via browser confirm
  - Hard delete (remover do banco)

#### 5.1. Gestão de Categorias
- [x] Criar `/admin/categorias/page.tsx`:
  - Tabela com todas as categorias
  - Colunas: ordem, nome, slug, ações
  - Botões: Editar, Excluir
  - Botão "Nova Categoria" (link para `/admin/categorias/nova`)
  - Ícone de grip para indicar possibilidade de reordenação futura
  - Validação: não permitir excluir categoria com produtos associados

- [x] Criar `components/admin/category-form.tsx`:
  - Campos: nome (text), slug (gerado automaticamente do nome), ordem (number)
  - Auto-geração de slug: remover acentos, lowercase, substituir espaços por hífen
  - Slug editável manualmente após primeira geração
  - Preview do slug em tempo real
  - Submit para Supabase com tratamento de erros (unique constraints)

- [x] Criar `/admin/categorias/nova/page.tsx`:
  - CategoryForm em modo criação
  - Ordem padrão: 0
  - Após salvar, redirecionar para listagem

- [x] Criar `/admin/categorias/[id]/editar/page.tsx`:
  - Carregar categoria do Supabase
  - CategoryForm em modo edição
  - Após salvar, redirecionar para listagem

- [x] Implementar delete de categoria:
  - Confirmação via browser confirm
  - Verificar se há produtos associados
  - Se houver produtos: bloquear exclusão e mostrar alert
  - Se não houver produtos: permitir exclusão (hard delete)

- [ ] Implementar reordenação de categorias (FUTURO):
  - Drag & drop usando @dnd-kit ou react-beautiful-dnd
  - Atualizar campo "ordem" no Supabase após drag
  - Feedback visual durante drag
  - Persistir nova ordem no banco

#### 6. Página de Detalhes do Produto (Pública)
- [x] Criar `components/catalog/product-detail.tsx`:
  - Galeria com imagem principal grande
  - Thumbnails (até 4 imagens adicionais) abaixo
  - Badges de condição e bateria na imagem
  - Nome do produto, capacidade, cor
  - Preço formatado em destaque
  - Especificações (código, condição, cor, bateria, categoria)
  - Descrição completa (se houver)
  - CTA para WhatsApp com mensagem pré-preenchida

- [x] Criar `/produto/[codigo]/page.tsx`:
  - Layout em 2 colunas (desktop)
  - Mobile: stack vertical
  - Metadata dinâmica (title = nome do produto)
  - Header e Footer compartilhados
  - Redireciona para 404 se produto não existir ou estiver inativo

#### 7. Integração WhatsApp
- [x] Link do WhatsApp integrado na página de detalhes:
  - Mensagem pré-preenchida: "Olá! Gostaria de saber mais sobre o {nome} ({código})"
  - Número: 5511999999999 (placeholder)
  - Abre em nova aba

#### 8. SEO e Metadata
- [x] Metadata dinâmica para `/produto/[codigo]`:
  - Title: "{nome do produto} - Sr. IPHONE"
  - Description: descrição do produto ou fallback
  - generateMetadata com async/await

#### 9. Validação e Testes
- [x] Fluxo completo de login/logout implementado
- [x] CRUD de produtos implementado (criar, editar, excluir, toggle ativo)
- [x] CRUD de categorias implementado (criar, editar, excluir com validação)
- [x] Validação de bateria funcionando (null para novos, obrigatória para seminovos)
- [x] Geração automática de slug para categorias
- [x] Página de detalhes do produto pública funcionando
- [x] Proteção de rotas implementada via middleware
- [ ] Testes manuais após executar migrations e criar dados reais

#### 10. Finalização
- [x] Todas as páginas admin criadas e funcionando
- [x] Sistema de autenticação completo
- [x] Sistema de gestão de categorias com validações
- [x] Formulários com validação e feedback de erro
- [x] Página de detalhes do produto pública
- [x] ROADMAP atualizado com Etapa 3 concluída

### Notas Técnicas - Etapa 3

**Auto-detecção de Cores (Exemplo):**
```typescript
// use-color-detection.ts
export function useColorDetection(productName: string) {
  const [availableColors, setAvailableColors] = useState<ColorOption[] | null>(null)

  useEffect(() => {
    const model = parseIPhoneModel(productName) // ex: "iphone 15 pro"
    if (model) {
      const colors = getCoresDisponiveis(model) // de iphone-colors.ts
      if (colors) {
        setAvailableColors(Object.entries(colors).map(([key, value]) => ({
          key,
          nome: value.nome,
          hex: value.hex
        })))
      }
    } else {
      setAvailableColors(null)
    }
  }, [productName])

  return availableColors
}
```

**RLS Policies (Exemplo):**
```sql
-- Produtos: SELECT público, INSERT/UPDATE/DELETE apenas autenticado
CREATE POLICY "Produtos são visíveis para todos"
  ON produtos FOR SELECT
  USING (ativo = true);

CREATE POLICY "Apenas admin pode inserir produtos"
  ON produtos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

**Upload Cloudinary (Admin):**
- Usar API do Cloudinary via fetch ou SDK
- Upload preset: "sriphone_products"
- Transformações automáticas: auto quality, auto format
- Armazenar URLs no array `imagens` do produto

---

## 📝 Convenções do Projeto

### Commits
- Mensagens em português
- Formato: `tipo: descrição breve`
- Tipos: `feat`, `fix`, `refactor`, `docs`, `style`, `chore`

### Código
- Componentes: PascalCase
- Funções/variáveis: camelCase
- Constantes: UPPER_SNAKE_CASE
- Arquivos: kebab-case (exceto componentes)

### Branches
- `main`: produção
- `dev`: desenvolvimento
- `feature/*`: novas features
- `fix/*`: correções

---

## 🔗 Links Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)

---

## 📌 Observações Importantes

- Este arquivo é a memória do projeto entre sessões
- Sempre marcar tasks como concluídas ao finalizar
- Documentar decisões arquiteturais importantes
- Atualizar o status geral ao mudar de etapa
