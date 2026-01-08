"use client";

/**
 * Mobile Bottom Navigation
 * Fixed navigation bar at the bottom for mobile admin area
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Store } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/admin",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: "/admin/produtos",
      icon: Package,
      label: "Produtos",
    },
    {
      href: "/admin/categorias",
      icon: FolderTree,
      label: "Categorias",
    },
    {
      href: "/catalogo",
      icon: Store,
      label: "Catálogo",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-dark bg-brand-gray-dark md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 px-2 py-3 text-xs transition-colors ${
                isActive
                  ? "text-brand-light"
                  : "text-text-secondary-dark hover:text-text-primary-dark"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
