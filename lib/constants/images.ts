/**
 * Constantes de imagens hospedadas no Cloudinary
 *
 * Estrutura no Cloudinary:
 * sriphone/
 *   ├── landing/
 *   │   ├── logo-fundo.webp
 *   │   ├── barbudo.webp
 *   │   ├── arrow-down.svg
 *   │   └── insta.webp
 *   ├── products/
 *   └── icons/
 */

const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_FOLDER = "sriphone";

/**
 * Gera URL completa do Cloudinary com transformações opcionais
 * @param path - Caminho da imagem após a pasta sriphone/ (ex: "landing/logo-fundo.webp")
 * @param transformations - Transformações Cloudinary (ex: "w_500,h_500,c_fill")
 */
export function getCloudinaryUrl(path: string, transformations?: string): string {
  const baseUrl = transformations
    ? `${CLOUDINARY_BASE_URL}/${transformations}/${CLOUDINARY_FOLDER}/${path}`
    : `${CLOUDINARY_BASE_URL}/${CLOUDINARY_FOLDER}/${path}`;

  return baseUrl;
}

/**
 * Imagens da Landing Page
 */
export const IMAGES = {
  landing: {
    logo: getCloudinaryUrl("landing/logo-fundo.webp"),
    hero: getCloudinaryUrl("landing/barbudo.webp"),
    instagram: getCloudinaryUrl("landing/insta.webp"),
  },
  icons: {
    arrowDown: getCloudinaryUrl("landing/arrow-down.svg"),
  },
} as const;

/**
 * URLs otimizadas para diferentes tamanhos (responsivo)
 */
export const RESPONSIVE_IMAGES = {
  landing: {
    hero: {
      mobile: getCloudinaryUrl("landing/barbudo.webp", "w_400,q_auto,f_auto"),
      tablet: getCloudinaryUrl("landing/barbudo.webp", "w_768,q_auto,f_auto"),
      desktop: getCloudinaryUrl("landing/barbudo.webp", "w_1200,q_auto,f_auto"),
    },
    logo: {
      small: getCloudinaryUrl("landing/logo-fundo.webp", "h_68,q_auto,f_auto"),
      large: getCloudinaryUrl("landing/logo-fundo.webp", "h_100,q_auto,f_auto"),
    },
  },
} as const;
