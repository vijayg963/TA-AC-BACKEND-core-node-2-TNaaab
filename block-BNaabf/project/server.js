const http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = '';
  req
    .on('data', (chunk) => {
      store += chunk;
    })
    .on('end', () => [console.log(store)]);
  res.end(store);
}

server.listen(4000, () => {
  console.log('Port is listening for 4k');
});
