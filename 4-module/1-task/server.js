const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);
  const parsedPath = path.parse(pathname);

  if (parsedPath.dir) {
    res.statusCode = 400;
    res.end();
  }

  switch (req.method) {
    case 'GET':
      const stream = fs.createReadStream(filepath);
      stream.pipe(res);
      stream.on('error', (err) => {
        res.statusCode = 404;
        res.end();
      });
      stream.on('end', () => {
        res.statusCode = 200;
        res.end();
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
