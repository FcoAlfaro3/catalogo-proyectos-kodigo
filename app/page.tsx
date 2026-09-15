import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getCategorias, getProyectos } from "@/lib/data";

export default async function HomePage() {
  const [categorias, proyectos] = await Promise.all([
    getCategorias(),
    getProyectos(),
  ]);

  const destacados = proyectos.filter((proyecto) => proyecto.destacado);
  const paraMostrar = (destacados.length > 0 ? destacados : proyectos).slice(
    0,
    3
  );

  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <p className="hero__kicker">Bitácora de proyectos</p>
          <h1 className="hero__title">
            Un registro de lo que he construido como desarrollador Full
            Stack.
          </h1>
          <p className="hero__lede">
            Cada entrada es un proyecto real: el problema que resolvía, las
            herramientas que usé y lo que aprendí en el camino.
          </p>
          <Link href="/proyectos" className="button">
            Ver todos los proyectos
          </Link>
        </div>
        <dl className="hero__stats">
          <div>
            <dt>Proyectos registrados</dt>
            <dd>{proyectos.length}</dd>
          </div>
          <div>
            <dt>Categorías</dt>
            <dd>{categorias.length}</dd>
          </div>
        </dl>
      </section>

      <section className="section" id="categorias">
        <h2 className="section__title">Categorías</h2>
        <div className="chips">
          {categorias.map((categoria) => (
            <Link
              key={categoria.slug}
              href={`/categorias/${categoria.slug}`}
              className="chip-link"
            >
              {categoria.nombre}
              <span className="chip-link__count">
                {
                  proyectos.filter(
                    (proyecto) => proyecto.categoria_slug === categoria.slug
                  ).length
                }
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Entradas recientes</h2>
          <Link href="/proyectos">Ver catálogo completo</Link>
        </div>
        <div className="grid">
          {paraMostrar.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      </section>
    </>
  );
}
