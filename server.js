const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    console.log('parsedUser', parsedUrl);

    switch (pathname) {
      case '/auth':
        app.render(req, res, '/auth', query);
        break;
      case '/logout':
        app.render(req, res, '/auth/logout', query);
        break;
      case '/user/show':
        app.render(req, res, '/user/show', query);
        break;
      case '/user/new':
        app.render(req, res, '/user/new', query);
        break;
      case '/user/update':
        app.render(req, res, '/user/update', query);
        break;
      default:
        handle(req, res, parsedUrl);
        break;
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
