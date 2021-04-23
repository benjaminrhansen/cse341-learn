/// a simple routing module

const fs = require('fs');

const requestHandler = (req, res) => {
    // parse the url
    const url = req.url;
    const method = req.method;
    if (url == "/") {
        res.write("<html>");
        res.write("<head><title>Boom, my first server generated HTML page</title></head>")
        res.write("<body><form action='/message' method='POST'><input type='Text' name='message'><button type='submit'>Send</button></input></form></body>")
        res.write("</html>");
        return res.end();
    }
    if (url == '/message' && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            // buffer it!
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
            // write a file and a dispatch as needed by the server
            // when done writing to message.txt, run the given callback
            fs.writeFile("message.txt", message, (err) => {
                // redirect back to "/" and create a file with the post data
                res.statusCode = 302; // for redirection
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }
    // quit server if desired
    // process.exit(); // exit the current process after the first request
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Boom, my first server generated HTML page</title></head>")
    res.write("<body>Don't be a stinky bod</body>")
    res.write("</html>");
    res.end();

};

module.exports = requestHandler // export desired functions