import notesManager from './notes-manager'
import formManager from './form'

function createContainerElement(type, classID) {
    const container = document.createElement(type)
    if (classID) { container.classList.add(classID, 'container') }
    return container
}

function createHeadingElement(type, text, classID) {
    const heading = document.createElement(type)
    heading.innerText = text
    if (classID) { heading.classList.add(classID) }
    return heading
}

const layoutManager = (function () {

    let projectsList = [];

    function addToContainer(items) { items.forEach(item => container.appendChild(item)) }
    
    const container = createContainerElement('div', 'layout')
    const listContainer = createContainerElement('div', 'list')
    const notesContainer = createContainerElement('div', 'notes')
    const header = createContainerElement('div', 'header')
    
    const projectListHeading = createHeadingElement('h1', notesManager.projectListTitle, 'top-title')
    const projectTitle = createHeadingElement('h1', notesManager.allNotes, 'top-title')
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

    const projects = createContainerElement('div')
    refreshList(notesManager.projects)
    
    function refreshList(projectsList) {
        while (projects.firstChild) {projects.removeChild(projects.lastChild)}
        projectsList.forEach(project => createNewProjectHeading(project.title))
    }

    function createNewProjectHeading(title) {
        const heading = createHeadingElement('h3', title)
        heading.classList.add('heading')
        heading.dataset.project = title
        layoutManager.listContainer.appendChild(heading)
    }

    return { refreshList }

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

    function populateCurrentProjectCards(selectedListHeading) {
        deleteAllCards()
        if (selectedListHeading === notesManager.allNotes) {
            populateAllCards(notesManager.getAllNotes())
        } else {
            const notes = notesManager.getProjectNotes(selectedListHeading)
            if (notes == 'undefined') return
            notes.forEach(note => createCard(note))
        }
    }

    function createCard(note) {

        const container = createContainerElement('div', 'card')

        Object.keys(note).forEach(key => {
            if (typeof note[key] === 'function') return
            if (key === 'project') return
            let element
            if (key === 'title') {
                element = createHeadingElement('h3', note[key], 'card-title')
            } else if (key === 'description'){
                element = createHeadingElement('p', note[key])
            } else {
                if (key === 'priority') {
                    if (note[key]) element = createHeadingElement('h5', `Priority: ${note[key]}`)
                    else return
                }
                else if (key === 'dueDate') {
                    if (note[key]) element = createHeadingElement('h5', `Due Date: ${note[key]}`)
                    else return
                } else if (key === 'items') {
                    const allItems = document.createElement('div')
                    note[key].forEach(item => {
                        const label = document.createElement('label')
                        const newItem = document.createElement('input')
                        newItem.type = 'checkbox'

                        label.appendChild(newItem)
                        label.appendChild(document.createTextNode(`  ${note[key]}`))
                        allItems.appendChild(label)
                    })
                    element = allItems
                } else {element = createHeadingElement('h5', note[key])}
            }
            container.appendChild(element)
        })
        layoutManager.notesContainer.appendChild(container)

    }

    return {
        populateAllCards,
        populateCurrentProjectCards
    }
    
})()

const formDisplay = (function() {
    const container = formManager.container
    container.classList.add('hidden')

    function toggleFormDisplay() {
        container.classList.contains('hidden') ? container.classList.remove('hidden') : container.classList.add('hidden')
    }

    return {
        container,
        toggleFormDisplay
    }
})()

export { layoutManager, projectListManager, cardManager, formDisplay }