import notesManager from './notes-manager'

function createContainerElement(type, classID) {
    const container = document.createElement(type)
    container.classList.add(classID, 'container')
    return container
}

function createHeadingElement(type, classID, text) {
    const heading = document.createElement(type)
    heading.classList.add(classID)
    heading.innerText = text
    return heading
}



const layoutManager = (function () {

    let projectsList = [];

    function addToContainer(items) { items.forEach(item => container.appendChild(item)) }
    
    const container = createContainerElement('div', 'layout')
    const listContainer = createContainerElement('div', 'list')
    const notesContainer = createContainerElement('div', 'notes')
    const header = createContainerElement('div', 'header')
    
    const projectListHeading = createHeadingElement('h1', 'top-title', notesManager.projectListTitle)
    const projectTitle = createHeadingElement('h1', 'top-title', notesManager.allNotes)
    addToListContainer(projectListHeading)
    addToHeader(projectTitle)

    addToContainer([listContainer, header, notesContainer])
    
    function addToListContainer(item) { listContainer.appendChild(item) }
    function addToHeader(item) { header.appendChild(item) }
    
    return {
        projectsList,
        container,
        listContainer,
        notesContainer,

        addToListContainer,
        addToHeader,
        updateProjectTitle: function(title) { projectTitle.innerText = title },
        addProject: function(details) { projectsList.push(details) },
    }

})()



const projectListManager = (function(){

    const projects = createContainerElement('div', 'project-list')

    refreshList()

    function refreshList() {
        while (projects.firstChild) {projects.removeChild(projects.lastChild)}
        notesManager.projects.forEach(project => {
            createNewProjectHeading(project.title)
        })
    }

    function createNewProjectHeading(title) {
        const heading = createHeadingElement('h3', 'project-heading', title)
        heading.dataset.project = title
        heading.addEventListener('click', function() {
            layoutManager.updateLayoutTitle(title)
            cardManager.populateCurrentProjectCards(heading.dataset.project)
        })
        projects.appendChild(heading)
    }

    return { projects }

})()



const cardManager = (function() {

    function deleteAllCards() {
        while (layoutManager.notesContainer.firstChild) {
            layoutManager.notesContainer.removeChild(layoutManager.notesContainer.firstChild)
        }
    }

    function populateAllCards(allNotes) {
        deleteAllCards()
        allNotes.forEach(note => createCard(note))
    }

    function populateCurrentProjectCards(identifier) {
        deleteAllCards()
        notesManager.projects.forEach(project => {
            if (project.title == 'All Notes' && project.title == identifier) {
                populateAllCards()
            } else if (project.title == identifier) {
                project.notes.forEach(note => {
                    createCard(note)
                })
            }
        })
    }

    function createCard(note) {
        const cardContainer = createContainerElement('div', 'card')
        const cardTitle = createHeadingElement('h3', 'card-title', note.title)
        cardContainer.appendChild(cardTitle)

        // note.items.forEach((text, index) => {
        //     const itemHolder = document.createElement('div')
        //     const checkbox = document.createElement('input')
        //     const item = document.createElement('label')

        //     itemHolder.classList.add('item-holder')
        //     checkbox.type = 'checkbox'
        //     checkbox.id = `checkbox-${index}`
        //     item.htmlFor = `checkbox-${index}`
        //     item.appendChild(document.createTextNode(text))

        //     checkbox.addEventListener('change', function() {
        //         if (this.checked) {
        //             item.classList.add('strike')
        //         } else {
        //             item.classList.remove('strike')
        //         }
        //     })

        //     itemHolder.appendChild(checkbox)
        //     itemHolder.appendChild(item)
        //     cardContainer.appendChild(itemHolder)
        // })
        // const addNewItemButton = document.createElement('button')
        // addNewItemButton.innerText = 'X'
        // addNewItemButton.addEventListener('click', function() {
        //     while (cardContainer.firstChild) {
        //         cardContainer.removeChild(cardContainer.lastChild)
        //     }
        //     const parent = document.querySelector('.notes.container')
        //     parent.removeChild(cardContainer)
        //     notesManager.removeFromProjects(note)
        // })

        // cardContainer.appendChild(addNewItemButton)
        layoutManager.notesContainer.appendChild(cardContainer)
    }

    return {
        populateAllCards,
        populateCurrentProjectCards
    }
})()

export { layoutManager, projectListManager, cardManager }