-- ============================================================
-- Bitácora de Proyectos — esquema de Supabase
-- Ejecutar en: Dashboard de Supabase -> SQL Editor -> New query
-- ============================================================

-- Tabla de categorías
create table if not exists categorias (
  id bigint generated always as identity primary key,
  slug text unique not null,
  nombre text not null,
  descripcion text not null
);

-- Tabla de proyectos
create table if not exists proyectos (
  id bigint generated always as identity primary key,
  slug text unique not null,
  titulo text not null,
  resumen text not null,
  contenido text not null,
  categoria_slug text not null references categorias(slug),
  tecnologias text[] not null default '{}',
  imagen_url text,
  repo_url text,
  demo_url text,
  destacado boolean not null default false,
  creado_en timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Row Level Security (RLS)
-- El catálogo es de solo lectura para cualquier visitante (rol "anon").
-- No se define ninguna política de insert/update/delete, por lo que
-- esas operaciones quedan bloqueadas para el público.
-- ------------------------------------------------------------

alter table categorias enable row level security;
alter table proyectos enable row level security;

create policy "Lectura publica de categorias"
  on categorias
  for select
  to anon
  using (true);

create policy "Lectura publica de proyectos"
  on proyectos
  for select
  to anon
  using (true);

-- ------------------------------------------------------------
-- Datos de ejemplo (seed)
-- ------------------------------------------------------------

insert into categorias (slug, nombre, descripcion) values
  ('backend', 'Backend', 'APIs, servicios y lógica de servidor.'),
  ('frontend', 'Frontend', 'Interfaces, UI y experiencia de usuario.'),
  ('full-stack', 'Full Stack', 'Proyectos de extremo a extremo.'),
  ('gestion', 'Gestión de equipos', 'Liderazgo, procesos y mejora continua.')
on conflict (slug) do nothing;

insert into proyectos
  (slug, titulo, resumen, contenido, categoria_slug, tecnologias, imagen_url, repo_url, demo_url, destacado)
values
  (
    'api-ecommerce-segura',
    'API de E-commerce Segura con Swagger',
    'API RESTful de e-commerce con autenticación, pagos con Stripe y documentación completa.',
    'Diseño y desarrollo de una API RESTful de e-commerce con Laravel 12 y PHP 8.2, cubriendo usuarios, productos, órdenes, ítems de orden y pagos. Incluye autenticación por tokens, Form Requests para validación, manejo de errores JSON consistente, pasarela de pago con Stripe (stripe/stripe-php) y documentación interactiva con Swagger/OpenAPI vía darkaonline/l5-swagger. El proyecto incluye migraciones y seeders para poblar la base de datos MySQL con datos de ejemplo.',
    'backend',
    array['Laravel 12', 'PHP 8.2', 'MySQL', 'Stripe', 'Swagger/OpenAPI'],
    'https://picsum.photos/seed/api-ecommerce/800/500',
    'https://github.com/tu-usuario/ecommerce-api-laravel',
    null,
    true
  ),
  (
    'catalogo-proyectos-next',
    'Catálogo de Proyectos con Next.js y Supabase',
    'Landing page con App Router, rutas dinámicas y datos servidos desde Supabase.',
    'Este mismo sitio: una landing construida con Next.js 16 y App Router que consume datos desde Supabase mediante Server Components. Implementa rutas dinámicas para proyectos y categorías, estados de carga, manejo de errores y una búsqueda del lado del cliente sobre el listado de proyectos.',
    'full-stack',
    array['Next.js 16', 'TypeScript', 'Supabase', 'React Server Components'],
    'https://picsum.photos/seed/catalogo-next/800/500',
    'https://github.com/tu-usuario/bitacora-proyectos',
    null,
    true
  ),
  (
    'dashboard-metricas-equipo',
    'Dashboard de Métricas de Equipo',
    'Panel para visualizar indicadores operativos de un equipo de atención al cliente.',
    'Interfaz para supervisar indicadores de un equipo de soporte: volumen de casos, tiempos de respuesta y calidad de servicio. Pensado como ejercicio de maquetación de datos y componentes reutilizables en React.',
    'frontend',
    array['React', 'TypeScript', 'Chart.js'],
    'https://picsum.photos/seed/dashboard-metricas/800/500',
    'https://github.com/tu-usuario/dashboard-metricas',
    null,
    false
  ),
  (
    'sistema-tickets-soporte',
    'Sistema de Tickets de Soporte',
    'Gestión de incidencias con roles, estados y flujo de aprobación.',
    'Aplicación para registrar, asignar y dar seguimiento a incidencias reportadas por un equipo de soporte, con roles diferenciados y un flujo de estados (abierto, en progreso, resuelto).',
    'full-stack',
    array['Node.js', 'Express', 'PostgreSQL', 'React'],
    'https://picsum.photos/seed/tickets-soporte/800/500',
    'https://github.com/tu-usuario/sistema-tickets',
    null,
    false
  ),
  (
    'propuesta-liderazgo-situacional',
    'Propuesta de Liderazgo Situacional',
    'Intervención gerencial para fortalecer el desarrollo de líderes en un equipo operativo.',
    'Propuesta de intervención gerencial aplicando el modelo de Liderazgo Situacional de Hersey y Blanchard, enfocada en la falta de desarrollo de líderes dentro de un equipo de trabajo. Incluye fundamentos teóricos, diagnóstico del caso y conclusiones estratégicas.',
    'gestion',
    array['Liderazgo situacional', 'Gestión del cambio', 'Inteligencia emocional'],
    'https://picsum.photos/seed/liderazgo/800/500',
    null,
    null,
    false
  ),
  (
    'landing-portafolio-personal',
    'Landing de Portafolio Personal',
    'Página de presentación profesional con secciones de experiencia y proyectos.',
    'Sitio de una sola página para presentar experiencia profesional, habilidades técnicas y proyectos destacados, con diseño responsive y optimizado para SEO.',
    'frontend',
    array['Next.js', 'CSS'],
    'https://picsum.photos/seed/portafolio-personal/800/500',
    'https://github.com/tu-usuario/portafolio-personal',
    null,
    false
  )
on conflict (slug) do nothing;
