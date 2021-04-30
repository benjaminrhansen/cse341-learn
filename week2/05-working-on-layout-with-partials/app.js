const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // render a 404 status error with the following
  // 404.ejs page from the views folder passing as input
  // the object with pageTitle and so forth. This is how
  // ejs can access values for dynamic content on the webpage 
  // as in <%= path %>
  res.status(404).render('404', { 
    pageTitle: '404',
    path: req.url,
    activeShop: true,
    productCSS: true
  });
});

app.listen(3000);
