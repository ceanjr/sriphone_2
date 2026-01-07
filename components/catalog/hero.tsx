/**
 * Hero do Catálogo
 * Seção inicial da página de catálogo com logo e texto
 */

import Image from "next/image";
import { IMAGES } from "@/lib/constants";
import { FONT_CLASSES } from "@/lib/constants/colors";

export function CatalogHero() {
  return (
    <section className="border-b border-border-dark bg-brand-dark py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 relative h-24 w-24 md:h-32 md:w-32">
            <Image
              src={IMAGES.landing.hero}
              alt="SriPhone"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <h1 className={`mb-3 text-4xl text-text-primary-dark md:text-5xl ${FONT_CLASSES.heading}`}>
            Catálogo de iPhones
          </h1>
          <p className={`max-w-2xl text-lg text-text-secondary-dark ${FONT_CLASSES.body}`}>
            Escolha entre os melhores iPhones novos e seminovos com garantia de qualidade
          </p>
        </div>
      </div>
    </section>
  );
}
