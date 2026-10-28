import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../src/app.js';

let server;
let base;

before(async () => {
  server = createApp();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = 'http://127.0.0.1:' + server.address().port;
});

after(async () => {
  if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

async function request(path, options) {
  const response = await fetch(base + path, options);
  const raw = await response.text();
  return { status: response.status, headers: response.headers, body: raw ? JSON.parse(raw) : null };
}

test('health devuelve un estado explícito', async () => {
  const result = await request('/health');
  assert.equal(result.status, 200);
  assert.equal(result.body.status, 'ok');
  assert.equal(result.body.service, 'library-api-lab');
});

test('catálogo devuelve colección y metadatos', async () => {
  const result = await request('/api/v1/books');
  assert.equal(result.status, 200);
  assert.equal(result.body.meta.total, 8);
  assert.equal(result.body.data.length, 8);
});

test('paginación es determinista y no repite elementos', async () => {
  const first = await request('/api/v1/books?page=1&limit=3');
  const second = await request('/api/v1/books?page=2&limit=3');
  assert.equal(first.body.data.length, 3);
  assert.equal(second.body.data.length, 3);
  assert.equal(first.body.meta.totalPages, 3);
  const firstIds = new Set(first.body.data.map((book) => book.id));
  assert.ok(second.body.data.every((book) => !firstIds.has(book.id)));
});

test('búsqueda insensible a mayúsculas y filtro de género', async () => {
  const search = await request('/api/v1/books?q=NIEBLA');
  assert.equal(search.body.meta.total, 2);
  const genre = await request('/api/v1/books?genre=science');
  assert.equal(genre.body.meta.total, 2);
  assert.ok(genre.body.data.every((book) => book.genre === 'science'));
});

test('búsqueda admite Unicode y recorta espacios', async () => {
  const unicode = await request('/api/v1/books?q=' + encodeURIComponent('CIENCIA COTIDIANA'));
  assert.equal(unicode.status, 200);
  assert.equal(unicode.body.meta.total, 1);
  assert.equal(unicode.body.data[0].id, 'bk-006');

  const spaces = await request('/api/v1/books?q=%20Niebla%20');
  assert.equal(spaces.status, 200);
  assert.equal(spaces.body.meta.total, 2);
});

test('límites de paginación aceptan máximos y rechazan el siguiente valor', async () => {
  const accepted = await request('/api/v1/books?page=10000&limit=50');
  assert.equal(accepted.status, 200);
  assert.deepEqual(accepted.body.data, []);

  for (const path of ['/api/v1/books?page=10001', '/api/v1/books?limit=51']) {
    const result = await request(path);
    assert.equal(result.status, 400, path);
    assert.equal(result.body.error.code, 'INVALID_QUERY', path);
  }
});

test('ordenación por año y título es configurable y estable', async () => {
  const years = await request('/api/v1/books?sort=year&order=desc&limit=3');
  assert.deepEqual(years.body.data.map((book) => book.year), [2024, 2023, 2022]);
  assert.equal(years.body.meta.sort, 'year');
  assert.equal(years.body.meta.order, 'desc');

  const titles = await request('/api/v1/books?sort=title&order=asc');
  const actual = titles.body.data.map((book) => book.title);
  const expected = [...actual].sort((left, right) => left.localeCompare(right, 'es'));
  assert.deepEqual(actual, expected);

  for (const path of ['/api/v1/books?sort=author', '/api/v1/books?order=random']) {
    const result = await request(path);
    assert.equal(result.status, 400, path);
    assert.equal(result.body.error.code, 'INVALID_QUERY', path);
  }
});

test('página fuera de rango devuelve lista vacía, no error', async () => {
  const result = await request('/api/v1/books?page=99');
  assert.equal(result.status, 200);
  assert.deepEqual(result.body.data, []);
});

test('consulta inválida tiene contrato de error predecible', async () => {
  for (const path of [
    '/api/v1/books?limit=0',
    '/api/v1/books?page=-1',
    '/api/v1/books?limit=51',
    '/api/v1/books?page=1&page=2',
    '/api/v1/books?unexpected=1',
    '/api/v1/books?genre=unknown'
  ]) {
    const result = await request(path);
    assert.equal(result.status, 400, path);
    assert.equal(result.body.error.code, 'INVALID_QUERY', path);
  }
});

test('detalle encuentra un libro y maneja identificadores inexistentes', async () => {
  const found = await request('/api/v1/books/bk-001');
  assert.equal(found.status, 200);
  assert.equal(found.body.data.id, 'bk-001');

  const missing = await request('/api/v1/books/bk-999');
  assert.equal(missing.status, 404);
  assert.equal(missing.body.error.code, 'BOOK_NOT_FOUND');
});

test('rutas desconocidas responden con 404 JSON', async () => {
  const result = await request('/missing');
  assert.equal(result.status, 404);
  assert.equal(result.body.error.code, 'NOT_FOUND');
});

test('métodos no permitidos responden 405 con Allow', async () => {
  const result = await request('/api/v1/books', { method: 'POST' });
  assert.equal(result.status, 405);
  assert.equal(result.headers.get('allow'), 'GET');
  assert.equal(result.body.error.code, 'METHOD_NOT_ALLOWED');
});

test('ETag permite revalidar listado y detalle sin transferir cuerpo', async () => {
  const list = await request('/api/v1/books?sort=year');
  const etag = list.headers.get('etag');
  assert.match(etag, /^"[a-f0-9]{64}"$/);
  assert.equal(list.headers.get('cache-control'), 'private, no-cache');

  const cached = await request('/api/v1/books?sort=year', {
    headers: { 'if-none-match': etag }
  });
  assert.equal(cached.status, 304);
  assert.equal(cached.body, null);
  assert.equal(cached.headers.get('etag'), etag);

  const weak = await request('/api/v1/books?sort=year', {
    headers: { 'if-none-match': '"other", W/' + etag }
  });
  assert.equal(weak.status, 304);

  const different = await request('/api/v1/books?sort=title', {
    headers: { 'if-none-match': etag }
  });
  assert.equal(different.status, 200);
  assert.notEqual(different.headers.get('etag'), etag);

  const detail = await request('/api/v1/books/bk-001');
  const detailEtag = detail.headers.get('etag');
  assert.ok(detailEtag);
  const detailCached = await request('/api/v1/books/bk-001', {
    headers: { 'if-none-match': detailEtag }
  });
  assert.equal(detailCached.status, 304);
  assert.equal(detailCached.body, null);

  const missing = await request('/api/v1/books/bk-999', {
    headers: { 'if-none-match': '*' }
  });
  assert.equal(missing.status, 404);

  const health = await request('/health');
  assert.equal(health.headers.get('etag'), null);
});
