"use client";

/**
 * Color Picker Dinâmico
 * - Dropdown com cores oficiais para iPhones
 * - Campo de texto para outros produtos
 */

import { useEffect, useState } from "react";
import { getCoresDisponiveis, isIPhone, getContrastColor } from "@/lib/data/iphone-colors";

interface ColorPickerProps {
  productName: string;
  value: string;
  onChange: (color: string) => void;
  required?: boolean;
}

export function ColorPicker({ productName, value, onChange, required = false }: ColorPickerProps) {
  const [availableColors, setAvailableColors] = useState<Record<string, { nome: string; hex: string }> | null>(null);

  useEffect(() => {
    // Check if product is iPhone and get available colors
    if (isIPhone(productName)) {
      const cores = getCoresDisponiveis(productName);
      setAvailableColors(cores);
    } else {
      setAvailableColors(null);
    }
  }, [productName]);

  // If iPhone with available colors, show dropdown
  if (availableColors) {
    return (
      <div>
        <label
          htmlFor="cor"
          className="mb-2 block text-sm font-medium text-text-primary-dark"
        >
          Cor {required && <span className="text-red-400">*</span>}
        </label>
        <select
          id="cor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
        >
          <option value="">Selecione uma cor</option>
          {Object.entries(availableColors).map(([key, color]) => (
            <option key={key} value={key}>
              {color.nome}
            </option>
          ))}
        </select>

        {/* Color Preview */}
        {value && availableColors[value] && (
          <div className="mt-2 flex items-center gap-2">
            <div
              className="h-8 w-8 rounded border border-border-subtle-dark"
              style={{ backgroundColor: availableColors[value].hex }}
            />
            <span className="text-sm text-text-secondary-dark">
              {availableColors[value].nome}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default text input for non-iPhone products
  return (
    <div>
      <label
        htmlFor="cor"
        className="mb-2 block text-sm font-medium text-text-primary-dark"
      >
        Cor
      </label>
      <input
        id="cor"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark placeholder-text-muted-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
        placeholder="Ex: preto, azul, etc."
      />
    </div>
  );
}
