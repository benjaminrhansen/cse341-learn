// deprecated
const express = require('express');
const path = require('path');

const router = express.Router()

// specify use to handle all 
// default get or post requests that
// aren't to a specific route (404 errors)
router.use((req, res, next) => {
    console.log("In 404 middleware!");
    // instead of going onto the next,
    // send a response! Don't let the request die.
    //res.status(404).send('<h1>404 Page!</h1>') // html surroundings will be filled in
    res.status(404).sendFile(__dirname, "");
}); // add a new

module.exports = router;