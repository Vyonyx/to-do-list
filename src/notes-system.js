// Responsible for managing the notes system with all encapsulating functionality.
// Creates projects and the notes within it.
const notesManager = (function(){

    let projects = [];

    // Create new data.
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

    function createProject(title) {
        const project = {
            title,
            notes: [],
            addNewNote: function(note) { this.notes.push(note) },
            logAllNotes: function() {console.table(this.notes)}
        }
        projects.push(project)
    }

    const findProject = title => projects[projects.findIndex(projects => projects.title == title)]

    return {
        projects,
        findProject,
        createProject,
        createNewNote,
    }
})()

// export default notesManager

notesManager.createProject('All Notes')
notesManager.createProject('Overseas Trip')
notesManager.createNewNote('Hello World', "Overseas Trip")
notesManager.createNewNote('It\'s me again!', "Overseas Trip")
