import { createServer } from 'node:http';
import { findBookById, genres, listBooks } from './catalog.js';

function respond(res, status, body, extraHeaders = {}) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    ...extraHeaders
  });
  res.end(payload);
}

function fail(res, status, code, message, extraHeaders = {}) {
  respond(res, status, { error: { code, message } }, extraHeaders);
}

function positiveInteger(value, fallback, maximum) {
  if (value === null) return fallback;
  if (!/^[1-9][0-9]*$/.test(value)) return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && number <= maximum ? number : null;
}

function parseFilters(params) {
  const allowed = new Set(['page', 'limit', 'q', 'genre']);
  for (const key of params.keys()) {
    if (!allowed.has(key)) return { error: 'Parámetro no admitido: ' + key };
    if (params.getAll(key).length !== 1) return { error: 'Parámetro repetido: ' + key };
  }

  const page = positiveInteger(params.get('page'), 1, 10000);
  const limit = positiveInteger(params.get('limit'), 10, 50);
  if (page === null || limit === null) {
    return { error: 'page debe estar entre 1 y 10000; limit entre 1 y 50' };
  }

  const q = (params.get('q') ?? '').trim();
  if (q.length > 80) return { error: 'q no puede superar 80 caracteres' };

  const genre = (params.get('genre') ?? '').trim().toLowerCase();
  if (genre && !genres.includes(genre)) {
    return { error: 'genre debe ser uno de: ' + genres.join(', ') };
  }
  return { value: { page, limit, q, genre } };
}

export function createApp() {
  return createServer((req, res) => {
    let url;
    try {
      url = new URL(req.url ?? '/', 'http://localhost');
    } catch {
      fail(res, 400, 'BAD_REQUEST', 'URL inválida');
      return;
    }

    const path = url.pathname;
    const isHealth = path === '/health';
    const isCollection = path === '/api/v1/books';
    const isDetail = /^\/api\/v1\/books\/bk-[0-9]{3}$/.test(path);
    const isBookPath = path.startsWith('/api/v1/books/');

    if (!(isHealth || isCollection || isBookPath)) {
      fail(res, 404, 'NOT_FOUND', 'Ruta no encontrada');
      return;
    }

    if (req.method !== 'GET') {
      fail(res, 405, 'METHOD_NOT_ALLOWED', 'Solo se admite GET', { allow: 'GET' });
      return;
    }

    if (isHealth) {
      respond(res, 200, { status: 'ok', service: 'library-api-lab', version: '0.1.0' });
      return;
    }

    if (isCollection) {
      const parsed = parseFilters(url.searchParams);
      if (parsed.error) {
        fail(res, 400, 'INVALID_QUERY', parsed.error);
        return;
      }
      respond(res, 200, listBooks(parsed.value));
      return;
    }

    if (!isDetail) {
      fail(res, 404, 'BOOK_NOT_FOUND', 'Libro no encontrado');
      return;
    }

    const book = findBookById(path.slice('/api/v1/books/'.length));
    if (!book) {
      fail(res, 404, 'BOOK_NOT_FOUND', 'Libro no encontrado');
      return;
    }
    respond(res, 200, { data: book });
  });
}
