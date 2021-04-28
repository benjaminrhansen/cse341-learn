const path = require('path');

const express = require('express');

const router = express.Router();
const rootDir = require('../util/path'); // gets the path to the root file

router.get('/',  (req, res, next) => {
    // give an absolute path using path join to build a correct
    // path for Linux/Mac/Windowss
    console.log("Processing request through code at:",require.main.filename);
    res.sendFile(path.join(rootDir, '..', 'views', 'shop.html'));
});

module.exports = router;