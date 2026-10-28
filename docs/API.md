# Contrato HTTP v0.1.0

Base: `http://127.0.0.1:3000`. Todas las respuestas son JSON; las rutas públicas son de solo lectura.

## GET /health

```json
{"status":"ok","service":"library-api-lab","version":"0.1.0"}
```

## GET /api/v1/books

Parámetros opcionales:

| Parámetro | Regla | Predeterminado |
| --- | --- | --- |
| `page` | Entero entre 1 y 10000 | 1 |
| `limit` | Entero entre 1 y 50 | 10 |
| `q` | Texto libre, máximo 80 caracteres; busca por título o autor | vacío |
| `genre` | `engineering`, `fiction`, `history` o `science` | todos |
| `sort` | `title` o `year` | `title` |
| `order` | `asc` o `desc` | `asc` |

Los parámetros desconocidos, duplicados o con valores no admitidos devuelven `400 INVALID_QUERY`. La ordenación se aplica antes de paginar; el identificador actúa como desempate estable.

Ejemplo: `GET /api/v1/books?genre=fiction&sort=year&order=desc&limit=2&page=1`

```json
{
  "data": [
    {"id":"bk-007","title":"La ciudad invisible","author":"Clara Niebla","genre":"fiction","year":2022},
    {"id":"bk-001","title":"El mapa de la lluvia","author":"Clara Niebla","genre":"fiction","year":2019}
  ],
  "meta":{"page":1,"limit":2,"total":3,"totalPages":2,"sort":"year","order":"desc"}
}
```

## GET /api/v1/books/:id

Ejemplo: `GET /api/v1/books/bk-001`. Respuesta: `{"data":{...}}`. Libro inexistente: `404 BOOK_NOT_FOUND`.

## Errores

```json
{"error":{"code":"INVALID_QUERY","message":"limit debe ser válido"}}
```

Códigos definidos: `INVALID_QUERY` (400), `NOT_FOUND` y `BOOK_NOT_FOUND` (404), `METHOD_NOT_ALLOWED` (405, cabecera `Allow: GET`).

Las rutas no aceptan escritura y no implementan autenticación; nunca desplegar como servicio público con datos reales sin revisar esos controles.

## Caché condicional (catálogo y detalle)

Las respuestas `200` de `GET /api/v1/books` y `GET /api/v1/books/:id` incluyen un `ETag` fuerte calculado a partir del JSON devuelto y `Cache-Control: private, no-cache`. Esto permite **almacenar** la respuesta en una caché privada, pero exige **revalidarla** antes de reutilizarla; no implica que la respuesta permanezca fresca sin consultar al servidor.

En una petición posterior al **mismo recurso y consulta**, envía `If-None-Match: "<etag-recibido>"`. Si el contenido no ha cambiado, el servidor responde `304 Not Modified`, sin cuerpo, con el mismo `ETag`. Si cambian los filtros, la ordenación o el recurso, utiliza el ETag correspondiente a esa representación.

Las respuestas de salud y los errores mantienen `Cache-Control: no-store` y no utilizan ETag.
