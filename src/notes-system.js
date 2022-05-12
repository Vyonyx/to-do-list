// Responsible for managing the notes system with all encapsulating functionality.
// Creates projects and the notes within it.
const notesManager = (function(){

    let projects = [];

    function createProject(title) {
        const project = {
            title,
            notes: [],
            addNewNote: function(note) { this.notes.push(note) },
            getNote: function(title) { return this.notes.find(x => x.title == title) },
        }
        projects.push(project)
    }

    const findProject = title => projects[projects.findIndex(projects => projects.title == title)]
    const getAllNotes = () => projects.flatMap(project => project.notes)

    function createNewNote(title, projectTitle, description, dueDate, priority) {
        const note = {
            title,
            description: typeof description === 'undefined' ? '' : description,
            dueDate: typeof dueDate === 'undefined' ? 'Unlimited Time' : dueDate,
            priority: typeof priority === 'undefined'? 'low' : priority,
        }
        if (projectTitle == null) {
            projects[0].addNewNote(note)
        } else if (projectTitle) {
            findProject(projectTitle).addNewNote(note)
        }
    }

    return {
        projects,
        createProject,
        findProject,
        createNewNote,
        getAllNotes,
    }
})()

// export default notesManager

notesManager.createProject('All Notes')
notesManager.createProject('Overseas Trip')
notesManager.createProject('Work Goals')
notesManager.createNewNote('Hello World', "Overseas Trip")
notesManager.createNewNote('It\'s me again!', "Overseas Trip")
notesManager.createNewNote('Get a new job', "Work Goals")

console.table(notesManager.getAllNotes())
