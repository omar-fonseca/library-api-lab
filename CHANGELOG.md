# Registro de cambios

Formato simplificado, cambios reales y verificables.

## [Unreleased]
### Documentación y planificación (2026-11-24)

- Dirección aprobada hacia gestión bibliotecaria escolar: README, visión de producto, ADR, roadmap y gobernanza de roles IA. **Solo documentación; las funcionalidades SaaS no están implementadas.** Trabajo asistido por IA.


### Corregido

- Validación uniforme: los parámetros de consulta rechazan caracteres de control codificados; prueba HTTP (asistencia automatizada de IA).

- Rechazo explícito de caracteres de control en búsquedas `q`, con prueba de regresión (implementación asistida por IA).

### Agregado

- Prueba HTTP de filtros combinados con ordenación y paginación (asistencia automatizada de IA).

- Prueba de regresión de última página parcial y coherencia de metadatos de paginación (asistencia automatizada de IA).

- Prueba de límites de longitud de búsqueda (vacío, 80 y 81 caracteres), con asistencia automatizada de IA.

- Prueba HTTP de regresión para evitar caché condicional en errores y `/health` (asistencia automatizada de IA).

- Prueba de resiliencia ante excepciones del colector de logs en respuestas 200/304 y solicitudes sucesivas (asistencia automatizada de IA).

- Prueba de regresión de ETag entre páginas y validadores condicionales, con asistencia automatizada de IA.

- Búsqueda por título y autor tolerante a tildes y variantes Unicode, con prueba de regresión (implementación asistida por IA).
- Registro HTTP estructurado de respuestas finalizadas, con rutas normalizadas y sin parámetros ni identificadores concretos; prueba de privacidad (implementación asistida por IA).
- Revalidación condicional con ETag en listado y detalle de libros; respuesta 304 sin cuerpo cuando no cambia la representación (implementación asistida por IA).

## [0.1.0] — 2026-10-23

### Agregado

- API HTTP con endpoint de estado y catálogo ficticio de solo lectura.
- Filtros, búsqueda, validación y paginación.
- Pruebas de integración.
- Workflow CI y documentación técnica en español.

**Origen del cambio:** implementación inicial asistida por IA.
