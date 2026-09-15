"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Categoria, Proyecto } from "@/lib/types";

export default function ProyectosExplorer({
  proyectos,
  categorias,
}: {
  proyectos: Proyecto[];
  categorias: Categoria[];
}) {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);

  const proyectosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return proyectos.filter((proyecto) => {
      const coincideCategoria =
        !categoriaActiva || proyecto.categoria_slug === categoriaActiva;

      if (!coincideCategoria) return false;
      if (!termino) return true;

      const texto = `${proyecto.titulo} ${proyecto.resumen} ${proyecto.tecnologias.join(
        " "
      )}`.toLowerCase();

      return texto.includes(termino);
    });
  }, [proyectos, busqueda, categoriaActiva]);

  return (
    <div>
      <div className="explorer__controls">
        <input
          type="search"
          placeholder="Buscar por nombre o tecnología…"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          className="explorer__search"
          aria-label="Buscar proyectos"
        />
        <div className="explorer__filters">
          <button
            type="button"
            className={categoriaActiva === null ? "chip chip--active" : "chip"}
            onClick={() => setCategoriaActiva(null)}
          >
            Todas
          </button>
          {categorias.map((categoria) => (
            <button
              type="button"
              key={categoria.slug}
              className={
                categoriaActiva === categoria.slug ? "chip chip--active" : "chip"
              }
              onClick={() => setCategoriaActiva(categoria.slug)}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>
      </div>

      {proyectosFiltrados.length === 0 ? (
        <p className="explorer__empty">
          No hay proyectos que coincidan con esa búsqueda. Prueba con otro
          término o quita el filtro de categoría.
        </p>
      ) : (
        <div className="grid">
          {proyectosFiltrados.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      )}
    </div>
  );
}
