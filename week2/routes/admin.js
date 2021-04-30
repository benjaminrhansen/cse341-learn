const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../util/path'); // gets the path to the root file

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}); // add a new middleware function

router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    console.log(req.body); // req.body parsers the request according to the handler provided above
    res.redirect('/');
})


module.exports = router // export the router