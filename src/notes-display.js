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
        const title = document.createElement('h3')

        cardContainer.classList.add('card')
        cardContainer.appendChild(title)
        title.innerText = note.title

        note.items.forEach((text, index) => {
            const itemHolder = document.createElement('div')
            const checkbox = document.createElement('input')
            const item = document.createElement('label')

            itemHolder.classList.add('item-holder')
            checkbox.type = 'checkbox'
            checkbox.id = `checkbox-${index}`
            item.htmlFor = `checkbox-${index}`
            item.appendChild(document.createTextNode(text))

            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    item.classList.add('strike')
                } else {
                    item.classList.remove('strike')
                }
            })

            itemHolder.appendChild(checkbox)
            itemHolder.appendChild(item)
            cardContainer.appendChild(itemHolder)
        })
        const addNewItemButton = document.createElement('button')
        addNewItemButton.innerText = 'X'
        addNewItemButton.addEventListener('click', function() {
            while (cardContainer.firstChild) {
                cardContainer.removeChild(cardContainer.lastChild)
            }
            const parent = document.querySelector('.notes.container')
            parent.removeChild(cardContainer)
            notesManager.removeFromProjects(note)
        })

        cardContainer.appendChild(addNewItemButton)
        container.appendChild(cardContainer)
    }
    return {
        container,
        populateCurrentProjectCards,

    }
})()

export default displayViewer