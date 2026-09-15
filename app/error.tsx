"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="state-page">
      <p className="state-page__kicker">Error</p>
      <h1>No se pudo cargar esta página.</h1>
      <p>
        {error.message ||
          "Ocurrió un problema al conectar con la base de datos."}
      </p>
      <button type="button" onClick={() => reset()} className="button">
        Intentar de nuevo
      </button>
    </div>
  );
}
