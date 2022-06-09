const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'json-server-db.json'));
const middlewares = jsonServer.defaults();
const cors = require('cors');

const db = require(path.join(__dirname, 'json-server-db.json'));


server.use(cors());
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

// server.get('/applications', (req, res) => {
//   const apps = db['apps'];
//   res.status(200).send(apps);
// });

server.use(function(req, res, next){
  setTimeout(next, 2000);
});
server.use(middlewares);
server.use(router);

server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
