# Hoja de ruta ligera

No existe obligación de publicar cambios en cada ejecución: priorizar calidad y valor comprobable.

## Backlog

1. **Cobertura adicional de validación**: probar entradas vacías, búsquedas Unicode y límites de paginación. Criterio: pruebas reproducibles.
2. **Ordenación configurable**: `sort=title|year`, `order=asc|desc`; documentación y pruebas de orden estable.
3. **ETag o cache condicional**: investigar si aporta valor a una API de solo lectura antes de implementarlo.
4. **Observabilidad mínima**: registrar método, ruta y duración sin información sensible; pruebas de logs.
5. **Revisión TypeScript**: contrastar costo/beneficio de migración y asegurar tipado si se aprueba.
6. **División de módulos si crece**: refactorizar solamente cuando la complejidad lo justifique.

## Definición de terminado

- Necesidad y alcance definidos.
- Cambios mínimos y prueba de regresión.
- `npm run check` y `npm test` satisfactorios, con evidencia.
- Documentación y bitácora actualizadas.
- PR revisable, sin efectos en otros repositorios.
