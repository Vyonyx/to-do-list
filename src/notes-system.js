// Responsible for managing the notes system with all encapsulating functionality.
// Creates projects and the notes within it.
const notesManager = (function(){

    let projects = [];
    const allNotes = 'All Notes'

    createProject(allNotes)
    findProject(allNotes).addNewNote(createNewNote('Book a trip.'))

    function createProject(title) {
        const project = {
            title,
            notes: [],
            addNewNote: function(note) { this.notes.push(note) },
            getNote: function(title) { return this.notes.find(x => x.title == title) },
        }
        projects.push(project)
    }

    function findProject(title) {
        return projects[projects.findIndex(projects => projects.title == title)]
    }
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
        allNotes,
    }
})()

export default notesManager
