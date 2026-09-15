import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import {
  getCategoriaPorSlug,
  getCategorias,
  getProyectosPorCategoria,
} from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoria = await getCategoriaPorSlug(slug);

  if (!categoria) {
    return { title: "Categoría no encontrada — Bitácora" };
  }

  return {
    title: `${categoria.nombre} — Bitácora`,
    description: categoria.descripcion,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const categoria = await getCategoriaPorSlug(slug);

  if (!categoria) {
    notFound();
  }

  const proyectos = await getProyectosPorCategoria(slug);

  return (
    <section className="section">
      <p className="section__kicker">Categoría</p>
      <h1 className="section__title">{categoria.nombre}</h1>
      <p className="section__lede">{categoria.descripcion}</p>

      {proyectos.length === 0 ? (
        <p className="explorer__empty">
          Todavía no hay proyectos registrados en esta categoría.
        </p>
      ) : (
        <div className="grid">
          {proyectos.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      )}
    </section>
  );
}

export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map((categoria) => ({ slug: categoria.slug }));
}
