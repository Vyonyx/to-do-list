import notesManager from './notes-manager'

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
    refreshList(notesManager.getProjectList())
    
    function refreshList(list) {
        while (projects.firstChild) {projects.removeChild(projects.lastChild)}
        list.forEach(item => createNewProjectHeading(item))
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
        if (selectedListHeading == notesManager.allNotes) {
            populateAllCards(notesManager.getAllNotes())
        } else {
            const project = notesManager.projects.find(project => project.title == selectedListHeading)
            project.notes.forEach(item => createCard(item))
        }
    }

    function createCard(note) {

        const container = createContainerElement('div', 'card')
        const title = createHeadingElement('h3', note.title, 'card-title')
        const description = createHeadingElement('p', note.description)
        const dueDate = createHeadingElement('h5', note.dueDate)
        const priority = createHeadingElement('h5', note.priority)

        addToContainer([title, description, dueDate, priority])
        layoutManager.notesContainer.appendChild(container)

        function addToContainer(items) { items.forEach(item => container.appendChild(item)) }
    }

    return {
        populateAllCards,
        populateCurrentProjectCards
    }
    
})()



const formDisplay = (function() {
    
    let formInformation = {}
    const container = createContainerElement('div', 'form-display-container')
    container.classList.add('hidden')
    resetForm()

    function createNewForm() {

        function createInputElement(labelHeading = 'Label', type = 'input') {
            const element = document.createElement(type)
            element.id = String(labelHeading).toLowerCase()
            element.formID = form.id
            const label = document.createElement('p')
            label.innerText = `${labelHeading}: `
            label.appendChild(element)
            form.appendChild(label)
            return element
        }

        const form = document.createElement('form')
        form.id = 'card-form'

        const title = createInputElement('Title')
        const firstItem = createInputElement('Note')
        title.classList.add('title')
        firstItem.classList.add('item')
        const description = createInputElement('Description', 'textarea')
        const dueDate = createInputElement('Due Date')
        const priority = createInputElement('Priority')

        const submitButton = createContainerElement('div', 'submit-button')
        const exitButton = createContainerElement('div', 'exit-button')
        submitButton.innerText = 'Submit'
        exitButton.innerText = 'X'
        form.appendChild(submitButton)
        form.appendChild(exitButton)
    
        container.appendChild(form)
    }

    function deleteFormFields() {
        while (container.firstChild) {
            container.removeChild(container.lastChild)
        }
    }

    function resetForm() {
        deleteFormFields()
        createNewForm()
    }

    function toggleFormDisplay() {
        container.classList.contains('hidden') ? container.classList.remove('hidden') : container.classList.add('hidden')
    }

    return {
        container,
        resetForm,
        formInformation,
        toggleFormDisplay
    }
})()

export { layoutManager, projectListManager, cardManager, formDisplay }