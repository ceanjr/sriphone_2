/**
 * Constantes de cores do site Sr. IPHONE
 * Baseado no design legado em Astro
 *
 * IMPORTANTE: Estas cores estão sincronizadas com o tailwind.config.ts
 * Use as classes Tailwind quando possível (ex: bg-brand-dark, text-text-muted-dark)
 */

export const COLORS = {
  // Fundos
  background: {
    dark: "#0a0a0a",
    light: "#ffffff",
    grayLight: "#f8f8f8",
    grayDark: "#000000",
    lightGradient: "linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%)",
    darkGradient: "linear-gradient(180deg, #0a0a0a 0%, #000000 100%)",
  },

  // Texto
  text: {
    primary: {
      dark: "#ffffff", // texto em fundo escuro
      light: "#000000", // texto em fundo claro
    },
    secondary: {
      dark: "#e0e0e0",
      light: "#333333",
    },
    muted: {
      dark: "#999999",
      light: "#666666",
    },
  },

  // Bordas e separadores
  border: {
    dark: "#1a1a1a",
    light: "#e0e0e0",
    subtle: {
      dark: "#2a2a2a",
      light: "#dddddd",
    },
  },

  // Gradientes de destaque
  gradient: {
    text: {
      light: "linear-gradient(135deg, #ffffff 0%, #888888 100%)",
      dark: "linear-gradient(135deg, #000000 0%, #444444 100%)",
    },
    shine: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
  },

  // Estados de hover
  hover: {
    opacity: 0.8,
  },
} as const;

/**
 * Classes Tailwind correspondentes às cores do design
 * Sincronizadas com tailwind.config.ts
 */
export const COLOR_CLASSES = {
  background: {
    dark: "bg-brand-dark",
    light: "bg-brand-light",
    grayLight: "bg-brand-gray-light",
    grayDark: "bg-brand-gray-dark",
  },
  text: {
    primary: {
      dark: "text-text-primary-dark",
      light: "text-text-primary-light",
    },
    secondary: {
      dark: "text-text-secondary-dark",
      light: "text-text-secondary-light",
    },
    muted: {
      dark: "text-text-muted-dark",
      light: "text-text-muted-light",
    },
  },
  border: {
    dark: "border-border-dark",
    light: "border-border-light",
    subtle: {
      dark: "border-border-subtle-dark",
      light: "border-border-subtle-light",
    },
  },
} as const;

/**
 * Classes de fonte para títulos e corpo
 */
export const FONT_CLASSES = {
  body: "font-sans font-body", // Inter 400
  bodyMedium: "font-sans font-medium", // Inter 500
  bodySemibold: "font-sans font-semibold", // Inter 600
  heading: "font-heading font-semibold", // Montserrat 600
  headingBold: "font-heading font-bold", // Montserrat 700
  headingExtraBold: "font-heading font-extrabold", // Montserrat 800
} as const;
