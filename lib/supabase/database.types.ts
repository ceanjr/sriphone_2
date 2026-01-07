/**
 * Database Types
 * Tipos TypeScript gerados do schema do Supabase
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categorias: {
        Row: {
          id: string;
          nome: string;
          slug: string;
          ordem: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          slug: string;
          ordem?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          slug?: string;
          ordem?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      produtos: {
        Row: {
          id: string;
          codigo: string;
          nome: string;
          descricao: string | null;
          preco: number;
          condicao: "novo" | "seminovo";
          cor: string;
          bateria: number | null;
          categoria_id: string | null;
          imagens: string[];
          imagem_principal: string | null;
          ativo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          codigo: string;
          nome: string;
          descricao?: string | null;
          preco: number;
          condicao: "novo" | "seminovo";
          cor: string;
          bateria?: number | null;
          categoria_id?: string | null;
          imagens?: string[];
          imagem_principal?: string | null;
          ativo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          codigo?: string;
          nome?: string;
          descricao?: string | null;
          preco?: number;
          condicao?: "novo" | "seminovo";
          cor?: string;
          bateria?: number | null;
          categoria_id?: string | null;
          imagens?: string[];
          imagem_principal?: string | null;
          ativo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
