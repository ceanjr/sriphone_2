/**
 * Badge de Cor
 * Exibe um círculo colorido com a cor do iPhone
 * Usa as cores oficiais da Apple do arquivo iphone-colors.ts
 */

import { cn } from "@/lib/utils";
import { getCorOficial } from "@/lib/data/iphone-colors";
import { extrairModeloFromNome } from "@/lib/utils/parse-iphone-model";

interface ColorBadgeProps {
  cor: string;
  modeloProduto: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ColorBadge({
  cor,
  modeloProduto,
  className,
  size = "md",
}: ColorBadgeProps) {
  const modelo = extrairModeloFromNome(modeloProduto);
  const corOficial = getCorOficial(modelo || "", cor);
  const hexColor = corOficial?.hex || "#9CA3AF"; // Cinza padrão se não encontrar

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5",
        className
      )}
    >
      <div
        className={cn(
          "rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200",
          sizeClasses[size]
        )}
        style={{ backgroundColor: hexColor }}
        title={cor}
      />
      <span className="text-xs font-medium text-gray-700 capitalize">
        {cor}
      </span>
    </div>
  );
}
