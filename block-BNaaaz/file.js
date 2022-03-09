var http = require('http');
var fs = require('fs');

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  fs.createReadStream('./readme.txt').pipe(res);
  res.end();
}

server.listen(4000, () => {
  console.log('Hello from port 4k');
});
