# Visión de producto — Library API Lab

**Estado:** hipótesis y diseño aprobados como dirección de trabajo el 2026-11-24; las capacidades futuras NO están implementadas.

## Problema y cliente
Colegios privados pequeños pueden administrar inventarios y préstamos con cuadernos o hojas de cálculo. **Hipótesis:** valorarán un sistema web más simple de operar que suites bibliotecarias avanzadas. **No verificado:** volumen de demanda, presupuesto, disposición a pagar, rentabilidad y ventajas competitivas. No confundir viabilidad técnica con validación comercial.

**Cliente comprador potencial:** dirección o administración del colegio. **Usuario principal:** bibliotecario/encargado. **Usuarios secundarios:** personal autorizado; los estudiantes no necesitan acceso en el MVP.

## Resultado del MVP
Un encargado autenticado puede: registrar título y ejemplares → registrar lector → prestar ejemplar disponible → devolverlo → consultar disponibilidad e historial. Persistencia y seguridad verificadas. Interfaz accesible desde navegador; sin app móvil nativa.

## Alcance
1. Catálogo: títulos, autores, categorías, ejemplares y disponibilidad.
2. Lectores: registros mínimos y estado activo/inactivo.
3. Circulación: préstamo, devolución, fecha de vencimiento e historial.
4. Administración: institución, usuarios, roles, indicadores básicos.
5. Operación: migraciones, backups/restauración, trazabilidad y CI.

**Fuera del MVP:** IA, multas monetarias, pagos, reservas complejas, integraciones académicas, catalogación bibliográfica avanzada, microservicios y Kubernetes.

## Reglas e invariantes iniciales
- Un ejemplar pertenece a un título y a una institución; un título puede tener N ejemplares.
- Máximo un préstamo activo por ejemplar, incluso con solicitudes concurrentes; usar transacción/restricción de BD.
- Lector, ejemplar y préstamo pertenecen a la misma institución.
- La devolución cambia estado una sola vez y conserva auditoría/historial.
- Desactivar no elimina registros históricos.
- Cada operación verifica autenticación, rol y pertenencia institucional; no confiar en `institution_id` enviado por el cliente.
- Datos personales mínimos, sintéticos durante desarrollo; revisar obligaciones de tratamiento de datos de menores antes de pilotos reales.

## Mercado y criterios de validación
Prioridad de investigación: 10–15 colegios privados pequeños en Colombia; identificar responsables, flujo actual, tamaño de catálogo, costos de operación, presupuesto y barreras de adopción. Buscar 1–3 pilotos con compromiso explícito antes de ampliar infraestructura comercial. Un precio de COP 69.000/mes es **solo una hipótesis**, no una tarifa validada. Comparar también contra implementación/soporte de software libre existente. Sin evidencia de compra, mantener alcance de laboratorio/piloto y no asumir ingresos.

## Indicadores de producto
Tiempo de registro y préstamo, errores de inventario, préstamos vencidos, capacitación requerida, uso semanal, incidencias, costo de soporte y disposición de pago. No inventar valores ni porcentajes de avance: reportar funcionalidades comprobadas por fase.

## Decisiones pendientes
Elegir stack tras ADR y pruebas de compatibilidad; definir políticas de retención y roles; validar primer piloto; definir despliegue, costos, soporte y condiciones comerciales. Ninguna de estas decisiones autoriza uso de datos reales automáticamente.
