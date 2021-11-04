const moveable = document.querySelectorAll('#moveable')
const containers = document.querySelectorAll('.container')

moveable.forEach(move =>{
    move.addEventListener('dragstart', () => {
        move.classList.add('dragging')
    })

    move.addEventListener('dragend', () => {
        move.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if(afterElement == null){
            container.appendChild(draggable)
        }
        else{
            container.insertBefore(draggable, afterElement)
        }
    })
})

function getDragAfterElement(container, y){
    const moveableElements = [...container.querySelectorAll('#moveable:not(.dragging)')]

    return moveableElements.reduce((closest, child) => {
        const box = child.getBoundingCLientReck()
        const offset = y - box.top - box.height / 2
        console.log(offset);
        if(offset < 0 && offset > closest.offset){
            return{offset: offset, element: child}
        }
        else{
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}