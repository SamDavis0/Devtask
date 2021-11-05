
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');

router.get('/signup_login', (req, res) => {

    //render out our markupA
    res.render('signup_login', { title: 'DELLO', error: null })
})

router.post('/signup_login', async (req, res) => {

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
            password: password
        })

        res.redirect('/signup_login')
    } catch (error) {
        console.log(error);
        res.render('index', {
            error: "error: can't register this username",
            title: "Express"
        })
    }
})


// router.get('/signup_login/:signup', async (req, res) => {

//     // on success navigate to login page 
//     // on error navigate to error

//     try {

//         // scrape form information from header
//         let {username, email, password} = req.body; 

//         // password and encrypt

//         password = bcrypt.hashSync(password, 8); 

//         // save form information to db
//         // assume all users are basic
//         await db.users.create({
//             username: username, 
//             email: email, 
//             password: password
//         })

//         res.redirect('/projects')
//     } catch(error) {
//         console.log(error);
//         res.render('index', {
//             error: "error: can't register this username",
//             title: "Express"
//         })
//     }
// })



module.exports = router;