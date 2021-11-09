var dragged;

document.addEventListener("drag", function( event ) {
}, false);

document.addEventListener("dragstart", function( event ) {
    if(event.target.className == 'task'){
    dragged = event.target;
    }
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function( event ) {
    event.target.style.opacity = "";
}, false);

document.addEventListener("dragover", function( event ) {
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function( event ) {
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "purple";
    }

}, false);

document.addEventListener("dragleave", function( event ) {
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "";
    }
}, false);

document.addEventListener("drop", function( event ) {
    event.preventDefault();
    let column = event.target
    let task = dragged
    if ( event.target.className.includes('dropzone') && dragged){
        $.ajax({
            type: "PUT",
            url: '/projects',
            data: {
                taskId: task.dataset.taskId,
                status: column.dataset.status
            },
        });
        event.target.style.background = "";
        dragged.parentNode.removeChild( dragged );
        event.target.appendChild( dragged );
    }
}, false);


let buttons = document.querySelectorAll('.deletetask')
buttons.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        let taskNode = event.target.parentNode
        taskNode.remove()
        $.ajax({
            type: "DELETE",
            url: `/projects`,
            data: {
                taskId: taskNode.dataset.taskId,
            }
        })
        // .then(() => {
        //     location.reload();
        // })
    })
});



// del.addEventListener('click', async (e) => {
    
//     if(e.target.className === 'deletetask'){
//         let primaryKey = e.target.id; 

//         console.log(primaryKey);

//         // let result = await fetch(`/todos/${primaryKey}`, {
//         //     method: "DELETE", 
//         //     headers: headers
//         // })
//         router.delete('/projects', async (res,req) => {
//             let taskId = req.body.taskId
//             await db.tasks.destroy({
//                 where: {
//                     id: taskId
//                 }
//             });
//         })
        
//     }
// del.addEventListener('click', async (e) => {
//     function deletetask(id) {
//         return tasks.destroy({
//          where: { id: taskid }
//         })
//        }
//         }

// document.addEventListener('DOMContentLoaded', (event) => {

//     var dragSrcEl = null;
// function handleDragStart(e) {
//     this.style.opacity = '0.1';
//     this.style.border = '3px dashed #c4cad3';
//     dragSrcEl = this;
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/html', this.innerHTML);
// }

// function handleDragOver(e) {
//     if (e.preventDefault) {
//     e.preventDefault();
//     }
//     e.dataTransfer.dropEffect = 'move';
//     return false;
// }

// function handleDragEnter(e) {
//     this.classList.add('task-hover');
// }

// function handleDragLeave(e) {
//     this.classList.remove('task-hover');
// }

// function handleDrop(e) {
//     if (e.stopPropagation) {
//     e.stopPropagation(); // stops the browser from redirecting.
//     }
//     if (dragSrcEl != this) {
//     dragSrcEl.innerHTML = this.innerHTML;
//     this.innerHTML = e.dataTransfer.getData('text/html');
//     }
//     return false;
// }

// function handleDragEnd(e) {
//     this.style.opacity = '1';
//     this.style.border = 0;
//     items.forEach(function (item) {
//     item.classList.remove('task-hover');
//     });
// }


// let items = document.querySelectorAll('.task'); 
// items.forEach(function(item) {
//     item.addEventListener('dragstart', handleDragStart, false);
//     item.addEventListener('dragenter', handleDragEnter, false);
//     item.addEventListener('dragover', handleDragOver, false);
//     item.addEventListener('dragleave', handleDragLeave, false);
//     item.addEventListener('drop', handleDrop, false);
//     item.addEventListener('dragend', handleDragEnd, false);
// });
// });