/**
 * Layout Administrativo
 * Sidebar com navegação e área de conteúdo principal
 */

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { MobileBottomNav } from "@/components/admin/mobile-bottom-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-brand-dark">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Header */}
        <AdminHeader />

        {/* Page Content - Extra padding on mobile for bottom nav */}
        <main className="flex-1 p-6 pb-24 md:pb-6">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
