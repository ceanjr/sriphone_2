/**
 * Barra de Busca
 * Input de busca com debounce de 300ms
 * Busca por modelo, cor ou código
 */

"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar por modelo, cor ou código...",
  debounceMs = 300,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  // Debounce: atualiza o valor pai apenas após o usuário parar de digitar
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onChange]);

  // Sincronizar com valor externo quando mudar
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted-dark" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border-subtle-dark bg-brand-gray-dark py-3 pl-10 pr-4 text-sm text-text-primary-dark placeholder-text-muted-dark transition-colors focus:border-brand-light focus:outline-none focus:ring-2 focus:ring-brand-light/20"
      />
    </div>
  );
}
