import { supabase } from "./supabase";
import type { Categoria, Proyecto } from "./types";

export async function getCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("nombre", { ascending: true });

  if (error) {
    throw new Error(`No se pudieron cargar las categorías: ${error.message}`);
  }

  return data ?? [];
}

export async function getCategoriaPorSlug(
  slug: string
): Promise<Categoria | null> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo cargar la categoría: ${error.message}`);
  }

  return data;
}

export async function getProyectos(): Promise<Proyecto[]> {
  const { data, error } = await supabase
    .from("proyectos")
    .select("*")
    .order("creado_en", { ascending: false });

  if (error) {
    throw new Error(`No se pudieron cargar los proyectos: ${error.message}`);
  }

  return data ?? [];
}

export async function getProyectoPorSlug(
  slug: string
): Promise<Proyecto | null> {
  const { data, error } = await supabase
    .from("proyectos")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo cargar el proyecto: ${error.message}`);
  }

  return data;
}

export async function getProyectosPorCategoria(
  categoriaSlug: string
): Promise<Proyecto[]> {
  const { data, error } = await supabase
    .from("proyectos")
    .select("*")
    .eq("categoria_slug", categoriaSlug)
    .order("creado_en", { ascending: false });

  if (error) {
    throw new Error(
      `No se pudieron cargar los proyectos de esta categoría: ${error.message}`
    );
  }

  return data ?? [];
}
