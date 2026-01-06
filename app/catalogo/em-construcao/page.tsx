import Link from "next/link";
import { Construction, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { SITE_INFO, FONT_CLASSES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Em Construção | ${SITE_INFO.name}`,
  description: "Página em construção. Em breve você poderá acessar nosso catálogo completo de produtos.",
};

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-border-dark border border-border-subtle-dark">
          <Construction className="w-10 h-10 text-text-muted-dark" />
        </div>

        {/* Title */}
        <h1
          className={`${FONT_CLASSES.heading} text-text-primary-dark text-3xl mb-4 md:text-4xl`}
        >
          Em Construção
        </h1>

        {/* Description */}
        <p className="text-text-secondary-dark text-lg mb-8 leading-relaxed">
          Estamos preparando algo incrível para você. Em breve nosso catálogo
          estará disponível com todos os produtos.
        </p>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-light text-text-primary-light font-medium transition-all hover:opacity-80 hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
