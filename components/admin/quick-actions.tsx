/**
 * Atalhos Rápidos do Dashboard
 * Botões para ações comuns
 */

import Link from "next/link";
import { Plus, FolderPlus, Eye } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      href: "/admin/produtos/novo",
      label: "Novo Produto",
      description: "Adicionar um novo produto ao catálogo",
      icon: Plus,
    },
    {
      href: "/admin/categorias/nova",
      label: "Nova Categoria",
      description: "Criar uma nova categoria",
      icon: FolderPlus,
    },
    {
      href: "/catalogo",
      label: "Ver Catálogo",
      description: "Visualizar catálogo público",
      icon: Eye,
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-text-primary-dark">
        Ações Rápidas
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-6 transition-all hover:border-brand-light hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-border-dark p-2 text-brand-light group-hover:bg-brand-light group-hover:text-text-primary-light">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary-dark group-hover:text-brand-light">
                    {action.label}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary-dark">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
