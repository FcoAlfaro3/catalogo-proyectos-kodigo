import Link from "next/link";
import Image from "next/image";
import type { Proyecto } from "@/lib/types";

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-SV", {
    year: "numeric",
    month: "short",
  });
}

export default function ProjectCard({ proyecto }: { proyecto: Proyecto }) {
  return (
    <article className="card">
      <div className="card__tab">
        <span className="card__category">
          {proyecto.categoria_slug.replace("-", " ")}
        </span>
        <span className="card__date">{formatFecha(proyecto.creado_en)}</span>
      </div>

      {proyecto.imagen_url && (
        <div className="card__media">
          <Image
            src={proyecto.imagen_url}
            alt={proyecto.titulo}
            width={800}
            height={500}
            className="card__image"
          />
        </div>
      )}

      <div className="card__body">
        <h3 className="card__title">
          <Link href={`/proyectos/${proyecto.slug}`}>{proyecto.titulo}</Link>
        </h3>
        <p className="card__summary">{proyecto.resumen}</p>
        <ul className="card__tech">
          {proyecto.tecnologias.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
