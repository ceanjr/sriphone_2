import { SITE_INFO } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 text-center text-text-muted-dark text-sm bg-brand-dark border-t border-border-dark">
      <div className="container mx-auto px-4">
        <p>
          &copy; {currentYear} {SITE_INFO.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
