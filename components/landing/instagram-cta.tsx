"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  IMAGES,
  SITE_INFO,
  INSTAGRAM_DYNAMIC_WORDS,
  FONT_CLASSES,
} from "@/lib/constants";

export function InstagramCTA() {
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % INSTAGRAM_DYNAMIC_WORDS.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-brand-dark md:py-32">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center gap-12 md:flex-row md:justify-between md:items-center">
          {/* Text Content */}
          <div className="text-center max-w-[600px] md:text-left md:flex-1">
            <span className="text-xs font-semibold text-text-muted-dark uppercase tracking-[0.15em] mb-4 block">
              CONECTE-SE
            </span>

            <h2
              className={`${FONT_CLASSES.heading} text-text-primary-dark text-[2rem] leading-tight mb-6 md:text-[3.5rem]`}
            >
              Acompanhe nossas{" "}
              <span className="relative inline-block min-w-[200px]">
                <span
                  className={`block bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent font-bold transition-all duration-300 ${
                    isAnimating
                      ? "opacity-0 translate-y-4 scale-95"
                      : "opacity-100 translate-y-0 scale-100"
                  }`}
                >
                  {INSTAGRAM_DYNAMIC_WORDS[currentWord]}
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
              </span>
            </h2>

            <p className="text-text-muted-dark text-lg leading-relaxed max-w-[500px] mx-auto md:mx-0">
              Novidades exclusivas, bastidores e ofertas especiais direto no seu
              feed. Seja parte da nossa comunidade.
            </p>
          </div>

          {/* Instagram Card */}
          <Link
            href={SITE_INFO.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col items-center gap-4 px-16 py-12 min-w-[280px] overflow-hidden rounded-3xl bg-gradient-to-br from-border-dark to-black border border-border-subtle-dark transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-border-subtle-light hover:shadow-2xl group"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-full skew-x-12" />

            {/* Icon */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-300 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <Image
                src={IMAGES.landing.instagram}
                alt="Instagram"
                width={74}
                height={74}
                className="rounded-full"
              />
            </div>

            {/* Username */}
            <span className="text-text-primary-dark text-2xl font-bold tracking-tight">
              {SITE_INFO.social.instagram.handle}
            </span>

            {/* CTA Text */}
            <span className="text-text-muted-dark text-sm font-medium transition-colors group-hover:text-text-primary-dark">
              Seguir agora
            </span>

            {/* Arrow Icon */}
            <ExternalLink className="absolute top-6 right-6 w-8 h-8 text-text-muted-dark transition-all group-hover:text-text-primary-dark group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-[10%] right-[-50px] w-[200px] h-[200px] rounded-full bg-gradient-radial from-white/5 to-transparent pointer-events-none animate-[float_8s_ease-in-out_infinite]" />
      <div
        className="absolute bottom-[20%] left-[-30px] w-[150px] h-[150px] rounded-full bg-gradient-radial from-white/5 to-transparent pointer-events-none animate-[float_8s_ease-in-out_infinite]"
        style={{ animationDelay: "2s" }}
      />
    </section>
  );
}
