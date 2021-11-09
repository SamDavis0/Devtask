const express = require('express');
const router = express.Router();
const auth = require('../auth');
const db = require('../models');



router.use('/public', express.static(__dirname + '/public'));

router.get('/projects', auth, async (req, res) => {
    try {

        let projects = await db.projects.findAll();
        let tasks = await db.tasks.findAll();
        let users = await db.users.findAll()

        let todos = []
        let inprogress = []
        let done = []

        tasks.forEach(task => {
            switch(task.status){
                case 0:
                    todos.push(task)
                    break
                case 1:
                    inprogress.push(task)
                    break
                case 2:
                    done.push(task)
                    break
            }

        });

        res.render('projects', {
            error: "error: can't register this username",
            title: "Express",
            projects: projects,
            todos: todos,
            inprogress: inprogress,
            done: done,
            users: users
        })
        // console.log(JSON.stringify(projects));
    } catch (error) {
        console.log(error);
    }
})

router.post('/projects', async (req, res) => {
    let description = req.body.taskValue;
    console.log(req.body);
    let newTask = await db.tasks.create({
        description,
        status: 0
    })
    res.sendStatus(204)
})

router.put('/projects', async (req,res) => {
    let taskId = req.body.taskId
    let status = req.body.status
    await db.tasks.update({status}, {where: {id: taskId}})
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