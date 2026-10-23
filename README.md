# Library API Lab

Laboratorio independiente de ingeniería backend: una API de catálogo para una biblioteca **ficticia**.

## Propósito

Practicar desarrollo incremental y documentado de APIs profesionales. Este repositorio está aislado de cualquier otro proyecto y no maneja datos reales ni clientes.

## Primera entrega

- Endpoints de salud y consulta de libros.
- Búsqueda, filtros y paginación con validación de parámetros.
- Respuestas JSON y errores HTTP consistentes.
- Pruebas automatizadas y CI en GitHub Actions.
- Bitácora, decisiones de arquitectura y contratos HTTP.

## Principios

1. Un cambio debe resolver una necesidad real y ser verificable; nunca commits vacíos.
2. No depender de otros repositorios, productos, cuentas externas ni infraestructura de pago.
3. Registrar qué cambió, por qué cambió y cómo se comprobó.
4. Trabajar sobre ramas para mejoras posteriores y revisar CI antes de integrar.
5. No atribuir artificialmente commits automatizados a personas.

## Tecnología

Node.js 22+, TypeScript y módulos nativos de Node. Sin servicios de pago ni bases de datos externas; el catálogo inicial vive en memoria.

## Primeros pasos

```bash
npm ci
npm run typecheck
npm test
npm run build
npm run dev
```

En otra terminal:

```bash
curl http://localhost:3000/health
curl "http://localhost:3000/api/v1/books?page=1&limit=5"
```

Consulta la documentación en `docs/` y las reglas de agentes en `AGENTS.md`. La primera versión debe validarse por CI; no asumir que una prueba pasó si no fue ejecutada.
