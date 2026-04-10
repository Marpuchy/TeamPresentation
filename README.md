# Pactum X Team

Presentacion web estilo seleccion de personajes para mostrar al equipo de desarrollo de Pactum X como una alineacion jugable. La interfaz esta planteada como una pantalla premium de selector, con alineacion superior visible, retratos estilizados, paneles de detalle y estadisticas con lectura de videojuego.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react

## Lo que incluye

- Hero inmersivo a pantalla completa
- Selector horizontal de 4 miembros con estados hover y seleccion
- Panel principal con retrato oscuro estilizado, rol, clase y aporte distintivo
- Radar premium y barras animadas para estadisticas personalizadas
- Paneles inferiores con descripcion, contacto, focos de trabajo y herramientas
- Modelo de datos limpio y editable en `src/data/team.ts`
- Estructura preparada para despliegue directo en Vercel

## Requisitos

- Node.js 20.19+ recomendado, o Node.js 22+
- npm 10+

## Desarrollo local

```bash
npm install
npm run dev
```

La app quedara disponible en `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run check
```

## Estructura principal

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    pactum/
      character-portrait.tsx
      stats-radar.tsx
      team-showcase.tsx
  data/
    team.ts
  types/
    team.ts
```

## Personalizacion del contenido

Edita `src/data/team.ts` para cambiar:

- nombres
- roles
- clases
- descripciones
- habilidad distintiva
- enlaces de contacto
- estadisticas
- colores de acento
- variante del retrato

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. Importa el proyecto en Vercel.
3. Vercel detecta Next.js automaticamente.
4. Ejecuta `npm run build` como verificacion previa.
5. Si quieres un entorno consistente, usa Node.js 22 en Vercel.

No requiere configuracion extra para un despliegue estandar.
