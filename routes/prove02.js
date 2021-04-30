// core modules
const path = require('path');
const fs = require('fs');

// 3rd party
const express = require('express');

// Book Manager routes

// personal modules
const bookManagerRouter = express.Router();
const rootDir = require(path.join(__dirname, '..', 'util', 'path'));

// route for displaying form to add books
bookManagerRouter.get('/book-manager', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'pages', 'prove02'), {
    title: 'Book Manager',
    path: '/book-manager'
  });
});

// route for processing the post request
// to add books
bookManagerRouter.post('/book-manager/add-book', (req, res, next) => {
    // with help from https://stackabuse.com/reading-and-writing-json-files-with-node-js/
    const rawdata = fs.readFileSync(path.join(rootDir, "books.json"));
    const currBooks = JSON.parse(rawdata);
    const bookTitle = req.body.bookTitle;
    const bookSummary = req.body.bookSummary;
    console.log("Adding book", bookTitle);
    const updatedBooks = currBooks.concat([{
            "title": bookTitle,
            "summary": bookSummary
        }]);
    fs.writeFileSync(path.join(rootDir,'books.json'), JSON.stringify(updatedBooks));
    res.redirect('/prove02/'); // redirect home
});

exports.bookManagerRoutes = bookManagerRouter;

// Library routes
const libraryRouter = express.Router();

libraryRouter.get('/', (req, res, next) => {
  // with help from https://stackabuse.com/reading-and-writing-json-files-with-node-js/
  const rawdata = fs.readFileSync(path.join(rootDir, "books.json"));
  const allBooks = JSON.parse(rawdata);
  res.render(path.join(rootDir, 'views', 'pages', 'prove02'), {
    books: allBooks, // change as needed
    title: 'Library',
    path: '/', 
    hasBooks: allBooks.length > 0,
    hasBooksCSS: true
  });
});

exports.libraryRoutes = libraryRouter;