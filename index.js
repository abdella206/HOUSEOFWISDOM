require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
//Module allows use of sessions
const session = require('express-session');
//Imports passport local strategy
const passport = require('./config/passportConfig');//needs path if you wrote code
// module for flash messages
const flash = require('connect-flash');//is-middleware need app.use
const isLoggedIn = require('./middleware/isLoggedIn')
const helmet = require('helmet');
//this is only used by the session store
const db = require('./models');

const axios = require('axios');

const methodOverride = require('method-override');

const app = express();

//this line makes the session use sequelize to write session data to a postgres table
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30
});

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());
app.use(methodOverride('_method'));

//Configures express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

//after the session has been created you need to do this once
//use this line once to set up the store table
sessionStore.sync();

// starts the flash middleware
app.use(flash());

//Link passport to the express session
//MUST BE BELOW SESSION this is step #1
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

app.get('/', function (req, res) {
  console.log(req.user)
  res.render('index');
});



app.get('/profile', isLoggedIn, function (req, res) {
  db.user.findOne({
    where: { id: req.user.id },
    include: [db.category, db.post]
  })
    .then(function (user) {
      return axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
        .then(function (result) {
          res.render('profile', { user, data: result.data,  testing  })
        })
    })

});


function testing() {
  console.log('this is testing')
  return {
      quoteText: 'this is not new',
  }
}



// app.get('/', function (req, res) {
//   // Use request to call the API

//     .then(function (result) {
//       // result.data;
//       res.render('profile', result.data);
//     })
// });





// app.get('/profile', function (req, res) {
//   // Use request to call the API
//   axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
//     .then(function (result) {
//       res.render('profile', {result: result.data})
//       .catch( e => res.json({e}))
//      // res.send(result.data);
//     })
// });





// // GET / - main index of site
// app.get('/profile', function(req, res) {
//   var quoteUrl = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
//   // Use request to call the API
//   axios.get(quoteUrl).then( function(apiResponse) {
//     var quote = apiResponse.data.results;
//     res.render('profile', { quote });
//   })
// });


app.use('/auth', require('./controllers/auth'));
app.use('/posts', require('./controllers/post'));
app.use('/category', require('./controllers/category'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
