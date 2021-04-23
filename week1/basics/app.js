const http = require("http")
const https = require("https")

// get what the module exported and call it routes
const routes = require("./routes"); 

// run the rqListener on every request 
// received to the server
const server = http.createServer(routes);
// same as http.createServer((req, res) => {});

server.listen(3000); // keep listening, don't quit