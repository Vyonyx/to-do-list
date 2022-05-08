import layout from './layout'
import notesManager from './notes-system'

// Responsible for the display and manipulation of the display.
const displayViewer = (function() {
    const container = layout.notesContainer

    populateAllCards()

    function populateAllCards() {
        deleteAllCards()
        notesManager.projects.forEach(project => {
            project.notes.forEach(note => {
                createNewCard(note)
            })
        })
    }

    function populateCurrentProjectCards(identifier) {
        deleteAllCards()
        notesManager.projects.forEach(project => {
            if (project.title == 'All Notes' && project.title == identifier) {
                populateAllCards()
            } else if (project.title == identifier) {
                project.notes.forEach(note => {
                    createNewCard(note)
                })
            }
        })
    }

    function deleteAllCards() {
        while (container.firstChild) {
            container.removeChild(container.firstChild)
        }
    }

    function createNewCard(note) {
        const cardContainer = document.createElement('div')
        cardContainer.classList.add('card')
        const title = document.createElement('h3')
        cardContainer.appendChild(title)
        title.innerText = note.title

        note.items.forEach(text => {
            const toDoItem = document.createElement('h5')
            toDoItem.innerText = text
            cardContainer.appendChild(toDoItem)
        })
        const addNewItemButton = document.createElement('button')
        addNewItemButton.innerText = 'X'
        cardContainer.appendChild(addNewItemButton)
        container.appendChild(cardContainer)
    }
    return {
        container,
        populateCurrentProjectCards
    }
})()

export default displayViewer