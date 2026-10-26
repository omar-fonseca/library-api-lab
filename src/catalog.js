// Datos intencionalmente ficticios. No se importan datos de otros sistemas.
const books = Object.freeze([
  { id: 'bk-001', title: 'El mapa de la lluvia', author: 'Clara Niebla', genre: 'fiction', year: 2019 },
  { id: 'bk-002', title: 'Laboratorios del futuro', author: 'Nora Varela', genre: 'science', year: 2021 },
  { id: 'bk-003', title: 'Rutas del tiempo', author: 'Mateo Cifuentes', genre: 'history', year: 2017 },
  { id: 'bk-004', title: 'Sistemas que perduran', author: 'Elena Duarte', genre: 'engineering', year: 2024 },
  { id: 'bk-005', title: 'Historias del faro', author: 'Lina Arce', genre: 'fiction', year: 2015 },
  { id: 'bk-006', title: 'Ciencia cotidiana', author: 'Nora Varela', genre: 'science', year: 2020 },
  { id: 'bk-007', title: 'La ciudad invisible', author: 'Clara Niebla', genre: 'fiction', year: 2022 },
  { id: 'bk-008', title: 'Diseño de servicios', author: 'Elena Duarte', genre: 'engineering', year: 2023 }
].map((book) => Object.freeze(book)));

export const genres = Object.freeze([...new Set(books.map((book) => book.genre))].sort());

export function findBookById(id) {
  return books.find((book) => book.id === id) ?? null;
}

export function listBooks({ page, limit, q, genre, sort = 'title', order = 'asc' }) {
  const search = q?.toLocaleLowerCase('es') ?? '';
  const filtered = books.filter((book) => {
    const matchesGenre = !genre || book.genre === genre;
    const searchable = (book.title + ' ' + book.author).toLocaleLowerCase('es');
    return matchesGenre && (!search || searchable.includes(search));
  });

  const direction = order === 'desc' ? -1 : 1;
  const sorted = filtered.toSorted((left, right) => {
    const primary = sort === 'year'
      ? left.year - right.year
      : left.title.localeCompare(right.title, 'es');
    return (primary || left.id.localeCompare(right.id)) * direction;
  });

  const total = sorted.length;
  return {
    data: sorted.slice((page - 1) * limit, page * limit),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      sort,
      order
    }
  };
}
