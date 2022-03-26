const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      if(pathname.includes('/'))
      {
        res.statusCode = 400;
        res.end();
      }
      const readStream = fs.createReadStream(filepath);
      readStream.on('error', (err) =>{
        res.statusCode = err.code === 'ENOENT' ? 404: 500;
        res.end();
        readStream.destroy();
      })
      readStream.pipe(res);
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
