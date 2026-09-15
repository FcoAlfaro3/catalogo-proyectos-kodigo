export interface Categoria {
  id: number;
  slug: string;
  nombre: string;
  descripcion: string;
}

export interface Proyecto {
  id: number;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria_slug: string;
  tecnologias: string[];
  imagen_url: string | null;
  repo_url: string | null;
  demo_url: string | null;
  destacado: boolean;
  creado_en: string;
}
