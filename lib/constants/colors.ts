/**
 * Constantes de cores do site Sr. IPHONE
 * Baseado no design legado em Astro
 */

export const COLORS = {
  // Fundos
  background: {
    dark: "#0a0a0a",
    light: "#ffffff",
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
      light: "#ddd",
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
 */
export const COLOR_CLASSES = {
  background: {
    dark: "bg-[#0a0a0a]",
    light: "bg-white",
  },
  text: {
    primary: {
      dark: "text-white",
      light: "text-black",
    },
    muted: {
      dark: "text-[#999]",
      light: "text-[#666]",
    },
  },
  border: {
    dark: "border-[#1a1a1a]",
    light: "border-[#e0e0e0]",
    subtle: {
      dark: "border-[#2a2a2a]",
      light: "border-[#ddd]",
    },
  },
} as const;
