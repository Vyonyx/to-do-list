import notesManager from './notes-system'

// Responsible for the representation of the layout.
const layout = (function () {
    let projectsList = [];

    function createElementContainer(type, classID) {
        const container = document.createElement(type)
        container.classList.add(classID, 'container')
        return container
    }

    function createHeading(type, classID, text) {
        const heading = document.createElement(type)
        heading.classList.add(classID)
        heading.innerText = text
        return heading
    }
    
    const container = createElementContainer('div', 'layout')
    const listContainer = createElementContainer('div', 'list')
    const notesContainer = createElementContainer('div', 'notes')
    const header = createElementContainer('div', 'header')
    
    
    const projectListHeading = createHeading('h1', 'top-title', notesManager.projectListTitle)
    const projectTitle = createHeading('h1', 'top-title', notesManager.allNotes)
    addToListContainer(projectListHeading)
    addToHeader(projectTitle)
    
    container.appendChild(listContainer)
    container.appendChild(header)
    container.appendChild(notesContainer)

    return {
        projectsList,
        container,
        listContainer,
        notesContainer,
        updateProjectTitle: function(title) { projectTitle.innerText = title },
        addProject: function(details) { projectsList.push(details) },
        addToListContainer: function(item) { listContainer.appendChild(item) },
        addToHeader: function(item) { header.appendChild(item) }
    }
})()

// Responsible for the display of the projects list.
const projectList = (function(){

    const projects = document.createElement('div')
    projects.classList.add('project-list')
    refreshList()

    function refreshList() {
        while (projects.firstChild) {projects.removeChild(projects.lastChild)}
        notesManager.projects.forEach(project => {
            createNewProjectHeading(project.title)
        })
    }
    // Creating the individual headings that will go in the list of projects div.
    function createNewProjectHeading(title) {
        const heading = document.createElement('h3')
        heading.dataset.project = title
        heading.innerText = title
        heading.addEventListener('click', function() {
            updateLayoutTitle(title)
            displayViewer.populateCurrentProjectCards(heading.dataset.project)
        })
        projects.appendChild(heading)
    }
    
    // Update the title over the notes container to be the currently selected project.
    function updateLayoutTitle(title) {
        layout.updateProjectTitle(title)
    }

    return { projects }
})()

// Responsible for the display and manipulation of the display.
const displayViewer = (function() {
    const container = layout.notesContainer

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

export { layout, projectList }