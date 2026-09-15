import Link from "next/link";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link href="/" className="nav__brand">
          <span className="nav__brand-mark">01</span>
          Bitácora
        </Link>
        <nav className="nav__links">
          <Link href="/">Inicio</Link>
          <Link href="/proyectos">Proyectos</Link>
          <a
            href="https://github.com/tu-usuario/bitacora-proyectos"
            target="_blank"
            rel="noreferrer"
          >
            Código fuente
          </a>
        </nav>
      </div>
    </header>
  );
}
