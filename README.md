# Bitácora de Proyectos

Landing page construida con **Next.js 16 (App Router)** y **Supabase**, que funciona como un catálogo de proyectos de desarrollo: cada proyecto pertenece a una categoría, y ambos se consultan como datos reales desde una base de datos serverless.

Proyecto realizado para la actividad evaluada *"Dominio del App Router y Gestión de Datos"* — Bootcamp Full Stack Junior, Módulo 4 (Kodigo).

## Descripción del proyecto

El sitio muestra un listado de proyectos (con búsqueda y filtro por categoría) y dos tipos de rutas dinámicas:

* `/proyectos/\[slug]` — página de detalle de un proyecto individual.
* `/categorias/\[slug]` — listado de proyectos filtrados por categoría.

Toda la información (proyectos y categorías) vive en Supabase y se consulta desde **Server Components**, sin exponer lógica de base de datos al cliente. La única parte que corre en el navegador es el buscador/filtro de la página `/proyectos` (`ProyectosExplorer`, marcado con `"use client"`), que filtra sobre los datos ya cargados por el servidor.

### Funcionalidades

* Página de inicio con estadísticas, categorías y proyectos destacados.
* Catálogo completo en `/proyectos` con búsqueda por texto/tecnología y filtro por categoría (interactividad en cliente).
* Rutas dinámicas `/proyectos/\[slug]` y `/categorias/\[slug]`, con `generateMetadata` y `generateStaticParams`.
* Lectura de datos desde Supabase en componentes de servidor (`lib/data.ts`).
* Estados de carga (`loading.tsx`) en cada segmento de ruta.
* Manejo de errores (`error.tsx`) y página 404 personalizada (`not-found.tsx`).
* Diseño responsive (mobile, tablet, desktop) sin librerías de UI externas.

### Tecnologías

* [Next.js 16](https://nextjs.org) (App Router, Server Components)
* [TypeScript](https://www.typescriptlang.org)
* [Supabase](https://supabase.com) (Postgres + RLS como backend serverless)
* CSS plano con variables de diseño (sin frameworks de UI)

## Estructura del proyecto

```
app/
  layout.tsx                 Layout raíz (fuentes, Navbar, Footer)
  page.tsx                   Home
  loading.tsx / error.tsx / not-found.tsx
  proyectos/
    page.tsx                 Catálogo completo (con buscador)
    loading.tsx
    \[slug]/
      page.tsx                Detalle de un proyecto (ruta dinámica)
      loading.tsx
  categorias/
    \[slug]/
      page.tsx                Proyectos por categoría (ruta dinámica)
      loading.tsx
components/
  Navbar.tsx, Footer.tsx
  ProjectCard.tsx             Tarjeta de proyecto (server-safe)
  ProyectosExplorer.tsx       Buscador/filtro ("use client")
lib/
  supabase.ts                 Cliente de Supabase
  data.ts                     Funciones de consulta (getProyectos, getProyectoPorSlug, etc.)
  types.ts                    Tipos de Proyecto y Categoria
supabase/
  schema.sql                  Tablas, políticas RLS y datos de ejemplo
```

## Instalación local

### 1\. Requisitos

* Node.js 20 o superior
* Una cuenta gratuita en [supabase.com](https://supabase.com)
* pnpm (recomendado) o npm

### 2\. Clonar e instalar dependencias

```bash
git clone https://github.com/FcoAlfaro3/catalogo-proyectos-kodigo.git

cd catalogo-proyectos-kodigo
pnpm install
# o: npm install
```

### 3\. Crear el proyecto en Supabase

1. Crea un proyecto nuevo en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor** → **New query**, pega el contenido de [`supabase/schema.sql`](./supabase/schema.sql) y ejecútalo. Esto crea las tablas `categorias` y `proyectos`, activa Row Level Security y agrega los datos de ejemplo.
3. Ve a **Project Settings → API** y copia:

   * `Project URL`
   * `anon public key`

### 4\. Configurar variables de entorno

Copia el archivo de ejemplo y complétalo con tus propios valores:

```bash
cp .env.local.example .env.local
```

|Variable|Descripción|
|-|-|
|`NEXT\_PUBLIC\_SUPABASE\_URL`|URL del proyecto de Supabase (Project Settings → API).|
|`NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY`|Clave pública (anon) del proyecto. Es segura de exponer en el cliente porque el acceso está limitado por las políticas RLS de solo lectura.|

> El archivo `.env.local` está en `.gitignore` y nunca debe subirse al repositorio.

### 5\. Ejecutar en desarrollo

```bash
pnpm dev
# o: npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En [vercel.com](https://vercel.com), importa el repositorio.
3. En **Environment Variables**, agrega `NEXT\_PUBLIC\_SUPABASE\_URL` y `NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY` con los mismos valores de tu `.env.local`.
4. Despliega. Vercel detecta automáticamente que es un proyecto Next.js.

## Seguridad de los datos

Las tablas `categorias` y `proyectos` tienen **Row Level Security** activado. La única política definida permite `SELECT` (lectura) al rol público `anon`; no existen políticas de `INSERT`, `UPDATE` ni `DELETE`, por lo que nadie puede modificar los datos desde el cliente aunque conozca la clave pública.

## Autor

Francisco Arturo Alfaro Fuentes — Bootcamp Full Stack Junior (Kodigo).

