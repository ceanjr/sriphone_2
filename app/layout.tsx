import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// Inter para corpo do texto
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Montserrat para títulos
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sr. IPHONE | Seu iPhone, com Classe e Confiança",
    template: "%s | Sr. IPHONE",
  },
  description:
    "Revisamos, avaliamos e garantimos. Cada detalhe do processo assegura a entrega do melhor da tecnologia, com segurança e qualidade garantida.",
  keywords: [
    "iphone",
    "seminovo",
    "vitória da conquista",
    "sr iphone",
    "iphone seminovo",
    "apple",
    "celular",
    "smartphone",
  ],
  authors: [{ name: "Sr. IPHONE" }],
  creator: "Sr. IPHONE",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.sriphonevca.com.br",
    title: "Sr. IPHONE | Seu iPhone, com Classe e Confiança",
    description:
      "Revisamos, avaliamos e garantimos. Cada detalhe do processo assegura a entrega do melhor da tecnologia, com segurança e qualidade garantida.",
    siteName: "Sr. IPHONE",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
