const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./auth/passport-config')(passport);
const port = 3000;

app.use(express.static('public'));
app.use(helmet())
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieSession({
    name: 'session',
    keys: ['askok2n3m'],
    maxAge: 14 * 24 * 60 * 60 * 1000
}))

app.use(passport.initialize())
app.use(passport.session())

//routes 
app.use(require('./routes/index.js'))

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
