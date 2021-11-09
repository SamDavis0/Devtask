const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const flash = require('express-flash')


require('./auth/passport-config')(passport);
const port = 3000;

app.use('/public', express.static(__dirname + '/public'));

// app.use(express.static('public'));
app.use(
  helmet({
      contentSecurityPolicy: {
          directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'", "https://maps.googleapis.com", "https://www.google.com", "https://ajax.googleapis.com"],
              styleSrc: ["'self'", "fonts.googleapis.com", "https://cdn.jsdelivr.net"],
          }
      },
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieSession({
  name: 'session',
  keys: ['askok2n3m'],
  maxAge: 14 * 24 * 60 * 60 * 1000,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes

// app.use(require('./routes/indextest.js'))
// app.use(require('./routes/logintest.js'))
// app.use(require('./routes/registertest.js'))


app.use(require('./routes/index.js'));
app.use(require('./routes/login_signup.js'));
app.use(require('./routes/projects.js'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
