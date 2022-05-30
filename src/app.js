import './scss/style.scss'
import icon from './info.svg'

const projectsList = document.querySelector('[data-projects]')
const newProjectForm = document.querySelector('[data-new-project-form]')
const newProjectInput = document.querySelector('[data-new-project-input]')

const tasksContainer = document.querySelector('.tasks-container')
const tasks = document.querySelector('[data-tasks-list]')
const selectedProjectTitle = document.querySelector('[data-tasks-title')
const deleteTaskButton = document.querySelector('[data-delete-task-button]')
const deleteProjectButton = document.querySelector('[data-delete-project-button]')

const newTaskForm = document.querySelector('[data-new-task-form]')
const taskTitle = document.querySelector('[data-new-task-title]')
const taskDescription = document.querySelector('[data-new-task-description]')
const taskDate = document.querySelector('[data-new-task-due-date]')
const taskPriority = document.querySelector('[data-new-task-priority]')

const taskDetails = document.querySelector('[data-selected-task-details]')

let LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'todo.projectID'
let LOCAL_STORAGE_PROJECTS_KEY = 'todo.projects'

let projects =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || []
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

deleteTaskButton.addEventListener('click', () => {
    const currentProject = selectedProject()
    currentProject.tasks = currentProject.tasks.filter(task => !task.complete)
    saveAndRender()
})

deleteProjectButton.addEventListener('click', () => {
    projects = projects.filter(project => project.id != selectedProjectId)
    saveAndRender()
})

// If you click a task, toggle that corresponding task's complete boolean status.
tasks.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'label') {
        const currentProject = selectedProject()
        const clickedTask = currentProject.tasks.find(task => task.id == e.target.id)
        clickedTask.complete = clickedTask.complete ? false : true
        saveAndRender()
    }
    if (e.target.tagName.toLowerCase() === 'img') {
        const currentProject = selectedProject()
        const clickedTask = currentProject.tasks.find(task => task.id === e.target.id)
        renderTaskDetails(clickedTask)
    }
})

// Show the details of the selected task.
function renderTaskDetails(task) {
    clearTaskDetails()

    const heading = document.createElement('h3')
    heading.innerText = task.title
    taskDetails.appendChild(heading)
    if (task.description) {
        const description = document.createElement('p')
        description.innerText = `Description: ${task.description}`
        taskDetails.appendChild(description)
    }
    const dueDate = document.createElement('h5')
    dueDate.innerText = `Due Date: ${task.date || 'No Deadline'}`
    taskDetails.appendChild(dueDate)
    const priority = document.createElement('h5')
    priority.innerText = `Priority: ${task.priority.toUpperCase()[0] + task.priority.slice(1)}`
    taskDetails.appendChild(priority)
}

function clearTaskDetails() {
    clearElements(taskDetails)
}

// Add a new task to the selected project.
newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const currentProject = selectedProject()
    const newTask = {
        title: taskTitle.value,
        description: taskDescription.value,
        date: taskDate.value,
        priority: taskPriority.value,
        complete: false,
        id: Date.now().toString()
    }
    taskTitle.value = taskDescription.value = taskDate.value = null
    currentProject.tasks.push(newTask)
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
    if (e.target.id) {
        selectedProjectId = e.target.id
    }
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
    clearTaskDetails()

    const currentProject = selectedProject()
    if (currentProject) {
        selectedProjectTitle.innerText = currentProject.title
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

    for (let task of selectedProject.tasks) {
        const container = document.createElement('div')
        container.classList.add('task')
        const input = document.createElement('input')
        input.type = 'checkbox'
        input.id = task.id
        input.checked = task.complete
        const label = document.createElement('label')
        label.innerText = task.title
        label.htmlFor = task.id
        label.id = task.id
        const infoIcon = new Image(20, 20)
        infoIcon.classList.add('icon')
        infoIcon.src = icon
        infoIcon.id = task.id
        container.appendChild(input)
        container.appendChild(label)
        container.appendChild(infoIcon)
        tasks.appendChild(container)
    }
}

// Take the projects in the array of objects variable and create an updated list.
function renderProjectList() {
    clearElements(tasks)
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
