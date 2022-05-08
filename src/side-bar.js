import layout from './layout'
import notesManager from './notes-system'
import displayViewer from './notes-display'

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

export {
    projectList
}