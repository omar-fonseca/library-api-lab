# AGENTS.md — Gobierno de ingeniería automatizada

**ÚNICO repositorio autorizado:** `omar-fonseca/library-api-lab`. No consultar, leer, importar ni modificar otros proyectos. No ejecutar servicios externos pagos ni usar datos/credenciales reales.

## Propósito
Evolucionar la API ficticia existente hacia un software bibliotecario escolar pequeño, funcional y eventualmente SaaS. El README y `docs/product/PRODUCT-VISION.md` distinguen estado implementado de visión futura.

## Orquestación de bajo costo
Un orquestador elige **una mejora principal por ejecución** (aproximadamente día por medio), en función del roadmap y bloqueos. Roles lógicos **bajo demanda**, no seis procesos simultáneos:
- **Product analyst:** requisitos y criterios de aceptación.
- **Architect:** fronteras modulares, decisiones ADR, compatibilidad.
- **Backend engineer:** código y persistencia.
- **Security reviewer:** permisos, datos personales y aislamiento.
- **QA reviewer:** pruebas unitarias, HTTP, integración y regresiones.
- **DevOps reviewer:** CI/CD, migraciones, backups y recuperación.

Activar solo los roles pertinentes a la tarea; preferir GitHub Actions y herramientas ya existentes. No instalar frameworks de agentes, skills externos o servicios de pago sin necesidad documentada. Estos roles son instrucciones para la automatización, no un sistema multiagente ejecutándose permanentemente.

## Flujo obligatorio
1. Leer README, roadmap, este archivo y **solo** los archivos relevantes.
2. Si existe PR pendiente, verificar su CI y resolverlo antes de abrir otra mejora.
3. Definir necesidad, alcance y criterio de aceptación. Para reglas críticas, TDD selectivo.
4. Rama independiente, cambio mínimo, sin reescrituras masivas.
5. Cinco verificaciones: requisitos, lógica/casos límite, seguridad, pruebas, mantenibilidad.
6. Actualizar documentación afectada y bitácora brevemente; consolidar documentación amplia por hitos.
7. PR con origen IA declarado. Integrar solo con CI **del commit** verde, permisos y ausencia de bloqueos.
8. Reportar PR/commit, cambio, CI y siguiente paso. Si no hay mejora segura, **no forzar commit**.

## Gates
- **Seguridad:** prohibido exponer datos de estudiantes o habilitar multiinstitución sin autenticación, autorización y pruebas de aislamiento.
- **Persistencia:** cambios de esquema con migración, reversión o estrategia de recuperación y pruebas.
- **Arquitectura:** nuevas dependencias/stack requieren ADR y compatibilidad; evitar complejidad no justificada.
- **Operación:** despliegue real requiere backups, restauración, secretos y aprobación.
- **Transparencia:** nunca atribuir autoría humana ficticia ni inventar resultados de tests, mercado o avances.

No se mezclan repositorios. No se hacen commits vacíos/cosméticos. No se introduce un agente autónomo con permisos irrestrictos.
