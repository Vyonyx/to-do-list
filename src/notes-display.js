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

        formInformation.title = createInputElement('Title')
        formInformation.description = createInputElement('Description', 'textarea')
        formInformation.dueDate = createInputElement('Due Date')
        formInformation.priority = createInputElement('Priority')
        formInformation.submitButton = document.createElement('button')
        formInformation.submitButton.innerText = 'Submit'
        form.appendChild(formInformation.submitButton)
    
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

    function getFormInformation() {

    }

    return {
        container,
        resetForm,
        formInformation
    }
})()

export { layoutManager, projectListManager, cardManager, formDisplay }