/**
 * Badge de Condição
 * Exibe apenas quando o produto é NOVO
 * Não exibe para seminovos (bateria já indica)
 */

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConditionBadgeProps {
  condicao: "novo" | "seminovo";
  className?: string;
  showIcon?: boolean;
}

export function ConditionBadge({
  condicao,
  className,
  showIcon = true,
}: ConditionBadgeProps) {
  // Não exibir badge para seminovos
  if (condicao !== "novo") {
    return null;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600",
        className
      )}
    >
      {showIcon && <Sparkles className="h-3.5 w-3.5" />}
      <span>Novo</span>
    </div>
  );
}
