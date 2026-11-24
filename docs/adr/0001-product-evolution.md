# ADR-0001 — Evolución incremental hacia producto escolar

**Fecha:** 2026-11-24 · **Estado:** Aceptada como dirección; detalles de implementación pendientes.

## Contexto
La API v0.1.0 es un laboratorio de solo lectura, con Node.js ESM sin dependencias, datos ficticios, pruebas HTTP y CI. El objetivo aprobado es aprender ingeniería de producto construyendo una herramienta útil para bibliotecas escolares pequeñas, con posible modelo SaaS.

## Decisión
1. **No reescribir desde cero.** Preservar contrato, pruebas e historial; migrar en cambios pequeños.
2. **Producto final = aplicación web + API**; una API sola no cubre el trabajo de un bibliotecario.
3. **Monolito modular** con presentación, aplicación/casos de uso, dominio y persistencia. Separación pragmática, no arquitectura ceremonial.
4. **Diseñar aislamiento multiinstitución desde el modelo de datos**, empezar validando con una institución piloto; no habilitar múltiples instituciones con datos reales antes de probar autorización y aislamiento.
5. **PostgreSQL candidato** por transacciones, restricciones e integridad. TypeScript, Express, React y herramientas adicionales son candidatos sujetos a ADR por costo/beneficio y compatibilidad.
6. Seguridad, privacidad, backups y restauración son criterios de salida del piloto, no mejoras opcionales posteriores.
7. Una mejora pequeña por ejecución, PR y CI verde antes de integrar. Agentes como roles de revisión bajo demanda; minimizar tokens y dependencias.

## Alternativas descartadas por ahora
- API sin interfaz como producto final: insuficiente para el usuario operativo.
- Microservicios/Kubernetes: complejidad y costo injustificados.
- SaaS completo con facturación desde el primer sprint: riesgo comercial y de seguridad.
- Reescritura masiva: aumenta regresiones y dificulta revisión.

## Consecuencias y riesgos
Mayor exigencia de seguridad por datos de estudiantes y aislamiento institucional. La validación comercial es pendiente: el plan no garantiza clientes ni rentabilidad. Documentar decisiones y evidencia antes de cambios irreversibles.
