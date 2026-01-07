"use client";

/**
 * Sidebar Administrativa
 * Navegação lateral com links para todas as seções administrativas
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, Package, LogOut, Eye } from "lucide-react";
import { FONT_CLASSES } from "@/lib/constants/colors";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/categorias",
    label: "Categorias",
    icon: FolderOpen,
  },
  {
    href: "/admin/produtos",
    label: "Produtos",
    icon: Package,
  },
  {
    href: "/catalogo",
    label: "Ver Catálogo",
    icon: Eye,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Overlay - TODO: implement mobile menu toggle */}
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-border-dark bg-brand-gray-dark lg:flex">
        {/* Logo / Brand */}
        <div className="flex h-16 items-center border-b border-border-dark px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <h1
              className={`text-xl font-bold text-text-primary-dark ${FONT_CLASSES.heading}`}
            >
              Sr. IPHONE
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-light text-text-primary-light"
                    : "text-text-secondary-dark hover:bg-border-dark hover:text-text-primary-dark"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer - Logout */}
        <div className="border-t border-border-dark p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-text-secondary-dark transition-colors hover:bg-border-dark hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
