# Roadmap — Library API Lab → Gestión Bibliotecaria Escolar

**Estado:** dirección de producto aprobada; implementación de la evolución pendiente. No confundir fases planeadas con funcionalidades entregadas. Priorizar calidad sobre volumen de commits.

## Fase 0 — Gobierno y documentación (en curso)
- [x] API v0.1.0, pruebas y CI existentes preservados.
- [x] PR #14 de filtros combinados integrado con CI satisfactorio.
- [ ] Publicar y verificar README, visión, ADR y reglas de agentes actualizadas.
- [x] Definir requisitos verificables de inventario y circulación ([criterios](requirements/REQUIREMENTS.md)).
- [ ] Definir mapa de amenazas inicial y requisitos de identidad.

## Fase 1 — Arquitectura y contratos
- [ ] ADR para TypeScript/framework HTTP (mantener Node nativo si el beneficio no compensa).
- [ ] Diseñar módulos y contratos, sin mover todo el código en un único PR.
- [ ] CI para tipado/lint solo cuando se adopten las herramientas.

## Fase 2 — Persistencia e inventario
- [ ] ADR y migraciones PostgreSQL; configuración reproducible.
- [ ] Instituciones, títulos y ejemplares con restricciones e índices.
- [ ] CRUD mínimo, validaciones y pruebas de persistencia.

## Fase 3 — Lectores y circulación
- [ ] Lectores con datos mínimos.
- [ ] Préstamos y devoluciones transaccionales, sin préstamos activos duplicados.
- [ ] Vencimientos e historial; pruebas de concurrencia e idempotencia.

## Fase 4 — Identidad, aislamiento y web
- [ ] Autenticación, roles y autorización por institución.
- [ ] Pruebas negativas de acceso cruzado y revisión de privacidad.
- [ ] UI accesible para catálogo, lectores, préstamo y devolución.

## Fase 5 — Piloto y operación
- [ ] Backups y restauración probados, auditoría mínima, procedimientos de despliegue.
- [ ] Pruebas end-to-end y validación con datos sintéticos.
- [ ] Investigar colegios reales y disposición de pago **antes** de comprometer gastos o usar datos personales.

## Primera secuencia de PRs
1. Cerrar PR previo si CI está verde.
2. Documentación de dirección y gobernanza (esta iteración).
3. Reglas de negocio y criterios de aceptación.
4. Modelo de datos y amenazas multiinstitución.
5. ADR de stack y primera migración pequeña.

## Definición de terminado por PR
Necesidad explícita; cambio acotado; pruebas relevantes; `npm run check` y `npm test` o pipeline equivalente satisfactorios; bitácora/contratos actualizados proporcionalmente; CI del commit en verde; sin cambios a otros repositorios ni servicios pagos. Un PR documental puede validarse con el pipeline existente, sin inventar pruebas funcionales.

## Documentación por hitos
Documentar contratos, decisiones y riesgos **en cada cambio**; consolidar README, diagramas y guía operativa en hitos importantes (~40% de alcance comprobado y antes del piloto), sin esperar al 40% para documentar seguridad o API.

## Backlog histórico
Ordenación, ETag, observabilidad, búsqueda Unicode, validación y pruebas de paginación ya forman parte de la API actual. Ver `CHANGELOG.md` y `docs/DEVELOPMENT-JOURNAL.md`.
