import { SITE_INFO, FONT_CLASSES } from "@/lib/constants";

export function Seminovos() {
  return (
    <section
      id="seminovos"
      className="relative py-24 px-4 bg-gradient-to-b from-brand-light to-brand-gray-light md:py-32"
    >
      {/* Top border decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />

      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center gap-6 md:flex-row md:justify-between md:items-center md:text-left md:gap-12">
          {/* Text */}
          <h2
            className={`${FONT_CLASSES.heading} text-text-primary-light text-[1.8rem] leading-tight md:text-[2.5rem] md:max-w-[500px] lg:text-[3rem]`}
          >
            Seminovos revisados por especialistas com garantia de até
          </h2>

          {/* Big number */}
          <div className="relative flex-shrink-0">
            <strong
              className={`${FONT_CLASSES.headingExtraBold} text-[5rem] leading-none block bg-gradient-to-br from-black to-gray-600 bg-clip-text text-transparent md:text-[7rem] lg:text-[9rem]`}
            >
              {SITE_INFO.warranty.period}
              <span className="text-[1.5rem] align-super ml-2 text-text-muted-light md:text-[2rem] lg:text-[2.5rem]">
                *
              </span>
            </strong>

            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[60px] h-[3px] bg-black rounded-full md:-bottom-3" />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-text-muted-light text-xs italic mt-8 md:text-sm md:absolute md:bottom-[-40px] md:left-1/2 md:-translate-x-1/2 md:w-full md:mt-0">
          {SITE_INFO.warranty.disclaimer}
        </p>
      </div>
    </section>
  );
}
