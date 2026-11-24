# Library API Lab — Gestión Bibliotecaria Escolar (proyecto en evolución)

> **Estado real: laboratorio API v0.1.0 funcional; producto escolar y SaaS todavía NO implementados.**
> Proyecto independiente, desarrollado incrementalmente con asistencia automatizada de IA. No está desplegado ni listo para manejar datos reales.

## Propósito

Evolucionar una API REST de catálogo ficticio hacia un **software web sencillo para bibliotecas de colegios privados pequeños**: inventario de libros y ejemplares, lectores, préstamos, devoluciones e historial. El objetivo es resolver operaciones concretas con baja complejidad de uso y mantenimiento, no reproducir todas las funciones de sistemas bibliotecarios especializados.

**Usuarios previstos:** bibliotecario/encargado y administrador del colegio. **Cliente hipotético:** colegio privado pequeño de Colombia. El interés comercial y la disposición a pagar siguen **sin validar**; no se presume demanda ni rentabilidad.

- [Visión de producto, alcance, reglas y validación comercial](docs/product/PRODUCT-VISION.md)
- [Roadmap por fases y puertas de calidad](docs/ROADMAP.md)
- [Decisión arquitectónica y estrategia de migración](docs/adr/0001-product-evolution.md)
- [Arquitectura de la versión actual](docs/ARCHITECTURE.md) · [Contrato HTTP actual](docs/API.md)
- [Reglas de automatización y revisión](AGENTS.md) · [Bitácora](docs/DEVELOPMENT-JOURNAL.md) · [Cambios](CHANGELOG.md)

## Estado: implementado frente a planificado

| Capacidad | Estado |
| --- | --- |
| Node.js ESM, HTTP nativo, catálogo ficticio inmutable | **Implementado** |
| GET `/health`, GET `/api/v1/books`, GET `/api/v1/books/:id` | **Implementado** |
| Búsqueda por título/autor, género, ordenación, paginación, ETag | **Implementado** |
| Validación HTTP, logs estructurados, pruebas e integración continua | **Implementado** |
| CRUD de libros y ejemplares, persistencia PostgreSQL | **Planificado** |
| Lectores, préstamos, devoluciones, historial | **Planificado** |
| Identidad, roles y aislamiento entre colegios | **Planificado; obligatorio antes de datos reales** |
| Interfaz web y piloto con instituciones | **Planificado; sujeto a validación** |
| Suscripciones, cobros y despliegue SaaS | **Fuera del MVP inicial** |

## Ejecutar el laboratorio actual

**Requisito:** Node.js 22 o superior. No necesita Docker, PostgreSQL, servicios pagos ni credenciales.

```bash
npm ci
npm run check
npm test
npm start
```

En otra terminal: `curl http://127.0.0.1:3000/health` y `curl "http://127.0.0.1:3000/api/v1/books?page=1&limit=5"`.
Por defecto escucha en `127.0.0.1:3000`; se pueden configurar `PORT` y `HOST`. No exponer a internet sin controles adicionales.

## Arquitectura actual y objetivo

**Hoy:** `cliente HTTP → src/app.js (rutas, validación, serialización) → src/catalog.js (consultas puras sobre datos ficticios) → JSON`. `src/server.js` inicia el servidor; `test/api.test.js` verifica endpoints. `.github/workflows/ci.yml` ejecuta `npm ci`, `npm run check` y `npm test`.

**Objetivo, todavía no implementado:** `Web → API → casos de uso → dominio → repositorios → PostgreSQL`, en **monolito modular**. Módulos previstos: instituciones/identidad, catálogo/ejemplares, lectores, circulación. Dominio independiente de HTTP y persistencia; autorización por institución, transacciones y restricciones de BD para evitar préstamos duplicados. TypeScript, framework HTTP y frontend requieren ADR y migración incremental, no reescritura ciega.

## Reglas de negocio objetivo

- Diferenciar **título bibliográfico** de **ejemplar físico** (un título puede tener varias copias).
- Un ejemplar solo puede tener un préstamo activo; devolución idempotente y con historial.
- Ejemplar, lector y préstamo deben pertenecer a la misma institución.
- Desactivar un registro no borra el historial.
- Ningún usuario accede a datos de otra institución; seguridad y pruebas de aislamiento bloquean el piloto si fallan.
- Usar datos sintéticos hasta contar con controles de privacidad y tratamiento de datos de menores.

## Calidad y desarrollo automatizado

Una mejora principal por ejecución, aproximadamente **día por medio**. Rama aislada → prueba y documentación proporcional → PR → GitHub Actions → merge **solo con CI verde**. Si hay bloqueo o ninguna mejora segura, no se fuerza commit. La IA puede asumir roles de arquitectura, implementación, seguridad y QA **bajo demanda**; no se ejecutan decenas de agentes en paralelo ni se consumen servicios pagos sin necesidad. La documentación se mantiene proporcionalmente en cada cambio y se consolida en hitos significativos, sin esperar para documentar decisiones críticas.

**Limitaciones actuales:** no hay base de datos, autenticación, UI, aislamiento multiinstitución ni despliegue. El laboratorio actual no debe usarse para gestionar estudiantes reales.

## Transparencia y aislamiento

Contribuciones asistidas por IA se identifican en PR, bitácora e historial; no se atribuye autoría humana ficticia. **Único repositorio autorizado:** `omar-fonseca/library-api-lab`. Sin lectura ni cambios en otros proyectos. Licencia MIT (ver `package.json`).
