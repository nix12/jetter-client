// const { parse } = require('url');
// const match = require('micro-route/match');
// const { send } = require('micro');
// const cors = require('micro-cors')();
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';

// const app = next({ dev });
// const handle = app.getRequestHandler();

// const isAuth = req => match(req, '/login');
// const isUser = req => match(req, '/user/:username');

// function main(req, res) {
//   const parsedUrl = parse(req.url, true);
//   const { params, query } = parsedUrl;

//   // console.log('parsedUrl', parsedUrl);
//   // console.log('isAuth', isAuth);
//   // console.log('isAuth req', isAuth(req));

//   console.log('query', query);

//   // console.log('APP PREPARED');
//   // console.log('REQ', req);

//   console.log('REQUEST METHOD', req.method);
//   console.log('REQUEST HEADER', req.headers);
//   // if (req.method === 'OPTIONS') {
//   //   return send(res, 200);
//   // }

//   if (isAuth(req)) {
//     return app.render(req, res, '/auth', query);
//   }

//   if (isUser(req)) {
//     return app.render(req, res, '/user', query);
//   }

//   return handle(req, res, parsedUrl);
// }

// async function setup(handler) {
//   await app.prepare();
//   return handler;
// }

// module.exports = setup(main);

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

    if (pathname === '/login') {
      app.render(req, res, '/auth', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
