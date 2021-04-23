const http = require('http');

const routes = require('./routes/prove01-routes');

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000);

// helloo