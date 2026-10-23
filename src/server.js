import { createApp } from './app.js';

const rawPort = process.env.PORT ?? '3000';
const port = Number(rawPort);
if (!/^[0-9]+$/.test(rawPort) || !Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT debe ser un entero entre 1 y 65535');
  process.exitCode = 1;
} else {
  const host = process.env.HOST ?? '127.0.0.1';
  const server = createApp();
  server.listen(port, host, () => {
    console.log('Library API Lab disponible en http://' + host + ':' + port);
  });
}
