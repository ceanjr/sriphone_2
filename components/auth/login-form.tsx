"use client";

/**
 * Formulário de Login
 * Autenticação com email e senha via Supabase Auth
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { LogIn, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError("Email ou senha incorretos. Tente novamente.");
        setLoading(false);
        return;
      }

      if (data.user) {
        // Redirect to admin dashboard with full page reload
        window.location.href = "/admin";
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente mais tarde.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-text-primary-dark"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 text-text-primary-dark placeholder-text-muted-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
          placeholder="seu@email.com"
          autoComplete="email"
        />
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-text-primary-dark"
        >
          Senha
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-border-subtle-dark bg-brand-dark px-4 py-2 pr-10 text-text-primary-dark placeholder-text-muted-dark focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-dark hover:text-text-secondary-dark"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-light px-4 py-2 font-semibold text-text-primary-light transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <span>Entrando...</span>
        ) : (
          <>
            <LogIn className="h-5 w-5" />
            <span>Entrar</span>
          </>
        )}
      </button>
    </form>
  );
}
