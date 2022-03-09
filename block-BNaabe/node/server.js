var http = require('http');
var qs = require('querystring');
var path = require('path');

console.log(__dirname + '/app.js');
console.log(__filename);

let pathWay = path.join(__dirname, 'index.html');
console.log(pathWay);

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  if (req.method === 'POST' && req.url === '/') {
    var store = '';
    req
      .on('data', (chunk) => {
        store += chunk;
      })
      .on('end', () => {
        res.statusCode = 201;
        let parseData = qs.parse(store);
        res.end(JSON.stringify(parseData));
      });
  }
}

server.listen(2000, () => {
  console.log('It is server 2k');
});
