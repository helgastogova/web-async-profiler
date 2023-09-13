const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use((req, res, next) => {
    console.log('Before json/urlencoded middleware');
    next();
  });

  server.use(json({ limit: '15mb' }));
  server.use(urlencoded({ limit: '15mb', extended: true }));

  server.use((req, res, next) => {
    console.log('After json/urlencoded middleware');
    next();
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
