# ROADMAP - Sr. IPHONE

Projeto de migração e modernização do site Sr. IPHONE de Astro para Next.js.

## 📋 Status Geral do Projeto

- **Etapa Atual:** Etapa 1 Concluída ✅ | Etapa 2 Pendente
- **Última Atualização:** 2026-01-06

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

### Status: 📝 Planejamento

Esta etapa será detalhada após conclusão da Etapa 1.

**Escopo inicial:**
- Listagem de produtos com filtros
- Visualização detalhada de produto
- Integração com Supabase (CRUD)
- Upload de imagens via Cloudinary
- Caching inteligente
- Sistema de busca

---

## 🔐 ETAPA 3: ÁREA ADMINISTRATIVA

### Status: 📝 Planejamento

Esta etapa será detalhada após conclusão da Etapa 2.

**Escopo inicial:**
- Sistema de autenticação (Supabase Auth)
- Dashboard administrativo
- CRUD de produtos
- Gerenciamento de conteúdo do site
- Middleware de proteção de rotas
- Row Level Security (RLS) no Supabase

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
