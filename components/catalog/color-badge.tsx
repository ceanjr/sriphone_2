/**
 * Color Badge Dinâmico
 * - Badge com cor oficial para iPhones (nome e cor hex)
 * - Badge branco com texto para outros produtos
 */

import { getCorOficial, isIPhone, getContrastColor } from "@/lib/data/iphone-colors";

interface ColorBadgeProps {
  productName: string;
  color: string;
  className?: string;
}

export function ColorBadge({ productName, color, className = "" }: ColorBadgeProps) {
  // If no color, don't render
  if (!color) return null;

  // Check if iPhone and get official color details
  if (isIPhone(productName)) {
    const colorDetails = getCorOficial(productName, color);

    if (colorDetails) {
      const textColor = getContrastColor(colorDetails.hex);

      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${className}`}
          style={{
            backgroundColor: colorDetails.hex,
            color: textColor,
          }}
        >
          <span
            className="h-2 w-2 rounded-full border border-current opacity-50"
            style={{ backgroundColor: textColor }}
          />
          {colorDetails.nome}
        </span>
      );
    }
  }

  // Default badge with white background for non-iPhone products or unknown colors
  return (
    <span
      className={`inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-black ${className}`}
    >
      {color.charAt(0).toUpperCase() + color.slice(1)}
    </span>
  );
}
