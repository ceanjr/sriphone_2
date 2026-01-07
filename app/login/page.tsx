/**
 * Página de Login
 * Autenticação de administradores com Supabase Auth
 */

import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { FONT_CLASSES } from "@/lib/constants/colors";

export const metadata: Metadata = {
  title: "Login - Sr. IPHONE",
  description: "Acesso administrativo",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1
            className={`text-3xl font-bold text-text-primary-dark ${FONT_CLASSES.heading}`}
          >
            Sr. IPHONE
          </h1>
          <p className="mt-2 text-sm text-text-secondary-dark">
            Acesso Administrativo
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-8">
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-text-muted-dark">
          © {new Date().getFullYear()} Sr. IPHONE. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}
