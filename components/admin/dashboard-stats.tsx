/**
 * Cards de Estatísticas do Dashboard
 * Exibe métricas principais: produtos, categorias, etc.
 */

import { Package, FolderOpen, CheckCircle } from "lucide-react";

interface DashboardStatsProps {
  totalProdutos: number;
  activeProdutos: number;
  totalCategorias: number;
}

export function DashboardStats({
  totalProdutos,
  activeProdutos,
  totalCategorias,
}: DashboardStatsProps) {
  const stats = [
    {
      label: "Total de Produtos",
      value: totalProdutos,
      icon: Package,
      color: "text-blue-400",
    },
    {
      label: "Produtos Ativos",
      value: activeProdutos,
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      label: "Categorias",
      value: totalCategorias,
      icon: FolderOpen,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary-dark">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-text-primary-dark">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-full bg-border-dark p-3 ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
