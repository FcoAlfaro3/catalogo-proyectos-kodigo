import Link from "next/link";

export default function NotFound() {
  return (
    <div className="state-page">
      <p className="state-page__kicker">404</p>
      <h1>Esta entrada no existe en la bitácora.</h1>
      <p>
        Puede que el proyecto o la categoría que buscas haya cambiado de
        nombre.
      </p>
      <Link href="/" className="button">
        Volver al inicio
      </Link>
    </div>
  );
}
