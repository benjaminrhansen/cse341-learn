//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

let users = ["Benjamin", "Jacob", "Reece", "Trey"];
let message = false;

router.post('/addUser',(req, res, next) => {
    users.push(req.body.addUser);
    res.redirect('/ta02/');
});

router.post('/removeUser',(req, res, next) => {
    if (users.includes(req.body.removeUser)) {
        users = users.filter(element => {
            return element != req.body.removeUser;
        });
    } else {
        message = true;
    }
    // users.delete(users[req.body.addUser]);
    res.redirect('/ta02/');
});

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS 
        users: users,
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        message: message
    });
    message = false;
});

module.exports = router;