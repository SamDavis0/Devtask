const express = require('express');
const passport = require('passport');

const router = express.Router();

router.use('/public', express.static(__dirname + '/public'));

router.post('/login_signup', passport.authenticate('local', {
  successRedirect: '/projects',
  failureRedirect: '/login_signup',
}));

router.get('/login_signup', (req, res) => {
  
  //render out our markupA
  res.render('login_signup', { title: 'DELLO', error: null });
});

router.post('/login_signup', async (req, res) => {
  
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
    
    
    res.redirect('/login_signup');
  } catch (error) {
    console.log(error);
    res.render('index', {
      error: 'error: can\'t register this username',
      title: 'Express',
    });
  }
});

module.exports = router;
