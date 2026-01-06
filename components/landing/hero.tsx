import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { RESPONSIVE_IMAGES, SITE_INFO, FONT_CLASSES } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 pt-8 pb-20 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-81px)] md:pt-0 md:pb-[140px] bg-brand-dark">
      {/* Logo/Image */}
      <div className="mb-6 md:mb-8">
        <Image
          src={RESPONSIVE_IMAGES.landing.hero.mobile}
          alt={SITE_INFO.name}
          width={200}
          height={200}
          priority
          className="w-[50px] max-w-[90vw] block md:hidden"
        />
        <Image
          src={RESPONSIVE_IMAGES.landing.hero.desktop}
          alt={SITE_INFO.name}
          width={300}
          height={300}
          priority
          className="w-[80px] hidden md:block"
        />
      </div>

      {/* Title */}
      <h1
        className={`${FONT_CLASSES.heading} text-text-primary-dark text-[2.2rem] leading-tight mb-4 md:text-[3.2rem]`}
      >
        Seu iPhone, com{' '}
        <strong className="font-bold">Classe e Confiança</strong>
      </h1>

      {/* Tagline */}
      <p className="text-text-secondary-dark text-lg max-w-2xl mb-8 leading-relaxed md:text-xl md:max-w-[600px]">
        {SITE_INFO.description}
      </p>

      {/* Scroll Arrow */}
      <ChevronDown className="w-10 h-10 absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center text-text-primary-dark animate-bounce hover:opacity-80 transition-opacity" />
    </section>
  );
}
