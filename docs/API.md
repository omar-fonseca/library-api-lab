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

Los parámetros desconocidos o duplicados devuelven `400 INVALID_QUERY`.

Ejemplo: `GET /api/v1/books?genre=fiction&limit=2&page=1`

```json
{
  "data": [
    {"id":"bk-001","title":"El mapa de la lluvia","author":"Clara Niebla","genre":"fiction","year":2019},
    {"id":"bk-005","title":"Historias del faro","author":"Lina Arce","genre":"fiction","year":2015}
  ],
  "meta":{"page":1,"limit":2,"total":3,"totalPages":2}
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
