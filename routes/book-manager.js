const path = require('path');
const fs = require('fs');

const express = require('express');

const router = express.Router();
const rootDir = require(path.join(__dirname, '..', 'util', 'path'));

// route for displaying form to add books
router.get('/', (req, res, next) => {
  res.render('book-manager', {
    pageTitle: 'Book Manager',
    path: '/book-manager/'
  });
});

// route for processing the post request
// to add books
router.post('/add-book', (req, res, next) => {
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
    res.redirect('/'); // redirect home
});

module.exports = router;
