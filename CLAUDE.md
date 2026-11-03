# Pragmatis

Proyecto indexado en codebase-memory-mcp: `home-afelipecano-Escritorio-Archivos-imp-Proyectos-Pragmatis`.

## Ahorro de tokens
- Antes de leer archivos, consulta el grafo: `search_graph`, `get_code_snippet` (solo la función necesaria), `trace_path`, `get_architecture`. Para el mapa de módulos: `manage_adr(mode="get")`.
- Evita leer completos `src/components/Templates.tsx` (363 líneas), `src/admin/Templates.tsx` y `worker/templates.ts`; pide el snippet o usa `Read` con offset/limit.
- No leas `public/demo/**` (bundles compilados, excluidos del grafo con `.cbmignore`). Se regeneran con `npm run demos:sync`.
- Tras cambios grandes, reindexa con `index_repository`.

## Mapa de módulos
- Tipos: `src/lib/types.ts` (Module, TemplateModule). API: `worker/modules.ts`, `worker/templates.ts`; rutas en `worker/index.ts`.
- Admin: `src/admin/Modules.tsx`, `src/admin/Templates.tsx`. Web: `src/components/Templates.tsx`. Datos: `migrations/0003`, `0005`.
