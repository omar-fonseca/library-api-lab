# Registro de decisiones

## ADR-001 — Laboratorio aislado
**Estado:** aceptada. Todos los datos son ficticios. Sin referencia a otros repositorios. No se piden permisos sobre proyectos ajenos.

## ADR-002 — Node.js sin dependencias de terceros
**Estado:** aceptada para v0.1.0. Permite realizar pruebas y CI de manera rápida y barata. Si el routing o la complejidad crece, considerar Express o Fastify mediante un ADR futuro.

## ADR-003 — Contrato HTTP explícito
**Estado:** aceptada. Los parámetros no válidos producen 400, recursos inexistentes 404 y métodos no disponibles 405. Los errores se devuelven en JSON.

## ADR-004 — Trabajo automatizado revisable
**Estado:** aceptada. Toda modificación debe tener valor real, pruebas y una bitácora. Automatizaciones que no puedan comprobar seguridad o corrección deben informar la limitación y no integrar.
