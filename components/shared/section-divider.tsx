import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "light" | "dark";
  className?: string;
}

export function SectionDivider({
  variant = "dark",
  className,
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        "h-px w-full",
        variant === "dark"
          ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
          : "bg-gradient-to-r from-transparent via-black/8 to-transparent",
        className
      )}
      aria-hidden="true"
    />
  );
}
