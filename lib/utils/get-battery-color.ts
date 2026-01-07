/**
 * Retorna a cor da badge de bateria baseado na porcentagem
 * Verde: >= 80%
 * Amarelo: < 80%
 * @param bateria - Porcentagem da bateria (0-100)
 * @returns Cor em hexadecimal
 */
export function getBatteryColor(bateria: number | null): string {
  if (bateria === null) return "#22C55E"; // Verde (padrão para novos)

  if (bateria >= 80) {
    return "#22C55E"; // Verde (Tailwind green-500)
  } else {
    return "#EAB308"; // Amarelo (Tailwind yellow-500)
  }
}

/**
 * Retorna a classe Tailwind CSS para a cor da bateria
 * @param bateria - Porcentagem da bateria (0-100)
 * @returns Classe Tailwind para texto
 */
export function getBatteryColorClass(bateria: number | null): string {
  if (bateria === null) return "text-green-500";

  if (bateria >= 80) {
    return "text-green-500";
  } else {
    return "text-yellow-500";
  }
}

/**
 * Retorna a classe Tailwind CSS para background da bateria
 * @param bateria - Porcentagem da bateria (0-100)
 * @returns Classe Tailwind para background
 */
export function getBatteryBgClass(bateria: number | null): string {
  if (bateria === null) return "bg-green-500/20";

  if (bateria >= 80) {
    return "bg-green-500/20";
  } else {
    return "bg-yellow-500/20";
  }
}
