/**
 * Informações do site Sr. IPHONE
 * Constantes centralizadas para facilitar manutenção
 */

export const SITE_INFO = {
  name: "Sr. IPHONE",
  tagline: "Seu iPhone, com Classe e Confiança",
  description:
    "Revisamos, avaliamos e garantimos. Cada detalhe do processo assegura a entrega do melhor da tecnologia, com segurança e qualidade garantida.",

  contact: {
    phone: "(77) 98102-2246",
    phoneRaw: "+5577981022246",
    phoneHref: "tel:+5577981022246",
    email: "sriphonefinanceiro@gmail.com",
    emailHref: "mailto:sriphonefinanceiro@gmail.com",
  },

  address: {
    street: "Av. Frei Benjamin, 2427 - Brasil",
    city: "Vitória da Conquista - BA",
    zip: "45051-075",
    complement: "Pátio Brasil - 1º Andar - Sala 109",
    full: "Av. Frei Benjamin, 2427 - Brasil, Vitória da Conquista - BA, 45051-075",
  },

  hours: {
    weekdays: "Segunda a Sexta: 9h às 18h",
    saturday: "Sábado: 9h às 13h",
    sunday: "Domingo: Fechado",
  },

  social: {
    instagram: {
      url: "https://www.instagram.com/sr.iphonevca",
      handle: "@sr.iphonevca",
      displayName: "sr.iphonevca",
    },
  },

  maps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241.02940971318205!2d-40.85382426833111!3d-14.854943494569762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7463b65867a14e1%3A0x10e79662a50bb7db!2sSr%20iPhone%20-%20Vit%C3%B3ria%20da%20Conquista!5e0!3m2!1spt-BR!2sbr!4v1761616029401!5m2!1spt-BR!2sbr",
  },

  warranty: {
    period: "1 ANO",
    disclaimer: "*Consulte os termos vigentes e aplicabilidade no ato da compra.",
  },

  experience: {
    years: 10,
    since: 2014,
    description: "Transformando tecnologia em confiança desde 2014",
    disclaimer: "*Experiência acumulada no segmento de smartphones e tecnologia móvel.",
  },

  routes: {
    home: "/",
    catalog: "/catalogo/em-construcao", // TODO: Mudar para "/catalogo" quando implementado
    catalogUnderConstruction: "/catalogo/em-construcao",
    admin: {
      login: "/admin/login",
      dashboard: "/admin/dashboard",
    },
  },
} as const;

/**
 * Palavras dinâmicas para a seção do Instagram
 */
export const INSTAGRAM_DYNAMIC_WORDS = [
  "novidades",
  "ofertas",
  "lançamentos",
  "promoções",
  "tendências",
  "exclusividades",
] as const;

/**
 * Features do catálogo (seção AcessoCatalogo)
 */
export const CATALOG_FEATURES = [
  {
    icon: "camera",
    title: "Fotos em HD",
    description: "Imagens detalhadas de cada produto",
  },
  {
    icon: "clock",
    title: "Preços Atualizados",
    description: "Valores sempre em tempo real",
  },
  {
    icon: "file-text",
    title: "Descrições Completas",
    description: "Especificações técnicas e detalhes",
  },
] as const;
