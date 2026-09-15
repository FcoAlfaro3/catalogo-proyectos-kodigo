import type { Metadata } from "next";
import ProyectosExplorer from "@/components/ProyectosExplorer";
import { getCategorias, getProyectos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Proyectos — Bitácora",
  description: "Catálogo completo de proyectos, filtrable por categoría y tecnología.",
};

export default async function ProyectosPage() {
  const [proyectos, categorias] = await Promise.all([
    getProyectos(),
    getCategorias(),
  ]);

  return (
    <section className="section">
      <p className="section__kicker">Catálogo</p>
      <h1 className="section__title">Todos los proyectos</h1>
      <p className="section__lede">
        {proyectos.length} proyectos registrados. Filtra por categoría o
        busca por tecnología.
      </p>
      <ProyectosExplorer proyectos={proyectos} categorias={categorias} />
    </section>
  );
}
