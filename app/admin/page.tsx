/**
 * Dashboard Administrativo
 * Página inicial com estatísticas e atalhos rápidos
 */

import { Metadata } from "next";
import { getCategorias, getProdutos } from "@/lib/supabase/queries";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { QuickActions } from "@/components/admin/quick-actions";

export const metadata: Metadata = {
  title: "Dashboard - Admin",
  description: "Painel administrativo",
};

export default async function AdminDashboard() {
  // Fetch statistics
  const [categories, { produtos, total }] = await Promise.all([
    getCategorias(),
    getProdutos(undefined, { offset: 0, limit: 1000 }), // Fetch all products for stats
  ]);

  const activeProdutos = produtos.filter((p) => p.ativo).length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary-dark">Dashboard</h1>
        <p className="mt-2 text-text-secondary-dark">
          Bem-vindo ao painel administrativo
        </p>
      </div>

      {/* Statistics Cards */}
      <DashboardStats
        totalProdutos={total}
        activeProdutos={activeProdutos}
        totalCategorias={categories.length}
      />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
