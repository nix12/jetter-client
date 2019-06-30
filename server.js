const express = require('express');
const next = require('next');
const cookiesMiddleware = require('universal-cookie-express');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(async () => {
    const server = express();

    server.use(helmet());
    server.use(cookiesMiddleware());
    server.use((req, res, next) => {
      req.userId = req.universalCookies.get('userId');
      req.username = req.universalCookies.get('username');
      next();
    });

    server.get('/u/:username/password', async (req, res) => {
      app.render(req, res, '/user/update', {
        username: req.username
      });
    });

    server.get('/u/:username', async (req, res) => {
      app.render(req, res, '/user/show', {
        userId: req.userId,
        username: req.username
      });
    });

    server.get('/signup', async (req, res) => {
      app.render(req, res, '/user/new', {});
    });

    server.get('/login', async (req, res) => {
      app.render(req, res, '/auth', {});
    });

    server.get('/logout', async (req, res) => {
      app.render(req, res, '/logout', {});
    });

    server.get('/', async (req, res) => {
      app.render(req, res, '/index', {});
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
  });
