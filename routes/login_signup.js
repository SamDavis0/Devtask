const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../models');

const router = express.Router();

router.use('/public', express.static(__dirname + '/public'));

router.get('/login_signup', (req, res) => {
  res.render('login_signup', { title: 'Devtask' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/projects',
  failureRedirect: '/login_signup',
}));

router.post('/signup', async (req, res) => {
  
  // on success navigate to login page
  // on error navigate to error
  
  try {
    
    // scrape form information from header
    let { username, email, password } = req.body;
    console.log(username);
    // password and encrypt
    
    password = bcrypt.hashSync(password, 8);
    
    // save form information to db
    // assume all users are basic
    await db.users.create({
      username: username,
      email: email,
      password: password,
    });
    throw Error
    
    res.redirect('/login_signup');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Sign up failed');
    res.redirect('/login_signup');
    // res.render('login_signup', {
    //   error: 'error: can\'t register this username',
    //   title: 'Devtask'
    // });
  }
});

module.exports = router;
