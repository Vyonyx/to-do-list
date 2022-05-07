// Responsible for the representation of the layout.

const layout = (function () {
    let projects = [];

    const container = document.createElement('div')
    const listContainer = document.createElement('div')
    const notesContainer = document.createElement('div')
    const header = document.createElement('div')

    container.classList.add('layout', 'container')
    listContainer.classList.add('list', 'container')
    notesContainer.classList.add('notes', 'container')
    header.classList.add('header', 'container')

    const projectListHeading = document.createElement('h1')
    projectListHeading.innerText = 'Project List'
    addToListContainer(projectListHeading)

    const projectTitle = document.createElement('h1')
    projectTitle.innerText = 'All Notes'
    addToHeader(projectTitle)

    container.appendChild(listContainer)
    container.appendChild(header)
    container.appendChild(notesContainer)


    function addProject(details) {projects.push(details)}
    function addToListContainer(item) {listContainer.appendChild(item)}
    function addToHeader(item) {header.appendChild(item)}
    function addToNotesContainer(item) {notesContainer.appendChild(item)}

    return {
        projects,
        container,
        addProject
    }
})()

export default layout