const Product = require('../models/product');

exports.getProductSearch = (req, res, next) => {
    const tagSearch = req.query.tagSearch;
    if (tagSearch) {
        console.log("Searching by tag: ", tagSearch)
        Product.fetchByTag(tagSearch, products => {
            res.render('pages/ta03', {
                prods: products,
                title: 'All Products',
                path: '/ta03/'
            });
        });
        return;
    }
    Product.fetchAll(products => {
          res.render('pages/ta03', {
            prods: products,
            title: 'All Products',
            path: '/ta03/'
          });
        });
};
    // res.render('pages/ta03', {
    //     title: 'Team Activity 03',
    //     path: '/ta03', // For pug, EJS 
    //     prods: [
    //         {
    //             "tags": [
    //                 "Trees"
    //             ],
    //             "imageUrl": "https://byui-cse.github.io/cse341-course/lesson03/images/1.jpg",
    //             "price": 10.99,
    //             "name": "Handcrafted Trees Tech",
    //             "description": "enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur"
    //         }
    //     ],
    //     activeTA03: true, // For HBS
    //     contentCSS: true, // For HBS
    // });