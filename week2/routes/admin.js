const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../util/path'); // gets the path to the root file

router.get("/add-product", (req, res, next) => {
    // instead of going onto the next,
    // send a response! Don't let the request die.
    console.log("Processing request through code at:",rootDir);
    const delet = path.join(rootDir, '..', 'views', 'add-product.html');
    console.log(delet);
    res.sendFile(delet);
    //res.send('<form action = "/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>') // html surroundings will be filled in
}); // add a new middleware function

router.post('/add-product', (req, res, next) => {
    console.log(req.body); // req.body parsers the request according to the handler provided above
    res.redirect('/');
})


module.exports = router // export the router