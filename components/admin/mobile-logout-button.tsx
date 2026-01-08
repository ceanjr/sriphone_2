"use client";

/**
 * Mobile Logout Button
 * Client component for logout functionality on mobile dashboard
 */

import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export function MobileLogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20 md:hidden"
    >
      <LogOut className="h-5 w-5" />
      Sair da Conta
    </button>
  );
}
