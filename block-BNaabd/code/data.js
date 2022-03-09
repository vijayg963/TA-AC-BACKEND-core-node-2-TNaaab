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
    if (req.method === 'POST' && req.url === '/json') {
      res.setheader('Content-Type', 'application/json');
      //   var parseData = JSON.parse(store);
      res.end(store);
    }
    if (req.method === 'POST' && req.url === '/form') {
      var parseData = qs.parse(store);
      res.end(JSON.stringify(parseData));
    }
  });
}

server.listen(7000, () => {
  console.log('server 7k  is live now');
});
