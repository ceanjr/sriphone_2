"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_INFO, FONT_CLASSES } from "@/lib/constants";

export function Experience() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 20;
    const increment = SITE_INFO.experience.years / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= SITE_INFO.experience.years) {
        setCount(SITE_INFO.experience.years);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 bg-brand-light md:py-32"
    >
      {/* Top border decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />

      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center gap-8 md:flex-row md:justify-center md:text-left md:gap-16">
          {/* Number Display */}
          <div className="flex items-center gap-2">
            <span className="text-[3rem] font-light text-text-muted-light md:text-[4rem]">
              +
            </span>
            <span
              className={`${FONT_CLASSES.headingExtraBold} text-[7rem] leading-none text-text-primary-light min-w-[100px] text-center tracking-tight md:text-[10rem] md:min-w-[140px] lg:text-[12rem] lg:min-w-[180px]`}
            >
              {count}
            </span>
            <span className="text-[1.5rem] self-start mt-2 text-text-muted-light">
              *
            </span>
          </div>

          {/* Text Content */}
          <div className="max-w-[600px]">
            <p className="text-xs font-semibold text-text-muted-light uppercase tracking-[0.15em] mb-4">
              Anos de Experiência
            </p>
            <h2
              className={`${FONT_CLASSES.heading} text-text-primary-light text-[2rem] leading-tight mb-4 md:text-[2.5rem] lg:text-[3rem]`}
            >
              {SITE_INFO.experience.description}
            </h2>
            <p className="text-[0.7rem] text-text-muted-light italic md:text-xs">
              {SITE_INFO.experience.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
