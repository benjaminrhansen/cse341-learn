const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express(); // execute the function

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// key-value pair data
app.use(bodyParser.urlencoded({
    extended: false
})); // yeild a middleware that parses url-encoded data

// all requests for files will be forwarded to the public folder!
// serve static content
app.use(express.static(path.join(__dirname, 'public')));

// regular routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// specify use to handle all 
// default get or post requests that
// aren't to a specific route (404 errors)
app.use((req, res, next) => {
    console.log("In 404 middleware!");
    // instead of going onto the next,
    // send a response! Don't let the request die.
    //res.status(404).send('<h1>404 Page!</h1>') // html surroundings will be filled in
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
}); // add a new

const port = 3000;
app.listen(port); // get's the http server for us

console.log("Listening on port:", port)


// old learning code
// add a middleware function
// applying use over and over adds a set of methods 
// the middleware. This is like building out a main() function
// through repeated use calls. If we don't call the next 
// variable function after our handler finished execution
// we won't allow the following handlers to run
// calls this method on each server request
// app.use((req, res, next) => {
//     console.log("In the middleware!");
//     // call the next request
//     next(); // allow the next handler to be run on the request
// }); // add a new middleware function

// add another function to be called on each new request
// "/" is the default path
// app.use("/", (req, res, next) => {
//     console.log("This always runs");
//     // instead of going onto the next,
//     // send a response! Don't let the request die.
//     //res.send('<h1>Main</h1>') // html surroundings will be filled in
//     // send ends, don't run next and send more, you can't!
//     // The request was already responded to.
//     //next(); // run the next handler
// }); // add a new middleware function


// app.use("/add-product", (req, res, next) => {
//     console.log("In the /users middleware!");
//     // instead of going onto the next,
//     // send a response! Don't let the request die.
//     res.send('<form action = "/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>') // html surroundings will be filled in
// }); // add a new middleware function

// this should only list to a POST request
// restrict it with get instead of use
// filter by get
// app.get('/product', (req, res, next) => {
//     console.log(req.body); // req.body parsers the request according to the handler provided above
//     res.redirect('/');
// })

// app.post('/product', (req, res, next) => {
//     console.log(req.body); // req.body parsers the request according to the handler provided above
//     res.redirect('/');
// })
// // all requests will match this handler path since the default is "/"
// // since it's the default
// app.use((req, res, next) => {
//     console.log("In another middleware!");
//     // instead of going onto the next,
//     // send a response! Don't let the request die.
//     res.send('<h1>Add Product</h1>') // html surroundings will be filled in
// }); // add a new middleware function


