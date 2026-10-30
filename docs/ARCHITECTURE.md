# Arquitectura v0.1.0

## Contexto

Laboratorio REST sencillo con información ficticia. No existe persistencia, multiusuario, autenticación ni conectividad con otros productos.

## Flujo de petición

`Cliente HTTP -> src/app.js (rutas y validación) -> src/catalog.js (consulta de datos inmutables) -> JSON`

- `src/server.js`: configuración de puerto y escucha local.
- `src/app.js`: router mínimo, validación de parámetros, errores, serialización y registro de respuestas finalizadas. `createApp({ logRequest })` permite inyectar un colector para pruebas.
- `src/catalog.js`: catálogo ficticio inmutable y consultas puras.
- `test/api.test.js`: pruebas black-box HTTP con puerto efímero, sin mocks externos.
- `.github/workflows/ci.yml`: comprobación sintáctica y pruebas en cada PR y push a main.

## Decisiones

- No hay framework HTTP ni dependencias npm: menos superficie de vulnerabilidad y mantenimiento para la versión inicial.
- Se usa JavaScript ESM. TypeScript se evaluará como mejora independiente documentada, no como cambio obligatorio de arranque.
- El servidor enlaza por defecto a `127.0.0.1` para evitar exposición accidental.
- Los datos no se modifican y la API solo acepta GET.
- Cada respuesta finalizada emite un evento JSON con `method`, `route` (plantilla, no URL), `status` y `durationMs`. No registra queries, identificadores concretos, cuerpos ni cabeceras. Peticiones abortadas antes de `finish` no se contabilizan; no es tracing distribuido.
- Paginar en memoria es aceptable únicamente por el tamaño reducido del catálogo ficticio.

## Limitaciones conocidas

No es una implementación de producción: no incluye base de datos, métricas centralizadas, límites de tasa, auth ni despliegue; los cambios futuros requieren justificar su necesidad. `npm run check` valida sintaxis, **no** realiza análisis estático de tipos.
