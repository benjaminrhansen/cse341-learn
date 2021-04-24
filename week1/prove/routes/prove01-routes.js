const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  // define a fixed set of users
  const default_users = ['BJ', 'Pebbles', 'Jumpster', 'BeiBei', 'Bison'];
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Add Users</title></head>');
    res.write('<body>');
    res.write('<h1>Greatings from your neighborly local machine</h1>');
    res.write('<h3>Add a User</h3>');
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Add</button></form></body>'
    );
    res.write('</body>')
    res.write('</html>');
    return res.end();
  }
  else if (url === '/users') {
      /* pull up the current list of users */
      // with help from https://stackabuse.com/reading-and-writing-json-files-with-node-js/
      console.log(process.cwd())
      const rawdata = fs.readFileSync("./users.json")
      const users = JSON.parse(rawdata);
      res.write('<html>');
      res.write('<head><title>User</title></head>');
      res.write(
        `<body>
        <div>
        <h1>Current Users</h1>
          <div>
              <ul>`
      );
      // for each user, just display the username
      users.forEach(user => {
          res.write(`<li>${user["username"]}</li>`);
      });
      res.write(`</ul>
          </div>
         </div>
          </body>`
      );
      res.write('</html>');
      return res.end();
      // const body = [];
      // req.on('data', chunk => {
      //   console.log(chunk);
      //   body.push(chunk);
      // });
      // return req.on('end', () => {
      //   const parsedBody = Buffer.concat(body).toString();
      //   const message = parsedBody.split('=')[1];
      //   fs.writeFile('message.txt', message, err => {
      //     res.statusCode = 302;
      //     res.setHeader('Location', '/');
      //     return res.end();
      //   });
      // });
  }
  else if (url == "/create-user" && method == "POST") {
    const rawdata = fs.readFileSync("./users.json")
    const current_users = JSON.parse(rawdata);
    const body = [];
    // Another chunk of data to be read?
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    // Is the data stream done?
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      // split on key-value pairs, get the right hand side
      const username = parsedBody.split('=')[1];
      console.log("Adding ", username)
      const updated_users = current_users.concat([
          {"username": username,
            "age": -1,
            "favorite-hobbies": "Unknown"
            }
      ]);
      fs.writeFileSync('users.json', JSON.stringify(updated_users),
      // handler 
       err => {
        res.statusCode = 302;
        res.setHeader('Location', '/users');
        return res.end();
      });
    });

    // prepare the response
    // with help from https://stackoverflow.com/questions/11355366/how-to-redirect-users-browser-url-to-a-different-page-in-nodejs
    res.statusCode = 307; // for reasons in comment by Brian Ellis
    res.setHeader('Location', '/users');
    return res.end();

  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

// minor change

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestHandler;
exports.someText = 'someText is useful somehow?';