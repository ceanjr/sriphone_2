import Link from "next/link";
import { ArrowRight, Camera, Clock, FileText } from "lucide-react";
import { SITE_INFO, CATALOG_FEATURES, FONT_CLASSES } from "@/lib/constants";

const iconMap = {
  camera: Camera,
  clock: Clock,
  "file-text": FileText,
};

export function CatalogCTA() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-brand-dark to-brand-gray-dark md:py-32">
      <div className="container mx-auto">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24 md:items-center">
          {/* Text Side */}
          <div className="flex flex-col gap-6">
            <span className="text-xs font-semibold text-text-muted-dark uppercase tracking-[0.15em]">
              CATÁLOGO COMPLETO
            </span>

            <h2
              className={`${FONT_CLASSES.heading} text-text-primary-dark text-[2.5rem] leading-tight md:text-[3.5rem]`}
            >
              Explore nossa{" "}
              <span className="block bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
                coleção exclusiva
              </span>
            </h2>

            <p className="text-text-muted-dark text-lg leading-relaxed max-w-[500px]">
              Acesse nosso catálogo digital e conheça todos os produtos
              disponíveis com informações detalhadas, preços atualizados e
              imagens em alta qualidade.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-6 mt-4">
              {CATALOG_FEATURES.map((feature) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-border-dark border border-border-subtle-dark rounded-lg text-text-primary-dark">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <strong className="text-text-primary-dark text-[0.95rem] font-semibold">
                        {feature.title}
                      </strong>
                      <span className="text-text-muted-dark text-[0.85rem]">
                        {feature.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link
              href={SITE_INFO.routes.catalog}
              className="relative inline-flex items-center gap-3 self-start px-8 py-4 mt-4 overflow-hidden rounded-xl bg-brand-light text-text-primary-light font-semibold transition-all hover:shadow-lg hover:-translate-y-1 group"
            >
              <span className="relative z-10">Acessar Catálogo</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />

              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_ease-in-out] skew-x-12" />

              {/* Hover gradient */}
              <span className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>

          {/* Visual Side - Device Mockup */}
          <div className="relative flex items-center justify-center min-h-[500px]">
            {/* Device Frame */}
            <div className="relative w-[280px] h-[560px] bg-gradient-to-br from-border-subtle-dark to-border-dark rounded-[40px] p-3 shadow-2xl animate-[float_6s_ease-in-out_infinite]">
              {/* Screen */}
              <div className="w-full h-full bg-black rounded-[32px] overflow-hidden">
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[100px] h-6 bg-black rounded-b-[20px] z-10" />

                {/* Content Preview */}
                <div className="p-8 pt-12 animate-[scroll_8s_linear_infinite]">
                  {/* Header lines */}
                  <div className="space-y-2 mb-6">
                    <div className="h-3 w-[40%] bg-border-dark rounded" />
                    <div className="h-3 w-[60%] bg-border-dark rounded" />
                  </div>

                  {/* Grid of cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gradient-to-br from-border-dark to-black rounded-xl border border-border-subtle-dark animate-[pulse_3s_ease-in-out_infinite]"
                        style={{ animationDelay: `${i * 0.5}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-[10%] right-[-50px] w-[200px] h-[200px] rounded-full bg-gradient-radial from-white/5 to-transparent animate-[float_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-[20%] left-[-30px] w-[150px] h-[150px] rounded-full bg-gradient-radial from-white/5 to-transparent animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: "2s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
