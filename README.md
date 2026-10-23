# Library API Lab

Laboratorio autónomo de ingeniería backend: una pequeña API REST de biblioteca **ficticia**. Es un espacio de aprendizaje y experimentación, no un producto comercial ni un servicio desplegado.

## Alcance de la versión 0.1.0

- `GET /health`: estado del servicio.
- `GET /api/v1/books`: catálogo con filtros `q`, `genre` y paginación.
- `GET /api/v1/books/:id`: detalle de un libro.
- Errores HTTP JSON consistentes, pruebas de integración y GitHub Actions.

## Requisitos y ejecución

Node.js 22 o superior; no necesita Docker, base de datos externa ni servicios pagos.

```bash
npm ci
npm run check
npm test
npm start
```

Abre `http://127.0.0.1:3000/health` o consulta `http://127.0.0.1:3000/api/v1/books`.
También puedes usar `PORT=4000 npm start` y `HOST=0.0.0.0 npm start` cuando sea apropiado.

## Estructura

- `src/`: servidor HTTP y reglas del catálogo.
- `test/`: pruebas de endpoints sin servicios externos.
- `docs/API.md`: contrato HTTP y ejemplos.
- `docs/ARCHITECTURE.md`: estructura y decisiones.
- `docs/DEVELOPMENT-JOURNAL.md`: bitácora para estudiar cambios.
- `docs/DECISIONS.md`: registro breve de decisiones.
- `docs/ROADMAP.md`: mejoras propuestas y criterios de aceptación.
- `AGENTS.md`: límites de trabajo de asistentes y automatizaciones.

## Tecnología y evolución

Comienza con **JavaScript ESM y APIs nativas de Node**, deliberadamente sin dependencias de terceros. TypeScript se contempla como una iteración posterior si añade valor medible; la simplicidad inicial reduce mantenimiento.

## Transparencia

Algunas contribuciones pueden proceder de automatizaciones de IA; se registran en la bitácora y el historial. No se crean cambios vacíos para aumentar actividad. Cualquier cambio debe ser real, explicable y verificable. Este repositorio no debe consultar ni modificar otros proyectos.

Consulta el [registro de cambios](CHANGELOG.md).