import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_ANON_KEY. Revisa tu archivo .env.local."
  );
}

// Cliente único de Supabase. Se usa la clave anónima porque los datos
// del catálogo son de lectura pública (ver políticas RLS en supabase/schema.sql).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
