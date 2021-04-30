// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000 // So we can run on heroku || (OR) localhost:3000

const app = express();

const rootDir = require(path.join(__dirname, 'util', 'path'));

// Route setup. You can implement more in the future!
const ta01Routes = require(path.join(rootDir, 'routes', 'ta01'));
const ta02Routes = require(path.join(rootDir, 'routes', 'ta02'));
const ta03Routes = require(path.join(rootDir, 'routes', 'ta03')); 
const ta04Routes = require(path.join(rootDir, 'routes', 'ta04')); 
const prove02Routes = require(path.join(rootDir, 'routes', 'prove02')); 

app.use(express.static(path.join(rootDir, 'public')))
   .set('views', path.join(rootDir, 'views'))
   .set('view engine', 'ejs')
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   .use(bodyParser({extended: false})) // For parsing the body of a POST
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .use(bodyParser.urlencoded({extended: false})) // For parsing the body of a POST
   .use('/prove02', prove02Routes.bookManagerRoutes)
   .use('/prove02', prove02Routes.libraryRoutes)
   .use(bodyParser({extended: false})) // For parsing the body of a POST
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   })
   .listen(PORT, () => console.log(`Listening on ${ PORT }`));
