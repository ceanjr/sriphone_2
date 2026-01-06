# Constantes do Projeto

Esta pasta contém todas as constantes reutilizáveis do projeto Sr. IPHONE.

## 📁 Estrutura

### `colors.ts`
Cores do design e classes Tailwind correspondentes. **Sincronizado com `tailwind.config.ts`**.

```typescript
import { COLORS, COLOR_CLASSES, FONT_CLASSES } from "@/lib/constants";

// CSS-in-JS (evite quando possível)
const style = { background: COLORS.background.dark };

// Classes Tailwind (recomendado)
<div className={COLOR_CLASSES.background.dark}>

// Classes de fonte
<h1 className={FONT_CLASSES.heading}>Título</h1>
<p className={FONT_CLASSES.body}>Corpo do texto</p>
```

**Classes Tailwind disponíveis:**
- Fundos: `bg-brand-dark`, `bg-brand-light`, `bg-brand-gray-light`
- Texto: `text-text-primary-dark`, `text-text-muted-light`
- Bordas: `border-border-dark`, `border-border-subtle-light`
- Fontes: `font-sans` (Inter), `font-heading` (Montserrat)

### `images.ts`
URLs das imagens do Cloudinary com helper para transformações.

```typescript
import { IMAGES, getCloudinaryUrl, RESPONSIVE_IMAGES } from "@/lib/constants";

// Imagem direta
<Image src={IMAGES.landing.logo} alt="Logo" />

// Imagem com transformações personalizadas
<Image src={getCloudinaryUrl("landing/logo-fundo.webp", "w_300,h_100")} />

// Imagens responsivas predefinidas
<Image src={RESPONSIVE_IMAGES.landing.hero.mobile} />
```

### `site-info.ts`
Informações do site (contato, endereço, redes sociais, etc).

```typescript
import { SITE_INFO, INSTAGRAM_DYNAMIC_WORDS, CATALOG_FEATURES } from "@/lib/constants";

<a href={SITE_INFO.contact.phoneHref}>{SITE_INFO.contact.phone}</a>
<p>{SITE_INFO.address.full}</p>
```

## 🎯 Por que usar constantes?

1. **Manutenção centralizada**: Altere em um lugar, reflete em todo o site
2. **Type safety**: TypeScript garante valores corretos
3. **Autocomplete**: IDE sugere valores disponíveis
4. **Documentação**: Código autodocumentado
5. **Reutilização**: Evita duplicação de strings/valores

## 🚀 Como usar

Importe do index principal:

```typescript
import { SITE_INFO, IMAGES, COLORS } from "@/lib/constants";
```

Ou importe diretamente:

```typescript
import { SITE_INFO } from "@/lib/constants/site-info";
```
