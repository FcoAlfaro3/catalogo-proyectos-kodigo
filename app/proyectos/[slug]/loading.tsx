export default function Loading() {
  return (
    <div className="skeleton-page">
      <div className="skeleton skeleton--title" aria-hidden="true" />
      <div className="skeleton skeleton--media" aria-hidden="true" />
      <div className="skeleton skeleton--text" aria-hidden="true" />
      <div className="skeleton skeleton--text" aria-hidden="true" />
      <p className="skeleton-page__label">Cargando proyecto…</p>
    </div>
  );
}
