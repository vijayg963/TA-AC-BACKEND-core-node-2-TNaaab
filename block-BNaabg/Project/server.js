var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var url = require('url');

const userDir = path.join(__dirname, 'users/');

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var parseUrl = url.parse(req.url, true);

  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.method === 'POST' && req.url === '/users') {
      var username = JSON.parse(store).username;
      fs.open(userDir + username + '.json', 'wx', (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${username} created successfully`);
          });
        });
      });
    }
    if (req.method === 'GET' && parseUrl.pathname === '/users') {
      var username = parseUrl.query.username;
      fs.readFile(userPath + username + '.json', (err, content) => {
        if (err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        return res.end(content);
      });
    }
    if (parseUrl.pathname === '/users' && req.method === 'PUT') {
      var username = parseUrl.query.username;
      fs.open(userPath + username + '.json', 'r+', (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(() => {
              return res.end(`${username} updated successfully`);
            });
          });
        });
      });
    }
    if (parseUrl.pathname === '/users' && req.method === 'DELETE') {
      var username = parseUrl.query.username;
      fs.unlink(userPath + username + '.json', (err) => {
        if (err) return console.log(err);
        return res.end(`${username} is deleted`);
      });
    }
    res.status = '404';
    res.end('Page Not Found');
  });
}

server.listen(4000, () => {
  console.log('Port id listing for 4k');
});
