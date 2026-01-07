/**
 * Badge de Bateria
 * Exibe a porcentagem da bateria com cor dinâmica:
 * - Verde (>= 80%)
 * - Amarelo (< 80%)
 */

import { Battery } from "lucide-react";
import { getBatteryColorClass, getBatteryBgClass } from "@/lib/utils/get-battery-color";
import { cn } from "@/lib/utils";

interface BatteryBadgeProps {
  bateria: number;
  className?: string;
  showIcon?: boolean;
}

export function BatteryBadge({
  bateria,
  className,
  showIcon = true,
}: BatteryBadgeProps) {
  const colorClass = getBatteryColorClass(bateria);
  const bgClass = getBatteryBgClass(bateria);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        bgClass,
        colorClass,
        className
      )}
    >
      {showIcon && <Battery className="h-3.5 w-3.5" />}
      <span>{bateria}%</span>
    </div>
  );
}
