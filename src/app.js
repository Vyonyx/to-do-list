import './scss/style.scss'

const projectsList = document.querySelector('[data-projects]')
const newProjectForm = document.querySelector('[data-new-project-form]')
const newProjectInput = document.querySelector('[data-new-project-input]')

let LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'todo.projectID'
let LOCAL_STORAGE_PROJECTS_KEY = 'todo.projects'

// localStorage.clear()
// let projects =  []
let projects =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || []
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

// Add new project to projects list.
newProjectForm.addEventListener('submit', e => {
    e.preventDefault()
    addProject(newProjectInput.value)
    newProjectInput.value = ''
})

// Change the stored selected project ID.
projectsList.addEventListener('click', e => {
    if (!e.target.tagName.toLowerCase() === 'li') return
    selectedProjectId = e.target.id
    saveAndRender()
})

function addProject(title) {
    const newProject = {
        title,
        id: Date.now().toString(),
        tasks: []
    }
    projects.push(newProject)
    saveAndRender()
}

function saveAndRender() {
    save()
    render()
}

// Renders any updates to the screen.
function render() {
    renderProjectList()
}

// Save things to local storage.
function save() {
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId)
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects))
}

// Take the projects in the array of objects variable and create an updated list.
function renderProjectList() {
    clearElements(projectsList)
    for (let project of projects) {
        const newProject = document.createElement('li')
        newProject.innerText = project.title
        newProject.classList.add('project-item')
        newProject.id = project.id
        if (newProject.id === selectedProjectId) { newProject.classList.add('active-project') }
        projectsList.appendChild(newProject)
    }
}

// Clear all the elements in a DOM container.
function clearElements(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

render()
