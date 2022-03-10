const http = require('http');
const qs = require('querystring');
const fs = require('fs');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/form') {
      res.setHeader('Conetnt-Type', 'text/html');
      fs.createReadStream('./form.html').pipe(res);
    }
    if (req.method === 'POST' && req.url === '/form') {
      var parsedData = qs.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.write(`<h2>${parsedData.name}</h2>`);
      res.write(`<h3>${parsedData.name}</h3>`);
      res.write(`<p>${parsedData.name}</p>`);
      res.end();
    }
  });
}

server.listen(5678, () => {
  console.log('Port is listening for 5678');
});
