/**
 * Supabase Client Configuration
 * Cliente para uso no lado do cliente (Client Components)
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

/**
 * Cliente Supabase para uso em Client Components
 * Usa @supabase/ssr para compatibilidade com middleware
 */
export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);
