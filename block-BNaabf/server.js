const path = require('path');

var absolutePath = __dirname;

var newPath = path.join(absolutePath, './index.js');
console.log(absolutePath);
console.log(newPath);
