import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProyectoPorSlug, getProyectos } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = await getProyectoPorSlug(slug);

  if (!proyecto) {
    return { title: "Proyecto no encontrado — Bitácora" };
  }

  return {
    title: `${proyecto.titulo} — Bitácora`,
    description: proyecto.resumen,
  };
}

export default async function ProyectoDetallePage({ params }: Props) {
  const { slug } = await params;
  const proyecto = await getProyectoPorSlug(slug);

  if (!proyecto) {
    notFound();
  }

  return (
    <article className="entry">
      <Link href="/proyectos" className="entry__back">
        ← Volver al catálogo
      </Link>

      <div className="entry__tab">
        <Link
          href={`/categorias/${proyecto.categoria_slug}`}
          className="entry__category"
        >
          {proyecto.categoria_slug.replace("-", " ")}
        </Link>
        <span>
          {new Date(proyecto.creado_en).toLocaleDateString("es-SV", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <h1 className="entry__title">{proyecto.titulo}</h1>
      <p className="entry__summary">{proyecto.resumen}</p>

      {proyecto.imagen_url && (
        <div className="entry__media">
          <Image
            src={proyecto.imagen_url}
            alt={proyecto.titulo}
            width={1200}
            height={700}
            className="entry__image"
            priority
          />
        </div>
      )}

      <div className="entry__body">
        <p>{proyecto.contenido}</p>
      </div>

      <ul className="entry__tech">
        {proyecto.tecnologias.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="entry__links">
        {proyecto.repo_url && (
          <a
            href={proyecto.repo_url}
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            Ver repositorio
          </a>
        )}
        {proyecto.demo_url && (
          <a
            href={proyecto.demo_url}
            target="_blank"
            rel="noreferrer"
            className="button button--ghost"
          >
            Ver demo
          </a>
        )}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const proyectos = await getProyectos();
  return proyectos.map((proyecto) => ({ slug: proyecto.slug }));
}
