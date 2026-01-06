"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IMAGES, SITE_INFO } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const isCatalogPage = pathname?.startsWith("/catalogo");

  return (
    <header className="sticky top-0 z-50 bg-brand-dark border-b border-border-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image
              src={IMAGES.landing.logo}
              alt={SITE_INFO.name}
              width={136}
              height={68}
              priority
              className="h-[34px] w-auto md:h-[50px]"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3">
            {!isCatalogPage && (
              <Link
                href={SITE_INFO.routes.catalog}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all rounded-lg bg-brand-light text-text-primary-light hover:opacity-80 hover:-translate-y-0.5 md:px-6 md:py-2.5 md:text-base"
              >
                Catálogo
              </Link>
            )}

            {isCatalogPage && (
              <Link
                href={SITE_INFO.routes.admin.login}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all rounded-lg border border-border-subtle-dark text-text-primary-dark hover:bg-brand-light hover:text-text-primary-light hover:border-brand-light md:px-5 md:py-2.5 md:text-base"
              >
                <span>Admin</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
