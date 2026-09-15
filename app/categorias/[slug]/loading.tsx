export default function Loading() {
  return (
    <div className="skeleton-page">
      <div className="skeleton skeleton--title" aria-hidden="true" />
      <div className="grid">
        <div className="skeleton skeleton--card" aria-hidden="true" />
        <div className="skeleton skeleton--card" aria-hidden="true" />
      </div>
      <p className="skeleton-page__label">Cargando categoría…</p>
    </div>
  );
}
