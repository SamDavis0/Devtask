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
            tasks: tasks,
            todos: todos,
            inprogress: inprogress,
            done: done,
            users: users
        })
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



module.exports = router;