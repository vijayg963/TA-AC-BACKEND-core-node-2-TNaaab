var http = require('http');
var qs = require('querystring');

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var dataFormat = req.headers['content-type'];
  var store = '';
  req.on('data', (chunk) => {
    store = store + chunk;
  });
  req.on('end', () => {
    if (dataFormat === 'application/json') {
      var parseData = JSON.parse(store);
      res.end(store);
    }
    if (dataFormat === 'application/x-www-form-urlencoded') {
      var parseData = qs.parse(store);
      res.end(JSON.stringify(parseData));
    }
  });
}

server.listen(7000, () => {
  console.log('server 7k  is live now');
});
