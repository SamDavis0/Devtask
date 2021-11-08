
   
const express = require('express');
const router = express.Router();
const passport = require('passport');

// router.get('/login', (req,res) => {

//    //renders out markup
//     res.render('login')
// })


router.post('/login', passport.authenticate('local', {
    successRedirect: '/projects', 
    failureRedirect: '/login'
}))

//router.post('/login', (req, res) => {
    
    // scrape information off of header 
    //check if user is in db 
    //password is correct 
    //compare encrypted passwords 
    //place data on session so login can persisted

//})

module.exports = router;