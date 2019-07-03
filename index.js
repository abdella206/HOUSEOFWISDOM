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

app.use(function(req, res, next){
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

app.get('/', function(req, res) {
  console.log(req.user)
  res.render('index');
});



app.get('/profile', isLoggedIn, function(req, res) {
  db.user.findOne({
    where: {id: req.user.id},
    include: [db.post]
  }).then(function(user) {
    db.category.findAll().then(function(categories) {
      res.render('profile', {user, categories})
    });
    
  });
});




app.use('/auth', require('./controllers/auth'));
app.use('/posts', require('./controllers/post'));
app.use('/category', require('./controllers/category'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
