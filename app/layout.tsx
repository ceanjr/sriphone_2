import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sr. IPHONE | Seu iPhone, com Classe e Confiança",
  description: "Revisamos, avaliamos e garantimos. Cada detalhe do processo assegura a entrega do melhor da tecnologia, com segurança e qualidade garantida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
