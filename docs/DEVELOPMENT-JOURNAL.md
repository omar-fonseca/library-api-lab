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

## 2026-10-30 — Observabilidad HTTP mínima

**Necesidad:** disponer de trazas de funcionamiento sin exponer búsquedas, identificadores ni cabeceras en los registros.

**Cambio:** `createApp` registra al finalizar la respuesta un evento estructurado con método, plantilla de ruta, código HTTP y duración en milisegundos. El colector es inyectable para pruebas; se cubren respuestas 200, 304, 400, 404 y 405 y la ausencia de valores sensibles.

**Origen:** cambio implementado con asistencia automatizada de IA. **Validación:** GitHub Actions del PR; no se afirma éxito antes de la ejecución.

## 2026-11-01 — Búsqueda tolerante a tildes

**Necesidad:** permitir que una consulta sin teclado de acentos encuentre títulos como «Diseño de servicios».

**Cambio:** se normalizan únicamente las cadenas de búsqueda (Unicode NFD y eliminación de marcas diacríticas), conservando intactos los datos del catálogo. Prueba HTTP con `diseno`, `DISEÑO` y la variante Unicode descompuesta.

**Origen:** implementación automatizada asistida por IA. **Validación:** GitHub Actions del PR; integración condicionada al CI verde.

## 2026-11-03 — Validación de controles en búsqueda

**Necesidad:** evitar aceptar secuencias de control codificadas (NUL, saltos de línea y DEL) en el parámetro de búsqueda sin restringir Unicode legítimo.

**Cambio:** `q` devuelve `400 INVALID_QUERY` ante U+0000–U+001F o U+007F; prueba HTTP de regresión y contrato actualizado.

**Origen:** implementación automatizada asistida por IA. **Validación:** condicionada al CI del PR.

## 2026-11-05 — Regresión de caché entre páginas

**Necesidad:** impedir que un cliente reciba 304 con un validador correspondiente a otra página del catálogo.

**Cambio:** prueba HTTP de ETag entre páginas diferentes, revalidación correcta, validador obsoleto y comodín `*`. Sin cambios de contrato ni dependencias.

**Origen:** prueba añadida mediante automatización asistida por IA. **Validación:** CI del PR antes de integrar.

## 2026-11-07 — Aislamiento de fallos de observabilidad

**Necesidad:** asegurar que una excepción del colector de logs no interrumpa respuestas ni solicitudes posteriores.

**Cambio:** prueba de integración con colector inyectado que lanza excepciones; verifica respuestas HTTP 200, 304 y nueva solicitud saludable, sin modificar la implementación ni añadir dependencias.

**Origen:** prueba desarrollada con asistencia automatizada de IA. **Validación:** condicionada al CI del PR.

## 2026-11-09 — Validación uniforme de parámetros

**Necesidad:** impedir que `genre`, `sort` u `order` acepten saltos de línea/tabulaciones codificados por efecto de `trim()`, mientras `q` ya los rechazaba.

**Cambio:** validación temprana de controles para todos los parámetros admitidos; prueba HTTP de cinco entradas malformadas y un caso válido con espacios. No se añaden dependencias.

**Origen:** implementación asistida por IA. **Validación:** integración condicionada al CI del PR.
