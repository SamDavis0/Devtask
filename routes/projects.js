const express = require('express');
const router = express.Router();
const auth = require('../auth');
const db = require('../models');


router.use('/public', express.static(__dirname + '/public'));



router.get('/projects', auth, async (req, res) => {
    try {

        let projects = await db.projects.findAll();
        let tasks = await db.tasks.findAll();

        console.log(projects.name);
        // await db.projects.get({
        //     project_name: project_name,
        //     description: description
        // })
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch(() => {
        //         console.log("error");
        //     })

        res.render('projects', {
            error: "error: can't register this username",
            title: "Express",
            projects: projects,
            tasks: tasks
        })
        // console.log(JSON.stringify(projects));
    } catch (error) {
        console.log(error);
    }
})

// router.post('/login', (req, res) => {



//     // scrape information off of header 
//     // check if user is in db 
//     // password is correct 
//     // compare encrypted passwords 
//     // place data on session so login can persisted

// })

// router.post('/projects', (req, res) => {

// res.render()
// })

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/projects', 
//     failureRedirect: '/login'
// }))



module.exports = router;