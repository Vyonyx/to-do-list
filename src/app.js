import './scss/style.scss'

const projectsList = document.querySelector('[data-projects]')
const newProjectForm = document.querySelector('[data-new-project-form]')
const newProjectInput = document.querySelector('[data-new-project-input]')

const tasksContainer = document.querySelector('.tasks-container')
const tasks = document.querySelector('[data-tasks-list]')
const selectedProjectTitle = document.querySelector('[data-tasks-title')
const deleteProjectButton = document.querySelector('[data-delete-project-button]')

let LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'todo.projectID'
let LOCAL_STORAGE_PROJECTS_KEY = 'todo.projects'

let projects =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || []
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

deleteProjectButton.addEventListener('click', () => {
    projects = projects.filter(project => project.id != selectedProjectId)
    saveAndRender()
})

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
    
    const currentProject = selectedProject()
    if (currentProject) {
        renderTaskList(currentProject)
    } else {
        selectedProjectTitle.innerText = ''
    }
}

// Save things to local storage.
function save() {
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId)
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects))
}

function selectedProject() {
    return projects.find(project => project.id === selectedProjectId)
}

function renderTaskList(selectedProject) {
    clearElements(tasks)
    selectedProjectTitle.innerText = selectedProject.title || ''
    if (!selectedProject) return
    for (let task of selectedProject.tasks) {
        const container = document.createElement('div')
        container.classList.add('task')
        const input = document.createElement('input')
        input.type = 'checkbox'
        input.id = `task-${task}`
        const label = document.createElement('label')
        label.innerText = task.title
        label.htmlFor = `task-${task}`
        container.appendChild(input)
        container.appendChild(label)
        tasks.appendChild(container)
    }
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
