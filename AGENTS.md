# Reglas para asistentes y automatizaciones

Este laboratorio funciona de manera completamente independiente. El ÚNICO repositorio autorizado es `omar-fonseca/library-api-lab`.

## Límites obligatorios

- No leer, consultar, importar ni modificar otros proyectos o repositorios.
- No usar secretos, cuentas externas, datos de clientes, despliegues pagos ni credenciales.
- Nunca inventar resultados de ejecución de pruebas.
- No generar commits vacíos o cosméticos para simular actividad.
- No atribuir la autoría humana de un cambio producido por IA; documentar su origen.
- Una mejora por iteración; preferir ramas y PR revisables.
- Si GitHub no permite escribir o CI falla, reportarlo y detener la integración.

## Flujo de desarrollo

1. Revisar `docs/ROADMAP.md`, `docs/DECISIONS.md`, el historial y las pruebas.
2. Seleccionar la mejora con criterios de aceptación claros.
3. Modificar únicamente los archivos necesarios; agregar pruebas.
4. Ejecutar `npm run check` y `npm test` cuando el entorno esté disponible.
5. Actualizar `docs/DEVELOPMENT-JOURNAL.md` y `CHANGELOG.md`.
6. Preparar commit descriptivo y PR; integrar solo con comprobaciones satisfactorias.
7. Si no existe trabajo seguro, no hacer un commit.

## Calidad

Módulos pequeños, errores HTTP estables, entradas validadas, pruebas deterministas y documentación en español comprensible.
