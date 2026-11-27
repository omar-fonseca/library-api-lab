# Requisitos verificables: inventario y circulación

**Estado: diseño; NO implementado.** El catálogo actual sigue siendo ficticio y de solo lectura. Solo usar datos sintéticos hasta cumplir controles de privacidad y seguridad.

## Glosario
- **Título:** obra bibliográfica, distinta de sus unidades físicas.
- **Ejemplar:** copia física única dentro de una institución, vinculada a un título.
- **Lector:** persona autorizada a recibir préstamos, no necesariamente cuenta de acceso.
- **Préstamo:** registro histórico de ejemplar, lector, institución, vencimiento y devolución.
- **Institución:** frontera de propiedad y autorización de todos los registros.

## Criterios de aceptación del MVP

| ID | Necesidad | Criterio verificable |
| --- | --- | --- |
| CAT-01 | Crear y consultar título | Persistir título válido; rechazar entrada inválida sin escritura |
| INV-01 | Registrar ejemplar | Identificador único por institución; múltiples ejemplares por título |
| INV-02 | Disponibilidad | Derivada de préstamo activo y estado del ejemplar, nunca de contador del cliente |
| REA-01 | Registrar lector | Solo usuario autorizado; datos personales mínimos |
| LOA-01 | Prestar | Lector y ejemplar activos de la misma institución; vencimiento válido; un préstamo activo |
| LOA-02 | Concurrencia | Dos solicitudes simultáneas por un ejemplar confirman como máximo un préstamo |
| LOA-03 | Devolver | Cierra préstamo, conserva historial y habilita nueva circulación |
| LOA-04 | Reintentar devolución | No duplica movimientos ni cambia historial; contrato HTTP por definir |
| LOA-05 | Vencidos | Solo préstamos activos con vencimiento anterior a la fecha consultada |
| SEC-01 | Aislamiento | Usuario del colegio A no consulta ni modifica registros del B, incluso alterando IDs |
| HIS-01 | Retiro/inactivación | Bloquea préstamos nuevos sin borrar registros históricos |

## Invariantes de dominio
1. Título, ejemplar, lector y préstamo pertenecen a la misma institución cuando están relacionados.
2. **Máximo un préstamo activo por ejemplar**, protegido en PostgreSQL mediante transacciones y restricción adecuada, además de reglas de aplicación.
3. Prestar y devolver son operaciones atómicas; ante fallo no persisten estados parciales.
4. Reintentos de devolución no crean eventos o movimientos duplicados.
5. La institución autorizada procede de identidad y pertenencia verificadas en servidor; nunca confiar en un `institution_id` del cliente.
6. Un lector inactivo o ejemplar retirado no admite nuevos préstamos; el historial permanece.

## Escenarios de prueba obligatorios

| Caso | Resultado esperado |
| --- | --- |
| Préstamo válido | Un préstamo persistente y ejemplar no disponible |
| Préstamo duplicado | Rechazo sin nuevo registro |
| Carrera de dos préstamos | A lo sumo uno confirmado, sin corrupción de BD |
| Devolución y reintento | Un cierre persistente, sin efectos duplicados |
| Consulta de vencidos | No incluir préstamos devueltos |
| IDs de otra institución | Denegación sin exposición de datos |
| Lector inactivo / ejemplar retirado | Rechazo conservando historial |
| Fallo en transacción | Rollback completo |
| Reinicio del servicio | Persistencia e invariantes intactos |

## Decisiones pendientes antes de implementar
Duración de préstamos, máximo por lector, renovaciones, estados de ejemplares, roles, minimización y retención de datos personales, contrato HTTP de errores/reintentos y ADR de stack. No inferir estas políticas.

## Gates de ingeniería
**Requisitos:** trazar casos de uso a IDs anteriores. **Lógica:** concurrencia y casos límite. **Seguridad:** autorización y pruebas negativas por institución. **Pruebas:** unitarias, integración con BD de prueba y CI. **Calidad:** dominio separado de HTTP y persistencia, sin dependencias injustificadas.

Este documento no implica disponibilidad comercial ni implementación de estas funciones.
