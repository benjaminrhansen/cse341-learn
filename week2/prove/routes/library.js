const fs = require('fs');
const path = require('path');

const express = require('express');

const router = express.Router();
const rootDir = require(path.join(__dirname, '..', 'util', 'path'));

router.get('/', (req, res, next) => {
  // with help from https://stackabuse.com/reading-and-writing-json-files-with-node-js/
  const rawdata = fs.readFileSync(path.join(rootDir, "books.json"));
  const allBooks = JSON.parse(rawdata);
  res.render('library', {
    books: allBooks, // change as needed
    pageTitle: 'Library',
    path: '/', 
    hasBooks: allBooks.length > 0,
    hasBooksCSS: true
  });
});

module.exports = router;
