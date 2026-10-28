# Bitácora del laboratorio

Esta bitácora explica los cambios en lenguaje humano para facilitar el estudio posterior.

## 2026-10-23 — Inicio del repositorio

**Necesidad:** crear un espacio independiente de prácticas backend sin depender de un computador encendido ni interferir con productos existentes.

**Cambio:** se prepara una API REST de catálogo ficticio con endpoints de salud, listado, detalle, búsqueda, filtros, validación y paginación. Se incluyen pruebas de integración, CI y documentación.

**Diseño:** Node.js ESM sin dependencias externas. El catálogo es inmutable y está separado del transporte HTTP para poder evolucionarlo con seguridad.

**Validación:** la ejecución automática de GitHub Actions debe confirmar `npm ci`, `npm run check` y `npm test`. No se da por verificada ninguna prueba hasta que el CI reporte su resultado.

**Origen:** estructura inicial asistida por IA. El historial de GitHub se debe interpretar teniendo en cuenta esa asistencia.

**Siguiente evolución:** ver `docs/ROADMAP.md`. Cada mejora deberá tener explicación y prueba correspondiente.

## 2026-10-23 — Verificación automatizada del PR #1

**Evidencia:** [GitHub Actions, ejecución #1](https://github.com/omar-fonseca/library-api-lab/actions/runs/40011488110). Job `validate`: **success**. Pasos completados correctamente: `npm ci`, `npm run check` y `npm test` en Node.js 22.

**Alcance de la validación:** instalación reproducible, análisis sintáctico y pruebas HTTP automatizadas; no constituye una auditoría integral de seguridad ni una evaluación de producción.

## 2026-10-24 — Cobertura de límites de consulta

**Cambio:** se agregan pruebas para búsqueda con Unicode/espacios y para los límites máximos de `page` y `limit`. No cambia el contrato HTTP.

**Origen:** mejora acotada implementada con asistencia automatizada de IA. La integración queda condicionada al CI del PR.

## 2026-10-26 — Ordenación configurable

**Cambio:** el catálogo admite `sort=title|year` y `order=asc|desc`, aplicados antes de paginar y con desempate estable por identificador. Se agregan pruebas del contrato y de valores inválidos.

**Origen:** mejora acotada implementada con asistencia automatizada de IA. La integración queda condicionada al CI del PR.

## 2026-10-28 — Revalidación condicional con ETag

**Necesidad:** reducir transferencia repetida de respuestas idénticas en los endpoints de consulta, manteniendo el contrato de solo lectura.

**Cambio:** `ETag` fuerte (SHA-256 del JSON) y soporte de `If-None-Match` para listado y detalle. Las coincidencias devuelven `304` sin cuerpo; los errores y `/health` conservan `no-store`. Se añadió una prueba HTTP de regresión.

**Origen:** implementación asistida por IA. **Validación:** GitHub Actions del PR correspondiente; no se atribuyen resultados antes de su ejecución.
