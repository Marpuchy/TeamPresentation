# Pactum X Team

Presentacion web estilo seleccion de personajes para mostrar al equipo de desarrollo de Pactum X como un roster jugable. La interfaz esta pensada como una pantalla premium de seleccion, con atmosfera oscura, acentos magicos, paneles cinematograficos y transiciones suaves.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react

## Lo que incluye

- Hero inmersivo a pantalla completa
- Selector de 4 miembros con cambio de personaje animado
- Panel central con retrato conceptual, rol, clase y aporte distintivo
- Radar premium y barras animadas para estadisticas personalizadas
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
      background-effects.tsx
      portrait-placeholder.tsx
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
- estadisticas
- colores de acento
- placeholder de retrato

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. Importa el proyecto en Vercel.
3. Vercel detecta Next.js automaticamente.
4. Ejecuta `npm run build` como verificacion previa.
5. Si quieres un entorno consistente, usa Node.js 22 en Vercel.

No requiere configuracion extra para un despliegue estandar.
