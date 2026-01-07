"use client";

/**
 * Header Administrativo
 * Barra superior com breadcrumb e informações do usuário
 */

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function AdminHeader() {
  const pathname = usePathname();

  // Generate breadcrumb from pathname
  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 1) {
      return "Dashboard";
    }

    // Capitalize and format segments
    return segments
      .slice(1)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" / ");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border-dark bg-brand-gray-dark">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-muted-dark">Admin</span>
          <ChevronRight className="h-4 w-4 text-text-muted-dark" />
          <span className="font-medium text-text-primary-dark">
            {getBreadcrumb()}
          </span>
        </div>

        {/* Right Side - Can add user menu, notifications, etc. */}
        <div className="flex items-center gap-4">
          {/* Placeholder for future additions */}
        </div>
      </div>
    </header>
  );
}
