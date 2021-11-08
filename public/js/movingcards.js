var dragged;

  /* events fired on the draggable target */
document.addEventListener("drag", function( event ) {
}, false);

document.addEventListener("dragstart", function( event ) {
    // store a ref. on the dragged elem
    if(event.target.className == 'task'){
    dragged = event.target;
    }
    // make it half transparent
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function( event ) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function( event ) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function( event ) {
    // highlight potential drop target when the draggable element enters it
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "purple";
    }

}, false);

document.addEventListener("dragleave", function( event ) {
    // reset background of potential drop target when the draggable element leaves it
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "";
    }
}, false);

document.addEventListener("drop", function( event ) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    console.log(event.target.className);
    // move dragged elem to the selected drop target
    if ( event.target.className.includes('dropzone') && dragged){
        console.log(event.target);
        console.log(dragged);
        event.target.style.background = "";
        dragged.parentNode.removeChild( dragged );
        event.target.appendChild( dragged );
    }
}, false);

document.addEventListener('DOMContentLoaded', (event) => {

    var dragSrcEl = null;
function handleDragStart(e) {
    this.style.opacity = '0.1';
    this.style.border = '3px dashed #c4cad3';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
    e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('task-hover');
}

function handleDragLeave(e) {
    this.classList.remove('task-hover');
}

function handleDrop(e) {
    if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
    }
    if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    this.style.border = 0;
    items.forEach(function (item) {
    item.classList.remove('task-hover');
    });
}


let items = document.querySelectorAll('.task'); 
items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
});
});