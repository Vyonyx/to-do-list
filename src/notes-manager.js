// Responsible for managing the notes system with all encapsulating functionality.
// Creates projects and the notes within it.
const notesManager = (function(){

    let projects = []

    const allNotes = 'All Notes'
    const projectListTitle = 'Project List'

    const myProject = createProject(allNotes)
    const myNote = createNote('Hello Word', 'Does this work?')

    function createProject(title) {
        const project = {
            title,
            notes: [],
            addNote: function(note) { this.notes.push(note) },
            getNote: function(title) { return this.notes.find(x => x.title == title) },
        }
        projects.push(project)
        return project
    }

    
    function createNote(title, firstItem, projectTitle, description, dueDate, priority) {
        const note = {
            title,
            description: typeof description === 'undefined' ? '' : description,
            dueDate: typeof dueDate === 'undefined' ? 'Unlimited Time' : dueDate,
            priority: typeof priority === 'undefined'? 'low' : priority,
            items: [firstItem],
            addItem: function(newItem) { this.items.push(newItem) }
        }
        if (projectTitle == null) {
            projects[0].addNote(note)
        } else if (projectTitle) {
            findProject(projectTitle).addNote(note)
        }
    }

    function findProject(title) { return projects[projects.findIndex(projects => projects.title == title)] }
    const getAllNotes = () => projects.flatMap(project => project.notes)

    return {
        projects,
        createProject,
        findProject,
        createNewNote: createNote,
        getAllNotes,
        allNotes,
        projectListTitle,
    }
})()

export default notesManager
